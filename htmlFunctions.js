import { createCard } from "./todoItemModel.js";
import createProjectBtn from "./projectHtmlModel.js";

// HOLDS ALL CLICK FUNCTIONS TO BE ADDED TO HTML ELEMENTS

function searchTodo(event, allProjects, allTodo) {
  // Get search input value
  const searchInput = document.getElementById("search").value;

  // Check search length
  if (searchInput.length < 6) {
    alert("Search term should be at least 6 characters long");
    return;
  }

  // Filter projects and todo based on search input
  const filteredTodo = allTodo.filter((todo) =>
    todo.title.toLowerCase().includes(searchInput.toLowerCase())
  );
}

function renderTodoList(listOfTodo, windowWidth) {
  // Clear previous todo list
  const displayContainer = document.querySelector(".js-all-cards-display");
  displayContainer.innerHTML = "";

  let todoHTML = "";

  // Loop through each todo item and create HTML for it
  listOfTodo.forEach((todo) => {
    todoHTML += createCard(todo, windowWidth) + "\n";
  });

  displayContainer.insertAdjacentHTML("beforeend", todoHTML);
}

function renderProjectTodoList(
  event,
  allProjects,
  projectName = "",
  windowWidth
) {
  projectName = projectName != "" ? projectName : event.target.innerText;

  const displayContainer = document.querySelector(".js-display-indicator");
  displayContainer.innerText = "";

  // Filter project list for selected project
  let selectedProject = {};

  for (let project in allProjects) {
    if (allProjects[project].name.toLowerCase() === projectName.toLowerCase()) {
      selectedProject = allProjects[project];
    }
  }

  renderTodoList(selectedProject.todoList, windowWidth);

  // Update display indicator
  displayContainer.innerText = `Todo for ${projectName}`;
}

//! ON PAGE LOADED FUNCTIONS

function renderProjectSidesBar(allProjects = {}) {
  // Clear previous projects list
  const projectBar = document.querySelector(".js-projects-display");
  projectBar.innerHTML = "";
  let allProjectString = "";

  // Loop through each project and create HTML for i
  for (const project in allProjects) {
    allProjectString += createProjectBtn(allProjects[project]);
  }

  projectBar.insertAdjacentHTML("beforeend", allProjectString);
}

const htmlFunctions = {
  searchTodo,
  renderTodoList,
  renderProjectTodoList,
  renderProjectSidesBar,
};

export default htmlFunctions;
