---
prev: /js/
next: /server/#第1章-ajax
---

# TypeScript

## 第1章 概述

### 1.1 TS简介

1. TypeScript是JavaScript的超集

2. 对JS进行了扩展，向JS中引入了类型的概念，并添加了许多新的特性

3. TS代码需要通过编译器编译为JS，然后再交由JS解析器执行

4. TS完全兼容JS，任何的JS代码都可以直接当成TS使用

5. 相较于JS而言，TS拥有了静态类型，更加严格的语法，更强大的功能；

   1）TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；

   2）TS代码可以编译为任意版本的JS代码，可有效解决不同JS运行环境的兼容问题；

   3）同样的功能，TS的代码量要大于JS，但TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS

### 1.2 开发环境搭建

1. 下载并安装Node.js：[https://nodejs.org/en/](https://nodejs.org/en/)

2. npm全局安装typescript

   ```bash
   npm i -g typescript
   ```

3. 可使用`tsc`对TS文件进行编译，转换为JS文件

   ```bash
   tsc xxx.ts
   ```

------

## 第2章 基本类型

### 2.1 声明变量

1. 变量类型：

   |  类型   |       例子        |                  描述                   |
   | :-----: | :---------------: | :-------------------------------------: |
   | number  |    1, -33, 2.5    |                任意数字                 |
   | boolean |    true、false    |            布尔值true或false            |
   | string  | 'hi', "hi", `hi`  |               任意字符串                |
   | 字面量  |      其本身       |      限制变量的值就是该字面量的值       |
   |   any   |         *         |                任意类型                 |
   | unknown |         *         |              类型安全的any              |
   |  void   | 空值（undefined） |          没有值（或undefined）          |
   |  never  |      没有值       | 不能是任何值，用于报错`throw new Error` |
   | object  |  {name:'孙悟空'}  |              任意的JS对象               |
   |  array  |      [1,2,3]      |               任意JS数组                |
   |  tuple  |       [4,5]       |     元素，TS新增类型，固定长度数组      |
   |  enum   |    enum{A, B}     |           枚举，TS中新增类型            |

2. 类型声明：类型声明给变量设置了类型，使得变量只能存储某种类型的值

   1）通过类型声明可以指定TS中变量（参数、形参）的类型

   2）指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

   3）语法：

   ```typescript
   let 变量: 类型
   
   let 变量: 类型 = 值
   
   function fn(参数: 类型, 参数: 类型): 类型{
       ...
   }
   ```

   4）案例：

   ```typescript
   // 声明一个变量a，同时指定它的类型为number，在以后的使用过程中a的值只能是数字
   let a: number
   a = 10
   a = 'hello' // 此行代码会报错，因为变量a的类型是number，不能赋值字符串
   
   // 声明完变量直接进行赋值
   let b: string = 'hello'
   
   // JS中的函数是不考虑参数的类型和个数的，容易出现字符串拼接的结果，而TS避免了这一点
   function sum(a: number, b: number): number {
     return a + b
   }
   let result = sum(123, 456)
   ```

3. 自动类型判断：

   1）TS拥有自动的类型判断机制

   2）当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型，此时可以省略掉类型声明

   ```typescript
   // 声明完变量直接进行赋值
   let c: boolean = false
   
   // 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
   let c = false
   c = true
   ```

4. 联合类型：可以使用 `|` 来连接多个类型

   ```typescript
   let b: 'male' | 'female'
   b = 'male'
   b = 'female'
   // b = 'hello' // 报错
   
   let c: boolean | string | number
   c = true
   c = 'hello'
   c = 123
   ```

5. 类型断言：用来告诉解析器变量的实际类型（就不报错了）

   1）语法1：`变量 as 类型`

   2）语法2：`<类型>变量`

   ```typescript
   let e: unknown
   e = 10
   e = 'hello'
   e = true
   
   let s: string
   s = e as string
   s = <string>e
   ```

6. `&`：要同时满足条件

   ```typescript
   let j: { name: string } & { age: number }
   j = {name: '孙悟空', age: 18}
   ```

7. 类型的别名

   ```typescript
   type myType = 1 | 2 | 3 | 4 | 5
   let k: myType
   let l: myType
   let m: myType
   
   k = 2
   // l = 6 // 报错
   ```

------

### 2.2 Number

1. 整数

   ```typescript
   let decimal: number = 6
   ```

2. 二进制：数字前加`0b`

   ```typescript
   let binary: number = 0b1010
   ```

3. 八进制（0-7）：数字前加`0o`

   ```typescript
   let octal: number = 0o744
   ```

4. 十六进制（0-9、a-f）：数字前加`0x`

   ```typescript
   let hex: number = 0xf00d
   ```

5. BigInt：大整数，整数后加`n`，用于进行更大的数值运算

   ```typescript
   let big: bigint = 100n
   ```

------

### 2.3 Boolean

1. 布尔值：ture或false

   ```typescript
   let isDone: boolean = false
   ```

------

### 2.4 String

1. 字符串：单引号、双引号、模板字符串

   ```typescript
   let color: string = "blue";
   color = 'red';
   
   let fullName: string = `Bob Bobbington`
   let age: number = 37
   let sentence: string = `Hello, my name is ${fullName}.
   
   I'll be ${age + 1} years old next month.`
   ```

------

### 2.5 字面量

1. 可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

   ```typescript
   let color: 'red' | 'blue' | 'black'
   let num: 1 | 2 | 3 | 4 | 5
   ```

------

### 2.6 Any

> 使用TS时，不建议使用any类型，因为失去了严谨性

1. `any`：表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测

   ```typescript
   let d: any = 4
   d = 'hello'
   d = true
   ```

2. 隐式的any：声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any

   ```typescript
   let d
   d = 10
   d = 'hello'
   d = true
   ```

3. any类型的变量可以赋值给任意类型变量

   ```typescript
   let d: any = 4
   let s: string
   s = d

------

### 2.7 Unknown

1. `unknown`：表示未知类型的值，实际上就是一个类型安全的any

   ```typescript
   let notSure: unknown = 4
   notSure = 'hello'
   
   let e: unknown
   e = 10
   e = 'hello'
   e = true
   ```

2. unknown类型的变量，不能直接赋值给其他变量，如果必须要赋值，要配合if判断类型

   ```typescript
   let e: unknown
   e = 10
   e = 'hello'
   e = true
   
   let s: string
   if (typeof e === 'string') {
     s = e
   }
   ```

------

### 2.8 Void

1. `void`：用来表示空

   ```typescript
   let unusable: void = undefined
   
   // 以函数为例，就表示没有返回值的函数
   function fn(): void {}
   ```

------

### 2.9 Never

1. `never`：表示永远不会返回结果，常与`throw new Error`报错配合使用

   ```typescript
   function fn(): never {
     throw new Error('报错了！')
   }
   ```

------

### 2.10 Object

1. `object`：表示一个JS对象（不实用，因为在JS中一切皆对象）

   ```typescript
   let a: object
   a = {}
   a = function () {}	// 函数也是对象
   ```

2. `{}`：用来指定对象中可以包含哪些属性

   1）语法：`{属性名:属性值, 属性名:属性值}`

   2）在属性名后边加上`?`，表示属性是可选的

   ```typescript
   let b: { name: string; age?: number }
   b = { name: '孙悟空', age: 18 }
   ```

   3）`[propName: string]: any`：表示任意类型的属性

   ```typescript
   let c: { name: string; [propName: string]: any }
   c = { name: '猪八戒', age: 18, gender: '男' }
   ```

3. 设置函数结构的类型声明：`(形参:类型, 形参:类型 ...) => 返回值`

   ```typescript
   let d: (a: number, b: number) => number
   // 这样设置会报错，因为参数已经设置为number，不能再设置为string了
   d = function (n1: string, n2: string): number{
       return 10;
   }
   ```

------

### 2.11 Array

1. 数组的类型声明：

   1）语法1：`类型[]`

   2）语法2：`Array<类型>`

2. 案例：

   ```typescript
   // string[] 表示字符串数组
   let e: string[]
   e = ['a', 'b', 'c']
   
   // number[] 表示数值数值
   let f: number[]
   
   let g: Array<number>
   g = [1, 2, 3]
   ```

------

### 2.12 Tuple

1. 元组：即固定长度的数组

2. 语法：`[类型, 类型, 类型]`

   ```typescript
   let h: [string, number]
   h = ['hello', 123]
   ```

------

### 2.13 Enum

1. 枚举：可以将类型单独提取出来定义，简化代码

   ```typescript
   enum Color {
     Red,
     Green,
     Blue,
   }
   let c: Color = Color.Green
   
   enum Color {
     Red = 1,
     Green,
     Blue,
   }
   let c: Color = Color.Green
   
   enum Color {
     Red = 1,
     Green = 2,
     Blue = 4,
   }
   let c: Color = Color.Green
   ```

2. 案例：在对象中使用枚举

   ```typescript
   enum Gender {
     Male,
     Female,
   }
   
   let i: { name: string; gender: Gender }
   i = {
     name: '孙悟空',
     gender: Gender.Male, // 'male'
   }
   
   console.log(i.gender === Gender.Male) // True
   ```

------

## 第3章 编译选项

### 3.1 自动编译文件

1. 使用 `-w` 指令：TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译

   ```bash
   tsc xxx.ts -w
   ```

------

### 3.2 自动编译项目

1. 项目根目录下创建一个ts的配置文件：`tsconfig.json`
2. `tsconfig.json`是一个JSON文件，添加配置文件后，只需 tsc 命令即可完成对整个项目的编译

------

### 3.3 tsconfig

#### 3.3.1 include

> 定义希望被编译文件所在的目录

1. 默认值：`["**/*"]`，`**`表示任意目录，`*`表示任意文件

2. 示例：所有src目录和tests目录下的文件都会被编译

   ```json
   "include":["./src/**/*", "./tests/**/*"]
   ```

------

#### 3.3.2 exclude

> 定义需要排除在外的目录

1. 默认值：`["node_modules", "bower_components", "jspm_packages"]`

2. 示例：src下hello目录下的文件都不会被编译

   ```json
   "exclude": ["./src/hello/**/*"]
   ```

------

#### 3.3.3 extends

> 定义被继承的配置文件

1. 示例：当前配置文件中会自动包含config目录下base.json中的所有配置信息

   ```json
   "extends": "./configs/base"
   ```

------

#### 3.3.4 files

> 指定被编译文件的列表，只有需要编译的文件少时才会用到

1. 示例：列表中的文件都会被TS编译器所编译

   ```json
   "files": [
       "core.ts",
       "sys.ts",
       "types.ts",
       "scanner.ts",
       "parser.ts",
       "utilities.ts",
       "binder.ts",
       "checker.ts",
       "tsc.ts"
     ]
   ```

------

#### 3.3.5 compilerOptions

> 在`compilerOptions`中包含多个子选项，用来完成对编译的配置

##### 3.3.5.1 项目选项

1. `target`：设置ts代码编译的目标版本

   1）可选值：ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

   2）示例：编写的ts代码将会被编译为ES6版本的js代码

   ```json
   "compilerOptions": {
       "target": "ES6"
   }
   ```

2. `lib`：指定代码运行时所包含的库（宿主环境），一般无需改动

   1）可选值：ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM......

   ```txt
   'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable','es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2020.bigint', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'
   ```

   2）示例：

   ```json
   "compilerOptions": {
       "lib": ["ES6", "DOM"]
   }
   ```

3. `module`：设置编译后代码使用的模块化规范

   1）可选值：CommonJS、UMD、AMD、System、ES2020、ESNext、None

   2）示例：

   ```json
   "compilerOptions": {
       "module": "CommonJS"
   }
   ```

4. `outDir`：编译后文件的所在目录

   1）默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

   2）示例：设置后编译后的js文件将会生成到dist目录

   ```json
   "compilerOptions": {
       "outDir": "./dist"
   }
   ```

5. `outFile`：将所有的文件编译为一个js文件，一般情况下打包工具会完成此项工作，无需自己定义

   1）将所有编写在全局作用域中的代码合并为一个js文件，如果使用模块，`module`必须指定为`AMD`或`System`

   2）示例：

   ```json
   "compilerOptions": {
       "outFile": "./dist/app.js"
   }
   ```

6. `rootDir`：指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，rootDir可以手动指定根目录

   ```json
   "compilerOptions": {
       "rootDir": "./src"
   }
   ```

7. `allowJs`：是否对js文件编译，默认为false

8. `checkJs`：是否对js文件进行检查，默认为false

9. `removeComments`：是否删除注释，默认为false

10. `noEmit`：不对代码进行编译，默认为false

11. `sourceMap`：是否生成sourceMap，默认为false

##### 3.3.5.2 严格检查

1. `strict`：启用所有的严格检查，默认为true

2. `alwaysStrict`：总是以严格模式对代码进行编译，默认为false

3. `noImplicitAny`：禁止隐式的any类型

4. `noImplicitThis`：禁止类型不明确的this

5. `strictBindCallApply`：严格检查bind、call、apply的参数列表

6. `strictFunctionTypes`：严格检查函数的类型

7. `strictNullChecks`：严格的空值检查

   ```typescript
   // 开启严格的空值检查后，如果box1不存在，则报错
   let box1 = document.getElementById('box1')
   
   // 解决方案1
   if (box1 !== null) {
     box1.addEventListener('click', function () {
       alert('hello')
     })
   }
   
   // 解决方案2
   box1?.addEventListener('click', function () {
     alert('hello')
   })
   
   // 解决方案3：加感叹号!
   let box1 = document.getElementById('box1')!
   ```

8. `strictPropertyInitialization`：严格检查属性是否初始化

##### 3.3.5.3 额外检查

1. `noFallthroughCasesInSwitch`：检查switch语句包含正确的break
2. `noImplicitReturns`：检查函数没有隐式的返回值
3. `noUnusedLocals`：检查未使用的局部变量
4. `noUnusedParameters`：检查未使用的参数

##### 3.3.5.4 高级

1. `allowUnreachableCode`：检查不可达代码

   1）true：忽略不可达代码

   2）false：不可达代码将引起错误

2. `noEmitOnError`：有错误的情况下不进行编译，默认为false

------

## 第4章 项目打包

> 结合Webpack、Babel使用TS

### 4.1 Webpack

1. 初始化项目：创建package.json文件

   ```bash
   npm init -y
   ```

2. 下载构建工具：

   ```bash
   npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader html-webpack-plugin clean-webpack-plugin
   ```

   1）`webpack`：构建工具webpack

   2）`webpack-cli`：webpack的命令行工具

   3）`webpack-dev-server`：webpack的开发服务器

   4）`typescript`：ts编译器

   5）`ts-loader`：ts加载器，用于在webpack中编译ts文件

   6）`html-webpack-plugin`：webpack中html插件，用来自动创建html文件

   7）`clean-webpack-plugin`：webpack中的清除插件，每次构建都会先清除目录

3. 根目录下创建webpack的配置文件：`webpack.config.js`

   1）注意：loader执行顺序是从下至上

   ```js
   // 引入一个包
   const path = require('path')
   // 引入html插件
   const HTMLWebpackPlugin = require('html-webpack-plugin')
   // 引入clean插件
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   
   // webpack中的所有的配置信息都应该写在module.exports中
   module.exports = {
     optimization: {
       minimize: false, // 关闭代码压缩，可选
     },
     // 指定入口文件
     entry: './src/index.ts',
     // 指定打包文件所在目录
     output: {
       // 指定打包文件的目录
       path: path.resolve(__dirname, 'dist'),
       // 打包后文件的文件
       filename: 'bundle.js',
       // 告诉webpack不使用箭头
       environment: {
         arrowFunction: false, // 关闭webpack的箭头函数，可选（为了兼容IE）
       },
     },
     // 指定webpack打包时要使用模块
     module: {
       // 指定要加载的规则
       rules: [
         {
           // test指定的是规则生效的文件
           test: /\.ts$/,
           // 要使用的loader
           use: {
             loader: 'ts-loader',
           },
           // 要排除的文件
           exclude: /node_modules/,
         },
       ],
     },
     // 配置Webpack插件
     plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
         // 自定义标题
         // title: '我的网站',
         
         // 自定义模板（在指定目录下创建模板html文件）
         template: './src/index.html',
       }),
     ],
     // 用来设置引用模块的文件类型
     resolve: {
       extensions: ['.ts', '.js'],
     },
   }
   ```

4. 根目录下创建`tsconfig.json`，自定义配置

   ```json
   {
     "compilerOptions": {
       "target": "ES2015",
       "module": "ES2015",
       "strict": true
     }
   }
   ```

5. 修改`package.json`：添加如下配置

   ```json
   {
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack",
       "start": "webpack serve --open chrome.exe"
     }
   }
   ```

6. 在src下创建ts文件，编译项目

   1）对代码进行编译

   ```bash
   npm run build
   ```

   2）启动开发服务器

   ```bash
   npm start
   ```

------

### 4.2 Babel

> 使用TS编译后的文件将会再次被babel处理，代码可直接被浏览器使用，可在配置选项的`targets`中指定要兼容的浏览器版本

1. 安装依赖包：

   ```bash
   npm i -D @babel/core @babel/preset-env babel-loader core-js
   ```

   1）`@babel/core`：babel的核心工具

   2）`@babel/preset-env`：babel的预定义环境

   3）`@babel-loader`：babel在webpack中的加载器

   4）`core-js`：core-js用来使老版本的浏览器支持新版ES语法

2. 修改`webpack.config.js`

   ```js
   ......
   // 指定webpack打包时要使用模块
   module: {
     // 指定要加载的规则
     rules: [
       {
         // test指定的是规则生效的文件
         test: /\.ts$/,
         // 要使用的loader
         use: [
           // 配置babel
           {
             // 指定babel加载器
             loader: 'babel-loader',
             // 设置babel
             options: {
               // 设置预定义的环境
               presets: [
                 [
                   // 指定环境的插件
                   '@babel/preset-env',
                   // 配置信息
                   {
                     // 要兼容的目标浏览器
                     targets: {
                       chrome: '58',
                       ie: '11',
                     },
                     // 指定corejs的版本
                     corejs: '3',
                     // 使用corejs的方式 "usage" 表示按需加载
                     useBuiltIns: 'usage',
                   },
                 ],
               ],
             },
           },
           // 指定ts加载器
           'ts-loader',
         ],
         // 要排除的文件
         exclude: /node-modules/,
       },
     ],
   },
   ......
   ```

------

## 第5章 类 Class

### 5.1 基本用法

1. 定义：对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装

2. 属性：默认情况下，对象的属性是可以任意的修改的，为了确保数据的安全性，在TS中可以对属性的权限进行设置

3. `this`：表示当前对象

4. 实例属性：在类中直接定义的属性，需要通过对象实例访问，而无法通过类访问

   ```typescript
   class Person {
     name: string
     age: number
   
     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }
   
     sayHello() {
       console.log(`大家好，我是${this.name}`)
     }
   }
   const p = new Person('孙悟空', 18)
   // 需要通过对象实例调用实例属性/方法
   p.sayHello()
   console.log(p.name)
   ```

5. 只读属性：在声明属性时添加一个`readonly`，则属性便无法修改

   ```typescript
   class Person {
     // 定义实例属性
     name: string = '孙悟空'
     // 定义只读实例属性
     readonly sex: string = '男'
   }
   
   const p = new Person()
   
   // 实例属性可以通过对象实例修改
   p.name = '猪八戒'
   console.log(p.name)
   
   // 只读实例属性不可修改，编译器报错
   // p.sex = '女'
   ```

------

### 5.2 静态属性

1. 定义：`static`静态属性（又称类属性），只能通过类访问，而不能通过实例访问

   ```typescript
   class Tools {
     static PI = 3.1415926
   
     static sum(num1: number, num2: number) {
       return num1 + num2
     }
   }
   
   console.log(Tools.PI)
   console.log(Tools.sum(123, 456))
   
   const t = new Tools()
   console.log(t.PI)	// undefined（编译器提示报错）
   ```

2. 静态只读属性：`static`必须放在`readonly`之前

   ```typescript
   class Person {
     // 定义静态属性
     static age: number = 18
     // 定义静态只读属性（static要放在前面）
     static readonly height: number = 180
   }
   
   const p = new Person()
   
   // 静态属性只能通过类访问或修改，对象实例无法访问
   Person.age = 88
   console.log(Person.age) // 88
   // console.log(p.age) // 报错
   
   // 只读静态属性不能更改
   // Person.height = 88 // 报错
   ```

------

### 5.3 修饰符

1. `public`（默认值）：可以在类、子类和对象中修改

   1）正常写法：在构造函数外部声明变量类型，并在构造函数内部用`this`指定属性

   ```typescript
   class Person {
     public name: string // 写或什么都不写都是public
     public age: number
   
     constructor(name: string, age: number) {
       this.name = name // 可以在类中修改
       this.age = age
     }
   
     sayHello() {
       console.log(`大家好，我是${this.name}`)
     }
   }
   
   class Employee extends Person {
     constructor(name: string, age: number) {
       super(name, age)
       this.name = name //子类中可以修改
     }
   }
   
   const p = new Person('孙悟空', 18)
   p.name = '猪八戒' // 可以通过对象修改
   
   ```

   2）简写：直接在构造函数传参处使用`public`修饰符声明变量类型，无需再内部用`this`指定属性

   ```typescript
   class Person {
     constructor(public name: string, public age: number) {}
     sayHello() {
       console.log(`大家好，我是${this.name}`)
     }
   }
   const p = new Person('孙悟空', 18)
   p.sayHello()
   console.log(p.name)
   ```

2. `protected`：可以在类、子类中修改

   ```typescript
   class Person {
     protected name: string
     protected age: number
   
     constructor(name: string, age: number) {
       this.name = name // 可以修改
       this.age = age
     }
   
     sayHello() {
       console.log(`大家好，我是${this.name}`)
     }
   }
   
   class Employee extends Person {
     constructor(name: string, age: number) {
       super(name, age)
       this.name = name // 子类中可以修改
     }
   }
   
   const p = new Person('孙悟空', 18)
   p.name = '猪八戒' // 不能修改
   ```

3. `private`：只可以在类中修改（如果想修改，用`getter`、`setter`）

   ```typescript
   class Person {
     private name: string
     private age: number
   
     constructor(name: string, age: number) {
       this.name = name // 可以修改
       this.age = age
     }
   
     sayHello() {
       console.log(`大家好，我是${this.name}`)
     }
   }
   
   class Employee extends Person {
     constructor(name: string, age: number) {
       super(name, age)
       this.name = name // 子类中不能修改，报错
     }
   }
   
   const p = new Person('孙悟空', 18)
   p.name = '猪八戒' // 不能修改，报错
   ```

------

### 5.4 属性存取器

1. 定义：在类中定义一组读取（`getter`）、设置（`setter`）属性的方法

2. 应用：在类中设置为`private`的属性无法直接在对象中修改，通过设置属性存取器，可以实现在对象中修改

   ```typescript
   class Person {
     private _name: string
   
     constructor(name: string, age: number) {
       this._name = name
       this._age = age
     }
   
     get name() {
       return this._name
     }
   
     set name(name: string) {
       this._name = name
     }
     
     get age() {
       return this._age
     }
     
     set age(value: number) {
       if (value >= 0) {
         this._age = value
       }
     }
   }
   
   const per = new Person('孙悟空', 18)
   console.log(per.name) // 通过getter读取name属性
   per.name = '猪八戒' 	// 通过setter修改name属性
   per.age = -33 		  // 修改age时不能为负数，修改失败，age依然为18
   ```

------

### 5.5 继承

1. 作用：通过继承可以将其他类中的属性和方法引入到当前类中，可以在不修改类的情况下完成对类的扩展

   ```typescript
   class Animal {
     name: string
     age: number
   
     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }
   }
   
   class Dog extends Animal {
     bark() {
       console.log(`${this.name}在汪汪叫！`)
     }
   }
   
   const dog = new Dog('旺财', 4)
   dog.bark()
   ```

2. 重写：发生继承时，子类中的方法会替换掉父类中的同名方法

   ```typescript
   class Animal {
     name: string
     age: number
   
     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }
   
     run() {
       console.log(`父类中的run方法！`)
     }
   }
   
   class Dog extends Animal {
     bark() {
       console.log(`${this.name}在汪汪叫！`)
     }
   
     run() {
       console.log(`子类中的run方法，会重写父类中的run方法！`)
     }
   }
   
   const dog = new Dog('旺财', 4)
   dog.bark()
   ```

3. `super`：如果子类中写了constructor，必须在子类this之前调用`super`

   ```typescript
   class Animal {
     name: string
     constructor(name: string) {
       this.name = name
     }
     sayHello() {
       console.log('动物在叫~')
     }
   }
   
   class Dog extends Animal {
     age: number
     constructor(name: string, age: number) {
       // 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
       super(name)
       this.age = age
     }
     sayHello() {
       // 可以用super直接调用父类中的函数
       super.sayHello()
       
       // 也可以继续改造或重写该同名函数
       console.log('汪汪汪汪！')
     }
   }
   
   const dog = new Dog('旺财', 3)
   dog.sayHello() // 动物在叫~	  汪汪汪汪！
   ```

------

### 5.6 抽象类

1. 抽象类：专门用来被其他类所继承的类，不能用来创建实例对象

2. 抽象方法：使用`abstract`开头的方法，抽象方法没有方法体，只能定义在抽象类中，继承抽象类时抽象方法必须要实现

   ```typescript
   // 抽象类不能用来创建对象，专门用来被继承的类
   abstract class Animal {
     name: string
     constructor(name: string) {
       this.name = name
     }
     // 抽象方法：abstract开头，没有方法体
     // 只能定义在抽象类中，子类必须对抽象方法进行重写
     abstract sayHello(): void
   }
   
   class Dog extends Animal {
     // 子类必须对抽象方法进行重写
     sayHello() {
       console.log('汪汪汪汪！')
     }
   }
   
   const dog = new Dog('旺财')
   dog.sayHello()
   ```

------

## 第6章 接口 Interface

1. 定义：接口类似于抽象类，但接口中的所有方法和属性都是没有实值的，即接口中的所有方法都是抽象方法

2. 作用：用来定义一个类结构，定义一个类中应该包含哪些属性和方法，也可以当成类型声明去使用

   1）案例1：使用接口定义类结构

   ```typescript
   interface myInterface {
     name: string
     age: number
   }
   // 可以重复声明，会合并一起
   interface myInterface {
     gender: string
   }
   const obj: myInterface = {
     name: 'sss',
     age: 111,
     gender: '男',
   }
   ```

   2）案例2：使用接口定义函数结构

   ```typescript
   interface Person {
     name: string
     sayHello(): void
   }
   
   function fn(per: Person) {
     per.sayHello()
   }
   
   fn({
     name: '孙悟空',
     sayHello() {
       console.log(`Hello, 我是${this.name}`)
     },
   })
   ```

3. `implements`：定义类时，可以使类去实现一个接口（使类满足接口的要求）

   ```typescript
   interface Person {
     name: string
     sayHello(): void
   }
   
   // 方法1：使用public修饰符（推荐）
   class Student implements Person {
     constructor(public name: string) {}
     sayHello() {
       console.log('大家好，我是' + this.name)
     }
   }
   
   // 方法2：传统方法
   /* class Student implements Person {
     name: string
     constructor(name: string) {
       this.name = name
     }
     sayHello() {
       console.log('大家好，我是' + this.name)
     }
   } */
   
   const s = new Student('小明')
   s.sayHello()
   ```

------

## 第7章 泛型 Generic

> 泛型适用于定义一个函数或类时，无法确定其中要使用的具体类型（返回值、参数、属性的类型）

### 7.1 函数使用泛型

1. 定义一个函数，无法确定参数与返回值的类型，但能确定参数与返回值是相同类型

   1）any：不合适，因为TS会关闭类型检查，也无法确保参数与返回值是相同类型

   ```typescript
   function test(arg: any): any {
     return arg
   }
   ```

   2）泛型：此处将泛型命名为`<T>`（名称是自定义的）

   ```typescript
   function test<T>(arg: T): T {
     return arg
   }
   ```

2. 使用利用泛型定义的函数：

   1）方式一：直接使用，可以直接传递参数使用，类型会由TS自动推断出来（无法自动推断时用方法二）

   ```typescript
   test(10)
   ```

   2）方式二：指定类型，可以在函数后手动指定泛型

   ```typescript
   test<number>(10)
   ```

3. 可同时指定多个泛型，泛型间使用逗号隔开：

   ```typescript
   function test<T, K>(a: T, b: K): K {
     console.log(a)
     return b
   }
   
   test<number, string>(10, 'hello')
   ```

4. 对泛型的范围进行约束：`T extends MyInter`表示泛型T必须是MyInter的子类，不一定非要使用接口，类和抽象类同样适用

   ```typescript
   interface MyInter {
     length: number
   }
   
   function test<T extends MyInter>(arg: T): number {
     return arg.length
   }
   
   test('123') // 正常输出
   test(123)	// 报错，由于123是数值型，没有length属性，不符合MyInter接口中的规定
   ```

### 7.2 类使用泛型

1. 在类中使用泛型：

   ```typescript
   class MyClass<T> {
     prop: T
   
     constructor(prop: T) {
       this.prop = prop
     }
   }
   
   const mc = new MyClass<string>('孙悟空')
   ```

------

## 第8章 贪食蛇项目

<img :src="$withBase('/imgs/basic/贪食蛇项目设计.png')" alt="贪食蛇项目设计">

### 8.1 配置文件

1. 初始化项目

   ```bash
   npm init -y
   ```

2. 下载构建工具

   ```bash
   npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader html-webpack-plugin clean-webpack-plugin @babel/core @babel/preset-env babel-loader core-js
   ```

3. 下载css相关依赖包

   ```bash
   npm i -D less-loader css-loader style-loader postcss postcss-loader post-preset-env
   ```

4. 配置`tsconfig.json`

   ```json
   {
     "compilerOptions": {
       "module": "ES2015",
       "target": "ES2015",
       "strict": true,
       "noEmitOnError": true,
       // 2022-06-08新增配置
       "moduleResolution": "node",
       "useUnknownInCatchVariables": false
     }
   }
   
   ```

5. 配置`webpack.config.js`

   ```js
   // 引入一个包
   const path = require('path')
   // 引入html插件
   const HTMLWebpackPlugin = require('html-webpack-plugin')
   // 引入clean插件
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   
   // webpack中的所有的配置信息都应该写在module.exports中
   module.exports = {
     // 指定入口文件
     entry: './src/index.ts',
   
     // 指定打包文件所在目录
     output: {
       // 指定打包文件的目录
       path: path.resolve(__dirname, 'dist'),
       // 打包后文件的文件
       filename: 'bundle.js',
   
       // 告诉webpack不使用箭头、不使用const（为了兼容IE）
       environment: {
         arrowFunction: false,
         const: false,
       },
     },
   
     // 指定webpack打包时要使用模块
     module: {
       // 指定要加载的规则
       rules: [
         {
           // test指定的是规则生效的文件
           test: /\.ts$/,
           // 要使用的loader
           use: [
             // 配置babel
             {
               // 指定加载器
               loader: 'babel-loader',
               // 设置babel
               options: {
                 // 设置预定义的环境
                 presets: [
                   [
                     // 指定环境的插件
                     '@babel/preset-env',
                     // 配置信息
                     {
                       // 要兼容的目标浏览器
                       targets: {
                         chrome: '58',
                         ie: '11',
                       },
                       // 指定corejs的版本
                       corejs: '3',
                       // 使用corejs的方式 "usage" 表示按需加载
                       useBuiltIns: 'usage',
                     },
                   ],
                 ],
               },
             },
             'ts-loader',
           ],
           // 要排除的文件
           exclude: /node-modules/,
         },
   
         // 设置less文件的处理
         {
           test: /\.less$/,
           use: [
             'style-loader',
             'css-loader',
   
             // 引入postcss
             {
               loader: 'postcss-loader',
               options: {
                 postcssOptions: {
                   plugins: [
                     [
                       'postcss-preset-env',
                       {
                         browsers: 'last 2 versions',	// 兼容最新2个版本的浏览器
                       },
                     ],
                   ],
                 },
               },
             },
             'less-loader',
           ],
         },
       ],
     },
   
     // 配置Webpack插件
     plugins: [
       new CleanWebpackPlugin(),
       new HTMLWebpackPlugin({
         // title: "这是一个自定义的title"
         template: './src/index.html',
       }),
     ],
   
     // 用来设置引用模块
     resolve: {
       extensions: ['.ts', '.js'],
     },
   }
   ```

------

### 8.2 基本结构

1. HTML结构：index.html

   ```html
   <!DOCTYPE html>
   <html lang="zh">
     <head>
       <meta charset="UTF-8" />
       <title>贪食蛇</title>
     </head>
     <body>
       <!--创建游戏的主容器-->
       <div id="main">
         <!--设置游戏的舞台-->
         <div id="stage">
           <!--设置蛇-->
           <div id="snake">
             <!--snake内部的div 表示蛇的各部分-->
             <div></div>
           </div>
   
           <!--设置食物-->
           <div id="food">
             <!--添加四个小div 来设置食物的样式-->
             <div></div>
             <div></div>
             <div></div>
             <div></div>
           </div>
         </div>
   
         <!--设置游戏的积分牌-->
         <div id="score-panel">
           <div>SCORE:<span id="score">0</span></div>
           <div>level:<span id="level">1</span></div>
         </div>
       </div>
     </body>
   </html>
   ```

2. 样式：index.less

   ```less
   // 设置变量
   @bg-color: #b7d4a8;
   
   //清除默认样式
   * {
     margin: 0;
     padding: 0;
     // 改变盒子模型的计算方式
     box-sizing: border-box;
   }
   
   body {
     font: bold 20px 'Courier';
   }
   
   //设置主窗口的样式
   #main {
     width: 360px;
     height: 420px;
     // 设置背景颜色
     background-color: @bg-color;
     // 设置居中
     margin: 100px auto;
     border: 10px solid black;
     // 设置圆角
     border-radius: 40px;
   
     // 开启弹性盒模型
     display: flex;
     // 设置主轴的方向
     flex-flow: column;
     // 设置侧轴的对齐方式
     align-items: center;
     // 设置主轴的对齐方式
     justify-content: space-around;
   
     // 游戏舞台
     #stage {
       width: 304px;
       height: 304px;
       border: 2px solid black;
       // 开启相对定位
       position: relative;
   
       // 设置蛇的样式
       #snake {
         // &代表父类本身
         & > div {
           width: 10px;
           height: 10px;
           background-color: #000;
           border: 1px solid @bg-color;
           // 开启绝对定位
           position: absolute;
         }
       }
   
       // 设置食物
       #food {
         width: 10px;
         height: 10px;
         position: absolute;
         left: 40px;
         top: 100px;
   
         // 开启弹性盒
         display: flex;
         // 设置横轴为主轴，wrap表示会自动换行
         flex-flow: row wrap;
   
         // 设置主轴和侧轴的空白空间分配到元素之间
         justify-content: space-between;
         align-content: space-between;
   
         & > div {
           width: 4px;
           height: 4px;
           background-color: black;
   
           // 使四个div旋转45度
           transform: rotate(45deg);
         }
       }
     }
   
     // 记分牌
     #score-panel {
       width: 300px;
       display: flex;
       // 设置主轴的对齐方式
       justify-content: space-between;
     }
   }
   ```

------

### 8.3 脚本文件

#### 8.3.1 Food

> 定义食物Food，贪食蛇吃掉后会随机出现在屏幕的其他位置

1. 功能：

   1）定义食物对应的HTML元素：`element: HTMLElement`

   2）定义获取食物X、Y坐标的方法：`get X()`、`get Y()`

   3）修改食物位置：`change()`

   4）导出模块：`export default Food`

2. 代码：

   ```typescript
   // 定义食物类Food
   class Food {
     // 定义一个属性表示食物所对应的元素
     element: HTMLElement
   
     constructor() {
       // 获取页面中的food元素并将其赋值给element（叹号表示该元素不会为空值）
       this.element = document.getElementById('food')!
     }
   
     // 定义一个获取食物X轴坐标的方法
     get X() {
       return this.element.offsetLeft
     }
   
     // 定义一个获取食物Y轴坐标的方法
     get Y() {
       return this.element.offsetTop
     }
   
     // 修改食物的位置
     change() {
       // 生成一个随机的位置
       // 食物的位置最小是0 最大是290
       // 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须是整10
   
       let left = Math.round(Math.random() * 29) * 10
       let top = Math.round(Math.random() * 29) * 10
   
       this.element.style.left = left + 'px'
       this.element.style.top = top + 'px'
     }
   }
   
   export default Food
   
   // 测试代码
   // const food =  new Food();
   // console.log(food.X, food.Y);
   // food.change();
   // console.log(food.X, food.Y);
   ```

------

#### 8.3.2 ScorePanel

> 定义记分牌ScorePanel，用来加分和升级

1. 功能：

   1）定义用来记录分数和等级的变量：`score=0`、`level=1`

   2）定义分数和等级元素：`scoreEle: HTMLElement`、`levelEle: HTMLElement`

   3）定义限制等级的变量：`maxLevel: number`

   4）定义升级分数门槛的变量：`upScore: number`

   5）定义加分方法：`addScore()`

   6）定义提升等级方法：`levelUp()`

   7）导出模块：`export default ScorePanel`

2. 代码：

   ```typescript
   // 定义表示记分牌的类
   class ScorePanel {
     // score和level用来记录分数和等级
     score = 0
     level = 1
   
     // 分数和等级所在的元素，在构造函数中进行初始化
     scoreEle: HTMLElement
     levelEle: HTMLElement
   
     // 设置一个变量限制等级
     maxLevel: number
     // 设置一个变量表示多少分时升级
     upScore: number
   
     constructor(maxLevel: number = 10, upScore: number = 10) {
       this.scoreEle = document.getElementById('score')!
       this.levelEle = document.getElementById('level')!
       this.maxLevel = maxLevel
       this.upScore = upScore
     }
   
     // 设置一个加分的方法
     addScore() {
       // 使分数自增（并转为字符串）
       this.scoreEle.innerHTML = ++this.score + ''
       // 判断分数是多少
       if (this.score % this.upScore === 0) {
         this.levelUp()
       }
     }
   
     // 提升等级的方法
     levelUp() {
       if (this.level < this.maxLevel) {
         this.levelEle.innerHTML = ++this.level + ''
       }
     }
   }
   
   export default ScorePanel
   
   // 测试代码
   // const scorePanel = new ScorePanel(100, 2);
   // for(let i=0; i<200; i++){
   //     scorePanel.addScore();
   // }
   ```

------

#### 8.3.3 Snack

> 定义贪食蛇Snack

1. 功能：

   1）定义蛇头元素：`head: HTMLElement`

   2）定义蛇身元素（含蛇头）：`bodies: HTMLCollection`

   3）获取蛇的容器：`element: HTMLElement`

   4）获取蛇头坐标X、Y：`get X()`、`get Y()`

   5）设置蛇头的坐标：`set X(value)`、`set Y(value)`

   6）定义增加蛇身长度方法：`addBody()`

   7）定义蛇身移动方法：`moveBody()`

   8）定义检查蛇身是否撞到身体的方法：`checkHeadBody()`

   9）导出模块：`export default Snake`

2. 代码：

   ```typescript
   class Snake {
     // 表示蛇头的元素
     head: HTMLElement
     // 蛇的身体（包括蛇头）
     bodies: HTMLCollection
     // 获取蛇的容器
     element: HTMLElement
   
     constructor() {
       this.element = document.getElementById('snake')!
       // querySelector返回的是Element类型，需要断言改成HTMLElement
       this.head = document.querySelector('#snake > div') as HTMLElement
       this.bodies = this.element.getElementsByTagName('div')
     }
   
     // 获取蛇的坐标（蛇头坐标）
     get X() {
       return this.head.offsetLeft
     }
   
     // 获取蛇的Y轴坐标
     get Y() {
       return this.head.offsetTop
     }
   
     // 设置蛇头的坐标
     set X(value) {
       // 如果新值和旧值相同，则直接返回不再修改
       if (this.X === value) {
         return
       }
   
       // X的值的合法范围0-290之间
       if (value < 0 || value > 290) {
         // 进入判断说明蛇撞墙了
         throw new Error('蛇撞墙了！')
       }
   
       // 如果修改了X，判断是否有第二节身体（没有的话可以掉头）
       // 例：向左移动时，蛇头X坐标100，第二节身体X坐标110，此时向右掉头，X+=10，即value为110
       // 此时第二节身体X坐标与value值相同，说明用户发生了掉头动作
       if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
         // 如果新值value大于旧值X，则说明用户想向右走
         if (value > this.X) {
           // 应将value改为100-10=90，使蛇继续向左移动
           value = this.X - 10
           // 如果新值value小于旧值X，则说明用户想向左走
         } else {
           // 应将value改为100+10=110，使蛇继续向右移动
           value = this.X + 10
         }
       }
   
       // 移动身体
       this.moveBody()
   
       this.head.style.left = value + 'px'
       // 检查有没有撞到自己
       this.checkHeadBody()
     }
   
     set Y(value) {
       // 如果新值和旧值相同，则直接返回不再修改
       if (this.Y === value) {
         return
       }
   
       // Y的值的合法范围0-290之间
       if (value < 0 || value > 290) {
         // 进入判断说明蛇撞墙了，抛出一个异常
         throw new Error('蛇撞墙了！')
       }
   
       // 如果修改了Y，判断是否有第二节身体（没有的话可以掉头）
       // 例：向下移动时，蛇头Y坐标100，第二节身体Y坐标110，此时向上掉头，Y+=10，即value为110
       // 此时第二节身体Y坐标与value值相同，说明用户发生了掉头动作
       if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
           // 如果新值value大于旧值Y，则说明用户想向上走
           if (value > this.Y) {
           // 应将value改为100-10=90，使蛇继续向下移动
           value = this.Y - 10
           // 如果新值value小于旧值Y，则说明用户想向下走
         } else {
           // 应将value改为100+10=110，使蛇继续向上移动
           value = this.Y + 10
         }
       }
   
       // 移动身体
       this.moveBody()
       this.head.style.top = value + 'px'
       // 检查有没有撞到自己
       this.checkHeadBody()
     }
   
     // 蛇增加身体的方法
     addBody() {
       // 向element中添加一个div
       this.element.insertAdjacentHTML('beforeend', '<div></div>')
     }
   
     // 添加一个蛇身体移动的方法
     moveBody() {
       // 将后边的身体设置为前边身体的位置（从后往前设置）
       // 第4节 = 第3节的位置、第3节 = 第2节的位置、第2节 = 蛇头的位置
       // 遍历获取所有的身体
       for (let i = this.bodies.length - 1; i > 0; i--) {
         // 获取前边身体的位置
         let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
         let Y = (this.bodies[i - 1] as HTMLElement).offsetTop
   
         // 将值设置到当前身体上
         ;(this.bodies[i] as HTMLElement).style.left = X + 'px'
         ;(this.bodies[i] as HTMLElement).style.top = Y + 'px'
       }
     }
   
     // 检查蛇头是否撞到身体的方法
     checkHeadBody() {
       // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
       for (let i = 1; i < this.bodies.length; i++) {
         let bd = this.bodies[i] as HTMLElement
         if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
           // 进入判断说明蛇头撞到了身体，游戏结束
           throw new Error('撞到自己了！')
         }
       }
     }
   }
   
   export default Snake
   ```

------

#### 8.3.4 GameControl

> 定义游戏控制方法GameControl

1. 功能：

   1）导入前三个模块：`Food`、`ScorePanel`、`Snack`

   2）定义蛇、食物、记分牌三个属性：`snake: Snake`、`food: Food`、`scorePanel: ScorePanel`

   3）定义存储蛇的移动方向的属性：`direction: string = ''`

   4）定义记录游戏是否结束的属性：`isLive = true`

   5）定义初始化游戏的方法：`init()`

   6）定义键盘按下的响应函数：`keydownHandler(event: KeyboardEvent)`

   7）定义控制蛇移动的方法：`run()`

   8）定义检查蛇是否吃到食物的方法：`checkEat(X: number, Y: number)`

   9）导出模块：`export default GameControl`

2. 代码：

   ```typescript
   // 引入其他的类
   import Snake from './Snake'
   import Food from './Food'
   import ScorePanel from './ScorePanel'
   
   // 游戏控制器，控制其他的所有类
   class GameControl {
     // 定义三个属性
     // 蛇
     snake: Snake
     // 食物
     food: Food
     // 记分牌
     scorePanel: ScorePanel
     // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
     direction: string = ''
     // 创建一个属性用来记录游戏是否结束
     isLive = true
   
     constructor() {
       this.snake = new Snake()
       this.food = new Food()
       this.scorePanel = new ScorePanel(10, 2)
   	// 写在这里的意思是：创建实例对象后，即调用init()方法
       this.init()
     }
   
     // 游戏的初始化方法，调用后游戏即开始
     init() {
       // 绑定键盘按键按下的事件
       // 注意：这里用bind使keydownHandler中的this重新指向GameControl，否则指向document
       document.addEventListener('keydown', this.keydownHandler.bind(this))
       // 调用run方法，使蛇移动
       this.run()
     }
   
     // ArrowUp/ArrowDown/ArrowLeft/ArrowRight
     // IE中：Up/Down/Left/Right
     // 创建一个键盘按下的响应函数
     keydownHandler(event: KeyboardEvent) {
       // 需要检查event.key的值是否合法（用户是否按了正确的按键）
       // 修改direction属性
       this.direction = event.key
     }
   
     // 创建一个控制蛇移动的方法
     run() {
       // 根据方向（this.direction）来使蛇的位置改变
       // 向上 top 减少、向下 top 增加、向左  left 减少、向右  left 增加
       // 获取蛇现在坐标
       let X = this.snake.X
       let Y = this.snake.Y
   
       // 根据按键方向来修改X值和Y值
       switch (this.direction) {
         case 'ArrowUp':
         case 'Up':
           // 向上移动 top 减少
           Y -= 10
           break
         case 'ArrowDown':
         case 'Down':
           // 向下移动 top 增加
           Y += 10
           break
         case 'ArrowLeft':
         case 'Left':
           // 向左移动 left 减少
           X -= 10
           break
         case 'ArrowRight':
         case 'Right':
           // 向右移动 left 增加
           X += 10
           break
       }
   
       // 检查蛇是否吃到了食物
       this.checkEat(X, Y)
   
       // 修改蛇的X和Y值
       try {
         this.snake.X = X
         this.snake.Y = Y
       } catch (e) {
         // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
         alert(e.message + ' GAME OVER!')
         // 将isLive设置为false
         this.isLive = false
       }
   
       // 开启一个定时调用（随着等级变高，定时器调用间隔变短，移动速度变快）
       // 短路运算：a && b，若a为真，返回b；若a为假，返回a
       this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
     }
   
     // 定义一个方法，用来检查蛇是否吃到食物
     checkEat(X: number, Y: number) {
       if (X === this.food.X && Y === this.food.Y) {
         // 食物的位置要进行重置
         this.food.change()
         // 分数增加
         this.scorePanel.addScore()
         // 蛇要增加一节
         this.snake.addBody()
       }
     }
   }
   
   export default GameControl
   ```

------

#### 8.3.5 入口文件

1. index.ts：

   ```typescript
   import './style/index.less'
   import GameControl from './moduls/GameControl'
   const gameControl = new GameControl()
   ```

------

