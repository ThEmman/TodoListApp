function createProjectBtn(projectObject) {
  const project = `<button
          type="button"
          class="list-group-item list-group-item-action text-bg-dark"
        >
        ${projectObject.name}
        </button>`;

  return project;
}
