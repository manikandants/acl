import {initRoutes} from './routes/acl';
import {User} from '../user/models/user';
import {Acl} from '../acl/models/acl';
import * as async from 'async';
import * as _ from 'lodash';
import * as fs from 'fs';

let user = fs.readFileSync(__dirname + '/../../seed/user.json', 'utf8');
let acl = fs.readFileSync(__dirname + '/../../seed/acl.json', 'utf8');
console.log(user, acl);

let initAcl = (app: any) => {
  initRoutes(app);
  let count: number;
  async.series([
    (fn) => {
      Acl.count({}, (err: any, c: number) => {
        if (err) {
          console.log(err);
        }
        console.log('acl count ', c);
        count = c;
        return fn(null);
      });
    },
    (fn) => {
      if (count <= 0) {
        User.create(JSON.parse(user), (err: any) => {
          if (err) {
            console.log(err);
          }
          console.log('user initialized');
        });
        Acl.create(JSON.parse(acl), (err: any) => {
          if (err) {
            console.log(err);
          }
          console.log('acl initialized');
        });
        return fn(null);
      }
      else {
        return fn(null);
      }
    }
  ]);
};

let aclMiddleware = (req: any, res: any, next: any) => {
  if (!req.headers.user) {
    return res.status(401).json({
      message: 'No user'
    });
  }
  let resource = req.url.split('?')[0];
  if (!(resource[resource.length - 1] === '/')) {
    resource += '/';
  }
  let permission = req.method.toLowerCase();
  let user: any;
  async.series([
    (fn) => {
      User.read({
        phone: req.headers.user
      }, {
        roles: 1
      }, (err: any, usr: any) => {
        if (err || !usr || !usr.length) {
          return res.status(401).json({
            message: 'No user'
          });
        }
        user = usr[0];
        user.roles = user.roles || [];
        user.roles.push('*')
        return fn(null);
      });
    },
    (fn) => {
      Acl.read({
        roles: {
          $in: user.roles
        },
        permissions: {
          $in: [permission, '*']
        }
      }, (err: any, acl: any) => {
        if (err || !acl || acl.length === 0) {
          console.log(err);
          return res.status(403).json({
            message: 'No permission'
          });
        }
        console.log(resource);
        console.log(acl);
        acl = _.filter(JSON.parse(JSON.stringify(acl)), function(rule: any) {
          return (new RegExp('^' + rule.resource + '$')).test(resource);
        });
        console.log(acl);
        if (acl.length) {
          return fn(null);
        } else {
          return res.status(403).json({
            message: 'No permission'
          });
        }
      });
    }
  ], () => {
    return next();
  });
};

export {initAcl, aclMiddleware};