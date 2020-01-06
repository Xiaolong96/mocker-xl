"use strict";
const path = require("path");
const Router = require("koa-router");
const loadFileList = require("../util/loadFileList");
// const apiSchema = require("../api-schemas");
const router = new Router({
  prefix: "/mock"
});

// const formatParam = require("../middleware/formatParam")(apiSchema);

const controller = loadFileList(
  path.join(__dirname, "../controller"),
  "controller"
);

console.log(controller);
// api
const { getApiList } = controller.api;
// router.get("/getList", formatParam, getApiDetail);
router.get("/list", getApiList);

module.exports = router
