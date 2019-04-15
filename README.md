# 强类型的Redux状态管理

- 🌿 源于redux,借鉴vuex

- 💪 使用ts完美约束了类型

- 🚀 无redux样板代码

- 🌏 享用redux生态

## 已经有了redux,为什么还会出现这个

redux存在的问题:

**让我们先来看看裸写redux大致需要哪些步骤:**

在裸写redux时,需要维护以常量命名的action

``` js

const FOOACTION = 'FOOACTION'

```

然后再dispath

``` js

import FOOACTION from '...'

dispath({type: FOOACTION, payload: ''})

```

在reducer函数中以switch处理不同的action

``` js

import FOOACTION from '...'

function reducer(state, action) {
  switch(action.type) {
    case FOOACTION:
      return ...
  }
}

```

- 以常量命名action可以使代码更加规范与约束,但也造成了大量的模板代码

- 常量命名action只约束了action没有约束payload

- 在reducer中以switch处理不同action写法太丑

## **type-redux** 如何解决

todo


## 快速开始

todo

## 在React中使用

[type-redux-hook](https://github.com/whj1995/type-redux-hook)

## 中间件列表

- [redux-logger](https://github.com/LogRocket/redux-logger)

- [redux-observable](https://github.com/redux-observable/redux-observable)

## Example

[例子](https://github.com/whj1995/type-redux/blob/master/doc/index.ts)

[React例子](https://github.com/whj1995/type-redux-hook/tree/master/demo)