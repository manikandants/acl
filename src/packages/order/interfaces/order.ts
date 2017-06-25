import * as mongoose from 'mongoose';

export interface IOrder extends mongoose.Document {
  user: string;
  createdOn: number;
}
