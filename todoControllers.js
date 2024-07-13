import { allProjects } from "./projectControllers.js";
import projectUtilities from "./utilities.js";

const allTodoList = []; // List of all tasks to do.
const defaultProjectName = "default project"; // Default project name to prevent repetition

// Example usage:
/*
title: "String"
 description: "String"
 dueDate: "YYYY/MM/DD" / Date object
 priority: "urgent" | "high" | "normal" | "low" 
 */
// Object function
function todoItem(title, description, dueDate, priority) {
  // Closure variable for priority levels
  const priorityLevels = {
    1: "low",
    2: "normal",
    3: "high",
    4: "urgent",
  };

  this.id = projectUtilities.idGenerator(10); // Unique ID of 10 characters for each task item
  this.projectAssignedTo = defaultProjectName;

  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;

  this.setPriorityLevel = function (priorityLevel = 1) {
    this.priority = priorityLevels[priorityLevel];
  };

  this.setProjectAssignedTo = function (projectName = defaultProjectName) {
    projectName = projectName.toLowerCase();
    if (!projectName) return;

    // TODO: Add support for assigning to a project by FIRST checking if project exists already and
    // then checking if the todo item doesn't already exists
    if (!allProjects.hasOwnProperty(projectName)) {
      console.log("Project does not exist");
      return;
    }

    const specificProject = allProjects[projectName];

    //TODO: Make sure if item exists already not to add it to the project list
    // Check if todo item already exist
    if (specificProject.todoList.includes(this)) {
      console.log("Todo item already exists in the project");
      return;
    }

    this.projectAssignedTo = projectName;
    specificProject.todoList.push(this);
    console.log(`${this.title} successfully added to ${specificProject.name}`);
    return;
  };
}

function addToAllTodoList(newTodo) {
  return allTodoList.push(newTodo);
}

function createTodoItem(
  title = "",
  description = "",
  dueDate = "yyyy/mm/dd",
  priority = "normal"
) {
  const newTodo = new todoItem(title, description, dueDate, priority);
  addToAllTodoList(newTodo);
  return newTodo;
}

function deleteTodoItem(todoItem) {
  if (!projectUtilities.validateParameter(todoItem, "object")) return;

  const indexToRemove = allTodoList.indexOf(todoItem);
  if (indexToRemove === -1) {
    console.log("Todo item not found in the list");
    return;
  }

  const todoDeleted = allTodoList.splice(indexToRemove, 1); // Remove todo from all todoList

  // Filter out the todo from project assigned to it
  if (todoDeleted.projectAssignedTo !== allProjects[defaultProjectName].name) {
    const project = allProjects[todoItem.projectAssignedTo];
    project.todoList = project.todoList.filter(
      (item) => item.id !== todoItem.id
    );
  }

  console.log(`${todoItem.title} deleted successfully`);

  return todoDeleted;
}

function removeTodoItemFromProject(todoItem, projectName) {
  projectName = projectName.toLowerCase();
  if (!projectUtilities.validateParameter(todoItem, "object")) return;
  if (!projectUtilities.validateParameter(projectName, "string")) return;

  if (!allProjects.hasOwnProperty(projectName)) {
    console.log("Project does not exist");
    return;
  }

  if (todoItem.projectAssignedTo !== allProjects[defaultProjectName].name) {
    const project = allProjects[todoItem.projectAssignedTo];
    project.todoList = project.todoList.filter(
      (item) => item.id !== todoItem.id
    );
  }

  return todoItem;
}

//TODO: const deletedItem = arr.splice(indexToRemove, 1); Will use this as foundation for deleting from specific indexes.

const todoFunctions = {
  createTodoItem,
  deleteTodoItem,
  removeTodoItemFromProject,
};

export default todoFunctions;
