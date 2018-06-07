#启动项目
    npm run start
    nodemon server/index.js


#cookies
ctx.cookies.get(name, [options])
ctx.cookies.set(name, value, [options])

#抛出错误
ctx.throw([status],[msg], [properties])
ctx.assert(ctx.state.user, 401, 'User not found. Please login!');

#uuid
uuid.v1(); -->基于时间戳生成  （time-based）
uuid.v4(); -->随机生成  (random)

#Request别名
    ctx.header 请求标头对象
    ctx.headers 请求标头对象
    ctx.method 请求方法
    ctx.method= 设置请求方法
    ctx.url 获取请求URL
    ctx.url= 设置请求URL，对URL重写有用
    ctx.originalUrl 获取请求URL
    ctx.origin 获取URL的来源，包括protocol和host 如：http://example.com
    ctx.href 获取完整的请求URL，包括protocol,host和url 如：http://example.com/foo/bar?q=1
    ctx.path 获取请求路径名
    ctx.path= 设置请求路径名，并在存在时保留查询字符串
    ctx.query 获取解析的查询字符串，当额米有查询字符串时，返回一个孔对象。
    ctx.query= 将查询字符串设置为给定对象。
    ctx.querystring 根据？获取原始查询字符串
    ctx.querystring= 设置原始查询字符串
    ctx.host 获取当前主机
    ctx.hostname 存在时获取主机名
    ctx.fresh 检查请求缓存是否'新鲜',也就是内容没有改变。在设置一个或多个这些响应头后应该引用它。
    ctx.stale
    ctx.socket
    ctx.protocol 返回请求协议，'http'或'https'
    ctx.secure 通过 ctx.protocol == "https" 来检查请求是否通过 TLS 发出。
    ctx.ip 请求远程地址
    ctx.ips
    ctx.subdomains 将子域返回为数组。
    ctx.is() 检查传入请求是否包含 Content-Type 头字段， 并且包含任意的 mime type。
    ctx.accepts() 检查给定的type(s)是否可以接受，如果true，返回最佳匹配，否则false。
    ctx.acceptsEncodings() 检查 encodings 是否可以接受，返回最佳匹配为 true，否则为 false。
    ctx.acceptsCharsets() 检查charsets是否可以接受，在true时返回最佳匹配，否则为false。
    ctx.acceptsLanguages() 检查langs是否可以接受。
    ctx.get()

#Response 别名
    ctx.body  获取响应主体。
    ctx.body= 将响应体设置为以下之一：
    ctx.status 获取响应状态
    ctx.status= 通过数字代码设置响应状态
    ctx.message 获取响应的状态信息。
    ctx.message= 将响应的状态消息设置为给定值。
    ctx.length= 将响应的 Content-Length 设置为给定值。
    ctx.length 以数字返回响应的 Content-Length，或者从ctx.body推导出来，或者undefined。
    ctx.type= 设置响应 Content-Type  通过 mime 字符串或文件扩展名。
    ctx.type 获取响应 Content-Type 不含参数 "charset"。
    ctx.headerSent 检查是否已经发送了一个响应头。
    ctx.redirect(url, [alt]) 执行 [302] 重定向到 url.
    ctx.attachment() 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。
    ctx.set()
    ctx.append()
    ctx.remove()
    ctx.lastModified=
    ctx.etag=

