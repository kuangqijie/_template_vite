
const fs = require('fs');
const path = require('path');

// fs.readFile('./src/components/PageTest.vue', 'utf8', (err, data) => {
//   console.log(err, data);
//   let reg = /data-tj\=['"]([^'"]+)['"]/g;
//   let list = data.match(reg);

//   console.log(list);
// })


const list = [];
let len = 0;
let num = 0;

fileDisplay('./src/components/');

// 生成埋点文件
function createTjFile() {
  let arr = list.map(item => item.split('=')[1]);
  arr = arr.map(item => item.replace(/['"]/g, ''));
  arr = arr.map(item => item.replace('-', ','));
  arr.unshift('0,首页pv');

  let res = Array.from(new Set(arr)); //去重

  console.log(res);

  fs.writeFile('./tj.txt', res.join('\r'), function (err) {
    if (err) {
      console.log(err);
    }
  })
}

function getFileTjStr(url) {
  let fileDir = path.join(process.cwd(), url);

  fs.readFile(fileDir, 'utf8', (err, data) => {
    // console.log(err, data);
    let reg = /data-tj\=['"]([^'"]+)['"]/g;
    let arr = data.match(reg);

    if (arr) {
      list.push(...arr);
    }
    num++;

    if (num == len) {
      console.log('list', list);
      createTjFile();
    }
  })
}


/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表  
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      len = files.length;
      //遍历读取到的文件列表  
      files.forEach(function (filename) {
        //获取当前文件的绝对路径  
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象  
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile();//是文件  
            var isDir = stats.isDirectory();//是文件夹  
            if (isFile) {
              // console.log(filedir);
              getFileTjStr(filedir);
            }
            if (isDir) {
              fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
            }
          }
        })
      });
    }
  });
} 