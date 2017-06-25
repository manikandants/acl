import {aclController} from '../controllers/acl';

let initRoutes = (app: any) => {
  app.route('/api/acl').put(aclController.create);
  app.route('/api/acl').get(aclController.read);
  app.route('/api/acl/:acl').post(aclController.update);
  app.route('/api/acl/:acl').delete(aclController.remove);
  app.route('/api/acl/:acl').get(aclController.readById);
};

export {initRoutes};