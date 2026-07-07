# Web App UI Kit

A **generic application shell** for Pezza's personal apps — not tied to any one product. Use it as the starting point for any internal tool, dashboard, or collection manager.

## Run
Open `index.html`. It loads the compiled design-system bundle (`_ds_bundle.js`) plus the kit's own scripts.

## What it demonstrates
- **Sidebar** (`Sidebar.jsx`) — emblem lockup, primary nav, grouped sections, settings footer.
- **Topbar** — page title, search `Input`, primary `Button`.
- **Overview stats** — three metric `Card`s.
- **Items grid / list** (`RecordCard.jsx`, `AppShell.jsx`) — toggle layouts, star to favorite, status `Badge`s.
- **Activity feed** — simple timeline.
- **Add slide-over** (`AddPanel.jsx`) — `Input` + `Select` + `Button`, animated with crossfade easing.

## Composition
Every primitive comes from the bundle namespace `window.PezzaDesignSystem_8fc740` (`Button`, `IconButton`, `Input`, `Select`, `Badge`, `Card`). Icons are a local monoline set (`Icons.jsx`) matching the mark. Data is mock (`data.js`) — replace with real records.

## Interactions
Search filters, layout toggle (grid/list), star/unstar, create item (prepends to the list), nav switches views. All client-side mock state.
