'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
var UserSchema = new Schema({
	phone: {
    unique: true,
    type: String,
    require:true
  },
  password:{
    type: String,
    require:true
  },        //密码
  nickname: String,         //昵称
  sex: {                    //1男，0女
    type:Number,
    default: 1
  },
  age: Number,
  avatar: String,           //头像
  // accessToken: String, 
  meta: {
    createAt: {             //创建时间
      type: String,
      dafault: new Date().toLocaleString()
    },
    updateAt: {             //更新时间
      type: String,
      dafault: new Date().toLocaleString()
    }
  }
})

// Defines a pre hook for the document.
UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = new Date().toLocaleString()
  }
  else {
    this.meta.updateAt = new Date().toLocaleString()
  }
  next()
})


/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
var User = mongoose.model('User', UserSchema)

module.exports = User

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */