import fs from 'fs';
import path from 'path';

export function loadFileList(dir: string, prefix: string, func: any) {
  let files = fs.readdirSync(dir);
  let result: { [propName: string]: any } = {};

  files.forEach((file: any) => {
    if (path.extname(file) === '.ts') {
      let name = path.basename(file);
      let ctrlName = name.split('.')[0];
      if (ctrlName) {
        try {
          if (func) {
            result[ctrlName] = func(path.join(dir, file));
          } else {
            result[ctrlName] = require(path.join(dir, file));
            // import(path.join(dir, file)).then((rs) => {
            //   result[ctrlName] = rs;
            // });
          }
        } catch (e) {
          console.log(e);
          console.error(`加载页面出错：${dir}/${file}, ${e.message}`);
        }
      }
    }
  });
  return result;
}
