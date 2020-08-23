---
title: "CSS playground: Draw Different Shapes with CSS"
date: "2020-08-04T10:00:00.000Z"
template: post
slug: "/blog/css-draw-different-shape-with-css"
img: "https://github.com/lokissue/luomingzhang.com/blob/master/static/media/css-post/css.png?raw=true"
category: "CSS"
tags:
  - "CSS"
  - "Web Development"
  - "Frontend"
description: A good practice for CSS beginner to play around. You can find the editable code via the links to my CodePen.
prev: "/blog/javascript-prototype"
next: "/blog/react-lifecycle"
popularity: 3
---
<p align="center">
<img src="media-link/draw-shapes-with-css/CSS-shapes.png" width="600">
</p>

<div style="height:1px;overflow:hidden;background:grey"></div>

<h3><strong>Table of Content</strong></h3>


- [Square & Retangle](#square--retangle)
- [Triangles](#triangles)
  - [border property](#border-property)
- [Implement](#implement)
  - [More about triangle](#more-about-triangle)
- [Trapezoid](#trapezoid)
- [Circle](#circle)
  - [border-radius](#border-radius)
  - [Implement](#implement-1)
- [Oval](#oval)
- [Quadrant](#quadrant)
- [Cone](#cone)
- [Summary](#summary)

<div style="height:1px;overflow:hidden;background:grey"></div>

### Square & Retangle

Square and Retangle are the easies shape you can draw with CSS, as they are the natural shapes of the web.

**Square**

<img src="./media-link/draw-shapes-with-css/square.png" alt="square" width="200" height="200">

```
.square {
  width: 200px;
  height: 200px;
  background-color: orchid;
}
```

**Retangle**

<img src="./media-link/draw-shapes-with-css/retangle.png" alt="retangle" width="200" height="100">

```
.retangle {
  width: 200px;
  height: 100px;
  background-color: mediumpurple;
}
```

### Triangles

#### border property

Before drawing the triangle, let's take a look at the property of `border` in the box model.

(If you are not familiar with **CSS Box Model**, you can [click here](https://www.w3schools.com/css/css_boxmodel.asp)).

<img src="./media-link/draw-shapes-with-css/content-border.png" alt="content-border" width="200" height="200">

```
.box {
  width: 200px;
  height: 200px;
  
  border-top: 10px solid lightgreen;
  border-right: 10px solid mediumpurple;
  border-bottom: 10px solid lightsalmon;
  border-left: 10px solid moccasin;
}
.content{
  width: 100%;
  height: 100%;
  font-size: 50px;
  background-color: skyblue;
  text-align: center;
  line-height: 200px;
}
```

You can see that see that the borders of equal width butt up against each other at 45 degree angles. 


### Implement

Let remove the content box(blue area) and increase all border widths.

<img src="./media-link/draw-shapes-with-css/border-box.png" alt="border-box" width="200" height="200">

```
.box {
  width: 0;
  height: 0;
  
  border-top: 100px solid lightgreen;
  border-right: 100px solid mediumpurple;
  border-bottom: 100px solid lightsalmon;
  border-left: 100px solid moccasin;
}
```

As a result, we got 4 triangles.

Just set the other border colours transparent:

<img src="./media-link/draw-shapes-with-css/triangle.png" alt="border-box" width="200" height="100">

```
.box {
  width: 0;
  height: 0;
  
  border-top: 100px solid transparent;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 100px solid lightsalmon;
}
```

#### More about triangle

We can "rotate" triangle by setting which border is non-transparent.

![four-triangles](media-link/draw-shapes-with-css/four-triangles.png)

```
.triangle1 {
  width: 0;
  height: 0;
  
  border-top: 100px solid transparent;
  border-left: 100px solid mediumpurple;
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
}

.triangle2 {
  width: 0px;
  height: 0px;
  
  border-top: 100px solid lightgreen;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
}

.triangle3 {
  width: 0;
  height: 0;
  
  border-top: 100px solid transparent;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 100px solid lightsalmon;
}

.triangle4 {
  width: 0;
  height: 0;
  
  border-top: 100px solid transparent;
  border-left: 100px solid transparent;
  border-right: 100px solid moccasin;
  border-bottom: 100px solid transparent;
}

```

### Trapezoid

What happen if we add `width` value for the border-only box above?

<img src="./media-link/draw-shapes-with-css/border-box-width.png" alt="border-box" width="350" height="200">

```
.box{
  width: 150px;
  height: 0px;
  
  border-top: 100px solid lightgreen;
  border-left: 100px solid moccasin;
  border-right: 100px solid mediumpurple;
  border-bottom: 100px solid lightsalmon;
}
```
Awesome, we got 4 trapezoids! Like the triangles, we cang get a single trapezoid by hiding 3 borders.

<img src="./media-link/draw-shapes-with-css/trapezoid.png" alt="border-box" width="350" height="100">

```
.trapezoid{
  width: 150px;
  height: 0px;
  
  border-top: 100px transparent;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 100px solid lightsalmon;
}
```

### Circle

#### border-radius

Before we jump to circle, let's see first how `border-radius` works?

Like many CSS properties relating to margins, padding and borders, there are four individual properties - one for each corner of a box element - and one shorthand property.

```
border-to-right-radius
border-bottom-right-radius
border-bottom-left-radius
border-top-left-radius
border-radius
```

The `border-radius` properties can each accept either one or two values, expressed as a length or a percentage (percentages refer to the corresponding dimensions of the border box).

```
border-*-radius: [ <length> | <%> ] [ <length> | <%> ]?
```

The following diagram gives a few examples of how corners might appear given differing radius:
 ![border-radius](media-link/draw-shapes-with-css/border-radius-diagram.png)

#### Implement

 If we set `border-radius: 50%` (50% can be (width/2)px) in a squre, we can get a circle.

 <img src="./media-link/draw-shapes-with-css/border-radius-50.png" alt="border-radius-50" width="200" height="200">
 
 ```
.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: lightPink;
}
```

### Oval

Circle is generated from square, oval is generated from retangle.

 <img src="./media-link/draw-shapes-with-css/oval.png" alt="oval" width="200" height="100">

```
.oval {
  width: 200px;
  height: 100px;
  border-radius: 50%;
  background-color: paleGreen;
}
```

### Quadrant

Drawing a quadrant is easy if you learned how to draw a circle, just set the value of `border-radius` from `50%` to `100%`.

 <img src="./media-link/draw-shapes-with-css/quadrant.png" alt="quadrant" width="200" height="200">

 ```
 .quadrant{
  background-color: deepSkyBlue;
  width: 200px;
  height: 200px;
  border-radius: 100% 0 0 0;
}
```

Same as triangle, you can set `border-radius` value to "rotate" the quadrant.

### Cone

Cone can be draw with the trangle and circle technique.

 <img src="./media-link/draw-shapes-with-css/cone.png" alt="cone" width="200" height="200">

```
.cone {
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-top: 200px solid sandybrown;
  border-radius: 50%;
}
```

### Summary
You can find all implementation on my [codepen](https://codepen.io/lokissue/pen/KKzKYzE).

Now it's your turn to make your own icon shape with css.

---