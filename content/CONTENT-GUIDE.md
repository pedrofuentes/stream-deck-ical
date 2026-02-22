# Marketplace Content Guide — Stream Deck iCal Plugin

This guide is for AI agents and contributors who maintain the Elgato Marketplace listing content for this plugin.

## Directory Structure

```
content/
├── CONTENT-GUIDE.md          ← This file (agent instructions)
├── description.md            ← Plugin description (source of truth)
├── release-notes.md          ← Release notes per version (source of truth)
├── marketplace-content.html  ← Copy-paste ready HTML for WYSIWYG editor
└── assets/
    ├── icon.svg              ← 288×288 plugin icon (source)
    ├── icon.png              ← Generated from SVG
    ├── thumbnail.svg         ← 1920×960 hero image (source)
    ├── thumbnail.png         ← Generated from SVG
    ├── gallery-1-actions.svg ← 1920×960 all actions overview (source)
    ├── gallery-1-actions.png ← Generated from SVG
    ├── gallery-2-setup.svg   ← 1920×960 setup flow (source)
    ├── gallery-2-setup.png   ← Generated from SVG
    ├── gallery-3-states.svg  ← 1920×960 key states (source)
    ├── gallery-3-states.png  ← Generated from SVG
    ├── gallery-4-*.svg       ← 1920×960 additional feature (source)
    └── gallery-4-*.png       ← Generated from SVG
```

## Source of Truth

| Content type | Source of truth | Format |
|---|---|---|
| Text (description) | `content/description.md` | Markdown |
| Text (release notes) | `content/release-notes.md` | Markdown |
| Copy-paste HTML | `content/marketplace-content.html` | HTML (manually synced from .md files) |
| Images | `content/assets/*.svg` | SVG → PNG via script |

**Rules:**
- Edit the `.md` files first, then update the HTML file to match.
- Edit `.svg` files first, then run `npm run content:assets` to regenerate PNGs.
- Never edit PNGs directly — they are generated artifacts.

---

## Elgato Marketplace Asset Requirements

| Asset | Format | Max Size | Dimensions | Aspect Ratio | Required |
|-------|--------|----------|------------|--------------|----------|
| **Icon** | PNG or JPG | 2 MB | 288 × 288 | 1:1 | Yes |
| **Thumbnail** | PNG or JPG | 5 MB | 1920 × 960 | 2:1 | Yes |
| **Gallery images** | PNG or JPG | 10 MB each | 1920 × 960 | 2:1 | Min 3 |
| **Gallery video** | MP4 | 50 MB | 1920 × 1080 | 16:9 | Optional |
| **Description** | Plain text / formatted | — | — | — | Yes, max 4,000 chars |
| **Release Notes** | Plain text / formatted | — | — | — | Yes, max 1,500 chars per version |

---

## When to Update Each Asset

### Every Release
- `content/release-notes.md` — Add new version entry
- `content/marketplace-content.html` — Update the release notes tabs
- `content/description.md` — Review; update if features changed

### Only When Actions/Display Changes
- `content/assets/gallery-*.svg` — Update when key visuals change
- `content/assets/thumbnail.svg` — Update when actions are added/removed
- `content/assets/icon.svg` — Rarely changes (only for major rebrands)

### After Any Asset SVG Change
- Run `npm run content:assets` to regenerate PNGs

---

## How to Write Release Notes

### Template

```markdown
## vX.Y.Z — YYYY-MM-DD

Brief one-line summary of the release theme.

- Feature or change description (user-facing language)
- Another change
- Bug fix description

<!-- chars: ~NNN -->
```

### Rules
- **Most recent version first**
- Only **user-facing changes** — skip internal refactors, test changes, docs-only changes
- Use plain language: "Added support for..." not "feat: implement..."
- Include character count comment (max 1,500 per entry)
- Keep each entry self-contained — readers see one version at a time in the marketplace

### What to Include
- New features and actions
- Changed behavior
- Fixed bugs users would notice
- Removed features

### What to Exclude
- Internal refactoring
- Test additions/changes
- Documentation-only changes
- Dependency updates (unless they fix a user-visible issue)

---

## How to Update the Description

### Rules
- Max **4,000 characters** (hard limit — the portal will reject more)
- Include character count metadata at top of `description.md`
- Marketing tone — highlight value, not implementation
- Structure: Headline → Summary → Actions → Features → Requirements → Getting Started

### When Adding a New Action
1. Add it to the "Actions" section in `description.md`
2. Update the count ("three powerful actions" → "four powerful actions")
3. Update the HTML file to match
4. Consider updating gallery-1 SVG to show the new action

### When Adding a New Feature
1. Add it to the appropriate section in `description.md`
2. Update the HTML file to match
3. Consider whether gallery images need updating

---

## How to Regenerate PNGs from SVGs

```powershell
npm run content:assets
```

This runs `scripts/convert-content-assets.ts` which:
1. Reads all `.svg` files from `content/assets/`
2. Converts each to PNG at native viewBox dimensions using `@resvg/resvg-js`
3. Logs filename, dimensions, and file size
4. Outputs PNGs alongside the SVGs

After running, verify:
- Icon PNG ≤ 2 MB
- Thumbnail PNG ≤ 5 MB
- Gallery PNGs ≤ 10 MB each

---

## How to Update the HTML Copy-Paste File

The Elgato Marketplace uses a WYSIWYG editor that doesn't accept Markdown. The HTML file provides formatted content that can be copied and pasted directly.

### Steps
1. Update the source `.md` file first
2. Open `content/marketplace-content.html`
3. Find the corresponding section
4. Update the HTML to match the Markdown content
5. Preserve formatting: `<strong>` for bold, `<ul>/<li>` for lists, `<h3>` for headings
6. Test by opening in a browser — verify character counts are within limits

### Copy-Paste Workflow (for the user)
1. Open `content/marketplace-content.html` in a browser
2. Click inside the white content box for Description or the desired Release Notes tab
3. Select all text in the box (Ctrl+A while focused in the box)
4. Copy (Ctrl+C)
5. Paste into the Elgato Marketplace WYSIWYG editor (Ctrl+V)
6. Verify formatting preserved (bold, lists, headings)

---

## Visual Design Language

### Colors
| Role | Color | Usage |
|------|-------|-------|
| Background dark | `#0d1117` | SVG backgrounds (dark end) |
| Background mid | `#161b22` | SVG backgrounds (light end) |
| Surface | `#1c2128` | Card/panel backgrounds |
| Border | `#30363d` | Subtle borders |
| Text primary | `#ffffff` | Headings, key text |
| Text secondary | `#9ca3af` | Descriptions, labels |
| Accent green | `#22c55e` | OK/normal state, features |
| Accent orange | `#f97316` | Warning state (approaching meeting) |
| Accent red | `#ef4444` | Urgent state (imminent meeting) |
| Accent blue | `#3b82f6` | Links, info, time displays |
| Key background | `#000000` | Stream Deck key face |

### Key Mockup Style
- Black square with slightly rounded corners (4px radius at key scale)
- Top accent bar: 2px colored line at top of key (green = normal, orange = warning, red = urgent)
- White text centered, small font
- Simulates the actual Stream Deck OLED key appearance

### SVG Layout Patterns
- **Thumbnail**: Plugin name large left, tagline below, key mockups right, feature strip at bottom
- **Gallery — Actions**: Simulated Stream Deck grid with all action keys populated
- **Gallery — Setup**: Three-step flow with numbered circles and UI mockups
- **Gallery — States**: Side-by-side key states showing color transitions

### Fonts
- Use `system-ui, -apple-system, sans-serif` in SVGs for maximum compatibility
- The resvg renderer will use system fonts — no custom fonts needed

---

## Release Workflow Checklist

When releasing a new version, add these steps after the GitHub Release:

1. [ ] Write release notes in `content/release-notes.md`
2. [ ] Review `content/description.md` — update if features changed
3. [ ] Update `content/marketplace-content.html` with matching HTML
4. [ ] Update gallery SVGs in `content/assets/` if key display changed
5. [ ] Run `npm run content:assets` to regenerate PNGs
6. [ ] Commit content changes with the version bump
7. [ ] After GitHub Release: open HTML in browser → copy → paste into Elgato Marketplace WYSIWYG
8. [ ] After GitHub Release: upload new asset PNGs if changed

---

## Elgato Marketplace Upload Procedure

1. Go to the [Elgato Developer Portal](https://developer.elgato.com/)
2. Sign in and navigate to your plugin listing
3. **Description tab**:
   - Open `content/marketplace-content.html` in your browser
   - Copy the Description content from the white box
   - Paste into the WYSIWYG Description field
   - Verify character count ≤ 4,000
4. **What's New tab**:
   - Copy the latest version's release notes from the HTML file
   - Paste into the WYSIWYG Release Notes field
   - Verify character count ≤ 1,500
5. **Assets tab**:
   - Upload `content/assets/icon.png` as the Icon (288×288, ≤ 2 MB)
   - Upload `content/assets/thumbnail.png` as the Thumbnail (1920×960, ≤ 5 MB)
   - Upload `content/assets/gallery-*.png` files as Gallery images (1920×960, ≤ 10 MB each)
   - Ensure at least 3 gallery images
6. **Upload** the `.streamDeckPlugin` package file
7. **Submit** for review

---

## FAQ for Agents

### Q: Why is there both a Markdown file and an HTML file for text content?
The Elgato Marketplace WYSIWYG editor doesn't accept Markdown. Markdown is the source of truth for easy editing. The HTML file is the delivery format for copy-pasting into the editor.

### Q: Why copy-paste instead of direct HTML upload?
The Elgato portal doesn't accept raw HTML — it uses a WYSIWYG text editor. Copy-paste from a rendered HTML page preserves formatting (bold, lists, headings).

### Q: How do I know if the character count is correct?
The HTML file includes live JavaScript character counters. Open it in a browser to see current counts. The metadata at the top of each `.md` file also tracks this.

### Q: Can I use the Cloudflare logo, Elgato logo, or other brand logos?
**No.** Use only original artwork. No copyrighted logos or third-party brand marks.

### Q: The PNG is too large. What do I do?
Simplify the SVG (remove gradients, reduce detail, use fewer elements). The resvg conversion is lossless PNG — complex SVGs produce large files.

### Q: Do I need to update all gallery images every release?
No. Only update gallery images when the visual appearance of keys or UI changes. Text-only features don't require gallery updates.

### Q: What's the minimum number of gallery images?
Three (3). The Elgato Marketplace requires at least 3 gallery images.
