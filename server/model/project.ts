import mongoose from 'mongoose';
import { IProject } from '../types';
const ProjectSchema = new mongoose.Schema({
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
