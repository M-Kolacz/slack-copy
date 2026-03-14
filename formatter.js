function format(messages) {
  return messages
    .map(({ author, timestamp, content }) => `**@${author}** (${timestamp}):\n${content}`)
    .join("\n\n");
}

module.exports = { format };
