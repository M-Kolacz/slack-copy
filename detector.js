function watchThreadPanel(onOpen, onClose) {
  let currentPanel = null;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.removedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const panel = node.matches('[data-qa="threads_flexpane"]')
          ? node
          : node.querySelector('[data-qa="threads_flexpane"]');
        if (panel && panel === currentPanel) {
          currentPanel = null;
          onClose();
        }
      }

      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const panel = node.matches('[data-qa="threads_flexpane"]')
          ? node
          : node.querySelector('[data-qa="threads_flexpane"]');
        if (panel) {
          currentPanel = panel;
          onOpen(panel);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
}

if (typeof module !== "undefined") {
  module.exports = { watchThreadPanel };
}
