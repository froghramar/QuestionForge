# Quality Standards

This document defines the quality bar for all content in QuestionForge. Every question and variant must meet these standards before being merged.

---

## Question Quality

### Title

- **Max ~40 characters** — concise and scannable
- **No filler prefixes**: ~~"What is..."~~, ~~"How does..."~~, ~~"Explain the..."~~
- **Use the technical term directly**: `async/await`, `Closures`, `Discriminated Unions`
- **For comparisons, use "vs"**: `interface vs type`, `useEffect vs useLayoutEffect`

### Frontmatter

| Field | Required | Rules |
|---|---|---|
| `id` | Yes | Format: `question.<kebab-case-name>`. Immutable after merge. |
| `title` | Yes | Concise, ≤40 chars |
| `slug` | Yes | URL-friendly, unique within questions |
| `difficulty` | Yes | One of: `Beginner`, `Easy`, `Medium`, `Hard`, `Expert` |
| `topic` | Yes | Must reference an existing topic ID |
| `concepts` | No | Array of existing concept IDs |
| `companies` | Yes | Array of existing company IDs (min 1, ideally 2-3) |
| `estimated_time` | Yes | Minutes (integer). Realistic estimate. |
| `updated` | Yes | ISO date of last significant content update |

### Body Structure

Every question must have these sections after the frontmatter:

```markdown
## Why This Is Asked
2-3 sentences. What is the interviewer evaluating? What skill does this test?

## Key Concepts
- Bullet point 1 (the core idea)
- Bullet point 2 (the nuance)
- Bullet point 3 (the edge case or trade-off)
```

**Guidelines:**
- "Why This Is Asked" should state the interviewer's intent, not just rephrase the question
- "Key Concepts" should be 3-5 bullet points covering what a strong answer includes
- Do not put the full answer here — that goes in the variant

---

## Variant Quality

### Frontmatter

| Field | Required | Rules |
|---|---|---|
| `id` | Yes | Format: `variant.<question-name>.<tech-name>` |
| `question` | Yes | Must reference an existing question ID |
| `technology` | Yes | Must reference an existing technology ID |
| `difficulty_override` | No | Only if the variant's difficulty differs from the question |

### Required Sections

Every variant **must** include these three sections:

#### 1. Expected Answer

- **Minimum 150 words** for Medium+ questions
- **Include code examples** for any programming-related question
- Code must be **real, runnable code** — no pseudocode, no `// do something here`
- Use `###` subheadings to organize complex answers
- Explain the "why", not just the "what"

#### 2. Common Mistakes

- **Minimum 2 items**
- Each mistake must be **specific**: ~~"Not understanding closures"~~ → "Creating closures over `var` in loops, causing all iterations to share the same variable reference"
- Explain **what goes wrong**, not just what to avoid
- Include the **consequence** of the mistake where relevant

#### 3. Follow-up Questions

- **Minimum 2 items**
- Include **parenthetical answer hints**: `(Answer: brief explanation)`
- Follow-ups should go deeper than the original question, not sideways
- Good follow-ups test whether understanding is superficial or genuine

---

## Code Examples

- Use language-specific syntax highlighting: ` ```typescript `, ` ```csharp `, ` ```sql `
- Keep examples **focused** — show exactly the concept being discussed, no boilerplate
- Include **comments only where behavior is non-obvious**
- If showing a before/after or comparison, label them clearly

---

## Difficulty Calibration

| Level | Interview Stage | What It Tests | Time |
|---|---|---|---|
| **Beginner** | Phone screen | Definitions, basic terminology | 5-10 min |
| **Easy** | Phone screen | Surface distinctions, simple usage | 10 min |
| **Medium** | Onsite Round 1 | Applied knowledge, trade-offs, "how" and "why" | 10-15 min |
| **Hard** | Onsite Round 2 | Internals, system-level reasoning, design decisions | 15-20 min |
| **Expert** | Staff+ interview | Advanced theory, edge cases, architectural implications | 15-20 min |

### Calibration Test

Ask yourself: "Would a developer with 2 years of experience reliably answer this?" If yes, it's Easy or below. If a senior developer would need to pause and think, it's Hard. If even experienced engineers might not know this, it's Expert.

---

## Review Checklist for Reviewers

When reviewing a PR, check:

1. **Accuracy**: Is the technical content correct? Any misleading simplifications?
2. **Completeness**: Does the variant cover the key concepts listed in the question?
3. **Code quality**: Are examples runnable? Do they demonstrate the concept clearly?
4. **Specificity**: Are common mistakes specific (not vague)? Are follow-ups genuinely deepening?
5. **Calibration**: Is the difficulty level appropriate?
6. **DRY**: Should any explanation be extracted to a concept file?
