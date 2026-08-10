---
id: concept.browser-rendering
title: Browser Rendering Pipeline
slug: browser-rendering
topic: topic.react-fundamentals
description: The steps a browser takes to turn HTML/CSS/JS into pixels.
---
# Browser Rendering Pipeline
Understanding how a browser renders is critical for optimizing frontend performance:

```mermaid
graph TD
    HTML[HTML] --> DOM[DOM Tree]
    CSS[CSS] --> CSSOM[CSSOM Tree]
    DOM --> RenderTree[Render Tree]
    CSSOM --> RenderTree
    RenderTree --> Layout[Layout / Reflow]
    Layout --> ULE[useLayoutEffect]
    ULE --> Paint[Paint]
    Paint --> UE[useEffect]
    UE --> Composite[Composite Layers]
    
    style ULE fill:#d29922,stroke:#d29922,color:#000
    style UE fill:#58a6ff,stroke:#58a6ff,color:#000
```

1. **DOM/CSSOM Construction:** Parsing HTML and CSS.
2. **Render Tree:** Combining DOM and CSSOM.
3. **Layout (Reflow):** Calculating the geometry (position/size) of each node.
4. **Paint:** Filling in pixels.
5. **Compositing:** Layering the painted parts.

**Crucial Point:** `useLayoutEffect` runs synchronously after Layout but *before* Paint, whereas `useEffect` runs after Paint.
