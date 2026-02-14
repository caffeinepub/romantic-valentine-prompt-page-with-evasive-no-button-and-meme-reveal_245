# Specification

## Summary
**Goal:** Make the success/result screen reliably load and display the intended static image asset across browsers, including when the filename contains spaces.

**Planned changes:**
- Update the success/result view’s `<img>` `src` to reference the exact case-sensitive file `/assets/generated/Kanni 14.PNG` using a URL-encoded path (space encoded as `%20`).
- Add runtime image load error handling so that if the image fails to load, the UI shows a clear English fallback message while keeping the rest of the success layout intact.
- Ensure the success image exists in the deployable public assets at `frontend/public/assets/generated/Kanni 14.PNG` exactly, and remove/avoid any success-screen references to similarly named variants (e.g., `kanni 14.PNG`, `kanni 14-1.PNG`, `kanni 14-2.PNG`).

**User-visible outcome:** After clicking “Yes”, the success screen reliably shows the intended image in Chrome and Safari (desktop and mobile) without needing a manual refresh; if the image can’t be loaded, a clear English message is shown instead without breaking the layout.
