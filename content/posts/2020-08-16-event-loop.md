---
title: "JavaScript is fun: Event Loop"
date: "2020-08-16T10:00:00.000Z"
template: post
slug: "/blog/javascript-event-loop"
img: "https://github.com/lokissue/luomingzhang.com/blob/master/static/media/react-post/react-logo.png?raw=true"
category: "Javascript"
tags:
  - "Javascript"
  - "Web technology"
description: This blog focuses on one of the very important but seldom understood concepts or terms in Javascript. The EVENT LOOP!
prev: "/blog/react-lifecycle"
next: "/blog/javascript-prototype"
popularity: 4
---

![Loop](media-link/event-loop/loop.gif)


<div style="height:1px;overflow:hidden;background:grey"></div>

<h3><strong>Table of Content</strong></h3>

- [Javascript is a Single-Threaded Languange](#javascript-is-a-single-threaded-languange)
  - [Process](#process)
  - [Thread](#thread)
  - [Why Javascript is Single-Threaded?](#why-javascript-is-single-threaded)
- [Basic Architecture](#basic-architecture)
  - [Heap (Memory Heap)](#heap-memory-heap)
  - [Stack (Call Stack)](#stack-call-stack)
  - [Event Loop](#event-loop)
  - [Task Queue](#task-queue)
- [How does Event Loop works?](#how-does-event-loop-works)
- [Summary](#summary)
  
<div style="height:1px;overflow:hidden;background:grey"></div>

## Javascript is a Single-Threaded Languange

First, let's cover the concepts of *process* and *thread*.

### Process

A *process* is executing a program. One or more threads run in the context of the process.


### Thread
A *thread* is the basic unit to which the operating sysem allocates processor time. A thread can execute any part of the process code.

* **Single-threaded** processes contain the execution of instructions in a single sequence. In other words, one command is processes at a time.
* **Multithreaded** processes allow the execution of multiple parts of a program at the same time. These are lightweight processes available within the process.
  
![Process and Thread](media-link/event-loop/process-thread.jpg)

### Why Javascript is Single-Threaded?

Javascript is designed as single-threaded because it is a browser scripting language. The main function of Javascript is to interact with user and access the DOM.

Let's assume Javascirpt has two threads, thread 1 is appending element in the node. Meanwhile, thread 2 is deleting this element. What would happen?

To reduce the complexity, JavaScript is single-threaded since the day it born. This becomes the core feature of this language.

How does JavaScript handle jobs at the same time?

## Basic Architecture

Javascript with V8 engine has two parts:

### Heap (Memory Heap)

Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory

### Stack (Call Stack)

The call stack is responsible for keeping track of all the operations in line to be executed. Whenever a function is finished, it is popped from the stack. (Last in, first out)

```
const one() => {
    const two() => {
        console.log('4');
    }
    two();
}
```

The call stake will handle the code snippet as below:

![call stack](media-link/event-loop/call-stack.png)

The call stack job is to fill in the instructions and pop an instruction as it gets executed (LIFO).

### Event Loop

This is where alll these things come together. The event loop simply checks the call stack, and if it is empty (which means there are no functions or task in the stack) it takes the oldest callback from the callback queue and pushes it into the call stack which eventually executes the callback.

### Task Queue

Events, timers, Ajax requests are all provided on the client-side by the browsers and are often referred to as Web API. Once the Web API finishes executing the task, it doesn't just push it back to the *Call Stack* automatically. It goes to the **Task Queue**

Here's how a Event Loop looks like:

![Event Loop](media-link/event-loop/eventloop-overview.gif)

Still confusing? Let me explain with example.

## How does Event Loop works?

Javascript wraps "blocking functions" in *callback* which can be executed later, so they won't be blocing other activities.

```
console.log('Start script...');

setTimeout(() => {
    task('Download a file.');
}, 1000);

console.log('Done!');
```

Here is the output:

```
Start script...
Done!
Download a file.
```

In this example, when `setTimeout()` function is called, it is placed on the call stack and the Web API creates a timer that will expire in 1 second.

![Event Loop step 1](media-link/event-loop/javascript-event-loop-step-1.png)

Then the `task()` function is then placed into task queue or callback queue:

![Event Loop step 2](media-link/event-loop/javascript-event-loop-step-2.png)

The event loop is a constantly running process that monitors both the callback queue and the call stack.

If the call stack is not empty, the event llop waits until it is empty and places the next function from the callback queue to the call stack. If the call queue is empty, nothing will happen:

![Event Loop step 3](media-link/event-loop/javascript-event-loop-step-3.png)


## Summary

While this is a very basic introduction, the concept of asynchronous programming in Javascript gives enough insight to clearly understand what is going on under the hood and how Javascript is able to run concurrently and asynchronously with just a single thread.