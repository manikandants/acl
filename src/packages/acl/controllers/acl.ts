import {Acl} from '../models/acl';

import * as async from 'async';

let create = (req: any, res: any) => {
  let acl: any;
  let response: any;
  async.series([
    (fn) => {
      Acl.read({
        resource: req.body.resource,
        roles: {
          $in: req.body.roles
        }
      }, {
        _id: 1
      }, (err: any, a: any) => {
        if (a.length > 0) {
          acl = JSON.parse(JSON.stringify(a[0]));
        }
        return fn(null);
      });
    },
    (fn) => {
      if (acl) {
        Acl.updatePermissions(acl._id, req.body.permissions, (err, resp) => {
          if (err) {
            console.log(err);
            return res.status(501).json({});
          }
          response = resp;
          return fn(null);
        });
      } else {
        Acl.create(req.body, (err: any, resp: any) => {
          if (err) {
            console.log(err);
            return res.status(501).json({});
          }
          response = resp;
          return fn(null);
        });
      }
    }
  ], (err: any) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let read = (req: any, res: any) => {
  Acl.read({}, (err: any, response: any) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let update = (req: any, res: any) => {
  Acl.update(req.params.order, req.body, (err, response) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let remove = (req: any, res: any) => {
  Acl.remove(req.params.order, (err, response) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let readById = (req: any, res: any) => {
  Acl.read({
    _id: req.params.acl
  }, (err: any, response: any) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let aclController = {
  create, read, update, remove, readById
};

export {aclController};