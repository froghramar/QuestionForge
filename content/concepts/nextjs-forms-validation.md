---
id: concept.nextjs-forms-validation
title: Forms and Validation
slug: nextjs-forms-validation
topic: topic.nextjs-fundamentals
description: Handling form submissions and data validation using Server Actions, Zod, and React hooks.
---
# Next.js Forms and Validation

Next.js leverages Server Actions and React's specialized hooks to provide a seamless form-handling experience.

### Key Components
- **Server Actions:** Handle the backend logic of the form submission.
- **`useActionState` (formerly `useFormState`):** Manages the state of the form (e.g., success message, validation errors) returned from the action.
- **`useFormStatus`:** Provides the `pending` state of the submission for UI feedback (like loading spinners).
- **Zod:** Often used alongside Server Actions to validate `FormData` on the server before processing.
- **Progressive Enhancement:** Forms can work with standard HTML `<form action="...">` even before JavaScript has loaded.
