# 强类型的Redux状态管理

## 解决了什么问题

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

以上．

以常量命名action可以使代码更加规范与约束,但也造成了大量的模板代码.

常量命名action只约束了action没有约束payload.

在reducer中以switch处理不同action写法太丑.

**现在使用*type-redux***

todo

