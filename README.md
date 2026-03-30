# OpenTalk — Live Comments Application

## Demo

[Loom walkthrough](https://www.loom.com/share/3fa140a9112f48debc690c596884bdf9)

---

## How to run locally

**Requirements:** Node.js 18+ or Bun

```bash
# with bun (recommended)
bun install
bun dev

# or with npm
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

To build for production:

```bash
bun run build
# or
npm run build
```

---

## Assumptions & trade-offs

**Assumptions**
- The Auth Gate shows the selected topic inside the modal — the spec says it appears "in place of the Comment Thread" but doesn't define the layout, so I passed the pending topic through and displayed it as a mini hero card to give the modal context
- Reactions are pre-seeded alongside comments — the spec doesn't mention reactions explicitly, but the Figma designs include them on comment cards so I treated them as part of the required comment data shape
- "Sign in" and "Create account" trigger the same auth flow — the spec shows both buttons but defines no separate registration screen, so both set authenticated state and proceed to the thread

**Trade-offs**
- Comment input is Enter-to-submit with no send button — cleaner UI but less immediately obvious on mobile; a send button would improve discoverability

---

## What I'd improve given more time
- A proper send button alongside the comment input for better mobile UX
- Keyboard navigation polish and focus management between screens
