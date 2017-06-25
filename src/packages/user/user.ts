import {initRoutes} from './routes/user';

let initUser = (app: any) => {
  initRoutes(app);
};

export {initUser};