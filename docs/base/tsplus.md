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

1. 创建tsconfig.json文件：

   ```bash
   tsc --init
   ```

2. 常用配置：

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

------

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

> 7种基元类型：string、number、bigint、boolean、symbol、null、undefined

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

> 类型注释由编译器删除，不会影响代码的运行时行为

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

### 2.6 对象

1. 语法：使用`,`或`;`来分隔属性

   ```typescript
   function printCoord(pt: { x: number, y: number }) {
     console.log('坐标的x值为：' + pt.x)
     console.log('坐标的y值为：' + pt.y)
   }
   
   printCoord({
     x: 3,
     y: 7
   })
   ```

2. 可选属性：可以指定其部分或全部属性是可选的，在属性名称后添加一个`?`：

   ```typescript
   function printName(obj: { first: string, last?: string }) {
     ......
   }
   printName({
     first: 'Felix'
   })
   printName({
     first: 'Felix',
     last: 'Lu'
   })
   ```

3. 注意：当读取可选属性时，必须使用它之前用`undefined`进行检查

   ```typescript
   function printName(obj: { first: string, last?: string }) {
     // 错误 - 'obj.last' 可能不存在
     // console.log(obj.last.toUpperCase())
     
     if (obj.last !== undefined) {
       console.log(obj.last.toLowerCase())
     }
     console.log(obj.last?.toUpperCase())
   }
   ```

------

### 2.7 联合类型 union

1. 定义联合类型：由两个或多个其他类型组成的类型，表示可能是这些类型中的任何一种的值，每一种称为联合类型的成员

   ```typescript
   function printId(id: number | string) {
     console.log('Your ID is: ' + id)
   }
   // 正确
   printId(101)
   // 正确
   printId('202')
   // 错误
   printId({
     MyId: 123456
   })
   ```

2. 使用联合类型：如果有联合类型string | number，则不能只使用一种类型的操作，需要缩小联合

   ```typescript
   // 案例1
   function printId(id: number | string) {
     // 错误写法
     // console.log('Your ID is: ' + id)
     // console.log(id.toUpperCase())
     
     // 正确写法
     if (typeof id === 'string') {
       console.log(id.toUpperCase())
     } else {
       console.log(id)
     }
   }
   ```

   ```typescript
   // 案例2
   function welcomePeople(x: string[] | string) {
     if (Array.isArray(x)) {
       console.log('Hello, ' + x.join(' and '))
     } else {
       console.log('Welcome lone traveler' + x)
     }
   }
   
   welcomePeople('A')
   welcomePeople(['a', 'b'])
   ```

3. 如果联合中的每个成员都有一个共同的属性，则可以使用该属性而不会缩小范围，如数组和字符串都有一个slice方法

   ```typescript
   function getFirstThree(x: number[] | string): number[] | string {
     return x.slice(0, 3)
   }
   
   console.log(getFirstThree('abcdefg'))
   console.log(getFirstThree([2, 3, 4, 5, 6]))
   ```

------

### 2.8 类型别名 type

1. 类型别名：一个名称为任何类型的定义，适用于多次使用同一个类型的场景

   ```typescript
   type Point = {
     x: number
     y: number
   }
   
   function printCoord(pt: Point) {
     console.log("坐标x的值是： " + pt.x)
     console.log("坐标y的值是： " + pt.y)
   }
   
   printCoord({
     x: 100,
     y: 200
   })
   ```

2. 可以使用类型别名为任何类型命名，不仅仅是对象类型，如可以命名联合类型：

   ```typescript
   type ID = number | string
   
   function printId(id: ID) {
     if (typeof id === 'string') {
       console.log(id.toUpperCase())
     } else {
       console.log(id)
     }
   }
   
   printId(100)
   printId('hello')
   ```

3. 使用别名时，就像编写了别名类型一样：

   ```typescript
   type UserInputSanitizedString = string
   
   // UserInputSanitizedString相当于string
   function sanitizedInput(str: string): UserInputSanitizedString {
     return str.slice(0, 2)
   }
   
   let userInput = sanitizedInput('hello')
   userInput = 'new Input'
   ```

------

### 2.9 接口 interface

> 大多数情况下，可以根据个人喜好进行选择，启发式使用interface，在需要时使用type

<img :src="$withBase('/imgs/basic/接口与交叉类型.png')" alt="接口与交叉类型">

1. 接口：是另一种方式来命名对象类型

   ```typescript
   interface Point {
     x: number
     y: number
   }
   
   function printCoord(pt: Point) {
     console.log("坐标x的值是： " + pt.x)
     console.log("坐标y的值是： " + pt.y)
   }
   
   printCoord({
     x: 100,
     y: 200
   })
   ```

2. 扩展：

   1）接口：interface，使用`extends`

   ```typescript
   // 扩展接口
   interface Animal {
     name: string
   }
   interface Bear extends Animal {
     honey: boolean
   }
   const bear: Bear = {
     name: 'winie',
     honey: true
   }
   console.log(bear.name)
   console.log(bear.honey)
   ```

   2）类型声明：type，使用`&`

   ```typescript
   // 通过交叉点扩展类型
   type Animal = {
     name: string
   }
   type Bear = Animal & {
     honey: boolean
   }
   const bear: Bear = {
     name: 'winnie',
     honey: true
   }
   console.log(bear.name)
   console.log(bear.honey)
   ```

3. 添加新字段：类型别名可能不参与声明合并，但接口可以

   1）接口：interface，两个同名接口可以合并

   ```typescript
   // 向现有的类型添加字段
   interface MyWindow {
     count: number
   }
   interface MyWindow {
     title: string
   }
   const w: MyWindow = {
     title: 'hello ts',
     count: 100
   }
   ```

   2）类型声明：type，两个同名类型声明会报错

   ```typescript
   // 类型创建后不能更改
   type MyWindow = {
     title: string
   }
   // 报错
   type MyWindow = {
     count: number
   }
   ```

4. 接口只能用于声明对象的形状，不能重命名基元类型（string、number、boolean）

   1）类型声明：type，可以对基元类型用自定义别名代替

   ```typescript
   type SanitizedString = string
   type EvenNumber = number
   ```

   2）接口：interface，无法重命名基元类型

   ```typescript
   // 报错
   interface X extends string {
      ......
   }
   ```

5. 在v4.2之前，类型别名可能出现在错误消息中，有时会代替等效的匿名类型，接口将始终在错误消息中命名

   1）接口：interface

   ```typescript
   // 编译器错误消息将始终使用接口的名称
   interface Mammal {
       name: string
   }
   function echoMammal(m: Mammal) {
       console.log(m.name)
   }
   // 例：下面的错误将总是使用 "Mammal" 来引用预期的类型
   // The expected type comes from property 'name' which is declared here on type 'Mammal'
   echoMammal({  name: 12343 })
   ```

   2）类型别名：type

   ```typescript
   function echoAnimal(m: { name: string }) {
       console.log(m.name)
   }
   // 编译器报错时，只引用了type '{ name: string; }'
   // The expected type comes from property 'name' which is declared here on type '{ name: string; }'
   echoAnimal({ name: 12345 })
   ```

   ```typescript
   // 当一个类型没有经过任何形式的操作时，仍然可以获得作为引用的名称
   type Lizard = {
       name: string
   }
   function echoLizard(l: Lizard) {
       console.log(l.name)
   }
   // 例：这里依然引用为"Lizard"
   // The expected type comes from property 'name' which is declared here on type 'Lizard'
   echoLizard({ name: 12345})
   ```

   ```typescript
   // 但是当类型被转换时，例如通过Omit操作，错误消息将显示结果类型而不是名称
   type Arachnid = Omit<{ name: string, legs: 8 }, 'legs'> 
   function echoSpider(l: Arachnid) {
       console.log(l.name)
   }
   // The expected type comes from property 'name' which is declared here on type 'Pick<{ name: string; legs: 8; }, "name">'
   echoSpider({ name: 12345, legs: 8})
   ```

------

### 2.10 类型断言 as

> 类型断言由编译器删除，不会影响代码的运行时行为

1. 应用场景：当获得有关TS不知道的值类型的信息时，需要加类型断言`as`防止报错。

2. 案例：如果你正在使用`document.getElementById`，TypeScript只知道这将返回某种类型的`HTMLElement`，但你可能知道你的页面将始终具有`HTMLCanvasElement`给定ID的值，可以使用类型断言来指定更具体的类型

   ```typescript
   const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement
   ```

3. 尖括号语法：（除非代码在`.tsx`文件中）

   ```typescript
   const myCanvas2 = <HTMLCanvasElement>document.getElementById('main_canvas')
   ```

4. 注意：因为类型断言在编译时被移除，所以没有与类型断言相关联的运行时检查，`null`如果类型断言错误，则不会出现异常

5. TS只允许类型断言转换为更具体或不太具体的类型版本，此规则可防止“不可能”的强制：

   1）将类型 string 转换为类型 number 可能是错误的，因为两种类型都没有充分重叠

   ```typescript
   const x = 'hello' as number
   ```

   2）如果有意为之，先将表达式转换为`any`或`unknown`

   ```typescript
   const x = ('hello' as any) as number
   const y = ('world' as unknown) as number
   ```

------

### 2.11 文字类型

1. 声明变量：

   1）允许更改变量中保存的内容：`var`、`let`

   ```typescript
   let testString = 'Hello World'
   testString = 'Olá Mundo'	// 类型为string
   ```

   2）不允许更改变量中保存的内容：`const`

   ```typescript
   const constantString = 'Hello World'
   constantString	// 类型为文字类型
   // constantString = 'Olá Mundo'	// 报错，无法更改
   ```

2. 文本文字类型：

   1）单一类型：只能有一个特定值

   ```typescript
   let x: 'hello' = 'hello'
   // 正确
   x = "hello"
   // 错误
   // x = 'world'
   ```

   2）联合类型：表示只接受一组特定已知值

   ```typescript
   function printText(s: string, alignment: 'left' | 'right' | 'center') {
       // ......
   }
   printText('hello', 'left')
   // 报错
   // printText('world', 'center2')
   ```

3. 数字文字类型：

   ```typescript
   function compare(a: string, b: string): -1 | 0 | 1 {
     return a === b ? 0 : a > b ? 1 : -1
   }
   ```

4. 布尔文字类型：类型boolean本身实际上只是联合类型`true|false`的别名

5. 与非文字类型结合使用

   ```typescript
   interface Options {
     width: number
   }
   function configure(x: Options | 'auto') {
       // ......（缩小联合）
   }
   configure({
     width: 100
   })
   configure('auto')
   // 报错
   // configure('automatic')
   ```

6. 文字推理：使用对象初始化变量时，TypeScript假定该对象的属性稍后可能会更改值

   1）案例1：由于`obj.count`的值初始化时被赋予的是0，TS自动判断后期`obj.count`被赋值的类型为`number`

   ```typescript
   const obj = {
     count: 0
   }
   if (true) {
     obj.count = 1
   }
   ```

   2）案例2：TS认为`req.method`被认为赋值的类型为`string`，而不是`GET`

   ```typescript
   function handleRequest(url: string, method: 'GET' | 'POST' | 'GUESS') {
       // ......
   }
   const req = {
     url: 'https://example.com',
     method: 'GET'
   }
   // 报错：req.method
   handleRequest(req.url, req.method)
   ```

   ```typescript
   // 解决方案1：在任一位置添加类型断言来更改推理
   
   // 方法1：我想让req.method始终拥有文字类型GET，从而防止之后可能分配"GUESS"给该字段
   const req = { url: "https://example.com", method: "GET" as "GET" }
   
   // 方法2：我知道其他原因req.method具有 "GET" 值
   handleRequest(req.url, req.method as "GET")
   ```

   ```typescript
   // 解决方案2：使用 as const 将整个对象转换为类型文字
   // as const后缀就像const定义，确保所有属性分配的文本类型，而不是一个更一般的string或number
   const req = {
     url: 'https://example.com',
     method: 'GET'
   } as const
   ```

------

### 2.12 null/undefined

1. `strictNullChecks`选项设置：建议开启

   1）false：关闭，仍然可以正常访问的值，并且可以将值分配给任何类型的属性，这类似于没有空检查的语言（例如C#、Java）的行为方式，缺乏对这些值的检查往往是错误的主要来源

   2）true：开启，需要在对该值使用方法或属性之前测试这些值，可以使用缩小来检查可能的值

   ```typescript
   function doSomething(x: string | null) {
     if (x === null) {
       // ......
     } else {
       console.log('Hello, ' + x.toUpperCase())
     }
   }
   ```

2. 非空断言运算符：后缀加感叹号`!`，表示该值不是 null 或 undefined

   ```typescript
   function liveDangerously(x?: number | null) {
     console.log(x!.toFixed())
   }
   ```

------

### 2.13 枚举 enum

> 枚举允许开发者定义一组命名的常量。使用枚举可以使其更容易记录意图，或创建一组不同的情况。TypeScript提供了基于数字和字符串的枚举

#### 2.13.1 数值型枚举

1. 定义数值型枚举：赋予第一个成员初始值，若不赋予则默认为0，所有下面的成员从初始值开始自动递增

   ```typescript
   enum Direction {
     Up = 1,	// 如果不赋予初始值，直接写UP，默认初始值为0
     Down,		// 2
     Left,		// 3
     Right,	// 4
   }
   ```

2. 使用数值型枚举：只需将任何成员作为枚举本身的一个属性来访问，并使用枚举的名称来声明类型

   ```typescript
   enum UserResponse {
     No = 0,
     Yes = 1,
   }
   // 使用枚举的名称来声明类型
   function respond(recipient: string, message: UserResponse): void {
     // ...
   }
   // 将任何成员作为枚举本身的一个属性来访问
   respond("Princess Caroline", UserResponse.Yes);
   ```

3. 数字枚举可以混合在计算和常量成员中，没有初始化器的枚举要么需要放在第一位，要么必须放在用数字常量或其他常量枚举成员初始化的数字枚举之后

   ```typescript
   enum E {
     A = getSomeValue(),
     B,	// 报错：Enum成员必须有初始化器
   }
   ```

------

#### 2.13.2 字符串枚举

1. 作用：字符串枚举允许你在代码运行时给出一个有意义的、可读的值，与枚举成员本身的名称无关

2. 每个成员都必须用一个字符串字头或另一个字符串枚举成员进行常量初始化

   ```typescript
   enum Direction {
     Up = "UP",
     Down = "DOWN",
     Left = "LEFT",
     Right = "RIGHT",
   }
   ```

------

#### 2.13.3 异构枚举

1. 枚举可以与字符串和数字成员混合（不建议这样写）：

   ```typescript
   enum BooleanLikeHeterogeneousEnum {
     No = 0,
     Yes = "YES",
   }
   ```

------

#### 2.13.4 计算型和常量型成员

1. 常量型成员：

   1）枚举中的第一个成员，没有初始化器，默认赋值为0

   2）枚举中非第一个成员，没有初始化器，前枚举成员为常数，则值为前成员值+1

   3）用常量枚举表达式初始化的成员

   ```typescript
   enum E { X,}
   enum E1 { X,Y,Z,}
   enum E2 { A=1,B,C,}
   ```

2. 常量枚举表达式：

   1）文字枚举表达式（基本上是字符串文字或数字文字）

   2）对先前定义的常量枚举成员的引用（可以源自不同的枚举）

   3）带括号的常量枚举表达式

   4）应用于常量枚举表达式的`+`,`-`,`~`单项运算符之一

   5）以常量枚举表达式作为操作数的二元运算符

   ```txt
   +, -, *, /, %, <<, >>, >>>, &, |, ^
   ```

   6）注意：如果常量枚举表达式被评估为`NaN`或`Infinity`，这是一个编译时错误

3. 计算型成员：在所有其他情况下，枚举成员被认为是计算的

   ```typescript
   enum FileAccess {
     // 常量型成员
     None,
     Read = 1 << 1,
     Write = 1 << 2,
     ReadWrite = Read | Write,
     // 计算型成员
     G = "123".length,
   }
   ```

------

#### 2.13.5 联合枚举和枚举成员类型

1. 字面枚举成员：没有初始化值的常量枚举成员，或者其值被初始化为：

   1）任何字符串文字（例如"foo", "bar, "baz"）

   2）任何数字文字（例如1, 100）

   3）应用于任何数字字面的单数减号（例如-1, -100）

2. 当枚举中的所有成员都具有字面枚举值时：

   1）枚举成员也成为了类型：某些成员只能有一个枚举成员的值

   ```typescript
   enum ShapeKind {
     Circle,
     Square,
   }
   // 注意：这里的Circle和枚举中的Circle不是一个东西，只是名称相同而已
   interface Circle {
     kind: ShapeKind.Circle;
     radius: number;
   }
   // 同上
   interface Square {
     kind: ShapeKind.Square;
     sideLength: number;
   }
    
   let c: Circle = {
     // 报错：Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'
     // 因为Circle接口中定义的kind，只能是ShapeKind枚举中的Circle，而不能是Square
     kind: ShapeKind.Square,
     radius: 100,
   };
   ```

   2）枚举类型本身有效地成为每个枚举成员的联合（union），可以让TS检查出无意义的运算语句

   ```typescript
   enum E {
     Foo,
     Bar,
   }
   
   // 传入的参数x，只可能是2个值：E.foo、E.Bar，如果x不是E.foo，那必然是E.Bar
   // 如果x=E.foo，if语句执行后者返回true；如果x=E.Bar，if语句执行前者返回true
   // 也就是说无论如何都会执行if语句，那这句话就是废话
   function f(x: E) {
     // 报错：This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
     if (x !== E.Foo || x !== E.Bar) {
       //......
     }
   }
   ```

------

#### 2.13.6 运行时的枚举

1. 枚举是在运行时存在的真实对象，可以被传递给函数

   ```typescript
   enum E { X,Y,Z,}
    
   function f(obj: { X: number }) {
     return obj.X
   }
    
   // 可以正常工作，因为'E'有一个名为'X'的属性，是一个数字
   f(E)
   ```

------

#### 2.13.7 编译时的枚举

1. `keyof typeof`：可以将枚举转换为所有成员的字符串文字联合类型

   ```typescript
   enum LogLevel {
     ERROR,
     WARN,
     INFO,
     DEBUG,
   }
    
   // 相当于：type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
   type LogLevelStrings = keyof typeof LogLevel
   
   // 例子
   function printImportant(key: LogLevelStrings, message: string) {
     const num = LogLevel[key]
     if (num <= LogLevel.DEBUG) {
       console.log("Log level key is:", key)
       console.log("Log level value is:", num)
       console.log("Log level message is:", message)
     }
   }
   printImportant("ERROR", "This is a message")
   ```

2. 反向映射：

   1）数值型枚举成员：可以得到从枚举值到枚举名称的反向映射

   ```typescript
   enum Enum { A,}
   let a = Enum.A
   let nameOfA = Enum[a] // "A"
   ```

   2）字符串枚举成员：根本不会被生成反向映射

3. const枚举：可以避免在访问枚举值时产生额外代码和间接性代价

   1）语法：使用枚举上的const修饰符来定义

   ```typescript
   const enum Enum {
     A = 1,
     B = A * 2,
   }
   ```

   2）常量枚举：只能使用常量枚举表达式，在编译过程中被完全删除

   ```typescript
   // ts原始代码
   const enum Direction {
     Up,
     Down,
     Left,
     Right,
   }
    
   let directions = [
     Direction.Up,
     Direction.Down,
     Direction.Left,
     Direction.Right,
   ];
   ```

   ```js
   // 编译后JS代码
   "use strict";
   let directions = [
       0 /* Up */,
       1 /* Down */,
       2 /* Left */,
       3 /* Right */,
   ]
   ```

------

#### 2.13.8 环境枚举 declear

1. 环境枚举：用来描述已经存在的枚举类型的形状

   ```typescript
   declare enum Enum {
     A = 1,
     B,
     C = 2,
   }
   ```

2. 与非环境枚举的区别：

   1）在常规枚举中，如果其前面的枚举成员被认为是常量，那么没有初始化器的成员也将被认为是常量型成员

   2）相反，一个没有初始化器的环境（和非常量）枚举成员总是被认为是计算型成员

------

#### 2.13.9 对象与枚举

> 一般情况下，可能不需要枚举，因为对象可以满足正常需求

1. 案例：使用枚举定义函数参数

   ```typescript
   const enum EDirection {
     Up,
     Down,
     Left,
     Right,
   }
   
   // EDirection.Up	// 显示：(enum member) EDirection.Up = 0
   
   // 将枚举作为一个参数
   function walk(dir: EDirection) {}
   walk(EDirection.Left)
   ```

2. 案例：使用对象定义函数参数（需要用`as const`进行类型断言）

   ```typescript
   const ODirection = {
     Up: 0,
     Down: 1,
     Left: 2,
     Right: 3,
   } as const
   
   // ODirection.Up	// 显示：(property) Up: 0
   
   // 需要这行代码定义类型别名type
   type Direction = typeof ODirection[keyof typeof ODirection]
   
   function run(dir: Direction) {}
   run(ODirection.Right)
   ```

------

### 2.14 其他类型

#### 2.14.1 bignit

1. 表示非常大的整数：

   ```typescript
   // 通过bigint函数创建bigint
   const oneHundred: bigint = BigInt(100)
   // 通过文本语法创建BigInt
   const anotherHundred: bigint = 100n
   ```

#### 2.14.2 symbol

1. 作用：通过函数创建全局唯一引用

   ```typescript
   const firstName = Symbol("name")
   const secondName = Symbol("name")
   
   console.log(firstName===secondName) // false
   ```

------

## 第3章 类型缩小

### 3.1 typeof类型守卫

1. `typeof`可以返回的类型：（不返回`null`）

   ```txt
   "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function"
   ```

2. 检查typeof的返回值是一种类型保护：

   1）由于`null`也属于object，所以TS报错（在JS中，万物皆对象）

   2）这里的写法只把参数strs缩小到了`string[] | null`，而不仅仅是`string[]`

   ```typescript
   function printAll(strs: string | string[] | null) {
     if (typeof strs === 'object') {
       // 报错：Object is possibly 'null'
       for (const s of strs) {
         console.log(s)
       }
     } else if (typeof strs === 'string') {
       console.log(strs)
     } else {
       // ...
     }
   }
   ```

------

### 3.2 真值缩小

1. 在JS中，常用与false等价的值来表示false：

   ```js
   0, NaN, "", 0n, null, undefined
   ```

2. 可以在条件、`&&`、`||`、if语句、布尔否定(`!`)等中使用任何表达式

   ```js
   // 这两个结果都返回 true 
   Boolean("hello"); // type: boolean, value: true 
   !!"world"; // type: true, value: true
   ```

3. 案例：防范`null`或`undefined `

   ```typescript
   function printAll(strs: string | string[] | null) {
     if (strs) {
       if (typeof strs === 'object') {
         for (const s of strs) {
           console.log(s)
         }
       } else if (typeof strs === 'string') {
         console.log(strs)
       } else {
         // ...
       }
     }
   }
   ```

   ```typescript
   function multiplyAll(
     values: number[] | undefined,
     factor: number
   ) {
     if (!values) {
       return values
     } else {
       return values.map((x) => {
         return x * factor
       })
     }
   }
   
   console.log(multiplyAll(undefined, 2))
   ```

------

### 3.3 等值缩小

1. 等值缩小：使用分支语句做 `===`、`!==`、`==`、`!=` 等值检查，来实现类型缩小

   ```typescript
   function example(x: string | number, y: string | boolean) {
     // 检查x和y是否相等时，TS知道他们的类型也必须相等
     if (x === y) {
       x.toUpperCase()
       y.toLowerCase()
     } else {
       console.log(x)
       console.log(y)
     }
   }
   ```

2. 案例：检查特定的字面量值（而不是变量）也有效

   ```typescript
   function printAll(strs: string | string[] | null) {
     // 以做一个特定的检查来阻止null
     if (strs !== null) {
       if (typeof strs === 'object') {
         for (const s of strs) {
           console.log(s)
         }
       } else if (typeof strs === 'string') {
         console.log(strs)
       } else {
         // ...
       }
     }
   }
   ```

3. 使用`!=null`，可以将`null`和`undefined`同时排除在外：

   ```typescript
   interface Container {
     value: number | null | undefined
   }
   
   function multiplyValue(container: Container, factor: number) {
     // 从类型中排除了undefined 和 null
     if (container.value != null) {
       console.log(container.value)
       container.value *= factor
     }
   }
   
   multiplyValue({ value: 5 }, 6)
   multiplyValue({ value: undefined }, 6)
   multiplyValue({ value: null }, 6)
   // 报错，接口中没有string类型
   multiplyValue({ value: '5' }, 6)
   ```

------

### 3.4 in操作符缩小

>  `in`：用于确定对象是否具有某个名称的属性

1.  `"value" in x`："value"是字符串文字，x是联合类型

   1）true分支：需要x具有可选或必需属性的类型的值

   2）false分支：需要具有可选或缺失属性的类型的值

   ```typescript
   type Fish = { swim: () => void }
   type Bird = { fly: () => void }
   
   function move(animal: Fish | Bird) {
     // 如果具有swim属性，那肯定属于Fish类型
     if ("swim" in animal) {
       return animal.swim()
     }
     // 否则属于Brid类型
     return animal.fly()
   }
   ```

2. 可选属性还将存在于缩小的两侧，如Human可以游泳和飞行，应该出现在`in`检查的两侧

   ```typescript
   type Fish = { swim: () => void }
   type Bird = { fly: () => void }
   type Human = { swim?: () => void; fly?: () => void }
   
   function move(animal: Fish | Bird | Human) {
     if ("swim" in animal) {
       // 属于 Fish | Human 这两种类型之一
       return (animal as Fish).swim()
     }
   
     // 属于 Bird | Human 这两种类型之一
     return (animal as Bird).fly()
   }
   ```

------

### 3.5 instanceof操作符缩小

> `instanceof`：检查一个值是否是另一个值的“实例”，如：`x instanceof Foo`，检查x的原型链是否含有Foo.prototype

1. instanceof 也是一个类型保护，可以在其分支中实现类型缩小

   ```typescript
   function logValue(x: Date | string) {
     if (x instanceof Date) {
       console.log(x.toUTCString())
     } else {
       console.log(x.toUpperCase())
     }
   }
   
   logValue(new Date())
   logValue('hello ts')
   ```

------

### 3.6 分配缩小

1. 当为任何变量赋值时，TypeScript会查看赋值的右侧并适当缩小左侧

   ```typescript
   // 初始声明：let x : string | number （x为这两种类型之一）
   let x = Math.random() < 0.5 ? 10 : 'hello world'
   
   // 此时x为number类型
   x = 1
   console.log(x)
   
   // 此时x为string类型
   x = 'goodbye!'
   console.log(x)
   
   // 报错：x不能为boolean类型，因为它不是声明类型的一部分
   x = true

------

### 3.7 控制流分析

1. 控制流分析：基于可达性的代码分析。案例中padding初始类型有两个，但由于有if分支，TS判断如果走上面分支，说明padding肯定为number类型，则下面分支“不可达”，自动判断下面分支的padding类型为string

   ```typescript
   function padLeft(padding: number | string, input: string) {
     if (typeof padding === 'number') {
       // 这里的padding类型为number
       return new Array(padding + 1).join(' ') + input
     }
     // 这里的padding类型为string
     return padding + input
   }
   ```

2. 当一个变量被分析时，控制流可以一次又一次地分裂和重新合并，该变量可以被观察到在每个点上有不同的类型

   ```typescript
   function example() {
     let x: string | number | boolean
   
     x = Math.random() < 0.5
     // x类型为boolean
     console.log(x)
     // 这个if判断，使x的boolean被剥离
     if (Math.random() < 0.5) {
       x = 'hello'
       // x类型为string
       console.log(x)
     } else {
       x = 100
       // x类型为number
       console.log(x)
     }
     // 返回值x的类型只能是：string | number
     return x
   }
   
   let x = example()	// x：string | number
   x = 'hello'			// 不报错，属于string类型
   x = 100				// 不报错，属于number类型
   x = true			// 报错，属于boolean类型
   ```

------

### 3.8 类型谓词

> 作用：更直接地控制整个代码中的类型变化

1. 语法：`parameterName is Type`，其中`parameterName`必须是当前函数签名中的参数名称

   ```typescript
   type Fish = {
     name: string
     swim: () => void
   }
   
   type Bird = {
     name: string
     fly: () => void
   }
   
   // pet is Fish 是类型谓词，返回boolean值
   function isFish(pet: Fish | Bird): pet is Fish {
     // 如果是Fish，返回true，否则返回false
     return (pet as Fish).swim !== undefined
   }
   ```

2. 当isFish被调用时，如果原始类型是兼容的，TypeScript将把该变量缩小到该特定类型

   ```typescript
   function getSmallPet(): Fish | Bird {
     let fish: Fish = {
       name: 'sharkey',
       swim: () => {
           // ......
       }
     }
   
     let bird: Bird = {
       name: 'sparrow',
       fly: () => {
           // ......
       }
     }
     // 始终返回bird
     return true ? bird : fish
   }
   
   let pet = getSmallPet()	// bird
   
   // 返回false
   if (isFish(pet)) {
     pet.swim()
   } else {
     pet.fly()
   }
   ```

3. 使用类型守卫 isFish 来过滤`Fish | Bird`的数组，获得Fish的数组

   ```typescript
   const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()]
   const underWater1: Fish[] = zoo.filter(isFish)
   // 等同于
   const underWater2: Fish[] = zoo.filter(isFish) as Fish[]
   // 对于更复杂的例子，该谓词可能需要重复使用
   const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
     if (pet.name === 'frog') {
       return false
     }
     return isFish(pet)
   })
   ```

------

### 3.9 受歧视的unions

> 如果想使用联合类型，最好将其定义得较为完整一些，不要留下存在`null`的隐患

1. 问题：定义Shape接口，用于定义圆和方形，计算该形状的面积，但是由于包含可选属性，TS会判断该属性可能未定义

   ```typescript
   interface Shape {
     kind: 'circle' | 'square'
     radius?: number
     sideLength?: number
   }
   
   function getArea(shape: Shape) {
     if (shape.kind === 'circle') {
       // 报错：即使已经声明了kind属于'circle'类型，但radius可能未定义
       // 解决：可以使用非空断言符!来声明redius不是null或undefined，但这样不利于后期修改
       return Math.PI * shape.radius ** 2
     }
   }
   ```

2. 解决：将圆和方形的接口分开定义，然后使用类型别名将其联合

   ```typescript
   interface Circle {
     kind: 'circle'
     radius: number
   }
   
   interface Square {
     kind: 'square'
     sideLength: number
   }
   
   type Shape = Circle | Square
   
   // 这样就不会再次报错
   function getArea(shape: Shape) {
     if (shape.kind === 'circle') {
       return Math.PI * shape.radius ** 2
     }
   }
   
   // 也可以用Switch语句实现
   function getArea(shape: Shape) {
     switch(shape.kind) {
       case 'circle':
         return Math.PI * shape.radius ** 2
       case 'square':
         return shape.sideLength ** 2
     }
   }
   ```

------

### 3.10 never类型与穷尽性检查

1. `never`类型：表示不应该存在的状态，never类型可以分配给每个类型，但没有任何类型可以分配给never（除了never本身）

   ```typescript
   interface Circle {
     kind: 'circle'
     radius: number
   }
   
   interface Square {
     kind: 'square'
     sideLength: number
   }
   
   type Shape = Circle | Square
   
   function getArea(shape: Shape) {
     switch(shape.kind) {
       case 'circle':
         return Math.PI * shape.radius ** 2
   
       case 'square':
         return shape.sideLength ** 2
       
   	// 如果传入的shape不属于Circle或Square，那么就可以用never表示，返回传入的参数obj
       default:
         const _exhaustiveCheck: never = shape
         return _exhaustiveCheck
     }
   }
   const result = getArea({kind: 'triangle',sideLength: 12})
   console.log(result)
   ```

------

## 第4章 函数

### 4.1 函数类型表达式

> 用于描述一个函数，语法类似箭头函数

1. `(a: string) => void`：意味着有一个参数的函数，名为a，类型为字符串，没有返回值；如果没有指定参数类型，它就隐含为 any 类型

   ```typescript
    // 可以用一个类型别名来命名一个函数类型
   type GreetFunction = (a: string) => void
   
   function greeter(fn: GreetFunction) {
     fn('Hello, World')
   }
   
   function printToConsole(s: string) {
     console.log(s)
   }
   
   greeter(printToConsole)
   ```

------

### 4.2 调用签名

1. 调用签名：由于函数类型表达式中不允许声明属性，可以用调用签名描述可调用的东西（实现和属性相同的效果）

   ```typescript
   // 语法：在参数列表和返回类型之间使用冒号 : 而不是箭头 =>
   type DescribableFunction = {
     description: string
     (someArg: number): boolean
   }
   
   function doSomething(fn: DescribableFunction) {
     console.log(fn.description + ' returned ' + fn(6))
   }
   
   function fn1(n: number) {
     console.log(n)
     return true
   }
   fn1.description = 'hello'
   
   doSomething(fn1)
   ```

------

### 4.3 构造签名

1. 语法：先定义构造函数，在调用签名前加`new`关键字，会创建一个新对象

   ```typescript
   class Ctor {
     s: string
     constructor(s: string) {
       this.s = s
     }
   }
   
   type SomeConstructor = {
     new (s: string): Ctor
   }
   
   function fn(ctor: SomeConstructor) {
     return new ctor('hello')
   }
   
   const f = fn(Ctor)
   console.log(f.s)
   ```

2. 有些JS对象（如Date）可以在有new或没有new的情况下被调用，可以在同一类型中任意地结合调用和构造签名

   ```typescript
   interface CallOrConstructor {
     new (s: string): Date
     (n?: number): number
   }
   
   function fn(date: CallOrConstructor) {
     let d = new date('2021-12-20')
     let n = date(100)
   }
   ```

------

### 4.4 泛型函数

> 泛型：把两个或多个具有相同类型的值联系起来

- 作用：描述值之间的对应关系

   1）希望输入的参数和返回值有某种联系，但是不确定类型，可以使用any，但风险很高

   ```typescript
   function firstElement(arr: any[]) {
     return arr[0]
   }
   
   firstElement(['a', 'b', 'c'])
   ```

   2）使用泛型可以解决这个问题，可以在函数的输入和输出之间建立联系，类型不受限制

   ```typescript
   function firstElement<Type>(arr: Type[]): Type | undefined {
     return arr[0]
   }
   // s 是 'string' 类型
   const s = firstElement(['a', 'b', 'c'])
   // n 是 'number' 类型
   const n = firstElement([1, 2, 3])
   // u 是 undefined 类型
   const u = firstElement([])
   ```

#### 4.4.1 类型推断

1. TypeScript可以推断出输入类型参数的类型（从给定的字符串数组），以及基于函数表达式的返回值（数字）的输出类型参数

   ```typescript
   function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
     return arr.map(func)
   }
   
   const parsed = map(['1', '2', '3'], (n) => parseInt(n))
   ```

------

#### 4.4.2 限制条件

1. 应用场景：想把两个值联系起来，但只能对某个值的子集进行操作

2. 解决：使用一个约束条件来限制一个类型参数可以接受的类型

   1）将Type约束为`{length:number}`，所以允许访问a和b参数的`length`属性

   2）如果没有类型约束，就不能访问这些属性，因为这些值可能是一些没有长度属性的其他类型

   3）TS可以自动推断longest的返回类型，返回类型推断也适用于通用函数

   ```typescript
   // 意思是：传入的参数a、b必须具有length属性
   function longest<Type extends { length: number }>(a: Type, b: Type) {
     if (a.length >= b.length) {
       return a
     } else {
       return b
     }
   }
   
   // longerArray 的类型是 'number[]'
   const longerArray = longest([1, 2], [2, 3, 4])
   // longerString 是 'alice'|'bob' 的类型
   const longerString = longest("alice", "bob")
   // 报错：数字没有'长度'属性
   const notOk = longest(10, 100)
   ```

3. 使用受限制的注意事项：以下案例中函数承诺返回与传入的对象相同的类型，而不仅仅是与约束条件相匹配的一些对象

   1）传入的obj参数是[1, 2, 3]，属于数组类型，那么函数返回值也必须为数组类型

   2）但是根据if判断，返回值为对象`{ length: minimum }`

   ```typescript
   function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
     if (obj.length >= minimum) {
       return obj
     } else {
       // 报错：不能将类型“{ length: number; }”分配给类型“Type”
       return { length: minimum }
     }
   }
   
   const arr = minimumLength([1, 2, 3], 6)
   ```

------

#### 4.4.3 指定类型参数

1. TypeScript通常可以推断出通用调用中的预期类型参数，但并非总是如此

   ```typescript
   function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
     return arr1.concat(arr2)
   }
   ```

2. 问题：用不匹配的数组调用这个函数是一个错误

   ```typescript
   // 报错：不能将类型"string"分配给类型"number"
   const arr = combine([1, 2, 3], ["hello"])
   ```

3. 解决：手动指定类型

   ```typescript
   const arr = combine<string | number>(["string"], [1, 2, 3])
   ```

------

#### 4.4.4 编写函数准则

1. 参数类型下推：使用类型参数本身，而不是对其进行约束

   1）firstElement1是更好的写法，它的推断返回类型是Type

   2）firstElement2的推断返回类型是any，因为TypeScript必须使用约束类型来解析arr[0]表达式，而不是在调用期间"等待"解析该元素

   ```typescript
   // 推荐
   function firstElement1<Type>(arr: Type[]) {
     return arr[0]
   }
   // 不推荐
   function firstElement2<Type extends any[]>(arr: Type) {
     return arr[0]
   }
   // a: number
   const a = firstElement1([1, 2, 3])
   // b: any 
   const b = firstElement2([1, 2, 3])
   ```

2. 总是尽可能少地使用类型参数：

   ```typescript
   // 推荐
   function filter1<Type>(arr: Type[], func: (arg: Type) => boolean) {
     return arr.filter(func)
   }
   // 不推荐
   function filter2<Type, Func extends (arg: Type) => boolean> (
     arr: Type[],
     func: Func
   ) {
     return arr.filter(func)
   }
   ```

3. 类型参数应出现两次：如果一个类型的参数只出现在一个地方，请重新考虑是否真的需要它

   ```typescript
   // 不推荐
   function greet<Str extends string>(s: Str) {
     console.log('Hello, ' + s)
   }
   // 推荐，简洁版
   function greet(s: string) {
     console.log('Hello, ' + s)
   }
   ```

------

### 4.5 可选参数

#### 4.5.1 问号标记

1. 语法：将参数用 `?` 标记，x参数实际上将具有`number | undefined`类型

   ```typescript
   function f(n?: number) {
     console.log(n.toFixed())	// 无需传递参数
     console.log(n.toFixed(3))	// 需要传递参数
   }
   
   f(123.45)
   f()

2. 也可以提供一个参数默认值：

   ```typescript
   function f(n: number=100) {
     // ......
   }
   ```

------

#### 4.5.2 回调函数中的可选参数

1. 原则：当为回调写一个函数类型时，永远不要写一个可选参数，除非打算在不传递该参数的情况下调用函数

2. 案例：

   1）定义一个模仿数组forEach功能的函数，希望index参数是可选的

   ```typescript
   function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
     for (let i = 0; i < arr.length; i++) {
       callback(arr[i], i)
       callback(arr[i])
     }
   }
   ```

   2）当不涉及对index进行操作时，函数可以正常运行

   ```typescript
   myForEach([1, 2, 3], (a) => console.log(a))
   myForEach([1, 3, 4], (a, index) => console.log(a, index))
   ```

   3）当涉及对index进行操作时，TS会报错：对象可能是undefined

   ```typescript
   myForEach([1, 2, 3], (a, index) => {
     console.log(index.toFixed())
   })
   ```

------

### 4.6 函数重载

> 应用场景：函数可以在不同的参数数量和类型中被调用

1. 重载签名：指定一个可以以不同方式调用的函数

2. 引子：

   ```typescript
   // 重载签名：接受1个参数
   function makeDate(timestamp: number): Date
   // 重载签名：接受3个参数
   function makeDate(m: number, d: number, y: number): Date
   
   // 实现签名：虽然d和y都是可选的，但要参考重载签名的定义，不能以两个参数被调用，要么传1个、要么传3个参数
   function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
     if (d !== undefined && y !== undefined) {
       return new Date(y, mOrTimestamp, d)
     } else {
       return new Date(mOrTimestamp)
     }
   }
   
   const d1 = makeDate(12345678)
   const d2 = makeDate(5, 6, 7)
   // 报错：没有需要2参数的重载，但存在需要1或3参数的重载
   const d3 = makeDate(5, 9)
   ```

#### 4.6.1 重载签名与实现签名

> 实现签名的类型编写原则应该兼容所有重载函数的定义，类似于索引签名

1. 参数不正确：

   ```typescript
   // 重载签名
   function fn(x: string): void
   // 实现签名（参数啥也不写，默认推断为隐式any）
   function fn() {}
   
   fn()	// 报错：不能以零参数调用，必须传入1个参数
   fn('hello')
   ```

2. 参数类型不正确：

   ```typescript
   // 重载签名
   function fn(x: boolean): void
   function fn(x: string): void
   
   // 实现签名
   // 报错：上面的fn(x: string)提示，此重载签名与实现签名不兼容
   function fn(x: boolean) {
       // ......
   }
   // 解决：有两个或多个签名
   function fn(x: boolean | string) {
       // ......
   }
   ```

3. 返回类型不正确：

   ```typescript
   // 重载签名
   function fn(x: string): string
   function fn(x: boolean): boolean
   
   // 实现签名
   // 报错：函数实现缺失或未立即出现在声明之后
   function fn(x: string | boolean): {
     return 'hello'
   }
   // 解决：对返回值类型进行声明
   function fn(x: string | boolean): string | boolean {
     return 'hello'
   }
   ```

------

#### 4.6.2 编写重载准则

> 原则：尽量使用联合类型的参数，而不是重载参数

1. TS只能将【一个】函数调用解析为【一个】重载：

   ```typescript
   // 重载签名
   function len(s: string): number
   function len(arr: any[]): number
   // 实现签名
   function len(x: any) {
     return x.length
   }
   
   // 正常运行
   len('hello')
   len([1, 2, 3])
   
   // 报错：这里传入的参数类型被解析为：'hello' | number[]，是一个联合类型
   // 这个联合类型不属于string或any[]中任一类型，所以报错
   len(Math.random() > 0.5 ? 'hello' : [4, 5, 6])
   ```

2. 解决：将参数改造为联合类型

   ```typescript
   // 实现签名
   function len(x: any[] | string) {
     return x.length
   }
   
   len('hello')
   len([1, 2, 3])
   len(Math.random() > 0.5 ? 'hello' : [4, 5, 6])
   ```

------

#### 4.6.3 函数内This声明

> 在TS中，可以给函数传递名为`this`的参数（JS不能这样做），但不能是箭头函数

1. 常规用法：

   ```typescript
   const user = {
     id: 123,
     admin: false,
     becomeAdmin: function () {
       this.admin = true
     },
   }
   user.becomeAdmin()
   console.log(user.admin)	// true
   ```

2. TS特性：可以在函数体中声明 this 的类型，注意不能使用箭头函数

   ```typescript
   interface User {
     admin: boolean
   }
   
   interface DB {
     // 定义名为filterUsers的函数，返回User类型的数组
     // 传入名为filter的函数，其中接收this参数，类型为User，返回布尔值
     filterUsers(filter: (this: User) => boolean): User[]
   }
   
   const db: DB = {
     filterUsers: (filter: (this: User) => boolean) => {
       let user1: User = {
         admin: true,
       }
   
       let user2: User = {
         admin: false,
       }
   
       return [user1, user2]
     },
   }
   // 传入filter函数参数
   const admins = db.filterUsers(function (this: User) {
     return this.admin
   })
   
   /* const admins = db.filterUsers((this: User) => {
     return this.admin
   }) */
   
   console.log(admins)
   ```

------

### 4.7 处理函数的常用类型

#### 4.7.1 void

1. `void`：表示没有返回值的函数的返回值。当一个函数没有任何返回语句，或者没有返回任何明确的值时，它都是推断出来的类型

   ```typescript
   // 推断出的返回类型是void
   function noop() {
     return
   }
   ```

2. 在JavaScript中，一个不返回任何值的函数将隐含地返回`undefinded`，但是在TS中`void`与`undefined`不同

3. 使用`type`来定义返回值为`void`类型的函数：可以写任意返回值，但是会被忽略（写了也白写）

   ```typescript
   type voidFunc = () => void
   
   // 以下三种实现函数的方法，都可以写返回值，但是相当于白写
   const f1: voidFunc = () => {
     return true
   }
   
   const f2: voidFunc = () => true
   
   const f3: voidFunc = function () {
     return true
   }
   
   // 这里的返回值类型依然是void，而不是boolean
   const v1: void = f1()
   const v2: void = f2()
   // 报错：返回值类型为void
   const v3: boolean = f3()
   ```

4. 直接定义函数的返回值为`void`类型：不可以写返回值，写了会报错

   ```typescript
   // 以下两种写法提示报错，不能写返回值！
   function f4(): void {
     return true
   }
   
   const f5 = function (): void {
     return true
   }
   
   // 正确写法
   function f4(): void {}
   const f5 = function (): void {}
   ```

------

#### 4.7.2 object

> `object`（第一个字母小写）与`Object`不同，常用小写的`object`

1. 特殊类型`object`：指任何不是基元的值（string、number、bigint、boolean、symbol、null、undefined）
2. 与空对象类型`{}`不同，也与全局类型`Object`(大写O)不同（一般不会用`Object`）
3. 函数类型在TS中被认为是`object`

------

#### 4.7.3 unknown

1. `unknown`：代表任何值。与any类型类似，但更安全，对unknown值做任何事情都是不合法的

   ```typescript
   // 正确
   function f1(a: any) {
     a.b()
   }
   
   // 错误：对象类型为unknown
   function f2(a: unknown) {
     a.b()
   }
   ```

2. 可以描述接受任何值的函数，而不需要在函数体中有any值，也可以描述一个返回未知类型的值的函数

   ```typescript
   function safeParse(s: string): unknown {
     return JSON.parse(s)
   }
   // 需要小心对待'obj'
   const obj = safeParse('someRandomString')
   ```

------

#### 4.7.4 never

1. `never`：表示永远不会被观察到的值。在一个返回类型中，这意味着函数抛出一个异常或终止程序的执行

   ```typescript
   function fail(msg: string): never {
     throw new Error(msg)
   }
   ```

2. never也出现在TypeScript确定一个union中没有任何东西的时候

   ```typescript
   function fn(x: string | number) {
     if (typeof x === 'string') {
       // ......
     } else if (typeof x === 'number') {
       // ......
     } else {
       x // 'never'类型
     }
   }
   ```

------

#### 4.7.5 Function

1. 全局性的`Function`：描述了诸如`bind`、`call`、`apply`和其他存在于JavaScript中所有函数值的属性

2. Function类型的值总是可以被调用，这些调用返回any，但一般不要使用它，因为any不安全

   ```typescript
   function doSomething(f: Function) {
     return f(1, 2, 3)
   }
   ```

3. 如果需要接受一个任意的函数，但不打算调用它，`() => void`的类型比较安全

------

### 4.8 参数展开运算符

#### 4.8.1 形参展开(Rest Parameters)

> Rest参数：定义接受无限制数量的参数的函数

1. rest参数出现在所有其他参数之后，使用`...`的语法

   ```typescript
   function multiply(n: number, ...m: number[]) {
     return m.map( x => n * x )
   }
   
   const a = multiply(10, 1, 2, 3, 4, 60, 100)
   
   console.log(a)	// [10, 20, 30, 40, 600, 1000] 
   ```

2. 这些参数的类型注解是隐含的`any[]`，而不是any，任何给出的类型注解必须是`Array<T>`或`T[]`的形式，或一个元组类型

------

#### 4.8.2 实参展开(Rest Arguments)

> spread语法：从数组中提供可变数量的参数

1. 案例：数组的push方法需要任意数量的参数

   ```typescript
   const arr1 = [1, 2, 3]
   const arr2 = [4, 5, 6]
   arr1.push(...arr2)
   console.log(arr1)	// [1, 2, 3, 4, 5, 6]
   ```

2. TS会将实参展开的类型自动判断为`numbers[]`或`string[]`，但长度不固定

3. `as const`可以解决数组长度不固定的问题，相当于转换为元祖

   ```typescript
   const args = [8, 5] as const
   // Math.atan2只能接收2个参数
   const angle = Math.atan2(...args)
   ```

------

### 4.9 参数解构

1. 作用：方便地将作为参数提供的对象，解压到函数主体的一个或多个局部变量中

   ```typescript
   function sum({ a, b, c }: { a: number; b: number; c: number }) {
     console.log(a + b + c)
   }
   
   sum({
     a: 10,
     b: 3,
     c: 9,
   })
   ```

2. 可以使用类型别名，简化代码

   ```typescript
   type ABC = { a: number; b: number; c: number }
   
   function sum({ a, b, c }: ABC) {
     console.log(a + b + c)
   }
   
   sum({
     a: 10,
     b: 3,
     c: 9,
   })
   ```

3. 注意：不能只将类型注释放在解构模式中，因为这种语法已经在JS中有不同含义

   1）`shape:Shape`意味着获取属性shape，并在本地重新定义为一个名为Shape的变量

   2）`xPos:number`意味着创建一个名为number的变量，其值基于参数的xPos

   ```typescript
   function render(args: Shape | number) {}
   
   // 报错：Shape：未取消使用任何解构元素。绑定元素“Shape”隐式具有“any”类型。
   function draw({ shape: Shape, xPos: number = 100 }) {
     render(shape)
     // 报错：xPos：找不到名称“xPos”
     render(xPos)
   }
   ```

------

## 第5章 对象类型

1. 匿名对象：

   ```typescript
   function greet(person: { name: string, age: number }) {
     return 'Hello ' + person.name
   }
   ```

2. 使用接口定义对象：

   ```typescript
   interface Person {
     name: string
     age: number
   }
   
   function greet(person: Person) {
     return 'Hello ' + person.name
   }
   ```

3. 使用类型别名定义对象：

   ```typescript
   type Person = {
     name: string
     age: number
   }
   
   function greet(person: Person) {
     return 'Hello ' + person.name
   }
   ```

------

### 5.1 属性修改器

#### 5.1.1 可选属性

1. 语法：在属性名称后加问号`?`，表示属性可选

   ```typescript
   type Shape = {}
   
   interface PaintOptions {
     shape: Shape,
     xPos?: number,
     yPos?: number
   }
   
   function paintShape(opts: PaintOptions) {
     // ......
   }
   
   const shape: Shape = {}
   paintShape({ shape })
   paintShape({ shape, xPos: 100})
   paintShape({ shape, yPos: 100})
   paintShape({ shape, xPos: 100, yPos: 100})
   ```

2. 如果在`strictNullChecks`开启的模式下，可选属性的类型可能属于undefined

   ```typescript
   // 问题：可选属性可能为undefined
   function paintShape(opts: PaintOptions) {
     let xPos = opts.xPos
     let yPos = opts.yPos
     console.log(xPos)
   }
   ```

   1）解决方案1：加判断条件

   ```typescript
   // 加判断条件
   function paintShape(opts: PaintOptions) {
     let xPos = opts.xPos === undefined ? 0 : opts.xPos
     let yPos = opts.yPos === undefined ? 0 : opts.yPos
     console.log(xPos)
   }
   ```
   
   2）解决方法2：设置默认值
   
   ```typescript
   function paintShape({ shape: Shape, xPos: number = 0, yPos = 0 }: PaintOptions) {
     console.log("x coordinate at", xPos)
     console.log("y coordinate at", yPos)
   }
   ```

------

#### 5.1.2 只读属性

1. 语法：在属性前加`readonly`，不能被更改

   ```typescript
   interface SomeType {
     readonly prop: string
   }
   
   function doSomething(obj: SomeType) {
     // 可以读取
     console.log(obj.prop)
     // 不能重新设置值
     // obj.prop = 'hello'
   }
   ```

2. 只读属性只意味着该属性本身不能被重新写入，但是可以巧用其他方法进行修改：

   ```typescript
   interface Home {
     readonly resident: {
       name: string
       age: number
     }
   }
   
   function visitForBirthday(home: Home) {
     // 可以从'home.resident'读取和更新属性
     console.log(home.resident.name)
     home.resident.age++
   }
   
   function evict(home: Home) {
     // 但是不能写到'home'上的'resident'属性本身
     home.resident = {
       name: 'Felix',
       age: 18
     }
   }
   ```

3. readony属性也可以通过别名来改变：TS在检查两个类型的属性是否兼容时，并不考虑这些类型的属性是否是只读的

   ```typescript
   interface Person {
     name: string
     age: number
   }
   
   interface ReadonlyPerson {
     readonly name: string
     readonly age: number
   }
   
   let writablePerson: Person = {
     name: 'Felix',
     age: 18,
   }
   
   // 正常工作
   let readonlyPerson: ReadonlyPerson = writablePerson
   
   console.log(readonlyPerson.age)	//18
   writablePerson.age++
   console.log(readonlyPerson.age)	//19
   ```

------

#### 5.1.3 索引签名

> 索引签名的属性类型必须是`string`或`number`

1. 应用场景：不确定对象中有多少属性，但知道属性名和属性值的类型

2. 语法：`[indexName: string | number] : string | number`

   1）数字索引器：定义的对象属性为数字类型，可以用数字进行索引，类似于`obj[n]`

   ```typescript
   interface StringArray {
     [index: number]: string
   }
   
   const myArray: StringArray = ['a', 'b']
   console.log(myArray[0])	// 'a'
   
   const myObj: StringArray = {
     1: 'hello',
     4: 'world',
   }
   console.log(myObj[4])	// 'world'
   ```

   2）字符串索引器：定义的对象属性为字符串类型，可以用字符串进行索引，类似于`obj['name']`

   ```typescript
   interface TestString {
     [props: string]: number
   }
   
   let testString: TestString = {
     x: 100,
     y: 200,
   }
   ```

   3）两者可以相结合使用

   ```typescript
   interface Test {
     [whatever: string | number]: string | number
   }
   
   let test: Test = {
     12: 156,
     58: 'today'
     age: 18,
     hobby: 'football',
   }
   ```
   


3. 从字符串索引器返回的类型必须是数字索引器返回的类型的子类型：

   ```typescript
   interface Animal {
     name: string
   }
   
   interface Dog extends Animal {
     breed: string
   }
   
   interface Zoo {
     [index: string]: Animal,
     [index: number]: Dog,
   }
   
   // 这样写会报错
   // interface Zoo {
   //   [index: string]: Dog,
   //   [index: number]: Animal,
   // }
   ```

4. 索引签名下方，可以继续定义其他属性的类型，但需要注意不能和索引签名冲突

   1）正常：

   ```typescript
   interface Test {
     [index: string]: number | string
     length: number
     name: string
   }
   
   let test: Test = {
     x: 100,
     y: 200,
     z: 300,
     length: 100,
     name: 'felix',
   }
   ```

   2）报错：由于索引签名已经定义了属性名为string的情况，其属性值类型为number，而name也属于这种情况，但属性值为string，发生冲突

   ```typescript
   interface NotOkay {
     [index: string]: number
     length: number
     // 报错：冲突：name对应的属性值类型应该为number
     name: string
   }
   ```

5. 只读索引签名：添加`readonly`，防止通过其索引赋值

   ```typescript
   interface ReadonlyStringArray {
     readonly [index: number]: string
   }
   
   let myArray2: ReadonlyStringArray = ['a', 'b']
   // 报错：无法赋值
   myArray2[0] = 'felix'

------

### 5.2 扩展类型

> 扩展类型的本质：`interface extends`

1. 在已有接口的基础上拓展：

   ```typescript
   interface BasicAddress {
     name?: string
     street: string
     city: string
     country: string
     postalCode: string
   }
   
   interface AddressWithUnit extends BasicAddress {
     unit: string
   }
   
   let awu: AddressWithUnit = {
     unit: '3单元',
     street: '清河街道',
     city: '北京',
     postalCode: '100000',
     country: '中国',
     name: ''
   }
   ```

2. 扩展多个接口：

   ```typescript
   interface Colorful {
     color: string
   }
   interface Circle {
     radius: number
   }
   
   interface ColorCircle extends Colorful, Circle {
       // ......
   }
   
   const cc: ColorCircle = {
     color: 'red',
     radius: 100
   }
   ```

------

### 5.3 交叉类型

> 交叉类型的本质：重名interface会自动添加新字段，重名type不会添加新字段，要用`&`来合并不同接口添加新字段

1. 命名定义type：

   ```typescript
   interface Colorful {
     color: string
   }
   
   interface Circle {
     radius: number
   }
   // 命名定义
   type ColorfulCircle = Colorful & Circle
   
   const cc: ColorfulCircle = {
     color: 'red',
     radius: 100,
   }
   ```

2. 匿名定义type：

   ```typescript
   // 匿名定义
   function draw(circle: Colorful & Circle) {
     console.log(circle.color)
     console.log(circle.radius)
   }
   
   draw({
     color: 'red',
     radius: 100,
   })
   
   draw({
     color: 'green',
     rdaius: 100, // 报错：拼写错误会检查出来
   })
   ```

3. 重名interface会自动添加新字段：

   ```typescript
   interface Sister {
     name: string
   }
   
   interface Sister {
     age: number
   }
   
   const sister1: Sister = {
     name: 'sisterAn',
     age: 20,
   }
   ```

4. 重名type不会添加新字段：

   ```typescript
   type Sister = {
     name: string
   }
   // 报错：标识符“Sister”重复
   type Sister = {
   
   }
   ```

------

### 5.4 泛型对象类型

1. 引子：想定义一个通用的接口，可以自由传入不同类型的值

   1）使用any：虽然也可以实现，但是风险很高

   ```typescript
   // any会带来很大风险，不推荐
   interface Box {
     contents: any
   }
   
   let box: Box = {
     contents: 'hello',
   }
   ```

   2）使用unknown：需要做预防性检查或类型断言，很麻烦

   ```typescript
   // unknown如果处理需要提前做判断，很麻烦
   interface Box {
     contents: unknown
   }
   
   let x: Box = {
     contents: 'hello world',
   }
   
   if (typeof x.contents === 'string') {
     console.log(x.contents.toLowerCase())
   }
   
   console.log((x.contents as string).toLowerCase())
   ```

2. 解决：使用泛型，可以自由在外侧定义内部类型

   ```typescript
   // 使用泛型
   interface Box<Type> {
     contents: Type
   }
   // 普通接口
   interface StringBox {
     contents: string
   }
   
   // 泛型：可以随意定义contents的类型
   let boxA: Box<number> = {
     contents: 100
   }
   // 普通接口：contents只能是number类型
   let boxB: StringBox = {
     contents: 100
   }
   ```

3. 理解：Type是一个占位符，会被替换成其他类型，泛型接口可以重复使用，而无需重新建立

   ```typescript
   interface Box<Type> {
     contents: Type
   }
   
   interface Apple {
     // ...
   }
   
   type AppleBox = Box<Apple> // 等价于 '{ contents: Apple }'
   let ab: AppleBox = {
     contents: a,
   }
   ```

4. 函数重载中的应用：可以大幅简化代码，无需函数重载便可实现功能

   1）普通函数重载：定义一个通用函数，可以传入number或string或boolean类型的值，这样写非常麻烦

   ```typescript
   // 重载签名
   interface NumberBox {
     contents: number
   }
   interface StringBox {
     contents: string
   }
   interface BooleanBox {
     contents: boolean
   }
   
   function setContents(box: StringBox, newContents: string): void
   function setContents(box: NumberBox, newContents: number): void
   function setContents(box: BooleanBox, newContents: boolean): void
   
   // 实现签名
   function setContents(box: { contents: any }, newContents: any) {
     box.contents = newContents
   }
   ```
   2）使用泛型：直接定义泛型接口，一步到位实现通用函数

   ```typescript
   interface Box<Type> {
     contents: Type
   }
   
   function setContents(box: Box<Type>, newContents: Type) {
     box.contents = newContents
   }
   ```

5. 类型别名`type`中的应用：

   1）基本用法：与定义泛型接口一样

   ```typescript
   type Box<Type> = {
     contents: Type
   }
   ```

   2）与接口的区别：不仅可以描述对象类型，还可以用它来编写其他类型的通用辅助类型

   ```typescript
   type OrNull<Type> = Type | null
   type OneOrMany<Type> = Type | Type[]
   type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>
   type OneOrManyOrNullString = OneOrManyOrNull<string>

------

### 5.5 数组类型

1. 语法：`number[]`、`string[]`、`Array<numebr>`、`Arrray<string>`

   ```typescript
   function doSomething(value: Array<string>) {
     // ...
   }
   
   let myArray: string[] = ['hello', 'world']
   
   doSomething(myArray)
   doSomething(new Array('hello', 'world'))
   ```

2. `Array`本身也是一个通用类型：

   ```typescript
   // 数组的本质也是个接口，Array也可以改成其他名字
   interface Array<Type> {
     lenght: number
     pop(): Type | undefined
     push(...item: Type[]): number
   }
   ```

3. 拓展：其他通用的数据结构

   ```typescript
    Map<K, V>, Set<T>, Promise<T>
   ```

------

### 5.6 只读数组类型

1. `ReadonlyArray<Type>`：特殊的类型，描述了不应该被改变的数组

   1）普通语法：`ReadonlyArray<Type>`

   ```typescript
   function doStuff(values: ReadonlyArray<string>) {
     const copy = values.slice()
     console.log(values[0])
     // 报错：类型“readonly string[]”上不存在属性“push”
     values.push('hello')
   }
   ```

   2）速记语法：`readonly type[]`

   ```typescript
   function doStuff(values: readonly string[]) {
     const copy = values.slice()
     console.log(values[0])
     // 报错：类型“readonly string[]”上不存在属性“push”
     values.push('hello')
   }
   ```

2. 与`Array`的区别：

   1）不可以使用`new`来创建只读数组

   ```typescript
   // 报错：“ReadonlyArray”仅表示类型，但在此处却作为值使用
   new ReadonlyArray('red', 'green', 'blue')
   ```

   2）可以将普通的`Array`分配给`ReadonlyArray`

   ```typescript
   const roArray: ReadonlyArray<string> = ['red', 'green', 'blue']
   ```

   3）仅可以将只读数组赋值给普通数组，而不能反向操作

   ```typescript
   let x: readonly string[] = []
   let y: string[] = []
   
   x = y
   // 报错：类型 "readonly string[]" 为 "readonly"，不能分配给可变类型 "string[]
   y = x
   ```

------

### 5.7 元祖类型 tuple

1. 定义：元祖就是长度和类型都固定的数组

   ```typescript
   // 参数pair就属于元祖类型，要求里面只能有2个元素，且第一个必须是string，第二个必须是number
   function doSomething(pair: [string, number]) {
     const a = pair[0]
     const b = pair[1]
     const c = pair[2]	// 报错：引用了超出元祖长度的元素
   }
   ```

2. 元祖解构：

   ```typescript
   function doSomething(stringHash: [string, number]) {
     const [inputString, hash] = stringHash
   }
   ```

3. 利用接口定义元祖：必须要用`length`属性固定长度，并定义可以操作元祖的方法

   ```typescript
   interface StringNumberPair {
     // 专有属性：定义固定长度
     length: 3
     // 为索引声明属性
     0: string
     1: number
     2: number
     // 定义slice方法，返回数组
     slice(start?: number, end?: number): Array<string | number>
   }
   
   function test(a: StringNumberPair) {
       console.log(a[1])	// 8
       console.log(a.slice(1,3))	//[8,100]
   }
   
   test(['a', 8, 100])
   ```

4. 可选元素：在元素类型后添加`?`，只能出现在末尾，会影响`length`属性

   ```typescript
   type Either2dOr3d = [number, number, number?]
   
   function setCoordinate(coord: Either2dOr3d) {
     const [x, y, z] = coord
     console.log(coord.length)
   }
   
   setCoordinate([3, 4])		// 2
   setCoordinate([3, 4, 5])	// 3
   ```

5. 其余元素：元祖可以有其余元素（长度不受限制），这些元素必须是`array`或`tuple`类型的

   ```typescript
   // 前两个元素分别是字符串和数字，后面可以有任意数量的布尔值
   type StringNumberBooleans = [string, number, ...boolean[]]
   // 第一个元素是字符串，然后是任意数量的布尔值，最后是一个数字
   type StringBooleansNumber = [string, ...boolean[], number]
   // 第一个元素是布尔值，然后是一个字符串，最后是一个数字
   type BooleansStringNumber = [...boolean[], string, number]
   
   const a: StringNumberBooleans = ["hello", 1]
   const b: StringNumberBooleans = ["beautiful", 2, true]
   const c: StringNumberBooleans = ["world", 3, true, false, true, false, true]
   ```

6. 可选元素、其余元素存在的意义：允许TS将tuples与函数的参数列表相对应

   ```typescript
   function readButtonInput(...args: [string, number, ...boolean[]]) {
     const [name, version, ...input] = args
     console.log(name)
     console.log(version)
     console.log(input)
   }
   
   readButtonInput('hello', 10.5, true, false, false)
   ```

------

### 5.8 只读元祖类型

1. 语法：在元祖前添加`readonly`

   ```typescript
   function doSomething(pair: readonly [number, string]) {
     // 报错：无法分配到 "0" ，因为它是只读属性
     pair[0] = 100
   }
   ```

2. 带有`const`断言的数组：被推断为只读元组类型

   1）问题：虽然distanceFromOrigin没有修改元祖元素，但是期望一个可变的元组。由于point的类型被推断为只读的[3,4]，它与[number,number]不兼容，因为该类型不能保证point的元素不被修改

   ```typescript
   let point = [3, 4] as const	// 这里point被定义为只读元祖
   
   function distanceFromOrigin([x, y]: [number, number]) {
     return Math.sqrt(x ** 2 + y ** 2)
   }
   // 报错：类型 "readonly [3, 4]" 为 "readonly"，不能分配给可变类型 "[number, number]"
   distanceFromOrigin(point)
   ```

   2）解决：

   ```typescript
   let point: [number, number] = [3, 4]
   
   function distanceFromOrigin([x, y]: [number, number]) {
     return Math.sqrt(x ** 2 + y ** 2)
   }
   
   distanceFromOrigin(point)
   ```

------

## 第6章 类型操纵

> 泛型类型、keyof、typeof、索引访问类型、条件类型、映射类型、模板字面量类型

### 6.1 泛型

#### 6.1.1 泛型基本用法

1. 泛型可以定义通用函数：如可以使函数的输入和输出内容类型保持一致

   ```typescript
   function loggingIdentity<Type>(arg: Type): Type {
     return arg
   }
   ```

2. 调用泛型函数：

   1）方法1：手动指定类型

   ```typescript
   let output = loggingIdentity<number>(100)
   ```

   2）方法2：TS自动推断类型

   ```typescript
   let output = loggingIdentity(100)
   ```

3. 注意：如果在函数体内对参数进行了一些操作，需要注意泛型的定义是否兼容

   1）如果想在函数内访问arg的length属性，TS报错

   ```typescript
   function loggingIdentity<Type>(arg: Type): Type {
     console.log(arg.length)	// Type上不存在属性length
     return arg
   }
   ```

   2）需要将Type改造成具有length属性的类型

   ```typescript
   function loggingIdentity<Type>(arg: Array<Type>): Type[] {
     console.log(arg.length)
     return arg
   }
   ```
   3）也可以使用泛型约束
   
   ```typescript
   function loggingIdentity<Type extends { length: number }>(arg: Type): Type {
     console.log(arg.length) 
     return arg
   }
   ```

------

#### 6.1.2 泛型类型

1. 语法：

   1）方法1：普通用法

   ```typescript
   function identity<Type>(arg: Type): Type {
     return arg
   }
   let myIdentity: <Type>(arg: Type) => Type = identity
   ```

   2）方法2：泛型名称可以自定义

   ```typescript
   let myIdentity: <Input>(arg: Input) => Input = identity
   ```

   3）方法3：写成对象字面类型的调用签名

   ```typescript
   let myIdentity: { <Type>(arg: Type): Type } = identity
   ```

   4）方法4：写成接口

   ```typescript
   interface GenericIdentityFn {
     <Type>(arg: Type): Type
   }
   let myIdentity: GenericIdentityFn = identity

2. 对接口的改造：需要在外面定义类型，这样更加严谨

   ```typescript
   interface GenericIdentityFn<Type> {
     (arg: Type): Type
   }
   let myIdentity: GenericIdentityFn<string> = identity
   ```

------

#### 6.1.3 泛型类

1. tsconfig设置：由于会在类中声明未被定义的Type，所以调整设置使TS不报错

   ```typescript
   "strictPropertyInitialization": false
   ```

2. 语法：在类名后加`<Type>`

   ```typescript
   class GenericNumber<NumType> {
     zeroValue: NumType
     add: (x: NumType, y: NumType) => NumType
   }
   
   // NumType为number类型
   let myGeneric = new GenericNumber<number>()
   myGeneric.zeroValue = 0
   myGeneric.add = function (x, y) {
     return x + y
   }
   
   // NumType为string类型
   let myGeneric = new GenericNumber<string>()
   myGeneric.zeroValue = ''
   myGeneric.add = function (x, y) {
     return x + y
   }
   ```

------

#### 6.1.4 泛型约束 extends

1. 语法：在`Type`后使用`extends`关键字

   ```typescript
   interface Lengthwise {
     length: number
   }
   
   function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
     arg.length
     return arg
   }
   
   loggingIdentity(['hello', 'world'])
   ```

2. 在泛型约束中使用类型参数`keyof`：防止获取不存于与obj上的属性

   ```typescript
   function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
     return obj[key]
   }
   
   let x = {a: 1, b: 2, c: 3, d: 4,}
   
   getProperty(x, 'a')
   getProperty(x, 'm') // 报错：m不在x的键值中
   ```

------

#### 6.1.4 泛型中使用类类型

1. 复习：创建工厂

   ```js
   // JS实现：写一个函数，输入对象后，可以返回其实例
   function creatInstance(MyClassName) {
     return new MyClassName()
   }
   ```

   1）函数的构造签名

   ```typescript
   class Ctor {
     s: string
     constructor(s: string) {
       this.s = s
     }
   }
   // 写法1：
   type SomeConstructor = {
     new (s: string): Ctor
   }
   // 写法2：
   type SomeConstructor = new (s: string) => Ctor
   
   function fn(ctor: SomeConstructor) {
     return new ctor('hello')
   }
   
   const f = fn(Ctor)
   console.log(f.s)	// 'hello'
   ```

   2）将上述案例抽象化，提取骨干部分

   ```typescript
   class Ctor {
     constructor() {}
   }
   // 写法1：
   type someCtor = {
     new (): Ctor
   }
   // 写法2：
   type SomeConstructor = new (s: string) => Ctor
   
   function fn(ctor: someCtor) {
     return new ctor()
   }
   ```

   3）进一步简写上述代码

   ```typescript
   class Ctor {
     constructor() {}
   }
   
   function fn(ctor: { new (): Ctor }) {
     return new c()
   }
   ```

2. 在TS中使用泛型创建工厂时，有必要通过其构造函数来引用类的类型

   ```typescript
   function create<Type>(c: { new (): Type }): Type {
     return new c()
   }
   ```

3. 案例：

   ```typescript
   class BeeKeeper {
     hasMask: boolean = true
   }
   
   class ZooKeeper {
     nametag: string = 'Mikle'
   }
   
   class Animal {
     numLegs: number = 4
   }
   
   class Bee extends Animal {
     keeper: BeeKeeper = new BeeKeeper()	// 类类型
   }
   
   class Lion extends Animal {
     keeper: ZooKeeper = new ZooKeeper()	// 类类型
   }
   // 翻译：根据输入的类创建实例，但是输入的类必须具备Animal的属性
   function createInstance<A extends Animal>(c: new () => A): A {
     return new c()
   }
   
   createInstance(Lion).keeper.nametag
   createInstance(Bee).keeper.hasMask
   // 报错：类型 "BeeKeeper" 中缺少属性 "numLegs"，但类型 "Animal" 中需要该属性
   createInstance(BeeKeeper)
   ```

------

### 6.2 keyof类型操作符

1. `keyof`运算符接收一个对象类型，并产生其key的字符串或数字联合类型

   ```typescript
   type Point = {
     x: number
     y: number
   }
   
   type P = keyof Point	// 相当于 type P = "x" | "y"
   
   const p1: P = 'x'
   const p2: P = 'y'
   // 报错：不能将类型"z"分配给类型keyof Point
   const p3: P = 'z'
   ```

2. 对于索引签名：

   1）数字型索引签名：相当于`number`类型

   ```typescript
   type Arrayish = {
     [n: number]: unknown
   }
   type A = keyof Arrayish	// 相当于 type A = number
   const a: A = 0
   ```

   2）字符串索引签名：相当于`number | string`联合类型

   ```typescript
   type Mapish = {
     [k: string]: boolean
   }
   
   type M = keyof Mapish	// 相当于 type M = number | string
   
   const m1: M = 's'
   const m2: M = 100
   ```

------

### 6.3 typeof类型操作符

1. `typeof`操作符：可以在类型上下文中使用它，来引用一个变量或属性的类型

   ```typescript
   let s = 'hello'
   let n: typeof s	// string类型
   n = 'hello'
   n = 100	// 报错：不能将类型“number”分配给类型“string”
   ```

2. 应用：内置类型`RetrunType<T>`，接收一个函数类型并产生其返回类型

   ```typescript
   type Predicate = (x: unknown) => boolean
   type K = ReturnType<Predicate>
   
   function f() {
     return {
       x: 10,
       y: 3
     }
   }
   type P = ReturnType<typeof f> 	// 返回类型：{x:number; y:number}
   const p: P = 100  				// 报错，与{x:number; y:number}不兼容
   ```

3. 注意：不要将typeof用于判断函数返回值的类型

   ```typescript
   function msgbox() {}					  // 类型：()=>void
   let shouldContinue: typeof msgbox('100')  // 报错：不要将typeof用于判断函数返回值的类型
   let shouldContinue: typeof msgbox         // 这样用可以，代表shouldContinue是函数类型：()=>void
   shouldContinue = 100  // 报错：不能将类型“number”分配给类型“() => void”
   ```

------

### 6.4 索引访问类型

