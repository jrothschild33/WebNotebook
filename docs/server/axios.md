# Axios

## 第1章 Axios概述

### 1.1 Axios简介

> 文档: [https://github.com/axios/](https://github.com/axios/)

1. Axios是前端最流行的 ajax 请求库

2. react/vue 官方都推荐使用 axios 发 ajax 请求

3. 简单引入：

   ```html
   <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
   ```

4. 项目安装：

   ```bash
   npm i axios | yarn add axios
   ```

------

### 1.2 Axios特点

1. 基于 xhr + promise 的异步 ajax 请求库
2. 浏览器端/node 端都可以使用
3. 支持请求／响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

------

### 1.3 Json-Server

> 文档：[https://github.com/typicode/json-server](https://github.com/typicode/json-server)

1. 介绍：基于json文件快速搭建一个模拟服务器，方便前端测试

2. 安装：

   ```bash
   npm install -g json-server
   ```

3. 创建json文件：db.json

   ```json
   {
     "posts": [
       {
         "id": 1,
         "title": "json-server",
         "author": "typicode"
       },
       {
         "id": 2,
         "title": "尚硅谷大厂学院上线啦",
         "author": "小编"
       }
     ],
     "comments": [
       {
         "id": 1,
         "body": "some comment",
         "postId": 1
       },
       {
         "body": "喜大普奔",
         "postId": 2,
         "id": 2
       }
     ],
     "profile": {
       "name": "typicode"
     }
   }
   ```

4. 启动模拟服务器：

   ```bash
   json-server --watch db.json
   ```

------

## 第2章 Axios语法

<img :src="$withBase('/imgs/server/axios语法.png')" alt="axios语法">

### 2.1 通用方法

1. `axios(config)`: 通用/最本质的发任意类型请求的方式

   ```js
   axios({
     // 请求类型
     method: 'xxx',
     // URL
     url: 'xxx',
     // 设置请求体
     data: {
   	key1: value1,
       key2: value2,
     },
   }).then((response) => {
     ......
   })
   ```

2. 案例：

   ```html
   <button class="btn btn-primary">发送GET请求</button>
   <button class="btn btn-warning">发送POST请求</button>
   <button class="btn btn-success">发送 PUT 请求</button>
   <button class="btn btn-danger">发送 DELETE 请求</button>
   ```

   1）GET请求：

   ```js
   // 获取按钮
   const btns = document.querySelectorAll('button')
   // 第一个
   btns[0].onclick = function () {
     // 发送 AJAX 请求
     axios({
       // 请求类型
       method: 'GET',
       // URL（获取id为2的数据）
       url: 'http://localhost:3000/posts/2',
     }).then((response) => {
       console.log(response)
     })
   }
   ```

   2）POST请求：

   ```js
   // 添加一篇新的文章
   btns[1].onclick = function () {
     // 发送 AJAX 请求
     axios({
       // 请求类型
       method: 'POST',
       // URL
       url: 'http://localhost:3000/posts',
       // 设置请求体
       data: {
         title: '今天天气不错, 还挺风和日丽的',
         author: '张三',
       },
     }).then((response) => {
       console.log(response)
     })
   }
   ```

   3）PUT请求：

   ```js
   // 更新数据
   btns[2].onclick = function () {
     // 发送 AJAX 请求
     axios({
       // 请求类型
       method: 'PUT',
       // URL
       url: 'http://localhost:3000/posts/3',
       // 设置请求体
       data: {
         title: '今天天气不错, 还挺风和日丽的',
         author: '李四',
       },
     }).then((response) => {
       console.log(response)
     })
   }
   ```

   4）DELETE请求：

   ```js
   // 删除数据
   btns[3].onclick = function () {
     // 发送 AJAX 请求
     axios({
       // 请求类型
       method: 'delete',
       // URL
       url: 'http://localhost:3000/posts/3',
     }).then((response) => {
       console.log(response)
     })
   }
   ```

------

### 2.2 发送请求

1. `axios.request(config)`: 等同于`axios(config)`

   ```js
   axios
     .request({
       method: 'xxx',
       url: 'xxx',
       data: {
   	  key1: value1,
         key2: value2,
       },
     })
     .then((response) => {
       ......
     })
   ```

2. `axios.get(url[, config])`: 发GET请求

3. `axios.delete(url[, config])`: 发DELETE请求

4. `axios.head(url[, config])`: 发HEAD请求

5. `axios.options(url[, config])`: 发OPTIONS请求

6. `axios.post(url[, data[, config]])`: 发POST请求

   ```js
   // 案例
   btns[1].onclick = function () {
     axios
       .post('http://localhost:3000/comments', {
         // 这里的key要根据服务器要求的格式配置
         body: '喜大普奔',
         postId: 2,
       })
       .then((response) => {
         console.log(response)
       })
   }
   ```

7. `axios.put(url[, data[, config]])`: 发PUT请求

8. `axios.patch(url[, data[, config]])`: 发PATCH请求

------

### 2.3 响应结构

> axios返回的`response`对象（以GET为例）

1. `config`：配置项

   ```json
   adapter: ƒ (e)
   data: undefined
   headers: {Accept: 'application/json, text/plain, */*'}
   maxBodyLength: -1
   maxContentLength: -1
   method: "get"
   timeout: 0
   transformRequest: [ƒ]
   transformResponse: [ƒ]
   url: "http://localhost:3000/posts/2"
   validateStatus: ƒ (e)
   xsrfCookieName: "XSRF-TOKEN"
   xsrfHeaderName: "X-XSRF-TOKEN"
   [[Prototype]]: Object
   ```

2. `data`：响应体

   ```json
   author: "小编"
   id: 2
   title: "尚硅谷大厂学院上线啦"
   [[Prototype]]: Object
   ```

3. `headers`：响应头

   ```json
   cache-control: "no-cache"
   content-length: "80"
   content-type: "application/json; charset=utf-8"
   expires: "-1"
   pragma: "no-cache"
   [[Prototype]]: Object
   ```

4. `request`：XMLHttpRequest（原生Ajax请求对象）

   ```json
   onabort: ƒ ()
   onerror: ƒ ()
   onload: null
   onloadend: null
   onloadstart: null
   onprogress: null
   onreadystatechange: ƒ ()
   ontimeout: ƒ ()
   readyState: 4
   response: "{\n  \"id\": 2,\n  \"title\": \"尚硅谷大厂学院上线啦\",\n  \"author\": \"小编\"\n}"
   responseText: "{\n  \"id\": 2,\n  \"title\": \"尚硅谷大厂学院上线啦\",\n  \"author\": \"小编\"\n}"
   responseType: ""
   responseURL: "http://localhost:3000/posts/2"
   responseXML: null
   status: 200
   statusText: "OK"
   timeout: 0
   upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
   withCredentials: false
   [[Prototype]]: XMLHttpRequest
   ```

5. `status`：响应码

6. `statusText`：响应字符串

------

### 2.4 Config

> Axios发送请求时的`config`可选配置项

1. 常用选项：

   - `url`：发送请求的地址
   - `method`：发送请求方式
   - `baseURL`：可以设置基准URL，默认与URL进行拼接，简化代码
   - `transformRequest`：对request进行处理
   - `transformResponse`：对response进行处理
   - `headers`：控制请求头信息（如传递文件时需要添加）
   - `params`：实现在url中传递参数，格式为`?a=100&b=200`
   - `paramsSerializer`：转换传递的params，格式为`/a/100/b/200 `或`/a.100/b.200`
   - `data`：请求体设置，对象形式（json）、字符串形式（url参数传递）
   - `proxy`：代理设置，用在后端nodejs，爬虫、投票等常用

2. 整体选项：

   ```js
   {
     url: '/user',
     method: 'get', // 默认
     // 可以设置基准URL，默认与URL进行拼接，简化代码
     baseURL: 'https://some-domain.com/api/',
     // 对request进行处理
     transformRequest: [function (data, headers) {
       // Do whatever you want to transform the data
       return data;
     }],
     // 对response进行处理
     transformResponse: [function (data) {
       // Do whatever you want to transform the data
       return data;
     }],
     // 控制请求头信息（如传递文件时需要添加）
     headers: {'X-Requested-With': 'XMLHttpRequest'},
     // 实现在url中传递参数：/user?a=100&b=200
     params: {
       a: 100,
       b: 200,
     },
     // 参数序列化：转换传递的params
     // 正常情况：/user?a=100&b=200
     // 转化后：/user/a/100/b/200 或 /user/a.100/b.200
     paramsSerializer: {
       indexes: null // array indexes format (null - no brackets, false - empty brackets, true - brackets with indexes)
     },
     // 请求体设置：对象形式
     data: {
       firstName: 'Fred'
     },
     // 请求体设置：字符串形式
     data: 'Country=Brasil&City=Belo Horizonte',
     // 超时时间：毫秒，超过时间后发送请求被终止
     timeout: 1000, // default is `0` (no timeout)
     // 跨域请求时是否携带cookie
     withCredentials: false, // default
     // 设置请求识别器（2个运行环境：发送ajax、nodejs中发送http请求）
     adapter: function (config) {
       /* ... */
     },
     // 请求验证（用户名、密码）
     auth: {
       username: 'janedoe',
       password: 's00pers3cret'
     },
     // 响应结果的格式
     responseType: 'json', // default
     // 响应结果的编码
     responseEncoding: 'utf8', // default
     // 跨域请求标识：设置cookie的名字（用于安全保护）
     xsrfCookieName: 'XSRF-TOKEN', // default
     // 跨域请求标识：设置header名字（用于安全保护）
     xsrfHeaderName: 'X-XSRF-TOKEN', // default
     // 上传时的回调函数
     onUploadProgress: function (progressEvent) {
       // Do whatever you want with the native progress event
     },
     // 下载时的回调函数
     onDownloadProgress: function (progressEvent) {
       // Do whatever you want with the native progress event
     },
     // http响应体的最大尺寸（单位：字节）
     maxContentLength: 2000,
     // 请求体的最大尺寸（单位：字节）
     maxBodyLength: 2000,
     // 对响应结果的成功进行设置（默认：响应码在200-300之间）
     validateStatus: function (status) {
       return status >= 200 && status < 300; // default
     },
     // 最大跳转次数（用在后端nodejs中的）
     maxRedirects: 21, // default
     // 在跳转之前的回调函数
     beforeRedirect: (options, { headers }) => {
       if (options.hostname === "example.com") {
         options.auth = "user:password";
       }
     },
     // 设置socket文件路径（如果也设置了proxy，则优先使用socket）
     socketPath: null, // default
     // 客户端信息设置
     httpAgent: new http.Agent({ keepAlive: true }),
     httpsAgent: new https.Agent({ keepAlive: true }),
     // 代理设置（优先使用socket）：用在后端nodejs，爬虫、投票等常用
     proxy: {
       protocol: 'https',
       host: '127.0.0.1',
       port: 9000,
       auth: {
         username: 'mikeymike',
         password: 'rapunz3l'
       }
     },
     // 对ajax取消进行设置
     cancelToken: new CancelToken(function (cancel) {
     }),
   
     signal: new AbortController().signal,
     // 相应结果是否解压（针对nodejs）
     decompress: true // default
   
     insecureHTTPParser: undefined // default
   
     transitional: {
       silentJSONParsing: true,
       forcedJSONParsing: true,
       clarifyTimeoutError: false,
     },
   
     env: {
       FormData: window?.FormData || global?.FormData
     },
   
     formSerializer: {
         visitor: (value, key, path, helpers)=> {}; 
         dots: boolean; 
         metaTokens: boolean; 
         indexes: boolean;
     }
   }
   ```

------

### 2.5 Defaults

> `axios.defaults.xxx`: 请求的默认全局配置，可以简化代码

1. 未设置默认全局配置：

   ```js
   const btns = document.querySelectorAll('button')
   
   btns[0].onclick = function () {
     axios({
       url: '/posts',
       methods: 'GET',
       params: { id: 1 },
       timeout: 3000,
     }).then((response) => {
       console.log(response)
     })
   }
   ```

2. 设置默认全局配置：

   ```js
   axios.defaults.method = 'GET' // 设置默认的请求类型为 GET
   axios.defaults.baseURL = 'http://localhost:3000' // 设置基础 URL
   axios.defaults.params = { id: 1 }
   axios.defaults.timeout = 3000 //
   
   btns[0].onclick = function () {
     axios({
       url: '/posts',
     }).then((response) => {
       console.log(response)
     })
   }
   ```

------

### 2.6 Create

> `axios.create([config])`：创建一个新的axios发送请求，基本方法都可使用，但没有取消请求、批量发请求的方法

1. 作用：如果需要对多个端口发送请求，使用create创建多个axios对象，可以实现与axios相同功能

2. 案例：

   ```js
   // 实例1
   const duanzi = axios.create({
     baseURL: 'https://api.apiopen.top',
     timeout: 2000,
   })
   
   // 实例2
   const baidu = axios.create({
     baseURL: 'https://apis.baidu.com',
     timeout: 2000,
   })
   
   // axios能用的语法，实例都可以用
   duanzi({
     url: '/getJoke',
   }).then((response) => {
     console.log(response)
   })
   
   // axios能用的语法，实例都可以用
   baidu.get('/map').then((response) => {
     console.log(response.data)
   })
   ```

------

### 2.7 拦截器

> `axios.interceptors.xxx`：请求拦截器、响应拦截器，发送请求、接收响应之前可以进行处理

1. 说明：调用 axios()并不是立即发送ajax请求，而是需要经历一个较长的流程

2. 执行顺序：请求拦截器2 => 请求拦截器1 => 发ajax请求 => 响应拦截器1 => 响应拦截器 2 => 请求的回调

3. 注意：此流程是通过 promise 串连起来的，请求拦截器传递的是 `config`，响应拦截器传递的是 `response`

4. 案例：

   1）设置请求拦截器：`axios.interceptors.request.use()`

   ```js
   // 请求拦截器：由后向前执行（执行顺序：2）
   axios.interceptors.request.use(
     function (config) {
       console.log('请求拦截器 成功 - 1号')
       // 修改 config 中的参数
       config.params = { a: 100 }
       return config
     },
     function (error) {
       console.log('请求拦截器 失败 - 1号')
       return Promise.reject(error)
     }
   )
   
   // 请求拦截器：由后向前执行（执行顺序：1）
   axios.interceptors.request.use(
     function (config) {
       console.log('请求拦截器 成功 - 2号')
       // 修改 config 中的参数
       config.timeout = 2000
       return config
     },
     function (error) {
       console.log('请求拦截器 失败 - 2号')
       return Promise.reject(error)
     }
   )
   ```

   2）设置响应拦截器：`axios.interceptors.response.use()`

   ```js
   // 响应拦截器：由前向后执行（执行顺序：1）
   axios.interceptors.response.use(
     function (response) {
       console.log('响应拦截器 成功 1号')
       return response.data
       // return response;
     },
     function (error) {
       console.log('响应拦截器 失败 1号')
       return Promise.reject(error)
     }
   )
   
   // 响应拦截器：由前向后执行（执行顺序：2）
   axios.interceptors.response.use(
     function (response) {
       console.log('响应拦截器 成功 2号')
       return response
     },
     function (error) {
       console.log('响应拦截器 失败 2号')
       return Promise.reject(error)
     }
   )
   ```

   3）测试：发送请求

   ```js
   axios({
     method: 'GET',
     url: 'http://localhost:3000/posts',
   }).then((response) => {
     console.log('自定义回调处理成功的结果')
     console.log(response)
   })
   ```

------

### 2.8 取消请求

1. 基本方法：

   1）`axios.Cancel()`：用于创建取消请求的错误对象

   2）`axios.CancelToken()`：用于创建取消请求的 token 对象

   3）`axios.isCancel()`：是否是一个取消请求的错误

2. 实现流程：

   1）配置`cancelToken`对象

   2）缓存用于取消请求的`cancel`函数

   3）在后面特定时机调用`cancel`函数取消请求

   4）在错误回调中判断如果`error`是`cancel`, 做相应处理

3. 案例：

   1）点击按钮，取消某个正在请求中的请求

   2）在请求一个接口前，取消前面一个未完成的请求

   3）可以配合json-server中的delay功能进行测试：`json-server --watch db.json -d 2000`

   ```html
   <button class="btn btn-primary">发送请求</button>
   <button class="btn btn-warning">取消请求</button>
   ```

   ```js
   // 获取按钮
   const btns = document.querySelectorAll('button')
   // 2.声明全局变量
   let cancel = null
   
   // 发送请求
   btns[0].onclick = function () {
     // 检测上一次的请求是否已经完成
     if (cancel !== null) {
       // 取消上一次的请求
       cancel()
     }
     axios({
       method: 'GET',
       url: 'http://localhost:3000/posts',
       // 1. 添加配置对象的属性
       cancelToken: new axios.CancelToken(function (c) {
         // 3. 将c的值赋值给 cancel
         cancel = c
       }),
     }).then((response) => {
       console.log(response)
       // 将 cancel 的值初始化
       cancel = null
     })
   }
   
   // 绑定第二个事件取消请求
   btns[1].onclick = function () {
     cancel()
   }
   ```

------

### 2.9 批量请求

1. 基本方法：

   1）`axios.all(promises)`: 用于批量执行多个异步请求

   2）`axios.spread()`: 用来指定接收所有成功数据的回调函数的方法

2. 注意：以上方法已被遗弃，需要使用`Promise.all`代替

------

