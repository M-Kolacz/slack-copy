console.log("Slack Thread Copier loaded");

function onThreadOpen(threadPanelNode) {
  injectCopyButton(threadPanelNode, () => {
    const messages = extractMessages(threadPanelNode);
    const markdown = format(messages);
    return navigator.clipboard.writeText(markdown);
  });
}

function onThreadClose() {
  removeCopyButton();
}

watchThreadPanel(onThreadOpen, onThreadClose);
