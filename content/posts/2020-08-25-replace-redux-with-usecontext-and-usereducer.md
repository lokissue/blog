---
title: "React [w]orkshop: useContext + useReducer = Redux"
date: "2020-08-25T10:00:00.000Z"
template: post
slug: "/blog/usecontext-and-usereducer"
img: "https://github.com/lokissue/luomingzhang.com/blob/master/static/media/react-post/react-hooks.png?raw=true"
category: "React"
tags:
  - "React"
  - "Redux"
  - "React Hooks"
description: Replace Redux with React Hooks useContext and useReducer. Explain how they work with an example step by step.
prev: "/blog/react-lifecycle"
next: "/blog/javascript-event-loop"
popularity: 5
---

<p align="center">
<img src="./media-link/react-post/react-hooks.png" width="400">
</p>

<div style="height:1px;overflow:hidden;background:grey"></div>

<h3><strong>Table of Content</strong></h3>

- [useContext and useReducer](#usecontext-and-usereducer)
- [useContext + useReducer to replace Redux](#usecontext--usereducer-to-replace-redux)
  - [Start](#start)
  - [Create a message component.](#create-a-message-component)
  - [Create a buttons component](#create-a-buttons-component)
  - [Import Message and Buttons to App.js](#import-message-and-buttons-to-appjs)
  - [State management](#state-management)
  - [Import state](#import-state)
  - [Retrive state](#retrive-state)
  - [Create reducer](#create-reducer)
  - [Update state](#update-state)
- [Summary](#summary)
- [Reference](#reference)

<div style="height:1px;overflow:hidden;background:grey"></div>


## useContext and useReducer

`useContext` and `useReducer` are a new addition as API in React 16.8

In a nutshell: 

`useContext`: allows functional components easily access to the Context object (that can be the gloabl states).

`useReducer`: accepts a reducer function with the initial state, returns the current state, then dispatches a function.

## useContext + useReducer to replace Redux

In this example, we build buttons that change the text colour.

![Example](./media-link/replace-redux-with-usecontext-and-usereducer/example.gif)

### Start

To begin with, use `create-react-app` to create a project, you can also create a React App online with the help of [CodeSandbox](https://codesandbox.io/).

### Create a message component.

```js
// message.js
import React from 'react'

const Message = (props) => {
  return (
    <div style={{ textAlign: "center", color: "black", fontSize: "32px" }}>
      Hello CodeSandbox
    </div>
  )
}
```

### Create a buttons component

```js
// buttons.js
import React from "react";

const Buttons = props => {
  return (
    <div style={{ textAlign: "center", fontSize: "16px", margin: "20px" }}>
      <button>Orchid</button>
      <button>SkyBlue</button>
    </div>
  );
};

export default Buttons;
```

### Import Message and Buttons to App.js

```js
// App.js
import React from "react";
import Message from "./message";
import Buttons from "./buttons";

const App = () => {
  return (
    <div>
        <Message />
        <Buttons />
    </div>
  );
};

export default App;

```
> Remeber, React doesn't like siblings (adjcent components), it doesn't allow siblings in a return fucntion while rendering. Wrap them in an enclosing tag like `<>...</>`, `<div>...</div>`, `<React.Fragment>...</React.Fragment>`.


### State management

Apparently, Message component needs a color state, so we create `color.js` to manage this state.

```js
// color.js
import React, { createContext } from "react";

// create context
export const ColorContext = createContext({});

/**
 * Create a color component
 * Color component contain an object, all children can access the value by calling ColorContext
 */
export const Color = props => {
  return (
    <ColorContext.Provider value={{ color: "black" }}>
      {props.children}
    </ColorContext.Provider>
  );
};
```

### Import state

Modify `App.js`, all children can access the color.

```js
// App.js
···
···
···
import { Color } from "./color";

function App() {
  return (
    <div>
      <Color>
        <Message />
        <Buttons />
      </Color>
    </div>
  );
}
···
···
···
```

### Retrive state

Retrive color state in message component.

```js
// message.js
···
···
···
import { ColorContext } from "./color";

const Message = props => {
  const { color } = useContext(ColorContext);
  return (
    <div style={{ textAlign: "center", color: color, fontSize: "32px" }}>
      Hello CodeSandbox, color is {color}
    </div>
  );
};
···
···
···
```

### Create reducer

Then add reducer in `color.js` to manage the logic of color update.

```js
// color.js
import React, { createContext, useReducer } from "react";

// create context
export const ColorContext = createContext({});

// reducer
export const UPDATE_COLOR = "UPDATE_COLOR";
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state;
  }
};

/**
 * Create a Color component
 * Color component contains color values that all components can access.
 */
const Color = (props) => {
  const [color, dispatch] = useReducer(reducer, "black");
  return (
    <ColorContext.Provider value={{ color, dispatch }}>
      {props.children}
    </ColorContext.Provider>
  );
};

export default Color;
```

### Update state

Add `onClick` event in button, call `dispatch` to update color.

```js
//button.js
import React, { useContext } from "react";
import { ColorContext, UPDATE_COLOR } from "./color";

const Buttons = () => {
  const { dispatch } = useContext(ColorContext);
  return (
    <div style={{ textAlign: "center", fontSize: "16px", margin: "20px" }}>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "orchid" });
        }}
      >
        Orchid
      </button>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "skyblue" });
        }}
      >
        Skyblue
      </button>
    </div>
  );
};

export default Buttons;
```

## Summary

You can find the live demo of the code above in **[HERE](https://codesandbox.io/s/jolly-chatterjee-x3cwp)**.

* Create gloabl states with `useContext`.
* Create reducer with `useReducer`, update state depends on different `dispatch`.
* Add new state wherever you code, you don't have to jump to redux to add new state.
* Separate the gloable state, avoid the complicated Redux state tree along with the project growth.

In a word, it's absolutely workable to relace Redux with `useContext` + `useReducer`. However, Redux is the first choice in most of the React project so far, so learning Redux is a must.

## Reference

* [React Context vs Redux - Who wins?](https://www.youtube.com/watch?v=OvM4hIxrqAw)
* [React Context API simple tutorial. Does it replace Redux? + useContext, useReducer hooks](https://www.youtube.com/watch?v=oILEx3hROps)
* [Preventing rerenders with React.memo and useContext hook.](https://github.com/facebook/react/issues/15156)