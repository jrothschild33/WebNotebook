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

4. 命名规则：

   1）标签名：HTML标签或其它标签

   - 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错
   - 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错

   2）标签属性：HTML标签属性或其它

5. 语法规则：

   1）遇到以 `<` 开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析

   2）遇到以 `{` 开头的代码，以JS语法解析: 标签中的js表达式必须用`{ }`包含

   3）样式的类名指定不要用class，要用`className`

   4）内联样式：对于带有“`-`”的属性要转为驼峰写法，如：`font-size`写成`fontSize`

   ```jsx
   style={{key:value}}
   ```

   5）只有一个根标签

   6）标签必须闭合

6. `babel.js`的作用：

   1）浏览器不能直接解析JSX代码，需要babel转译为纯JS的代码才能运行

   2）只要用了JSX，都要加上`type="text/babel"`，声明需要babel来处理

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
   ```

   2）JS语句：

   ```js
   if(){}
   for(){}
   switch(){case:xxxx}
   ```

5. 案例：

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

## 第2章 面向组件编程

### 2.1 创建组件

#### 2.1.1 函数式组件

> 适用于【简单组件】的定义

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

### 2.2 state属性

> 组件被称为"状态机"，通过更新组件的`state`来更新对应的页面显示（重新渲染组件）

1. 定义：`state`是组件最重要的属性，值是对象（可以包含多个key-value的组合）

2. 组件中的`this`指向：

   1）`render`中的`this`：组件实例对象

   2）自定义的方法中的`this`：通过实例调用指向组件实例对象；通过其他方式调用为`undefined`，如果想让其指向组件实例对象，用以下2种方式

   - 强制绑定this：通过函数对象的`bind`
   - 赋值语句+箭头函数

3. 更改状态：`setState({key:value})`

   1）状态(state)不可直接更改

   2）状态必须通过setState进行更新，且更新是一种合并，不是替换

   ```jsx
   // 正确写法
   this.setState({ isHot: !isHot })
   // 错误写法
   this.state.isHot = !isHot
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

### 2.3 props属性

> 组件标签的所有属性都保存在`props`属性中，可通过标签属性从组件外向组件内传递变化的数据（注意：组件内部不要修改props数据）

1. 内部读取某个属性值：`this.props.name`

2. 对`props`中的属性值进行类型限制和必要性限制：

   1）方法1：Reactv15.5开始已弃用

   ```jsx
   Person.propTypes = {
     name: React.PropTypes.string.isRequired,
     age: React.PropTypes.number,
   }
   ```

   2）方法2：使用prop-types库进限制（需要引入prop-types库）

   ```jsx
   Person.propTypes = {
     name: PropTypes.string.isRequired,
     age: PropTypes.number,
   }
   ```

3. 扩展属性：将对象的所有属性通过`props`传递

   ```jsx
   <Person{...person}/>
   ```

4. 默认属性值：`defaultProps`

   ```jsx
   Person.defaultProps = {
     age: 18,
     sex: '男',
   }
   ```

5. 组件类的构造函数：

   ```js
   constructor(props) {
     super(props)
     console.log(props)
   }
   ```

8. 案例：自定义用来显示一个人员信息的组件
   - 姓名必须指定，且为字符串类型
   - 性别为字符串类型，如果性别没有指定，默认为男
   - 年龄为字符串类型，且为数字类型，默认值为18

------

### 2.4 refs属性

> 组件内的标签可以定义`ref`属性来标识自己

