# Changelog

## v1.0.4 - 2026-03-04

Release focused on visual polish and conversion tracking readiness.

### Highlights
- Progress area polish across resolutions:
  - unified frame/progress seam gray tone
  - reduced seam thickness to a cleaner 4px
  - improved iframe seam rendering (`display:block`)
- Resume modal readability on small screens:
  - reduced title/option font sizes and spacing
  - preserved icon proportions with perfect circular rendering
- Google Ads tracking setup improvements on LP:
  - base Google tag installation
  - lead conversion event wiring after form success
- Production defaults moved to stable build `playvsl.v1.0.4.min.js`.

## v1.0.3 - 2026-03-03

Patch release focused on builder UX consistency.

### Highlights
- Fixed color picker swatches not reflecting restored saved values after page refresh.
- No breaking API changes.

## v1.0.2 - 2026-03-03

Release focused on stability, polish, and workflow separation.

### Highlights
- Added dev/prod workflow split:
  - `index-dev.html` + `playvsl.dev.js` for safe testing
  - production snippets default to stable versioned build
- FAQ improvements (updated examples, ordering, payload explanations).
- Resume/restart modal reliability fixes in embedded environments.
- Reduced black-screen flashes around teaser/resume/restart transitions.
- Poster quality standardized to `maxresdefault`.
- Stable minified build published as `playvsl.v1.0.2.min.js`.

## v1.0.1 - 2026-03-03

Stability and UX polish release.

### Highlights
- Fixed resume/restart reliability in embedded environments (Bubble and similar).
- Separated human-start logic from teaser autoplay to avoid false resume detection.
- Reduced noisy localStorage writes (timestamp now updates only on real progress changes).
- Improved transition UX (reduced black flashes on teaser/restart/resume flows).
- Simplified poster strategy to use `hqdefault` thumbnail for faster, more predictable loading.
- Updated FAQ with full embed example, clearer parameter docs, payload semantics, and revised section order.
- Added minified distributions:
  - `playvsl.min.js`
  - `playvsl.v1.0.1.min.js`

## v1.0.0 - 2026-03-02

Stable baseline release of PlayVSL.

### Highlights
- Custom domain + production deployment on GitHub Pages.
- Landing page + snippet builder flow with unlock/lead gating.
- n8n lead webhook integration.
- PT/EN internationalization (UI + SEO metadata).
- Smart progress bar improvements.
- Resume/restart modal and first-play audio flow.
- CTA behavior improvements:
  - dual-purpose CTA in locked state (unlock flow)
  - configured link when builder is open
  - rounded-corners toggle in builder + snippet
- Progress bar moved below video area (no subtitle overlap).
- Endscreen behavior:
  - force 100% at completion
  - center replay button
  - hide YouTube frame on end to avoid suggested-videos UI
- Event/callback analytics layer:
  - `onEvent`, `onPlay`, `onPause`, `onProgress`, `onCTAView`, `onCTAClick`, `onComplete`, etc.
  - session/visitor context payload
- Builder UX:
  - real-time snippet updates for all fields
  - persist last builder settings in localStorage

