/* Generic web-app demo data — a neutral "items" collection so the shell
   reads as a starter for any of Pezza's personal apps. */
window.AppData = {
  nav: [
    { id: 'overview', name: 'Overview', icon: 'Home' },
    { id: 'all', name: 'All items', icon: 'Grid' },
    { id: 'starred', name: 'Starred', icon: 'Star' },
    { id: 'activity', name: 'Activity', icon: 'Activity' },
  ],
  groups: [
    { id: 'inbox', name: 'Inbox', icon: 'Inbox' },
    { id: 'projects', name: 'Projects', icon: 'Folder' },
    { id: 'archive', name: 'Archive', icon: 'Archive' },
  ],
  stats: [
    { label: 'Total items', value: '128', delta: '+6 this week' },
    { label: 'Active', value: '94', delta: '73% of total' },
    { label: 'Needs review', value: '12', delta: '4 overdue' },
  ],
  items: [
    { id: 1, name: 'Onboarding flow', group: 'projects', status: 'active', meta: 'Updated 2h ago', count: 8, starred: true },
    { id: 2, name: 'Weekly digest', group: 'inbox', status: 'active', meta: 'Updated yesterday', count: 3, starred: false },
    { id: 3, name: 'Q3 roadmap', group: 'projects', status: 'review', meta: 'Due Jun 28', count: 14, starred: true },
    { id: 4, name: 'Asset library', group: 'projects', status: 'active', meta: 'Updated 3d ago', count: 42, starred: false },
    { id: 5, name: 'Saved searches', group: 'inbox', status: 'draft', meta: 'Draft', count: 0, starred: false },
    { id: 6, name: 'Release notes', group: 'archive', status: 'archived', meta: 'Archived May 12', count: 21, starred: false },
    { id: 7, name: 'Feedback inbox', group: 'inbox', status: 'review', meta: '5 new replies', count: 5, starred: false },
    { id: 8, name: 'Brand kit', group: 'projects', status: 'active', meta: 'Updated 1w ago', count: 17, starred: true },
    { id: 9, name: 'Old prototypes', group: 'archive', status: 'archived', meta: 'Archived Apr 02', count: 9, starred: false },
  ],
  activity: [
    { who: 'You', what: 'starred', target: 'Q3 roadmap', when: '2h' },
    { who: 'You', what: 'added 3 items to', target: 'Asset library', when: '5h' },
    { who: 'You', what: 'archived', target: 'Old prototypes', when: '1d' },
    { who: 'You', what: 'created', target: 'Weekly digest', when: '2d' },
  ],
};
