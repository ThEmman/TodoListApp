function createCard(
  { id, title, dueDate, description, priority, projectAssignedTo },
  windowSize
) {
  const Card =
    windowSize >= 576
      ? `          <div class="card-container">
      <div class="flip-card" data-id=${id}>
            <div class="card css-todo-card-front" data-id=${id} data-priority="${priority}">
              <input
                type="checkbox"
                name="taskDone"
                id="taskDone"
                style="
                  position: absolute;
                  right: 10px;
                  top: 10px;
                  transform: scale(1.5);
                "
              />
              <button class="btn p-0 card-edit-pencil" style="position: absolute; left: 5px; top: 0;" data-id=${id}><i class="bi bi-pencil text-danger"></i></button>
              <img
                src="stockImage.jpg"
                class="card-img-top"
                alt="Todo Item Image"
              />
              <div class="card-body position-relative">
                <h5 class="card-title">${title}</h5>
                <p class="fst-italic card-text mb-0">
                  EXPIRY DATE: <span class="due-date-and-time">${dueDate}</span>
                </p>
                <span class="text-info project-assigned-to">Project Assigned to: ${projectAssignedTo}</span>
                <span
                  class="badge position-absolute top-0 end-0 mt-3 mx-2"
                  >${priority}</span
                >
              </div>
              <div class="card-footer">
                <button class="btn btn-outline-dark card-flip-btn" onclick=cardRotation(event) data-btnId=${id}>DESCRIPTION</button>
              </div>
            </div>
            <div class="card css-todo-card-back">
              <h3 class=" card-header text-center">Description</h3>
              <p class="card-body">
                ${description}
              </p>
              <div class="card-footer mx-auto">
                <button class="btn btn-outline-dark card-flip-btn" data-btnId=${id} onclick=cardRotation(event)>TODO SUMMARY</button>
              </div>
            </div>
            </div>
          </div>`
      : /*
          ?: BELOW IS FOR MOBILE VERSIONS
           */
        `<div class="card-container">
      <div class="flip-card" data-id=${id}>
            <div class="card mx-auto css-todo-card-front" data-id=${id} data-priority="${priority}">
              <input
                type="checkbox"
                name="taskDone"
                id="taskDone"
                style="
                  position: absolute;
                  right: 10px;
                  top: 10px;
                  transform: scale(1.5);
                "
              />
              <button class="btn p-0 card-edit-pencil" style="position: absolute; right: 5px; bottom: 60px;" data-id=${id}><i class="bi bi-pencil text-danger"></i></button>
              <div
                class="card-body"
                style="
                  background: url(stockImage.jpg);
                  color: white;
                  background-size: cover;
                  background-repeat: no-repeat;
                "
              >
                <h5 class="card-title">${title}</h5>
                <p class="fst-italic card-text mb-0">
                  EXPIRY DATE: <span class="due-date-and-time">${dueDate}</span>
                </p>
                <span class="text-info project-assigned-to">Project Assigned to: ${projectAssignedTo}</span>
              </div>
              <div
                class="card-footer d-flex w-100 align-items-center justify-content-between"
              >
                <button class="btn btn-outline-dark card-flip-btn" onclick=cardRotation(event) data-btnId=${id}>DESCRIPTION</button>
                <span
                  class="badge float-end align-items-center"
                  >${priority}</span
                >
              </div>
            </div>
            <div class="card css-todo-card-back">
              <h3 class=" card-header text-center">Description</h3>
              <p class="card-body">
                ${description}
              </p>
              <div class="card-footer mx-auto">
                <button class="btn btn-outline-dark card-flip-btn" data-btnId=${id} onclick=cardRotation(event)>TODO SUMMARY</button>
              </div>
            </div>
          </div>
          </div>`;

  return Card;
}

export { createCard };
