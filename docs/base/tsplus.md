# TypeScript+

## 第1章 TypeScript配置

### 1.1 TSC编译器

1. 安装tsc编译器：

   ```bash
   npm install -g typescript
   ```

2. 编译单个文件：

   ```bash
   tsc xxx.js
   ```

3. 编译并实时更新单个文件：

   ```bash
   tsc --watch xxx.js |  tsc -w xxx.js
   ```

4. 编译整个项目：（需配置tsconfig的`rootDir`、`outDir`）

   ```bash
   tsc
   ```

5. 编译并实时更新整个项目：（需配置tsconfig的`rootDir`、`outDir`）

   ```bash
   tsc --watch | tsc -w
   ```

------

### 1.2 tsconfig.json

> 使用tsc命令时，后面没有任何参数才会使用tsconfig配置进行编译（[参考文章](https://juejin.cn/post/6844904093568221191)）

- 常用配置：

  ```json
  {
    "compilerOptions": {
      "target": "es6",                            /* ES目标版本: 'ES3','ES5','ES2015','ES2016','ES2017','ESNEXT' */
      "module": "commonjs",                       /* 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015' */
      "rootDir": "./src",                         /* 指定项目代码根目录文件夹 */
      "outDir": "./dist",                         /* 为所有编译后的ts文件指定输出路径：默认是每一个ts文件的当前目录 */
      "esModuleInterop": true,                    /* 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性 */
      "forceConsistentCasingInFileNames": true,   /* 确保在import时导入的变量名称是正确的 */
      "strict": true,                             /* 开启严格检查模式 */
      "skipLibCheck": true                        /* 跳过对所有.d.ts文件的类型检查 */
    }
  }
  ```

#### 1.2.0 顶层选项

> 除了这一层的配置，其余配置全部属于`compilerOptions`

```json
/* 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件 */
"include": ["./test.ts"],
/* 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件 */
"files": ["./src/**/*"],
/* 不编译某些文件 */
"exclude": ["test.ts"],
/* 要继承的另一个配置文件的路径，当前配置文件中会自动包含config目录下base.json中的所有配置信息（内容也是tsconfig中的） */
"extends": "./configs/base",
```

------

#### 1.2.1 项目配置

```json
/* 启动增量编译：只编译修改过的文件,这个时候会生成tsconfig.tsbuildinfo,下次编译的时候会进行对比只编译修改过的文件 */
"incremental":true,
/* 是否编译构建引用项目：启用允许TypeScript项目与项目引用一起使用的约束 */
"composite":true,
/* 指定文件用来存储增量编译信息，默认是tsconfig.tsbuildinfo */
"tsBuildInfoFile":"./",
"disableSourceOfProjectReferenceRedirect":true,
"disableSolutionSearching":true,
/* 减少TypeScript自动加载的项目数量 */
"disableReferencedProjectLoad":true,
```

------

#### 1.2.2 语言和环境

```json
/* 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT' */
"target":"es2016",
/* 指定一组绑定的库声明文件，用于描述目标运行时环境：若未指定则注入默认lib，ES5:[DOM,ES5,ScriptHost]，ES6:[DOM,ES6,DOM.Iterable,ScriptHost] */
"lib":[],
/* 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react' */
"jsx":"preserve",
/* 是否启用实验性的装饰器特性 */
"experimentalDecorators":true,
/* 是否为装上去提供元数据支持：元数据也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引用ES2015.Reflect这个库 */
"emitDecoratorMetadata":true,
"jsxFactory":"",
"jsxFragmentFactory":"",
"jsxImportSource":"",
"reactNamespace":"",
"noLib":true,
"useDefineForClassFields":true,
```

------

#### 1.2.3 模块化

```json
/* 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015' */
"module":"commonjs",
/* 指定项目代码根目录文件夹 */
"rootDir":"./src",
/* 用于选择模块解析策略，有'node'和'classic'两种类型 */
"moduleResolution":"node",
"baseUrl":"./",
/* 定义路径别名，可以作为文件引入路径（如："@page": ["src/page/index"]） */
"paths":{},
"rootDirs":[],
/* 指定多个类似于'./node_modules/@types'的文件夹：指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载 */
"typeRoots":[],
/* 指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来 */
"types":[],
"allowUmdGlobalAccess":true,
"resolveJsonModule":true,
"noResolve":true,
```

------

#### 1.2.4 JS支持

```json
/* 是否允许编译JS，可利用checkJS检查错误 */
"allowJs":true,
/* 是否检测JS的语法 */
"checkJs":true,
"maxNodeModuleJsDepth":1,
```

------

#### 1.2.5 编译文件

```json
/* 根据项目中的TS和JS生成.d.ts文件：若设为true，编译每个ts文件之后会生成一个js文件和一个声明文件, declaration和allowJs不能同时设为true */
"declaration":true,
/* 指定是否为声明文件.d.ts生成sourcemap文件 */
"declarationMap":true,
"emitDeclarationOnly":true,
"sourceMap":true,
/* 当module设置为 'amd' and 'system'时可以使用此命令，将ts文件打包到一个目录下；若declaration为true，同时也指定一个文件包含d.ts的输出 */
"outFile":"./",
/* 为所有编译后的ts文件指定输出路径：默认是每一个ts文件的当前目录 */
"outDir":"./dist"
/* 编译时删除注释 */
"removeComments":true,
/* 不生成编译文件，outDir指定的输出目录下将没有任何文件，但是会进行编译，有错误会抛出 */
"noEmit":true,
/* 允许每个项目从tslib导入一次helper函数，而不是每个文件都包含它们：是否引入npm包tslib中的辅助函数，如__extends等  */
"importHelpers":true,
"importsNotUsedAsValues":"remove",
/* 生成兼容性强（但冗长且性能较差）的JavaScript用于迭代：当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持 */
"downlevelIteration":true,
/* 指定调试器应该找到TypeScript文件而不是源文件的位置，这个值会被写进.map文件里 */
"sourceRoot":"",
/* 指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性 */
"mapRoot":"",
/* 指定是否将map文件内容和js文件编译在一个同一个js文件中，如果设为true，则map的内容会以//#soureMappingURL=开头，然后接base64字符串的形式插入在js文件底部 */
"inlineSourceMap":true,
/* 指定是否进一步将ts文件的内容也包含到输出文件中 */
"inlineSources":true,
"emitBOM":true,
"newLine":"crlf",
"stripInternal":true,
"noEmitHelpers":true,
"noEmitOnError":true,
"preserveConstEnums":true,
"declarationDir":"./",
"preserveValueImports":true,
```

------

#### 1.2.6 相互约束

```json
/* 确保每个文件可以安全转译，而不依赖于其他导入：是否将每个文件作为单独的模块，默认为true，不可以和declaration同时设定 */
"isolatedModules":true,
/* 指定允许从没有默认导出的模块中默认导入：当一个模块没有默认导出时，允许'import x from y' */
"allowSyntheticDefaultImports":true,
/* 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性（开启后，allowSyntheticDefaultImports自动同时被设为true）*/
"esModuleInterop":true
/* 不把符号链接解析为真实路径 */
"preserveSymlinks":true,
/* 确保在import时导入的变量名称是正确的 */
"forceConsistentCasingInFileNames":true
```

------

#### 1.2.7 类型检查

```json
/* 开启严格检查模式 */
"strict": true,
/* 不允许变量或函数参数具有隐式any类型 */
"noImplicitAny":true,
/* null和undefined类型检测 */
"strictNullChecks":true,
/* 对函数参数进行严格逆变比较：在给函数赋值时，要确保参数和返回值是子类型兼容的 */
"strictFunctionTypes":true,
/* 检查'bind'、'call'、'apply'方法的参数是否与原始函数匹配 */
"strictBindCallApply":true,
/* 检查在构造函数中声明但没有设置的类属性 */
"strictPropertyInitialization":true,
/* 当'this'被赋予类型'any'时，启用错误报告 */
"noImplicitThis":true,
/* 将catch子句变量类型为unknown而不是any */
"useUnknownInCatchVariables":true,
/* 使用js的严格模式：在每一个文件上部自动声明 use strict */
"alwaysStrict":true,
/* 检测定义了但是没使用的变量：默认为false */
"noUnusedLocals":true,
/* 检查是否有在函数体中没有使用的参数 */
"noUnusedParameters":true,
/* 解释已写入的可选属性类型，而不是添加undefined */
"exactOptionalPropertyTypes":true,
/* 检查函数是否有返回值：设为true后，如果函数没有返回值则会提示 */
"noImplicitReturns":true,
/* 检查switch中是否有case没有使用break跳出switch */
"noFallthroughCasesInSwitch":true,
/* 检查在索引签名结果中是否包含undefined */
"noUncheckedIndexedAccess":true,
"noImplicitOverride":true,
"noPropertyAccessFromIndexSignature":true,
/* 允许存在未使用的标签 */
"allowUnusedLabels":true,
/* 允许存在不可访问的代码 */
"allowUnreachableCode":true,
```

------

#### 1.2.8 完整性

```json
/* 跳过对包含在TS中的.d.ts文件的类型检查 */
"skipDefaultLibCheck": true,
/* 跳过对所有.d.ts文件的类型检查 */
"skipLibCheck": true
```

------

## 第2章 常用类型

### 2.1 基元类型

> 类型名称String，Number，和Boolean（以大写字母开头）是合法的，但指的是一些很少出现在代码中的特殊内置类型。对于类型，始终使用string,number,或boolean（小写开头）

1. `string`：表示字符串值，如"Hello,world"

2. `number`：表示数字值，如42；JavaScript没有一个特殊的整数运行时值，所以没有等价于int或float类型，一切都只是number

3. `boolean`：只有两个值true和false

   ```typescript
   let str: string = 'hello typescript'
   let num: number = 100
   let bool: boolean = true
   ```

------

### 2.2 数组

1. 语法1：`type[]`，如：`number[]`代表数字数组，`string[]`代表字符串数组

   ```typescript
   let arr: number[] = [1, 2, 3]
   arr = [4]
   ```

2. 语法2：` Array<type>`，如`Array<number>`

   ```typescript
   let arr2: Array<number> = [1, 2, 3]
   arr2 = ['a']	// 报错：不能将类型“string”分配给类型“number”
   ```

------

### 2.3 any

1. 作用：当你不希望某个特定值导致类型检查错误时，可以使用它。

2. 当一个值的类型是any时，可以访问它的任何属性，将它分配给任何类型的值，或者几乎任何其他语法上的东西都合法的，但编译后的JS可能有错误

   ```typescript
   let obj: any = {
     x: 0
   }
   // 以下代码行都不会抛出编译器错误
   // 使用'any'将禁用所有进一步的类型检查
   obj.foo()	// 编译后的文件会报错
   obj()
   obj.bar = 100
   obj = 'hello'
   const n: number = obj
   ```

3. tsconfig.json配置：`noImplicitAny`

   1）当不指定类型时，并且TypeScript无法从上下文推断它时，编译器通常会默认为any

   2）`noImplicitAny`设置为`true`将任何隐式标记any为错误

------

### 2.4 类型注释

1. 使用`const`、`var`、`let`，可以选择添加类型注释来显式指定变量的类型：TS不使用”左边的类型“风格的声明，类型注解总是在后面

   ```typescript
   let myName: string = "Felixlu"
   ```

2. 大多数情况下，不必输入类型注释，TS会根据其初始化器的类型自动推断

   ```typescript
   // 不需要类型定义--“myName”推断为类型“string”
   let myName = "Felixlu"
   ```

------

### 2.5 函数

1. 参数类型注释：声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型

   ```typescript
   function greet(name: string) {
     console.log("Hello, " + name.toUpperCase() + '!!')
   }
   ```

2. 返回类型注释：出现在参数列表之后，通常不需要返回类型注释，因为TS会根据其return语句推断函数的返回类型。某些代码库会出于文档目的明确指定返回类型，以防止意外更改或仅出于个人偏好。

   ```typescript
   function getFavoriteNumber() :number {
     return 26
   }
   ```

3. 匿名函数：与函数声明有点不同，当一个函数出现在TypeScript可以确定它将如何被调用的地方时，该函数的参数会自动指定类型

   ```typescript
   // 这里没有类型注释，但是TypeScript可以发现错误
   const names = ['小千', '小锋', '小猿']
   // 函数上下文类型
   // 即使参数s没有类型注释，TypeScript也会使用forEach函数的类型，以及数组的推断类型来确定s的类型
   names.forEach(function(s) {
     console.log(s.toUpperCase())
   })
   // 上下文类型也适用于箭头函数
   names.forEach((s) => {
     console.log(s.toUpperCase())
   })
   ```

------

