---
title: "JavaScript is fun: Object Prototypes, Prototype Chain and Inheritance"
date: "2020-08-02T10:00:00.000Z"
template: post
slug: "/blog/javascript-prototype"
img: "https://previews.dropbox.com/p/thumb/AA5GuhEQ958sl6dtmsl7y7yK9DXiOWYinA1kEuWEw_RJY9VoH-tS8Vef4hCXhmfHcIu5PMrYHhqqaOjlkjsS8TWJwo4hWGSGj4aZXGLzQE8kApfsIDqhN1him5pyyvIKPgf5Tg6_JmCPKROmd02CzxAAg9sqogMpfTo20bfOcVSpT66baNm_ckAev4R1YcztUqsT2Qn3lHoiIdG3NGjzlV8fQjpXXipG31q5MCmAlEQnHOn0DyOfpNgWFxAliFPwxmQrtbYutHm7vN5KPcRnfCfS_0tLlDmwjybA2XLA77evX5N6pTYQoeIQ-Q20GEmp3D2xr_j7RkfZRyfcFZhqxN8aLpspcU1pztsdqlGRPlpMxbfmknTowZMmadbyOeTLt-M/p.jpeg?fv_content=true&size_mode=5"
category: "Javascript"
tags:
  - "Javascript"
  - "Web development"
description: A beginner-friendly introduction on Javascript prototype, prototype-chain & inheritance.
prev: "/blog/css-draw-different-shape-with-css"
next: "/blog/javascript-event-loop"
popularity: 4
---
<p align="center">
<img src="./media-link/javascript-post/javascript.jpeg" width="400">
</p>

---
<h3><strong>Table of Content</strong></h3>

- [Prototype-based Language](#prototype-based-language)
- [Understandd Protoype](#understandd-protoype)
- [Prototype Chain](#prototype-chain)
- [Inheritance](#inheritance)
  - [Constructor-Based Inheritance](#constructor-based-inheritance)
  - [Prototypal Inheritance](#prototypal-inheritance)
  - [ES6 Class extends](#es6-class-extends)
- [Summary](#summary)

---

### Prototype-based Language

According to [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) document: *JavaScript is often described as a **prototype-based language** — to provide inheritance, objects can have a **prototype object**, which acts as a template object that it inherits methods and properties from.*

In other words, **prototypal inheritance** is a form of object0oriented **code reuse**. Javascript is one of the only [mainstream] object-oriented languages to use prototypal inheritance. Almost all other object-oriented languages are [classical](https://dev.to/crishanks/classical-vs-prototypal-inheritance-2o5a#:~:text=Classical%20Inheritance&text=\(Classes%2C%20then%2C%20are%20an,increasing%20the%20level%20of%20generalization.).

### Understandd Protoype

1. In Javascript, every function (with the exception of **arror function*) has a special property `prototype`. Every time you create a function, this `prototype` becomes the property of that function, which is by default an empty object.

2. every object has a hidden property `__proto__`, this property is linking to an object from which this object inherits properties from. 

    \* Either use `.__proto__` or use `Object.getPrototypeOf` will give you the exactly same object.

3. `__proto__` is a property that only exists on objects, `prototype` on the other hand is a property that only exists on objects.

4. `__proto__` of an object is the value of the `prototype` property of the constructor function from which that object is created.

    Let's see an example with the code for a better visualizaion:
    ```
    function Person(name) {
        name: this.name
    }

    var boy = new Person('Oliver');
    console.log(Person.prototype === boy.__proto__); // true
    ```

 5. In an object, if that property is pointing to an object then the engin will treat this object's properties as if they were on the instance itself. In other words, every object can link to another object via `__proto__` property and access it's properties like they were it's own.
    ```
    function Person(name) {
        name: this.name
    }

    Person.prototype.sayHi = function() {
        console.log("Hi");
    }

    var boy = new Person('Oliver');
    boy.sayHi();
    ```
    \* Object `boy` doesn't have method `sayHi()`, so the engine will search method `sayHi()` in its `__proto__`, that is `Person.prototype` (remember `boy.__proto__ === Person.prototype`).

6. A property value or method is searched in a current object first. If it's not found, the search continue in the **prototype chain* until the property is found or *prototype chain* ends.
    ```
    var obj1 = {a: 1};
    var obj2 = Object.create(obj1);
    obj2.hasOwnProperty('a'); // false
    obj2.a; // 1
    obj2.a = 2;
    obj2.hasOwnProperty('a'); // true
    obj2.a; // 2
    obj2.__proto__.a; // 1
    ```

### Prototype Chain

As memetioned above, the sequence of objects traversed in the object manner form a *singly linked list* known as the "prototype chain" of the inital obejct. 

![prototype chain](./media-link/prototype/prototype_chain.jpg)

Prototype chain terminates with `null`
```
var obj = {};
obj.__proto__.__proto___ // null
```

### Inheritance

#### Constructor-Based Inheritance
```
function Parent ( name ) {
    this.name = name
    this.friends = ["Shannon", "Jeremy"]
}

Parent.prototype.getName = function () {
	console.log(this.name)
}

function Child (name) {
  Parent.call(this, name); 
}

Child.prototype = new Parent();
Child.prototype.constructor = Child 

var child1 = new Child('Oli');
child1.friends.push("Liz");
var child2 = new Child("Liz");

child1.getName(); // Oli
console.log(child1.friends); // [ 'Shannon', 'Jeremy', 'Liz' ]
child2.getName(); // Liz
console.log(child2.friends); // [ 'Shannon', 'Jeremy' ]
```
Using constructor functions with the `new` keyword is a handy way to create objects, but it can cause problems by obscuring, and sometimes interfering with, the benefits of using JavaScript in a purely prototypal way. This is most obvious when we try to inherit from another object and take advantage of the delegation features in the prototype system.

#### Prototypal Inheritance

```
function Parent (name) {
    this.name = name
}

Parent.prototype.getName = function () {
    return this.name;
}

function Child (name, age){
    Parent.call(this, name);
    this.age = age;
}

function inheritPrototype (Child, Parent) {
    var prototype = Object.create(Parent.prototype); 
    prototype.constructor = Child; 
    Child.prototype = prototype; 
}
inheritPrototype(Child, Parent);
var myChild = new Child("Oli", 23);
console.log(myChild.getName(), myChild.age); // Oli 23
```

`myChild` has access to both the `Child.prototype` and `Parent.prototype` (and automatically `Object.prototype`, since `Parent` is an object).

Since `Parent.prototype` has the `getName` function, we can access `getName` on `myChild`.

![Prototypal Inheritance](media-link/prototype/prototypal_inheritance.png)


ES6 actually introduced an easier syntax for constructor functions and working with prototypes: **classes**!


#### ES6 Class extends

Classes are only *syntactical sugar` for constructor functions. Everything still works the same way. 

```
class Car {
    constructor(brand) {
      this.carname = brand;
    }
    present() {
      return 'I have a ' + this.carname;
    }
  }
  
  class Model extends Car {
    constructor(brand, mod) {
      super(brand);
      this.model = mod;
    }
    show() {
      return this.present() + ', it is a ' + this.model;
    }
  }
  
  var mycar = new Model("Ford", "Mustang");
  console.log(mycar.show()); // I have a Ford, it is a Mustang
```

We write classes with `class` keyword. A class has a `constructor` function which is basically the constructor function we wrote in the ES5 syntax.

Another greate thing about classes, is that we can easily `extend` other classes.


### Summary

Hopefully, you now understand prototype and the use of prototype in the wonderful world of Javascript!

---