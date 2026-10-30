export const SITE = {
  name: 'Flywheel',
  url: 'https://www.getflywheel.io/',
  tagline: 'AI staff for custom integrators, connected by a member network',
  description:
    'Flywheel gives custom integration firms AI employees for marketing, outbound, service triage and system design. Each firm owns its own data warehouse, and lessons from every member make every member’s staff smarter.',
  email: 'hello@getflywheel.io',
  pressEmail: 'press@getflywheel.io',
  location: 'Richmond, Virginia',
  applyUrl: '/apply/',
  // Founding window: three of five committed (partner deck, Aug 2026). Update as seats close.
  seats: { total: 5, committed: 3 },
  // Left empty until a GA4 property exists for getflywheel.io; the first-party journey events still fire.
  ga4: '',
  nav: [
    { label: 'How it works', href: '/how-it-works/' },
    { label: 'AI staff', href: '/ai-staff/' },
    { label: 'The network', href: '/network/' },
    { label: 'Pricing', href: '/pricing/' },
    { label: 'About', href: '/about/' },
  ],
};

// Client zero numbers, from Livewire (partner deck, Aug 2026). Refresh before launch.
export const PROOF = [
  { value: '47', unit: '', label: 'Outbound conversations booked per month' },
  { value: '3', unit: 'min', label: 'To first service response' },
  { value: '34', unit: '', label: 'Permit-sourced projects in pipeline' },
];

export const STAFF = [
  {
    seat: '01',
    role: 'Marketing',
    line: 'Keeps the brand talking every week.',
    duties: ['Drafts the weekly post, email and project story', 'Watches search and AI answers for your firm', 'Hands fixes to a named person and checks they shipped'],
    moves: 'Qualified inquiries from the work you want',
    reports: 'Your owner or marketing lead',
  },
  {
    seat: '02',
    role: 'Outbound',
    line: 'Works the list nobody has time to work.',
    duties: ['Follows up every quote before it goes cold', 'Reaches new homeowners from permit filings', 'Books the conversation, then hands it to sales'],
    moves: 'Conversations booked',
    reports: 'Your sales lead',
  },
  {
    seat: '03',
    role: 'Support',
    line: 'Triages service before a human touches it.',
    duties: ['Answers the first message in minutes, day or night', 'Pulls site history and checks what it can remotely', 'Routes the ticket with a diagnosis attached'],
    moves: 'Minutes to first response',
    reports: 'Your service manager',
  },
  {
    seat: '04',
    role: 'System Designer',
    line: 'Turns your catalog into proposal-ready designs.',
    duties: ['Builds a first-pass design from a walkthrough', 'Prices it from your own catalog and labor rates', 'Flags what a designer should check before it goes out'],
    moves: 'Hours from walkthrough to proposal',
    reports: 'Your lead designer',
  },
];

export const TOOLS = [
  { name: 'Lifecycle', line: 'Reads your QuickBooks history and sends proactive service and upgrade reminders.' },
  { name: 'Permit Miner', line: 'Finds new luxury builds in permit filings and starts the outreach.' },
  { name: 'Intel Engine', line: 'Reads local news and connects you with prospects in today’s stories.' },
];
