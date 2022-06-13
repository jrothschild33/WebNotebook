# Webpack

## 第1章 Webpack概述

### 1.1 Webpack简介

<img :src="$withBase('/imgs/server/webpack简介.png')" alt="webpack简介">

1. 定义：webpack 是一种前端资源构建工具，一个静态模块打包器(module bundler)。在 webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

2. 核心概念：

   1）Entry：webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图

   2）Output：webpack 打包后的资源 bundles 输出到哪里去，以及如何命名

   3）Loader：让 webpack 能够去处理那些非 JavaScript 文件(webpack自身只理解JS)

   4）Plugins：插件可以用于执行范围更广的任务，包括打包优化、压缩、重新定义环境中的变量等

   5）Mode：webpack 使用相应模式的配置

3. 环境变量：

   1）development：能让代码本地调试运行的环境

   ```js
   process.env.NODE_ENV = 'development'
   // 启用的插件
   // NamedChunksPlugin
   // NamedModulesPlugin
   ```

   2）production：能让代码优化上线运行的环境

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

1. 开发环境指令：能够编译打包js和json文件，并能将es6的模块化语法转换成浏览器能识别的语法

   ```bash
   webpack src/js/index.js -o build/js/built.js --mode=development
   ```

2. 生产环境指令：比开发环境多了压缩代码的功能

   ```bash
   webpack src/js/index.js -o build/js/built.js --mode=production
   ```

------

## 第2章 开发环境配置

### 2.1 创建配置文件

1. webpack.config.js

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

2. 运行指令:`webpack`

------

### 2.2 打包样式资源

1. 创建文件：index.css、index.less、index.js

2. 下载安装：`loader`

   ```bash
   npm i css-loader style-loader less-loader less -D
   ```

3. 修改配置文件：webpack.config.js

   ```js
   // resolve用来拼接绝对路径的方法
   const { resolve } = require('path')
   
   module.exports = {
     // webpack配置
     // 入口起点
     entry: './src/index.js',
     // 输出
     output: {
       // 输出文件名
       filename: 'built.js',
       // 输出路径
       // __dirname nodejs的变量，代表当前文件的目录绝对路径
       path: resolve(__dirname, 'build'),
     },
     // loader的配置
     module: {
       rules: [
         // 详细loader配置
         // 不同文件必须配置不同loader处理
         {
           // 匹配哪些文件
           test: /\.css$/,
           // 使用哪些loader进行处理
           use: [
             // use数组中loader执行顺序：从右到左，从下到上 依次执行
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
             // 将less文件编译成css文件
             // 需要下载 less-loader和less
             'less-loader',
           ],
         },
       ],
     },
     // plugins的配置
     plugins: [
       // 详细plugins的配置
     ],
     // 模式
     mode: 'development', // 开发模式
     // mode: 'production'
   }
   ```

------

### 2.3 打包HTML资源

1. 创建文件：index.html、index.js

2. 下载安装：`plugin`

   ```bash
   npm install --save-dev html-webpack-plugin
   ```

3. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         // loader的配置
       ],
     },
     plugins: [
       // plugins的配置
       // html-webpack-plugin
       // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
       // 需求：需要有结构的HTML文件
       new HtmlWebpackPlugin({
         // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
         template: './src/index.html',
       }),
     ],
     mode: 'development',
   }
   ```

------

### 2.4 打包图片资源

1. 创建文件：index.html、index.js

2. 下载安装：`loader`

   ```bash
   npm install --save-dev html-loader url-loader file-loader
   ```

3. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'built.js',
       path: resolve(__dirname, 'build'),
     },
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
           // 使用一个loader
           // 下载 url-loader file-loader
           loader: 'url-loader',
           options: {
             // 图片大小小于8kb，就会被base64处理
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
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     mode: 'development',
   }
   ```

------

### 2.5 打包其他资源

1. 创建文件：iconfont.eot、iconfont.svg、iconfont.ttf、iconfont.woff

2. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
         // 打包其他资源(除了html/js/css资源以外的资源)
         {
           // 排除css/js/html资源
           exclude: /\.(css|js|html|less)$/,
           loader: 'file-loader',
           options: {
             name: '[hash:10].[ext]',
           },
         },
       ],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     mode: 'development',
   }
   ```

------

### 2.6 devserver

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
         // 打包其他资源(除了html/js/css资源以外的资源)
         {
           // 排除css/js/html资源
           exclude: /\.(css|js|html|less)$/,
           loader: 'file-loader',
           options: {
             name: '[hash:10].[ext]',
           },
         },
       ],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     mode: 'development',
   
     // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
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

------

### 2.7 开发环境配置

1. 创建文件

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

1. 下载安装：`plugin`

   ```bash
   npm install --save-dev mini-css-extract-plugin
   ```

2. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   
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
             // 创建style标签，将样式放入
             // 'style-loader',
             // 这个loader取代style-loader。作用：提取js中的css成单独文件
             MiniCssExtractPlugin.loader,
             // 将css文件整合到js文件中
             'css-loader',
           ],
         },
       ],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
       new MiniCssExtractPlugin({
         // 对输出的css文件进行重命名
         filename: 'css/built.css',
       }),
     ],
     mode: 'development',
   }
   ```

------

### 3.2 CSS兼容性处理

1. 下载安装：`loader`

   ```bash
   npm install --save-dev postcss-loader postcss-preset-env
   ```

2. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   
   // 设置nodejs环境变量
   // process.env.NODE_ENV = 'development';
   
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
             /*
               css兼容性处理：postcss --> postcss-loader postcss-preset-env
   
               帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
   
               "browserslist": {
                 // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                 "development": [
                   "last 1 chrome version",
                   "last 1 firefox version",
                   "last 1 safari version"
                 ],
                 // 生产环境：默认是看生产环境
                 "production": [
                   ">0.2%",
                   "not dead",
                   "not op_mini all"
                 ]
               }
             */
             // 使用loader的默认配置
             // 'postcss-loader',
             // 修改loader的配置
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

3. 修改 package.json

   ```json
   "browserslist": {
     "development": [
       "last 1 chrome version",
       "last 1 firefox version",
       "last 1 safari version"
     ],
     "production": [
       ">0.2%",
       "not dead",
       "not op_mini all"
     ]
   },
   ```

------

### 3.3 CSS压缩

1. 下载安装：`plugin`

   ```bash
   npm install --save-dev optimize-css-assets-webpack-plugin
   ```

2. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   
   // 设置nodejs环境变量
   // process.env.NODE_ENV = 'development';
   
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
       // 压缩css
       new OptimizeCssAssetsWebpackPlugin(),
     ],
     mode: 'development',
   }
   ```

------

### 3.4 JS语法检查

1. 下载安装包：

   ```bash
   npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
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
         /*
           语法检查： eslint-loader  eslint
             注意：只检查自己写的源代码，第三方的库是不用检查的
             设置检查规则：
               package.json中eslintConfig中设置~
                 "eslintConfig": {
                   "extends": "airbnb-base"
                 }
               airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
         */
         {
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'eslint-loader',
           options: {
             // 自动修复eslint的错误
             fix: true,
           },
         },
       ],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     mode: 'development',
   }
   ```

3. 修改 package.json

   ```json
   "eslintConfig": {
     "extends": "airbnb-base",
     "env": {
       "browser": true
     }
   },
   ```

------

### 3.5 JS兼容性处理

1. 下载安装包

   ```bash
   npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill core-js
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
         /*
           js兼容性处理：babel-loader @babel/core 
             1. 基本js兼容性处理 --> @babel/preset-env
               问题：只能转换基本语法，如promise高级语法不能转换
             2. 全部js兼容性处理 --> @babel/polyfill  
               问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
             3. 需要做兼容性处理的就做：按需加载  --> core-js
         */
         {
           test: /\.js$/,
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
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     mode: 'development',
   }
   ```

------

### 3.6 JS压缩

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     // 生产环境下会自动压缩js代码
     mode: 'production',
   }
   ```

------

### 3.7 HTML压缩

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
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
     mode: 'production',
   }
   ```

------

### 3.8 生产环境配置

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [...commonCssLoader],
         },
         {
           test: /\.less$/,
           use: [...commonCssLoader, 'less-loader'],
         },
         /*
           正常来讲，一个文件只能被一个loader处理。
           当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
             先执行eslint 在执行babel
         */
         {
           // 在package.json中eslintConfig --> airbnb
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
     plugins: [
       new MiniCssExtractPlugin({
         filename: 'css/built.css',
       }),
       new OptimizeCssAssetsWebpackPlugin(),
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

## 第4章 Webpack优化配置

### 4.0 优化项

1. webpack性能优化：

   1）开发环境性能优化

   2）生产环境性能优化

2. 开发环境性能优化：

   1）优化打包构建速度：HMR

   2）优化代码调试：source-map

3. 生产环境性能优化：

   1）优化打包构建速度：oneOf、babel缓存、多进程打包、externals、dll

   2）优化代码运行的性能：缓存(hash-chunkhash-contenthash)、tree shaking、code split、懒加载/预加载、pwa

------

### 4.1 HMR

> HMR: Hot module replacement，热模块替换/模块热替换

1. 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），极大提升构建速度

2. 文件：

   1）CSS文件：可以使用HMR功能：因为style-loader内部实现了~

   2）JS文件：默认不能使用HMR，需要修改js代码，添加支持HMR功能的代码（只能处理非入口js文件的其他文件）

   3）html文件: 默认不能使用HMR，会导致问题：html文件不能热更新了，解决：修改entry入口，将html文件引入

3. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: ['./src/js/index.js', './src/index.html'],
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
       // 开启HMR功能
       // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
       hot: true,
     },
   }
   ```

------

### 4.2 Source-map

> source-map：一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）

1. 语法：`[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

2. 参数说明：

   |           参数            | 类别 | 错误代码准确信息 | 源代码的错误位置 |                        说明                        |
   | :-----------------------: | :--: | :--------------: | :--------------: | :------------------------------------------------: |
   |       `source-map`        | 外部 |        √         |        √         |                         ——                         |
   |    `inline-source-map`    | 内联 |        √         |        √         |              只生成一个内联source-map              |
   |    `hidden-source-map`    | 外部 |        √         |        ×         | 不能追踪源代码错误，只能提示到构建后代码的错误位置 |
   |     `eval-source-map`     | 内联 |        √         |        √         |       每个文件都生成对应的source-map都在eval       |
   |  `nosources-source-map`   | 外部 |        √         |        ×         |                 没有任何源代码信息                 |
   |    `cheap-source-map`     | 外部 |        √         |        √         |                    只能精确的行                    |
   | `cheap-module-source-map` | 外部 |                  |                  |          module会将loader的source map加入          |

3. 内联和外部的区别：

   1）外部生成了文件，内联没有

   2）内联构建速度更快

4. 开发环境：速度快，调试更友好

   1）速度快(eval>inline>cheap>...)：`eval-cheap-souce-map`、`eval-source-map`

   2）调试更友好：`souce-map`、`cheap-module-souce-map`、`cheap-souce-map`

5. 生产环境：内联会让代码体积变大，所以在生产环境不用内联

   1）全部隐藏：`nosources-source-map`

   2）只隐藏源代码，会提示构建后代码错误信息：`hidden-source-map`

6. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: ['./src/js/index.js', './src/index.html'],
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
       hot: true,
     },
     devtool: 'eval-source-map',
   }
   ```

------

### 4.3 oneOf

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           // 在package.json中eslintConfig --> airbnb
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
           // 以下loader只会匹配一个
           // 注意：不能有两个配置处理同一种类型文件
           oneOf: [
             {
               test: /\.css$/,
               use: [...commonCssLoader],
             },
             {
               test: /\.less$/,
               use: [...commonCssLoader, 'less-loader'],
             },
             /*
               正常来讲，一个文件只能被一个loader处理。
               当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                 先执行eslint 在执行babel
             */
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
     plugins: [
       new MiniCssExtractPlugin({
         filename: 'css/built.css',
       }),
       new OptimizeCssAssetsWebpackPlugin(),
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

### 4.4 缓存

1. babel缓存：让第二次打包构建速度更快，语法：`cacheDirectory: true`

2. 文件资源缓存：

   1）`hash`：每次wepack构建时会生成一个唯一的hash值；但js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效

   2）`chunkhash`：根据chunk生成的hash值；若打包来源于同一个chunk，hash值就一样，但是js和css的hash值还是一样的

   3）`contenthash`：根据文件的内容生成hash值，不同文件hash值一定不一样，让代码上线运行缓存更好使用

3. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.[contenthash:10].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           // 在package.json中eslintConfig --> airbnb
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
           // 以下loader只会匹配一个
           // 注意：不能有两个配置处理同一种类型文件
           oneOf: [
             {
               test: /\.css$/,
               use: [...commonCssLoader],
             },
             {
               test: /\.less$/,
               use: [...commonCssLoader, 'less-loader'],
             },
             /*
               正常来讲，一个文件只能被一个loader处理。
               当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                 先执行eslint 在执行babel
             */
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
                 // 开启babel缓存
                 // 第二次构建时，会读取之前的缓存
                 cacheDirectory: true,
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
     plugins: [
       new MiniCssExtractPlugin({
         filename: 'css/built.[contenthash:10].css',
       }),
       new OptimizeCssAssetsWebpackPlugin(),
       new HtmlWebpackPlugin({
         template: './src/index.html',
         minify: {
           collapseWhitespace: true,
           removeComments: true,
         },
       }),
     ],
     mode: 'production',
     devtool: 'source-map',
   }
   ```

------

### 4.5 Tree Shaking

> tree shaking：去除无用代码，减小代码体积（前提：必须使用ES6模块化、开启production环境）

1. 修改配置文件：webpack.config.js

   ```js
   const { resolve } = require('path')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.[contenthash:10].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           // 在package.json中eslintConfig --> airbnb
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
           // 以下loader只会匹配一个
           // 注意：不能有两个配置处理同一种类型文件
           oneOf: [
             {
               test: /\.css$/,
               use: [...commonCssLoader],
             },
             {
               test: /\.less$/,
               use: [...commonCssLoader, 'less-loader'],
             },
             /*
               正常来讲，一个文件只能被一个loader处理。
               当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                 先执行eslint 在执行babel
             */
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
                 // 开启babel缓存
                 // 第二次构建时，会读取之前的缓存
                 cacheDirectory: true,
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
     plugins: [
       new MiniCssExtractPlugin({
         filename: 'css/built.[contenthash:10].css',
       }),
       new OptimizeCssAssetsWebpackPlugin(),
       new HtmlWebpackPlugin({
         template: './src/index.html',
         minify: {
           collapseWhitespace: true,
           removeComments: true,
         },
       }),
     ],
     mode: 'production',
     devtool: 'source-map',
   }
   ```

2. 修改 package.json

   ```json
   // 所有代码都没有副作用（都可以进行tree shaking）
   "sideEffects": false
   // 但可能会把css/@babel/polyfill文件干掉
   "sideEffects": ["*.css", "*.less"]
   ```

------

### 4.6 Code Split

1. Demo1：

   1）JS文件

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

   2）webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     // 单入口
     // entry: './src/js/index.js',
     entry: {
       // 多入口：有一个入口，最终输出就有一个bundle
       index: './src/js/index.js',
       test: './src/js/test.js',
     },
     output: {
       // [name]：取文件名
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

2. Demo2：

   1）JS文件

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

   2）webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     // 单入口
     // entry: './src/js/index.js',
     entry: {
       index: './src/js/index.js',
       test: './src/js/test.js',
     },
     output: {
       // [name]：取文件名
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
     /*
       1. 可以将node_modules中代码单独打包一个chunk最终输出
       2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
     */
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
     mode: 'production',
   }
   ```

3. Demo3：

   1）JS文件：

   ```js
   // index.js
   function sum(...args) {
     return args.reduce((p, c) => p + c, 0)
   }
   
   /*
     通过js代码，让某个文件被单独打包成一个chunk
     import动态导入语法：能将某个文件单独打包
   */
   import(/* webpackChunkName: 'test' */ './test')
     .then(({ mul, count }) => {
       // 文件加载成功~
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

   2）webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     // 单入口
     entry: './src/js/index.js',
     output: {
       // [name]：取文件名
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
     /*
       1. 可以将node_modules中代码单独打包一个chunk最终输出
       2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
     */
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
     mode: 'production',
   }
   ```

------

### 4.7 Lazy Loading

1. 加载方法：

   1）懒加载：当文件需要使用时才加载

   2）预加载 prefetch：会在使用之前，提前加载js文件，等其他资源加载完毕，浏览器空闲后再加载资源

   3）正常加载：并行加载，同一时间加载多个文件 

2. JS文件

   ```js
   // index.js
   console.log('index.js文件被加载了~')
   // import { mul } from './test';
   document.getElementById('btn').onclick = function () {
     import(/* webpackChunkName: 'test', webpackPrefetch: true */ './test').then(({ mul }) => {
       console.log(mul(4, 5))
     })
   }
   ```

   ```js
   // test.js
   console.log('test.js文件被加载了~')
   
   export function mul(x, y) {
     return x * y
   }
   
   export function count(x, y) {
     return x - y
   }
   ```

3. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     // 单入口
     entry: './src/js/index.js',
     output: {
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
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
     mode: 'production',
   }
   ```

------

### 4.8 PWA

> PWA: 渐进式网络开发应用程序(离线可访问)

1. 下载安装包：

   ```bash
   npm install --save-dev workbox-webpack-plugin
   ```

2. webpack.config.js

   ```js
   const { resolve } = require('path')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
   
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.[contenthash:10].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           // 在package.json中eslintConfig --> airbnb
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
           // 以下loader只会匹配一个
           // 注意：不能有两个配置处理同一种类型文件
           oneOf: [
             {
               test: /\.css$/,
               use: [...commonCssLoader],
             },
             {
               test: /\.less$/,
               use: [...commonCssLoader, 'less-loader'],
             },
             /*
               正常来讲，一个文件只能被一个loader处理。
               当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                 先执行eslint 在执行babel
             */
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
                 // 开启babel缓存
                 // 第二次构建时，会读取之前的缓存
                 cacheDirectory: true,
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
     plugins: [
       new MiniCssExtractPlugin({
         filename: 'css/built.[contenthash:10].css',
       }),
       new OptimizeCssAssetsWebpackPlugin(),
       new HtmlWebpackPlugin({
         template: './src/index.html',
         minify: {
           collapseWhitespace: true,
           removeComments: true,
         },
       }),
       new WorkboxWebpackPlugin.GenerateSW({
         /*
           1. 帮助serviceworker快速启动
           2. 删除旧的 serviceworker
   
           生成一个 serviceworker 配置文件~
         */
         clientsClaim: true,
         skipWaiting: true,
       }),
     ],
     mode: 'production',
     devtool: 'source-map',
   }
   ```

------

### 4.9 多进程打包

1. 下载安装包：

   ```bash
   npm install --save-dev thread-loader
   ```

2. webpack.config.js

   ```js
   const { resolve } = require('path')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
   
   // 定义nodejs环境变量：决定使用browserslist的哪个环境
   process.env.NODE_ENV = 'production'
   
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.[contenthash:10].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           // 在package.json中eslintConfig --> airbnb
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
           // 以下loader只会匹配一个
           // 注意：不能有两个配置处理同一种类型文件
           oneOf: [
             {
               test: /\.css$/,
               use: [...commonCssLoader],
             },
             {
               test: /\.less$/,
               use: [...commonCssLoader, 'less-loader'],
             },
             /*
               正常来讲，一个文件只能被一个loader处理。
               当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                 先执行eslint 在执行babel
             */
             {
               test: /\.js$/,
               exclude: /node_modules/,
               use: [
                 /* 
                   开启多进程打包。 
                   进程启动大概为600ms，进程通信也有开销。
                   只有工作消耗时间比较长，才需要多进程打包
                 */
                 {
                   loader: 'thread-loader',
                   options: {
                     workers: 2, // 进程2个
                   },
                 },
                 {
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
                     // 开启babel缓存
                     // 第二次构建时，会读取之前的缓存
                     cacheDirectory: true,
                   },
                 },
               ],
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
     plugins: [
       new MiniCssExtractPlugin({
         filename: 'css/built.[contenthash:10].css',
       }),
       new OptimizeCssAssetsWebpackPlugin(),
       new HtmlWebpackPlugin({
         template: './src/index.html',
         minify: {
           collapseWhitespace: true,
           removeComments: true,
         },
       }),
       new WorkboxWebpackPlugin.GenerateSW({
         /*
           1. 帮助serviceworker快速启动
           2. 删除旧的 serviceworker
   
           生成一个 serviceworker 配置文件~
         */
         clientsClaim: true,
         skipWaiting: true,
       }),
     ],
     mode: 'production',
     devtool: 'source-map',
   }
   ```

------

### 4.10 Externals

1. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/js/index.js',
     output: {
       filename: 'js/built.js',
       path: resolve(__dirname, 'build'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
     mode: 'production',
     externals: {
       // 拒绝jQuery被打包进来
       jquery: 'jQuery',
     },
   }
   ```

------

### 4.11 Dll

> 使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包

1. webpack.config.js

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const webpack = require('webpack')
   const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'built.js',
       path: resolve(__dirname, 'build'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
       // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
       new webpack.DllReferencePlugin({
         manifest: resolve(__dirname, 'dll/manifest.json'),
       }),
       // 将某个文件打包输出去，并在html中自动引入该资源
       new AddAssetHtmlWebpackPlugin({
         filepath: resolve(__dirname, 'dll/jquery.js'),
       }),
     ],
     mode: 'production',
   }
   ```

2. webpack.dll.js

   ```js
   const { resolve } = require('path')
   const webpack = require('webpack')
   
   module.exports = {
     entry: {
       // 最终打包生成的[name] --> jquery
       // ['jquery'] --> 要打包的库是jquery
       jquery: ['jquery'],
     },
     output: {
       filename: '[name].js',
       path: resolve(__dirname, 'dll'),
       library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
     },
     plugins: [
       // 打包生成一个 manifest.json --> 提供和jquery映射
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

   1）string单入口：打包形成一个chunk，输出一个bundle文件，此时chunk的名称默认是 main

   ```txt
   string --> './src/index.js'
   ```

   2）array多入口：所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件，只有在HMR功能中让html热更新生效

   ```txt
   array  --> ['./src/index.js', './src/add.js']
   ```

   3）oject多入口：有几个入口文件就形成几个chunk，输出几个bundle文件，此时chunk的名称是 key

   ```js
   {
     // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件
     index: ['./src/index.js', './src/count.js'], 
     // 形成一个chunk，输出一个bundle文件。
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
       // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
       publicPath: '/',
       chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
       // library: '[name]', // 整个库向外暴露的变量名
       // libraryTarget: 'window' // 变量名添加到哪个上 browser
       // libraryTarget: 'global' // 变量名添加到哪个上 node
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
         // loader的配置
         {
           test: /\.css$/,
           // 多个loader用use
           use: ['style-loader', 'css-loader'],
         },
         {
           test: /\.js$/,
           // 排除node_modules下的js文件
           exclude: /node_modules/,
           // 只检查 src 下的js文件
           include: resolve(__dirname, 'src'),
           // 优先执行
           enforce: 'pre',
           // 延后执行
           // enforce: 'post',
           // 单个loader用loader
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/[name].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
     plugins: [new HtmlWebpackPlugin()],
     mode: 'development',
     // 解析模块的规则
     resolve: {
       // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
       alias: {
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
     entry: './src/js/index.js',
     output: {
       filename: 'js/[name].js',
       path: resolve(__dirname, 'build'),
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
     plugins: [new HtmlWebpackPlugin()],
     mode: 'development',
     resolve: {
       alias: {
         $css: resolve(__dirname, 'src/css'),
       },
       extensions: ['.js', '.json', '.jsx', '.css'],
       modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
     },
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
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const TerserWebpackPlugin = require('terser-webpack-plugin')
   
   module.exports = {
     entry: './src/js/index.js',
     output: {
       filename: 'js/[name].[contenthash:10].js',
       path: resolve(__dirname, 'build'),
       chunkFilename: 'js/[name].[contenthash:10]_chunk.js',
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
     plugins: [new HtmlWebpackPlugin()],
     mode: 'production',
     resolve: {
       alias: {
         $css: resolve(__dirname, 'src/css'),
       },
       extensions: ['.js', '.json', '.jsx', '.css'],
       modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
     },
     optimization: {
       splitChunks: {
         chunks: 'all',
         // 默认值，可以不写~
         /* minSize: 30 * 1024, // 分割的chunk最小为30kb
         maxSiza: 0, // 最大没有限制
         minChunks: 1, // 要提取的chunk最少被引用1次
         maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
         maxInitialRequests: 3, // 入口js文件最大并行请求数量
         automaticNameDelimiter: '~', // 名称连接符
         name: true, // 可以使用命名规则
         cacheGroups: {
           // 分割chunk的组
           // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
           // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
           vendors: {
             test: /[\\/]node_modules[\\/]/,
             // 优先级
             priority: -10
           },
           default: {
             // 要提取的chunk最少被引用2次
             minChunks: 2,
             // 优先级
             priority: -20,
             // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
             reuseExistingChunk: true
           } 
         }*/
       },
       // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
       // 解决：修改a文件导致b文件的contenthash变化
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

