import * as mongoose from 'mongoose';
import {DataBase} from '../../../db';
import {IOrder} from '../interfaces/order';

let Schema = mongoose.Schema;

let schema = new Schema({
  user: {
	   type: String,
	   required: true
  },
  createdOn: {
    type: Date,
    default:new Date()
  }
});

let OrderSchema = mongoose.model<IOrder>('order', schema, 'orders', true);

OrderSchema.ensureIndexes();

class COrder extends DataBase<IOrder> {
  constructor() {
    super(OrderSchema);
  }
}

let OrderCollection = new COrder();

class Order {
  private order: IOrder;
  constructor(order: IOrder) {
    this.order = order;
  }
  static create(order: IOrder, callback: (error: any, result: any) => void) {
    OrderCollection.create(order, callback);
  }
  static read(cond?: Object, fields?: Object, options?: Object, callback?: (error: any, result: any) => void) {
    OrderCollection.read(cond, fields, options, callback);
  }
  static update(_id: string, item: Document, callback: (error: any, result: any) => void) {
    OrderCollection.update(_id, {
      $set: item
    }, callback);
  }
  static remove(_id: string, callback: (error: any, result: any) => void) {
    OrderCollection.remove(_id, callback);
  }
};

Object.seal(COrder);

export {OrderSchema, Order};