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

4. 语法规则：

   1）遇到以 `<` 开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析

   2）遇到以 `{` 开头的代码，以JS语法解析: 标签中的js表达式必须用`{ }`包含

   3）样式的类名指定不要用class，要用`className`

   4）内联样式：对于带有“`-`”的属性要转为驼峰写法，如：`font-size`写成`fontSize`

   ```jsx
   style={{key:value}}
   ```

   5）只有一个根标签

   6）标签必须闭合

   7）写注释：`{/* 注释内容 */}`，必须用大括号包裹

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

> 适用于【简单组件】的定义，因为没有`this`，所以只能有`props`属性

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

3. 更改状态：`setState({ key:value })`

   1）状态(state)不可直接更改

   2）状态必须通过setState进行更新，且更新是一种合并，不是替换

   ```jsx
   // 正确写法
   this.setState({ isHot: !isHot })
   // 错误写法
   this.state.isHot = !isHot
   ```

   3）注意：如果使用传递参数的方式更改状态，必须用`[]`包裹住参数作为key，否则参数本身会被解析为字符串

   ```jsx
   saveFormData = (dataType) => {
     return (event) => {
       // 注意：这里必须用[]包裹住dataType，否则会将dataType理解为字符串，作为新key传入state
       this.setState({ [dataType]: event.target.value })
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

   2）方法2：使用prop-types库进限制（需要引入prop-types库）

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
     const { input2 } = this
     alert(input2.value)
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
     
     render() {
       return (
         <div>
           <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />
           &nbsp;
           <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
           <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
           &nbsp;
         </div>
       )
     }
   }
   // 渲染组件到页面
   ReactDOM.render(<Demo />, document.getElementById('test'))
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

2. 常见的高阶函数：`Promise`、`setTimeout`、`arr.map()`等

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

<img :src="$withBase('/imgs/react/react生命周期(旧).png')" alt="react生命周期(旧)">

1. 初始化阶段：由`ReactDOM.render()`触发初次渲染

   - `constructor()`

   - `componentWillMount()`：即将废弃，下一个大版本需要加上`UNSAFE_`前缀才能使用
   - `render()`：会调用多次
   - `componentDidMount()`：仅调用一次，做一些初始化工作：开启定时器、发送网络请求、订阅消息

2. 更新阶段：

   - `componentWillReceiveProps()`：由父组件重新`render`触发，即将废弃，下一个大版本需要加上`UNSAFE_`前缀才能使用

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
       // 组件将要接收新的props的钩子
       componentWillReceiveProps(props) {
         console.log('B---componentWillReceiveProps', props)
       }
       render() {
         console.log('B---render')
         return <div>我是B组件，接收到的车是:{this.props.carName}</div>
       }
     }
     ```

   - `shouldComponentUpdate()`：由`setState()`触发，默认返回ture，如果返回false则无法继续以下流程

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

   - `componentWillUpdate()`：由`forceUpdate()`强制更新触发，即将废弃，下一个大版本需要加上`UNSAFE_`前缀才能使用

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

   - `render()`

   - `componentDidUpdate()`

3. 卸载组件：由`ReactDOM.unmountComponentAtNode()`触发

   - `componentWillUnmount()`：做一些收尾工作：关闭定时器、取消订阅消息

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

<img :src="$withBase('/imgs/react/react生命周期(新).png')" alt="react生命周期(新)">

1. 初始化阶段：由`ReactDOM.render()`触发初次渲染
   - `constructor()`
   - `getDerivedStateFromProps()`
   - `render()`
   - `componentDidMount()`：开启监听，发送ajax请求
2. 更新阶段：由组件内部`this.setSate()`或父组件重新render触发
   - `getDerivedStateFromProps()`
   - `shouldComponentUpdate()`
   - `render()`
   - `getSnapshotBeforeUpdate()`
   - `componentDidUpdate()`
3. 卸载组件：由`ReactDOM.unmountComponentAtNode()`触发
   - `componentWillUnmount()`：做一些收尾工作，如清理定时器

------

