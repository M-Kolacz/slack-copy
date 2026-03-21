const { test } = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const { extractContent } = require("./extractor");

function makeElement(html) {
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`);
  return dom.window.document.body.firstChild;
}

test("plain text only", () => {
  const el = makeElement("<div>Hello world</div>");
  assert.equal(extractContent(el), "Hello world");
});

test("raw URL link → plain text", () => {
  const url = "https://example.com";
  const el = makeElement(`<div><a href="${url}">${url}</a></div>`);
  assert.equal(extractContent(el), url);
});

test("display-text link → markdown using data-stringify-link", () => {
  const url = "https://example.com";
  const el = makeElement(
    `<div><a href="${url}" data-stringify-link="${url}">Click here</a></div>`
  );
  assert.equal(extractContent(el), "[Click here](https://example.com)");
});

test("display-text link → markdown fallback to href", () => {
  const url = "https://example.com";
  const el = makeElement(`<div><a href="${url}">Click here</a></div>`);
  assert.equal(extractContent(el), "[Click here](https://example.com)");
});

test("mixed content: text + link", () => {
  const url = "https://technicalinterviews.dev/book/10-solutions";
  const el = makeElement(`<div>See <a href="${url}">Zasób</a> now</div>`);
  assert.equal(extractContent(el), `See [Zasób](${url}) now`);
});

test("multiple links", () => {
  const url1 = "https://example.com/a";
  const url2 = "https://example.com/b";
  const el = makeElement(
    `<div><a href="${url1}">Alpha</a> and <a href="${url2}">Beta</a></div>`
  );
  assert.equal(extractContent(el), `[Alpha](${url1}) and [Beta](${url2})`);
});

test("hidden span sibling is skipped", () => {
  const url = "https://example.com";
  const el = makeElement(
    `<div><a href="${url}">Link</a><span hidden>tooltip</span></div>`
  );
  assert.equal(extractContent(el), `[Link](${url})`);
});
