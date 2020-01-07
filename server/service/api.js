const ApiModel = require('../model/api');

function createApi (api) {
  return ApiModel.create(api);
}

function getApiByUrl (url) {
  const reg = new RegExp(`.*${url}.*`, 'i')
  const condition = {url: reg};
  return ApiModel.findOne(condition).sort({modifiedTime: -1});
}
module.exports = {
  createApi,
  getApiByUrl,
}