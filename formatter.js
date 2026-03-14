function format(messages) {
  return messages
    .map(({ username, timestamp, content }) => `**@${username}** (${timestamp}):\n${content}`)
    .join("\n\n");
}

module.exports = { format };
