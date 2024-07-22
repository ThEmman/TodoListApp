import loadContent from "./loadContent.js";
import projectUtilities from "./utilities.js";

import { allProjects, projectFunctions } from "./projectControllers.js";

// HTML FUNCTIONS FOR EVENTS DYNAMIC UPDATING
import htmlFunctions from "./htmlFunctions.js";

let currentProjectDisplayed = "";
let currentTodoDisplayed = [];

// HEADER SECTION ELEMENTS
const headerSection = document.querySelector(".js-header");
const projectToggle = document.getElementsByClassName("js-project-toggle")[0];
const addProjectBtn = document.getElementsByClassName("js-add-project-btn")[0];
const addTodoBtn = document.getElementsByClassName("js-add-todo-btn")[0];
const searchInput = document.getElementsByClassName("js-search-input")[0];
const searchBtn = document.getElementsByClassName("js-search-btn")[0];

// MAIN SECTION ELEMENTS
const mainSection = document.querySelector(".js-main");
const displayIndicator = document.getElementsByClassName(
  "js-display-indicator"
)[0];
const filterDisplayBtn =
  document.getElementsByClassName("js-filter-display")[0];

const cardDisplay = document.getElementsByClassName("js-all-cards-display")[0];

// SIDEBAR ELEMENTS
const projectSideBar = document.getElementsByClassName("js-project-sidebar")[0];
const projectSideBarCloseBtn = document.getElementsByClassName(
  "js-project-sidebar-close-btn"
)[0];
const projectsDisplay = document.getElementsByClassName(
  "js-projects-display"
)[0];

//! EVENT LISTENERS FOR ALL BUTTONS AND MISCELLANEOUS EVENTS
projectToggle.addEventListener("click", function () {
  if (projectToggle.dataset.toggled == "false") {
    projectSideBar.classList.toggle("d-none");
    projectToggle.dataset.toggled = "true";

    //TODO: CHECKPOINT...

    // Make HTML Body on clickable  pointer-events: none; /* Disable clicks */ opacity: 0.5; /* Optional: visually indicate disabled state */
    headerSection.style.pointerEvents = "none";
    mainSection.style.pointerEvents = "none";
  }
});
projectSideBarCloseBtn.addEventListener("click", function () {
  projectSideBar.classList.toggle("d-none");
  projectToggle.dataset.toggled = "false";

  headerSection.style.pointerEvents = "all";
  mainSection.style.pointerEvents = "all";
});

window.addEventListener("DOMContentLoaded", function () {
  allProjects["default project"].state = true;

  // Test project for sidebar
  projectFunctions.createProject("Something", []);
  projectFunctions.createProject("Another thing", []);

  // Fetch and display all projects
  console.log(allProjects);
  htmlFunctions.renderProjectSidesBar(allProjects);

  // Fetch and display all todo from default project
  currentProjectDisplayed = allProjects["default project"].name;

  // Render all todo for the default project
  currentTodoDisplayed = allProjects["default project"].todoList;
  htmlFunctions.renderProjectTodoList(
    Event,
    allProjects,
    currentProjectDisplayed,
    578
  );
});

/* const breakPoint = 576;
const ogWindowSize = window.innerWidth;
console.log(window.innerWidth);

window.addEventListener("resize", function (e) {
  const windowWidth = e.currentTarget.innerWidth;

  if (windowWidth > breakPoint) {
    console.log(windowWidth);
  }
}); */

//TODO: FORM CONTROL FOR MODAL DIALOG BOX
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const form = dialog.firstElementChild;
const jsCloseBtn = dialog.querySelector("#js-close");
const jsSubmitBtn = dialog.querySelector("#js-submit");

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

jsCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  dialog.close();
});

// TODO: CHECKPOINT...
jsSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(form).entries(); // Array of key/value pairs for each form input in dialog box

  console.log(formData);

  dialog.close();
});
