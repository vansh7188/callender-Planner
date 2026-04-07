# Wall Calendar Planner

Wall Calendar Planner is a polished, frontend-only Next.js calendar experience designed to feel like a premium physical wall calendar translated into a modern portfolio piece.

## Features

- Hanging wall-calendar aesthetic with a hero image panel, binding accents, and soft shadowed surfaces.
- Interactive month view with keyboard-friendly date range selection.
- Theme system with Mountain Blue, Sunset Amber, and Forest Green palettes.
- Monthly notes and range-linked notes with localStorage persistence.
- Animated month transitions with Framer Motion.
- Utility badges for selected days, weekend count, and whether the range includes today.
- Mock holiday/event markers, quick actions, and a mini memory board.
- Fully responsive layout for desktop, tablet, and mobile.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Architecture

- `src/app/page.tsx` renders the single-page experience.
- `src/components/calendar/*` contains the wall calendar shell, header, hero, grid, and range UI.
- `src/components/notes/*` contains the notes composer and note cards.
- `src/components/ui/*` contains quick actions and the theme switcher.
- `src/hooks/useLocalStorage.ts` safely persists state after hydration.
- `src/hooks/useCalendarRange.ts` handles range selection and summary calculations.
- `src/lib/calendar.ts` builds month grids and range utilities.
- `src/lib/mock-events.ts` provides sample event markers.
- `src/types/index.ts` centralizes shared types.

## Accessibility Notes

- Date cells are real buttons with strong focus states and ARIA labels.
- Keyboard support includes arrow key navigation plus Enter/Space selection.
- Color choices are paired with labels, not color alone, for important state.
- The layout keeps tap targets comfortable on mobile.

## Persistence Strategy

- Theme choice, notes, and draft-friendly calendar state are stored in localStorage.
- Monthly notes are keyed by `YYYY-MM`.
- Range notes are keyed by a stable `start|end` range string.
- Hydration-safe defaults ensure the app renders cleanly before localStorage is available.
