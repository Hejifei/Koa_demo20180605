'use strict'

const Router = require('koa-router');
const User = require('../app/controllers/user');
const Hello = require('../app/controllers/hello')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // user
  // router.post('/u/signup', App.hasBody, User.signup)
  // router.post('/u/update', App.hasBody, App.hasToken, User.update)

  router.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
  });
  router.get('/hello/:name', Hello.hello);
  router.get('/signin', User.signin);
  router.post('/signined', User.signined);
  router.get('/regist', User.regist);
  router.post('/registed', User.registed);

  router.get('/sessionGet', User.sessionGet);

  // DB Interface test
  // router.get('/user/users',User.users)
  // router.post('/user/add', User.addUser)
  // router.post('/user/delete',User.deleteUser)

  return router
}