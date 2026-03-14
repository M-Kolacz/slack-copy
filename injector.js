const BUTTON_ID = "slack-thread-copier-btn";

function _doInject(panelNode, closeBtn) {
  if (panelNode.querySelector("#" + BUTTON_ID)) return;

  const button = document.createElement("button");
  button.id = BUTTON_ID;
  button.type = "button";
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" style="--s:20px;width:20px;height:20px;"><path fill="currentColor" fill-rule="evenodd" d="M7 2.75A.75.75 0 0 1 7.75 2h7.5A1.75 1.75 0 0 1 17 3.75v10.5A1.75 1.75 0 0 1 15.25 16H14v.25A1.75 1.75 0 0 1 12.25 18h-7.5A1.75 1.75 0 0 1 3 16.25V5.75A1.75 1.75 0 0 1 4.75 4H6v-.5A.75.75 0 0 1 6.25 2.75zm1.5.75v.5h4.5v-.5a.25.25 0 0 0-.25-.25h-4a.25.25 0 0 0-.25.25m-2 2v-.5H4.75a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25V16H7.75A.75.75 0 0 1 7 15.25V5.5zm3.5-.5h3.25c.138 0 .25.112.25.25v10.5a.25.25 0 0 1-.25.25H14V7.75A.75.75 0 0 0 13.25 7H10z" clip-rule="evenodd"/></svg>`;
  button.className =
    "c-button-unstyled c-icon_button c-icon_button--size_medium c-icon_button--default";
  button.setAttribute("aria-label", "Copy thread");
  button.addEventListener("click", () => {
    console.log("Copy clicked");
  });

  closeBtn.parentNode.insertBefore(button, closeBtn);
}

function injectCopyButton(panelNode) {
  const closeBtn = panelNode.querySelector('[data-qa="close_flexpane"]');
  if (closeBtn) {
    _doInject(panelNode, closeBtn);
    return;
  }

  const observer = new MutationObserver(() => {
    const closeBtn = panelNode.querySelector('[data-qa="close_flexpane"]');
    if (closeBtn) {
      observer.disconnect();
      _doInject(panelNode, closeBtn);
    }
  });
  observer.observe(panelNode, { childList: true, subtree: true });
}

function removeCopyButton() {
  const button = document.getElementById(BUTTON_ID);
  if (button) button.remove();
}

if (typeof module !== "undefined") {
  module.exports = { injectCopyButton, removeCopyButton };
}
