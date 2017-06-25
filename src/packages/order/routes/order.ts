import {orderController} from '../controllers/order';

let initRoutes = (app: any) => {
  app.route('/api/order').put(orderController.create);
  app.route('/api/order').get(orderController.read);
  app.route('/api/order/:order').post(orderController.update);
  app.route('/api/order/:order').delete(orderController.remove);
  app.route('/api/order/:order').get(orderController.readById);
};

export {initRoutes};