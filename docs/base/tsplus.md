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
