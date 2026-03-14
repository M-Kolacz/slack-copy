function extractMessages(threadPanelNode) {
  const items = threadPanelNode.querySelectorAll('[data-qa="virtual-list-item"]');
  const messages = [];
  let lastAuthor = "";

  for (const item of items) {
    const container = item.querySelector('[data-qa="message_container"]');
    if (!container) continue;

    const senderEl = container.querySelector('[data-qa="message_sender_name"]');
    const author = senderEl ? senderEl.textContent.trim() : lastAuthor;
    if (senderEl) lastAuthor = author;

    const timestampEl = container.querySelector('[data-qa="timestamp_label"]');
    const timestamp = timestampEl ? timestampEl.textContent.trim() : "";

    const textEl = container.querySelector('[data-qa="message-text"]');
    const content = textEl ? textEl.textContent.trim() : "";

    messages.push({ author, timestamp, content });
  }

  return messages;
}

if (typeof module !== "undefined") {
  module.exports = { extractMessages };
}
