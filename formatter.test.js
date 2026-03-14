const { test } = require("node:test");
const assert = require("node:assert/strict");
const { format } = require("./formatter");

test("single message", () => {
  const result = format([{ author: "alice", timestamp: "10:00 AM", content: "Hello" }]);
  assert.equal(result, "**@alice** (10:00 AM):\nHello");
});

test("multiple messages separated by blank line", () => {
  const result = format([
    { author: "alice", timestamp: "10:00 AM", content: "Hello" },
    { author: "bob", timestamp: "10:01 AM", content: "Hi" },
  ]);
  assert.equal(result, "**@alice** (10:00 AM):\nHello\n\n**@bob** (10:01 AM):\nHi");
});

test("empty content", () => {
  const result = format([{ author: "alice", timestamp: "10:00 AM", content: "" }]);
  assert.equal(result, "**@alice** (10:00 AM):\n");
});

test("empty array", () => {
  assert.equal(format([]), "");
});

test("special characters", () => {
  const result = format([{ author: "alice", timestamp: "10:00 AM", content: "<script>alert('xss')</script> & \"quotes\"" }]);
  assert.equal(result, "**@alice** (10:00 AM):\n<script>alert('xss')</script> & \"quotes\"");
});
