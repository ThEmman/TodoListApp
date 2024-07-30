import loadContent from "./loadContent.js";
import projectUtilities from "./utilities.js";

import { allProjects, projectFunctions } from "./projectControllers.js";

// HTML FUNCTIONS FOR EVENTS DYNAMIC UPDATING
import htmlFunctions from "./htmlFunctions.js";
import { allTodoList, todoFunctions } from "./todoControllers.js";

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
  htmlFunctions.renderProjectSidesBar(allProjects);

  // Give them all click events
  const allProjectBtn = projectsDisplay.querySelectorAll(".js-project-item");
  for (let project of allProjectBtn) {
    project.addEventListener("click", function (event) {
      selectProjectOnClick(event, project.innerText);
    });
  }

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

  // Toggle function for radio buttons in html
  const priority = document.querySelectorAll("input[name=priority]");

  for (let radio of priority) {
    radio.addEventListener("click", function () {
      for (let otherRadio of priority) {
        otherRadio.classList.remove("on");
      }

      radio.classList.toggle("on");
    });
  }

  // Add projects to the todo list forms
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

//TODO: FORM CONTROL FOR TODO DIALOG BOX
const todoDialog = document.getElementById("todo-dialog");
const todoForm = todoDialog.getElementsByTagName("form")[0];

// \TODO dialog controls and event handlers
const todoShowBtn = document.getElementById("show-todo-dialog");
const todoCloseBtn = todoDialog.querySelector("#todo-close");
const todoSubmitBtn = todoDialog.querySelector("#todo-submit");

todoShowBtn.addEventListener("click", () => {
  todoDialog.showModal();
});

todoCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelectorAll("p[class=inputError]")
    .forEach((indicator) => (indicator.textContent = ""));

  todoForm.reset;
  todoDialog.close();
});

todoSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let isValid = true;

  document
    .querySelectorAll("p[class=inputError]")
    .forEach((indicator) => (indicator.textContent = ""));

  const title = document.getElementById("todo_title");
  const description = document.getElementById("todo_description");
  const date = document.getElementById("due_date"); // Returns year-month-date // Min date is always todays date // Default date is always today
  const time = document.getElementById("due_date_time"); // Returns time due to the set date; // Default time is always one hour ahead
  let priorityValue = undefined;
  document.querySelectorAll(".btn-check").forEach((checkBtn) => {
    if (checkBtn.classList.contains("on")) {
      priorityValue = checkBtn.dataset.priority;
    }
  }); // Return null if no priority selected
  const projectAssignedTo = document.getElementById("project_selection"); // Returns "" if no project assigned to selected

  // Validate title
  let titleValue = title.value;
  if (
    titleValue.trim() === "" ||
    (titleValue.length < title.minLength && titleValue.length > title.maxLength)
  ) {
    document.getElementById("titleError").textContent =
      "Title is required and must be at least 6 characters but not more than 12 character";
    isValid = false;
  }

  // Validate description
  let descriptionValue = description.value;
  if (
    descriptionValue.trim() === "" ||
    (descriptionValue.length < description.minLength &&
      descriptionValue.length > description.maxLength)
  ) {
    document.getElementById("descriptionError").textContent =
      "Description is required and must be at least 10 characters but not more than 150 character";
    isValid = false;
  }

  // Validate due date and time
  const dateValue = date.value;
  const timeValue = time.value;
  const dueDate = `${dateValue} | ${timeValue}`;

  // Validate Priority
  if (!priorityValue) {
    document.getElementById("priorityError").textContent =
      "Priority is required";
    isValid = false;
  }

  // If the form is not valid don't submit it
  if (!isValid) return;

  // Add todo to the project
  const newTodo = todoFunctions.createTodoItem(
    titleValue,
    descriptionValue,
    dueDate,
    priorityValue,
    projectAssignedTo.value
  );

  // Render todo list based on project assigned to
  currentTodoDisplayed = allProjects["default project"].todoList;
  htmlFunctions.renderProjectTodoList(
    Event,
    allProjects,
    currentProjectDisplayed,
    578
  );

  console.log(newTodo);

  todoForm.reset(); // Reset form input fields
  todoDialog.close(); // Close dialog
});

//! \PROJECT dialog controls and event handlers
const projectDialog = document.getElementById("project-dialog");
const projectForm = projectDialog.getElementsByTagName("form")[0];

const projectShowBtn = document.getElementById("show-project-dialog");
const projectCloseBtn = projectDialog.querySelector("#project-close");
const projectSubmitBtn = projectDialog.querySelector("#project-submit");

projectShowBtn.addEventListener("click", () => {
  projectDialog.showModal();
});

projectCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document
    .querySelectorAll("p[class=projectInputError]")
    .forEach((indicator) => (indicator.textContent = ""));

  projectForm.reset();
  projectDialog.close();
});

projectSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = true;

  const name = document.getElementById("project_name");
  const projectName = name.value;

  if (
    projectName.trim() === "" ||
    (projectName.length < name.minLength && projectName.length > name.maxLength)
  ) {
    document.getElementById("projectNameError").textContent =
      "Name is required";
    isValid = false;
  }

  // Check if form is valid
  if (!isValid) return;

  // Create project and save to all projects object
  projectFunctions.createProject(projectName, []);

  // Render project side bar
  htmlFunctions.renderProjectSidesBar(allProjects);

  // Fire a loop to add project toggling event and display

  projectForm.reset(); // Reset form input fields
  projectDialog.close(); // Close dialog
});

function selectProjectOnClick(event, projectName) {
  const projectClicked = event.target;

  if (projectClicked.classList.contains("selected")) return;

  // Deselect all projects
  document
    .querySelectorAll(".js-project-item")
    .forEach((projectItem) => projectItem.classList.remove("selected"));

  // Select clicked project
  projectClicked.classList.add("selected");

  // Update current project displayed indicator
  const displayContainer = document.querySelector(".js-display-indicator");
  displayContainer.innerText = projectName;

  // Fetch and display all todo from default project
  currentProjectDisplayed = allProjects[projectName].name;

  // Render all todo for the default project
  currentTodoDisplayed = allProjects[projectName].todoList;
  console.log(currentTodoDisplayed);
  htmlFunctions.renderProjectTodoList(
    Event,
    allProjects,
    currentProjectDisplayed,
    578
  );
}

// TODO: Work on way to do form validation with e.preventDefault

/*
 // Perform validation
            let isValid = true;

            // Validate name
            const title = document.getElementById('name').value;
            if (name.trim() === '') {
                document.getElementById('nameError').textContent = 'Name is required.';
                isValid = false;
            }

            // Validate email
            const description = document.getElementById('email').value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Invalid email address.';
                isValid = false;
            }

            // Validate age
            const date = document.getElementById('age').value;
            if (age < 18 || age > 100) {
                document.getElementById('ageError').textContent = 'Age must be between 18 and 100.';
                isValid = false;
            }

            // Priority
            const priority = document.getElementById('age').value;
            if (age < 18 || age > 100) {
                document.getElementById('ageError').textContent = 'Age must be between 18 and 100.';
                isValid = false;
            }

            // Project Assigned To
            const projectAssignedTo = document.getElementById('age').value;
            if (age < 18 || age > 100) {
                document.getElementById('ageError').textContent = 'Age must be between 18 and 100.';
                isValid = false;
            }

            // If the form is valid, submit it
            if (isValid) {
                // Perform form submission (uncomment below line to actually submit)
                // event.target.submit();

                // For demonstration, show an alert
                alert('Form is valid and ready to be submitted!');
            } 
 */
