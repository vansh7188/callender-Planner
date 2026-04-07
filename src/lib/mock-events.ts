import type { MockEvent } from '@/types';

const MOCK_EVENTS: MockEvent[] = [
  {
    id: 'event-apr-03-design-review',
    dateKey: '2026-04-03',
    title: 'Design review',
    detail: 'Polish pass on the portfolio hero and motion system.',
    tone: 'info',
    marker: 'Review'
  },
  {
    id: 'event-apr-07-weekly-planning',
    dateKey: '2026-04-07',
    title: 'Weekly planning',
    detail: 'Plan priorities and ship a calm week.',
    tone: 'success',
    marker: 'Plan'
  },
  {
    id: 'event-apr-12-family-brunch',
    dateKey: '2026-04-12',
    title: 'Family brunch',
    detail: 'Slow Sunday morning with no rush.',
    tone: 'warning',
    marker: 'Social'
  },
  {
    id: 'event-apr-18-deadline',
    dateKey: '2026-04-18',
    title: 'Project deadline',
    detail: 'Final review and submission window.',
    tone: 'warning',
    marker: 'Due'
  },
  {
    id: 'event-apr-22-earth-day',
    dateKey: '2026-04-22',
    title: 'Earth Day',
    detail: 'Gentle reminder to keep the design grounded.',
    tone: 'success',
    marker: 'Holiday'
  },
  {
    id: 'event-apr-28-retrospective',
    dateKey: '2026-04-28',
    title: 'Retro and reset',
    detail: 'Capture wins, open loops, and next actions.',
    tone: 'info',
    marker: 'Retro'
  },
  {
    id: 'event-may-02-travel',
    dateKey: '2026-05-02',
    title: 'Travel day',
    detail: 'Carry the wall calendar mood into the weekend.',
    tone: 'info',
    marker: 'Trip'
  },
  {
    id: 'event-may-11-release',
    dateKey: '2026-05-11',
    title: 'Feature release',
    detail: 'Snapshot the month before shipping.',
    tone: 'success',
    marker: 'Launch'
  }
];

export function getMockEvents() {
  return MOCK_EVENTS;
}
