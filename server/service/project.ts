import mongoose from 'mongoose';
import { ProjectModel } from '../model/project';
import { IProject } from '../types/index';

function createProject(project: any) {
  project.projectId = new mongoose.Types.ObjectId();
  project.proxy = {
    target: '',
    cookie: '',
    status: 0, // 1 开， 0 关
    ...project.proxy
  };
  return ProjectModel.create(project);
}

function getAllProject() {
  return ProjectModel.find({}, { _id: 0, __v: 0 }).sort({ modifiedTime: 1 });
}

function findProject(id: string) {
  // console.log('findProject', mongoose.Types.ObjectId(id));
  return ProjectModel.findOne({ projectId: mongoose.Types.ObjectId(id) }, { _id: 0, __v: 0 })
    .populate('apis')
    .exec();
}

async function updateProject(p: IProject) {
  try {
    const proj = await ProjectModel.findOne({ projectId: mongoose.Types.ObjectId(p.projectId) });
    if (proj) {
      proj.set({ ...proj, ...p });
      return proj.save();
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function deleteProject(id: string) {
  return ProjectModel.deleteOne({ projectId: mongoose.Types.ObjectId(id) });
}

export { createProject, getAllProject, findProject, updateProject, deleteProject };
