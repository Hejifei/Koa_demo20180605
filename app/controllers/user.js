'use strict'

var xss = require('xss')
var mongoose =  require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
var userHelper = require('../../dbhelper/userHelper')
var md5 = require('md5');
const session = require('koa-session');

/**
 * 登录界面
 */
exports.signin = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
      <form action="/api/signined" method="post">
          <p>Phone: <input name="phone" value="18020285668"></p>
          <p>Password: <input name="password" type="password" value="123456"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`;
}

/**
 * 登录接口
 */
exports.signined = async (ctx, next) => {
    // console.log(ctx.session)
  ctx.assert(ctx.request.body.phone, 500, 'phone required!');
  ctx.assert(ctx.request.body.password, 500, 'password required!');
  if(ctx.cookies.get('hejifei')){
    ctx.body = {
        code:-2,
        data : '已登录，请勿重复登录！'
    }
    return next
  }
  let
      phone = ctx.request.body.phone || '',
      password = ctx.request.body.password || '';
  var user = await User.findOne({
    phone: phone
  }).exec();
  if (user) {
    let accessToken=uuid.v1();
    user.save()
    if(user.password ===  md5(password)){
        // 登录成功
        ctx.body = {
            code:1,
            data : '登录成功！'
        }
        ctx.session[accessToken] =user._id;
        ctx.cookies.set(
            'sid',accessToken,{
                domain:'localhost', // 写cookie所在的域名
                path:'/',       // 写cookie所在的路径
                maxAge: 24*60*60*1000,   // cookie有效时长
                // expires:new Date('2018-06-08'), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取
                overwrite:false  // 是否允许重写
            }
        );
    }else{
        ctx.body = {
            code:0,
            data : '密码错误！'
        }
    }
  }else{
    ctx.body = {
        code:0,
        data : '用户不存在！'
    }
  }
}

exports.sessionGet = async(ctx,netx)=>{
    let sid = ctx.cookies.get('sid')
    ctx.response.body = `${ctx.session[sid]}`
}

/**
 * 注册
 */
exports.regist = async (ctx, next) => {
    ctx.response.body = `<h1>Register</h1>
        <form action="/api/registed" method="post">
            <p>Phone: <input name="phone" value="18012642496"></p>
            <p>Password: <input name="password" type="password" value="123456"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
  }

/**
 * 注册接口
 */
exports.registed = async (ctx, next) => {
    //判定手机号、密码是否为空
    ctx.assert(ctx.request.body.phone, 500, 'phone required!');
    ctx.assert(ctx.request.body.password, 500, 'password required!');
    //所填内容添加验证
    let validateResult =await userHelper.validatorSignUp( ctx.request.body )
    if ( validateResult.code === 0 ) {
        ctx.body = validateResult
        return next 
    }
    let phone = ctx.request.body.phone || '',
        password = ctx.request.body.password || '';
    //查询手机号是否存在
    var user = await User.findOne({
        phone: phone
      }).exec()
    //手机号不存在，进行注册
    if (!user) {
        user = new User({
            phone: xss(phone),
            password: md5(password),
            accessToken:uuid.v1()
        })
    }else{
        ctx.body = {
            code:0,
            msg : '已经注册过了'
        }
        return next
    }
    try {
        user = await user.save()
        ctx.body = {
            code:1,
            msg : '注册成功！'
          }
    }
    catch (e) {
        ctx.body = {
            code:0,
            msg : '注册失败！'
        }
        return next
    }
  }