# Wall Calendar Planner

A polished, frontend-only Next.js planner that turns a monthly calendar into a portfolio-style wall calendar experience. It combines range selection, notes, themes, and motion into a single responsive interface.

## What It Does

- Displays a month view with keyboard-friendly range selection.
- Lets you save monthly notes and notes tied to a selected date range.
- Persists theme and notes in `localStorage`.
- Includes mock events, quick actions, and summary cards for planning context.
- Adapts to desktop, tablet, and mobile screens.

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- date-fns
- lucide-react

## Getting Started

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
```

## Project Structure

- `src/app/page.tsx` renders the main experience.
- `src/components/calendar/*` contains the header, hero panel, month grid, and range summary.
- `src/components/notes/*` contains the note composer and note cards.
- `src/components/ui/*` contains quick actions and the theme switcher.
- `src/hooks/useCalendarRange.ts` handles range selection and summary logic.
- `src/hooks/useLocalStorage.ts` manages browser persistence safely.
- `src/lib/calendar.ts` builds the month grid.
- `src/lib/mock-events.ts` supplies sample calendar events.
- `src/types/index.ts` stores shared types.

## Interview Notes

- The app is designed as a clean, single-page UI demo.
- Date cells are real buttons with accessible labels and keyboard support.
- State is hydration-safe, so the app renders cleanly before browser storage is available.
- The layout is responsive and keeps the main calendar usable on smaller screens.
- Production build has been verified with `npm run build`.
