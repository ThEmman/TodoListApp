import { createCard } from "./todoItemModel";

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
  const displayContainer = document.getElementById("display_indicator");
  displayContainer.innerHTML = "";

  displayContainer.insertAdjacentHTML("beforeend");

  let todoHTML = "";

  // Loop through each todo item and create HTML for it
  listOfTodo.forEach((todo) => {
    todoHTML += createCard(todo, windowWidth) + "\n";
  });
}

function renderProjectTodoList(event, windowWidth) {
  const projectName = event.target.innerText;

  // Filter project list for selected project
  const selectedProject = allProjects.find(
    (project) => project.name.toLowerCase() === projectName.toLowerCase()
  );

  // Clear previous todo list
  const displayContainer = document.getElementById("display_indicator");
  displayContainer.innerHTML = "";

  renderTodoList(selectedProject.todoList, windowWidth);
}

//! ON PAGE LOADED FUNCTIONS

function renderProjectSidesBar(allProjects){
  // Clear previous projects list
  const projectBar = document.getElementById("project_bar");
  projectBar.innerHTML = "";
  
  // Loop through each project and create HTML for it
  allProjects.forEach((project) => {
    projectBar.insertAdjacentHTML("beforeend", `${createProjectBtn()}`);
  });
}