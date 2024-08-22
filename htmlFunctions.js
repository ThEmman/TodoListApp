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

  displayContainer.innerHTML = todoHTML;

  // Add edit button event for each card
  try {
    const allEditBtn = document.getElementsByClassName("card-edit-pencil");

    for (let pencil of allEditBtn) {
      pencil.addEventListener("click", function (event) {
        const todoDialog = document.getElementById("todo-dialog");
        const todoForm = todoDialog.getElementsByTagName("form")[0];
        const submitButton = todoForm.querySelector('button[type="submit"]');

        submitButton.classList.add("edit-mode"); // Adds the mode which the btn is clicked upon
        //! Also remove said attribute later on close/submit
        submitButton.dataset.cardId = pencil.dataset.id; // Adds the card id to the submit button for easy access

        console.log(submitButton);

        // Populate form with card information as placeholder values before showing modal
        let cardEle;
        document.querySelectorAll(".flip-card").forEach((card) => {
          if (card.dataset.id === pencil.dataset.id) {
            cardEle = card;
          }
        });

        todoDialog.querySelector("#todo_title").value =
          cardEle.querySelector(".card-title").innerText;

        todoDialog.querySelector("#todo_description").value =
          cardEle.querySelector(".css-todo-card-back .card-body").innerText;

        let dueDateAndTimeSplit = cardEle
          .querySelector(".css-todo-card-front .due-date-and-time")
          .innerText.split(" ");
        todoDialog.querySelector("#due_date").value = dueDateAndTimeSplit[0];
        todoDialog.querySelector("#due_date_time").value =
          dueDateAndTimeSplit[1] ? dueDateAndTimeSplit[1] : "00:00";

        const cardPriority = cardEle.querySelector(".badge").innerText;
        todoDialog.querySelectorAll("input[name=priority").forEach((radio) => {
          radio.classList.remove("on");

          if (cardPriority == radio.dataset.priority) {
            radio.classList.toggle("on");
            radio.checked = true; // Select the radio button
          }
        });

        const selectInput = todoDialog.querySelector("select");
        const projectAssignedToValue = cardEle
          .querySelector(".project-assigned-to")
          .innerText.split(":")[1]
          .trim();
        console.log(projectAssignedToValue);
        selectInput.querySelectorAll("option").forEach((option) => {
          option.removeAttribute("selected");
          // option.selected = false;

          if (option.value == projectAssignedToValue) {
            option.setAttribute("selected", true);
            // option.selected = true;
            console.log(option);
          }
        });

        // TODO: First make select project input auto fill && Then work on submitting to edit card details and reflect on backend arrays

        // Show todo modal
        todoDialog.showModal();
      });
    }
  } catch (error) {
    console.error(error);
  }
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
    // project = project name string
    if (project != "default project") {
      allProjectString += createProjectBtn(allProjects[project]);
    }
  }

  projectBar.innerHTML = allProjectString;
}

const htmlFunctions = {
  searchTodo,
  renderTodoList,
  renderProjectTodoList,
  renderProjectSidesBar,
};

export default htmlFunctions;
