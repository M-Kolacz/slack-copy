# Slack Thread Copier — Chrome Extension Idea

## Problem

Slack threads contain valuable conversations — decisions, context, debugging sessions, brainstorms — but there's no simple way to copy an entire thread's content. Manually selecting thread text produces messy, garbled output full of UI artifacts, emoji counts, timestamps in wrong places, and broken formatting. Existing Chrome extensions either export whole channels (overkill), require complex setup, or work through clunky popup interfaces rather than integrating directly into Slack's UI.

For users who work with AI agents or knowledge management tools, the friction of getting a clean thread transcript is a daily annoyance.

## Solution

A lightweight Chrome extension that injects a small **copy icon** directly into Slack's thread panel UI. One click copies every message in the current thread to the clipboard as clean, formatted text — ready to paste into Claude, ChatGPT, Notion, a JIRA ticket, or anywhere else.

## Core User Flow

1. User opens a Slack thread in the web app.
2. A small copy icon appears at the top of the thread panel (near the thread header).
3. User clicks the icon.
4. All messages in the thread are collected, cleaned, and formatted.
5. The formatted text is copied to the clipboard.
6. A brief visual confirmation (e.g., checkmark or toast notification) lets the user know it worked.

## Output Format

The copied text should be clean, readable, and structured. Example:

```
**@alice** (2025-03-12 10:15 AM):
Hey team, should we go with Postgres or DynamoDB for the new service?

**@bob** (2025-03-12 10:18 AM):
I'd lean toward Postgres — we already have the infrastructure and the team knows it well.

**@carol** (2025-03-12 10:22 AM):
Agree with Bob. DynamoDB makes sense for high-scale key-value patterns, but our access patterns are more relational.

**@alice** (2025-03-12 10:30 AM):
Makes sense. Let's go with Postgres. I'll update the ADR.
```

## Key Requirements

- **In-UI integration**: The copy button must live inside Slack's thread panel, not in a browser toolbar popup or separate interface.
- **One-click operation**: No configuration, no popups, no dialogs. Click → copied.
- **Clean formatting**: Strip out reaction counts, "X replies" labels, avatar images, and other UI noise. Preserve usernames, timestamps, and message content.
- **Thread-only scope**: Copy only the messages within the currently open thread, not the surrounding channel.
- **Markdown-friendly output**: Format should paste cleanly into Markdown-based tools (bold usernames, line breaks between messages).
- **Clipboard API**: Use the browser's Clipboard API so the user can immediately Ctrl+V / Cmd+V the result.
- **Visual feedback**: Show a brief confirmation that the copy succeeded (tooltip, icon change, or small toast).

## Technical Considerations

- The extension will need to run as a **content script** on `app.slack.com` to inject the icon and read DOM elements.
- Slack's web app is a complex single-page application with dynamic rendering. The extension will need to observe DOM mutations (MutationObserver) to detect when a thread panel opens and inject the button accordingly.
- Message content can be extracted by traversing Slack's DOM structure within the thread panel, targeting message container elements.
- No Slack API token or authentication is needed — this works entirely by reading what's already rendered in the browser.
- Privacy-first: No data leaves the browser. No network requests. Everything happens locally.

## Target Users

- Developers and engineers who paste Slack threads into AI coding agents (Claude, Cursor, ChatGPT, etc.)
- Product managers who capture decision threads for documentation
- Support teams who archive customer conversations
- Anyone who regularly moves Slack context into external tools

## Success Criteria

The extension works when a user can go from "I see a useful Slack thread" to "the clean text is on my clipboard" in exactly one click, with zero setup, zero popups, and zero configuration required on first use.
