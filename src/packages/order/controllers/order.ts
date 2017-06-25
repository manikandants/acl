import {Order} from '../models/order';

let create = (req: any, res: any) => {
  Order.create(req.body, (err, response) => {
    if (err) {
      console.log(err);
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let read = (req: any, res: any) => {
  Order.read({}, (err: any, response: any) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let update = (req: any, res: any) => {
  Order.update(req.params.order, req.body, (err, response) => {
    if (err) {
      console.log(err);
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let remove = (req: any, res: any) => {
  Order.remove(req.params.order, (err, response) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let readById = (req: any, res: any) => {
  Order.read({
    _id: req.params.order
  }, (err: any, response: any) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let orderController = {
  create, read, update, remove, readById
};

export {orderController};