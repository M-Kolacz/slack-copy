const BUTTON_ID = "slack-thread-copier-btn";

function injectCopyButton(panelNode) {
  if (panelNode.querySelector("#" + BUTTON_ID)) return;

  const header = panelNode.querySelector(".p-flexpane_header");
  if (!header) return;

  const closeBtn = header.querySelector('[data-qa="close_flexpane"]');
  if (!closeBtn) return;

  const button = document.createElement("button");
  button.id = BUTTON_ID;
  button.type = "button";
  button.textContent = "Copy";
  button.className =
    "c-button-unstyled c-icon_button c-icon_button--size_medium c-icon_button--default";
  button.setAttribute("aria-label", "Copy thread");
  button.addEventListener("click", () => {
    console.log("Copy clicked");
  });

  header.insertBefore(button, closeBtn);
}

function removeCopyButton() {
  const button = document.getElementById(BUTTON_ID);
  if (button) button.remove();
}

if (typeof module !== "undefined") {
  module.exports = { injectCopyButton, removeCopyButton };
}
