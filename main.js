// TODO LIST APP

const allTodoList = [];

/*
title: "String"
 description: "String"
 dueDate: "YYYY/MM/DD" / Date object
 priority: "urgent" | "high" | "normal" | "low" 
 */

function todoItem(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

const addToAllTodoList = (newTodo) => allTodoList.push(newTodo);

function createTodoItem(
  title = "",
  description = "",
  dueDate = "yyyy/mm/dd",
  priority = "normal"
) {
  const newTodo = new todoItem(title, description, dueDate, priority);
  addToAllTodoList(newTodo);
}

createTodoItem(
  "Buy milk",
  "Buy 2 liters of milk at the market",
  "2022/06/20",
  "urgent"
);

const allProjects = []; // catagories list for todo.

function projectCategory(name, todoList) {
  this.name = name;
  this.todoList = todoList;
}

const addToAllProjectsList = (newProject) => allProjects.push(newProject);

function createProject(name = "Default Project", todoList = []) {
  for (const project of allProjects) {
    if (project.name === name) {
      return;
    }
  }

  const newProject = new projectCategory(name, todoList);
  addToAllProjectsList(newProject); //
}

createProject("Default Project", allTodoList); // To create default project

console.log(allProjects);
