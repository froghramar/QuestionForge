---
id: concept.nextjs-draft-mode
title: Next.js Draft Mode
slug: nextjs-draft-mode
topic: topic.nextjs-fundamentals
description: Viewing draft content from a CMS without needing to rebuild the entire site.
---
# Next.js Draft Mode

Draft Mode allows you to preview content from your Headless CMS in real-time, even if the pages are normally statically generated (SSG).

### How it Works
1.  **Enable:** You create a Route Handler that calls `draftMode().enable()`. This sets a secure cookie in the browser.
2.  **Bypass Cache:** When the cookie is present, Next.js bypasses the Full Route Cache and the Data Cache for `fetch` requests, ensuring the latest content is fetched from the CMS.
3.  **Disable:** You can call `draftMode().disable()` to clear the cookie and return to normal cached behavior.

### Use Case
Content editors want to see how a blog post looks on the live site before hitting "Publish." Draft Mode enables this without making the site dynamic for all users.
