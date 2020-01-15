import mongoose from 'mongoose';
import { ProjectModel } from '../model/project';
import { IProject } from '../types/index';

function createProject(api: Partial<IProject>) {
  return ProjectModel.create(api);
}

function getAllProject() {
  return ProjectModel.find({}, { _id: 0, __v: 0 }).sort({ modifiedTime: 1 });
}

function findProject(id: string) {
  console.log('findProject', mongoose.Types.ObjectId(id));
  return ProjectModel.findOne({ projectId: mongoose.Types.ObjectId(id) }, { _id: 0, __v: 0 });
}

export { createProject, getAllProject, findProject };
