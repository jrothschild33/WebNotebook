# Webpack

## 第1章 Webpack概述

> 官方文档：[https://webpack.docschina.org/](https://webpack.docschina.org/)

### 1.1 Webpack简介

> Webpack是一种前端资源构建工具，一个静态模块打包器(module bundler)

<img :src="$withBase('/imgs/server/webpack简介.png')" alt="webpack简介">

1. 原理：webpack将前端的所有资源文件(js/json/css/img/less/...)都作为模块处理，根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)

2. 核心概念：

   1）Entry：webpack以哪个文件为入口起点开始打包，分析构建内部依赖图

   2）Output：webpack打包后的资源bundles输出到哪里去，以及如何命名

   3）Loader：让webpack能够去处理非JavaScript文件(webpack自身只理解JS)，注意执行顺序为从右到左、从下到上

   4）Plugins：插件可以用于执行范围更广的任务，包括打包优化、压缩、重新定义环境中的变量等

   5）Mode：webpack使用相应模式的配置

   - development：能让代码本地调试运行的环境

   ```js
   process.env.NODE_ENV = 'development'
   // 启用的插件
   // NamedChunksPlugin
   // NamedModulesPlugin
   ```

   - production：能让代码优化上线运行的环境

   ```js
   process.env.NODE_ENV = 'production'
   // 启用的插件
   // FlagDependencyUsagePlugin
   // FlagIncludedChunksPlugin
   // ModuleConcatenationPlugin
   // NoEmitOnErrorsPlugin
   // OccurrenceOrderPlugin
   // SideEffectsFlagPlugin
   // TerserPlugin
   ```

### 1.2 安装与配置

1. 初始化 package.json

   ```bash
   npm init
   ```

2. 下载并安装 webpack

   ```bash
   npm install webpack webpack-cli -g
   npm install webpack webpack-cli -D
   ```

### 1.3 编译打包应用

> 以`./src/index.js`为入口文件开始打包，打包后输出到`./build/built.js`

1. 开发环境指令：能够编译打包js和json文件，并能将es6的模块化语法转换成浏览器能识别的语法

   ```bash
   webpack src/js/index.js -o build/js/built.js --mode=development
   ```

2. 生产环境指令：比开发环境多了压缩代码的功能（默认只能处理js/json资源，不能处理css/img等其他资源）

   ```bash
   webpack src/js/index.js -o build/js/built.js --mode=production
   ```

------

## 第2章 开发环境配置

### 2.1 创建配置文件

1. 配置文件：webpack.config.js

   ```js
   const { resolve } = require('path') // node 内置核心模块，用来处理路径问题。
   module.exports = {
     entry: './src/js/index.js', // 入口文件
     output: {
       // 输出配置
       filename: './built.js', // 输出文件名
       path: resolve(__dirname, 'build/js'), // 输出文件路径配置
     },
     mode: 'development', //开发环境
   }
   ```

2. 直接运行指令

   ```bash
   webpack
   ```

------

### 2.2 打包样式资源

> Loader：`css-loader`、`style-loader`、`less-loader`、`less`

1. 下载安装：`loader`

   ```bash
   npm i -D css-loader style-loader less-loader less
   ```

2. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     // loader的配置
     module: {
       rules: [
         // 详细loader配置：不同文件必须配置不同loader处理
         {
           // 匹配哪些文件
           test: /\.css$/,
           // 使用哪些loader进行处理
           use: [
             // loader执行顺序：从右到左，从下到上
             // 创建style标签，将js中的样式资源插入进行，添加到head中生效
             'style-loader',
             // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
             'css-loader',
           ],
         },
         {
           test: /\.less$/,
           use: [
             'style-loader',
             'css-loader',
             // 将less文件编译成css文件：下载 less-loader和less
             'less-loader',
           ],
         },
       ],
     },
     ......
   }
   ```

------

### 2.3 打包HTML资源

> Plugins：`html-webpack-plugin`

1. 下载安装：`plugin`

   ```bash
   npm i -D html-webpack-plugin
   ```

2. 修改配置文件：webpack.config.js

   1）功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）

   2）需求：需要有结构的HTML文件模板

   ```js
   ......
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     ......
     plugins: [
       new HtmlWebpackPlugin({
         // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
         template: './src/index.html',
       }),
     ],
     ......
   }
   ```

------

### 2.4 打包图片资源

> Loader：`html-loader`、`url-loader`、`file-loader`

1. 下载安装：`loader`

   ```bash
   npm i -D html-loader url-loader file-loader
   ```

2. html-loader：处理html文件的img图片（负责引入img，从而能被url-loader进行处理）

3. url-loader：处理图片资源

   1）`limit`：图片大小小于8kb，就会被base64处理（变成字符串），适用小图片，一般不会处理较大的图片

   2）`esModule`：关闭url-loader的es6模块化，使用commonjs解析

   3）`name`：给图片进行重命名

4. 修改配置文件：webpack.config.js

   ```js
   ......
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     ......
     module: {
       rules: [
         {
           test: /\.less$/,
           // 要使用多个loader处理用use
           use: ['style-loader', 'css-loader', 'less-loader'],
         },
         {
           // 问题：默认处理不了html中img图片
           // 处理图片资源
           test: /\.(jpg|png|gif)$/,
           // 使用loader：url-loader、file-loader
           loader: 'url-loader',
           options: {
             // 图片大小小于8kb，就会被base64处理（变成字符串），适用小图片，一般不会处理较大的图片
             // 优点: 减少请求数量（减轻服务器压力）
             // 缺点：图片体积会更大（文件请求速度更慢）
             limit: 8 * 1024,
             // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
             // 解析时会出问题：[object Module]
             // 解决：关闭url-loader的es6模块化，使用commonjs解析
             esModule: false,
             // 给图片进行重命名
             // [hash:10]取图片的hash的前10位
             // [ext]取文件原来扩展名
             name: '[hash:10].[ext]',
           },
         },
         {
           test: /\.html$/,
           // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
           loader: 'html-loader',
         },
       ],
     },
     ......
     plugins: [
       new HtmlWebpackPlugin({
         // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
         template: './src/index.html',
       }),
     ],
     ......
   }
   ```

------

### 2.5 打包其他资源

> Loader：`file-loader`

1. 其他资源文件举例：

   ```txt
   ├─src
   |  ├─iconfont.eot
   |  ├─iconfont.svg
   |  ├─iconfont.ttf
   |  ├─iconfont.woff
   ```

2. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     module: {
       rules: [
         ......
         { // 打包其他资源(除了html/js/css资源以外的资源)
           // 排除css/js/html资源
           exclude: /\.(css|js|html|less)$/,
           loader: 'file-loader',
           options: {
             name: '[hash:10].[ext]',
           },
         },
       ],
     },
     ......
   }
   ```

------

### 2.6 devserver

> devServer：开发服务器，用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）

1. devServer特点：只会在内存中编译打包，不会有任何输出（不会生成build文件夹及内部文件）

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   ......
   module.exports = {
     ......
     // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
     // 特点：只会在内存中编译打包，不会有任何输出
     // 启动devServer指令为：npx webpack-dev-server
     devServer: {
       // 项目构建后路径
       contentBase: resolve(__dirname, 'build'),
       // 启动gzip压缩
       compress: true,
       // 端口号
       port: 3000,
       // 自动打开浏览器
       open: true,
     },
   }
   ```
   
4. 启动devServer：

   ```bash
   npx webpack-dev-server
   ```

------

### 2.7 开发环境配置

1. 项目文件结构

   ```txt
   ├─src
   |  ├─index.html
   |  ├─media
   |  |   ├─iconfont.eot
   |  |   ├─iconfont.svg
   |  |   ├─iconfont.ttf
   |  |   └iconfont.woff
   |  ├─js
   |  | └index.js
   |  ├─imgs
   |  |  ├─angular.jpg
   |  |  ├─react.png
   |  |  └vue.jpg
   |  ├─css
   |  |  ├─iconfont.css
   |  |  └index.less
   ```

2. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         // loader的配置
         {
           // 处理less资源
           test: /\.less$/,
           use: ['style-loader', 'css-loader', 'less-loader'],
         },
         {
           // 处理css资源
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
         {
           // 处理图片资源
           test: /\.(jpg|png|gif)$/,
           loader: 'url-loader',
           options: {
             limit: 8 * 1024,
             name: '[hash:10].[ext]',
             // 关闭es6模块化
             esModule: false,
             // 设置图片的输出路径
             outputPath: 'imgs',
           },
         },
         {
           // 处理html中img资源
           test: /\.html$/,
           loader: 'html-loader',
         },
         {
           // 处理其他资源
           exclude: /\.(html|js|css|less|jpg|png|gif)/,
           loader: 'file-loader',
           options: {
             name: '[hash:10].[ext]',
             // 设置其他资源的输出路径
             outputPath: 'media',
           },
         },
       ],
     },
     plugins: [
       // plugins的配置
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     mode: 'development',
     devServer: {
       contentBase: resolve(__dirname, 'build'),
       compress: true,
       port: 3000,
       open: true,
     },
   }
   ```

3. 运行指令：

   ```bash
   npx webpack-dev-server
   ```

------

## 第3章 生产环境配置

### 3.1 提取CSS成单独文件

> Plugins：`mini-css-extract-plugin`

1. 下载安装：`plugin`

   ```bash
   npm i -D mini-css-extract-plugin
   ```

2. 修改配置文件：webpack.config.js

   ```js
   ......
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   module.exports = {
     ......
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [
             // 这个loader取代了style-loader，作用：提取js中的css成单独文件
             MiniCssExtractPlugin.loader,
             // 将css文件整合到js文件中
             'css-loader',
           ],
         },
       ],
     },
     plugins: [
       ......
       new MiniCssExtractPlugin({
         // 对输出的css文件进行重命名
         filename: 'css/built.css',
       }),
     ],
     ......
   }
   ```

------

### 3.2 CSS兼容性处理

> postcss：`postcss-loader`、`postcss-preset-env`

1. 下载安装：

   ```bash
   npm i -D postcss-loader postcss-preset-env
   ```

2. postcss-loader：帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

3. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   
   // 若想设为开发环境：
   // process.env.NODE_ENV = 'development'
   
   module.exports = {
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [
             MiniCssExtractPlugin.loader,
             'css-loader',
             
             // 方法1：使用loader的默认配置
             // 'postcss-loader',
             
             // 方法2：修改loader的配置
             {
               loader: 'postcss-loader',
               options: {
                 ident: 'postcss',
                 plugins: () => [
                   // postcss的插件
                   require('postcss-preset-env')(),
                 ],
               },
             },
           ],
         },
       ],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
       new MiniCssExtractPlugin({
         filename: 'css/built.css',
       }),
     ],
     mode: 'development',
   }
   ```

4. 修改 package.json

   ```json
   "browserslist": {
     // 开发环境：设置 process.env.NODE_ENV = development
     "development": [
       "last 1 chrome version",
       "last 1 firefox version",
       "last 1 safari version"
     ],
     // 生产环境：默认
     "production": [
       // 兼容99.8%的浏览器，且不包含已淘汰和op_mini型的浏览器
       ">0.2%",
       "not dead",
       "not op_mini all"
     ]
   },
   ```

------

### 3.3 CSS压缩

> Plugins：`optimize-css-assets-webpack-plugin`

1. 下载安装：`plugin`

   ```bash
   npm i -D optimize-css-assets-webpack-plugin
   ```

2. 修改配置文件：webpack.config.js

   ```js
   ......
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   ......
   module.exports = {
     ......
     plugins: [
       ......
       // 压缩css
       new OptimizeCssAssetsWebpackPlugin(),
     ],
     ......
   }
   ```

------

### 3.4 JS语法检查

> eslint：`eslint-loader`、`eslint`、`eslint-config-airbnb-base`、`eslint-plugin-import`

1. 下载安装包：

   ```bash
   npm i -D eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
   ```

2. eslint：只检查自己写的源代码，第三方的库是不用检查的（airbub是一种风格指南，可以设为检查标准）

3. 可以在JS文件中标记不需要eslint检查的代码：`eslint-disable-next-line`

   ```js
   // 下一行eslint所有规则都失效（下一行不进行eslint检查）
   // eslint-disable-next-line
   console.log(add(2, 5))
   ```

4. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     module: {
       rules: [
         {
           test: /\.js$/,
           // 第三方库不检查
           exclude: /node_modules/,
           loader: 'eslint-loader',
           options: {
             // 自动修复eslint的错误
             fix: true,
           },
         },
       ],
     },
     ......
   }
   ```

5. 修改 package.json：eslint不认识 window、navigator全局变量，需要修改`eslintConfig`配置

   ```json
   "eslintConfig": {
     // airbub是一种风格指南，可以设为检查标准
     "extends": "airbnb-base",
     "env": {
       "browser": true	// 支持浏览器端全局变量
     }
   },
   ```

------

### 3.5 JS兼容性处理

> Babel：`babel-loader`、`@babel/core`、`@babel/preset-env`、`@babel/polyfill`、`core-js`

1. 下载安装包

   ```bash
   npm i -D babel-loader @babel/core @babel/preset-env @babel/polyfill core-js
   ```

2. babel：可对ES6及更新版本代码做兼容性处理

   1）`@babel/preset-env`：基本js兼容性处理，只能转换基本语法，如promise高级语法不能转换

   2）`@babel/polyfill`：全部js兼容性处理，引入所有兼容性代码，体积庞大（要在JS文件中import）

   3）`core-js`：按需加载，仅处理需要做的兼容性处理

3. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     module: {
       rules: [
         {
           test: /\.js$/,
           // 第三方库不检查
           exclude: /node_modules/,
           loader: 'babel-loader',
           options: {
             // 预设：指示babel做怎么样的兼容性处理
             presets: [
               [
                 '@babel/preset-env',
                 {
                   // 按需加载
                   useBuiltIns: 'usage',
                   // 指定core-js版本
                   corejs: {
                     version: 3,
                   },
                   // 指定兼容性做到哪个版本浏览器
                   targets: {
                     chrome: '60',
                     firefox: '60',
                     ie: '9',
                     safari: '10',
                     edge: '17',
                   },
                 },
               ],
             ],
           },
         },
       ],
     },
     ......
   }
   ```

------

### 3.6 JS压缩

> mode设置为`production`(生产环境)，自动压缩代码

1. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     .......
     // 生产环境下会自动压缩js代码
     mode: 'production',
   }
   ```

------

### 3.7 HTML压缩

> 配置`html-webpack-plugin`插件中的`minify`选项

1. 修改配置文件：webpack.config.js

   ```js
   ......
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     .
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
         // 压缩html代码
         minify: {
           // 移除空格
           collapseWhitespace: true,
           // 移除注释
           removeComments: true,
         },
       }),
     ],
     // 生产环境下会自动压缩js代码
     mode: 'production',
   }
   ```

------

### 3.8 生产环境配置

> Loader：先执行`eslint`，再执行`babel`

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   
   // 提取CSS成单独文件（在外部声明变量，在module中可以复用）
   const commonCssLoader = [
     MiniCssExtractPlugin.loader,
     'css-loader',
     {
       // package.json：配置browserslist
       loader: 'postcss-loader',
       options: {
         ident: 'postcss',
         plugins: () => [require('postcss-preset-env')()],
       },
     },
   ]
   
   module.exports = {
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         // 打包CSS
         {
           test: /\.css$/,
           use: [...commonCssLoader],	// 复用代码
         },
         // 打包LESS
         {
           test: /\.less$/,
           use: [...commonCssLoader, 'less-loader'],	// 复用代码
         },
         // JS语法检查
         {
           // package.json：配置eslintConfig为airbnb
           test: /\.js$/,
           exclude: /node_modules/,
           // 优先执行
           enforce: 'pre',
           loader: 'eslint-loader',
           options: {
             fix: true,
           },
         },
         // JS兼容性处理
         {
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader',
           options: {
             presets: [
               [
                 '@babel/preset-env',
                 {
                   useBuiltIns: 'usage',
                   corejs: { version: 3 },
                   targets: {
                     chrome: '60',
                     firefox: '50',
                   },
                 },
               ],
             ],
           },
         },
         // 打包图片资源
         {
           test: /\.(jpg|png|gif)/,
           loader: 'url-loader',
           options: {
             limit: 8 * 1024,
             name: '[hash:10].[ext]',
             outputPath: 'imgs',
             esModule: false,
           },
         },
         // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
         {
           test: /\.html$/,
           loader: 'html-loader',
         },
         // 打包其他资源
         {
           exclude: /\.(js|css|less|html|jpg|png|gif)/,
           loader: 'file-loader',
           options: {
             outputPath: 'media',
           },
         },
       ],
     },
     plugins: [
       // 提取CSS成单独文件
       new MiniCssExtractPlugin({
         filename: 'css/built.css',
       }),
       // 压缩CSS
       new OptimizeCssAssetsWebpackPlugin(),
       // 打包HTML资源
       new HtmlWebpackPlugin({
         template: './src/index.html',
         minify: {
           collapseWhitespace: true,
           removeComments: true,
         },
       }),
     ],
     mode: 'production',
   }
   ```

2. 修改 package.json

   ```json
   // CSS兼容性处理
   "browserslist": {
     // 开发环境：设置 process.env.NODE_ENV = development
     "development": [
       "last 1 chrome version",
       "last 1 firefox version",
       "last 1 safari version"
     ],
     // 生产环境：默认
     "production": [
       // 兼容99.8%的浏览器，且不包含已淘汰和op_mini型的浏览器
       ">0.2%",
       "not dead",
       "not op_mini all"
     ]
   },
   // JS语法检查
   "eslintConfig": {
     // airbub是一种风格指南，可以设为检查标准
     "extends": "airbnb-base",
     "env": {
       "browser": true
     }
   },
   ```

------

## 第4章 Webpack优化配置

### 4.0 优化项

1. 开发环境性能优化：

   1）优化打包构建速度：HMR

   2）优化代码调试：source-map

2. 生产环境性能优化：

   1）优化打包构建速度：oneOf、babel缓存、多进程打包、externals、dll

   2）优化代码运行的性能：缓存(hash-chunkhash-contenthash)、tree shaking、code split、懒加载/预加载、pwa

------

### 4.1 HMR

> HMR: 热模块替换（Hot module replacement），一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），极大提升构建速度

1. 开启HMR：

   1）CSS文件：可以使用HMR功能，因为`style-loader`内部实现了

   2）JS文件：默认不能使用HMR，需要修改js代码，添加支持HMR功能的代码（只能处理非入口js文件的其他文件）

   ```js
   import demo from './demo'
   ......
   // module.hot为true：开启HMR功能
   if (module.hot) {
     module.hot.accept('./demo.js', () => {
       // 监听demo.js文件的变化，一旦发生变化，其他模块不会重新打包构建，执行后面的回调函数
       demo()
     })
   }
   ```

   3）HTML文件：默认不能使用HMR，会导致问题：html文件不能热更新了，解决：修改entry入口，将html文件引入

3. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     // HTML文件：ntry入口，将html文件引入
     entry: ['./src/js/index.js', './src/index.html'],
     ......
     devServer: {
       contentBase: resolve(__dirname, 'build'),
       compress: true,
       port: 3000,
       open: true,
       // 开启HMR功能：若修改了webpack配置，新配置要想生效，必须重新webpack服务
       hot: true,
     },
   }
   ```

------

### 4.2 Source-map

> source-map：一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）

1. 语法：`[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

2. 参数说明：

   |           参数            | 类别 |  错误代码准确信息  |  源代码的错误位置  |             说明             |
   | :-----------------------: | :--: | :----------------: | :----------------: | :--------------------------: |
   |       `source-map`        | 外部 | :heavy_check_mark: | :heavy_check_mark: |              ——              |
   |    `inline-source-map`    | 内联 | :heavy_check_mark: | :heavy_check_mark: |   只生成一个内联source-map   |
   |    `hidden-source-map`    | 外部 | :heavy_check_mark: |        :x:         | 只提示到构建后代码的错误位置 |
   |     `eval-source-map`     | 内联 | :heavy_check_mark: | :heavy_check_mark: |   每个文件都生成source-map   |
   |  `nosources-source-map`   | 外部 | :heavy_check_mark: |        :x:         |      没有任何源代码信息      |
   |    `cheap-source-map`     | 外部 | :heavy_check_mark: | :heavy_check_mark: |     错误位置只能精确到行     |
   | `cheap-module-source-map` | 外部 | :heavy_check_mark: | :heavy_check_mark: |   将loader的source map加入   |

3. 内联和外部的区别：

   1）外部生成了文件，内联没有

   2）内联构建速度更快

4. 开发环境：速度快，调试更友好

   1）速度快（eval>inline>cheap）：`eval-cheap-souce-map`、`eval-source-map`

   2）调试更友好：`souce-map`、`cheap-module-souce-map`、`cheap-souce-map`

5. 生产环境：内联会让代码体积变大，所以在生产环境不用内联

   1）全部隐藏：`nosources-source-map`

   2）只隐藏源代码，会提示构建后代码错误信息：`hidden-source-map`

6. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     devtool: 'eval-source-map',
   }
   ```

------

### 4.3 oneOf

> oneOf：数组形式，里面的loader只会匹配一个，加快打包构建速度

1. 不能有两个配置处理同一种类型文件：eslint-loader和less-loader都是处理JS文件的，所以要单独把eslint-loader写到oneOf外面，用`enforce: 'pre'`指定优先执行

1. 修改配置文件：webpack.config.js

   ```js
   ......
   // 复用loader
   const commonCssLoader = [
     MiniCssExtractPlugin.loader,
     'css-loader',
     {
       // 还需要在package.json中定义browserslist
       loader: 'postcss-loader',
       options: {
         ident: 'postcss',
         plugins: () => [require('postcss-preset-env')()],
       },
     },
   ]
   
   module.exports = {
     ......
     module: {
       rules: [
         // 单独将eslint-loader放到外面，防止和oneOf中的less-loader冲突
         // 因为它们都是处理JS文件的，不能有两个配置处理同一种类型文件
         // 用enforce: 'pre'指定优先执行
         {
           test: /\.js$/,
           exclude: /node_modules/,
           // 优先执行
           enforce: 'pre',
           loader: 'eslint-loader',
           options: {
             fix: true,
           },
         },
         {
           // 以下loader只会匹配一个，不能有两个配置处理同一种类型文件
           oneOf: [
             {
               test: /\.css$/,
               use: [...commonCssLoader],
             },
             {
               test: /\.less$/,
               use: [...commonCssLoader, 'less-loader'],
             },
             {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               options: {
                 presets: [
                   [
                     '@babel/preset-env',
                     {
                       useBuiltIns: 'usage',
                       corejs: { version: 3 },
                       targets: {
                         chrome: '60',
                         firefox: '50',
                       },
                     },
                   ],
                 ],
               },
             },
             {
               test: /\.(jpg|png|gif)/,
               loader: 'url-loader',
               options: {
                 limit: 8 * 1024,
                 name: '[hash:10].[ext]',
                 outputPath: 'imgs',
                 esModule: false,
               },
             },
             {
               test: /\.html$/,
               loader: 'html-loader',
             },
             {
               exclude: /\.(js|css|less|html|jpg|png|gif)/,
               loader: 'file-loader',
               options: {
                 outputPath: 'media',
               },
             },
           ],
         },
       ],
     },
     ......
   }
   ```

------

### 4.4 缓存

> 使用缓存（babel/文件缓存），在重新构建时可以读取缓存，加快打包速度

1. babel缓存：让第二次打包构建速度更快，语法：`cacheDirectory: true`

2. 文件资源缓存：使用缓存后，读取资源不走服务器，需要在文件名称上进行改动

   1）`hash`：每次wepack构建时会生成一个唯一的hash值；但js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效

   2）`chunkhash`：根据chunk生成的hash值；若打包来源于同一个chunk，hash值就一样，但是js和css的hash值还是一样的

   3）`contenthash`：根据文件的内容生成hash值，不同文件hash值一定不一样，让代码上线运行缓存更好使用

3. 修改配置文件：webpack.config.js

   ```js
   ......
   module.exports = {
     output: {
       // 文件资源缓存：hash/chunkhash/contenthash（推荐）
       filename: 'js/built.[contenthash:10].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         ......
         {
           oneOf: [
             ......
             {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               options: {
                 presets: [
                   [
                     '@babel/preset-env',
                     {
                       useBuiltIns: 'usage',
                       corejs: { version: 3 },
                       targets: {
                         chrome: '60',
                         firefox: '50',
                       },
                     },
                   ],
                 ],
                 // 开启babel缓存：第二次构建时，会读取之前的缓存
                 cacheDirectory: true,
               },
             },
             ......
           ],
         },
       ],
     },
     plugins: [
       new MiniCssExtractPlugin({
         // 文件资源缓存：hash/chunkhash/contenthash（推荐）
         filename: 'css/built.[contenthash:10].css',
       }),
       ......
     ],
   }
   ```

------

### 4.5 Tree Shaking

> tree shaking：去除无用代码，减小代码体积（前提：必须使用ES6模块化、开启production环境）

1. 修改配置文件：webpack.config.js

   ```js
   ......
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   ......
   module.exports = {
     ......
     mode: 'production',
     ......
   }
   ```
   
2. 修改 package.json

   ```json
   // 所有代码都没有副作用（都可以进行tree shaking）
   // "sideEffects": false
   // 可能会把css、@babel/polyfill文件干掉，需要手动排除
   "sideEffects": ["*.css", "*.less"]
   ```

------

### 4.6 Code Split

> 代码分割：将默认打包成的一个文件，分成多个文件

#### 4.6.1 普通多入口

1. JS文件

   ```js
   // index.js
   function sum(...args) {
     return args.reduce((p, c) => p + c, 0);
   }
   // eslint-disable-next-line
   console.log(sum(1, 2, 3, 4));
   ```
   
   ```js
   // test.js
   export function mul(x, y) {
     return x * y
   }
   export function count(x, y) {
     return x - y
   }
   ```
   
2. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     // 单入口
     // entry: './src/js/index.js',
     entry: {
       // 多入口：有几个入口，最终输出就有几个bundle
       index: './src/js/index.js',
       test: './src/js/test.js',
     },
     output: {
       // [name]：取文件名，区分输出的多个bundle
       filename: 'js/[name].[contenthash:10].js',
       path: resolve(__dirname, 'build'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
         minify: {
           collapseWhitespace: true,
           removeComments: true,
         },
       }),
     ],
     mode: 'production',
   }
   ```

------

#### 4.6.2 splitChunks

1. 语法：`optimization: { splitChunks: {chunks: 'all',}`

   1）可以将node_modules中代码单独打包一个chunk最终输出

   2）自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk

2. JS文件

   ```js
   // index.js
   import $ from 'jquery'
   
   function sum(...args) {
     return args.reduce((p, c) => p + c, 0)
   }
   // eslint-disable-next-line
   console.log(sum(1, 2, 3, 4))
   // eslint-disable-next-line
   console.log($)
   ```

   ```js
   // test.js
   import $ from 'jquery'
   // eslint-disable-next-line
   console.log($)
   export function mul(x, y) {
     return x * y
   }
   export function count(x, y) {
     return x - y
   }
   ```

3. webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     // 1. 可以将node_modules中代码单独打包一个chunk最终输出
     // 2. 自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
     ......
   }
   ```

------

#### 4.6.3 JS单独打包

1. import动态导入：能将某个文件单独打包成一个chunk

   ```js
   // index.js
   function sum(...args) {
     return args.reduce((p, c) => p + c, 0)
   }
   // webpackChunkName：指定打包后的文件名称（不会改变）
   import(/* webpackChunkName: 'test' */ './test')
     .then(({ mul, count }) => {
       // 文件加载成功
       // eslint-disable-next-line
       console.log(mul(2, 5))
     })
     .catch(() => {
       // eslint-disable-next-line
       console.log('文件加载失败~')
     })
   
   // eslint-disable-next-line
   console.log(sum(1, 2, 3, 4))
   ```

   ```js
   // test.js
   export function mul(x, y) {
     return x * y
   }
   export function count(x, y) {
     return x - y
   }
   ```

2. webpack.config.js

   ```js
   ......
   module.exports = {
     // 单入口
     entry: './src/js/index.js',
     ......
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
     ......
   }
   ```

------

### 4.7 Lazy Loading

> 懒加载：在JS中将import放入事件回调函数内，按需加载；若配置`webpackPrefetch: true`则为预加载

1. 加载方法：

   1）懒加载：当文件需要使用时才加载

   2）预加载 `webpackPrefetch`：使用之前提前加载js文件，等其他资源加载完毕后再加载资源，但兼容性很差

   3）正常加载：并行加载，同一时间加载多个文件 

2. JS文件：

   ```js
   // index.js
   console.log('index.js文件被加载了')
   document.getElementById('btn').onclick = function () {
     // 预加载：webpackPrefetch: true（不写则为懒加载）
     import(/* webpackChunkName: 'test', webpackPrefetch: true */ './test').then(({ mul }) => {
       console.log(mul(4, 5))
     })
   }
   ```

   ```js
   // test.js
   console.log('test.js文件被加载了')
   export function mul(x, y) {
     return x * y
   }
   export function count(x, y) {
     return x - y
   }
   ```

3. webpack.config.js：与代码分割相同配置

   ```js
   ......
   module.exports = {
     // 单入口
     entry: './src/js/index.js',
     ......
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
     ......
   }
   ```

------

### 4.8 PWA

> PWA: 渐进式网络开发应用程序（离线可访问）

1. 下载安装包：

   ```bash
   npm i -D workbox-webpack-plugin
   ```

2. JS文件：serviceWorker代码必须运行在服务器上，利用`serve`库可以快速构建服务器

   ```js
   ......
   // 注册serviceWorker，处理兼容性问题
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker
         .register('/service-worker.js')
         .then(() => {
           console.log('serviceWorker注册成功!')
         })
         .catch(() => {
           console.log('serviceWorker注册失败!')
         })
     })
   }
   ```

3. webpack.config.js

   ```js
   ......
   const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
   ......
   module.exports = {
     ......
     plugins: [
       ......
       new WorkboxWebpackPlugin.GenerateSW({
         // 1. 快速启动 serviceworker
         // 2. 删除旧的 serviceworker
         // 3. 生成 serviceworker 配置文件
         clientsClaim: true,
         skipWaiting: true,
       }),
     ],
     ......
   }
   ```

------

### 4.9 多进程打包

> Loader：`thread-loader`，启动大概为600ms，只有工作消耗时间比较长，才需要多进程打包

1. 下载安装包：

   ```bash
   npm i -D thread-loader
   ```

2. webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     module: {
       rules: [
         ......
         {
           oneOf: [
             ......
             {
               test: /\.js$/,
               // 排除第三方库
               exclude: /node_modules/,
               use: [
                 // 开启多进程打包：启动大概为600ms，进程通信也有开销
                 {
                   loader: 'thread-loader',
                   options: {
                     workers: 2, // 进程2个
                   },
                 },
                 .......
               ],
             },
             ......
           ],
         },
       ],
     },
     ......
   }
   ```

------

### 4.10 Externals

> 作用：防止将某些第三方库打包到最终的bundle文件中

1. webpack.config.js

   ```js
   ......
   module.exports = {
     ......
     externals: {
       // 拒绝jQuery被打包进来
       // 库名：包名
       jquery: 'jQuery',
     },
   }
   ```

2. 需要手动在index.html中引入被排除在外的第三方库：

   ```html
   <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
   ```

------

### 4.11 Dll

> 作用：对某些库（第三方库：jquery、react、vue...）进行单独打包

1. webpack.config.js

   ```js
   ......
   const webpack = require('webpack')
   const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
   
   module.exports = {
     ......
     plugins: [
       ......
       // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
       new webpack.DllReferencePlugin({
         manifest: resolve(__dirname, 'dll/manifest.json'),
       }),
       // 将某个文件打包输出去，并在html中自动引入该资源
       new AddAssetHtmlWebpackPlugin({
         filepath: resolve(__dirname, 'dll/jquery.js'),
       }),
     ],
     ......
   }
   ```
   
2. webpack.dll.js

   ```js
   const { resolve } = require('path')
   const webpack = require('webpack')
   
   module.exports = {
     entry: {
       // 打包生成的[name]: ['要打包的库']
       jquery: ['jquery'],
     },
     output: {
       filename: '[name].js',
       path: resolve(__dirname, 'dll'),
       library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
     },
     plugins: [
       // 打包生成一个 manifest.json：提供与jquery的映射关系
       new webpack.DllPlugin({
         name: '[name]_[hash]', // 映射库的暴露的内容名称
         path: resolve(__dirname, 'dll/manifest.json'), // 输出文件路径
       }),
     ],
     mode: 'production',
   }
   ```
   
3. 运行 webpack.dll.js 文件

   ```bash
   webpack --config webpack.dll.js
   ```

------

## 第5章 Webpack配置详情

### 5.1 Entry

1. 入口类型：

   1）单入口：打包形成一个chunk，输出一个bundle文件，此时chunk的名称默认是main

   ```js
   entry: './src/index.js'
   ```

   2）多入口：数组形式、对象形式

   ```js
   // 数组形式：形成一个chunk，输出一个bundle文件，需要在HMR功能中让html热更新生效时才会这么写
   entry: ['./src/index.js', './src/add.js']
   
   // 对象形式：有几个入口文件就形成几个chunk，输出几个bundle文件，此时chunk的名称是key
   entry: {
     index: './src/index.js',
     add: './src/add.js'
   }
   ```

   3）组合使用：每条key对应的文件形成一个chunk, 输出一个bundle文件，chunk的名称是key，dll常用此方法

   ```js
   entry: {
     index: ['./src/index.js', './src/count.js'], 
     add: './src/add.js'
   }
   ```

2. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: {
       index: ['./src/index.js', './src/count.js'],
       add: './src/add.js',
     },
     output: {
       filename: '[name].js',
       path: resolve(__dirname, 'build'),
     },
     plugins: [new HtmlWebpackPlugin()],
     mode: 'development',
   }
   ```

3. 输出文件结构：

   ```txt
   ├─build
   |   ├─add.js
   |   ├─index.html
   |   └index.js
   ```

------

### 5.2 Output

1. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       // 文件名称（指定名称+目录）
       filename: 'js/[name].js',
       // 输出文件目录（将来所有资源输出的公共目录）
       path: resolve(__dirname, 'build'),
       // 所有资源引入公共路径前缀：'imgs/a.jpg' --> '/imgs/a.jpg'
       publicPath: '/',
       chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称（name一般为id编号，自动从0开始）
       // 备注：library一般与dll配合使用，一般情况下不用
       // library: '[name]', 		// 整个库向外暴露的变量名
       // libraryTarget: 'window' 	// 变量名添加到哪个上 browser
       // libraryTarget: 'global' 	// 变量名添加到哪个上 node
       // libraryTarget: 'commonjs'
     },
     plugins: [new HtmlWebpackPlugin()],
     mode: 'development',
   }
   ```

------

### 5.3 Module

1. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'js/[name].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           // 多个loader：用use
           use: ['style-loader', 'css-loader'],
         },
         {
           test: /\.js$/,
           // 排除node_modules下的js文件
           exclude: /node_modules/,
           // 只检查src下的js文件
           include: resolve(__dirname, 'src'),
           // 优先执行
           enforce: 'pre',
           // 延后执行
           // enforce: 'post',
           
           // 单个loader：用loader
           loader: 'eslint-loader',
           options: {},
         },
         {
           // 以下配置只会生效一个
           oneOf: [],
         },
       ],
     },
     plugins: [new HtmlWebpackPlugin()],
     mode: 'development',
   }
   ```

------

### 5.4 Resolve

1. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     ......
     // 解析模块的规则
     resolve: {
       // 配置解析模块路径别名: 优点：简写路径，缺点：路径没有提示
       alias: {
         // 用$css代表css文件所在的路径
         $css: resolve(__dirname, 'src/css'),
       },
       // 配置省略文件路径的后缀名
       extensions: ['.js', '.json', '.jsx', '.css'],
       // 告诉 webpack 解析模块是去找哪个目录
       modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
     },
   }
   ```

------

### 5.5 Dev Server

1. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     ......
     devServer: {
       // 运行代码的目录
       contentBase: resolve(__dirname, 'build'),
       // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
       watchContentBase: true,
       watchOptions: {
         // 忽略文件
         ignored: /node_modules/,
       },
       // 启动gzip压缩
       compress: true,
       // 端口号
       port: 5000,
       // 域名
       host: 'localhost',
       // 自动打开浏览器
       open: true,
       // 开启HMR功能
       hot: true,
       // 不要显示启动服务器日志信息
       clientLogLevel: 'none',
       // 除了一些基本启动信息以外，其他内容都不要显示
       quiet: true,
       // 如果出错了，不要全屏提示~
       overlay: false,
       // 服务器代理 --> 解决开发环境跨域问题
       proxy: {
         // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
         '/api': {
           target: 'http://localhost:3000',
           // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
           pathRewrite: {
             '^/api': '',
           },
         },
       },
     },
   }
   ```

------

### 5.6 Optimization

1. webpack.config.js

   ```js
   ......
   const TerserWebpackPlugin = require('terser-webpack-plugin')
   
   module.exports = {
     ......
     output: {
       filename: 'js/[name].[contenthash:10].js',
       path: resolve(__dirname, 'build'),
       chunkFilename: 'js/[name].[contenthash:10]_chunk.js',
     },
     ......
     optimization: {
       splitChunks: {
         chunks: 'all',
         // 默认值，可以不写
         minSize: 30 * 1024, 			// 分割的chunk最小为30kb
         maxSiza: 0, 					// 最大没有限制
         minChunks: 1, 				// 要提取的chunk最少被引用1次
         maxAsyncRequests: 5, 			// 按需加载时并行加载的文件的最大数量
         maxInitialRequests: 3, 		// 入口js文件最大并行请求数量
         automaticNameDelimiter: '~', 	// 名称连接符
         name: true, 					// 可以使用命名规则
         cacheGroups: {
           // 分割chunk的组
           // node_modules文件会被打包到 vendors 组的chunk中：vendors~xxx.js
           // 满足上面的公共规则，如：大小超过30kb，至少被引用一次
           vendors: {
             test: /[\\/]node_modules[\\/]/,
             // 优先级
             priority: -10,
           },
           default: {
             // 要提取的chunk最少被引用2次
             minChunks: 2,
             // 优先级
             priority: -20,
             // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
             reuseExistingChunk: true,
           },
         },
       },
       // 将当前模块的记录其他模块的hash单独打包为一个runtime文件
       // 可以解决：修改a文件导致b文件的contenthash变化
       runtimeChunk: {
         name: (entrypoint) => `runtime-${entrypoint.name}`,
       },
       minimizer: [
         // 配置生产环境的压缩方案：js和css
         new TerserWebpackPlugin({
           // 开启缓存
           cache: true,
           // 开启多进程打包
           parallel: true,
           // 启动source-map
           sourceMap: true,
         }),
       ],
     },
   }
   ```

------

## 第6章 Webpack5

> 官方说明：[https://github.com/webpack/changelog-v5](https://github.com/webpack/changelog-v5)

### 6.1 新版说明

1. 下载：

   ```bash
   npm i webpack@next webpack-cli -D
   ```

2. 新特性：

   1）通过持久缓存提高构建性能

   2）使用更好的算法和默认值来改善长期缓存

   3）通过更好的树摇和代码生成来改善捆绑包大小

   4）清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改

   5）通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5

3. 自动删除node.js、polyfills

   1）v4及早期版本附带了许多node.js核心模块的polyfill，一旦模块使用任何核心模块便会自动应用

   2）v5会自动停止填充这些核心模块，并专注于与前端兼容的模块

   3）解决：使用与前端兼容的模块；为node.js核心模块手动添加一个polyfill

------

### 6.2 Chunk

1. 模块ID：添加了用于长期缓存的新算法，在生产模式下默认情况下启用这些功能

   ```js
   chunkIds: "deterministic",
   moduleIds: "deterministic"
   ```

2. chunkID：内部有chunk命名规则，不再以id(0, 1, 2)命名了

   ```js
   // 开发环境中为chunk命名方法
   import(/* webpackChunkName: "name" */ "module")
   ```

------

### 6.3 Tree Shaking

1. 处理嵌套模块：在生产环境中，inner模块暴露的`b`会被删除

   ```js
   // inner.js
   export const a = 1;
   export const b = 2;
   
   // module.js
   import * as inner from './inner';
   export { inner };
   
   // user.js
   import * as module from './module';
   console.log(module.inner.a);
   ```

2. 处理多模块关系：设置`"sideEffects": false`时，若`test`方法没有使用，会删除`test`和`"./something"`

   ```js
   import { something } from './something';
   
   function usingSomething() {
     return something;
   }
   
   export function test() {
     return usingSomething();
   }
   ```

3. 能处理Commonjs的tree shaking

------

### 6.4 Output

1. 可选输出JS代码版本：

   1）v4默认只能输出ES5代码

   2）v5新增属性 `output.ecmaVersion`, 可以生成 ES5 和 ES6 / ES2015 代码

   ```js
   output.ecmaVersion: 2015
   ```

2. 监视输出文件：

   1）v4总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件

   2）v5在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件

3. 默认值：

   ```js
   module.exports = {
     entry: './src/index.js', // 入口文件
     output: {
       // 输出配置
       filename: '[name].js', // 输出文件名
       path: resolve(__dirname, 'dist'), // 输出文件路径配置
     },
   }
   ```

------

