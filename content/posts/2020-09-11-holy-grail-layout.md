---
title: "CSS playground: Holy Grail Layout"
date: "2020-09-11T10:00:00.000Z"
template: post
slug: "/blog/css-holy-grail-layout"
img: "https://github.com/lokissue/luomingzhang.com/blob/master/static/media/css-post/css.png?raw=true"
category: "CSS"
tags:
  - "CSS"
  - "Layout"
description: Classic holy grail layout with differnet implementations.
prev: "/blog/css-draw-different-shape-with-css"
next: "/blog/usecontext-and-usereducer"
popularity: 3
---


![Holy Grail layout](media-link/holy-grail-layout/Holy-Grail-Layout.png)

<div style="height:1px;overflow:hidden;background:grey"></div>

<h3><strong>Table of Content</strong></h3>

<div style="height:1px;overflow:hidden;background:grey"></div>

## Introduction

Holy Grail layouts is a layout pattern that's commonly used on the web design. 

It used to be a pain in the head for a frontend developer to create a holy grail layout. There are a lot of createive solutions developed in HTML and CSS. Today, I will implement holy grail layout in 2 different methods - using `float` and `flexbox`.

## HTML Markup

Holy Grail layout consist of 5 compoennts:

* Header
* Main section (in the miiddle)
* Left (Navigation)
* Right (sider)
* Footer

Main, left and right are responsive fluid columns, the main section are supposed to render before left and right section, so we need to put it above them.

```html
<div class="header">header</div>
<div class="container">
  <div class="main">main</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
<div class="footer">footer</div> 
```

## CSS markups

These two methods use the same strategy as the following:

>We give a fixed width to left and right section, the main section stretches out to the left and right as far as it can.

### Float

``` css
.header,.footer {
  background-color: salmon;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.main, .left, .right{
  text-align: center;
  float: left;
  height: 100px;
  line-height: 100px;
}

.container{
  padding: 0 150px 0 250px;
}

.main {
  background-color: orchid;
  width: 100%;
}

.left {
  background-color: lightgreen;
  width: 250px;
  margin-left: -100%;
  position: relative;
  left: -250px;
}

.right{
  background-color: lightyellow;
  width: 150px;
  margin-left: -150px;
  position: relative;
  right: -150px;
}


/* clear float */
.clearfix::after { 
  content: "";
  display: block;
  clear: both;
}
```
[Codepen](https://codepen.io/lokissue/pen/bGpbjOx)

### Flexbox

```css
header, footer {
  background-color: salmon;
  height: 50px;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 150px;
}

.main {
  background-color: blueviolet;
  flex: 1;
}

.left {
  background-color: lightskyblue;
  flex: 0 0 200px;
  order: -1;
}

.right {
  background-color: lightseagreen;
  flex: 0 0 150px;
}
```

[Codepen](https://codepen.io/lokissue/pen/ZEWzNgj)

### Grid

```css
body {
  display: grid;
  height: 100vh;
  grid-template: auto 1fr auto / auto 1fr auto
}

// etc

header {
  background: lightpink;
  padding: 2rem;
  grid-column: 1 / 4;
}

.left-sidebar {
  background: lightblue;
  grid-column: 1 / 2;
}

main {
  background: coral;
  grid-column: 2 / 3;
}

.right-sidebar {
  background: yellow;
  grid-column: 3 / 4;
}

footer {
  background: wheat;
  padding: 2rem;
  text-align: center;
  grid-column: 1 / 4;
}

body {
  font-family: system-ui, sans-serif;
}

.left-sidebar,
.right-sidebar {
  padding: 1rem;
}
```

[Codepen](https://codepen.io/una/pen/mdVbdBy)

