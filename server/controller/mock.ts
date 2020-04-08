import path from 'path';
import http from 'http';
import url from 'url';
import fs from 'fs';
import querystring from 'querystring';
import { loadFileList } from '../util/loadFileList';
import { IProject } from '../types';

const service = loadFileList(path.join(__dirname, '../service'), 'service', null);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

const httpRequest = (ctx: any, options: any) => {
  return new Promise((resolve) => {
    delete ctx.request.header.host;

    let requestBody = '',
      chunks = '',
      fileFields: any = null,
      files: any,
      boundaryKey,
      boundary: string,
      endData: any,
      filesLength: number,
      totallength = 0;
    console.log('ctx.request.body', ctx.request.body);
    if (ctx.request.body) {
      const contentType = ctx.request.header['content-type'] || 'application/json';
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        requestBody = querystring.stringify(ctx.request.body);
        options.headers['Content-Length'] = Buffer.byteLength(requestBody);
      } else if (contentType.indexOf('application/json') > -1) {
        requestBody = JSON.stringify(ctx.request.body);
        options.headers['Content-Length'] = Buffer.byteLength(requestBody);
      } else if (contentType.indexOf('multipart/form-data') > -1) {
        fileFields = ctx.request.body.fields;
        files = ctx.request.body.files;
        boundaryKey = Math.random().toString(16);
        boundary = `\r\n----${boundaryKey}\r\n`;
        endData = `\r\n----${boundaryKey}--`;
        filesLength = 0;
        Object.keys(fileFields).forEach((key) => {
          requestBody += `${boundary}Content-Disposition:form-data;name="${key}"\r\n\r\n${fileFields[key]}`;
        });
        Object.keys(files).forEach((key) => {
          requestBody += `${boundary}Content-Type: application/octet-stream\r\nContent-Disposition: form-data; name="${key}";filename="${files[key].name}"\r\nContent-Transfer-Encoding: binary\r\n\r\n`;
          filesLength += Buffer.byteLength(requestBody, 'utf-8') + files[key].size;
        });
        options.headers['Content-Type'] = `multipart/form-data; boundary=--${boundaryKey}`;
        options.headers[`Content-Length`] = filesLength + Buffer.byteLength(endData);
      } else {
        requestBody = JSON.stringify(ctx.request.body);
        options.headers['Content-Length'] = Buffer.byteLength(requestBody);
      }
    }
    console.log(options);
    const req = http.request(options, (res) => {
      console.log('statusCode: ', res.statusCode);
      // console.log('headers: ', res.headers);
      res.setEncoding('utf8');
      res.on('data', (chunk: any) => {
        // console.log(chunk.toString('utf-8'));
        chunks += chunk;
        totallength += chunk.length;
      });
      res.on('end', () => {
        console.log('end', chunks);
        resolve(chunks);
      });
    });
    console.log('requestBody', requestBody);
    ctx.request.body && req.write(requestBody);
    req.on('error', function(err) {
      console.error(`请求出错: ${err}`);
    });
    if (fileFields) {
      let filesArr = Object.keys(files);
      let uploadConnt = 0;
      filesArr.forEach((key) => {
        let fileStream = fs.createReadStream(files[key].path);
        fileStream.on('end', () => {
          fs.unlink(files[key].path, (err) => {
            if (!err) {
              console.log('删除成功');
            }
          });
          uploadConnt++;
          if (uploadConnt == filesArr.length) {
            req.end(endData);
          }
        });
        fileStream.pipe(req, { end: false });
      });
    } else {
      req.end();
    }
  });
};

export async function mock(ctx: any) {
  try {
    // 根据url中包含的projectId获取代理信息
    const proj: IProject = await service.project.findProject(ctx.url.split('/')[2]);
    const { status, target, cookie } = proj.proxy;
    // 如果代理状态为开的情况，直接走代理
    if (status == 1) {
      // console.log(
      //   url.parse(
      //     target +
      //       '/' +
      //       ctx.url
      //         .split('/')
      //         .slice(4)
      //         .join('/')
      //   )
      // );
      const { hostname, path, port } = url.parse(
        target +
          '/' +
          ctx.url
            .split('/')
            .slice(4)
            .join('/')
      );
      const options = {
        host: hostname,
        port: port || 80,
        path,
        method: ctx.method,
        headers: {
          // ...ctx.request.header,
          'Content-Type': ctx.request.header['content-type'] || 'application/json',
          cookie: cookie
        }
      };
      ctx.body = await httpRequest(ctx, options);
      // console.log(ctx.body, 'ctx.body');
    } else {
      console.log('>>>>>>>', ctx.url.split('?')[0]);
      // 忽略url拼接参数
      const api = await service.api.getApiByUrl(ctx.url.split('?')[0]);
      // console.log(api, 'api');
      if (!api) return;
      // 方法不匹配
      // console.log(ctx.method);
      if (api.options.method !== ctx.method.toLowerCase()) {
        ctx.status = 405;
        return;
      }
      const delay = api.options.delay || 0;
      await sleep(delay);
      // TODO: 参数校验

      ctx.body = api.options.response || {};
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error('接口 mock 出错', { error });
  }
}
