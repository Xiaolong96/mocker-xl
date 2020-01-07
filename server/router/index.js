"use strict";
const path = require("path");
const Router = require("koa-router");
const { pathToRegexp } = require('path-to-regexp');
const loadFileList = require("../util/loadFileList");
// const apiSchema = require("../api-schemas");

const allMethods = ['get', 'post', 'put', 'patch', 'delete'];

const router = new Router({
  // prefix: "/mock"
});

// const formatParam = require("../middleware/formatParam")(apiSchema);

const controller = loadFileList(
  path.join(__dirname, "../controller"),
  "controller"
);

console.log(controller);
// api
const { getApiList } = controller.api;

// mock
const { mock } = controller.mock;

router.get("/api/list", getApiList);

// mock 请求
const mockUrl = pathToRegexp('/mock/:id/:url*', [])
  allMethods.forEach(method => {
    router[method](mockUrl, mock);
  })

module.exports = router
