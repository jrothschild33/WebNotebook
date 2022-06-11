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
   | help <option>              | 语法帮助                              |
   | use <database>             | 更改当前操作的数据库                  |
   | db                         | 显示当前所在的数据库                  |
   | show dbs                   | 显示数据库列表                        |
   | show collections           | 显示当前数据库的集合                  |
   | show profile               | 显示时间超过1毫秒的system.profile条目 |
   | show log[name]             | 显示登录记忆的最后一段                |
   | exit                       | 退出数据库                            |
   | load(script)               | 加载js文件                            |
   | db.auth(username,password) | 在当前数据库做身份验证                |

------

## 第2章 MongoDB操作

> 官方文档：[https://www.mongodb.com/docs/manual/crud/](https://www.mongodb.com/docs/manual/crud/)

### 2.1 数据库与集合

1. `use <数据库名>`：如果数据库存在则会进入到相应的数据库，如果不存在则会自动创建，一旦进入数据库，则可以使用db来引用当前库
2. `db.dropDatabase()`：删除一个数据库
3. `db.createCollection()`：创建一个新的集合
4. `db.collection.remove({})`：清空一个集合
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

   2）可以将查询条件以键值对的形式添加到查询文档中

   ```txt
   $lt、$lte、$gt、$gte、$ne、$or、$in、$nin、$not、$exists、$and
   ```

   ```js
   db.stus.find({ _id: 'hello' })
   db.stus.find({ age: 16, name: '白骨精' })
   db.stus.find({ age: 28 })
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

------

### 2.4 修改文档

1. `db.<collection>.update()`：修改文档

   1）前两个参数，一个是查询文档，一个是新的文档，这样符和条件的文档将会被新文档所替换

   2）第三个参数，用来指定是否使用upsert，默认为false

   3）第四个参数，用来指定是否同时修改多个文档，默认为false

2. `db.<collection>.updateOne()`：修改集合中的一个文档

3. `db.<collection>.updateMany()`：修改集合中的多个文档

4. `db.<collection>.replaceOne()`：替换集合中的一个文档

------

### 2.5 删除文档

1. `db.<collection>.remove()`：删除文档，默认删除多个

   1）方法接收一个查询文档作为参数，只有符合条件的文档才会被删除

   2）删除数据是永久的，不能撤销

2. `db.<collection>.deleteOne()`：删除集合中的一个文档

3. `db.<collection>.deleteMany()`：删除集合中的多个文档

------

### 2.6 修改器

> 使用修改器可以对文档的数据进行局部修改

1. `$set`：用来指定一个字段的值，如果这个字段不存在，则创建它
2. `$unset`：用来删除文档中一个不需要的字段，用法和set类似
3. `$inc`：用来增加已有键的值，或者该键不存在则创建一个，只能用于Number类型的值

------

## 第3章 Mongoose

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

#### 3.2.1 基本连接

1. 安装mongoose：

   ```bash
   npm i mongoose
   ```

2. 引入mongoose：

   ```js
   const mongoose = require("mongoose")
   ```

3. 连接数据库：

   ```js
   mongoose.connect("mongodb://127.0.0.1/mongodbname")
   ```

4. 断开连接：

   ```js
   mongoose.disconnect()
   ```

#### 3.2.2 Connection

1. 定义：连接MongoDB数据库后，底层的`Connection`对象就可以通过mongoose模块的`conection`属性来访问

2. 作用：`connection`对象是对数据库连接的抽象，它提供了对象连接、底层的db对象和表示结合的Model对象的访问

   1）可以对`connection`对象上的一些事件进行监听，来获悉数据库连接的开始与端开

   2）例子：可以通过`open`和`close`事件来监控连接的打开和关闭

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

------

### 3.4 Model模型对象

> Model对象：相当于数据库中的集合，通过Model可以完成对集合的CRUD操作

1. 工作流程：定义Schema对象后，就需要通过该Schema对象来创建Model对象；创建Model对象后，就会自动和数据库中对应的集合建立连接，以确保在应用更改时，集合已经创建并具有适当的索引，且设置了必须性和唯一性

2. 创建Model模型对象：`model(name,[schema],[collection],[skipInit])`

   1）`name`：模型的名字，用于查找模型

   2）`schema`：创建好的模式对象

   3）`collection`：要连接的集合名

   4）`skipInit`：是否跳过初始化，默认false

3. 常用方法：

   1）`remove(conditions, callback)`

   2）`deleteOne(conditions, callback)`

   3）`deleteMany(conditions, callback)`

   4）`find(conditions, projection, options, callback)`

   5）`findById(id, projection, options, callback)`

   6）`findOne(conditions, projection, options, callback)`

   7）`count(conditions, callback)`

   8）`create(doc, callback)`

   9）`update(conditions, doc, options, callback)`

------

### 3.5 Document文档对象

1. 通过Model对数据库进行查询时，会返回Document对象或Document对象数组，Document继承自Model，代表一个集合中的文档
2. Document对象也可以和数据库进行交互操作

3. 常用方法：

   1）`equals(doc)`

   2）`id`

   3）`get(path,[type])`

   4）`set(path,value,[type])`

   5）`update(update,[options],[callback])`

   6）`save([callback])`

   7）`remove([callback])`

   8）`isNew`

   9）`isInit(path)`

   10）`toJSON()`

   11）`toObject()`
