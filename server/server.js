import Koa from 'koa';
import views from 'koa-views';
const fs = require('fs');
import path from 'path';
const http = require('http');
const bodyParser = require('koa-bodyparser');//解析原始request请求
const app = new Koa();
const mongoose = require('mongoose')
const session = require('koa-session');

const db = 'mongodb://localhost/0605'

/**
 * mongoose连接数据库
 * @type {[type]}
 */
mongoose.Promise = require('bluebird')
mongoose.connect(db);
var dbDetail = mongoose.connection;

dbDetail.on('error', console.error.bind(console, 'connection error:'));

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, '../models')


/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)

app.keys = ['some secret hurr'];
const CONFIG = {
  //  key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 1000*60*60*24,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

app.use(require('koa-static')(path.join(__dirname, '../build')));
app.use(views(path.join(__dirname, '../views'), {
  extension: 'html'
}));

/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require('../routes/router')()

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());
  
http.createServer(app.callback()).listen(6005);
