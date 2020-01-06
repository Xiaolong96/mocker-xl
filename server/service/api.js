const ApiModel = require('../model/api');

async function createApi (api) {
  return ApiModel.create(api);
}

module.exports = {
  createApi,
}