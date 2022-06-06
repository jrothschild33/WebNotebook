---
prev: /js/
next: /server/#第1章-ajax
---

# TypeScript

## 第1章 TypeScript介绍

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

## 第2章 TypeScript基础

### 2.1 基本类型

1. 类型声明：类型声明给变量设置了类型，使得变量只能存储某种类型的值

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

2. 自动类型判断：

   1）TS拥有自动的类型判断机制

   2）当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型，此时可以省略掉类型声明

   ```typescript
   // 声明完变量直接进行赋值
   let c: boolean = false
   
   // 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
   let c = false
   c = true
   ```

3. 变量类型：

   |  类型   |       例子        |              描述              |
   | :-----: | :---------------: | :----------------------------: |
   | number  |    1, -33, 2.5    |            任意数字            |
   | boolean |    true、false    |       布尔值true或false        |
   | string  | 'hi', "hi", `hi`  |           任意字符串           |
   | 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
   |   any   |         *         |            任意类型            |
   | unknown |         *         |         类型安全的any          |
   |  void   | 空值（undefined） |     没有值（或undefined）      |
   |  never  |      没有值       |          不能是任何值          |
   | object  |  {name:'孙悟空'}  |          任意的JS对象          |
   |  array  |      [1,2,3]      |           任意JS数组           |
   |  tuple  |       [4,5]       | 元素，TS新增类型，固定长度数组 |
   |  enum   |    enum{A, B}     |       枚举，TS中新增类型       |

#### 2.1.1 Number

1. 整数：`let decimal: number = 6`
2. 二进制：数字前加`0b`，如：`let binary: number = 0b1010`
3. 八进制（0-7）：数字前加`0o`，如：`let octal: number = 0o744`
4. 十六进制（0-9、a-f）：数字前加`0x`，如：`let hex: number = 0xf00d`
5. BigInt：大整数，整数后加`n`，用于进行更大的数值运算，如：`let big: bigint = 100n`

#### 2.1.2 Boolean

1. 布尔值：ture或false

   ```typescript
   let isDone: boolean = false
   ```

#### 2.1.3 String

