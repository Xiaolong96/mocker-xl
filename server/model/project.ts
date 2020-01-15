import mongoose from 'mongoose';
import { IProject } from '../types';
const { ObjectId } = mongoose.Schema.Types;
const ProjectSchema = new mongoose.Schema({
  projectId: {
    type: ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  name: {
    type: String,
    unique: false
  },
  desc: String,
  baseUrl: String,
  proxy: {
    type: Object,
    default: {
      target: 'htttp://www.xl.com',
      cookie: ''
    }
  },
  createTime: {
    type: String,
    default: Date.now
  },
  modifiedTime: {
    type: String,
    default: Date.now
  }
});

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
