// Import Modules
import projectUtilities from "./utilities.js";

/*
!!!!!!!!!!! TODO: REFACTORING OF NAMELESS FUNCTIONS AND ARGUMENTS BEFORE CONTINUATION OF CODE BELOW !!!!!!!!!!!  
*/

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

// TODO: Refactor Functions to use
function initializeClicksForProjectSidebar() {
  // Open Project sidebar toggle button
  projectToggle.addEventListener("click", function () {
    if (projectToggle.dataset.toggled == "false") {
      projectSideBar.classList.toggle("d-none");
      projectToggle.dataset.toggled = "true";

      // Make HTML Body on clickable  pointer-events: none; /* Disable clicks */ opacity: 0.5; /* Optional: visually indicate disabled state */
      headerSection.style.pointerEvents = "none";
      mainSection.style.pointerEvents = "none";
    }
  });

  // Close Project sidebar toggle button
  projectSideBarCloseBtn.addEventListener("click", function () {
    projectSideBar.classList.toggle("d-none");
    projectToggle.dataset.toggled = "false";

    headerSection.style.pointerEvents = "all";
    mainSection.style.pointerEvents = "all";
  });
}

initializeClicksForProjectSidebar();

//! EVENT LISTENERS FOR ALL BUTTONS AND MISCELLANEOUS EVENTS

window.addEventListener("DOMContentLoaded", function (e) {
  // Give all project button click events
  function projectSideBarLoadingEvents() {
    // Fetch and display all projects to project sidebar
    htmlFunctions.renderProjectSidesBar(allProjects);

    // Give project buttons click events at start of application after loading
    InitializeAllProjectBtnHandlerFunction();
  }

  projectSideBarLoadingEvents();

  //Display all todo for default project
  initializeDefaultTodoDisplayed(e);

  function todoFormLoadingEvents() {
    // Toggle function for todo radio buttons in html
    todoFormRadioToggleFunctionality();

    // Loading select options for todo project assigned to the html element
    todoFormSelectFunctionality();
  }

  todoFormLoadingEvents();

  // Used
  function InitializeAllProjectBtnHandlerFunction() {
    // Give buttons click events at start of application
    const allProjectBtn = projectsDisplay.querySelectorAll(".js-project-item");
    for (let project of allProjectBtn) {
      project.addEventListener("click", function (event) {
        selectProjectOnClick(event, project.innerText);
      });
    }
  }

  //Used
  function initializeDefaultTodoDisplayed(event) {
    // Set project display for client and server side synchronization to default project
    currentProjectDisplayed = allProjects["default project"].name;
    allProjects["default project"].state = true; // Set state to true for backend compatibility

    // Render all todo for the default project to the client
    currentTodoDisplayed = allProjects["default project"].todoList;
    alterCardType(event);
  }

  // Used
  function todoFormRadioToggleFunctionality() {
    const priority = document.querySelectorAll("input[name=priority]");

    for (let radio of priority) {
      radio.addEventListener("click", function () {
        for (let otherRadio of priority) {
          otherRadio.classList.remove("on");
        }

        radio.classList.toggle("on");
      });
    }
  }

  // Used
  function todoFormSelectFunctionality() {
    // Add projects to the todo list forms
    const projectSelectionInput = document.getElementById("project_selection"); // Get select input container

    let projectOptions = `<option selected value= "default Project">Select Project to Assign to: </option> \n`;

    for (let projectName in allProjects) {
      projectOptions += `<option value="${projectName}">${projectName}</option> \n`;
    }

    projectSelectionInput.innerHTML = projectOptions;
  }
});

//! FORM CONTROL FOR TODO DIALOG BOX
const todoDialog = document.getElementById("todo-dialog");
const todoForm = todoDialog.getElementsByTagName("form")[0];

// \TODO dialog controls and event handlers
const todoShowBtn = document.getElementById("show-todo-dialog");
const todoCloseBtn = todoDialog.querySelector("#todo-close");
const todoSubmitBtn = todoDialog.querySelector("#todo-submit");

// \TODO DIALOG BOX CONTROL and event handlers
function initializeTodoFormEvents() {
  todoShowBtn.addEventListener("click", () => {
    todoDialog.showModal();
  });

  todoCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll("p[class=inputError]")
      .forEach((indicator) => (indicator.textContent = ""));

    todoForm.reset();
    todoDialog.close();
  });

  todoSubmitBtn.addEventListener("click", function (event) {
    const submitType = event.target.classList.contains("edit-mode"); // True means edit mode
    const cardToEditId = event.target.dataset.cardId; // the card to edit id alphanumeric

    console.log(submitType, cardToEditId);

    if (submitType && cardToEditId != "") {
      todoCompleteFormFunction(event, "Edit", cardToEditId); // Function for editing the card clicked in the main section

      // Negate changes to submit type and card being edited
      todoForm
        .querySelector('button[type="submit"]')
        .classList.remove("edit-mode"); // Removes the mode which the btn is clicked upon
      todoForm.querySelector('button[type="submit"]').dataset.cardId = ""; // Removes the card id to the submit button for easy access

      return;
    }

    todoCompleteFormFunction(event); // Function for adding new todo items to the html document
  });
}

//! PROJECT dialog controls and event handlers
const projectDialog = document.getElementById("project-dialog");
const projectForm = projectDialog.getElementsByTagName("form")[0];

const projectShowBtn = document.getElementById("show-project-dialog");
const projectCloseBtn = projectDialog.querySelector("#project-close");
const projectSubmitBtn = projectDialog.querySelector("#project-submit");

// PROJECT dialog controls and event handlers
function initializeProjectFormEvents() {
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
      (projectName.length < name.minLength &&
        projectName.length > name.maxLength)
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

    // Add projects to the todo list forms
    const projectSelectionInput = document.getElementById("project_selection"); // Get select input container

    let projectOptions = `<option selected value= "default Project">Select Project to Assign to: </option> \n`;

    for (let projectName in allProjects) {
      projectOptions += `<option value="${projectName}">${projectName}</option> \n`;
    }

    projectSelectionInput.innerHTML = projectOptions;

    // Fire a loop to add project toggling event and display
    // Give them all project button click events
    const allProjectBtn = projectsDisplay.querySelectorAll(".js-project-item");
    for (let project of allProjectBtn) {
      project.addEventListener("click", function (event) {
        selectProjectOnClick(event, project.innerText);
      });
    }

    projectForm.reset(); // Reset form input fields
    projectDialog.close(); // Close dialog
  });
}

initializeProjectFormEvents();

// On click function for project selection buttons
function selectProjectOnClick(event, projectName) {
  const projectClicked = event.target;
  const windowWidth = window.innerWidth;

  // Selected = text-bg-light, Deselected = text-bg-dark

  if (projectClicked.classList.contains("text-bg-light")) return;

  // Deselect any projects
  document.querySelectorAll(".js-project-item").forEach((projectItem) => {
    projectItem.classList.add("text-bg-dark");
    projectItem.classList.remove("text-bg-light");
  });

  // Select clicked project
  projectClicked.classList.add("text-bg-light");
  projectClicked.classList.remove("text-bg-dark");

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
    windowWidth
  );
}

// Re-render HTML elements if window size changes between 576px
window.addEventListener("resize", function (e) {
  alterCardType(e); // Call function to re-render HTML card elements on window resize
});

function alterCardType(event) {
  const breakPoint = 576; // Breaking point for mobile and desktop cards

  const windowWidth = event.currentTarget.innerWidth;

  // Re-render html with proper cards
  if (windowWidth < breakPoint) {
    htmlFunctions.renderProjectTodoList(
      Event,
      allProjects,
      currentProjectDisplayed,
      windowWidth
    );
  } else {
    htmlFunctions.renderProjectTodoList(
      Event,
      allProjects,
      currentProjectDisplayed,
      breakPoint + 1
    );
  }
}

// Default cards to be displayed on screen
todoFunctions.createTodoItem(
  "Harry Potter",
  "This is a description",
  "2005-02-21",
  "low"
);
todoFunctions.createTodoItem(
  "Harry Potter",
  "This is a description",
  "2024-12-09",
  "normal"
);

// TODO: Make editing the card possible with same dialog box

// Function to show modal for todo dialog

function formAddTodoItem() {
  console.log("Form Add Todo");
  document
    .querySelectorAll("p[class=inputError]")
    .forEach((indicator) => (indicator.textContent = ""));

  const title = document.getElementById("todo_title");
  const description = document.getElementById("todo_description"); // Returns the description
  const date = document.getElementById("due_date"); // Returns year-month-date // Min date is always todays date // Default date is always today
  const time = document.getElementById("due_date_time"); // Returns time due to the set date; // Default time is always one hour ahead
  let priorityValue = undefined;
  document.querySelectorAll(".btn-check").forEach((checkBtn) => {
    if (checkBtn.classList.contains("on")) {
      priorityValue = checkBtn.dataset.priority;
    }
  }); // Return null if no priority selected
  const projectAssignedToValue = document
    .getElementById("project_selection")
    .value.toLowerCase(); // Returns "" if no project assigned to selected

  const isValid = validateTodoFormInputs(title, description, priorityValue); // Check if form inputs are valid before submitting

  // If the form is not valid don't submit it
  if (!isValid) return;

  // Validate due date and time
  const dateValue = date.value;
  const timeValue = time.value;
  const dueDate = `${dateValue} ${timeValue}`;

  /* console.log(
    title,
    description,
    priorityValue,
    dueDate,
    projectAssignedToValue
  ); */

  // Add todo to the project
  const newTodo = todoFunctions.createTodoItem(
    title.value,
    description.value,
    dueDate,
    priorityValue,
    projectAssignedToValue
  );

  // Render todo list based on project assigned to
  let projectAssignedTodoList = allProjects[projectAssignedToValue].todoList;

  htmlFunctions.renderProjectTodoList(
    Event,
    allProjects,
    currentProjectDisplayed,
    window.innerWidth
  );

  console.log(newTodo);

  todoForm.reset(); // Reset form input fields
  todoDialog.close(); // Close dialog
}

function formEditTodoItem(editCardId) {
  console.log("Form Edit Todo");

  // TODO: CHECKPOINT - Get card values and put as placeholder for editing form input values
}

function validateTodoFormInputs(
  title,
  description,
  priorityValue,
  projectAssignedTo
) {
  let isValid = true;

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

  // Validate Priority
  if (!priorityValue) {
    document.getElementById("priorityError").textContent =
      "Priority is required";
    isValid = false;
  }

  return isValid;
}

const todoCompleteFormFunction = (e, submitType = "Add", editCardId = "") => {
  // submitType = "Add" | "Edit", editCardId = "" | "gdi48k";

  // In case it is from an edit state or a add state
  e.preventDefault();

  // Check the type of submit (edit or add)
  if (submitType === "Edit" && editCardId.length > 0) {
    // Edit the todo item here
    console.log("Trying to edit todo.....");
    formEditTodoItem(editCardId);
  } else if (submitType === "Add" && editCardId === "") {
    formAddTodoItem();
  }
};
initializeTodoFormEvents();

/* createTodoItem("Harry Potter", "This is a description", "2005-02-21", "normal");
createTodoItem("Harry Potter", "This is a description", "2005-02-21", "high");
createTodoItem("Harry Potter", "This is a description", "2005-02-21", "urgent"); */
