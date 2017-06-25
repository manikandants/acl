import * as mongoose from 'mongoose';
import {DataBase} from '../../../db';
import {IAcl} from '../interfaces/acl';

let Schema = mongoose.Schema;

let schema = new Schema({
  resource: {
    type: String,
    required: true
  },
  roles: [{
    type: String
  }],
  permissions: [{
    type: String,
    enum: ['delete', 'get', 'post', 'put', '*']
  }]
});

let AclSchema = mongoose.model<IAcl>('acl', schema, 'acls', true);

AclSchema.ensureIndexes();

class CAcl extends DataBase<IAcl> {
  constructor() {
    super(AclSchema);
  }
}

let AclCollection = new CAcl();

class Acl {
  private acl: IAcl;
  constructor(acl: IAcl) {
    this.acl = acl;
  }
  static create(acl: IAcl, callback: (error: any, result: any) => void) {
    AclCollection.create(acl, callback);
  }
  static read(cond?: Object, fields?: Object, options?: Object, callback?: (error: any, result: any) => void) {
    AclCollection.read(cond, fields, options, callback);
  }
  static count(cond?: Object, callback?: (error: any, result: any) => void) {
    AclCollection.count(cond, callback);
  }
  static update(_id: string, item: Document, callback: (error: any, result: any) => void) {
    AclCollection.update(_id, {
      $set: item
    }, callback);
  }
  static updatePermissions(_id: string, item: Document, callback: (error: any, result: any) => void) {
    AclCollection.update(_id, {
      $addToSet: {
        permissions: item
      }
    }, callback);
  }
  static remove(_id: string, callback: (error: any, result: any) => void) {
    AclCollection.remove(_id, callback);
  }
};

Object.seal(CAcl);

export {AclSchema, Acl};