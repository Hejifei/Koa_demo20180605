'use strict'

var mongoose =  require('mongoose')
var User = mongoose.model('User')

/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.findByPhone = async ({phone}) => {
	var query = User.find({phone})
	console.log('--------query-----');
	console.log(query)
	var res = null
	await query.exec(function(err, user) {
		if(err) {
			console.log('--------err-----');
			console.log(err)
			res = {}
		}else {
			console.log('--------user-----');
			console.log(user)
			res = user
		}
	})
	// console.log('res====>' + res)
	return res;
}

/**
 * 查找所用用户
 * @return {[type]} [description]
 */
exports.findAllUsers = async () => {
	var query = User.find({});
	var res = []
	await query.exec(function(err, users) {
		if(err) {
			res = []
		}else {
			console.log('--------user-----');
			console.log(user)
			res = users;
		}
	})
	return res
}

/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.addUser = async (user) => {
	user = await user.save()
	return user
}

/**
 * 删除用户
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.deleteUser = async ({phoneNumber}) => {
	var flag = false
	console.log('flag==========>'+flag)
	await User.remove({phoneNumber}, function(err) {
		if(err) {
			flag = false
			// return false
		}else{
			flag = true
		}
		
	})
	console.log('flag=====await=====>'+flag)
	return flag
}

/**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
exports.validatorSignUp = async(userInfo)=> {
    let result = {
		code:0,
		msg : ''
    }

    if ( /^[1][0-9]{10}$/.test(userInfo.phone) === false ) {
      result.msg = '手机号格式错误！'
      return result
    }
    
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.msg = '密码格式错误！';
      return result
    }
    // if ( userInfo.password !== userInfo.confirmPassword ) {
    //   result.message = '两次密码不同！'
    //   return result
    // }

    result.code = 1

    return result
  }