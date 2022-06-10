# MongoDB

## 第1章 MongoDB概述

### 1.1 数据库分类

1. 关系型数据库：

   1）特点：关系数据库中全都是表

   2）包含：MySQL、Oracle、DB2、SQL Server

2. 非关系型数据库

   1）特点：键值对数据库

   2）包含：MongoDB、Redis

------

### 1.2 MongoDB简介

1. MongoDB是为快速开发互联网Web应用而设计的数据库系统
2. 设计目标：极简、灵活、作为Web应用栈的一部分
3. 面向文档的数据模型：所谓文档是一种类似于JSON的结构，可以理解MongoDB存的是各种各样的JSON(BSON)

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

   
