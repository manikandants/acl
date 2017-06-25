import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  phone: number;
  roles: string[];
}
