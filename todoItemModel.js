function createCard(
  { id, title, dueDate, description, priority, projectAssignedTo },
  windowSize
) {
  const Card =
    windowSize >= 576
      ? `          <div class="col-12 col-sm-6 col-md-4 col-lg-3" data-id=${id}>
            <div class="card mx-auto mx-md-0" style="width: 16rem">
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
              <img
                src="stockImage.jpg"
                class="card-img-top"
                alt="Todo Item Image"
              />
              <div class="card-body position-relative">
                <h5 class="card-title">${title}</h5>
                <p class="fst-italic card-text mb-0">
                  EXPIRY DATE: <span>${dueDate}</span>
                </p>
                <span class="text-info">Project Assigned to: ${projectAssignedTo}</span>
                <!-- <p class="card-text">
                ${description}
                </p> -->
                <span
                  class="badge text-bg-secondary position-absolute top-0 end-0 mt-3 mx-2"
                  >${priority}</span
                >
              </div>
              <div class="card-footer">
                <button class="btn btn-outline-dark">DESCRIPTION</button>
              </div>
            </div>
          </div>`
      : `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card mx-auto" style="width: 100%">
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

              <div
                class="card-body"
                style="
                  background: url(stockImage.jpg);
                  color: white;
                  background-size: cover;
                  background-repeat: no-repeat;
                "
              >
                <h5 class="card-title">Card title</h5>
                <p class="fst-italic card-text mb-0">
                  EXPIRY DATE: <span>2024</span>
                </p>
                <span class="text-info">Project Assigned to: </span>
                <!-- <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p> -->
                <div class="badge"></div>
              </div>
              <div
                class="card-footer d-flex w-100 align-items-center justify-content-between"
              >
                <button class="btn btn-outline-dark">DESCRIPTION</button>
                <span
                  class="badge text-bg-secondary float-end align-items-center"
                  >RED</span
                >
              </div>
            </div>
          </div>`;

  return Card;
}

export { createCard };
