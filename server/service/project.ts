import mongoose from 'mongoose';
import { ProjectModel } from '../model/project';
import { IProject } from '../types/index';

function createProject(project: any) {
  project.projectId = new mongoose.Types.ObjectId();
  return ProjectModel.create(project);
}

function getAllProject() {
  return ProjectModel.find({}, { _id: 0, __v: 0 }).sort({ modifiedTime: 1 });
}

function findProject(id: string) {
  console.log('findProject', mongoose.Types.ObjectId(id));
  return ProjectModel.findOne({ projectId: mongoose.Types.ObjectId(id) }, { _id: 0, __v: 0 })
    .populate('apis')
    .exec();
}

export { createProject, getAllProject, findProject };
