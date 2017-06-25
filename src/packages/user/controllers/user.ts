import {User} from '../models/user';

let create = (req: any, res: any) => {
  User.create(req.body, (err, response) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(501).json({
          code: 11000,
          error: 'Phone number must be unique'
        });
      } else {
        return res.status(501).json({});
      }
    }
    return res.json(response);
  });
};

let read = (req: any, res: any) => {
  User.read({}, (err: any, response: any) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let update = (req: any, res: any) => {
  User.update(req.params.user, req.body, (err, response) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(501).json({
          code: 11000,
          error: 'Phone number must be unique'
        });
      } else {
        return res.status(501).json({});
      }
    }
    return res.json(response);
  });
};

let remove = (req: any, res: any) => {
  User.remove(req.params.user, (err, response) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let readById = (req: any, res: any) => {
  User.read({
    _id: req.params.user
  }, (err: any, response: any) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let addRole = (req: any, res: any) => {
  User.addRole(req.params.user, req.body.role, (err, response) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let removeRole = (req: any, res: any) => {
  User.removeRole(req.params.user, req.params.role, (err, response) => {
    if (err) {
      return res.status(501).json({});
    }
    return res.json(response);
  });
};

let userController = {
  create, read, update, remove, readById, addRole, removeRole
};

export {userController};