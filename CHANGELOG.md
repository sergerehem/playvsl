# Changelog

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

