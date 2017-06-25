import {userController} from '../controllers/user';

let initRoutes = (app: any) => {
  app.route('/api/user').put(userController.create);
  app.route('/api/user').get(userController.read);
  app.route('/api/user/:user').post(userController.update);
  app.route('/api/user/:user').delete(userController.remove);
  app.route('/api/user/:user').get(userController.readById);
  app.route('/api/user/:user/role').put(userController.addRole);
  app.route('/api/user/:user/role/:role').delete(userController.removeRole);
};

export {initRoutes};