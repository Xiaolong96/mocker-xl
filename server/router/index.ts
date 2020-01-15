'use strict';
const path = require('path');
const Router = require('koa-router');
const { pathToRegexp } = require('path-to-regexp');
import { loadFileList } from '../util/loadFileList';
// const apiSchema = require("../api-schemas");

const allMethods = ['get', 'post', 'put', 'patch', 'delete'];

const router = new Router({
  // prefix: "/mock"
});

// const formatParam = require("../middleware/formatParam")(apiSchema);
// console.log(loadFileList);
const controller = loadFileList(path.join(__dirname, '../controller'), 'controller', null);

// console.log(controller);
// api
const { getApiList } = controller.api;
router.get('/api/list', getApiList);

// project
const { createProject, getProjectList, queryProject } = controller.project;
router.post('/project/create', createProject);
router.get('/project/list', getProjectList);
router.get('/project/query', queryProject);

// mock
const { mock } = controller.mock;
// mock 请求
const mockUrl = pathToRegexp('/mock/:id/:url*', []);
allMethods.forEach((method) => {
  router[method](mockUrl, mock);
});

export = router;
