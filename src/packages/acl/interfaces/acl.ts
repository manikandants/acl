import * as mongoose from 'mongoose';

export interface IAcl extends mongoose.Document {
  resource: string;
  permissions: string[];
  roles: string[];
}
