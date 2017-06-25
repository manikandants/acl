import * as express from 'express';
import * as bodyParser from 'body-parser';

import {initAcl, aclMiddleware} from './packages/acl/acl';
import {initUser} from './packages/user/user';
import {initOrder} from './packages/order/order';

const port = 3000;

let expressApp = express();

let initExpress = () => {
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({
    extended: true
  }));
  expressApp.use(aclMiddleware);
  expressApp.listen(port);
  console.log('App running on port ' + port);
  initUser(expressApp);
  initOrder(expressApp);
  initAcl(expressApp);
}

export {initExpress};