---
prev: /vue3/
next: false
---

# React

## 第1章 React基础知识

### 1.1 React简介

1. 官网：

   1）英文官网：[https://reactjs.org/](https://reactjs.org/)

   2）中文官网：[https://react.docschina.org/](https://react.docschina.org/)

2. 介绍：

   1）由Facebook开源

   2）用于动态构建用户界面的 JavaScript 库(只关注于视图)

   - 原生JS操作DOM繁琐、效率低
   - 原生JS直接操作DOM，浏览器会进行大量的重绘重排
   - 原生JS没有组件化编码方案，代码复用率低

3. 特点：

   1）采用组件化模式、声明式编码（原生JS是命令式编码），提高开发效率及组件复用率

   2）在React Native中可以使用 React 语法进行移动端开发

   3）高效（优秀的Diffing算法）

   - 使用虚拟(virtual)DOM，不总是直接操作页面真实DOM
   - DOM Diffing算法，最小化页面重绘

4. 开发者工具：[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-ntp-icon)

   <img :src="$withBase('/imgs/react/react开发者工具.png')" alt="react开发者工具">

------

### 1.2 基本用法

1. 依赖库：注意引入顺序

   1）`react.development.js`：React核心库

   2）`react-dom.development.js`：提供操作DOM的react扩展库

   3）`babel.min.js`：解析JSX语法代码转为JS代码的库

2. 虚拟DOM与真实DOM：

   1）React提供了一些API来创建一种 “特别” 的一般js对象

   ```jsx
   const VDOM = React.createElement('xx',{id:'xx'},'xx')
   ```

   2）虚拟DOM对象最终都会被React转换为真实的DOM

   ```jsx
   ReactDOM.render(VDOM, document.getElementById('test'))
   ```

   3）编码时基本只需要操作react的虚拟DOM相关数据, react会转换为真实DOM变化而更新界面

   4）本质是Object类型的对象，虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性

3. 创建虚拟DOM的两种方式

   1）纯JS方式（一般不用）

   ```html
   <!-- 准备好一个“容器” -->
   <div id="test"></div>
   <!-- 引入react核心库 -->
   <script type="text/javascript" src="../js/react.development.js"></script>
   <!-- 引入react-dom，用于支持react操作DOM -->
   <script type="text/javascript" src="../js/react-dom.development.js"></script>
   <script type="text/javascript">
     //1.创建虚拟DOM
     const VDOM = React.createElement('h1', { id: 'title' }, React.createElement('span', {}, 'Hello,React'))
     //2.渲染虚拟DOM到页面
     ReactDOM.render(VDOM, document.getElementById('test'))
   </script>
   ```

   2）JSX方式

   ```html
   <!-- 准备好一个“容器” -->
   <div id="test"></div>
   <!-- 引入react核心库 -->
   <script type="text/javascript" src="../js/react.development.js"></script>
   <!-- 引入react-dom，用于支持react操作DOM -->
   <script type="text/javascript" src="../js/react-dom.development.js"></script>
   <!-- 引入babel，用于将jsx转为js -->
   <script type="text/javascript" src="../js/babel.min.js"></script>
   <script type="text/babel">
     /* 此处一定要写babel */
     //1.创建虚拟DOM
     const VDOM = (
       /* 此处一定不要写引号，因为不是字符串 */
       <h1 id="title">
         <span>Hello,React</span>
       </h1>
     )
     //2.渲染虚拟DOM到页面
     ReactDOM.render(VDOM, document.getElementById('test'))
   </script>
   ```

------

### 1.3 React JSX

#### 1.3.1 JSX语法

> `JavaScript XML`：用于简化创建虚拟DOM

1. 定义：React定义的一种类似于XML的JS扩展语法，本质是`React.createElement(component, props, ...children)`方法的语法糖

2. 写法：`var ele = <h1>Hello JSX!</h1>`

   1）不要写引号：不是字符串，也不是HTML/XML标签

   2）最终产生的就是一个JS对象

3. 命名规则：

   1）标签名：HTML标签或其它标签

   - 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错
   - 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错

   2）标签属性：HTML标签属性或其它

4. 语法规则：

   1）遇到以 `<` 开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析

   2）遇到以 `{` 开头的代码，以JS语法解析: 标签中的js表达式必须用`{ }`包含

   3）样式的类名指定不要用class，要用`className`

   4）内联样式：value值要写成字符串，对于带有“`-`”的属性要转为驼峰写法，如：`font-size`写成`fontSize`

   ```jsx
   style={{key:'value'}}
   ```

   5）只有一个根标签

   6）标签必须闭合

   7）写注释：`{/* 注释内容 */}`，必须用大括号包裹

5. `babel.js`的作用：

   1）浏览器不能直接解析JSX代码，需要babel转译为纯JS的代码才能运行

   2）只要用了JSX，都要加上`type="text/babel"`，声明需要babel来处理

6. 其他注意点：根据浏览器控制台提示操作

   1）超链接`<a>`：如果`target="_blank"`，必须配置`rel="noreferrer"`

   ```jsx
   <a rel="noreferrer" href=... target="_blank">
   ```

   2）图像`<img>`：必须配置`alt`

   ```jsx
   <img alt="xxx" src=... />
   ```

7. 案例：

   ```html
   <style>
     .title {
       background-color: orange;
       width: 200px;
     }
   </style>
   
   <!-- 准备好一个“容器” -->
   <div id="test"></div>
   <!-- 引入react核心库 -->
   <script type="text/javascript" src="../js/react.development.js"></script>
   <!-- 引入react-dom，用于支持react操作DOM -->
   <script type="text/javascript" src="../js/react-dom.development.js"></script>
   <!-- 引入babel，用于将jsx转为js -->
   <script type="text/javascript" src="../js/babel.min.js"></script>
   <script type="text/babel">
     const myId = 'aTgUiGu'
     const myData = 'HeLlo,rEaCt'
     //1.创建虚拟DOM
     const VDOM = (
       <div>
         <h2 className="title" id={myId.toLowerCase()}>
           <span style={{ color: 'white', fontSize: '29px' }}>{myData.toLowerCase()}</span>
         </h2>
         <h2 className="title" id={myId.toUpperCase()}>
           <span style={{ color: 'white', fontSize: '29px' }}>{myData.toLowerCase()}</span>
         </h2>
         <input type="text" />
       </div>
     )
     //2.渲染虚拟DOM到页面
     ReactDOM.render(VDOM, document.getElementById('test'))
   </script>
   ```

#### 1.3.2 渲染虚拟DOM

1. 语法：`ReactDOM.render(virtualDOM, containerDOM)`

2. 作用：将虚拟DOM元素渲染到页面中的真实容器DOM中显示

3. 参数：

   1）`virtualDOM`：纯js或jsx创建的虚拟dom对象

   2）`containerDOM`：用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)

4. 注意：标签中的`{}`里只能写JS表达式，不能是JS语句

   1）JS表达式：

   ```js
   a
   a+b
   demo(1)
   arr.map() 
   function test () {}
   true ? 1 : 2
   ```

   2）JS语句：

   ```js
   if(){}
   for(){}
   switch(){case:xxxx}
   ```

5. 批量生成DOM元素：`arr.map((currentValue[, index[, array]])){...}`，注意：必须配合`key`使用

   ```html
   <!-- 准备好一个“容器” -->
   <div id="test"></div>
   <!-- 引入react核心库 -->
   <script type="text/javascript" src="../js/react.development.js"></script>
   <!-- 引入react-dom，用于支持react操作DOM -->
   <script type="text/javascript" src="../js/react-dom.development.js"></script>
   <!-- 引入babel，用于将jsx转为js -->
   <script type="text/javascript" src="../js/babel.min.js"></script>
   <script type="text/babel">
     //模拟一些数据
     const data = ['Angular', 'React', 'Vue']
     //1.创建虚拟DOM
     const VDOM = (
       <div>
         <h1>前端js框架列表</h1>
         <ul>
           {data.map((item, index) => {
             return <li key={index}>{item}</li>
           })}
         </ul>
       </div>
     )
     //2.渲染虚拟DOM到页面
     ReactDOM.render(VDOM, document.getElementById('test'))
   </script>
   ```


------

#### 1.3.3 Diffing算法

1. 定义：React使用虚拟DOM，不总是直接操作页面真实DOM，这里就使用了Diffing算法将虚拟和真实DOM进行对比，最小化页面重绘

2. 验证虚拟DOM的Diffing算法的存在：算法比较的最小粒度是HTML标签

   <img :src="$withBase('/imgs/react/验证虚拟DOM的Diffing算法的存在.png')" alt="验证虚拟DOM的Diffing算法的存在">

   ```jsx
   // 案例：随着时间推移，页面上显示时间的文字不断变化（span标签被不断更新）
   // 如果input输入框没变化，则React不更新该标签，输入框内容得以保留（算法比较的最小粒度是HTML标签）
   class Time extends React.Component {
     state = { date: new Date() }
     componentDidMount() {
       setInterval(() => {
         this.setState({
           date: new Date(),
         })
       }, 1000)
     }
     render() {
       return (
         <div>
           <h1>hello</h1>
           <input type="text" />
           <span>
             现在是：{this.state.date.toTimeString()}
             <input type="text" />
           </span>
         </div>
       )
     }
   }
   ReactDOM.render(<Time />, document.getElementById('test'))
   ```

------

#### 1.3.4 Key的作用

> key是虚拟DOM对象的标识，在更新显示时key起着极其重要的作用

1. 当状态中的数据发生变化时，React会根据新数据生成新的虚拟DOM，随后进行【新虚拟DOM】与【旧虚拟DOM】的diff比较

   1）旧虚拟DOM中找到了与新虚拟DOM相同的`key`：

   - 若虚拟DOM中内容没变, 直接使用之前的真实DOM
   - 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

   2）旧虚拟DOM中未找到与新虚拟DOM相同的`key`：

   - 根据数据创建新的真实DOM，随后渲染到到页面

2. 用`index`作为`key`可能会引发的问题：

   1）若对数据进行：逆序添加、逆序删除等破坏顺序操作：会产生没有必要的真实DOM更新，界面效果没问题, 但效率低

   2）如果包含输入类的DOM：会产生错误DOM更新，界面有问题（如：input输入框中的内容不跟随DOM移动）

   3）如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

3. 开发中如何选择key：

   1）最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值

   2）如果确定只是简单的展示数据，用index也可以

4. 推荐第三方插件`nanoid`：可以生成唯一id值，可以作为唯一标识的key（第三方插件`uuid`也可以实现，但是体积有点大）

   ```jsx
   import { nanoid } from 'nanoid'
   const todoObj = { id: nanoid(), name: 'xxx' }
   ```

5. 案例：

   1）使用index（索引值）作为key：input输入框中的内容不跟随DOM移动，界面有问题

   2）使用id（数据的唯一标识）作为key：没问题

   ```jsx
   class Person extends React.Component {
     state = {
       persons: [
         { id: 1, name: '小张', age: 18 },
         { id: 2, name: '小李', age: 19 },
       ],
     }
     add = () => {
       const { persons } = this.state
       const p = { id: persons.length + 1, name: '小王', age: 20 }
       this.setState({ persons: [p, ...persons] })
     }
     render() {
       return (
         <div>
           <h2>展示人员信息</h2>
           <button onClick={this.add}>添加一个小王</button>
           <h3>使用index（索引值）作为key</h3>
           <ul>
             {this.state.persons.map((personObj, index) => {
               return (
                 <li key={index}>
                   {personObj.name}---{personObj.age}
                   <input type="text" />
                 </li>
               )
             })}
           </ul>
           
           <hr />
           <hr />
           
           <h3>使用id（数据的唯一标识）作为key</h3>
           <ul>
             {this.state.persons.map((personObj) => {
               return (
                 <li key={personObj.id}>
                   {personObj.name}---{personObj.age}
                   <input type="text" />
                 </li>
               )
             })}
           </ul>
         </div>
       )
     }
   }
   ReactDOM.render(<Person />, document.getElementById('test'))
   ```

------

#### 1.3.5 Fragment

> 在脚手架中使用`<Fragment>`作为组件的最外层结构，可以不用必须有一个真实的DOM根标签了

1. 作用：使用`<Fragment>`作为最外层HTML标签（之前只能用`<div>`），React在渲染时会将其去掉，使整体项目结构更加简洁

2. 父组件：App.jsx

   ```jsx
   import React, { Component, Fragment } from 'react'
   import Demo from './components/Demo'
   
   export default class App extends Component {
     render() {
       return (
         <Fragment>
           <Demo />
         </Fragment>
       )
     }
   }
   ```

3. 子组件：

   1）如果涉及遍历，可以携带`key`参数（不能携带其他参数）

   ```jsx
   import React, { Component, Fragment } from 'react'
   
   export default class Demo extends Component {
     render() {
       return (
         <Fragment key={1}>
           <input type="text" />
           <input type="text" />
         </Fragment>
       )
     }
   }
   ```

   2）如果不需要指定`key`，可以简写为空标签`< >...</>`

   ```jsx
   import React, { Component, Fragment } from 'react'
   
   export default class Demo extends Component {
     render() {
       return (
         <>
           <input type="text" />
           <input type="text" />
         </>
       )
     }
   }
   ```

------

### 1.4 模块与组件

1. 模块：向外提供特定功能的js程序, 一般就是一个js文件

   1）为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂

   2）作用：复用js, 简化js的编写, 提高js运行效率

   3）模块化：当应用的js都以模块来编写的， 这个应用就是一个模块化的应用

2. 组件：用来实现局部功能效果的代码和资源的集合（html/css/js/image等）

   1）为什么要用组件：一个界面的功能更复杂

   2）作用：复用编码, 简化项目编码, 提高运行效率

   3）组件化：当应用是以多组件的方式实现，这个应用就是一个组件化的应用

------

### 1.5 组件间通信

#### 1.5.1 通信方式

1. props：

   1）children props：通过组件标签体传入结构，但无法做到让组件间共享数据

   2）render props：通过组件标签属性传入结构，而且可以携带数据

2. 消息订阅与发布：pubs-sub、event等

3. 集中式管理：redux、dva等

4. Context：生产者-消费者模式

#### 1.5.2 搭配方式

|         组件         |                           通信方式                           |
| :------------------: | :----------------------------------------------------------: |
|       父子组件       |                            props                             |
| 兄弟组件(非嵌套组件) |                  消息订阅与发布、集中式管理                  |
|  祖孙组件(跨级组件)  | 消息订阅与发布、集中式管理、Context(开发用的少，封装插件用的多) |

------

## 第2章 面向组件编程

### 2.1 创建组件

#### 2.1.1 函数式组件

> 适用于【简单组件】的定义，因为没有`this`，所以只能有`props`属性，但在React17版本后可使用`hooks`实现完整功能

1. React解析组件标签，找到了MyComponent组件

2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中

3. 注意：MyComponent组件中的`this`是undefined，因为babel编译后开启了严格模式

   ```jsx
   //1. 创建函数式组件
   function MyComponent() {
     console.log(this) // 此处的this是undefined，因为babel编译后开启了严格模式
     return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
   }
   //2. 渲染组件到页面
   ReactDOM.render(<MyComponent />, document.getElementById('test'))
   ```

#### 2.1.2 类式组件

> 适用于【复杂组件】的定义，有`state`属性的组件就是复杂组件

1. React解析组件标签，找到了MyComponent组件

2. 发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法

3. 将render返回的虚拟DOM转为真实DOM，随后呈现在页面中

4. 注意：MyComponent组件中的`this`是MyComponent组件实例对象

   ```jsx
   //1.创建类式组件
   class MyComponent extends React.Component {
     render() {
       // render位置：放在MyComponent的原型对象上，供实例使用
       // render中的this： MyComponent的实例对象/MyComponent组件实例对象
       console.log('render中的this:', this)
       return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
     }
   }
   //2.渲染组件到页面
   ReactDOM.render(<MyComponent />, document.getElementById('test'))
   ```

------

### 2.2 三大属性

#### 2.2.1 state属性

> 组件被称为"状态机"，通过更新组件的`state`来更新对应的页面显示（重新渲染组件）

1. 定义：`state`是组件最重要的属性，值是对象（可以包含多个key-value的组合）

2. 组件中的`this`指向：

   1）`render`中的`this`：组件实例对象

   2）自定义的方法中的`this`：通过实例调用指向组件实例对象；通过其他方式调用为`undefined`，如果想让其指向组件实例对象，用以下2种方式

   - 强制绑定this：通过函数对象的`bind`
   - 赋值语句+箭头函数

3. 更改状态：`setState(stateChange/updater, [callback])`

   1）状态不可直接更改，必须通过`setState`进行更新（是异步更新的），而且更新是一种合并，不是替换

   ```jsx
   // 正确写法
   this.setState({ isHot: !isHot })
   // 错误写法
   this.state.isHot = !isHot
   ```

   2）如果使用传递参数的方式更改状态，必须用`[]`包裹住参数作为key，否则参数本身会被解析为字符串

   ```jsx
   saveFormData = (dataType) => {
     return (event) => {
       // 注意：这里必须用[]包裹住dataType，否则会将dataType理解为字符串，作为新key传入state
       this.setState({ [dataType]: event.target.value })
     }
   }
   ```

   3）写法1：对象式`setState(stateChange, [callback])`：适用于新状态不依赖于原状态，是函数式的setState的简写方式

   - `stateChange`为状态改变对象（该对象可以体现出状态的更改）
   - `callback`是可选的回调函数, 它在状态更新完毕、界面也更新后（render调用后）才被调用，可以读取最新的状态数据

   ```jsx
   import React, { Component } from 'react'
   
   export default class Demo extends Component {
     state = { count: 0 }
   
     add = () => {
       // 写法1：对象式的setState
       // 1.获取原来的count值
       const { count } = this.state
       // 2.更新状态（异步）
       this.setState({ count: count + 1 }, () => {
         console.log(this.state.count)
       })
       // 注意：如果用同步的方式查看，无法检测到state的变化
       console.log('12行的输出', this.state.count) // 0
     }
   
     render() {
       return (
         <div>
           <h1>当前求和为：{this.state.count}</h1>
           <button onClick={this.add}>点我+1</button>
         </div>
       )
     }
   }
   ```

   4）写法2：函数式`setState(updater, [callback])`：适用于新状态依赖于原状态

   - `updater`为返回stateChange对象的函数，可以接收到`state`和`props`
   - `callback`是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用，可以读取最新的状态数据

   ```jsx
   import React, { Component } from 'react'
   
   export default class Demo extends Component {
     state = { count: 0 }
   
     add = () => {
       // 写法2：函数式的setState（可以接收state、props这两个参数）
       this.setState((state, props) => {
         // 在父组件中传递props
         console.log(state, props)
         return { count: state.count + 1 }
       })
     }
   
     render() {
       return (
         <div>
           <h1>当前求和为：{this.state.count}</h1>
           <button onClick={this.add}>点我+1</button>
         </div>
       )
     }
   }
   ```

4. 案例：定义一个展示天气信息的组件

   - 默认展示天气炎热或凉爽
   - 点击文字切换天气

   ```jsx
   // 1.创建组件
   class Weather extends React.Component {
     // 构造器调用几次？ ———— 1次
     constructor(props) {
       console.log('constructor')
       super(props)
       // 初始化状态
       this.state = { isHot: false, wind: '微风' }
       // 解决changeWeather中this指向问题：通过bind改变this指向，返回一个新函数
       // 这里定义的changeWeather直接挂在Weather自身，优先级高于原型对象上的changeWeather（两者不一样）
       this.changeWeather = this.changeWeather.bind(this)
     }
     // render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
     render() {
       console.log('render')
       // 读取状态
       const { isHot, wind } = this.state
       return (
         // onclick需要写成onClick; 函数不要写小括号，否则被调用了
         <h1 onClick={this.changeWeather}>
           今天天气很{isHot ? '炎热' : '凉爽'}，{wind}
         </h1>
       )
     }
     // changeWeather调用几次？ ———— 点几次调几次
     changeWeather() {
       // changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
       // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
       // 类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined，需要通过bind绑定
       // 获取原来的isHot值
       const isHot = this.state.isHot
       // 状态必须通过setState进行更新,且更新是一种合并，不是替换。
       this.setState({ isHot: !isHot })
     }
   }
   // 2.渲染组件到页面
   ReactDOM.render(<Weather />, document.getElementById('test'))
   ```

5. state的简写方式：

   1）省略构造器constructor

   2）自定义方法：使用赋值语句+箭头函数更改this指向

   ```jsx
   // 1.创建组件
   class Weather extends React.Component {
     // 初始化状态
     state = { isHot: false, wind: '微风' }
     render() {
       const { isHot, wind } = this.state
       return (
         <h1 onClick={this.changeWeather}>
           今天天气很{isHot ? '炎热' : '凉爽'}，{wind}
         </h1>
       )
     }
     // 自定义方法：要用赋值语句的形式+箭头函数
     changeWeather = () => {
       const isHot = this.state.isHot
       this.setState({ isHot: !isHot })
     }
   }
   // 2.渲染组件到页面
   ReactDOM.render(<Weather />, document.getElementById('test'))
   ```

------

#### 2.2.2 props属性

> 组件标签的所有属性都保存在`props`属性中，可通过标签属性从组件外向组件内传递变化的数据（注意：组件内部不要修改props数据）

1. 内部读取某个属性值：`this.props.name`，只读（无法修改）

   ```jsx
   class Person extends React.Component {
     render() {
       const { name, age, sex } = this.props
       // props是只读的，以下代码会报错
       // this.props.name = 'jack'
       return (
         <ul>
           <li>姓名：{name}</li>
           <li>性别：{sex}</li>
           <li>年龄：{age + 1}</li>
         </ul>
       )
     }
   }
   ```

2. `propTypes`：对`props`中的属性值进行类型限制和必要性限制

   1）方法1：Reactv15.5开始已弃用

   ```jsx
   Person.propTypes = {
     name: React.PropTypes.string.isRequired,
     age: React.PropTypes.number,
   }
   ```

   2）方法2：使用prop-types库进限制（需要引入`prop-types`库）

   - 在类的外部定义：`obj.propTypes`

   ```jsx
   <!-- 引入prop-types，用于对组件标签属性进行限制 -->
   <script type="text/javascript" src="../js/prop-types.js"></script>
   
   Person.propTypes = {
     name: PropTypes.string.isRequired, //限制name必传，且为字符串
     sex: PropTypes.string, //限制sex为字符串
     age: PropTypes.number, //限制age为数值
     speak: PropTypes.func, //限制speak为函数（func不要写成function）
   }
   ```

   * 在类的内部定义（简写）：使用静态属性`static`

   ```jsx
   static propTypes = {
     name: PropTypes.string.isRequired, // 限制name必传，且为字符串
     sex: PropTypes.string, // 限制sex为字符串
     age: PropTypes.number, // 限制age为数值
     speak: PropTypes.func, //限制speak为函数（func不要写成function）
   }
   ```

3. `defaultProps`：默认属性值，如果不传递属性则展示默认值

   1）在类的外部定义：

   ```jsx
   Person.defaultProps = {
     age: 18,
     sex: '男',
   }
   ```

   2）在类的内部定义（简写）：使用静态属性`static`

   ```jsx
   static defaultProps = {
     age: 18,
     sex: '男',
   }
   ```

4. 传递属性：即使组件内的render中没有声明接收props，传递的属性也会自动挂载到组件实例上

   1）直接在标签内写，如果是数字必须用`{}`包裹

   ```jsx
   ReactDOM.render(<Person name="tom" age={18} sex="女" />, document.getElementById('test1'))
   ```

   2）批量传递属性：利用扩展运算符，将对象的所有属性通过`props`传递

   ```jsx
   const p = { name: '老刘', age: 18, sex: '女' }
   ReactDOM.render(<Person {...p} />, document.getElementById('test2'))
   ```

5. 组件类的构造函数：构造器是否接收props、是否传递给super，取决于是否希望在构造器中通过`this`访问props

   ```js
   constructor(props) {
     console.log(props)	// 不加super，不能用this.props
     super(props)
     console.log(this.props)
   }
   ```

6. 函数组件使用`props`：因为没有`this`，所以只能有`props`属性，通过传参实现

   ```jsx
   // 创建组件
   function Person(props) {
     const { name, age, sex } = props
     return (
       <ul>
         <li>姓名：{name}</li>
         <li>性别：{sex}</li>
         <li>年龄：{age}</li>
       </ul>
     )
   }
   Person.propTypes = {
     name: PropTypes.string.isRequired, // 限制name必传，且为字符串
     sex: PropTypes.string, // 限制sex为字符串
     age: PropTypes.number, // 限制age为数值
   }
   // 指定默认标签属性值
   Person.defaultProps = {
     sex: '男', // sex默认值为男
     age: 18, // age默认值为18
   }
   // 渲染组件到页面
   ReactDOM.render(<Person name="jerry" />, document.getElementById('test1'))
   ```

7. 案例：自定义用来显示一个人员信息的组件

   - 姓名必须指定，且为字符串类型
   - 性别为字符串类型，如果性别没有指定，默认为男
   - 年龄为字符串类型，且为数字类型，默认值为18

   ```jsx
   class Person extends React.Component {
     constructor(props) {
       super(props)
     }
     // 对标签属性进行类型、必要性的限制
     static propTypes = {
       name: PropTypes.string.isRequired,
       sex: PropTypes.string,
       age: PropTypes.number,
     }
     // 指定默认标签属性值
     static defaultProps = {
       sex: '男',
       age: 18,
     }
     render() {
       const { name, age, sex } = this.props
       return (
         <ul>
           <li>姓名：{name}</li>
           <li>性别：{sex}</li>
           <li>年龄：{age}</li>
         </ul>
       )
     }
   }
   // 渲染组件到页面
   ReactDOM.render(<Person name="jerry" />, document.getElementById('test'))
   ```

8. 向组件内部动态传入带内容的结构：

   1）children props: 通过组件标签体传入结构，但无法做到让组件共享数据，使用`this.props.children`获取标签体之间的内容

   ```jsx
   import React, { Component } from 'react'
   import './index.css'
   
   export default class Parent extends Component {
     render() {
       return (
         <div className="parent">
           <h3>我是Parent组件</h3>
           <A>
             <B>Hello!</B>
           </A>
         </div>
       )
     }
   }
   
   class A extends Component {
     render() {
       return (
         <div className="a">
           <h3>我是A组件</h3>
           {/* 里接收到Parent组件写在A组件之间的内容：B组件 */}
           {this.props.children}
         </div>
       )
     }
   }
   
   class B extends Component {
     render() {
       return (
         <div className="b">
           <h3>我是B组件</h3>
           {/* 这里接收到Parent组件写在B组件之间的内容：Hello! */}
           {this.props.children}
         </div>
       )
     }
   }
   ```

   2）render props: 通过组件标签属性传入结构，而且可以携带数据，一般用`render`函数属性

   ```jsx
   import React, { Component } from 'react'
   import './index.css'
   
   export default class Parent extends Component {
     render() {
       return (
         <div className="parent">
           <h3>我是Parent组件</h3>
           {/* 通过props向A组件传递一个函数，名称为render，并可通过name再向其他组件传递数据 */}
           <A render={(name) => <B name={name} />} />
         </div>
       )
     }
   }
   
   class A extends Component {
     state = { name: 'tom' }
     render() {
       const { name } = this.state
       return (
         <div className="a">
           <h3>我是A组件</h3>
           {/* 相当于插槽，可以插入任意指定组件 */}
           {this.props.render(name)}
         </div>
       )
     }
   }
   
   class B extends Component {
     render() {
       return (
         <div className="b">
           {/* 可以共享A组件中的数据 */}
           <h3>我是B组件,{this.props.name}</h3>
         </div>
       )
     }
   }
   ```

------

#### 2.2.3 refs属性

> 组件内的标签可以定义`ref`属性来标识自己，类似于原生JS中的`id`（注意：请勿过度使用refs）

1. 字符串形式的`ref`：React未来将不再支持，不推荐使用

   ```jsx
   showData = () => {
     const { input1 } = this.refs	// 注意：这里写的是refs（复数形式）
     alert(input1.value)
   }
   showData2 = () => {
     const { input2 } = this.refs
     alert(input2.value)
   }
   ......
   <input ref="input1" type="text" placeholder="点击按钮提示数据" />	// 注意，这里写的是ref
   <button onClick={this.showData}>点我提示左侧的数据</button>
   
   <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
   ......
   ```

2. 回调形式的`ref`：在标签中将当前节点挂载到组件实例的`this`上

   1）[以内联函数的方式定义](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)：在更新过程中会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素

   ```jsx
   showData = () => {
     const { input1 } = this
     alert(input1.value)
   }
   showData2 = () => {
     // 连续结构赋值+重命名
     const { input2 : { value : v } } = this
     alert(v)
   }
   ......
   <input ref={(currentNode) => (this.input1 = currentNode)} type="text" placeholder="点击按钮提示数据" />
   <button onClick={this.showData}>点我提示左侧的数据</button>
   {/* currentNode可以简写为c，箭头函数简写可以省略括号 */}
   <input onBlur={this.showData2} ref={c => this.input2 = c} type="text" placeholder="失去焦点提示数据" />
   ......
   ```

   2）以class的绑定函数的方式定义：仅执行一次

   ```jsx
   saveInput = (element) => {
     this.input1 = element
   }
   showInfo = () => {
     const { input1 } = this
     alert(input1.value)
   }
   ......
   <input ref={this.saveInput} type="text" placeholder="点击按钮提示数据" />
   <button onClick={this.showInfo}>点我提示输入的数据</button>
   ......
   ```

3. `creatRef`：最新方法，调用后可以返回一个容器，该容器可以存储被ref所标识的节点，该容器是“专人专用”的

   1）创建容器：`myRef = React.createRef()`

   2）标签中引入：`ref={this.myRef}`

   ```jsx
   class Demo extends React.Component {
     // React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
     myRef = React.createRef()
     myRef2 = React.createRef()
     
     // 展示左侧输入框的数据
     showData = () => {
       alert(this.myRef.current.value)
     }
     // 展示右侧输入框的数据
     showData2 = () => {
       alert(this.myRef2.current.value)
     }
     
     render() {
       return (
         <div>
           <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />
           &nbsp;
           <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
           <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据" />
           &nbsp;
         </div>
       )
     }
   }
   // 渲染组件到页面（注意：即使组件内的render中没有声明接收props，传递的属性也会自动挂载到组件实例上）
   ReactDOM.render(<Demo a="1" b="2" />, document.getElementById('test'))
   ```

------

### 2.3 事件处理

> 注意：如果事件绑定的函数需要传递参数（除`event`之外），必须在内部写成箭头函数，如：`onClick={() => this.func(arg1,arg2,...)}`

1. 通过`onXxx`属性指定事件处理函数（注意大小写，如原生JS中的`onclick`要写成`onClick`）

   1）更好的兼容性：React使用的是自定义（合成）事件，而不是使用的原生DOM事件

   2）更高效：React中的事件是通过事件委托方式处理的（委托给组件最外层的元素）

2. 通过`event.target`得到发生事件的DOM元素对象（不要过度使用ref）

   ```jsx
   class Demo extends React.Component {
     // 创建ref容器
     myRef = React.createRef()
     myRef2 = React.createRef()
     
     // 展示左侧输入框的数据
     showData = (event) => {
       console.log(event.target)		// 这里只能取到button，而不是input
       alert(this.myRef.current.value)	// 无法用event.value获取数据
     }
     // 展示右侧输入框的数据
     showData2 = (event) => {
       // alert(this.myRef2.current.value)
       alert(event.target.value)		// 这里的event就是input，可以用event.value获取数据
     }
     // 展示传递的自定义参数
     showData3 = (name, age) => {
       console.log(name, age)
     }
     
     render() {
       return (
         <div>
           <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />
           &nbsp;
           <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
           <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
           &nbsp;
           {/* 如果事件绑定的函数需要传递参数（除event之外），必须在内部写成箭头函数 */}
           <button onClick={() => this.showData3('tom', 18)}>测试传递自定义参数</button>&nbsp;
         </div>
       )
     }
   }
   // 渲染组件到页面
   ReactDOM.render(<Demo />, document.getElementById('test'))
   ```

3. 键盘事件：可以通过解构赋值获取，`const { keyCode, target } = event`

   ```jsx
   handleKeyUp = (event) => {
     // 解构赋值获取keyCode,target
     const { keyCode, target } = event
     // 判断是否是回车按键
     if (keyCode !== 13) return
     // 添加的todo名字不能为空
     if (target.value.trim() === '') {
       alert('输入不能为空')
       return
     }
     // 准备好一个todo对象
     const todoObj = { id: nanoid(), name: target.value, done: false }
     // 将todoObj传递给App
     this.props.addTodo(todoObj)
     // 清空输入
     target.value = ''
   }
   ......
   <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
   ```

------

### 2.4 表单数据

#### 2.4.1 非受控组件

1. 定义：现用现取，使用`ref`获取DOM元素，通过`value`获取表单数据

2. 案例：

   ```jsx
   //创建组件
   class Login extends React.Component {
     handleSubmit = (event) => {
       event.preventDefault() //阻止表单提交
       const { username, password } = this // 获取ref
       alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
     }
     render() {
       return (
         <form onSubmit={this.handleSubmit}>
           用户名：
           <input ref={(c) => (this.username = c)} type="text" name="username" />
           密码：
           <input ref={(c) => (this.password = c)} type="password" name="password" />
           <button>登录</button>
         </form>
       )
     }
   }
   //渲染组件
   ReactDOM.render(<Login />, document.getElementById('test'))
   ```

#### 2.4.2 受控组件

1. 定义：随着数据输入，将数据存入`state`中并读取，并用`setState`更新数据（推荐方法）

2. 案例：

   ```jsx
   //创建组件
   class Login extends React.Component {
     //初始化状态
     state = {
       username: '', //用户名
       password: '', //密码
     }
     //保存用户名到状态中
     saveUsername = (event) => {
       this.setState({ username: event.target.value })
     }
     //保存密码到状态中
     savePassword = (event) => {
       this.setState({ password: event.target.value })
     }
     //表单提交的回调
     handleSubmit = (event) => {
       event.preventDefault() //阻止表单提交
       const { username, password } = this.state // 放在state状态中
       alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
     }
     render() {
       return (
         <form onSubmit={this.handleSubmit}>
           用户名：
           <input onChange={this.saveUsername} type="text" name="username" />
           密码：
           <input onChange={this.savePassword} type="password" name="password" />
           <button>登录</button>
         </form>
       )
     }
   }
   //渲染组件
   ReactDOM.render(<Login />, document.getElementById('test'))
   ```

------

### 2.5 函数柯里化

#### 2.5.1 高阶函数

1. 定义：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数

   1）若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数

   2）若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数

2. 常见的高阶函数：

   1）定时器设置函数：`setTimeout`

   2）数组的`forEach`、`map`、`filter`、`reduce`、`find`、`bind`

   3）`Promise`函数

   4）react-redux中的`connect`函数

#### 2.5.2 函数柯里化

1. 定义：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

   ```js
   // 普通方法
   function sum(a, b, c) {
     return a + b + c
   }
   const result1 = sum(1,2,3)
   
   // 函数柯里化
   function sum(a) {
     return (b) => {
       return (c) => {
         return a + b + c
       }
     }
   }
   const result2 = sum(1)(2)(3)
   ```

2. 案例：

   1）使用函数柯里化实现收集表单数据

   ```jsx
   // 创建组件
   class Login extends React.Component {
     // 初始化状态
     state = {
       username: '', // 用户名
       password: '', // 密码
     }
     // 保存表单数据到状态中
     saveFormData = (dataType) => {
       return (event) => {
         //  注意：这里必须用[]包裹住dataType，否则会将dataType理解为字符串，作为新key传入state
         this.setState({ [dataType]: event.target.value })
       }
     }
     // 表单提交的回调
     handleSubmit = (event) => {
       event.preventDefault() // 阻止表单提交
       const { username, password } = this.state
       alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
     }
     render() {
       return (
         <form onSubmit={this.handleSubmit}>
           用户名：
           <input onChange={this.saveFormData('username')} type="text" name="username" />
           密码：
           <input onChange={this.saveFormData('password')} type="password" name="password" />
           <button>登录</button>
         </form>
       )
     }
   }
   // 渲染组件
   ReactDOM.render(<Login />, document.getElementById('test'))
   ```

   2）对比：不使用函数柯里化

   ```jsx
   //保存表单数据到状态中
   saveFormData = (dataType, event) => {
     this.setState({ [dataType]: event.target.value })
   }
   ......
   <input onChange={(event) => this.saveFormData('username', event)} type="text" name="username" />
   <input onChange={(event) => this.saveFormData('password', event)} type="password" name="password" />
   ......
   ```

------

### 2.6 生命周期函数

> React组件中包含一系列勾子函数（生命周期回调函数），会在特定的时刻调用

#### 2.6.1 生命周期流程(旧)

> 旧版本：v17.0之前

<img :src="$withBase('/imgs/react/react生命周期(旧).png')" alt="react生命周期(旧)">

1. 初始化阶段：由`ReactDOM.render()`触发初次渲染

   1）`constructor()`

   2）`componentWillMount()`：即将废弃，下一个大版本需要加上`UNSAFE_`前缀才能使用

   3）`render()`：会调用多次

   4）`componentDidMount()`：【常用】仅调用一次，做一些初始化工作：开启定时器、发送网络请求、订阅消息

2. 更新阶段：

   1）`componentWillReceiveProps()`：由父组件重新`render`触发（第一次不调用），即将废弃，下一个大版本需要加上`UNSAFE_`前缀才能使用

   ```jsx
   // 父组件A
   class A extends React.Component {
     // 初始化状态
     state = { carName: '奔驰' }
     changeCar = () => {
       this.setState({ carName: '奥拓' })
     }
     render() {
       return (
         <div>
           <div>我是A组件</div>
           <button onClick={this.changeCar}>换车</button>
           <B carName={this.state.carName} />
         </div>
       )
     }
   }
   
   // 子组件B
   class B extends React.Component {
     // 组件将要接收新的props的钩子（第一次不调用，再次更改props时才调用）
     componentWillReceiveProps(props) {
       console.log('B---componentWillReceiveProps', props)
     }
     render() {
       return <div>我是B组件，接收到的车是:{this.props.carName}</div>
     }
   }
   ```

   2）`shouldComponentUpdate(nextProps, nextState)`：组件更新阀门，由`setState()`触发，默认返回ture，如果返回false则无法继续

   ```jsx
   this.state = { count: 0 }
   ......
   add = () => {
     // 获取原状态
     const { count } = this.state
     // 更新状态
     this.setState({ count: count + 1 })
   }
   // 控制组件更新的“阀门”
   shouldComponentUpdate() {
     console.log('Count---shouldComponentUpdate')
     return true
   }
   ......
   <button onClick={this.add}>点我+1</button>
   ```

   3）`componentWillUpdate()`：由`forceUpdate()`强制更新触发，即将废弃，下一个大版本需要加上`UNSAFE_`前缀才能使用

   ```jsx
   force = () => {
     this.forceUpdate()
   }
   componentWillMount() {
     console.log('Count---componentWillMount')
   }
   ......
   <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
   ```

   4）`render()`

   5）`componentDidUpdate()`：接收参数：上一个props、上一个state、快照值

3. 卸载组件：由`ReactDOM.unmountComponentAtNode()`触发

   - `componentWillUnmount()`：【常用】做一些收尾工作：关闭定时器、取消订阅消息

4. 案例：标题在2秒内不断变暗，点击按钮可以卸载组件

   ```jsx
   // 创建组件
   class Life extends React.Component {
     state = { opacity: 1 }
     death = () => {
       // 卸载组件
       ReactDOM.unmountComponentAtNode(document.getElementById('test'))
     }
     // 组件挂完毕
     componentDidMount() {
       console.log('componentDidMount')
       this.timer = setInterval(() => {
         // 获取原状态
         let { opacity } = this.state
         // 减小0.1
         opacity -= 0.1
         if (opacity <= 0) opacity = 1
         // 设置新的透明度
         this.setState({ opacity })
       }, 200)
     }
     // 组件将要卸载
     componentWillUnmount() {
       // 清除定时器
       clearInterval(this.timer)
     }
     // 初始化渲染、状态更新之后
     render() {
       console.log('render')
       return (
         <div>
           <h2 style={{ opacity: this.state.opacity }}>React学不会怎么办？</h2>
           <button onClick={this.death}>不活了</button>
         </div>
       )
     }
   }
   // 渲染组件
   ReactDOM.render(<Life />, document.getElementById('test'))
   ```

------

#### 2.6.2 生命周期流程(新)

> 新版本：v17.0之后

<img :src="$withBase('/imgs/react/react生命周期(新).png')" alt="react生命周期(新)">

1. 初始化阶段：由`ReactDOM.render()`触发初次渲染

   1）`constructor()`

   2）`getDerivedStateFromProps()`：新函数，若state的值在任何时候都取决于props，可使用该函数（一般不用）

   ```jsx
   static getDerivedStateFromProps(props, state) {
     console.log('getDerivedStateFromProps', props, state)
     return null	// 必须返回state对象 或 null
   }
   ```

   3）`render()`

   4）`componentDidMount()`：【常用】仅调用一次，做一些初始化工作：开启定时器、发送网络请求、订阅消息

2. 更新阶段：

   1）`getDerivedStateFromProps()`：新函数，若state的值在任何时候都取决于props，可使用该函数（一般不用）

   2）`shouldComponentUpdate(nextProps, nextState)`

   3）`render()`

   4）`getSnapshotBeforeUpdate()`：新函数，在最近一次渲染输出DOM之前调用，返回值作为参数传递给componentDidUpdate（一般不用）

   5）`componentDidUpdate(preProps, preState, snapshotValue)`：接收参数：上一个props、上一个state、快照值

   ```jsx
   // 案例：随着新闻列表的不断增加，窗口滚动条不随之运动，而固定在当前阅览的位置
   class NewsList extends React.Component {
     state = { newsArr: [] }
     
     componentDidMount() {
       setInterval(() => {
         // 获取原状态
         const { newsArr } = this.state
         // 模拟一条新闻
         const news = '新闻' + (newsArr.length + 1)
         // 更新状态
         this.setState({ newsArr: [news, ...newsArr] })
       }, 1000)
     }
     
     // scrollHeight：内容区总高度；scrollTop：当前位置距顶端高度
     // 作用：组件在发生更改之前从DOM中获取一些信息，如：滚动位置
     getSnapshotBeforeUpdate() {
       return this.refs.list.scrollHeight	// 返回当前内容区总高度
     }
     
     componentDidUpdate(preProps, preState, height) {
       // 距顶端高度增加值 = 新内容区总高度 - 旧内容区总高度
       this.refs.list.scrollTop += this.refs.list.scrollHeight - height
     }
     render() {
       return (
         <div className="list" ref="list">
           {this.state.newsArr.map((n, index) => {
             return (
               <div key={index} className="news">
                 {n}
               </div>
             )
           })}
         </div>
       )
     }
   }
   ReactDOM.render(<NewsList />, document.getElementById('test'))
   ```

3. 卸载组件：由`ReactDOM.unmountComponentAtNode()`触发

   - `componentWillUnmount()`：【常用】做一些收尾工作：关闭定时器、取消订阅消息

------

#### 2.6.3 组件优化

> 使用`PureComponent`优化，只有当组件的state或props数据发生改变时才重新render

1. 低效问题：

   1）只要执行setState()，即使不改变状态数据，组件也会重新render()

   2）只当前组件重新render()，就会自动重新render子组件，纵使子组件没有用到父组件的任何数据

2. 原因：Component中的`shouldComponentUpdate()`总是返回true

3. 解决方法：使用`PureComponent`重写`shouldComponentUpdate()`, 只有state或props数据有变化才返回true

   1）只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false（必须用`setState`变更数据才行）

   ```jsx
   // 正确写法：使用setState才能让PureComponent正常工作
   this.setState({carName:'迈巴赫'})
   
   // 错误写法：PureComponent只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false
   const obj = this.state
   obj.carName = '迈巴赫'
   this.setState(obj)
   ```

   2）不要直接修改state数据, 而是要产生新数据（不要用数组中的`push`、`unshift`方法，要用扩展运算符）

   ```jsx
   // 正确写法：使用扩展运算符，产生新数据
   const { stus } = this.state
   this.setState({ stus: ['小刘', ...stus] })
   
   // 错误写法：使用unshift对state进行修改
   const { stus } = this.state
   stus.unshift('小刘')
   this.setState({ stus })
   ```

4. 案例：

   ```jsx
   import React, { PureComponent } from 'react'
   import './index.css'
   
   export default class Parent extends PureComponent {
     state = { carName: '奔驰c36', stus: ['小张', '小李', '小王'] }
     
     addStu = () => {
       const { stus } = this.state
       this.setState({ stus: ['小刘', ...stus] })
     }
     
     changeCar = () => {
       // 使用setState才能让PureComponent正常工作
       this.setState({carName:'迈巴赫'})
     }
     
     render() {
       console.log('Parent---render')
       const { carName } = this.state
       return (
         <div className="parent">
           <h3>我是Parent组件</h3>
           {this.state.stus}&nbsp;
           <span>我的车名字是：{carName}</span>
           <br />
           <button onClick={this.changeCar}>点我换车</button>
           <button onClick={this.addStu}>添加一个小刘</button>
           <Child carName="奥拓" />
         </div>
       )
     }
   }
   
   class Child extends PureComponent {
     render() {
       console.log('Child---render')
       return (
         <div className="child">
           <h3>我是Child组件</h3>
           <span>我接到的车是：{this.props.carName}</span>
         </div>
       )
     }
   }
   ```

------

#### 2.6.4 错误边界

> 错误边界(Error boundary)：在祖组件中借助`getDerivedStateFromError()`捕获后代组件错误，渲染出备用页面（适用于生产环境）

1. 原理：当Parent的子组件出现报错时，会触发`getDerivedStateFromError`调用，并携带错误信息

2. 特点：只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

3. 使用：`getDerivedStateFromError`配合`componentDidCatch`

4. 案例：

   1）父组件：Parent.jsx

   ```jsx
   import React, { Component } from 'react'
   import Child from './Child'
   
   export default class Parent extends Component {
     state = {
       hasError: '', // 用于标识子组件是否产生错误
     }
   
     // 当Parent的子组件出现报错时，会触发getDerivedStateFromError调用，并携带错误信息
     static getDerivedStateFromError(error) {
       console.log('发生错误：', error)
       // 在render之前触发，返回新的state
       return { hasError: error }
     }
     // 生命周期函数：当组件产生错误时调用
     componentDidCatch(error, info) {
       console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决')
       console.log(error, info)
     }
   
     render() {
       return (
         <div>
           <h2>我是Parent组件</h2>
           {this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child />}
         </div>
       )
     }
   }
   ```

   2）子组件：Child.jsx

   ```jsx
   import React, { Component } from 'react'
   
   export default class Child extends Component {
     state = {
       users: [
         { id: '001', name: 'tom', age: 18 },
         { id: '002', name: 'jack', age: 19 },
         { id: '003', name: 'peiqi', age: 20 },
       ],
       // users:'abc'	// 这行代码会认为产生错误
     }
   
     render() {
       return (
         <div>
           <h2>我是Child组件</h2>
           {this.state.users.map((userObj) => {
             return (
               <h4 key={userObj.id}>
                 {userObj.name}----{userObj.age}
               </h4>
             )
           })}
         </div>
       )
     }
   }
   ```

------

### 2.7 Context

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信（一般开发中不用，封装react插件时使用）

1. 创建`Context`对象：

   ```jsx
   const MyContext = React.createContext()
   const { Provider, Consumer } = MyContext
   ```

2. 在祖组件中使用`<Provider value={...}>`指定向后代组件提供的数据

   ```jsx
   export default class A extends Component {
     state = { username: 'tom', age: 18 }
     render() {
       const { username, age } = this.state
       return (
         <div className="parent">
           <h3>我是A组件</h3>
           <h4>我的用户名是:{username}</h4>
           <Provider value={{ username, age }}>
             <B />
           </Provider>
         </div>
       )
     }
   }
   // B是A的子组件
   class B extends Component {
     render() {
       return (
         <div className="child">
           <h3>我是B组件</h3>
           <C />
         </div>
       )
     }
   }
   ```

3. 在后代组件中使用`context`（类式组件）或`<Consumer>{value=>(...)}`（函数式组件）接收祖组件传递过来的数据

   1）类式组件

   ```jsx
   class C extends Component {
     // 声明接收context
     static contextType = MyContext
     render() {
       const { username, age } = this.context
       return (
         <div className="grand">
           <h3>我是C组件</h3>
           <h4>
             我从A组件接收到的用户名:{username},年龄是{age}
           </h4>
         </div>
       )
     }
   }
   ```

   2）函数式组件

   ```jsx
   function C() {
     return (
       <div className="grand">
         <h3>我是C组件</h3>
         <h4>
           我从A组件接收到的用户名:
           <Consumer>{(value) => `${value.username},年龄是${value.age}`}</Consumer>
         </h4>
       </div>
     )
   }
   ```

------

### 2.8 Hooks

> Hook是React 16.8.0版本增加的新特性，可以在函数组件中使用`state`以及其他的React特性

#### 2.8.1 State Hook

> State Hook让函数组件也可以有`state`状态, 并进行状态数据的读写操作

1. 语法: `const [xxx, setXxx] = React.useState(initValue)`

2. `useState()`说明：

   1）参数: 第一次初始化指定的值在内部作缓存

   2）返回: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数

3. `setXxx()`的2种写法:

   1）`setXxx(newValue)`：参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值

   2）`setXxx(value => newValue)`：参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值

4. 案例：

   ```jsx
   function Demo() {
     const [count, setCount] = React.useState(0)
     // 加的回调
     function add() {
       // setCount(count+1) 			// 第1种写法：参数为非函数值
       setCount((count) => count + 1)	// 第2种写法：参数为函数
     }
     return (
       <div>
         <h2>当前求和为：{count}</h2>
         <button onClick={add}>点我+1</button>
       </div>
     )
   }
   export default Demo
   ```

------

#### 2.8.2 Ref Hook

> Ref Hook可以在函数组件中存储、查找组件内的标签或任意其它数据

1. 语法: `const refContainer = useRef()`

2. 作用：保存标签对象，功能与`React.createRef()`一样

3. 案例：

   ```jsx
   function Demo() {
     const [count, setCount] = React.useState(0)
     const myRef = React.useRef()
     // 加的回调
     function add() {
       // setCount(count+1) 			// 第1种写法：参数为非函数值
       setCount((count) => count + 1) 	// 第2种写法：参数为函数
     }
     // 提示输入的回调
     function show() {
       alert(myRef.current.value)
     }
     return (
       <div>
         <input type="text" ref={myRef} />
         <h2>当前求和为：{count}</h2>
         <button onClick={add}>点我+1</button>
         <button onClick={show}>点我提示数据</button>
       </div>
     )
   }
   export default Demo
   ```

------

#### 2.8.3 Effect Hook

> Effect Hook可以在函数组件中执行副作用操作（用于模拟类组件中的生命周期钩子）

1. React中的副作用操作：

   1）发Ajax请求数据获取

   2）设置订阅、启动定时器

   3）手动更改真实DOM（不常用）

2. 语法：

   ```jsx
   React.useEffect(() => {
     // 在此可以执行任何带副作用操作
     return () => {
       // 在组件卸载前执行，在此做一些收尾工作, 比如清除定时器/取消订阅等
     }
   }, [stateValue]) // 指定监测的state元素：如果指定的是[], 回调函数只会在第一次render()后执行
   ```

3. 可以把`useEffect()`看做如下三个函数的组合：

   - `componentDidMount()`：做一些初始化工作：开启定时器、发送网络请求、订阅消息
   - `componentDidUpdate()`：如果`[stateValue]`中指定了需要监测的元素，则每次状态变更时生效，否则不生效
   - `componentWillUnmount()`：做一些收尾工作：关闭定时器、取消订阅消息

4. 案例：

   1）函数式组件

   ```jsx
   function Demo() {
     const [count, setCount] = React.useState(0)
     const myRef = React.useRef()
     
     // Effect Hook：开启定时器，让数字每隔1秒自动加1
     React.useEffect(() => {
       // 在此可以执行任何带副作用操作
       let timer = setInterval(() => {
         setCount((count) => count + 1)
       }, 1000)
       return () => {
         // 在组件卸载前执行，在此做一些收尾工作, 比如清除定时器/取消订阅等
         clearInterval(timer)
       }
     }, []) // 指定监测的state元素：如果指定的是[], 回调函数只会在第一次render()后执行
     
     // 加的回调
     function add() {
       // setCount(count+1) // 第1种写法：参数为非函数值
       setCount((count) => count + 1) // 第2种写法：参数为函数
     }
     // 提示输入的回调
     function show() {
       alert(myRef.current.value)
     }
     // Effect Hook：卸载组件的回调
     function unmount() {
       ReactDOM.unmountComponentAtNode(document.getElementById('root'))
     }
     return (
       <div>
         <input type="text" ref={myRef} />
         <h2>当前求和为：{count}</h2>
         <button onClick={add}>点我+1</button>
         <button onClick={unmount}>卸载组件</button>
         <button onClick={show}>点我提示数据</button>
       </div>
     )
   }
   // 暴露组件
   export default Demo
   ```
   2）对比：类式组件
   
   ```jsx
   export default class Demo extends React.Component {
     state = { count: 0 }
     myRef = React.createRef()
     // 加的回调
     add = () => {
       this.setState((state) => ({ count: state.count + 1 }))
     }
     // 卸载组件的回调
     unmount = () => {
       ReactDOM.unmountComponentAtNode(document.getElementById('root'))
     }
     // 提示输入的回调
     show = () => {
       alert(this.myRef.current.value)
     }
     // 生命周期函数：开启定时器，让数字每隔1秒自动加1
     componentDidMount() {
       this.timer = setInterval(() => {
         this.setState((state) => ({ count: state.count + 1 }))
       }, 1000)
     }
     // 生命周期函数：清除定时器
     componentWillUnmount() {
       clearInterval(this.timer)
     }
     render() {
       return (
         <div>
           <input type="text" ref={this.myRef} />
           <h2>当前求和为{this.state.count}</h2>
           <button onClick={this.add}>点我+1</button>
           <button onClick={this.unmount}>卸载组件</button>
           <button onClick={this.show}>点击提示数据</button>
         </div>
       )
     }
   }
   ```

------

## 第3章 React脚手架

### 3.1 脚手架简介

1. 定义：用来帮助程序员快速创建一个基于xxx库的模板项目
   - 包含了所有需要的配置（语法检查、jsx编译、devServer...）
   - 下载好了所有相关的依赖
   - 可以直接运行一个简单效果

2. React提供了一个用于创建React项目的脚手架库：`create-react-app`

3. 项目的整体技术架构为：react + webpack + es6 + eslint

4. 使用脚手架开发的项目的特点：模块化，组件化，工程化

5. 功能界面的组件化编码流程：

   1）拆分组件：拆分界面，抽取组件

   2）实现静态组件：使用组件实现静态页面效果

   3）实现动态组件：

   - 动态显示初始化数据：数据类型、数据名称、保存在哪个组件？

   - 交互（从绑定事件监听开始）

6. 推荐插件：[ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

   <img :src="$withBase('/imgs/react/react快捷键插件.png')" alt="react快捷键插件.png">

   - `rcc`：生成类式组件
   - `rfc`：生成函数式组件
   - `imp`：引入插件

------

### 3.2 使用步骤

1. 全局安装：

   ```bash
   npm i -g create-react-app
   ```

2. 创建项目：不能带中文以及其他特殊字符

   ```bash
   create-react-app <project-name>
   ```

3. 进入项目：

   ```bash
   cd <project-name>
   ```

4. 启动项目：

   ```bash
   npm start / yarn start
   ```

5. 打包项目：

   ```bash
   yarn build
   ```

6. 部署到服务器：本地可以用`serve`第三方库进行测试和预览

   1）全局安装`serve`

   ```bash
   npm i -g serve
   ```

   2）在项目的打包后生成的`build`文件夹下开启服务器

   ```bash
   serve
   ```

------

### 3.3 项目文件结构

1. 常用文件结构

|      类型       |                          文件                          |                   说明                    |
| :-------------: | :----------------------------------------------------: | :---------------------------------------: |
|    第三方库     |                     node_modules/                      |              第三方库文件夹               |
|    第三方库     |                      package.json                      |              应用包配置文件               |
|    第三方库     |              package-lock.json、yarn.lock              |              包版本控制文件               |
|     public/     |                          css/                          |               css样式文件夹               |
|     public/     |                      favicon.icon                      |               网站页签图标                |
|     public/     |                       index.html                       | 主页面，引入文件路径前要带`%PUBLIC_URL%/` |
| src/components/ |                     xxx/index.jsx                      |                  子组件                   |
| src/components/ |            xxx/index.css、index.module.css             |                子组件样式                 |
|   src/pages/    |                     xxx/index.jsx                      |                 路由组件                  |
|      src/       |                    App.js、App.jsx                     |                 父组件App                 |
|      src/       |                        App.css                         |               父组件App样式               |
|      src/       |                        index.js                        |                 入口文件                  |
|      src/       |                     setupProxy.js                      |               代理配置文件                |
|   src/redux/    | actions/xxx.js、reducers/xxx.js、constant.js、store.js |           redux文件（按需配置）           |
| src/containers/ |                     xxx/index.jsx                      |           容器组件（按需配置）            |
|    打包文件     |                         build/                         |    项目打包后的文件夹，可开启serve预览    |
|    其他文件     |                       .gitignore                       |         git版本管制忽略的配置文件         |
|    其他文件     |                       README.md                        |               应用描述文件                |

2. 其他初始化自带文件：

   1）public文件夹：

   - manifest.json：应用加壳的配置文件
   - robots.txt：爬虫协议文件
   - logo192.png、logo512.png：React的logo图

   2）src文件夹：

   - App.css：App组件的样式
   - App.test.js：用于给App做测试
   - index.css：样式
   - logo.svg：React的logo图
   - reportWebVitals.js：页面性能分析文件（需要web-vitals库的支持）
   - reportWebVitals.js：组件单元测试的文件（需要jest-dom库的支持）

3. 样式的模块化：解决css命名冲突的问题（用less不会冲突）

   1）使用`index.css`：直接引入并使用，但如果子组件有重名的样式，会产生冲突，以后引入的为准（如果使用less不会冲突）

   ```css
   .title{
   	background-color: skyblue;
   }
   ```

   ```jsx
   import './index.css'
   ......
   <h2 className="title">Welcome</h2>
   ```

   2）使用`index.module.css`：自定义引入名称，变为对象的形式，以对象的属性作为样式类名

   ```css
   .title{
   	background-color: orange;
   }
   ```

   ```jsx
   import hello from './index.module.css'
   ......
   <h2 className={hello.title}>Hello,React!</h2>
   ```

4. 基本编码案例：

   1）入口文件：index.js

   ```js
   // 引入react核心库
   import React from 'react'
   // 引入ReactDOM
   import ReactDOM from 'react-dom'
   // 引入App组件
   import App from './App'
   // 渲染App到页面
   ReactDOM.render(<App />, document.getElementById('root'))
   ```

   2）父组件：App.jsx，在上面引入第三方插件，在下面引入自己写的子组件，最下面引入css样式文件

   ```jsx
   // 创建“外壳”组件App
   import React, { Component } from 'react'
   import Hello from './components/Hello'
   import Welcome from './components/Welcome'
   
   // 创建并暴露App组件
   export default class App extends Component {
     render() {
       return (
         <div>
           <Hello />
         </div>
       )
     }
   }
   ```

   3）子组件：Hello/index.jsx、index.css

   ```jsx
   import React, { Component } from 'react'
   import from './index.css'
   
   export default class Hello extends Component {
     render() {
       return <h2 className="title">Hello,React!</h2>
     }
   }
   ```

   ```css
   .title{
   	background-color: orange;
   }
   ```

------

### 3.4 案例：ToDoList

#### 3.4.1 案例知识点

1. 拆分组件、实现静态组件，注意：要将`class`改为`className`，`style`的内容改为双花括号包裹

2. 动态初始化列表，如何确定将数据放在哪个组件的`state`中

   1）单一组件使用：放在其自身的`state`中

   2）多个组件使用：放在他们共同的父组件`state`中（状态提升）

3. 关于父子之间通信：

   1）【父组件】给【子组件】传递数据：通过`props`传递

   2）【子组件】给【父组件】传递数据：通过`props`传递，要求父提前给子传递一个函数

   ```jsx
   // 父组件：App
   // addTodo用于添加一个todo，接收的参数是todo对象
   addTodo = (todoObj) => {
     // 获取原todos
     const { todos } = this.state
     // 追加一个todo
     const newTodos = [todoObj, ...todos]
     // 更新状态
     this.setState({ todos: newTodos })
   }
   ......
   <Header addTodo={this.addTodo} />
   ```

   ```jsx
   // 子组件：Header
   // 对接收的props进行：类型、必要性的限制（非必须要写的）
   static propTypes = {
     addTodo: PropTypes.func.isRequired,
   }
   // 键盘事件的回调
   handleKeyUp = (event) => {
       ......
       const todoObj = { id: nanoid(), name: target.value, done: false }
       // 将todoObj传递给App【子传父】
       this.props.addTodo(todoObj)
   }
   ......
   <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
   ```
4. 注意`defaultChecked`和`checked`的区别，类似的还有：`defaultValue`和`value`

   1）defaultChecked：布尔值，选择框是否在初始化时默认勾选，允许用户修改

   ```jsx
   <input type="checkbox" defaultChecked={true} />
   ```

   2）checked：布尔值，选择框是否勾选，必须配合点击后切换的`onChange`函数使用，否则报错

   ```jsx
   // 勾选、取消勾选某一个todo的回调
   handleCheck = (id) => {
     return (event) => {
       this.props.updateTodo(id, event.target.checked)
     }
   }
   ......
   // 这里的done由用户勾选控制，值为true或false
   <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
   ```

5. 状态`state`在哪里，操作状态的方法就在哪里

6. 使用`nanoid`第三方插件确保id值唯一，可以将其作为`key`

------

#### 3.4.2 案例代码

1. 入口文件：index.js

   ```js
   // 引入react核心库
   import React from 'react'
   // 引入ReactDOM
   import ReactDOM from 'react-dom'
   // 引入App
   import App from './App'
   //  渲染DOM
   ReactDOM.render(<App />, document.getElementById('root'))
   ```

2. 父组件：App.jsx

   1）在`state`中定义数据

   2）定义操作状态的函数：addTodo、updateTodo、deleteTodo、checkAllTodo、checkAllDone

   3）使用props将函数传递给子组件：

   - Header：addTodo
   - List：todos数据、updateTodo、deleteTodo
   - Footer：todos数据、checkAllTodo、clearAllDone

   ```jsx
   import React, { Component } from 'react'
   import Header from './components/Header'
   import List from './components/List'
   import Footer from './components/Footer'
   import './App.css'
   
   export default class App extends Component {
     // 状态在哪里，操作状态的方法就在哪里
   
     // 初始化状态
     state = {
       todos: [
         { id: '001', name: '吃饭', done: true },
         { id: '002', name: '睡觉', done: true },
         { id: '003', name: '打代码', done: false },
         { id: '004', name: '逛街', done: false },
       ],
     }
   
     // addTodo用于添加一个todo，接收的参数是todo对象
     addTodo = (todoObj) => {
       // 获取原todos
       const { todos } = this.state
       // 追加一个todo
       const newTodos = [todoObj, ...todos]
       // 更新状态
       this.setState({ todos: newTodos })
     }
   
     // updateTodo用于更新一个todo对象
     updateTodo = (id, done) => {
       // 获取状态中的todos
       const { todos } = this.state
       // 匹配处理数据
       const newTodos = todos.map((todoObj) => {
         // 用解构赋值更新done的状态
         if (todoObj.id === id) return { ...todoObj, done }
         else return todoObj
       })
       this.setState({ todos: newTodos })
     }
   
     // deleteTodo用于删除一个todo对象
     deleteTodo = (id) => {
       // 获取原来的todos
       const { todos } = this.state
       // 删除指定id的todo对象
       const newTodos = todos.filter((todoObj) => {
         return todoObj.id !== id
       })
       // 更新状态
       this.setState({ todos: newTodos })
     }
   
     // checkAllTodo用于全选
     checkAllTodo = (done) => {
       // 获取原来的todos
       const { todos } = this.state
       // 加工数据
       const newTodos = todos.map((todoObj) => {
         return { ...todoObj, done }
       })
       // 更新状态
       this.setState({ todos: newTodos })
     }
   
     // clearAllDone用于清除所有已完成的
     clearAllDone = () => {
       // 获取原来的todos
       const { todos } = this.state
       // 过滤数据
       const newTodos = todos.filter((todoObj) => {
         return !todoObj.done
       })
       // 更新状态
       this.setState({ todos: newTodos })
     }
   
     render() {
       const { todos } = this.state
       return (
         <div className="todo-container">
           <div className="todo-wrap">
             <Header addTodo={this.addTodo} />
             <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
             <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
           </div>
         </div>
       )
     }
   }
   ```

   ```css
   /*base*/
   body {
     background: #fff;
   }
   
   .btn {
     display: inline-block;
     padding: 4px 12px;
     margin-bottom: 0;
     font-size: 14px;
     line-height: 20px;
     text-align: center;
     vertical-align: middle;
     cursor: pointer;
     box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
     border-radius: 4px;
   }
   
   .btn-danger {
     color: #fff;
     background-color: #da4f49;
     border: 1px solid #bd362f;
   }
   
   .btn-danger:hover {
     color: #fff;
     background-color: #bd362f;
   }
   
   .btn:focus {
     outline: none;
   }
   
   .todo-container {
     width: 600px;
     margin: 0 auto;
   }
   .todo-container .todo-wrap {
     padding: 10px;
     border: 1px solid #ddd;
     border-radius: 5px;
   }
   ```

3. 子组件：Header，让用户在输入框输入todo任务

   1）引入插件：prop-types（用于限制props）、nanoid（用于生成唯一id作为key）

   2）定义键盘事件回调函数`handleKeyUp`，用户在输入框输入内容后回车即可以添加任务，将id传递给父组件的`addTodo`函数

   ```jsx
   import React, { Component } from 'react'
   import PropTypes from 'prop-types'
   import { nanoid } from 'nanoid'
   import './index.css'
   
   export default class Header extends Component {
     // 对接收的props进行：类型、必要性的限制
     static propTypes = {
       addTodo: PropTypes.func.isRequired,
     }
   
     // 键盘事件的回调
     handleKeyUp = (event) => {
       // 解构赋值获取keyCode,target
       const { keyCode, target } = event
       // 判断是否是回车按键
       if (keyCode !== 13) return
       // 添加的todo名字不能为空
       if (target.value.trim() === '') {
         alert('输入不能为空')
         return
       }
       // 准备好一个todo对象
       const todoObj = { id: nanoid(), name: target.value, done: false }
       // 将todoObj传递给App【子传父】
       this.props.addTodo(todoObj)
       // 清空输入
       target.value = ''
     }
   
     render() {
       return (
         <div className="todo-header">
           <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
         </div>
       )
     }
   }
   ```

   ```css
   /*header*/
   .todo-header input {
     width: 560px;
     height: 28px;
     font-size: 14px;
     border: 1px solid #ccc;
     border-radius: 4px;
     padding: 4px 7px;
   }
   
   .todo-header input:focus {
     outline: none;
     border-color: rgba(82, 168, 236, 0.8);
     box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
   }
   ```

4. 子组件：List，其中包含孙组件Item

   1）利用数组的`arr.map()`方法批量生成列表

   2）将每条`todo`数据、updateTodo、deleteTodo继续传递给孙组件Item

   ```jsx
   import React, { Component } from 'react'
   import PropTypes from 'prop-types'
   import Item from '../Item'
   import './index.css'
   
   export default class List extends Component {
     //对接收的props进行：类型、必要性的限制
     static propTypes = {
       todos: PropTypes.array.isRequired,
       updateTodo: PropTypes.func.isRequired,
       deleteTodo: PropTypes.func.isRequired,
     }
   
     render() {
       const { todos, updateTodo, deleteTodo } = this.props
       return (
         <ul className="todo-main">
           {todos.map((todo) => {
             return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
           })}
         </ul>
       )
     }
   }
   ```

   ```css
   /*main*/
   .todo-main {
     margin-left: 0px;
     border: 1px solid #ddd;
     border-radius: 2px;
     padding: 0px;
   }
   
   .todo-empty {
     height: 40px;
     line-height: 40px;
     border: 1px solid #ddd;
     border-radius: 2px;
     padding-left: 5px;
     margin-top: 10px;
   }
   ```

5. 孙组件：Item，显示每条todo任务数据

   1）在状态state中定义鼠标是否移入的状态：`state = { mouse: false }`

   2）定义鼠标移入、移出的回调`handleMouse`，更改状态中的mouse布尔值

   3）定义勾选、取消勾选某一个todo的回调`handleCheck`，将id、checked状态传递给父组件的`updateTodo`函数

   4）定义删除一个todo的回调`handleDelete`，配合`window.confirm`，将id传递给父组件的`deleteTodo`函数

   5）注意：checkbox复选框的选中状态`checked`，必须配合`onChange`回调函数，否则报错

   ```jsx
   import React, { Component } from 'react'
   import './index.css'
   
   export default class Item extends Component {
     state = { mouse: false } // 标识鼠标移入、移出
   
     // 鼠标移入、移出的回调
     handleMouse = (flag) => {
       return () => {
         this.setState({ mouse: flag })
       }
     }
   
     // 勾选、取消勾选某一个todo的回调
     handleCheck = (id) => {
       return (event) => {
         this.props.updateTodo(id, event.target.checked)
       }
     }
   
     // 删除一个todo的回调
     handleDelete = (id) => {
       if (window.confirm('确定删除吗？')) {
         this.props.deleteTodo(id)
       }
     }
   
     render() {
       const { id, name, done } = this.props
       const { mouse } = this.state
       return (
         <li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
           <label>
             <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
             <span>{name}</span>
           </label>
           <button onClick={() => this.handleDelete(id)} className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }}>
             删除
           </button>
         </li>
       )
     }
   }
   ```

   ```css
   /*item*/
   li {
     list-style: none;
     height: 36px;
     line-height: 36px;
     padding: 0 5px;
     border-bottom: 1px solid #ddd;
   }
   
   li label {
     float: left;
     cursor: pointer;
   }
   
   li label li input {
     vertical-align: middle;
     margin-right: 6px;
     position: relative;
     top: -1px;
   }
   
   li button {
     float: right;
     display: none;
     margin-top: 3px;
   }
   
   li:before {
     content: initial;
   }
   
   li:last-child {
     border-bottom: none;
   }
   ```

6. 子组件：Footer，可以点击全选/全不选任务，清除已完成任务

   1）定义全选checkbox的回调`handleCheckAll`，将`event.target.checked`传递给父组件的`checkAllTodo`函数

   2）定义清除已完成任务的回调`handleClearAllDone`，调用父组件的`clearAllDone`函数

   3）在全选/全不选的复选框中，注意如果任务为0，则取消打钩：`doneCount === total && total !== 0 ? true : false`

   ```jsx
   import React, { Component } from 'react'
   import './index.css'
   
   export default class Footer extends Component {
     // 全选checkbox的回调
     handleCheckAll = (event) => {
       this.props.checkAllTodo(event.target.checked)
     }
   
     // 清除已完成任务的回调
     handleClearAllDone = () => {
       this.props.clearAllDone()
     }
   
     render() {
       const { todos } = this.props
       // 已完成的个数
       const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
       // 总数
       const total = todos.length
       return (
         <div className="todo-footer">
           <label>
             <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true : false} />
           </label>
           <span>
             <span>已完成{doneCount}</span> / 全部{total}
           </span>
           <button onClick={this.handleClearAllDone} className="btn btn-danger">
             清除已完成任务
           </button>
         </div>
       )
     }
   }
   ```

   ```css
   /*footer*/
   .todo-footer {
     height: 40px;
     line-height: 40px;
     padding-left: 6px;
     margin-top: 5px;
   }
   
   .todo-footer label {
     display: inline-block;
     margin-right: 20px;
     cursor: pointer;
   }
   
   .todo-footer label input {
     position: relative;
     top: -1px;
     vertical-align: middle;
     margin-right: 5px;
   }
   
   .todo-footer button {
     float: right;
     margin-top: 5px;
   }
   ```


------

## 第4章 React Ajax

### 4.1 配置代理

#### 4.1.1 简单配置代理

1. 优点：配置简单，前端请求资源时可以不加任何前缀

2. 缺点：不能配置多个代理

3. 工作方式：上述方式配置代理，当请求了 3000 不存在的资源时，那么该请求会转发给 5000 （优先匹配前端资源）

4. 语法：在`package.json`中追加如下配置

   ```json
   "proxy":"http://localhost:5000"
   ```

#### 4.1.2 完整配置代理

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理

2. 缺点：配置繁琐，前端请求资源时必须加前缀

3. 在`src`文件夹中创建代理配置文件：`setupProxy.js`

   1）`url前缀`：需要转发的请求（所有带有该前缀的请求都会转发给target目标地址）

   2）`target`：配置转发目标地址（能返回数据的服务器地址），如：http://localhost:5000

   3）`changeOrigin`：控制服务器接收到的请求头中host字段的值，默认为`false`，一般改成`true`

   - false：服务器收到的请求头中的host为：localhost:3000
   - true：服务器收到的请求头中的host为：localhost:5000

   4）`pathRewrite`：去除请求前缀，保证交给后台服务器的是正常请求地址（必须配置）

   ```js
   const proxy = require('http-proxy-middleware')
   module.exports = function (app) {
     app.use(
       proxy('/api1', {
         target: 'http://localhost:5000',
         changeOrigin: true,
         pathRewrite: { '^/api1': '' },
       }),
       proxy('/api2', {
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: { '^/api2': '' },
       })
     )
   }
   ```

------

### 4.2 发送Ajax请求

1. 前置说明：

   1）React本身只关注于界面，并不包含发送ajax请求的代码

   2）前端应用需要通过ajax请求与后台进行交互（json数据）

   3）React应用中需要集成第三方ajax库（或自己封装）

2. 常用的ajax请求库：

   1）jQuery：比较重，如果需要另外引入不建议使用

   2）[axios](https://github.com/axios/axios)：轻量级，建议使用

   - 封装XmlHttpRequest对象的ajax
   - promise风格
   - 可以用在浏览器端和node服务器端

3. GET请求：

   ```jsx
   getStudentData = () => {
     axios.get('http://localhost:3000/api1/students').then(
       (response) => {
         console.log('成功了', response.data)
       },
       (error) => {
         console.log('失败了', error)
       }
     )
   }
   ......
   <button onClick={this.getStudentData}>点我获取学生数据</button>
   ```

4. POST请求：

   ```jsx
   getCarData = () => {
     axios.get('http://localhost:3000/api2/cars').then(
       (response) => {
         console.log('成功了', response.data)
       },
       (error) => {
         console.log('失败了', error)
       }
     )
   }
   ......
   <button onClick={this.getCarData}>点我获取汽车数据</button>
   ```

------

### 4.3 消息订阅与发布

> 第三方插件：[PubSubJS](https://github.com/mroderick/PubSubJS)

1. 下载：

   ```bash
   npm i pubsub-js --save
   ```

2. 使用方法：

   1）引入PubSub：`import PubSub from 'pubsub-js'`

   2）订阅消息（接收数据）：`PubSub.subscribe('funcName', function(msg, data){...}) `，注意：`msg`一般可以用`_`代替

   3）发布消息（传递数据）：`PubSub.publish('funcName', data)`

   4）取消订阅：`PubSub.subscribe(token) `，这里的token需要在订阅消息时定义

   ```js
   // 订阅消息（接收数据）
   var token = PubSub.subscribe('MY TOPIC', (_, data) => {
     console.log(data)
   })
   
   // 发布消息（传递数据）
   PubSub.publish('MY TOPIC', 'hello world!')
   
   // 取消订阅
   PubSub.unsubscribe(token)
   ```

------

### 4.4 Fetch

> [Fetch](https://github.github.io/fetch/)是用来替代传统Ajax（XMLHttpRequest，XHR）的一种[新技术](https://segmentfault.com/a/1190000003810652)，它是基于Promise设计的

1. 定义：Fetch是JS原生函数，不再使用XMLHttpRequest对象提交Ajax请求（旧版本浏览器可能不支持）

2. XHR的缺点：（jQuery中的`$.ajax`、Axios都属于该类型）

   1）不符合关注分离的原则，配置和调用方式非常混乱

   2）基于事件的异步模型没有 Promise，generator/yield，async/await 友好

3. Fetch的优点：

   1）语法简洁，更加语义化

   2）关注分离原则：联系服务器、取回数据是分开的

   3）基于标准 Promise 实现，支持 async/await：`response.json()`返回一个Promise对象

   4）同构方便，使用[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)

4. GET请求：

   1）传统写法

   ```js
   fetch(url)
     .then(function (response) {
       return response.json()
     })
     .then(function (data) {
       console.log(data)
     })
     .catch(function (err) {
       console.log('请求出错', err)
     })
   ```

   2）箭头函数

   ```js
   fetch(url)
     .then((response) => response.json())
     .then((data) => console.log(data))
     .catch((err) => console.log('请求出错', err))
   ```

   3）使用async/await优化：await返回的是promise成功的值

   ```js
   functionName = async () => {
     try {
       let response = await fetch(url)
       let data = await response.json()
       console.log(data)
     } catch (err) {
       console.log('请求出错', err)
     }
   }
   ```

5. POST请求：

   ```js
   fetch(url, {
     method: 'POST',
     body: JSON.stringify(data),
   })
     .then(function (data) {
       console.log(data)
     })
     .catch(function (err) {
       console.log('请求出错', err)
     })
   ```

------

### 4.5 案例：Github搜索

> API：https://api.github.com/search/users?q=xxxxxx

#### 4.5.1 应用：Axios

> 注意：需要在public/index.html中引入bootstrap.css样式文件

1. 配置代理：setupProxy.js，设置API地址

   ```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function (app) {
     app.use(
       proxy('/api', {
         target: 'https://api.github.com',
         changeOrigin: true,
         pathRewrite: { '^/api': '' },
       })
     )
   }
   ```

2. 入口文件：index.js，正常书写

   ```js
   // 引入react核心库
   import React from 'react'
   // 引入ReactDOM
   import ReactDOM from 'react-dom'
   // 引入App
   import App from './App'
   // 渲染DOM
   ReactDOM.render(<App />, document.getElementById('root'))
   ```

3. 父组件：App.jsx，负责存储状态state以及相关操作方法

   1）定义state：users数组、isfirst是否第一次打开页面、isLoading是否加载中、err错误信息

   2）定义更新App的状态函数`updateAppState`，接收子组件Search传递回来的stateObj参数

   3）通过props将updateAppState传递给Search子组件，将state传递给List子组件

   ```jsx
   import React, { Component } from 'react'
   import Search from './components/Search'
   import List from './components/List'
   
   export default class App extends Component {
     state = {
       // 初始化状态
       users: [], // users初始值为数组
       isFirst: true, // 是否为第一次打开页面
       isLoading: false, // 标识是否处于加载中
       err: '', // 存储请求相关的错误信息
     }
   
     // 更新App的state
     updateAppState = (stateObj) => {
       this.setState(stateObj)
     }
   
     render() {
       return (
         <div className="container">
           <Search updateAppState={this.updateAppState} />
           <List {...this.state} />
         </div>
       )
     }
   }
   ```

4. 子组件：Search，用户在搜索框输入关键词进行搜索

   1）可以通过连续解构赋值，拿到input输入框中的内容：`const {keyWordElement: {value: keyWord}} = this`

   2）发送ajax请求，并将最新stateObj传递给父组件`updateAppState`函数更新state

   ```jsx
   import React, { Component } from 'react'
   import axios from 'axios'
   
   export default class Search extends Component {
     search = () => {
       // 获取用户的输入(连续解构赋值+重命名)
       const {
         keyWordElement: { value: keyWord },
       } = this
       // 发送请求前通知App更新状态
       this.props.updateAppState({ isFirst: false, isLoading: true })
       // 发送网络请求
       axios.get(`/api/search/users?q=${keyWord}`).then(
         (response) => {
           // 请求成功后通知App更新状态
           this.props.updateAppState({ isLoading: false, users: response.data.items })
         },
         (error) => {
           // 请求失败后通知App更新状态
           this.props.updateAppState({ isLoading: false, err: error.message })
         }
       )
     }
   
     render() {
       return (
         <section className="jumbotron">
           <h3 className="jumbotron-heading">搜索github用户</h3>
           <div>
             <input ref={(c) => (this.keyWordElement = c)} type="text" placeholder="输入关键词点击搜索" />
             &nbsp;
             <button onClick={this.search}>搜索</button>
           </div>
         </section>
       )
     }
   }
   ```

5. 子组件：List，展示搜索结果

   1）接收父组件传递过来的state

   2）通过连续三元表达式的方式代替if语句，分别判断：是否第一次展示页面、是否加载中、是否有错误提示、正常展示

   ```jsx
   import React, { Component } from 'react'
   import './index.css'
   
   export default class List extends Component {
     render() {
       const { users, isFirst, isLoading, err } = this.props
       return (
         // 三元表达式可以连续写
         <div className="row">
           {isFirst ? (
             <h2>欢迎使用，输入关键字，随后点击搜索</h2>
           ) : isLoading ? (
             <h2>Loading......</h2>
           ) : err ? (
             <h2 style={{ color: 'red' }}>{err}</h2>
           ) : (
             users.map((userObj) => {
               return (
                 <div key={userObj.id} className="card">
                   <a rel="noreferrer" href={userObj.html_url} target="_blank">
                     <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                   </a>
                   <p className="card-text">{userObj.login}</p>
                 </div>
               )
             })
           )}
         </div>
       )
     }
   }
   ```

   ```css
   .album {
     min-height: 50rem; /* Can be removed; just added for demo purposes */
     padding-top: 3rem;
     padding-bottom: 3rem;
     background-color: #f7f7f7;
   }
   
   .card {
     float: left;
     width: 33.333%;
     padding: 0.75rem;
     margin-bottom: 2rem;
     border: 1px solid #efefef;
     text-align: center;
   }
   
   .card > img {
     margin-bottom: 0.75rem;
     border-radius: 100px;
   }
   
   .card-text {
     font-size: 85%;
   }
   ```

------

#### 4.5.2 应用：PubSub

1. 父组件：App.jsx，仅留下框架结构

   ```jsx
   import React, { Component } from 'react'
   import Search from './components/Search'
   import List from './components/List'
   
   export default class App extends Component {
     render() {
       return (
         <div className="container">
           <Search />
           <List />
         </div>
       )
     }
   }
   ```

2. 子组件：Search，不再接收父组件传递的props，使用消息发布`PubSub.publish`向子组件List传递最新数据

   ```jsx
   import React, { Component } from 'react'
   import PubSub from 'pubsub-js'
   import axios from 'axios'
   
   export default class Search extends Component {
     search = () => {
       //获取用户的输入(连续解构赋值+重命名)
       const {
         keyWordElement: { value: keyWord },
       } = this
       //发送请求前通知List更新状态
       PubSub.publish('atguigu', { isFirst: false, isLoading: true })
       //发送网络请求
       axios.get(`/api/search/users?q=${keyWord}`).then(
         (response) => {
           //请求成功后通知List更新状态
           PubSub.publish('atguigu', { isLoading: false, users: response.data.items })
         },
         (error) => {
           //请求失败后通知App更新状态
           PubSub.publish('atguigu', { isLoading: false, err: error.message })
         }
       )
     }
   
     render() {
       return (
         <section className="jumbotron">
           <h3 className="jumbotron-heading">搜索github用户</h3>
           <div>
             <input ref={(c) => (this.keyWordElement = c)} type="text" placeholder="输入关键词点击搜索" />
             &nbsp;
             <button onClick={this.search}>搜索</button>
           </div>
         </section>
       )
     }
   }
   ```

3. 子组件：List

   1）存放原本在父组件App中的状态state

   2）`componentDidMount`：使用消息订阅`PubSub.subscribe`接收子组件Search传递过来的数据，并更新state

   3）`componentWillUnmount`：取消订阅，释放名称

   ```jsx
   import React, { Component } from 'react'
   import PubSub from 'pubsub-js'
   import './index.css'
   
   export default class List extends Component {
     state = {
       // 初始化状态
       users: [], // users初始值为数组
       isFirst: true, // 是否为第一次打开页面
       isLoading: false, // 标识是否处于加载中
       err: '', // 存储请求相关的错误信息
     }
     //  初始化时订阅消息
     componentDidMount() {
       this.token = PubSub.subscribe('atguigu', (_, stateObj) => {
         this.setState(stateObj)
       })
     }
     //  结束时取消订阅
     componentWillUnmount() {
       PubSub.unsubscribe(this.token)
     }
   
     render() {
       const { users, isFirst, isLoading, err } = this.state
       return (
         <div className="row">
           {isFirst ? (
             <h2>欢迎使用，输入关键字，随后点击搜索</h2>
           ) : isLoading ? (
             <h2>Loading......</h2>
           ) : err ? (
             <h2 style={{ color: 'red' }}>{err}</h2>
           ) : (
             users.map((userObj) => {
               return (
                 <div key={userObj.id} className="card">
                   <a rel="noreferrer" href={userObj.html_url} target="_blank">
                     <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                   </a>
                   <p className="card-text">{userObj.login}</p>
                 </div>
               )
             })
           )}
         </div>
       )
     }
   }
   ```

------

#### 4.5.3 应用：Fetch

1. 子组件：Search，将axios修改为fetch

   ```jsx
   import React, { Component } from 'react'
   import PubSub from 'pubsub-js'
   
   export default class Search extends Component {
     search = async () => {
       // 获取用户的输入(连续解构赋值+重命名)
       const {
         keyWordElement: { value: keyWord },
       } = this
       // 发送请求前通知List更新状态
       PubSub.publish('atguigu', { isFirst: false, isLoading: true })
       // 发送网络请求---使用fetch发送（优化）
       try {
         const response = await fetch(`/api/search/users?q=${keyWord}`)
         const data = await response.json()
         console.log(data)
         PubSub.publish('atguigu', { isLoading: false, users: data.items })
       } catch (error) {
         console.log('请求出错', error)
         PubSub.publish('atguigu', { isLoading: false, err: error.message })
       }
     }
   
     render() {
       return (
         <section className="jumbotron">
           <h3 className="jumbotron-heading">搜索github用户</h3>
           <div>
             <input ref={(c) => (this.keyWordElement = c)} type="text" placeholder="输入关键词点击搜索" />
             &nbsp;
             <button onClick={this.search}>搜索</button>
           </div>
         </section>
       )
     }
   }
   ```

------

## 第5章 React路由

### 5.1 路由简介

1. `react-router-dom`：是react的一个插件库，专门用来实现一个SPA应用

   ```bash
   npm i react-router-dom
   ```

2. SPA（Single Page Web Application）单页Web应用

   1）整个应用只有一个完整的页面

   2）点击页面中的链接不会刷新页面，只会做页面的局部更新

   3）数据都需要通过ajax请求获取，并在前端异步展现

2. 路由定义：一个路由就是一个映射关系（key：value），key为路径，value可能是function或component

3. 后端路由：value是`function`，用来处理客户端提交的请求，在node.js中使用

   1）注册路由：`router.get(path，function(req，res))`

   2）工作过程：当node接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据

4. 前端路由：浏览器端路由，value是`component`，用于展示页面内容，在React中使用

   1）注册路由：`<Route path="/test" component={Test}>`

   2）工作过程：当浏览器的path变为/test时，当前路由组件就会变为Test组件

------

### 5.2 路由原理

> 历史记录：history是BOM上的API，可以用https://cdn.bootcss.com/history/4.7.2/history.js引入简化操作

#### 5.2.1 histroy

1. histroy分类：

   1）H5原生histroy：`History.createBrowserHistory()`，直接显示路径，美观，但兼容性不好

   2）Hash值（锚点）：`History.createHashHistory()`，跳转路径前带有`#`，不美观，但兼容性较好

   ```html
   <script type="text/javascript" src="https://cdn.bootcss.com/history/4.7.2/history.js"></script>
   <script>
     let history = History.createBrowserHistory() 	// 方法一，直接使用H5推出的history身上的API
     let history = History.createHashHistory() 	// 方法二，hash值（锚点）
     // 开启控制台的历史记录监听
     history.listen((location) => {
       console.log('请求路由路径变化了', location)
     })
   </script>
   ```

2. push方法：浏览器会记录下页面历史记录，可以使用回退、前进再次访问

   1）点击按钮后不进行跳转：`return false`

   ```html
   <a href="http://www.atguigu.com" onclick="return push('/test1') ">push test1</a><br /><br />
   <script>
     ......
     function push(path) {
       history.push(path)
       return false
     }
     ......
   </script>
   ```

   2）点击使浏览器url后缀变为/test2

   ```html
   <button onClick="push('/test2')">push test2</button><br /><br />
   ```

3. repalce方法：替换当前页面的历史记录，使上一条历史记录无法通过回退、前进再次访问

   ```html
   <button onClick="replace('/test3')">replace test3</button><br /><br />
   <script>
     ......
     function replace(path) {
       history.replace(path)
     }
     ......
   </script>
   ```

4. 前进与后退：`forward()`、`back()`

   ```html
   <button onClick="back()">&lt;= 回退</button>
   <button onClick="forword()">前进 =&gt;</button>
   <script>
     ......
     function back() {
       history.goBack()
     }
     function forword() {
       history.goForward()
     }
     ......
   </script>
   ```

#### 5.2.2 跳转模式

1. push模式：React默认的跳转模式，点击导航区的`<Link>`标签跳转后会留下历史记录

   ```jsx
   <Link to="/about">About</Link>
   ```

2. replace模式：在`<Link>`标签中书写`replace`可以开启，点击跳转后不会留下历史记录（也无法通过前进、后退按钮再次访问）

   ```jsx
   <Link repalce to="/about">About</Link>
   // NavLink、封装后的NavLink都可以按此配置
   ```

------

### 5.3 基本使用

> 明确好界面中的导航区、展示区

1. 入口文件index.js：`<App>`需要用`<BrowserRouter>`或`<HashRouter>`包裹：

   ```jsx
   // 引入react核心库
   import React from 'react'
   // 引入ReactDOM
   import ReactDOM from 'react-dom'
   // 引入路由插件
   import { BrowserRouter } from 'react-router-dom'
   // 引入App
   import App from './App'
   // 渲染DOM
   ReactDOM.render(
     <BrowserRouter>
       <App />
     </BrowserRouter>,
     document.getElementById('root')
   )
   ```

2. 导航区：父组件App.jsx，编写路由链接，`<a>`标签改为`<Link>`标签

   ```jsx
   ......
   <Link className="list-group-item" to="/about">About</Link>
   <Link className="list-group-item" to="/home">Home</Link>
   ......
   ```

3. 展示区：父组件App.jsx，注册路由，`<Route>`标签进行路径的匹配

   ```jsx
   ......
   <Route path="/about" component={About} />
   <Route path="/home" component={Home} />
   ......
   ```

4. 路由组件：pages/About、Home

   ```jsx
   import React, { Component } from 'react'
   export default class About extends Component {
     render() {
       return <h3>我是About的内容</h3>
     }
   }
   ```

   ```jsx
   import React, { Component } from 'react'
   
   export default class Home extends Component {
     render() {
       return <h3>我是Home的内容</h3>
     }
   }
   ```

------

### 5.4 路径配置

> React脚手架默认将`public`文件夹作为根路径，如果请求了不存在的资源，默认返回`public/index.html`

#### 5.4.1 资源引入路径

1. 问题：如果在前端路由中配置了多级路径，如：`/atguigu/home`，再刷新页面时容易出现主页引入的css样式丢失的问题

2. 解决：

   1）public/index.html主页中引入样式时不写`./`写`/` 

   ```html
   <link rel="stylesheet" href="/css/bootstrap.css" />
   ```

   2）public/index.html主页中引入样式时不写`./`写`%PUBLIC_URL%`

   ```html
   <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css" />
   <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
   ```

   3）使用`HashRouter`：路径中带`#`，井号后面的路径都被认为是前端资源，不会发送给服务器

   ```jsx
   import { HashRouter } from 'react-router-dom'
   ......
   ReactDOM.render(
     <HashRouter>
       <App />
     </HashRouter>,
     document.getElementById('root')
   )
   ```

------

#### 5.4.2 严格/模糊匹配

> `exact`：严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

1. React默认使用的模糊匹配：【输入的路径】必须包含要【匹配的路径】，且顺序要一致

   ```jsx
   ......
   // 导航区
   <MyNavLink to="/home/a/b">Home</MyNavLink>
   ......
   // 展示区：虽然路径不完全匹配，但也可以展示Home路由组件
   <Route path="/home" component={Home}/>
   .....
   ```

2. 开启严格匹配：`exact={true}`或简写为`exact`

   ```jsx
   ......
   // 导航区
   <MyNavLink to="/home/a/b">Home</MyNavLink>
   ......
   // 展示区：路径不严格匹配，不展示任何路由组件
   <Route exact path="/home" component={Home}/>
   .....
   ```

------

### 5.5 路由组件

|    对比     |               一般组件               |                       路由组件                       |
| :---------: | :----------------------------------: | :--------------------------------------------------: |
|    写法     |              `<Demo/>`               |       `<Route path="/demo" component={Demo}/>`       |
|  存放位置   |          `components`文件夹          |                    `pages`文件夹                     |
| 接收的props | 写组件标签时传递了什么，就能收到什么 | 接收到三个固定的属性：`history`、`location`、`match` |

1. 内置组件：共7种

   ```html
   <BrowserRouter>、<HashRouter>、<Route>、<Link>、<NavLink>、<Switch>、<Redirect>
   ```

2. 其他API：共3种

   1）`history`对象

   2）`match`对象

   3）`withRouter()`函数

------

#### 5.5.1 Browser/HashRouter

|      对比      | BrowserRouter                                 | HashRouter                                    |
| :------------: | --------------------------------------------- | --------------------------------------------- |
|    底层原理    | 使用的是H5的history API，不兼容IE9及以下版本  | 使用的是URL的哈希值                           |
|    路径形式    | 路径中没有`#`，如：`localhost:3000/demo/test` | 路径包含`#`，如：`localhost:3000/#/demo/test` |
| 刷新对参数影响 | 没有影响，因为state保存在history对象中        | 会导致路由state参数的丢失                     |
|      备注      | 实际开发中比较常用                            | 可以用于解决一些路径错误相关的问题            |

------

#### 5.5.2 NavLink

> `NavLink`可以实现路由链接的高亮，通过`activeClassName`指定样式名；封装时可以通过`this.props.children`获取标签体内容

1. 直接使用：导航区将`<Link>`标签改为`<NavLink>`标签，并配置高亮样式（注意：如果不额外引入css文件，需要在pulic/index.html中书写样式）

   ```jsx
   ......
   <NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
   <NavLink activeClassName="atguigu" className="list-group-item" to="/home">Home</NavLink>
   ......
   ```

2. 封装NavLink：components/MyNavLink

   1）在components文件夹中新建组件`MyNavLink`，在标签中批量接收`props`（包含MyNavLink传递过去的`to`等参数）

   - 注意：MyNavLink中间的标签体内容默认传递给`props`中的`children`属性（但不用单独接收，直接批量接收即可）

   ```jsx
   import React, { Component } from 'react'
   import { NavLink } from 'react-router-dom'
   import './index.css'
   
   export default class MyNavLink extends Component {
     render() {
       // 注意：这里使用自闭和标签
       return <NavLink activeClassName="atguigu" className="list-group-item" {...this.props} />
     }
   }
   ```

   ```css
   /* MyNavLink/index.css */
   .atguigu {
     background-color: rgb(209, 137, 4) !important;
     color: white !important;
   }
   ```

   2）在导航区直接使用`<MyNavLink>`标签可以实现NavLink的效果

   ```jsx
   import MyNavLink from './components/MyNavLink'
   ......
   // 标签体内容：About、Home，储存在props中的children属性里（而不是title属性）
   <MyNavLink to="/about">About</MyNavLink>
   <MyNavLink to="/home">Home</MyNavLink>
   ......
   ```

------

#### 5.5.3 Switch

> Switch可以提高路由匹配效率（单一匹配）

1. 通常情况下，path和component是单一对应的关系，如果配置相同路径、不同路由组件，则会同时展示到页面上

   ```jsx
   // 点击Home导航按钮，页面同时展示Home、Test两个路由组件
   ......
   <Route path="/about" component={About} />
   <Route path="/home" component={Home} />
   <Route path="/home" component={Test} />
   ......
   ```

2. 使用Switch，path只匹配第一个component，即页面仅展示第一个路由组件内容

   ```jsx
   import { Route, Switch } from 'react-router-dom'
   ......
   <Switch>
     <Route path="/about" component={About} />
     <Route path="/home" component={Home} />
     <Route path="/home" component={Test} />
   </Switch>
   ......
   ```

------

#### 5.5.4 Redirect

> Redirect：一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

1. 展示区：Redirect写在最下方，配置`to`参数

   ```jsx
   ......
   <Switch>
     <Route path="/about" component={About} />
     <Route path="/home" component={Home} />
     <Redirect to="/about" />
   </Switch>
   ......
   ```

------

### 5.6 嵌套路由

> 注册子路由时要写上父路由的path值（有几层就写几层，要全写上），路由的匹配是按照注册路由的顺序进行的

1. 给Home路由组件下再添加2个二级路由组件：News、Message

   1）在Home组件下将页面分为导航区、展示区

   2）导航区配置`<MyNavLink>`

   3）展示区注册路由，使用`<Redirect>`配置点击Home之后默认展示的界面（切换到/home之后，还没点击二级路由，所以自动切换至Redirect指定路径）

   ```jsx
   import React, { Component } from 'react'
   import MyNavLink from '../../components/MyNavLink'
   import { Route, Switch, Redirect } from 'react-router-dom'
   import News from './News'
   import Message from './Message'
   
   export default class Home extends Component {
     render() {
       return (
         <div>
           <h3>我是Home的内容</h3>
           <div>
             <ul className="nav nav-tabs">
               <li>
                 <MyNavLink to="/home/news">News</MyNavLink>
               </li>
               <li>
                 <MyNavLink to="/home/message">Message</MyNavLink>
               </li>
             </ul>
             {/* 注册路由 */}
             <Switch>
               <Route path="/home/news" component={News} />
               <Route path="/home/message" component={Message} />
               <Redirect to="/home/news" />
             </Switch>
           </div>
         </div>
       )
     }
   }
   ```

2. 二级路由组件：

   1）News二级路由组件

   ```jsx
   import React, { Component } from 'react'
   
   export default class News extends Component {
     render() {
       return (
         <ul>
           <li>news001</li>
           <li>news002</li>
           <li>news003</li>
         </ul>
       )
     }
   }
   ```

   2）Message二级路由组件

   ```jsx
   import React, { Component } from 'react'
   
   export default class Message extends Component {
     render() {
       return (
         <ul>
           <li>message001</li>
           <li>message002</li>
           <li>message003</li>
         </ul>
       )
     }
   }
   ```

------

### 5.7 路由组件传参

#### 5.7.1 query参数

> 向子路由组件传递数据，直接在路由路径中书写，数据会暴露在浏览器地址栏中；用`this.props.match.params`接收参数

1. 父路由组件：Message

   1）路由链接(携带参数)：`<Link to='/demo/test/tom/18'}>详情</Link>`

   2）注册路由(声明接收)：`<Route path="/demo/test/:name/:age" component={Test}/>`

   ```jsx
   import React, { Component } from 'react'
   import { Link, Route } from 'react-router-dom'
   import Detail from './Detail'
   
   export default class Message extends Component {
     state = {
       messageArr: [
         { id: '01', title: '消息1' },
         { id: '02', title: '消息2' },
         { id: '03', title: '消息3' },
       ],
     }
     render() {
       const { messageArr } = this.state
       return (
         <div>
           <ul>
             {messageArr.map((msgObj) => {
               return (
                 <li key={msgObj.id}>
                   {/* 向路由组件传递params参数 */}
                   <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                 </li>
               )
             })}
           </ul>
           <hr />
           {/* 声明接收params参数 */}
           <Route path="/home/message/detail/:id/:title" component={Detail} />
         </div>
       )
     }
   }
   ```

2. 子路由组件：Message/Detail

   1）接收参数：`this.props.match.params`

   ```jsx
   import React, { Component } from 'react'
   
   const DetailData = [
     { id: '01', content: '你好，中国' },
     { id: '02', content: '你好，尚硅谷' },
     { id: '03', content: '你好，未来的自己' },
   ]
   export default class Detail extends Component {
     render() {
       // 接收params参数
       const { id, title } = this.props.match.params
       const findResult = DetailData.find((detailObj) => {
         return detailObj.id === id
       })
       return (
         <ul>
           <li>ID:{id}</li>
           <li>TITLE:{title}</li>
           <li>CONTENT:{findResult.content}</li>
         </ul>
       )
     }
   }
   ```

------

#### 5.7.2 search参数

> 向子路由组件传递数据，urlencoded编码格式：`?key1=value1%key=value2`，数据暴露在地址栏中；用`this.props.location.search`接收参数

1. 父路由组件：Message

   1）路由链接(携带参数)：`<Link to='/demo/test?name=tom&age=18'}>详情</Link>`

   2）注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`

   ```jsx
   ......
   {/* 向路由组件传递search参数 */}
   <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
   ......
   {/* search参数无需声明接收，正常注册路由即可 */}
   <Route path="/home/message/detail" component={Detail} />
   ......
   ```

2. 子路由组件：Message/Detail

   1）接收参数：`this.props.location.search`

   2）获取到的search是urlencoded编码字符串

   3）使用`querystring`插件可以解析urlencoded编码类型的数据（类似于JSON）

   - `qs.stringfy({name:'tom',age:18})`，结果为：name=tom&age=18
   - `qs.parse('name=tom&age=18')`，结果为：{name:'tom',age:18}

   ```jsx
   ......
   import qs from 'querystring'
   ......
   // 接收search参数
   const { search } = this.props.location			// id=01&title=消息1
   const { id, title } = qs.parse(search.slice(1))	// {id:'01',title:'消息1'}
   ......
   ```

------

#### 5.7.3 state参数

> 向子路由组件传递数据，写成对象形式，数据不会暴露在浏览器地址栏中；用`this.props.location.state`接收参数

1. 父路由组件：Message

   1）路由链接(携带参数)：注意这里面不是双花括号，只是单层花括号包裹了对象数据

   ```jsx
   <Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
   ```

   2）注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`

   ```jsx
   ......
   {/* 向路由组件传递state参数 */}
   <Link to={{ pathname: '/home/message/detail', state: { id: msgObj.id, title: msgObj.title } }}>{msgObj.title}</Link>
   ......
   {/* state参数无需声明接收，正常注册路由即可 */}
   <Route path="/home/message/detail" component={Detail} />
   ```

2. 子路由组件：Message/Detail

   1）接收参数：`this.props.location.state`

   2）刷新也可以保留住参数（由于query、search在路径中携带数据，刷新肯定也可以保留参数）

   3）注意：如果清除缓存和历史记录，会导致state参数丢失，所以需要在接收state的同时写上备用的空对象

   ```jsx
   ......
   // 接收state参数
   const { id, title } = this.props.location.state || {}
   ......
   // 如果清除缓存和历史记录，会导致state参数丢失，所以需要在接收state的同时写上备用的空对象
   const findResult = DetailData.find((detailObj) => {
       return detailObj.id === id }) || {}
   ......
   ```

------

### 5.8 编程式路由导航

> 不通过用户点击跳转，而借助`this.prosp.history`对象上的API对操作路由跳转、前进、后退；事件绑定必须写成箭头函数形式

#### 5.8.1 push跳转

1. 语法：`this.props.history.push(...)`，括号内根据传递的query、search、state参数而定

2. 传递query参数：

   1）父路由组件

   ```jsx
   pushShow = (id, title) => {
     //push跳转+携带params参数
     this.props.history.push(`/home/message/detail/${id}/${title}`)
   }
   ......
   {/* 向路由组件传递params参数 */}
   <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
   // 注意这里函数的写法，必须写成箭头函数的形式
   <button onClick={() => this.pushShow(msgObj.id, msgObj.title)}>push查看</button>
   ......
   {/* 声明接收params参数 */}
   <Route path="/home/message/detail/:id/:title" component={Detail}/>
   ......
   ```

   2）子路由组件

   ```jsx
   ......
   // 接收params参数
   const {id,title} = this.props.match.params
   ......
   ```

3. 传递search参数：

   1）父路由组件

   ```jsx
   pushShow = (id, title) => {
     //push跳转+携带search参数
     this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
   }
   ......
   {/* 向路由组件传递search参数 */}
   <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
   <button onClick={() => this.pushShow(msgObj.id, msgObj.title)}>push查看</button>
   ......
   {/* search参数无需声明接收，正常注册路由即可 */}
   <Route path="/home/message/detail" component={Detail}/>
   ......
   ```

   2）子路由组件

   ```jsx
   ......
   // 接收search参数
   const {search} = this.props.location
   const {id,title} = qs.parse(search.slice(1))
   ......
   ```

4. 传递state参数：

   1）父路由组件

   ```jsx
   pushShow = (id, title) => {
     //push跳转+携带state参数
     this.props.history.push(`/home/message/detail`, { id, title })
   }
   ......
   {/* 向路由组件传递state参数 */}
   <Link to={{ pathname: '/home/message/detail', state: { id: msgObj.id, title: msgObj.title } }}>{msgObj.title}</Link>
   <button onClick={() => this.pushShow(msgObj.id, msgObj.title)}>push查看</button>
   ......
   {/* state参数无需声明接收，正常注册路由即可 */}
   <Route path="/home/message/detail" component={Detail} />
   ......
   ```

   2）子路由组件

   ```jsx
   ......
   // 接收state参数
   const {id,title} = this.props.location.state || {}
   const findResult = DetailData.find((detailObj)=>{ return detailObj.id === id }) || {}
   ......
   ```

------

#### 5.8.2 replace跳转

1. 语法：`this.props.history.replace(...)`，括号内根据传递的query、search、state参数而定

2. 具体案例与push相同

   ```jsx
   replaceShow = (id, title) => {
     //replace跳转+携带params参数
     //this.props.history.replace(`/home/message/detail/${id}/${title}`)
     
     //replace跳转+携带search参数
     // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)
     
     //replace跳转+携带state参数
     this.props.history.replace(`/home/message/detail`, { id, title })
   }
   ......
   <button onClick={() => this.replaceShow(msgObj.id, msgObj.title)}>replace查看</button>
   ......
   {/* 声明接收params参数 */}
   {/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}
   {/* search参数无需声明接收，正常注册路由即可 */}
   {/* <Route path="/home/message/detail" component={Detail}/> */}
   {/* state参数无需声明接收，正常注册路由即可 */}
   <Route path="/home/message/detail" component={Detail} />
   ......
   ```

------

#### 5.8.3 前进与后退

1. 前进：`this.props.history.goForward()`

2. 后退：`this.props.history.goBack()`

3. 跳转指定页数：`this.props.history.go(n)`，n为正数即前进，n为负数即后退

   ```jsx
   ......
   back = () => {
     this.props.history.goBack()
   }
   forward = () => {
     this.props.history.goForward()
   }
   go = () => {
     this.props.history.go(-2)
   }
   ......
   <button onClick={this.back}>回退</button>
   <button onClick={this.forward}>前进</button>
   <button onClick={this.go}>go</button>
   ......
   ```

------

### 5.9 withRouter函数

> withRouter可以加工一般组件，让一般组件具备路由组件所特有的API，返回值是一个新组件

1. 使用方法：

   1）导入`withRouter`：`import { withRouter } from 'react-router-dom'`

   2）在一般组件components中以路由组件的语法进行定义

   3）使用withRouter导出一般组件：`export default withRouter(xxx)`

2. 案例：将前进、后退、go按钮放到一般组件components/Header中

   ```jsx
   import React, { Component } from 'react'
   import { withRouter } from 'react-router-dom'
   
   class Header extends Component {
     back = () => {
       this.props.history.goBack()
     }
     forward = () => {
       this.props.history.goForward()
     }
     go = () => {
       this.props.history.go(-2)
     }
     render() {
       console.log('Header组件收到的props是', this.props)
       return (
         <div className="page-header">
           <h2>React Router Demo</h2>
           <button onClick={this.back}>回退</button>&nbsp;
           <button onClick={this.forward}>前进</button>&nbsp;
           <button onClick={this.go}>go</button>
         </div>
       )
     }
   }
   export default withRouter(Header)
   ```

------

### 5.10 懒加载

> 使用React中内置的`lazy`、`Suspence`可以实现懒加载，常用在路由组件中，如果不配置则默认加载全部路由组件后再展示页面

1. 定义懒加载需要呈现的组件界面：components/Loading

   ```jsx
   import React, { Component } from 'react'
   
   export default class Loading extends Component {
     render() {
       return (
         <div>
           <h1 style={{ backgroundColor: 'gray', color: 'orange' }}>Loading....</h1>
         </div>
       )
     }
   }
   ```

2. 父组件：App.jsx

   1）引入懒加载所需的`lazy`、`Suspence`

   ```jsx
   import React, { Component, lazy, Suspense } from 'react'
   ```

   2）引入定义好的Loading组件，并将其他需要懒加载的组件使用`lazy(() => import(...))`引入

   ```jsx
   import Loading from './Loading'
   const Home = lazy(() => import('./Home'))
   const About = lazy(() => import('./About'))
   ```

   3）在展示区使用`<Suspense fallback={...}>`包裹注册路由

   ```jsx
   ......
   <Suspense fallback={<Loading />}>
     {/* 注册路由 */}
     <Route path="/about" component={About} />
     <Route path="/home" component={Home} />
   </Suspense>
   ......
   ```

------

## 第6章 React UI组件库

### 6.1 常用UI组件库

1. material-ui（国外）：[http://www.material-ui.com/#/](http://www.material-ui.com/#/)

2. ant-design（蚂蚁金服）：[https://ant.design/index-cn](https://ant.design/index-cn)

3. element-ui（饿了么）：[https://element.eleme.cn/#/zh-CN](https://element.eleme.cn/#/zh-CN)

4. Vant（移动端）：[https://youzan.github.io/vant-weapp/#/home](https://youzan.github.io/vant-weapp/#/home)

### 6.2 Antd

1. 安装：

   ```bash
   yarn add antd
   ```

2. 安装依赖：

   ```bash
   yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
   ```

3. 简单使用：不推荐，因为全部引入体积较大

   ```jsx
   import React, { Component } from 'react'
   import { Button, DatePicker } from 'antd'
   import { WechatOutlined, WeiboOutlined, SearchOutlined } from '@ant-design/icons'
   import 'antd/dist/antd.css'	// 这里引入后体积较大，按官方配置后无需再引入
   const { RangePicker } = DatePicker
   
   export default class App extends Component {
     render() {
       return (
         <div>
           App....
           <button>点我</button>
           <Button type="primary">按钮1</Button>
           <Button>按钮2</Button>
           <Button type="link">按钮3</Button>
           <Button type="primary" icon={<SearchOutlined />}>
             Search
           </Button>
           <WechatOutlined />
           <WeiboOutlined />
           <DatePicker />
           <RangePicker />
         </div>
       )
     }
   }
   
   ```

4. 在 create-react-app 中使用：[官方推荐方法](https://ant.design/docs/react/use-with-create-react-app-cn)

   1）修改`package.json`文件

   ```json
   ......
   "scripts": {
   	"start": "react-app-rewired start",
   	"build": "react-app-rewired build",
   	"test": "react-app-rewired test",
   	"eject": "react-scripts eject"
   },
   ......
   ```

   2）项目根目录下创建`config-overrides.js`

   ```js
   // 配置具体的修改规则
   const { override, fixBabelImports, addLessLoader } = require('customize-cra')
   
   module.exports = override(
     fixBabelImports('import', {
       libraryName: 'antd',
       libraryDirectory: 'es',
       style: true,
     }),
     addLessLoader({
       lessOptions: {
         javascriptEnabled: true,	// 允许用JS修改Antd底层的less文件
         modifyVars: { '@primary-color': 'green' },	// 自定义主题颜色
       },
     })
   )
   ```

   3）不用在组件里亲自引入样式了，删掉：`import 'antd/dist/antd.css'`
   
   4）自定义主题：[https://ant.design/docs/react/customize-theme-cn](https://ant.design/docs/react/customize-theme-cn)

------

## 第7章 Redux

> Redux：可以集中式管理React应用中多个组件共享的状态

### 7.1 Redux简介

1. 官方文文档：
   - 英文文档：[https://redux.js.org/](https://redux.js.org/)
   - 中文文档：[http://www.redux.org.cn/](http://www.redux.org.cn/)
   - Github：[https://github.com/reactjs/redux](https://github.com/reactjs/redux)

2. 定义：redux是一个专门用于做状态管理的JS库（不是react插件库）,可以用在react、angular、vue等项目中，但基本与react配合使用

3. 安装：

   ```bash
   npm i redux / yarn add redux
   ```

4. 应用场景：

   1）某个组件的状态，需要让其他组件可以随时拿到（共享）

   2）一个组件需要改变另一个组件的状态（通信）

   3）总体原则：能不用就不用，如果不用比较吃力才考虑使用

5. 工作原理图：

   <img :src="$withBase('/imgs/react/redux原理图.png')" alt="redux原理图">

------

### 7.2 核心概念

#### 7.2.1 action

> `action`是对象（同步）或函数（异步），储存函数名和待加工数据，由`store`中的`dispatch`方法发放

1. 文件位置：src/redux/actions/组件名.js、src/redux/constant.js（用于定义action对象中type类型的常量值）

2. 属性：

   1）`type`：标识属性，值为字符串，唯一，必要属性

   2）`data`：数据属性，值类型任意，可选属性

3. 定义同步`action`：

   ```jsx
   {type: 'ADD_STUDENT', data: {name: 'tom', age: 18}}
   ```

4. 定义异步`action`：不是必须要写的，可以自己等待异步任务的结果了再去分发同步action；并在store中引入`redux-thunk`

   ```bash
   yarn add redux-thunk
   ```

   ```js
   // store.js
   ......
   import { createStore, applyMiddleware } from 'redux'
   import reducer from './reducers'
   // 引入redux-thunk，用于支持异步action
   import thunk from 'redux-thunk'
   // 暴露store
   export default createStore(reducer, applyMiddleware(thunk))
   ```

   ```js
   // xxx_action.js
   // 同步action，就是指action的值为Object类型的一般对象
   export const createIncrementAction = (data) => ({ type: 'increment', data })
   
   // 异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的
   export const createIncrementAsyncAction = (data, time) => {
     return (dispatch) => {
       setTimeout(() => {
         dispatch(createIncrementAction(data))
       }, time)
     }
   }
   ```

------

#### 7.2.2 reducer

> `reducer`用于初始化状态、加工状态，根据旧state(`previousState`)和`action`，产生新state(`newState`)的纯函数

1. 定义：reducer的本质是一个函数，接收：`previousState`、`action`，返回加工后的新状态(`newState`)

2. 文件位置：src/redux/reducers/组件名.js、src/redux/reducers/index.js（用于汇总并暴露所有的reducer）

3. reducer已经接管了state，子组件中的state已经与redux中的state无关了，子组件中可用`store.getState()`获取由reducer接管的state

4. reducer被第一次调用时，是store自动触发的

   1）传递的`previousState`：`undefined`

   2）传递的`action`：`{type:'@@REDUX/INIT_a.2.b.4}`

5. reducer必须是**纯函数**：只要是同样的输入（实参），必定得到同样的输出（返回）

   1）不得改写参数数据（如数组arr中的`push`、`unshift`等方法，都属于改变参数数据，推荐使用扩展运算符）

   2）不能产生任何副作用，例如网络请求、输入和输出设备

   3）不能调用`Date.now()`或者`Math.random()`等不纯的方法

   ```js
   // 求和案例：redux/reducers/person.js
   import { ADD_PERSON } from '../constant'
   // 初始化人的列表
   const initState = [{ id: '001', name: 'tom', age: 18 }]
   export default function personReducer(preState = initState, action) {
     const { type, data } = action
     switch (type) {
       case ADD_PERSON: // 若是添加一个人
         // 此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了
         // 因为React会在底层【浅比较】preState的地址，如果相同则不会渲染页面
         // preState.unshift(data) 
         return [data, ...preState]
       default:
         return preState
     }
   }
   ```

------

#### 7.2.3 store

> `store`是将state、action、reducer联系在一起的对象，将旧state(`previousState`)和`action`传递给`reducer`

1. 定义：store是redux库最核心的管理对象，内部维护着`state`和`reducer`

2. 文件位置：src/redux/store.js

3. 创建：使用`createStore()`创建store对象

4. 方法：

   1）`store.getState()`：得到state

   2）`store.dispatch(action)`：分发action，触发reducer调用，产生新的state

   ```jsx
   store.dispatch({ type: 'increment', data: value * 1 })
   ```

   3）`store.subscribe(listener)`：在入口文件`index.js`中注册监听，当redux管理的state发生改变时自动调用，重新渲染`<App/>`

   ```js
   // 入口文件：index.js
   // redux只负责管理状态，至于状态的改变驱动着页面的展示，要自己写
   store.subscribe(() => {
     ReactDOM.render(<App />, document.getElementById('root'))
   })
   ```

------

### 7.3 Redux API

#### 7.3.1 createStore

> 创建包含指定`reducer`的`store`对象

1. 语法：src/redux/store.js

   ```js
   import {createStore} from 'redux'
   import reducer from './reducers'
   // 暴露store
   const store = createStore(reducer)
   ```

#### 7.3.2 applyMiddleware

> 应用上基于redux的中间件（插件库），例如支持异步action的`redux-thunk`插件

1. 语法：src/redux/store.js

   ```js
   import { createStore, applyMiddleware } from 'redux'
   import reducer from './reducers'
   // 引入redux-thunk，用于支持异步action
   import thunk from 'redux-thunk'
   // 暴露store
   export default createStore(reducer, applyMiddleware(thunk))
   ```

#### 7.3.3 combineReducers

> 合并多个容器组件的`reducer`，合并后的总状态是一个对象，在UI组件中通过`state.xxx`调用

1. 语法：src/redux/reducers/index.js

   ```js
   // 引入combineReducers，用于汇总多个reducer
   import { combineReducers } from 'redux'
   // 引入为Count组件服务的reducer
   import count from './count'
   // 引入为Person组件服务的reducer
   import persons from './person'
   
   // 汇总所有的reducer变为一个总的reducer
   export default combineReducers({
     count,
     persons,
   })
   ```

------

### 7.4 React-redux

> react插件库，专门用来简化react应用中使用redux

<img :src="$withBase('/imgs/react/react-redux模型图.png')" alt="react-redux模型图">

#### 7.4.1 基本概念

1. 安装：

   ```bash
   yarn add react-redux
   ```

2. UI组件：放在`components`文件夹

   1）只负责UI的呈现，不带有任何业务逻辑

   2）通过`props`接收数据（一般数据和函数）

   3）不使用任何Redux的API

3. 容器组件：放在`containers`文件夹

   1）负责管理数据和业务逻辑，不负责UI的呈现

   2）使用Redux的API

   3）使用`connect`函数创造容器组件

4. UI组件与容器组件整合为一个文件：

   1）定义好UI组件，但不暴露

   2）引入connect生成一个容器组件并暴露

   ```jsx
   export default connect(
     (state) => ({ key: value }),
     {
       key: xxxAction,
     }
   )(UI组件)
   ```
   
   3）在UI组件中通过`this.props.xxx`读取和操作状态（对比：之前是用`store.getState()`获取）

------

#### 7.4.2 相关API

1. `Provider`：让所有组件都可以得到state数据（在入口文件index.js中配置）

   ```jsx
   <Provider store={store}>
     <App />
   </Provider>,
   ```

2. `connect`：用于包装UI组件生成容器组件

   ```jsx
   // 引入Count的UI组件
   import CountUI from '../../components/Count'
   // 引入action
   ......
   // 引入connect用于连接UI组件与redux
   import { connect } from 'react-redux'
   ......
   // 使用connect()()创建并暴露一个Count的容器组件
   export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
   ```

3. `mapStateToprops`：将外部的数据（即state对象）转换为UI组件的标签属性

   1）用于传递状态，返回值是一个对象

   2）返回的对象中的`key`就为传递给UI组件props的key，`value`就作为传递给UI组件props的value

   ```jsx
   function mapStateToProps(state) {
     return { count: state }
   }
   ```

   3）在connect中书写可以简写：

   ```jsx
   export default connect(
     (state) => ({ count: state }),
   )(Count)
   ```

4. `mapDispatchToProps`：将分发action的函数转换为UI组件的标签属性

   1）用于传递操作状态的方法，返回值是一个对象

   2）返回的对象中的`key`就为传递给UI组件props的key，`value`就作为传递给UI组件props的value

   ```jsx
   function mapDispatchToProps(dispatch) {
     return {
       jia: (number) => dispatch(createIncrementAction(number)),
       jian: (number) => dispatch(createDecrementAction(number)),
       jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
     }
   }
   ```
   
   3）在connect中书写可以简写：
   
   ```jsx
   export default connect(
     // mapDispatchToProps的一般写法
     dispatch => ({
   		jia:number => dispatch(createIncrementAction(number)),
   		jian:number => dispatch(createDecrementAction(number)),
   		jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
   	})
   )(Count)
   ```
   
   ```jsx
   export default connect(
     // mapDispatchToProps的简写（react-redux会自动dispatch）
     {
       jia: createIncrementAction,
       jian: createDecrementAction,
       jiaAsync: createIncrementAsyncAction,
     }
   )(Count)
   ```

------


#### 7.4.3 开发者工具

1. Chrome插件：[Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=zh-CN)

   <img :src="$withBase('/imgs/react/redux开发者工具.png')" alt="redux开发者工具">

2. 下载工具依赖包

   ```bash
   yarn add redux-devtools-extension
   ```

3. `store.js`中配置：如果想让项目可以被开发者工具监测，必须配置这段代码，否则无法使用开发者工具

   ```js
   ......
   import {composeWithDevTools} from 'redux-devtools-extension'
   const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
   ......
   ```

------

### 7.5 求和案例

#### 7.5.1 React版

1. 入口文件：index.js

   ```js
   import React from 'react'
   import ReactDOM from 'react-dom'
   import App from './App'
   
   ReactDOM.render(<App />, document.getElementById('root'))
   ```

2. 父组件：App.jsx

   ```jsx
   import React, { Component } from 'react'
   import Count from './components/Count'
   
   export default class App extends Component {
     render() {
       return (
         <div>
           <Count />
         </div>
       )
     }
   }
   ```

3. 子组件：components/Count

   ```jsx
   import React, { Component } from 'react'
   
   export default class Count extends Component {
     state = { count: 0 }
   
     // 加法
     increment = () => {
       const { value } = this.selectNumber
       const { count } = this.state
       // 这里乘1是为了避免解析为字符串拼接
       this.setState({ count: count + value * 1 })
     }
     // 减法
     decrement = () => {
       const { value } = this.selectNumber
       const { count } = this.state
       this.setState({ count: count - value * 1 })
     }
     // 奇数再加
     incrementIfOdd = () => {
       const { value } = this.selectNumber
       const { count } = this.state
       if (count % 2 !== 0) {
         this.setState({ count: count + value * 1 })
       }
     }
     // 异步加（等待一定时间后再加）
     incrementAsync = () => {
       const { value } = this.selectNumber
       const { count } = this.state
       setTimeout(() => {
         this.setState({ count: count + value * 1 })
       }, 500)
     }
   
     render() {
       return (
         <div>
           <h1>当前求和为：{this.state.count}</h1>
           <select ref={(c) => (this.selectNumber = c)}>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
           </select>
           &nbsp;
           <button onClick={this.increment}>+</button>&nbsp;
           <button onClick={this.decrement}>-</button>&nbsp;
           <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
           <button onClick={this.incrementAsync}>异步加</button>&nbsp;
         </div>
       )
     }
   }
   ```

------

#### 7.5.2 Redux版

> 利用redux中的action、reducer、store接管组件中的状态和方法，并实现异步action

1. 入口文件：index.js，监测store中状态的改变，一旦发生改变重新渲染`<App/>`

   ```js
   import React from 'react'
   import ReactDOM from 'react-dom'
   import App from './App'
   import store from './redux/store'
   
   ReactDOM.render(<App />, document.getElementById('root'))
   
   // redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写
   store.subscribe(() => {
     ReactDOM.render(<App />, document.getElementById('root'))
   })
   ```

2. 父组件：App.jsx，正常书写

   ```jsx
   import React, { Component } from 'react'
   import Count from './components/Count'
   
   export default class App extends Component {
     render() {
       return (
         <div>
           <Count />
         </div>
       )
     }
   }
   ```

3. 使用redux：在src下创建redux文件夹

   1）`constant.js`：定义action对象中type类型的常量值，便于管理的同时防止程序员单词写错

   ```js
   export const INCREMENT = 'increment'
   export const DECREMENT = 'decrement'
   ```

   2）`count_action.js`：为Count组件生成action对象，这里`({...})`的意思是返回对象obj；定义异步action，内部调用同步action

   ```js
   import { INCREMENT, DECREMENT } from './constant'
   
   // 同步action，就是指action的值为Object类型的一般对象
   export const createIncrementAction = (data) => ({ type: INCREMENT, data })
   export const createDecrementAction = (data) => ({ type: DECREMENT, data })
   
   // 异步action，就是指action的值为函数, 异步action中一般都会调用同步action，异步action不是必须要用的
   export const createIncrementAsyncAction = (data, time) => {
     return (dispatch) => {
       setTimeout(() => {
         dispatch(createIncrementAction(data))
       }, time)
     }
   }
   ```

   3）`count_reducer.js`：创建一个为Count组件服务的reducer，接收`previousState`、`action`这两个参数

   ```js
   import { INCREMENT, DECREMENT } from './constant'
   // 初始化状态（接管子组件中的state，可用store.getState()获取，从此子组件中的state与redux无关了）
   const initState = 0
   // preState = initState：基本JS语法，形参默认值，如果没有传递preState参数，或传递值为undefined，preState默认等于initState
   export default function countReducer(preState = initState, action) {
     // 从action对象中获取：type、data
     const { type, data } = action
     // 根据type决定如何加工数据
     switch (type) {
       case INCREMENT: // 如果是加
         return preState + data
       case DECREMENT: // 若果是减
         return preState - data
       default:
         return preState
     }
   }
   ```

   4）`store.js`：暴露一个store对象（整个应用只有一个）；引入`redux-thunk`，支持异步action，并使用`applyMiddleware`导出

   ```js
   // 引入createStore，专门用于创建redux中最为核心的store对象
   import { createStore, applyMiddleware } from 'redux'
   // 引入为Count组件服务的reducer
   import countReducer from './count_reducer'
   // 引入redux-thunk，用于支持异步action
   import thunk from 'redux-thunk'
   // 暴露store
   export default createStore(countReducer, applyMiddleware(thunk))
   ```

4. 子组件：components/Count，去除Count组件自身的状态，通过`store.dispatch()`调用方法，通过`store.getState()`调用状态

   ```jsx
   import React, { Component } from 'react'
   // 引入store，用于获取redux中保存状态
   import store from '../../redux/store'
   // 引入actionCreator，专门用于创建action对象
   import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'
   
   
   export default class Count extends Component {
     // 这里的state随便写，与redux无关，真正的state已经交给reducer了（initState）
     state = { carName: '奔驰c63' }	
     // 加法
     increment = () => {
       const { value } = this.selectNumber
       // 通过dispatch方法将action传递给reducer
       store.dispatch(createIncrementAction(value * 1))
     }
     // 减法
     decrement = () => {
       const { value } = this.selectNumber
       store.dispatch(createDecrementAction(value * 1))
     }
     // 奇数再加
     incrementIfOdd = () => {
       const { value } = this.selectNumber
       const count = store.getState()
       if (count % 2 !== 0) {
         store.dispatch(createIncrementAction(value * 1))
       }
     }
     // 异步加
     incrementAsync = () => {
       const { value } = this.selectNumber
       setTimeout(() => {
         store.dispatch(createIncrementAsyncAction(value * 1, 500))
     }
   
     render() {
       return (
         <div>
           <h1>当前求和为：{store.getState()}</h1>
           <select ref={(c) => (this.selectNumber = c)}>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
           </select>
           &nbsp;
           <button onClick={this.increment}>+</button>&nbsp;
           <button onClick={this.decrement}>-</button>&nbsp;
           <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
           <button onClick={this.incrementAsync}>异步加</button>&nbsp;
         </div>
       )
     }
   }
   ```


------

#### 7.5.5 React-redux版

> 容器组件负责与redux通信，通过`props`将数据和方法传递给UI组件（容器与UI组件可以合并）；使用`Provider`使所有组件都可以得到`state`数据

1. 入口文件：index.js，配置`Provider`，让所有组件都可以得到`state`数据（不用再自己检测redux中状态的改变了）

   ```js
   import React from 'react'
   import ReactDOM from 'react-dom'
   import App from './App'
   import store from './redux/store'
   import { Provider } from 'react-redux'
   
   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   )
   ```

2. 父组件：App.jsx，正常书写

   ```jsx
   import React, { Component } from 'react'
   import Count from './containers/Count'
   
   export default class App extends Component {
     render() {
       return (
         <div>
           <Count />
         </div>
       )
     }
   }
   ```

3. redux/constant.js：定义action对象中type类型的常量值，便于管理的同时防止程序员单词写错

   ```js
   // count组件中的方法名称
   export const INCREMENT = 'increment'
   export const DECREMENT = 'decrement'
   // person组件的方法名称
   export const ADD_PERSON = 'add_person'
   ```

4. redux/actions：定义各组件的`action`

   1）count.js：count组件的action

   ```js
   import { INCREMENT, DECREMENT } from '../constant'
   
   // 同步action，就是指action的值为Object类型的一般对象
   export const increment = (data) => ({ type: INCREMENT, data })
   export const decrement = (data) => ({ type: DECREMENT, data })
   
   // 异步action，就是指action的值为函数，异步action中一般都会调用同步action，异步action不是必须要用的
   export const incrementAsync = (data, time) => {
     return (dispatch) => {
       setTimeout(() => {
         dispatch(increment(data))
       }, time)
     }
   }
   ```

   2）person.js：person组件的action

   ```js
   import { ADD_PERSON } from '../constant'
   // 创建增加一个人的action动作对象
   export const addPerson = (personObj) => ({ type: ADD_PERSON, data: personObj })
   ```

5. redux/reducers：定义各组件的`reducer`

   1）count.js：count组件的reducer

   ```js
   import { INCREMENT, DECREMENT } from '../constant'
   // 初始化状态
   const initState = 0
   export default function countReducer(preState = initState, action) {
     // 从action对象中获取：type、data
     const { type, data } = action
     // 根据type决定如何加工数据
     switch (type) {
       case INCREMENT: // 如果是加
         return preState + data
       case DECREMENT: // 如果是减
         return preState - data
       default:
         return preState
     }
   }
   ```

   2）person.js：person组件的reducer

   ```js
   import { ADD_PERSON } from '../constant'
   // 初始化人的列表
   const initState = [{ id: '001', name: 'tom', age: 18 }]
   export default function personReducer(preState = initState, action) {
     const { type, data } = action
     switch (type) {
       case ADD_PERSON: // 若是添加一个人
         // preState.unshift(data) // 此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了
         return [data, ...preState]
       default:
         return preState
     }
   }
   ```

   3）index.js：汇总所有组件的reducer为一个总的reducer

   ```js
   // 引入combineReducers，用于汇总多个reducer
   import { combineReducers } from 'redux'
   // 引入为Count组件服务的reducer
   import count from './count'
   // 引入为Person组件服务的reducer
   import persons from './person'
   // 汇总所有的reducer变为一个总的reducer
   export default combineReducers({
     count,
     persons,
   })
   ```

6. redux/store.js：引入`redux-thunk`（支持异步action），引入`redux-devtools-extension`（支持浏览器开发者工具）

   ```js
   // 引入createStore，专门用于创建redux中最为核心的store对象
   import { createStore, applyMiddleware } from 'redux'
   // 引入汇总之后的reducer
   import reducer from './reducers'
   // 引入redux-thunk，用于支持异步action
   import thunk from 'redux-thunk'
   // 引入redux-devtools-extension，用于支持浏览器开发者工具
   import { composeWithDevTools } from 'redux-devtools-extension'
   // 暴露store
   export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
   ```

7. 子组件：在src下创建`containers`文件夹，容器组件与UI组件合并书写（创建UI组件不暴露，仅暴露`connect`创建的容器组件）

   1）Count组件：仅引入React、Component，将各方法函数改为容器传递过来`props`中的方法

   ```jsx
   import React, { Component } from 'react'
   // 引入action
   import { increment, decrement, incrementAsync } from '../../redux/actions/count'
   // 引入connect用于连接UI组件与redux
   import { connect } from 'react-redux'
   
   // 定义UI组件
   class Count extends Component {
     state = { carName: '奔驰c63' }
   
     // 加法
     increment = () => {
       const { value } = this.selectNumber
       this.props.increment(value * 1)
     }
     // 减法
     decrement = () => {
       const { value } = this.selectNumber
       this.props.decrement(value * 1)
     }
     // 奇数再加
     incrementIfOdd = () => {
       const { value } = this.selectNumber
       if (this.props.count % 2 !== 0) {
         this.props.increment(value * 1)
       }
     }
     // 异步加
     incrementAsync = () => {
       const { value } = this.selectNumber
       this.props.incrementAsync(value * 1, 500)
     }
   
     render() {
       return (
         <div>
           <h2>我是Count组件,下方组件总人数为:{this.props.renshu}</h2>
           <h4>当前求和为：{this.props.count}</h4>
           <select ref={(c) => (this.selectNumber = c)}>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
           </select>
           &nbsp;
           <button onClick={this.increment}>+</button>&nbsp;
           <button onClick={this.decrement}>-</button>&nbsp;
           <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
           <button onClick={this.incrementAsync}>异步加</button>&nbsp;
         </div>
       )
     }
   }
   
   // 使用connect()()创建并暴露一个Count的容器组件
   export default connect(
     (state) => ({
       count: state.count,
       personCount: state.persons.length,
     }),
     { increment, decrement, incrementAsync }
   )(Count)
   
   ```

   2）Person组件：仅引入React、Component，将各方法函数改为容器传递过来props中的方法

   ```jsx
   import React, { Component } from 'react'
   import { nanoid } from 'nanoid'
   import { connect } from 'react-redux'
   import { addPerson } from '../../redux/actions/person'
   
   class Person extends Component {
     addPerson = () => {
       const name = this.nameNode.value
       const age = this.ageNode.value * 1
       const personObj = { id: nanoid(), name, age }
       this.props.addPerson(personObj)
       this.nameNode.value = ''
       this.ageNode.value = ''
     }
   
     render() {
       return (
         <div>
           <h2>我是Person组件,上方组件求和为{this.props.count}</h2>
           <input ref={(c) => (this.nameNode = c)} type="text" placeholder="输入名字" />
           <input ref={(c) => (this.ageNode = c)} type="text" placeholder="输入年龄" />
           <button onClick={this.addPerson}>添加</button>
           <ul>
             {this.props.persons.map((p) => {
               return (
                 <li key={p.id}>
                   {p.name}--{p.age}
                 </li>
               )
             })}
           </ul>
         </div>
       )
     }
   }
   
   export default connect(
     (state) => ({
       persons: state.persons,
       count: state.count,
     }), // 映射状态
     { addPerson } // 映射操作状态的方法
   )(Person)
   ```

