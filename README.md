# <center>强类型的Redux状态管理</center>

[![npm version](https://badge.fury.io/js/type-redux.svg)](https://badge.fury.io/js/type-redux)

- 🌿 源于redux,借鉴vuex

- 💪 使用ts完美约束了类型

- 🚀 无redux样板代码

- 🌏 享用redux生态

## 已经有了redux,为什么还会出现这个

**让我们先来看看裸写redux大致需要哪些步骤:**

在裸写redux时,通常需要维护以常量命名的action

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

1. action被约束

![action](/doc/act.png)

 借助ide的智能提示，能很清楚的看见所有action,省去了大量以常量命名action的模板代码。再也不用担心action写错。

2. payload的约束

![payload](/doc/payload.png)

不同的action,有着不同的payload。**type-redux**将其一一对应，能很清楚的知道action需要什么payload。

3. 一个函数就是一个reducer，对应一个action

![reducer](/doc/reducer.png)

以一个个的函数组成一个个reducer,函数名就为action名称。这样比写一个超大的以switch处理action的reducer要优雅、清晰的多。

## 设计理念

起源于 *redux* 、借鉴 *vuex* 、以 *typescript* 进行约束。

![type-redux](/doc/type-redux.jpg)

- **Store**: 数据源，保存着state。

- **Muation** 改变 *State* 的唯一途径。纯函数、无副作用，通过 *commit* 方法调用。

- **Action** 发生副作用的地方,可通过调用 *commit* 发送 *mutation* 更新 *State* 。通过 *dispatch* 方法调用。


## 快速开始

1. 安装包

```
npm install type-redux
```

1. 声明state与类型定义

``` ts
// ./index.ts
const initialState = {
  state1: 0,
  state2: '',
  state3: false
};

export type IState = typeof initialState;
export type IGetState = () => IState;
```

2. mutation

``` ts
// ./mutations.ts
export function add(getState: IGetState, num: number) {
  return { ...getState(), count: getState().count + num };
}
```

3. action

``` ts
// ./actions.ts
// ICtx 之后会定义
export async function fetchNewestCount(ctx: ICtx) {
  await ctx.dispatch('fetchRepurl');
  const result = await fetch(ctx.getState().repUrl).then((raw) => raw.json());
  ctx.commit('set', result.length);
  ctx.commit('loading', false);
}
```

4. 创建Store

```ts
// ./index.ts
import { applyMiddleware, createStore } from 'type-redux';
import * as actions from './actions';
import * as mutations from './mutations';
...

const reducers = { mutations, actions };

export const store = createStore(initialState, reducers);

type IState = typeof initialState;
export type IGetState = () => IState;
export type ICtx = TypeRedux.IContext<IState, typeof reducers['mutations'], typeof reducers['actions']>;

```

5. 使用
``` ts
store.commit('add', 1);
store.dispatch('fetchNewestCount');
```

6. 中间件的使用(可选)

``` ts
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'type-redux';

...

export const store = createStore(initialState, reducers, applyMiddleware(createLogger()));
```

## 在React中使用

[type-redux-hook](https://github.com/whj1995/type-redux-hook)

## 中间件列表

- [redux-logger](https://github.com/LogRocket/redux-logger)

- [redux-observable](https://github.com/redux-observable/redux-observable)

- [type-redux-rxjs](https://github.com/whj1995/type-redux-rxjs)

## Example

[简单例子](https://github.com/whj1995/type-redux/tree/master/example/simple)

[react例子](https://github.com/whj1995/type-redux-hook/tree/master/example)

[redux-observable例子](https://github.com/whj1995/type-redux/tree/master/example/redux-observable)

[type-redux-rxjs例子](https://github.com/whj1995/type-redux-rxjs/tree/master/example)