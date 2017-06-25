import * as mongoose from 'mongoose';
import {DataBase} from '../../../db';
import {IUser} from '../interfaces/user';

let Schema = mongoose.Schema;

let schema = new Schema({
  name: {
	   type: String,
	   required: true
  },
  phone: {
	   type: Number,
	   required: true,
     unique: true
  },
  roles: [{
	   type: String
  }]
});

let UserSchema = mongoose.model<IUser>('user', schema, 'users', true);

UserSchema.ensureIndexes();

class CUser extends DataBase<IUser> {
  constructor() {
    super(UserSchema);
  }
}

let UserCollection = new CUser();

class User {
  private user: IUser;
  constructor(user: IUser) {
    this.user = user;
  }
  static create(user: IUser, callback: (error: any, result: any) => void) {
    UserCollection.create(user, callback);
  }
  static read(cond?: Object, fields?: Object, options?: Object, callback?: (error: any, result: any) => void) {
    UserCollection.read(cond, fields, options, callback);
  }
  static update(_id: string, item: Document, callback: (error: any, result: any) => void) {
    UserCollection.update(_id, {
      $set: item
    }, callback);
  }
  static addRole(_id: string, role: string, callback: (error: any, result: any) => void) {
    UserCollection.update(_id, {
      $addToSet: {
        roles: role
      }
    }, callback);
  }
  static removeRole(_id: string, role: string, callback: (error: any, result: any) => void) {
    UserCollection.update(_id, {
      $pull: {
        roles: role
      }
    }, callback);
  }
  static remove(_id: string, callback: (error: any, result: any) => void) {
    UserCollection.remove(_id, callback);
  }
};

Object.seal(CUser);

export {UserSchema, User};