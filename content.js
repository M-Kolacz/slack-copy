console.log("Slack Thread Copier loaded");

function onThreadOpen(threadPanelNode) {
  injectCopyButton(threadPanelNode);
  const messages = extractMessages(threadPanelNode);
  console.log("[Slack Thread Copier] Extracted messages:", messages);
}

function onThreadClose() {
  removeCopyButton();
}

watchThreadPanel(onThreadOpen, onThreadClose);
