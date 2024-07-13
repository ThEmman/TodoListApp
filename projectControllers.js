const allProjects = {}; // List for all projects / subdivision of todo's.

function projectCategory(name, todoList) {
  this.name = name;
  this.todoList = todoList;

  this.addTodoItemToProject = function (todoItem) {
    if (!validateParameter(todoItem, "object")) return; // Validate todoItem object

    // Check if todo item already exists in the project
    if (this.todoList.includes(todoItem)) {
      console.log("Task already assigned to this project");
      return;
    }

    // Check if todo item is already assigned to a project that isn't Default Project
    if (todoItem.projectAssignedTo !== defaultProjectName) {
      console.log(
        `Task cannot be assigned because it is already assigned to ${todoItem.projectAssignedTo} .`
      );
      return;
    }

    // Assign the task to the project
    todoItem.projectAssignedTo = this.name;
    this.todoList.push(todoItem);
  };
}

function addToAllProjectsList(newProject) {
  if (!validateParameter(newProject, "object")) return; // Validate project object

  allProjects[newProject.name] = newProject;
}

function createProject(name = defaultProjectName, todoList = []) {
  // check if project already exists
  if (allProjects[name]) {
    console.log("Project already exists");
    return;
  }

  const newProject = new projectCategory(name.toLowerCase(), todoList);
  addToAllProjectsList(newProject); //
  return newProject;
}

const projectFunctions = {
  createProject,
  addToAllProjectsList,
};

export { allProjects, projectFunctions };
