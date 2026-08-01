---
id: variant.react-effect-timing.react
question: question.react-effect-timing
technology: tech.react
---
# Expected Answer
The primary difference is the **timing** of execution relative to the browser's paint cycle:

1. **`useEffect` (Asynchronous):** 
   - Runs **after** the browser has painted the screen. 
   - It is non-blocking and preferred for most side effects (data fetching, setting up subscriptions, logging).
   - This ensures the UI feels responsive as the browser can update the screen immediately after the render.

2. **`useLayoutEffect` (Synchronous):** 
   - Runs **after** React has performed all DOM mutations but **before** the browser has a chance to paint those changes.
   - Use this when you need to measure the DOM (e.g., getting the height of an element) and synchronously re-render based on those measurements.
   - If you used `useEffect` for DOM measurements that change the UI, the user might see a "flicker" because the initial render is painted, then the effect runs and triggers a second render.

# Common Mistakes
- **Overusing `useLayoutEffect`:** It blocks the browser's paint, which can significantly degrade performance if the effect logic is heavy.
- **SSR Warnings:** `useLayoutEffect` doesn't work on the server. Using it in components that are Server-Side Rendered results in warnings and potentially mismatched hydration.

# Follow-up Questions
- How does React Fiber coordinate these effects?
- What happens if you trigger a state update inside `useLayoutEffect`? (Answer: It triggers a synchronous re-render before the paint).
