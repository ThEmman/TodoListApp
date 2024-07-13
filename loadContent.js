export default function loadContent(content = "") {
  if (!validateParameter(content, "string")) return; // validate type of content parameter

  const mainSectionElement = document.querySelector("main");
  const contentContainer = document.createElement("div");

  if (!content) return; // no content given then exit function

  contentContainer.innerHTML = content;
  mainSectionElement.innerHTML = ""; // Clear old content in main section element
  mainSectionElement.appendChild(contentContainer);
}
