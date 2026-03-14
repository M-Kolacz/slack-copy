console.log("Slack Thread Copier loaded");

function onThreadOpen(threadPanelNode) {
  const messages = extractMessages(threadPanelNode);
  console.log("[Slack Thread Copier] Extracted messages:", messages);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      const panel = node.matches('[data-qa="threads_flexpane"]')
        ? node
        : node.querySelector('[data-qa="threads_flexpane"]');
      if (panel) {
        onThreadOpen(panel);
        return;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
