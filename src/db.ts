import * as mongoose from 'mongoose';

let uri = 'mongodb://localhost/locus';

let initDB = () => {
  mongoose.connect(uri, (err) => {
    if (err) {
      console.log(err.message);
      console.log(err);
    }
    else {
      console.log('Connected to MongoDb');
    }
  });
  mongoose.set('debug', true);
};

export interface IAction<Document> {
  create: (item: Document, callback: (error: any, result: any) => void) => void;
  read(cond: Object, fields: Object, options: Object, callback: (error: any, result: Document[]) => void) : mongoose.Query<Document[]>;
  count(cond: Object, fields: Object, options: Object, callback: (error: any, result: number) => void) : mongoose.Query<number>;
  update: (_id: string, item: Document, callback: (error: any, result: any) => void) => void;
  remove: (_id: string, callback: (error: any, result: any) => void) => void;
}

class DataBase <Document extends mongoose.Document> implements IAction<Document> {

  private model: mongoose.Model<mongoose.Document>;
  
  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this.model = schemaModel;
  }

  create(item: Document, callback: (error: any, result: Document) => void) {
    this.model.create(item, callback);
  }

  read(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: Document[]) => void): mongoose.Query<Document[]> {
    return this.model.find(cond, fields, options, callback);
  }

  count(cond?: Object, callback?: (err: any, res: number) => void): mongoose.Query<number> {
    return this.model.count(cond, callback);
  }

  update(_id: string, item: Object, callback: (error: any, result: any) => void) {
    this.model.update({ _id: this.toObjectId(_id) }, item, callback);
  }

  remove(_id: string, callback: (error: any, result: any) => void) {
    this.model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}

export {initDB, DataBase};
