# MongoDB

## 第1章 MongoDB概述

### 1.1 数据库分类

1. 关系型数据库：

   1）特点：关系数据库中全都是表，需要通过SQL语言操作

   2）包含：MySQL、Oracle、DB2、SQL Server

2. 非关系型数据库

   1）特点：键值对数据库

   2）包含：MongoDB、Redis

------

### 1.2 MongoDB简介

> MongoDB是为快速开发互联网Web应用而设计的数据库系统，是一个NoSQL、文档型的数据库

<img :src="$withBase('/imgs/server/mongodb基本结构.png')" alt="mongodb基本结构">

1. 设计目标：极简、灵活、作为Web应用栈的一部分

2. 面向文档的数据模型：所谓文档是一种类似于JSON的结构，可以理解MongoDB存的是各种各样的JSON(BSON)，比普通的JSON的功能要更加的强大

3. MongoDB数据库使用JavaScript进行操作，在MongoDB含有一个对ES标准实现的引擎，在MongoDB中所有ES中的语法中都可以使用

4. MongoDB中的数据库和集合都不需要手动创建，当创建文档时，若文档所在的数据库或集合不存在，会自动创建数据库和集合

5. 基本概念：

   1）数据库(database)：数据库是一个仓库，在仓库中可以存放集合

   2）集合(collection)：类似于数组，在集合中可以存放文档，文档可以是各种各样的，没有格式要求

   3）文档(document)：文档数据库中的最小单位，存储和操作的内容都是文档，类似于JS中的对象，在MongoDB中每一条数据都是一个文档

------

### 1.3 下载与安装

> 官网地址：[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

<img :src="$withBase('/imgs/server/mongodb下载.png')" alt="mongodb下载">

1. 版本说明：MongoDB的版本偶数版本为稳定版，奇数版本为开发版，对于32位系统支持不佳

2. 目前版本：截止2022年6月10日，推荐安装版本：5.0.9

3. 下载安装包后，选择完整安装，并选择路径（不推荐C盘，选择空间较大的磁盘），勾选安装compass

4. 安装完成后，将C盘的bin目录添加到系统变量path中：

   ```txt
   C:\Program Files\MongoDB\Server\5.0\bin
   ```

5. 启动MongoDB：

   1）CMD输入

   ```bash
   mongo
   ```

   2）浏览器访问：127.0.0.1:27017，出现以下提示则说明安装成功

   ```txt
   It looks like you are trying to access MongoDB over HTTP on the native driver port.
   ```

6. 数据库路径：

   1）如果是默认安装，则位于MongoDB的`server/5.0/data`目录下

   ```txt
   ...\MongoDB\Server\5.0\data
   ```

   2）可以手动创建数据库文件夹，如：`D:\MongoData`，在该路径下打开cmd执行以下命令可指定数据库运行端口

   ```bash
   mongod --dbpath D:\MongoData --port 10086
   ```

7. 图形化操作软件：[MongoDB Compass(官方)](https://www.mongodb.com/products/compass)、[MongoDB Manager](https://www.mongodbmanager.com/)、[Studio 3T](https://studio3t.com/)

------

### 1.4 常用命令

1. MongoDB：CMD输入命令`mongod`

   | 参数                        | 说明                         |
   | :-------------------------- | :--------------------------- |
   | --help –h                   | 返回基本帮助和用法文本       |
   | --version                   | 返回MongoDB的版本            |
   | --config<文件名> -f<文件名> | 指定包含运行时配置的配置文件 |
   | --verbose -v                | 增加发送到控制台日志的数量   |
   | --quiet                     | 减少发送到控制台日志的数量   |
   | --port<端口>                | 指定mongod的端口，默认27017  |
   | --bind_ip<端口>             | 指定id地址                   |
   | --maxConns<编号>            | 指定链接的最大数             |
   | --logpath<路径>             | 指定日志文件的路径           |
   | --auth                      | 启用远程主机的身份验证       |
   | --dbpath<路径>              | 指定数据库实例的路径         |
   | --nohttpinterface           | 禁用HTTP接口                 |
   | --nojournal                 | 禁用日志                     |
   | --noprealloc                | 禁止预分配数据文件           |
   | --repair                    | 在所有数据库上运行修复程序   |

2. Mongo Shell：CMD输入命令`mongo`

   | 参数                       | 说明                                  |
   | :------------------------- | :------------------------------------ |
   | help `<option>`            | 语法帮助                              |
   | use `<database>`           | 更改当前操作的数据库                  |
   | db                         | 显示当前所在的数据库                  |
   | show dbs                   | 显示数据库列表                        |
   | show collections           | 显示当前数据库的集合                  |
   | show profile               | 显示时间超过1毫秒的system.profile条目 |
   | show log[name]             | 显示登录记忆的最后一段                |
   | exit                       | 退出数据库                            |
   | load(script)               | 加载js文件                            |
   | db.auth(username,password) | 在当前数据库做身份验证                |

------

## 第2章 [MongoDB操作](/WebNotebook/docs/ReferenceCards.pdf)

> 官方文档：[https://www.mongodb.com/docs/manual/crud/](https://www.mongodb.com/docs/manual/crud/)

### 2.1 数据库与集合

1. `use <数据库名>`：如果数据库存在则会进入到相应的数据库，如果不存在则会自动创建，一旦进入数据库，则可以使用db来引用当前库
2. `db.dropDatabase()`：删除一个数据库
3. `db.createCollection()`：创建一个新的集合
5. `db.<collection>.drop()`：删除集合

------

### 2.2 插入文档

1. `db.<collection>.insert()`：插入文档

   1）可以用于向集合中添加一个或多个文档，可以传递一个对象，或一个数组

   2）可以将对象或数组中的对象添加进集合中

   3）添加时如果集合或数据库不存在，会自动创建

   4）插入的文档对象默认添加`_id`属性，是文档的唯一标识（由`ObjectId()`根据时间戳和机器码生成），也可以手动自定义`_id`

   ```js
   // db为test数据库，在stus集合中插入文档
   db.stus.insert({ name: '猪八戒', age: 28, gender: '男' })
   db.stus.insert({ _id: 'hello', name: '孙悟空', age: 30, gender: '男' })
   db.stus.insert([
     { name: '沙和尚', age: 38, gender: '男' },
     { name: '白骨精', age: 16, gender: '女' },
     { name: '蜘蛛精', age: 14, gender: '女' },
   ])
   ```

   ```js
   // 向numbers中插入20000条数据
   // 低效方法：7.2秒（逐条插入）
   for (var i = 1; i <= 20000; i++) {
     db.numbers.insert({ num: i })
   }
   // 高效方法：0.4秒（先生成数组，再统一插入）
   var arr = []
   for (var i = 1; i <= 20000; i++) {
     arr.push({ num: i })
   }
   db.numbers.insert(arr)
   ```

2. `db.<collection>.insertOne()`：向集合中插入一个文档

   ```js
   db.stus.insertOne([
     { name: '沙和尚', age: 38, gender: '男' },
     { name: '白骨精', age: 16, gender: '女' },
     { name: '蜘蛛精', age: 14, gender: '女' },
   ])
   
   // 返回结果
   {
     "0": {
       "name": "沙和尚",
       "age": 38,
       "gender": "男"
     },
     "1": {
       "name": "白骨精",
       "age": 16,
       "gender": "女"
     },
     "2": {
       "name": "蜘蛛精",
       "age": 14,
       "gender": "女"
     },
     "_id": {
       "$oid": "62a4be0ea5b6f2343ad22886"
     }
   }
   ```

3. `db.<collection>.insertMany()`：向集合中插入多个文档

   ```js
   db.stus.insertMany([
     { name: '沙和尚', age: 38, gender: '男' },
     { name: '白骨精', age: 16, gender: '女' },
     { name: '蜘蛛精', age: 14, gender: '女' },
   ])
   
   // 返回结果
   {
     "_id": {
       "$oid": "62a4be2aa5b6f2343ad22887"
     },
     "name": "沙和尚",
     "age": 38,
     "gender": "男"
   }
   
   {
     "_id": {
       "$oid": "62a4be2aa5b6f2343ad22888"
     },
     "name": "白骨精",
     "age": 16,
     "gender": "女"
   }
   
   {
     "_id": {
       "$oid": "62a4be2aa5b6f2343ad22889"
     },
     "name": "蜘蛛精",
     "age": 14,
     "gender": "女"
   }
   ```

------

### 2.3 查询文档

1. `db.<collection>.find()`：查询文档，返回数组

   1）需要一个查询文档作为参数，如果不传该参数，则会返回集合中的所有元素

   2）可以将查询条件以键值对的形式添加到查询文档中：`$lt`、`$lte`、`$gt`、`$gte`、`$ne`、`$or`、`$in`、`$nin`、`$not`、`$exists`、`$and`等

   ```js
   db.stus.find({ _id: 'hello' })
   db.stus.find({ age: 16, name: '白骨精' })
   db.stus.find({ age: 28 })
   ```

   3）内嵌文档：文档的属性值也可以是一个文档，通过`.`的形式匹配，属性名必须使用引号

   ```js
   db.users.update({ username: '吴京' }, { $set: { hobby: { movies: ['战狼2', '长津湖战役'] } } })
   db.users.find({ 'hobby.movies': 'hero' })
   ```

   4）投影：第二个参数中设置，可以选择需要显示的列

   ```js
   // 查询结果中只显示ename、sal这两列
   db.users.find({}, { ename: 1, _id: 0, sal: 1 })
   ```

2. `db.<collection>.findOne()`：查询第一个符合条件的文档，返回对象

   ```js
   db.stus.findOne({ age: 28 })
   ```

3. `db.<collection>.find().count()`：查询符合条件的文档的数量

   ```js
   // 查询stus集合中的文档总数
   db.stus.find({}).count()
   ```

4. `db.<collection>.find().limit(n)`：设置显示数据的上限

   ```js
   // 查看numbers集合中的前10条数据
   db.numbers.find().limit(10)
   ```

5. `db.<collection>.find().skip(n)`：跳过指定数量的数据，常与limit配合使用

   ```js
   // 查看numbers集合中的第11条到20条数据
   db.numbers.find().skip(10).limit(10)
   db.numbers.find().limit(10).skip(10)	// MongoDB会自动调整skip和limit的位置，效果相同
   // 查看numbers集合中的第21条到30条数据
   db.numbers.find().skip(20).limit(10)
   ```

6. `db.<collection>.find().sort()`：指定文档的排序的规则，1表示升序，-1表示降序

   ```js
   // 查询结果按sal升序、empno降序显示
   db.users.find().sort({ sal: 1, empno: -1 })
   ```

------

### 2.4 修改文档

1. `db.<collection>.update(<query>,<update>,{upsert,multi,weiteConcern,collation})`：修改文档（默认只修改一个）

   1）query：必填，查询符合条件的文档

   2）update：必填，需要更新的内容（默认覆盖原文档）

   3）upsert：选填，默认false，是否在未查询到符合条件的文档时进行插入操作

   4）multi：选填，默认false，是否同时修改多个文档

   ```js
   // 用{ age: 28 }替换 name为'沙和尚'的整条数据（仅第一条）
   db.stus.update({ name: '沙和尚' }, { age: 28 })
   ```

2. `db.<collection>.updateOne()`：修改集合中的一个文档

   ```js
   // 仅修改name为'猪八戒'的第一条数据中的address属性
   db.stus.updateOne(
     { name: '猪八戒' },
     { $set: {address: '高老庄',},}
   )
   ```

3. `db.<collection>.updateMany()`：修改集合中的多个文档

   ```js
   // 修改全部name为'猪八戒'的数据中的address属性
   db.stus.updateMany(
     { name: '猪八戒' },
     { $set: {address: '高老庄',},}
   )
   ```

   ```js
   // 使用update，设置multi为true也可以实现
   db.stus.update(
     { name: '猪八戒' },
     { $set: { address: '高老庄',},},
     { multi: true,}
   )
   ```

4. `db.<collection>.replaceOne()`：替换集合中的一个文档

------

### 2.5 删除文档

1. `db.<collection>.remove(<query>,<justOne>)`：删除文档，默认删除多个（若第二个参数设为true，则只删除一个）

   1）接收一个查询文档作为参数，只有符合条件的文档才会被删除，不能撤销

   ```js
   // 删除所有name为'沙和尚'的数据
   db.stus.remove({ name: '沙和尚' })
   // 删除name为'沙和尚'的第一条数据
   db.stus.remove({ name: '沙和尚' },true)
   ```

   2）如果传递一个空对象作为参数，则会删除所有文档

   ```js
   // 删除stus集合中的所有文档
   db.stus.remove({})
   ```

   3）数据库中的数据都不会删除，所以删除的方法很少调用，一般会在数据中添加一个字段，来表示数据是否被删除

   ```js
   // 为数据添加isDel属性，来代表是否删除
   db.stus.updateOne({ name: '沙和尚' }, { $set: { isDel: 1 } })
   db.stus.find({ isDel: 0 })
   ```

2. `db.<collection>.deleteOne()`：删除集合中的一个文档

3. `db.<collection>.deleteMany()`：删除集合中的多个文档

------

### 2.6 操作符

> 使用操作符可以对文档的数据进行局部修改

#### 2.6.1 [修改操作符](https://www.mongodb.com/docs/manual/reference/operator/update/)

1. `$set`：用来指定一个字段的值，如果这个字段不存在，则创建它

   ```js
   // 仅修改name为'沙和尚'这条数据中的gender、address属性，而非替换整条数据
   db.stus.update(
     { name: '沙和尚' },
     { $set: { gender: '男',address: '流沙河',},}
   )
   ```

2. `$unset`：用来删除文档中一个不需要的字段，用法和set类似

   ```js
   // 仅删除name为'沙和尚'这条数据中的address属性
   db.stus.update(
     { name: '沙和尚' },
     { $unset: { address: '流沙河',},}
   )
   ```

3. `$inc`：用来增加已有键的值，或者该键不存在则创建一个，只能用于Number类型的值

   ```js
   // 为所有薪资低于1000的员工增加工资400元
   db.users.updateMany({ sal: { $lte: 1000 } }, { $inc: { sal: 400 } })
   ```

4. `$push`：向数组中添加一个新的元素

   ```js
   db.users.update({ username: 'tangseng' }, { $push: { 'hobby.movies': 'Interstellar' } })
   ```

5. `$addToSet`：向数组中添加一个新元素，如果数组中已经存在了该元素，则不会添加

   ```js
   db.users.update({ username: 'tangseng' }, { $addToSet: { 'hobby.movies': 'Interstellar' } })
   ```

------

#### 2.6.2 [查询操作符](https://www.mongodb.com/docs/manual/reference/operator/query/)

1. 比较符：`$eq`：等于；`$ne`：不等于；`$lt`：小于；`$lte`：小于等于；`$gt`：大于；`$gte`：大于等于；`$in`：在数组中；`$nin`：不在数组中

   ```js
   // 查询numbers中num大于500的文档
   db.numbers.find({ num: { $gt: 500 } })
   // 查询numbers中num等于500的文档
   db.numbers.find({ num: { $eq: 500 } })
   // 查询numbers中num小于30的文档
   db.numbers.find({ num: { $lt: 30 } })
   // 查询numbers中num大于40小于50的文档
   db.numbers.find({ num: { $gt: 40, $lt: 50 } })
   ```

2. 逻辑符：`$and`：和；`$not`：非；`$or`：或；`$nor`：都不

   ```js
   // 查询工资小于1000或大于2500的员工
   db.emp.find({ $or: [{ sal: { $lt: 1000 } }, { sal: { $gt: 2500 } }] })
   ```

------

### 2.7 文档关系

1. 一对一：可以通过内嵌文档的形式来体现出一对一的关系

   ```js
   db.wifeAndHusband.insert([
     { name: '黄蓉', husband: { name: '郭靖',},},
     { name: '潘金莲',husband: { name: '武大郎',},},
   ])
   ```

2. 一对多：用户vs订单、文章vs评论

   ```js
   db.users.insert([
     { username: 'swk',},
     { username: 'zbj',},
   ])
   
   db.order.insert({
     list: ['牛肉', '漫画'],
     user_id: ObjectId('59c47e35241d8d36a1d50de0'),
   })
   
   //查找用户swk的订单
   var user_id = db.users.findOne({ username: 'zbj' })._id
   db.order.find({ user_id: user_id })
   ```

3. 多对多：分类vs商品、老师vs学生

   ```js
   db.teachers.insert([{ name: '洪七公' }, { name: '黄药师' }, { name: '龟仙人' }])
   db.stus.insert([
     { name: '郭靖', teacherName: ['洪七公','黄药师'],},
     { name: '孙悟空', teacherName: ['洪七公','黄药师','龟仙人'],},
   ])
   ```

------

## 第3章 Mongoose

> 官网：[https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)

### 3.1 Mongoose简介

1. 定义：用Node来操作MongoDB的模块，是一个对象文档模型(ODM)库，用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处

2. 特点：

   1）可以为文档创建一个模式结构(Schema)

   2）可以对模型中的对象/文档进行验证

   3）数据可以通过类型转换转换为对象模型

   4）可以使用中间件来应用业务逻辑挂钩

   5）比Node原生的MongoDB驱动更容易

3. 新的对象：

   1）Schema(模式对象)：定义约束了数据库中的文档结构

   2）Model：作为集合中的所有文档的表示，相当于MongoDB数据库中的集合collection

   3）Document：表示集合中的具体文档，相当于集合中的一个具体的文档

------

### 3.2 连接MongoDB

1. 连接MongoDB数据库后，底层的`Connection`对象就可以通过mongoose模块的`conection`属性来访问

2. `connection`对象是对数据库连接的抽象，它提供了对象连接、底层的db对象和表示结合的Model对象的访问

   1）可以对`connection`对象上的一些事件进行监听，来获悉数据库连接的开始与端开

   2）例：可以通过`open`和`close`事件来监控连接的打开和关闭

3. 安装mongoose：

   ```bash
   npm i mongoose
   ```

4. 引入mongoose：

   ```js
   const mongoose = require("mongoose")
   ```

5. 连接数据库：如果端口号是默认端口号（27017），可以省略不写

   ```js
   mongoose.connect('mongodb://数据库的ip地址:端口号/数据库名', { useMongoClient: true})
   ```

6. 数据库连接成功的事件：

   ```js
   mongoose.connection.once('open', function () {
     console.log('数据库连接成功!')
   })
   ```

7. 数据库断开的事件：

   ```js
   mongoose.connection.once('close', function () {
     console.log('数据库连接断开!')
   })
   ```

8. 断开连接：一般不需要调用

   ```js
   mongoose.disconnect()
   ```

------

### 3.3 Schema模式对象

1. 作用：模式就是对文档的约束，文档中的字段必须符合模式的规定，否则将不能正常操作

2. 定义模式：对在模式中的每个字段都需要定一个特定的值类型

   ```txt
   String、Number、Boolean、Array、Buffer、Date、ObjectId(Oid)、Mixed
   ```

3. 创建模式定义：模式需要通过mongoose的Schema属性来创建，这个属性是一个构造函数

   1）语法：`new Schema(definition,option)`

   2）参数：definition（描述模式）、options（配置对象，定义与数据库中集合的交互）

   | options选项    | 说明                                                   |
   | -------------- | ------------------------------------------------------ |
   | autoIndex      | 布尔值，开启自动索引，默认true                         |
   | bufferCommands | 布尔值，缓存由于连接问题无法执行的语句，默认true       |
   | capped         | 集合中最大文档数量                                     |
   | collection     | 指定应用Schema的集合名称                               |
   | id             | 布尔值，是否有应用于_id的id处理器，默认true            |
   | _id            | 布尔值，是否自动分配id字段，默认true                   |
   | strict         | 布尔值，不符合Schema的对象不会被插入进数据库，默认true |

4. 案例：

   ```js
   // 创建并连接数据库
   var mongoose = require('mongoose')
   mongoose.connect('mongodb://127.0.0.1/mongoose_test', { useMongoClient: true })
   mongoose.connection.once('open', function () {
     console.log('数据库连接成功!')
   })
   
   // 将mongoose.Schema 赋值给一个变量
   var Schema = mongoose.Schema
   
   // 创建Schema（模式）对象
   var stuSchema = new Schema({
     name: String,
     age: Number,
     gender: {
       type: String,
       default: 'female',
     },
     address: String,
   })
   
   // 通过Schema来创建Model：mongoose.model(modelName, schema)
   // modelName：要映射的集合名，mongoose会自动将集合名变成复数！（如果已经是复数则不变了）
   var StuModel = mongoose.model('student', stuSchema)	 // 名称自动变为students
   
   // 向数据库中插入一个文档：modelName.create(doc, function(err){})
   StuModel.create(
     {
       name: '白骨精',
       age: 16,
       address: '白骨洞',
     },
     function (err) {
       if (!err) {
         console.log('插入成功~~~')
       }
     }
   )
   ```

------

### 3.4 Model模型对象

> Model对象：相当于数据库中的集合，通过Model可以完成对集合的CRUD操作

- 工作流程：定义Schema对象后，就需要通过该Schema对象来创建Model对象；创建Model对象后，就会自动和数据库中对应的集合建立连接，以确保在应用更改时，集合已经创建并具有适当的索引，且设置了必须性和唯一性

#### 3.4.1 创建Model

1. 语法：`mongoose.model(name,[schema],[collection],[skipInit])`

2. 参数：

   - `name`：模型的名字，用于查找模型
   - `schema`：创建好的模式对象
   - `collection`：要连接的集合名
   - `skipInit`：是否跳过初始化，默认false

   ```js
   // 创建并连接数据库
   var mongoose = require('mongoose')
   mongoose.connect('mongodb://127.0.0.1/mongoose_test', { useMongoClient: true })
   mongoose.connection.once('open', function () {
     console.log('数据库连接成功!')
   })
   
   var Schema = mongoose.Schema
   var stuSchema = new Schema({
     name: String,
     age: Number,
     gender: {
       type: String,
       default: 'female',
     },
     address: String,
   })
   var StuModel = mongoose.model('student', stuSchema)
   ```

------

#### 3.4.2 创建文档

1. 语法：`Model.create(doc(s),[callback])`

   ```js
   StuModel.create(
     [
       {name: '沙和尚',age: 38,gender: 'male',address: '流沙河',},
       {name: '孙悟空',age: 26,gender: 'male',address: '花果山',},
     ],
     function (err) {
       if (!err) {
         console.log(arguments)
       }
     }
   )
   ```

------

#### 3.4.3 查询文档

1. `Model.find(conditions,[projection],[options],[callback])`：查询所有符合条件的文档，返回一个数组

2. `Model.findOne([conditions],[projection],[options],[callback])`：查询符合条件的第一个文档，返回一个具体的文档对象

3. `Model.findById(id,[projection],[options],[callback])`：根据文档的id属性查询文档

4. 参数说明：

   1）`conditions`：查询的条件

   2）`projection`：投影，语法1：`{name:1, _id:0}`，语法2：`"name -_id"`

   3）`options`：查询选项，可指定`skip`、`limit`

   4）`callback`：回调函数(必填)，查询结果会通过回调函数返回

   ```js
   // 查找name为'唐僧'的文档
   StuModel.find({ name: '唐僧' }, function (err, docs) {
     if (!err) {
       console.log(docs)
     }
   })
   // 查询所有文档，只显示name列
   StuModel.find({}, { name: 1, _id: 0 }, function (err, docs) {
     if (!err) {
       console.log(docs)
     }
   })
   // 查询所有文档，只显示name、age列，从第4条开始显示，仅显示一条数据
   StuModel.find({}, 'name age -_id', { skip: 3, limit: 1 }, function (err, docs) {
     if (!err) {
       console.log(docs)
     }
   })
   // 查询第1条文档
   StuModel.findOne({}, function (err, doc) {
     if (!err) {
       console.log(doc)
     }
   })
   // 按ID查询文档
   StuModel.findById('59c4c3cf4e5483191467d392', function (err, doc) {
     if (!err) {
       // 返回的对象就是Document文档对象，是Model的实例
       console.log(doc instanceof StuModel)
     }
   })
   ```

------

#### 3.4.4 修改文档

1. `Model.update(conditions,doc,[options],[callback])`

2. `Model.updateMany(conditions,doc,[options],[callback])`

3. `Model.updateOne(conditions,doc,[options],[callback])`

4. `Model.replaceOne(conditions,doc,[options],[callback])`

5. 参数说明：

   1）`conditions`：查询条件

   2）`doc`：修改后的对象

   3）`options`：配置参数

   4）`callback`：回调函数

   ```js
   // 修改唐僧的年龄为20
   StuModel.updateOne({ name: '唐僧' }, { $set: { age: 20 } }, function (err) {
     if (!err) {
       console.log('修改成功')
     }
   })
   ```

------

#### 3.4.5 删除文档

1. `Model.remove(conditions,[callback])`

2. `Model.deleteOne(conditions,[callback])`

3. `Model.deleteMany(conditions,[callback])`

   ```js
   // 删除name为'白骨精'的文档
   StuModel.remove({ name: '白骨精' }, function (err) {
     if (!err) {
       console.log('删除成功~~')
     }
   })
   ```

------

#### 3.4.6 统计数量

1. 语法：`Model.count(conditions,[callback])`

   ```js
   // 统计StuModel中的文档数量
   StuModel.count({}, function (err, count) {
     if (!err) {
       console.log(count)
     }
   })
   ```

------

### 3.5 Document文档对象

> 通过Model对数据库进行查询时，会返回Document对象或Document对象数组，Document继承自Model，代表一个集合中的文档

1. 创建文档：

   ```js
   // 引入模块：创建并连接数据库
   require("./tools/conn_mongo")
   
   var Schema = mongoose.Schema
   var stuSchema = new Schema({
     name: String,
     age: Number,
     gender: {
       type: String,
       default: 'female',
     },
     address: String,
   })
   var StuModel = mongoose.model('student', stuSchema)
   
   // 创建一个Document
   var stu = new StuModel({
     name: '奔波霸',
     age: 48,
     gender: 'male',
     address: '碧波潭',
   })
   ```

2. 保存文档：`save([options],[callback])`

   ```js
   stu.save(function (err) {
     if (!err) {
       console.log('保存成功!')
     }
   })
   ```

3. 修改文档：`update(update,[options],[callback])`

   ```js
   StuModel.find({ name: '孙悟空' }, function (err, doc) {
     if (!err) {
       // 方法1
       doc.update({ $set: { age: 28 } }, function (err) {
         if (!err) {
           console.log('修改成功!')
         }
       })
       // 方法2
       doc.age = 18
       doc.save()
     }
   })
   ```

4. 删除文档：`remove([callback])`

   ```js
   StuModel.find({ name: '孙悟空' }, function (err, doc) {
     if (!err) {
       doc.remove(function (err) {
         if (!err) {
           console.log('大师兄再见!')
         }
       })
     }
   })
   ```

5. 获取文档中的指定属性值：`get(name)`

   ```js
   StuModel.find({ name: '孙悟空' }, function (err, doc) {
     if (!err) {
       // 方法1
       console.log(doc.get("age"))
       // 方法2
       console.log(doc.age)
     }
   })
   ```

6. 设置文档的指定的属性值：`set(name, value)`

   ```js
   StuModel.find({ name: '孙悟空' }, function (err, doc) {
     if (!err) {
       // 方法1
       doc.set("name","孙大圣")
       // 方法2
       doc.name = "孙大圣"
     }
   })
   ```

7. 获取文档的_id属性值：`_id`

   ```js
   StuModel.find({ name: '孙悟空' }, function (err, doc) {
     if (!err) {
       console.log(doc._id)
     }
   })
   ```

8. 转换为一个JSON对象：`toJSON()`

   ```js
   StuModel.find({ name: '孙悟空' }, function (err, doc) {
     if (!err) {
       var j = doc.toJSON()
       console.log(j)
     }
   })
   ```

9. 将文档转换为一个普通的JS对象（所有文档的属性和方法都不可用）：`toObject()`

   ```js
   StuModel.find({ name: '孙悟空' }, function (err, doc) {
     if (!err) {
       doc = doc.toObject()
       // 用JS方法操作
       delete doc.address
       console.log(doc._id)
     }
   })
   ```


------

### 3.6 Mongoose模块化

1. tools/conn_mongo.js：连接数据库

   ```js
   // 创建并连接数据库
   var mongoose = require('mongoose')
   mongoose.connect('mongodb://127.0.0.1/mongoose_test', { useMongoClient: true })
   mongoose.connection.once('open', function () {
     console.log('数据库连接成功!')
   })
   ```

2. models/student.js：定义模型

   ```js
   var Schema = mongoose.Schema
   var stuSchema = new Schema({
     name: String,
     age: Number,
     gender: {
       type: String,
       default: 'female',
     },
     address: String,
   })
   var StuModel = mongoose.model('student', stuSchema)
   // 暴露模型
   model.exports = StuModel
   ```

3. index.js：引入模块

   ```js
   require("./tools/conn_mongo")
   var Student = require("./model/student")
   
   // 自定义操作
   StuModel.find({ name: '唐僧' }, function (err, docs) {
     if (!err) {
       console.log(docs)
     }
   })
   ```

------

