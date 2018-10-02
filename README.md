# todo-api
Simple todo api. With file storage database.

## Introduction

I wanted to make a project under 3 hours. So I decided to make a todo app with a small api and a React front-end. And mission complete!
## Installation

> npm install

## How to run

> npm start

## Endpoints
**GET** /:token

>Returns: {Array} todos - all Waiting and Done todos

**GET** /:token/del

>Returns: {Array} todos - all deleted todos

**GET** /:token/done

>Returns: {Array} todos - all done todos

**POST** /add 

>Must include **isDone,isDeleted**

**PUT** /del 

>Must include **id,token,isDeleted**

>Soft Deletes a todo

>Returns: {Boolean} success

**PUT** /done 

>Must include **id,token,isDone**

>Completes a todo

>Returns: {Boolean} success
