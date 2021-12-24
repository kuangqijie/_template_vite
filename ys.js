
/** 
 * 
 * 参考： https://segmentfault.com/a/1190000015467084
 * 优化：通过 X-Forwarded-For 添加了动态随机伪IP，绕过 tinypng 的上传数量限制
 * 
 *  */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// 待压缩图片所在目录，默认当前脚本所在目录
// const cwd = process.cwd();
const cwd = path.join(process.cwd(), 'src/images');

const exts = ['.jpg', '.png']; //可压缩的图片格式
const max = 5200000; // 图片最大不能超过5M
const isDeep = true; //是否递归文件夹


const options = {
  method: 'POST',
  hostname: 'tinypng.com',
  path: '/web/shrink',
  headers: {
    rejectUnauthorized: false,
    'Postman-Token': Date.now(),
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
  }
};


console.log('root', cwd)

fileList(cwd);


// 生成随机IP， 赋值给 X-Forwarded-For
function getRandomIP() {
  return Array.from(Array(4)).map(() => parseInt(Math.random() * 255)).join('.')
}

// 获取文件列表
function fileList(folder) {
  let outDir = path.join(cwd, 'output');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.readdir(folder, (err, files) => {
    if (err) console.error(err);
    // console.log('当前目录的内容', files)

    files.forEach(file => {
      fileFilter(path.join(folder, file));
    });
  });
}

// 过滤文件格式，返回所有jpg,png图片
function fileFilter(file) {
  fs.stat(file, (err, stats) => {
    if (err) return console.error(err);

    // 必须是文件，小于5MB，后缀 jpg||png
    if (stats.isFile() && stats.size <= max && exts.includes(path.extname(file))) {

      fileUpload(file); // console.log('可以压缩：' + file);
    }
    // 如果是文件夹
    if (isDeep && stats.isDirectory() && !file.endsWith('output')) {
      // console.log(file)

      let outDir = path.join(cwd, 'output', file.replace(cwd, ''));
      // 创建输出目录
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }

      fileList(file + '/');
    }
  });
}

// 异步API,压缩图片
// {"error":"Bad request","message":"Request is invalid"}
// {"input": { "size": 887, "type": "image/png" },"output": { "size": 785, "type": "image/png", "width": 81, "height": 81, "ratio": 0.885, "url": "https://tinypng.com/web/output/7aztz90nq5p9545zch8gjzqg5ubdatd6" }}
function fileUpload(img) {
  // 通过 X-Forwarded-For 头部伪造客户端IP
  options.headers['X-Forwarded-For'] = getRandomIP();
  // console.log('正在请求压缩图片：', img)
  var req = https.request(options, function (res) {
    res.on('data', buf => {
      let obj = JSON.parse(buf.toString());
      if (obj.error) {
        console.log(`[${img}]：压缩失败！报错：${obj.message}`);
      } else {
        // 压缩成功，下载图片到本地
        fileUpdate(img, obj);
      }
    });
  });

  req.write(fs.readFileSync(img), 'binary');
  req.on('error', e => {
    console.error(e);
  });
  req.end();
}
// 该方法被循环调用,请求图片数据
function fileUpdate(imgpath, obj) {
  // 输出文件路径，输出到当前目录output文件夹
  const outImgPath = path.join(cwd, 'output', imgpath.replace(cwd, ''));

  // 当前文输出目录
  // const fileName = outImgPath.split('\\').pop();
  // const fileDir = outImgPath.replace('\\' + fileName, '');
  // console.log('当前文件目录:', fileDir)

  if (!fs.existsSync(path.join(cwd, 'output'))) {
    fs.mkdirSync(path.join(cwd, 'output'));
  }

  let options = new URL(obj.output.url);
  let req = https.request(options, res => {
    let body = '';
    res.setEncoding('binary');
    res.on('data', function (data) {
      body += data;
    });

    res.on('end', function () {
      fs.writeFile(outImgPath, body, 'binary', err => {
        if (err) return console.error(err);
        console.log(
          `[${imgpath}] 输出成功，${(obj.input.size / 1024).toFixed(2)}kb———>${(obj.output.size / 1024).toFixed(2)
          }kb，优化比例${obj.output.ratio}`
        );
      });
    });
  });
  req.on('error', e => {
    console.error(e);
  });
  req.end();
}
