import { ProjectModel } from '../model/project';
import { IProject } from '../types/index';

function createProject(api: IProject) {
  return ProjectModel.create(api);
}

function getAllProject() {
  return ProjectModel.find({}).sort({ modifiedTime: -1 });
}
export { createProject, getAllProject };
