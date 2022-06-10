# Node.js

## 第1章 基础知识

> N章ode.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境

1. 官网：[https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

2. 作用：可以使 JavaScript 基于Node.js 做后端开发

3. 版本：

   1）LTS：长期稳定版，适合追求稳定性的企业级项目（推荐）

   2）Current：新特性尝鲜版，适合热衷于尝试新特性的用户，但可能有Bug和漏洞

4. 区别：Node.js 中无法调用 DOM 和 BOM 等浏览器内置 API，只能调用Node.js的内置API

   |                环境                |                             图解                             |
   | :--------------------------------: | :----------------------------------------------------------: |
   | 浏览器：JavaScript 的前端运行环境  | <img :src="$withBase('/imgs/basic/JavaScript 的前端运行环境.png')"> |
   | Node.js：JavaScript 的后端运行环境 | <img :src="$withBase('/imgs/basic/JavaScript 的后端运行环境.png')"> |

5. 工具：

   1）[Express](http://www.expressjs.com.cn/)：快速构建 Web 应用

   2）[Electron](https://electronjs.org/)：构建跨平台的桌面应用

   3）[Restify](http://restify.com/)：快速构建 API 接口项目

6. 执行命令：`node 项目名称.js`

7. [nodemon](https://www.npmjs.com/package/nodemon)：调试工具，能够监听项目文件的变动，当代码被修改后，nodemon 会自动重启项目

   1）安装：`npm i nodemon -g`

   2）运行：`nodemon 项目名称.js`

------

## 第2章 内置API

### 2.1 FS模块

> fs模块是官方提供的、用来操作文件的模块。

1. 导入：

   ```js
   const fs = require('fs')
   ```

2. `fs.readFile(path[,options],callback) `：用来读取指定文件中的内容

   1）参数：

   * `path`：文件的路径
   * `options`：可选，以什么编码格式来读取文件，如 utf8
   * `callback`：文件读取完成后，通过回调函数拿到读取的结果

   2）回调函数：`function(err, result)`

   * err：如果为 `null`，表示读取成功；如果是`ture`，可用 `err.message` 显示错误信息
   * result：读取结果

   ```js
   const fs = require('fs')
   fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
     if (err) {
       return console.log('读取文件失败！' + err.message)
     }
     console.log('读取文件成功！' + dataStr)
   })
   ```

3. `fs.writeFile(file,data[,options],callback)`：用来向指定的文件中写入内容

   1）参数：

   * `path`：文件的路径
   * `data`：要写入的内容
   * `options`：可选，以什么编码格式来写入文件，默认 utf8
   * `callback`：文件写入完成后的回调函数

   2）回调函数：`function(err)`

   * err：如果为 `null`，表示写入成功；如果是 `ture`，可用 err.message 显示错误信息

   3）fs.writeFile() 方法只能用来创建文件，不能用来创建路径

   4）重复调用 fs.writeFile() 写入同一个文件，新写入的内容会覆盖之前的旧内容

   ```js
   const fs = require('fs')
   fs.writeFile('./files/3.txt', 'ok123', function (err) {
     if (err) {
       return console.log('文件写入失败！' + err.message)
     }
     console.log('文件写入成功！')
   })
   ```

   ```js
   // 案例：整理成绩
   // 成绩.txt：小红=66 小白=100 小黄=70 小黑=66 小绿=88
   const fs = require('fs')
   fs.readFile(__dirname + '/files/成绩.txt', 'utf8', function (err, dataStr) {
     if (err) {
       return console.log('读取文件失败！' + err.message)
     }
     // 先把成绩的数据，按照空格进行分割
     const arrOld = dataStr.split(' ')
     // 循环分割后的数组，对每一项数据，进行字符串的替换操作
     const arrNew = []
     arrOld.forEach((item) => {
       arrNew.push(item.replace('=', '：'))
     })
     // 把新数组中的每一项，进行合并，得到一个新的字符串
     const newStr = arrNew.join('\r\n')
     // 调用 fs.writeFile() 方法，把处理完毕的成绩，写入到新文件中
     fs.writeFile(__dirname + '/files/成绩-ok.txt', newStr, function (err) {
       if (err) {
         return console.log('写入文件失败！' + err.message)
       }
       console.log('成绩写入成功！')
     })
   })
   ```

4. 路径动态拼接的问题

   1）问题：如果提供的操作路径是以 `./` 或 `../` 开头的相对路径时，很容易出现路径动态拼接错误的问题

   2）解决：`__dirname`，表示当前文件所处目录，直接提供完整的路径

   3）注意：路径拼接用 `path.join()` 方法进行处理，不要直接使用 + 进行字符串的拼接

   ```js
   const fs = require('fs')
   // 出现路径拼接错误的问题，是因为提供了 ./ 或 ../ 开头的相对路径
   // 如果要解决这个问题，可以直接提供一个完整的文件存放路径就行
   fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
     if (err) {
       return console.log('读取文件失败！' + err.message)
     }
     console.log('读取文件成功！' + dataStr)
   })
   
   // 但移植性非常差、不利于维护
   fs.readFile('C:\\Users\\escook\\Desktop\\Node.js基础\\day1\\code\\files\\1.txt', 'utf8', function (err, dataStr) {
     if (err) {
       return console.log('读取文件失败！' + err.message)
     }
     console.log('读取文件成功！' + dataStr)
   })
   
   // __dirname 表示当前文件所处的目录
   fs.readFile(__dirname + '/files/1.txt', 'utf8', function (err, dataStr) {
     if (err) {
       return console.log('读取文件失败！' + err.message)
     }
     console.log('读取文件成功！' + dataStr)
   })
   ```

------

### 2.2 Path模块

> path模块是官方提供的、用来处理路径的模块。

1. 导入：

   ```js
   const path = require('path')
   ```

2. `path.join([...paths])`：用来将多个路径片段拼接成一个完整的路径字符串

   1）`...paths`：可选，路径片段的序列

   2）注意：`../` 会抵消前面的路径

   ```js
   const path = require('path')
   const fs = require('fs')
   
   // 注意：  ../ 会抵消前面的路径
   // const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
   // console.log(pathStr) // \a\b\d\e
   
   fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function (err, dataStr) {
     if (err) {
       return console.log(err.message)
     }
     console.log(dataStr)
   ```

3. `path.basename(path[,ext])`：用来从路径字符串中将文件名解析出来

   1）`path`：路径字符串

   2）`ext`：可选，件扩展名

   ```js
   const path = require('path')
   // 定义文件的存放路径
   const fpath = '/a/b/c/index.html'
   // 输出文件全称（带扩展名）
   const fullName = path.basename(fpath)
   console.log(fullName)		// index.html
   // 输出文件名称（不带扩展名）
   const nameWithoutExt = path.basename(fpath, '.html')
   console.log(nameWithoutExt)	// index
   ```

4. `path.extname(path)`：获取路径中的扩展名部分

   1）`path`：路径字符串

   ```js
   const path = require('path')
   // 这是文件的存放路径
   const fpath = '/a/b/c/index.html'
   const fext = path.extname(fpath)
   console.log(fext)	// .html
   ```

5. 案例：时钟，将html文件中的css和js分拆出单独的文件

   ```js
   // 1.1 导入 fs 模块
   const fs = require('fs')
   // 1.2 导入 path 模块
   const path = require('path')
   
   // 1.3 定义正则表达式，分别匹配 <style></style> 和 <script></script> 标签
   const regStyle = /<style>[\s\S]*<\/style>/
   const regScript = /<script>[\s\S]*<\/script>/
   
   // 2.1 调用 fs.readFile() 方法读取文件
   fs.readFile(path.join(__dirname, '/clock/clock.html'), 'utf8', function (err, dataStr) {
     // 2.2 读取 HTML 文件失败
     if (err) return console.log('读取HTML文件失败！' + err.message)
     // 2.3 读取文件成功后，调用对应的三个方法，分别拆解出 css, js, html 文件
     resolveCSS(dataStr)
     resolveJS(dataStr)
     resolveHTML(dataStr)
   })
   
   // 3.1 定义处理 css 样式的方法
   function resolveCSS(htmlStr) {
     // 3.2 使用正则提取需要的内容
     const r1 = regStyle.exec(htmlStr)
     // 3.3 将提取出来的样式字符串，进行字符串的 replace 替换操作
     const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
     // 3.4 调用 fs.writeFile() 方法，将提取的样式，写入到 clock 目录中 index.css 的文件里面
     fs.writeFile(path.join(__dirname, '/clock/index.css'), newCSS, function (err) {
       if (err) return console.log('写入 CSS 样式失败！' + err.message)
       console.log('写入样式文件成功！')
     })
   }
   
   // 4.1 定义处理 js 脚本的方法
   function resolveJS(htmlStr) {
     // 4.2 通过正则，提取对应的 <script></script> 标签内容
     const r2 = regScript.exec(htmlStr)
     // 4.3 将提取出来的内容，做进一步的处理
     const newJS = r2[0].replace('<script>', '').replace('</script>', '')
     // 4.4 将处理的结果，写入到 clock 目录中的 index.js 文件里面
     fs.writeFile(path.join(__dirname, '/clock/index.js'), newJS, function (err) {
       if (err) return console.log('写入 JavaScript 脚本失败！' + err.message)
       console.log('写入 JS 脚本成功！')
     })
   }
   
   // 5.1 定义处理 HTML 结构的方法
   function resolveHTML(htmlStr) {
     // 5.2 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
     const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
     // 5.3 写入 index.html 这个文件
     fs.writeFile(path.join(__dirname, '/clock/index.html'), newHTML, function (err) {
       if (err) return console.log('写入 HTML 文件失败！' + err.message)
       console.log('写入 HTML 页面成功！')
     })
   }
   ```

------

### 2.3 Http模块

> Http模块是官方提供的、用来创建 web 服务器的模块。

1. req 请求对象：包含了与客户端相关的数据和属性

   1）`req.rul`：客户端请求的URL地址

   2）`req.method`：客户端的请求类型

2. res 响应对象：包含了与服务器相关的数据和属性

   1）`res.end()`：向客户端发送指定内容，并结束本次请求的处理过程

   2）解决中文乱码问题：`res.setHeader('Content-Type', 'text/html; charset=utf-8')`

3. 导入：

   ```js
   const http = require('http')
   ```

4. 创建基本服务器：

   1）创建 web 服务器实例：`const serve  = http.createServer()`

   2）为服务器实例绑定 request 事件：`server.on('request', function(req,res){...})`

   3）启动服务器 listen()：`server.listen(8080,function (){...})`

   ```js
   // 1. 导入 http 模块
   const http = require('http')
   // 2. 创建 web 服务器实例
   const server = http.createServer()
   // 3. 为服务器实例绑定 request 事件，监听客户端的请求
   server.on('request', (req, res) => {
     // 定义一个字符串，包含中文的内容
     const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`
     // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
     res.setHeader('Content-Type', 'text/html; charset=utf-8')
     // 调用 res.end() 将内容响应给客户端
     res.end(str)
   })
   
   server.listen(80, () => {
     console.log('server running at http://127.0.0.1')
   })
   ```

5. 案例：根据不同的 url 响应不同的 html 内容

   1）获取请求的 url 地址：`const url = req.url`

   2）设置默认的响应内容为 404 Not found：`let content = '<h1>404 Not found!</h1>'`

   3）判断用户请求的是否为 / 或 /index.html 首页

   4）判断用户请求的是否为 /about.html 关于页面

   5）设置 Content-Type 响应头，防止中文乱码：`res.setHeader('Content-Type', 'text/html; charset=utf-8')`

   6）使用 res.end() 把内容响应给客户端：`res.end(content)`

   ```js
   const http = require('http')
   const server = http.createServer()
   
   server.on('request', (req, res) => {
     // 1. 获取请求的 url 地址
     const url = req.url
     // 2. 设置默认的响应内容为 404 Not found
     let content = '<h1>404 Not found!</h1>'
     // 3. 判断用户请求的是否为 / 或 /index.html 首页
     // 4. 判断用户请求的是否为 /about.html 关于页面
     if (url === '/' || url === '/index.html') {
       content = '<h1>首页</h1>'
     } else if (url === '/about.html') {
       content = '<h1>关于页面</h1>'
     }
     // 5. 设置 Content-Type 响应头，防止中文乱码
     res.setHeader('Content-Type', 'text/html; charset=utf-8')
     // 6. 使用 res.end() 把内容响应给客户端
     res.end(content)
   })
   
   server.listen(80, () => {
     console.log('server running at http://127.0.0.1')
   })
   ```

6. 案例：创建clock时钟服务器

   1）将资源的请求 url 地址映射为文件的存放路径

   2）读取文件内容并响应给客户端

   ```js
   // 1.1 导入 http 模块
   const http = require('http')
   // 1.2 导入 fs 模块
   const fs = require('fs')
   // 1.3 导入 path 模块
   const path = require('path')
   
   // 2.1 创建 web 服务器
   const server = http.createServer()
   // 2.2 监听 web 服务器的 request 事件
   server.on('request', (req, res) => {
     // 3.1 获取到客户端请求的 URL 地址
     //     /clock/index.html
     //     /clock/index.css
     //     /clock/index.js
     const url = req.url
     // 3.2 把请求的 URL 地址映射为具体文件的存放路径
     // const fpath = path.join(__dirname, url)
     // 5.1 预定义一个空白的文件存放路径
     let fpath = ''
     if (url === '/') {
       fpath = path.join(__dirname, '/clock/index.html')
     } else {
       //     /index.html
       //     /index.css
       //     /index.js
       fpath = path.join(__dirname, '/clock', url)
     }
   
     // 4.1 根据“映射”过来的文件路径读取文件的内容
     fs.readFile(fpath, 'utf8', (err, dataStr) => {
       // 4.2 读取失败，向客户端响应固定的“错误消息”
       if (err) return res.end('404 Not found.')
       // 4.3 读取成功，将读取成功的内容，响应给客户端
       res.setHeader('Content-Type', 'text/js; charset=utf-8')	// 防止中文乱码
       res.end(dataStr)
     })
   })
   // 2.3 启动服务器
   server.listen(80, () => {
     console.log('server running at http://127.0.0.1')
   })
   ```

------

## 第3章 模块化

> 解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。

### 3.1 模块的加载机制

1. 模块在第一次加载后会被缓存，多次调用 require() 不会导致模块的代码被执行多次。

2. 内置模块的加载机制：

   1）内置模块的加载优先级最高

   2）require('fs') 始终返回内置的fs模块，即使在node_modules目录下有名字相同的包也叫做fs

3. 自定义模块的加载机制：

   1）必须指定以 ./ 或 ../ 开头的路径标识符，否则会当作内置模块或第三方模块进行加载

   2）如果省略文件扩展名，按以下顺序加载：

   * 按照确切的文件名进行加载
   * 补全 .js 扩展名进行加载
   * 补全 .json 扩展名进行加载
   * 补全 .node 扩展名进行加载

4. 第三方模块的加载机制

   1）如果传递给 require() 的模块标识符不是一个内置模块，也没有以 `./` 或 `../` 开头，则为第三方模块

   2）加载顺序：假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')

   * 当前目录的/node_modules 文件夹，找不到则移动到再上一层父目录
   * C:\Users\itheima\project\node_modules\tools
   * C:\Users\itheima\node_modules\tools
   * C:\Users\node_modules\tools
   * C:\node_modules\tools

5. 目录作为模块：

   1）在被加载的目录下查找 `package.json` 文件，寻找 main 属性，作为 require() 加载入口

   2）如果目录没有 package.json 文件，或 main 入口不存在或无法解析， Node.js 将会试图加载目录下的 index.js 文件

   3）如果以上两步均失败，会报错

------

### 3.2 Node.js中的模块化

1. 模块的分类：

   1）内置模块：由 Node.js 官方提供的，例如 fs、path、http 等

   2）自定义模块：用户创建的每个 .js 文件，都是自定义模块

   3）第三方模块：由第三方开发出来的模块，使用前需要先下载

2. 加载模块：`require()`

3. 模块作用域：在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问

4. 向外共享模块作用域中的成员：

   <!-- ![向外共享模块作用域中的成员](/imgs/basic/向外共享模块作用域中的成员.png) -->
   <img :src="$withBase('/imgs/basic/向外共享模块作用域中的成员.png')" alt="向外共享模块作用域中的成员">

   1）`module` 对象：在每个 .js 自定义模块中都有，里面存储了和当前模块有关信息

   2）`module.exports` 对象：

   * 作用：可将模块内的成员共享出去，供外界使用
   * 外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象
   * 在自定义模块中，默认 `module.exports = {}`

   3）`exports` 对象：为了简化书写，exports 和 module.exports 指向同一个对象，但冲突时以后者为准

   4）注意：require() 模块时，得到的永远是 module.exports 指向的对象；为了防止混乱，不要在同一个模块中同时使用 exports 和 module.exports

   ```js
   // 在一个自定义模块中，默认情况下， module.exports = {}
   const age = 20
   // 向 module.exports 对象上挂载 username 属性
   module.exports.username = 'zs'
   // 向 module.exports 对象上挂载 sayHello 方法
   module.exports.sayHello = function () {
     console.log('Hello!')
   }
   module.exports.age = age
   
   // 让 module.exports 指向一个全新的对象
   module.exports = {
     nickname: '小黑',
     sayHi() {
       console.log('Hi!')
     },
   }
   ```

5. 模块化规范：遵循 CommonJS 模块化规范，规定了模块的特性和各模块之间如何相互依赖

   1）每个模块内部，module 变量代表当前模块

   2）module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口

   3）加载某个模块，其实是加载该模块的 module.exports 属性，require() 方法用于加载模块

------

## 第4章 npm与包

### 4.0 npm常用包

1. [moment](https://www.npmjs.com/package/moment)：格式化时间

   ```js
   const moment = require('moment')
   const dt = moment().format('YYYY-MM-DD HH:mm:ss')
   console.log(dt)
   ```
   
1. [i5ting_toc](https://github.com/i5ting/i5ting_ztree_toc)：可以把 md 文档转为 html 页面的小工具

   ```js
   // 安装
   npm install -g i5ting_toc
   // 使用
   i5ting_toc -f 要转换的md文件路径 -o
   ```

------

### 4.1 npm简介

1. 定义：Node.js 中的第三方模块又叫做包

2. 全球最大的包共享平台：npm,Inc

   1）搜索：[https://www.npmjs.com](https://www.npmjs.com)

   2）下载源：[https://registry.npmjs.org](https://registry.npmjs.org)

   3）国内镜像：[https://registry.npm.taobao.org](https://registry.npm.taobao.org)

3. npm 包管理工具：Node Package Manager（随 Node.js 一起安装了）

4. 包的语义化版本规范：

   1）以“点分十进制”形式进行定义，总共有三位数字，如：2.24.0

   2）第1位数字：大版本，第2位数字：功能版本，第3位数字：Bug修复版本

   3）版本号提升的规则：只要前面的版本号增长了，则后面的版本号归零

5. [规范的包结构](https://yarnpkg.com/zh-Hans/docs/package-json)：

   1）包必须以单独的目录而存在

   2）包的顶级目录下要必须包含 package.json 这个包管理配置文件

   3）package.json 中必须包含 `name`，`version`，`main` 这三个属性，分别代表包的名字、版本号、包的入口

------

### 4.2 包的分类

1. 项目包：被安装到项目的 node_modules 目录中的包

   1）开发依赖包：被记录到 devDependencies 节点中的包，只在开发期间会用到

   ```js
   // 正常写法
   npm install packageName --save-dev
   // 简化写法
   npm i packageName -D
   ```

   2）核心依赖包：被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到

   ```js
   // 正常写法
   npm install packageName
   // 简化写法
   npm i packageName
   // 安装指定版本的包
   npm i packageName@1.1.0
   ```

2. 全局包：全局包会被安装到 `C:\Users\用户目录\AppData\Roaming\npm\node_modules` 目录下

   1）安装命令

   ```bash
   npm i packageName -g
   ```

   2）卸载命令

   ```bash
   npm uninstall packageName -g
   ```

   3）只有工具性质的包才有全局安装的必要性，它们提供了好用的终端命令；判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可

------

### 4.3 npm管理

1. 快速创建项目：项目文件夹名不能有中文，路径可以有中文

   ```bash
   npm init -y
   ```

2. 安装包：不同类型包的安装方法

   ```bash
   npm i packageName
   npm i packageName -D
   npm i packageName -g
   ```

3. 文件结构：

   1）`node_modules` 文件夹：存放所有已安装到项目中的包

   2）`package-lock.json` 配置文件：记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等

3. 包管理配置文件：`package.json`

   1）引子：多人协作时，第三方包的体积过大，不方便团队成员之间共享项目源代码，需要删除node_modules文件夹

   2）作用：记录项目中安装了哪些包，从而方便剔除 node_modules 目录之后，在团队成员之间共享项目的源代码

   3）内容：

   * 项目的名称、版本号、描述等
   * 项目中都用到了哪些包
   * 哪些包只在开发期间会用到
   * 那些包在开发和部署时都需要用到

   4）注意：开发时一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中

   5）dependencies 节点：记录使用 npm 命令安装了哪些包

   6）devDependencies 节点：只在项目开发阶段会用到的包，在项目上线之后不会用到

4. 一次性安装所有包：npm 先读取package.json中的dependencies节点，一次性下载到项目中

   ```bash
   npm install
   npm i
   ```

5. 卸载包：执行成功后，会把卸载的包自动从 package.json 的 dependencies 中移除掉

   1）卸载项目包：

   ```bash
   npm uninstall packageName
   ```

6. 切换镜像：

   1）查看镜像源

   ```bash
   npm config get registry
   ```

   2）切换镜像源

   ```bash
   npm config set registry=https://registry.npm.taobao.org/
   ```

   3）nrm 小工具：可以代替传统方法查看和切换镜像源

   * 安装nrm

   ```bash
   npm i nrm -g
   ```

   * 查看所有可用镜像源

   ```bash
   nrm ls
   ```

   * 切换淘宝镜像源

   ```bash
   nrm use taobao
   ```

------

### 4.4 开发自己的包

#### 4.4.1 定义包

1. 包管理配置文件：package.json

   1）必须：name、version、main

   2）可选：description、keywords、license

   ```json
   {
     "name": "itheima-tools",
     "version": "1.1.0",
     "main": "index.js",
     "description": "提供了格式化时间、HTMLEscape相关的功能",
     "keywords": ["itheima", "dateFormat", "escape"],
     "license": "ISC"
   }
   
   ```

2. 包的入口文件：index.js

   ```js
   // 这是包的入口文件
   const date = require('/imgs/basic/dateFormat')
   const escape = require('/imgs/basic/htmlEscape')
   
   // 向外暴露需要的成员
   module.exports = {
     ...date,
     ...escape,
   }
   ```

3. 包的说明文档：README.md

   ````markdown
   ## 安装
   ```
   npm install itheima-tools
   ```
   ## 导入
   ```js
   const itheima = require('itheima-tools')
   ```
   ## 格式化时间
   ```js
   // 调用 dateFormat 对时间进行格式化
   const dtStr = itheima.dateFormat(new Date())
   // 结果  2020-04-03 17:20:58
   console.log(dtStr)
   ```
   ## 转义 HTML 中的特殊字符
   ```js
   // 带转换的 HTML 字符串
   const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
   // 调用 htmlEscape 方法进行转换
   const str = itheima.htmlEscape(htmlStr)
   // 转换的结果 &lt;h1 title=&quot;abc&quot;&gt;这是h1标签&lt;span&gt;123&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;
   console.log(str)
   ```
   ## 还原 HTML 中的特殊字符
   ```js
   // 待还原的 HTML 字符串
   const str2 = itheima.htmlUnEscape(str)
   // 输出的结果 <h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>
   console.log(str2)
   ```
   ## 开源协议
   ISC
   ````

4. src文件夹：定义函数

   1）dateFormat.js

   ```js
   // 定义格式化时间的函数
   function dateFormat(dateStr) {
     const dt = new Date(dateStr)
     const y = dt.getFullYear()
     const m = padZero(dt.getMonth() + 1)
     const d = padZero(dt.getDate())
     const hh = padZero(dt.getHours())
     const mm = padZero(dt.getMinutes())
     const ss = padZero(dt.getSeconds())
     return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
   }
   
   // 定义一个补零的函数
   function padZero(n) {
     return n > 9 ? n : '0' + n
   }
   
   module.exports = {
     dateFormat,
   }
   ```

   2）htmlEscape.js

   ```js
   // 定义转义 HTML 字符的函数
   function htmlEscape(htmlstr) {
     return htmlstr.replace(/<|>|"|&/g, match => {
       switch (match) {
         case '<':
           return '&lt;'
         case '>':
           return '&gt;'
         case '"':
           return '&quot;'
         case '&':
           return '&amp;'
       }
     })
   }
   
   // 定义还原 HTML 字符串的函数
   function htmlUnEscape(str) {
     return str.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
       switch (match) {
         case '&lt;':
           return '<'
         case '&gt;':
           return '>'
         case '&quot;':
           return '"'
         case '&amp;':
           return '&'
       }
     })
   }
   
   module.exports = {
     htmlEscape,
     htmlUnEscape
   }
   ```


#### 4.4.2 发布包

1. 注册登录：[https://www.npmjs.com](https://www.npmjs.com)

2. 将下包的服务器地址切换为 npm 的官方服务器

   ```bash
   npm config set registry=https://registry.npmjs.org/
   ```

3. 登录：`npm login`
4. 切换到包的根目录并发布：`npm publish`

#### 4.4.3 删除包

1. 只能删除 72 小时以内发布的包，删除后在 24 小时内不允许重复发布

   ```bash
   npm unpublish packageName --force
   ```

------

## 第5章 Express

> Express是一个基于 Node.js 平台，快速、开放、极简的 Web 开发框架

### 5.1 Express简介

1. 官网：[http://www.expressjs.com.cn](http://www.expressjs.com.cn)

2. 安装：

   ```bash
   npm i express@4.17.1
   ```

3. 作用：与 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的

4. 本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法

5. 服务器类型

   1）Web网站服务器：专门对外提供 Web 网页资源的服务器

   2）API 接口服务器：专门对外提供 API 接口的服务器

6. 工具：配合Postman测试

------

### 5.2 Express基本用法

1. 创建基本Web服务器

   ```js
   // 导入 express
   const express = require('express')
   // 创建 web 服务器
   const app = express()
   // 启动 web 服务器
   app.listen(80, () => { console.log('express server running at http://127.0.0.1')})
   ```

2. 监听GET请求：`app.get('URL',function(req,res){...})`

   1）URL：客户端请求的URL地址

   2）req：请求对象（包含了与请求相关的属性与方法）

   3）res：响应对象（包含了与响应相关的属性与方法）

3. 监听POST请求：`app.post('URL',function(req,res){...})`

   1）URL：客户端请求的URL地址

   2）req：请求对象（包含了与请求相关的属性与方法）

   3）res：响应对象（包含了与响应相关的属性与方法）

4. 服务器把内容响应给客户端：`res.send()`

   ```js
   app.get('/user', (req, res) => {
     // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
     res.send({ name: 'zs', age: 20, gender: '男' })
   })
   
   app.post('/user', (req, res) => {
     // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
     res.send('请求成功')
   })
   ```

5. 获取 URL 中携带的查询参数：`req.query`

   1）作用：可以访问到客户端通过查询字符串的形式，发送到服务器的参数

   2）注意：默认情况下，req.query 是一个空对象

   3）例：查询字符串为`'?name=zs&age=20'`，则可访问 `req.query.name`、`req.query.age`

   ```js
   app.get('/', (req, res) => {
     // 通过 req.query 可以获取到客户端发送过来的 查询参数（注意：默认情况下，req.query 是一个空对象）
     console.log(req.query)
     res.send(req.query)
   })
   ```

6. 获取 URL 中的动态参数：`req.params`

   1）通过 ":参数名" 匹配动态参数，如：`'/user/:id/:name'`

   2）案例：输入 `http://127.0.0.1/user/333/jason`，此时 `res.params={id:'333', name:'jason'}`

   3）注意：默认情况下，req.params 是一个空对象

   ```js
   app.get('/user/:ids/:username', (req, res) => {
     // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
     console.log(req.params)
     res.send(req.params)
   })
   ```

------

### 5.3 托管静态资源

1. `express.static()`：可非常方便地创建一个静态资源服务器，访问目录下的所有资源

   1）语法：`app.use(express.static('指定的目录文件夹')`

   2）注意：存放静态文件的目录名不会出现在 URL 中

2. 托管多个静态资源目录：

   1）多次调用 `express.static()` 函数即可

   2）访问静态资源文件时，`express.static()` 函数会根据目录的添加顺序查找所需的文件

3. 挂载路径前缀:

   1）如果希望根目录也出现在路径中，可以挂载路径前缀

   2）语法：`app.use('/自定义路径'， express.static('指定的目录文件夹')`

   ```js
   const express = require('express')
   const app = express()
   
   // 在这里，调用 express.static() 方法，快速的对外提供静态资源
   app.use(express.static('clock'))
   // 可以选择挂载文件夹前缀
   app.use('/api', express.static('files'))
   
   // 3. 启动 web 服务器
   app.listen(80, () => {
     console.log('express server running at http://127.0.0.1')
   })
   ```

------

### 5.4 路由Router

1. 定义：客户端的请求与服务器处理函数之间的映射关系
2. 构成：`app.method(path, handler)`：请求的类型、请求的 URL 地址、处理函数，

3. 匹配过程:

   1）每个请求按照定义的先后顺序进行匹配

   2）请求类型和请求的URL同时匹配成功，才会调用对应的处理函数

4. 最简单的路由使用：直接把路由挂载到 app 上

   ```js
   const express = require('express')
   const app = express()
   
   // 挂载路由
   app.get('/', (req, res) => {
     res.send('hello world.')
   })
   app.post('/', (req, res) => {
     res.send('Post Request.')
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

5. 模块化路由：

   1）创建路由模块对应的 .js 文件：`router.js`

   2）调用 express.Router() 函数创建路由对象：`const router = express.Router()`

   3）向路由对象上挂载具体的路由：`router.get(...)`、`router.post(...)`

   4）使用 module.exports 向外共享路由对象：`module.exports = router`

   ```js
   // 路由模块：router.js
   // 1. 导入 express
   const express = require('express')
   // 2. 创建路由对象
   const router = express.Router()
   // 3. 挂载具体的路由
   router.get('/user/list', (req, res) => {
     res.send('Get user list.')
   })
   router.post('/user/add', (req, res) => {
     res.send('Add new user.')
   })
   module.exports = router
   ```

   5）使用 `app.use('/api', router)` 函数注册全局中间件

   ```js
   const express = require('express')
   const app = express()
   
   // 1. 导入路由模块
   const router = require('./04.router')
   // 2. 注册路由模块：app.use() 函数的作用，就是来注册全局中间件
   app.use('/api', router)
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

------

### 5.5 中间件Middleware

#### 5.5.1 中间件简介

1. 定义：业务流程的中间处理环节

2. 调用流程：当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理

3. 格式：`app.use('/url',function(req, res, next) {...next()}`

4. 区别：中间件函数的形参列表中必须包含 `next` 参数，而路由处理函数中只包含 req 和 res

5. next() 的作用：实现多个中间件连续调用的关键，表示把流转关系转交给下一个中间件或路由

6. 注意：一定要在路由之前注册中间件；调用 next() 函数后不要再写额外的代码

#### 5.5.2 中间件作用

1. 多个中间件之间，共享同一份 req 和 res

2. 可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用

   ```js
   const express = require('express')
   const moment = require('moment')
   const app = express()
   
   // 这是定义全局中间件的简化形式
   app.use((req, res, next) => {
     // 获取到请求到达服务器的时间
     const time = Date.now()
     // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
     req.pureTime = time
     req.startTime = moment().format('YYYY-MM-DD HH:mm:ss')
     next()
   })
   
   app.get('/', (req, res) => {
     res.send('Home page. ' + req.startTime + ` => pure time : ${req.pureTime}`)
   })
   app.get('/user', (req, res) => {
     res.send('User page. ' + req.startTime + ` => pure time : ${req.pureTime}`)
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

#### 5.5.3 全局与局部中间件

1. 全局生效的中间件：客户端发起的任何请求，到达服务器之后都会触发的中间件

   1）语法：`app.use(中间件函数)`

   ```js
   const express = require('express')
   const app = express()
   // 定义一个最简单的中间件函数
   const mw = function (req, res, next) {
     console.log('这是最简单的中间件函数')
     // 把流转关系，转交给下一个中间件或路由
     next()
   }
   // 将 mw 注册为全局生效的中间件
   app.use(mw)
   
   // 上面两行的简写方法
   // app.use((req, res, next) => {
   //   console.log('这是最简单的中间件函数')
   //   next()
   // })
   
   app.get('/', (req, res) => {
     console.log('调用了 / 这个路由')
     res.send('Home page.')
   })
   app.get('/user', (req, res) => {
     console.log('调用了 /user 这个路由')
     res.send('User page.')
   })
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

   2）定义多个全局中间件：可用 app.use() 连续定义多个全局中间件，按照中间件定义的先后顺序依次进行调用

   ```js
   const express = require('express')
   const app = express()
   
   // 定义第一个全局中间件
   app.use((req, res, next) => {
     console.log('调用了第1个全局中间件')
     next()
   })
   // 定义第二个全局中间件
   app.use((req, res, next) => {
     console.log('调用了第2个全局中间件')
     next()
   })
   // 定义一个路由
   app.get('/user', (req, res) => {
     res.send('User page.')
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

2. 局部生效的中间件：不使用 app.use() 定义的中间件，仅在指定位置调用，其他请求不调用

   1）语法：`app.get(url,中间件函数名,(req, res) =>{...}`

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 1. 定义中间件函数
   const mw1 = (req, res, next) => {
     console.log('调用了局部生效的中间件')
     next()
   }
   
   // 2. 创建路由
   app.get('/', mw1, (req, res) => {
     res.send('Home page.')
   })
   app.get('/user', (req, res) => {
     res.send('User page.')
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1')
   })
   
   ```

   2）定义多个局部中间件：

   * 语法1：`app.get(url, 中间件函数名1, 中间件函数名2, (req, res) =>{...}`
   * 语法2：`app.get(url, [中间件函数名1, 中间件函数名2], (req, res) =>{...}`

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 1. 定义中间件函数
   const mw1 = (req, res, next) => {
     console.log('调用了第1个局部生效的中间件')
     next()
   }
   const mw2 = (req, res, next) => {
     console.log('调用了第2个局部生效的中间件')
     next()
   }
   
   // 2. 创建路由
   app.get('/', [mw1, mw2], (req, res) => {
     res.send('Home page.')
   })
   app.get('/user', (req, res) => {
     res.send('User page.')
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1')
   })
   ```

#### 5.5.4 中间件分类

1. 应用级别的中间件：通过 `app.use()` 或 `app.get()` 或 `app.post()`，绑定到 app 实例上的中间件

2. 路由级别的中间件：绑定到 `express.Router()` 实例上的中间件，与应用级别中间件无区别

3. 错误级别的中间件：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题，如`throw new Error('服务器内部发生了错误！')`

   1）处理函数的四个参数：err, req, res, next，其中 err.message，对应的就是Error中定义的消息

   2）注意：错误级别中间件必须注册在所有路由之后（其他的中间件都是注册在路由之前）

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 1. 定义路由
   app.get('/', (req, res) => {
     // 1.1 人为的制造错误
     throw new Error('服务器内部发生了错误！')
     res.send('Home page.')
   })
   
   // 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
   app.use((err, req, res, next) => {
     console.log('发生了错误！' + err.message)
     res.send('Error：' + err.message)
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1')
   })
   ```

4. Express 内置的中间件

   1）`express.static`：快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）

   2）`express.json`：解析 JSON 格式的请求体数据（有兼容性：4.16.0+）

   * 测试：postman->【post请求】->body->raw->JSON
   * `req.body`：服务器通过此属性接收数据
   * 注意：如果不注册解析表单数据中间件，req.body=undefined

   3）`express.urlencoded`：解析 URL-encoded 格式的请求体数据（有兼容性：4.16.0+）

   * 写法：`express.urlencoded({extended: false})`
   * 测试：postman->【post请求】->body->x-www-form-urlencoded

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
   // 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
   app.use(express.json())
   // 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
   app.use(express.urlencoded({ extended: false }))
   
   app.post('/user', (req, res) => {
     // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
     // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
     console.log(req.body)
     res.send('user: ok')
   })
   
   app.post('/book', (req, res) => {
     // 在服务器端，可以通过 req.body 来获取 JSON 格式的表单数据和 url-encoded 格式的数据
     console.log(req.body)
     res.send('book: ok')
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1')
   })
   ```

5. 第三方的中间件

   1）定义：非 Express 官方内置的，由第三方开发出来的中间件

   2）案例：`body-parser`，在express@4.16.0之前代替express.urlencoded的作用

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 1. 导入解析表单数据的中间件 body-parser
   const parser = require('body-parser')
   // 2. 使用 app.use() 注册中间件
   app.use(parser.urlencoded({ extended: false }))
   // app.use(express.urlencoded({ extended: false }))	// 对比最新写法
   
   app.post('/user', (req, res) => {
     // 如果没有配置任何解析表单数据的中间件，则 req.body 默认等于 undefined
     console.log(req.body)
     res.send('ok')
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1')
   })
   ```

6. 自定义中间件：`bodyParser`

   1）直接定义中间件

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   // 导入 Node.js 内置的 querystring 模块
   const qs = require('querystring')
   
   // 这是解析表单数据的中间件
   app.use((req, res, next) => {
     // 定义中间件具体的业务逻辑
     // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2. 监听 req 的 data 事件
     req.on('data', (chunk) => {
       str += chunk
     })
     // 3. 监听 req 的 end 事件
     req.on('end', () => {
       // 在 str 中存放的是完整的请求体数据
       // TODO: 把字符串格式的请求体数据，解析成对象格式
       const body = qs.parse(str)
       req.body = body
       next()
     })
   })
   
   app.post('/user', (req, res) => {
     res.send(req.body)
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1')
   })
   ```

   2）分模块写法

   ```js
   // 中间件：custom-body-parser.js
   // 导入 Node.js 内置的 querystring 模块
   const qs = require('querystring')
   
   const bodyParser = (req, res, next) => {
     // 定义中间件具体的业务逻辑
     // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2. 监听 req 的 data 事件
     req.on('data', (chunk) => {
       str += chunk
     })
     // 3. 监听 req 的 end 事件
     req.on('end', () => {
       // 在 str 中存放的是完整的请求体数据
       // console.log(str)
       // TODO: 把字符串格式的请求体数据，解析成对象格式
       const body = qs.parse(str)
       req.body = body
       next()
     })
   }
   
   module.exports = bodyParser
   ```

   ```js
   // 使用中间件
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 1. 导入自己封装的中间件模块
   const customBodyParser = require('./14.custom-body-parser')
   // 2. 将自定义的中间件函数，注册为全局可用的中间件
   app.use(customBodyParser)
   
   app.post('/user', (req, res) => {
     res.send(req.body)
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1')
   })
   ```

------

### 5.6 编写接口

#### 5.6.1 编写路由

1. 导入模块

   ```js
   // 路由文件：apiRouter.js
   const express = require('express')
   const router = express.Router()
   ```

2. 编写接口

   1）GET接口：对应 `req.query`

   ```js
   // 定义 GET 接口
   router.get('/get', (req, res) => {
     // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
     const query = req.query
     // 调用 res.send() 方法，向客户端响应处理的结果
     res.send({
       status: 0, // 0 表示处理成功，1 表示处理失败
       msg: 'GET 请求成功！', // 状态的描述
       data: query, // 需要响应给客户端的数据
     })
   })
   ```

   2）POST接口：对应 `req.body`

   ```js
   // 定义 POST 接口
   router.post('/post', (req, res) => {
     // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
     const body = req.body
     // 调用 res.send() 方法，向客户端响应结果
     res.send({
       status: 0,
       msg: 'POST 请求成功！',
       data: body,
     })
   })
   ```

   3）DELETE接口

   ```js
   // 定义 DELETE 接口
   router.delete('/delete', (req, res) => {
     res.send({
       status: 0,
       msg: 'DELETE请求成功',
     })
   })
   ```

3. 导出路由

   ```js
   module.exports = router
   ```

#### 5.6.2 编写服务器

1. 导入模块

   ```js
   const express = require('express')
   const app = express()
   ```

2. 配置中间件

   1）配置urlencoded中间件

   ```js
   // 配置解析表单数据的中间件
   app.use(express.urlencoded({ extended: false }))
   ```

   2）配置JSONP接口

   ```js
   // 必须在配置 cors 中间件之前，配置 JSONP 的接口
   app.get('/api/jsonp', (req, res) => {
     // TODO: 定义 JSONP 接口具体的实现过程
     // 1. 得到函数的名称
     const funcName = req.query.callback
     // 2. 定义要发送到客户端的数据对象
     const data = { name: 'zs', age: 22 }
     // 3. 拼接出一个函数的调用
     const scriptStr = `${funcName}(${JSON.stringify(data)})`
     // 4. 把拼接的字符串，响应给客户端
     res.send(scriptStr)
   })
   ```

   3）配置cors中间件

   ```js
   // 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题
   const cors = require('cors')
   app.use(cors())
   ```

3. 导入路由并注册

   ```js
   // 导入路由模块
   const router = require('./apiRouter')
   // 把路由模块，注册到 app 上
   app.use('/api', router)
   ```

4. 启动服务器

   ```js
   // 启动服务器
   app.listen(80, () => {
     console.log('express server running at http://127.0.0.1')
   })
   ```

------

## 第6章 跨域资源共享

> 作用：解决GET、POST接口的跨域请求

### 6.1 CORS

> Cross-Origin Resource Sharing，由一系列 HTTP 响应头组成，决定浏览器是否阻止前端 JS 代码跨域获取资源

#### 6.1.1 CORS基本使用

1. 原理：接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解除浏览器端的跨域访问限制

2. 兼容性：IE10+、Chrome4+、FireFox3.5+

3. 使用：主要在服务器端进行配置，客户端浏览器无须做任何额外的配置

   ```js
   // 导入
   const cors = require('cors') 
   // 在路由之前调用
   app.use(cors())
   ```

#### 6.1.2 Access-Control-Allow

1. Origin：`Access-Control-Allow-Origin：<origin> | *`

   1）只允许来自指定地址的请求

   ```js
   res.setHeader( 'Access-Control-Allow-Origin', 'http://itcast.cn')
   ```

   2）允许来自任何域的请求

   ```js
   res.setHeader( 'Access-Control-Allow-Origin', '*')
   ```

2. Headers

   1）默认情况下，CORS 仅支持客户端向服务器发送9类请求头

   * Accept
   * Accept-Language
   * Content-Language
   * DPR
   * Downlink
   * Save-Data
   * Viewport-Width
   * Width 
   * Content-Type （text/plain、multipart/form-data、application/x-www-form-urlencoded ）

   2）如果发送了额外的请求头信息，需要在服务器端通过 Access-Control-Allow-Headers 对额外的请求头进行声明

   ```js
   res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header ')
   ```

3. Methods

   1）默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求

   2）想用PUT、DELETE 等方式请求服务器的资源，需要在服务器端通过 Access-Control-Alow-Methods指明实际请求所允许使用的 HTTP 方法

   3）例：只允许POST、GET、DELETE、HEAD方法

   ```js
   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
   ```

   4）例：允许所有的HTTP方法

   ```js
   res.setHeader('Access-Control-Allow-Methods', ' * ')
   ```

#### 6.1.3 请求分类

1. 简单请求：客户端与服务器之间只会发生一次请求

   1）请求方式：`GET`、`POST`、`HEAD`

   2）请求头：9类请求头

2. 预检请求：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求

   1）定义：在正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求。成功响应预检请求后，才会发送真正的请求并携带真实数据。

   2）满足以下任一条件：

   * 请求方式：除`GET`、`POST`、`HEAD`之外
   * 请求头：包含自定义头部字段
   * 向服务器发送了 application/json 格式的数据

------

### 6.2 JSONP

> 浏览器端通过 `<script>` 标签的 src 属性请求服务器上的数据，同时服务器返回一个函数的调用，仅支持`GET`请求。

1. 特点：

   1）不属于真正的 Ajax 请求，因为没有使用 XMLHttpRequest 这个对象
   2）仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求

2. 创建 JSONP 接口

   1）获取客户端发送过来的回调函数的名字

   ```js
   const funcName = req.query.callback
   ```

   2）得到要通过 JSONP 形式发送给客户端的数据

   ```js
   const data = { name: 'zs', age: 22 }
   ```

   3）根据前两步得到的数据，拼接出一个函数调用的字符串

   ```js
   const scriptStr = `${funcName}(${JSON.stringify(data)})`
   ```

   4）把上一步拼接得到的字符串，响应给客户端的 `<script>` 标签进行解析执行

   ```js
   res.send(scriptStr)
   ```

   5）注意：如果项目中已经配置了 CORS 跨域资源共享，为了防止冲突必须在配置 CORS 中间件之前声明 JSONP 的接口

   ```js
   // 优先创建JSONP接口，这个接口不会被处理成CORS接口
   app.get('/api/jsonp', (req, res) => {})
   // 在配置CORS中间件，后续所有接口都会被处理成CORS接口
   app.use(cors())
   // 这是一个开启了CORS的接口
   app.get('/api/get', (req, res) => {})
   ```

   6）完整代码

   ```js
   app.get('/api/jsonp', (req, res) => {
     // TODO: 定义 JSONP 接口具体的实现过程
     // 1. 得到函数的名称
     const funcName = req.query.callback
     // 2. 定义要发送到客户端的数据对象
     const data = { name: 'zs', age: 22 }
     // 3. 拼接出一个函数的调用
     const scriptStr = `${funcName}(${JSON.stringify(data)})`
     // 4. 把拼接的字符串响应给客户端
     res.send(scriptStr)
   })
   ```

3. 使用 jQuery 发起 JSONP 请求

   ```js
   $('#btnJSONP').on('click', function () {
     $.ajax({
       method: 'GET',
       url: 'http://127.0.0.1/api/jsonp',
       dataType: 'jsonp',
       success: function (res) {
         console.log(res)
       },
     })
   })
   ```

------

## 第7章 MySQL

### 7.1 MySQL基本概念

1. 分类：

   1）传统型数据库（关系型数据库/SQL 数据库）

   * MySQL（Community + Enterprise）
   * Oracle（收费）
   * SQL Server（收费）

   2）新型数据库（非关系型数据库/NoSQL 数据库）

   * MongoDB（Community + Enterprise）

2. 传统型数据库的数据组织结构：数据库(database)、数据表(table)、数据行(row)、字段(field)
3. 结构化查询语言SQL：Structured Query Language，是一门数据库编程语言，只能在关系型数据库中使用

------

### 7.2 MySQL基本用法

#### 7.2.1 Workbench

1. DataType 数据类型：

   1）`int`：整数

   2）`varchar(20)`：字符串

   3）`tinyint(1)`：布尔值

2. 字段的特殊标识

   1）PK（Primary Key）：主键、唯一标识

   2）NN（Not Null）：值不允许为空

   3）UQ（Unique）：值唯一

   4）AI（Auto Increment）：值自动增长

#### 7.2.2 SQL语句

1. `SELECT` 语句：从表中查询数据
   1）查询表格所有数据：SELECT * FROM 表名

   ```sql
   SELECT * FROM users
   ```

   2）查询指定字段的数据：SELECT 列1,列2,... FROM table_name

   ```sql
   select username, password from users
   ```

   3）AS 关键字设置别名：SELECT 列1 AS 别名1, 列2 AS 别名2,... FROM 表名

   ```sql
   select count(*) as total from users where status=0
   select username as uname, password as upwd from users
   ```

2. `INSERT INTO` 语句：向数据表中插入新的数据行

   ```sql
   INSERT INTO table_name (列1, 列2, ...) VALUES (值1,值2, ...)
   INSERT INTO users (username, password) VALUES ('tony stark', '098123')
   ```

3. `UPDATE` 语句：修改表中的数据

   1）UPDATE：指定要更新的表

   2）SET：指定要更新的列

   3）WHERE：指定更新的条件，如果不指定WHERE，会导致整张表被更新

   ```sql
   UPDATE table_name SET 列1=值1, 列2=值2 WHERE 列名=某值
   UPDATE users SET password='888888' WHERE id=4
   ```

4. `DELETE` 语句：删除表中的行（如果不指定WHERE，会导致整张表被删除）

   ```sql
   DELETE FROM table_name WHERE 列名=某值
   DELETE FROM users WHERE id=4
   ```

5. `WHERE` 语句：限定选择的标准

   1）应用

   ```sql
   SELECT 列名 FROM 表名 WHERE 列 运算符 值
   UPDATE 表名 SET 列=新值 WHERE 列 运算符 值
   DELETE FROM 表名 WHERE 列 运算符 值
   ```

   2）运算符

   * =、>、<、>=、<=
   * 不等于：<>、!=
   * BETWEEN：在某范围内
   * LIKE：搜索某种形式

   ```sql
   SELECT * FROM users WHERE status=1
   SELECT * FROM users WHERE id>=2
   SELECT * FROM users WHERE username<>'ls'
   SELECT * FROM users WHERE username!='ls'
   ```

   3）`AND` 和 `OR` 运算符：在 WHERE 子语句中把两个或多个条件结合起来

   ```sql
   -- 使用 AND 来显示所有状态为0且id小于3的用户
   SELECT * FROM users WHERE status=0 AND id<3
   
   -- 使用 or 来显示所有状态为1 或 username 为 zs 的用户
   SELECT * FROM users WHERE status=1 or username='zs'
   ```

6. `ORDER BY` 语句：根据指定的列对结果集进行排序

   1）升序：默认，ASC

   ```sql
   -- 对users表中的数据，按照 status 字段进行升序排序
   SELECT * FROM users ORDER BY status
   ```

   2）降序：DESC

   ```sql
   -- 按照 id 对结果进行降序的排序  desc 表示降序排序   asc 表示升序排序（默认情况下，就是升序排序的）
   SELECT * FROM users ORDER BY id DESC
   ```

   3）多重排序

   ```sql
   SELECT * FROM 表名 ORDER BY 列1 DESC, 列2 ASC
   
   -- 对 users 表中的数据，先按照 status 进行降序排序，再按照 username 字母的顺序，进行升序的排序
   SELECT * FROM users ORDER BY status DESC, username ASC
   ```

#### 7.2.3 SQL函数

1. `COUNT(*)` 函数：返回查询结果的总数据条数

   ```sql
   SELECT COUNT(*) FROM 表名
   ```

------

### 7.3 项目中操作MySQL

1. 安装

   ```js
   npm i mysql
   ```

2. 连接

   1）配置 mysql 模块

   ```js
   const mysql = require('mysql')
   const db = mysql.createPool({
     host: '127.0.0.1', // 数据库的 IP 地址
     user: 'root', // 登录数据库的账号
     password: 'admin123', // 登录数据库的密码
     database: 'my_db_01', // 指定要操作哪个数据库
   })
   ```

   2）测试 mysql 模块

   ```js
   // 测试 mysql 模块能否正常工作
   db.query('select 1', (err, results) => {
     // mysql 模块工作期间报错了
     if (err) return console.log(err.message)
     // 能够成功的执行 SQL 语句
     console.log(results)
   })
   // 如果返回[ RowDataPacket { '1': 1 } ]说明测试成功
   ```

3. 查询数据：SELECT 语句：results为数组

   ```js
   // 查询 users 表中所有的数据
   const sqlStr = 'select * from users'
   db.query(sqlStr, (err, results) => {
     // 查询数据失败
     if (err) return console.log(err.message)
     // 查询数据成功
     // 注意：如果执行的是 select 查询语句，则执行的结果是数组
     console.log(results)
   })
   ```

4. 插入数据：INSERT INTO语句：results为对象

   1）传统方法：通过 affectedRows 属性，来判断是否插入数据成功

   ```js
   // 向 users 表中，新增一条数据
   const user = { username: 'Spider-Man', password: 'pcc123' }
   const sqlStr = 'insert into users (username, password) values (?, ?)'
   // 执行 SQL 语句
   db.query(sqlStr, [user.username, user.password], (err, results) => {
     if (err) return console.log(err.message)
     // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
     // 可以通过 affectedRows 属性，来判断是否插入数据成功
     if (results.affectedRows === 1) {
       console.log('插入数据成功!')
     }
   })
   ```

   2）便捷方法

   ```js
   // 演示插入数据的便捷方式
   const user = { username: 'Spider-Man2', password: 'pcc4321' }
   // 定义待执行的 SQL 语句
   const sqlStr = 'insert into users set ?'
   // 执行 SQL 语句
   db.query(sqlStr, user, (err, results) => {
       if (err) return console.log(err.message)
       if (results.affectedRows === 1) {
           console.log('插入数据成功')
       }
   })
   ```

5. 更新数据：UPDATE语句：results为对象

   1）传统方法：通过 affectedRows 属性，来判断是否更新数据成功

   ```js
   // 演示如何更新用户的信息
   const user = { id: 4, username: 'aaa', password: '000' }
   // 定义 SQL 语句
   const sqlStr = 'update users set username=?, password=? where id=?'
   // 执行 SQL 语句
   db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
     if (err) return console.log(err.message)
     // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
     if (results.affectedRows === 1) {
       console.log('更新成功')
     }
   })
   ```

   2）便捷方法：前提是数据对象的每个属性和数据表的字段一一对应

   ```js
   // 演示更新数据的便捷方式
   const user = { id: 4, username: 'aaaa', password: '0000' }
   // 定义 SQL 语句
   const sqlStr = 'update users set ? where id=?'
   // 执行 SQL 语句
   db.query(sqlStr, [user, user.id], (err, results) => {
     if (err) return console.log(err.message)
     if (results.affectedRows === 1) {
       console.log('更新数据成功')
     }
   })
   ```

6. 删除数据：DELETE语句：results为对象

   ```js
   // 删除 id 为 5 的用户
   const sqlStr = 'delete from users where id=?'
   db.query(sqlStr, 5, (err, results) => {
     if (err) return console.log(err.message)
     // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
     if (results.affectedRows === 1) {
       console.log('删除数据成功')
     }
   })
   ```

7. 标记删除：使用DELETE会真正删除数据，推荐用UPDATE将status改为1来模拟删除的状态

   ```js
   // 标记删除：将 id=4 的用户 status 改为1
   const sqlStr = 'update users set status=? where id=?'
   db.query(sqlStr, [1, 4], (err, results) => {
     if (err) return console.log(err.message)
     if (results.affectedRows === 1) {
       console.log('标记删除成功')
     }
   })
   ```

------

## 第8章 身份认证

### 8.1 Sessio认证机制

#### 8.1.1 基于服务端渲染的传统模式

1. 定义：服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接动态生成的，客户端无需使用Ajax请求页面数据

   ```js
   app.get('/index.html', (req, res) => {
     const user = { name: 'zs', age: 20 }
     const html = `<h1>姓名: ${user.name}, 年龄: ${user.age}</h1>`
     res.send(html)
   })
   ```

   1）优点：

   * 前端耗时少：服务器端负责动态生成 HTML 内容，浏览器只需要直接渲染页面即可
   * 有利于SEO：服务器端响应的是完整的 HTML 页面，爬虫更容易爬取获得信息

   2）缺点：

   * 占用服务器端资源：服务器端完成 HTML 页面内容的拼接，如果请求较多会对服务器造成一定的访问压力
   * 不利于前后端分离：无法进行分工合作，尤其对于前端复杂度高的项目，开发效率低

2. HTTP 协议的无状态性

   1）定义：客户端的每次 HTTP 请求都是独立的，连续多个请求之间没有直接的关系，服务器不会主动保留每次 HTTP 请求的状态

   2）突破限制方法：Cookie

3. Cookie：存储在用户浏览器中的一段不超过 4 KB 的字符串

   1）结构：由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成

   2）发送：不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器

   3）特性：自动发送、域名独立、过期时限、4KB 限制

   4）流程：

   * 客户端第一次请求服务器时，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中
   * 随后当客户端浏览器每次请求服务器时，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份

   5）不安全：Cookie 是存储在浏览器中的，且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造

#### 8.1.2 Session认证

<!-- ![session认证机制](/imgs/basic/session认证机制.png) -->
<img :src="$withBase('/imgs/basic/session认证机制.png')" alt="session认证机制">

1. 适用场景：当前端请求后端接口【不存在跨域问题】的时候，推荐使用 Session 身份认证机制

2. 局限性：需要配合 Cookie 才能实现，由于 Cookie 默认不支持跨域访问，所以当涉及到前端跨域请求后端接口时，需要做很多额外的配置

3. 安装：

   ```bash
   npm i express-session
   ```

4. 使用步骤：

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：请配置 Session 中间件
   const session = require('express-session')
   app.use(
     session({
       secret: 'itheima',
       resave: false,
       saveUninitialized: true,
     })
   )
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // 登录的 API 接口
   app.post('/api/login', (req, res) => {
     // 判断用户提交的登录信息是否正确
     if (req.body.username !== 'admin' || req.body.password !== '000000') {
       return res.send({ status: 1, msg: '登录失败' })
     }
   
     // TODO_02：请将登录成功后的用户信息，保存到 Session 中
     // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
     req.session.user = req.body // 用户的信息
     req.session.islogin = true // 用户的登录状态
   
     res.send({ status: 0, msg: '登录成功' })
   })
   
   // 获取用户姓名的接口
   app.get('/api/username', (req, res) => {
     // TODO_03：请从 Session 中获取用户的名称，响应给客户端
     if (!req.session.islogin) {
       return res.send({ status: 1, msg: 'fail' })
     }
     res.send({
       status: 0,
       msg: 'success',
       username: req.session.user.username,
     })
   })
   
   // 退出登录的接口
   app.post('/api/logout', (req, res) => {
     // TODO_04：清空 Session 信息
     req.session.destroy()
     res.send({
       status: 0,
       msg: '退出登录成功',
     })
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   ```

5. 登录案例：

   1）后端接口：app.js

   ```js
   // 登录接口
   app.post('/api/login')
   // 获取用户登录状态
   app.get('/api/username')
   // 退出登录
   app.post('/api/logout')
   ```

   2）前端页面：pages/

   ```js
   // index.html
   $.get('/api/username')  // 检测用户是否登录，若未登录跳转至 login.html
   $.post('/api/logout')   // 点击退出登录按钮，跳转至 login.html
   
   // login.html
   $.post('/api/login')	// 用户登录表单验证，成功后跳转至index.html
   ```

------

### 8.2 JWT认证机制

> JSON Web Token，是目前最流行的跨域认证解决方案。

#### 8.2.1 基于前后端分离的新型模式

1. 定义：后端只负责提供 API 接口，前端使用 Ajax 调用接口

2. 优点：

   1）开发体验好：前端专注于 UI 页面的开发，后端专注于API 的开发

   2）用户体验好：Ajax 技术可以轻松实现页面的局部刷新

   3）减轻服务器端压力：页面最终是在每个用户的浏览器中生成的

3. 缺点：

   1）不利于 SEO：完整的 HTML 页面需要在客户端动态拼接完成，爬虫对无法爬取页面的有效信息

   2）解决方案：利用 Vue、React 等前端框架的 SSR （server side render）技术

#### 8.2.2 JWT认证

<!-- ![JWT认证机制](/imgs/basic/JWT认证机制.png) -->
<img :src="$withBase('/imgs/basic/JWT认证机制.png')" alt="JWT认证机制">

1. 适用场景：当前端需要跨域请求后端接口的时候，推荐使用 JWT 认证机制
2. 流程：用户的信息通过 Token 字符串的形式，保存在客户端浏览器中；服务器通过还原 Token 字符串的形式来认证用户的身份

3. 结构：三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名），三者之间用“.”分隔

   1）Payload（有效荷载）：真正的用户信息，它是用户信息经过加密之后生成的字符串

   2）Header（头部）、Signature（签名）：安全性相关的部分，只是为了保证 Token 的安全性

4. 使用方式：

   1）语法：`Authorzation: Bearer <token>`

   2）客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中

   3）此后客户端每次与服务器通信，都要带上这个 JWT 的字符串进行身份认证，把 JWT 放在 HTTP 请求头的 Authorization 字段中

5. 安装：

   ```js
   // 用于生成 JWT 字符串
   npm i jsonwebtoken
   // 用于将 JWT 字符串解析还原成 JSON 对象
   npm i express-jwt
   ```

6. 使用步骤

   1）导入：`jsonwebtoken`、`express-jwt/lib`、`cors`、`body-parser`

   2）定义 secret 密钥：`const secretKey = 'XXXXXXXX'`

   * 加密：生成 JWT 字符串时，使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
   * 解密：把 JWT 字符串解析还原成 JSON 对象的时候，使用 secret 密钥进行解密

   3）登录成功后生成 JWT 字符串：`jwt.sign({ username: userinfo.username },secretKey, {expiresIn:'30s'})`

   * 注意：千万不要把密码加密到 token 字符中

   4）注册 express-jwt 中间件：`app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))`

   * 原理：客户端每次在访问那些有权限接口时，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证，服务器可以通过 express-jwt自动将客户端发送过来的 Token 解析还原成 JSON 对象
   * 作用：可以把解析出来的用户信息，挂载到 req.user 属性上
   * 可用 `unless` 指定哪些接口不需要访问权限

   5）使用 req.user 获取用户信息

   * 作用：express-jwt配置成功后，可在那些有权限的接口中使用 req.user 对象访问从 JWT 字符串中解析出来的用户信息
   * Postman测试：GET->Headers->`Authorization: Bearer <token>`（注意token的有效时长）
   * 返回示例：{ username: 'admin', iat: 1641140151, exp: 1641140181 }

   6）捕获解析 JWT 失败后产生的错误：`app.use((err, req, res, next) => {...})`

   * 若客户端发送过来的 Token 字符串过期或不合法，会产生解析失败的错误，可通过 Express 的错误中间件捕获错误并处理
   * token 解析失败错误：`err.name == 'UnauthorizedError'`

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
   const jwt = require('jsonwebtoken')
   const expressJWT = require('express-jwt/lib')
   
   // 允许跨域资源共享
   const cors = require('cors')
   app.use(cors())
   
   // 解析 post 表单数据的中间件
   const bodyParser = require('body-parser')
   app.use(bodyParser.urlencoded({ extended: false }))
   
   // TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
   // 加密：生成 JWT 字符串时，使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
   // 解密：把 JWT 字符串解析还原成 JSON 对象的时候，使用 secret 密钥进行解密
   const secretKey = 'itheima No1 ^_^'
   
   // TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
   // 客户端每次在访问那些有权限接口时，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证
   // 服务器可以通过 express-jwt 自动将客户端发送过来的 Token 解析还原成 JSON 对象
   // 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
   // 可用 unless 指定哪些接口不需要访问权限
   app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
   
   // 登录接口
   app.post('/api/login', function (req, res) {
     // 将 req.body 请求体中的数据，转存为 userinfo 常量
     const userinfo = req.body
     // 登录失败
     if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
       return res.send({
         status: 400,
         message: '登录失败！',
       })
     }
     // 登录成功
     // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
     // 参数1：用户的信息对象
     // 参数2：加密的秘钥
     // 参数3：配置对象，可以配置当前 token 的有效期
     // 记住：千万不要把密码加密到 token 字符中
     const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
     res.send({
       status: 200,
       message: '登录成功！',
       token: tokenStr, // 要发送给客户端的 token 字符串
     })
   })
   
   // 这是一个有权限的 API 接口
   app.get('/admin/getinfo', function (req, res) {
     // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
     console.log(req.user)
     res.send({
       status: 200,
       message: '获取用户信息成功！',
       data: req.user, // 要发送给客户端的用户信息
     })
   })
   
   // TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
   app.use((err, req, res, next) => {
     // 这次错误是由 token 解析失败导致的
     if (err.name === 'UnauthorizedError') {
       return res.send({
         status: 401,
         message: '无效的token',
       })
     }
     res.send({
       status: 500,
       message: '未知的错误',
     })
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(8888, function () {
     console.log('Express server running at http://127.0.0.1:8888')
   })
   ```

------
