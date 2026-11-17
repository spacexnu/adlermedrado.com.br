---
name: Parchment Terminal
colors:
  surface: '#f8f9fd'
  surface-dim: '#d8dade'
  surface-bright: '#f8f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f8'
  surface-container: '#eceef2'
  surface-container-high: '#e7e8ec'
  surface-container-highest: '#e1e2e6'
  on-surface: '#191c1f'
  on-surface-variant: '#404942'
  inverse-surface: '#2e3134'
  inverse-on-surface: '#eff1f5'
  outline: '#707971'
  outline-variant: '#c0c9c0'
  surface-tint: '#2d6a48'
  primary: '#003820'
  on-primary: '#ffffff'
  primary-container: '#0f5132'
  on-primary-container: '#84c39b'
  inverse-primary: '#95d4ac'
  secondary: '#9b4500'
  on-secondary: '#ffffff'
  secondary-container: '#fd8a42'
  on-secondary-container: '#682c00'
  tertiary: '#003351'
  on-tertiary: '#ffffff'
  tertiary-container: '#004a74'
  on-tertiary-container: '#73bbf8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f1c7'
  primary-fixed-dim: '#95d4ac'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#0f5132'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb68e'
  on-secondary-fixed: '#331200'
  on-secondary-fixed-variant: '#763300'
  tertiary-fixed: '#cde5ff'
  tertiary-fixed-dim: '#94ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004b74'
  background: '#f8f9fd'
  on-background: '#191c1f'
  surface-variant: '#e1e2e6'
typography:
  display-lg:
    fontFamily: JetBrains Mono
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: '0'
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.08em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system synthesizes vintage teleprinter output, early computing paper terminals (DECwriter, teletype), and modern command-line minimalism. It deliberately rejects the cliché fluorescent-on-black terminal visual trope, instead honoring early system operator manuals, raw Unix punch-outs, and paper-fed console logs.

### Aesthetic Foundation
- **Tactile Paper meets Command Line:** Warm, fibrous paper groundings contrasted by carbon-ribbon typewriter and terminal precision.
- **Utilitarian Elegance:** Information is structured strictly by indentation, typographic hierarchy, ASCII framing, and disciplined vertical metrics rather than decorative ornamentation.
- **Intended Emotion:** Focus, intellectual authority, tactical speed, unyielding clarity, and retro-mechanical nostalgia without gimmickry.

## Colors

The palette simulates carbon-stamped ink over aged archival stock, with accents drawn from mechanical terminal phosphors, indicator lamps, and blueprint schematics.

### Roles & Tokens
- **Background Grounding:** Canvas background uses `#f5f2eb` (Raw Parchment), transitioning to `#eae5d9` (Manila Feed) for secondary panels and terminal containers.
- **Ink & Typography:** Primary text is `#1a1d20` (Carbon Black) for ultra-sharp legibility. Sub-labels, borders, and ASCII pipes utilize `#5c6370` (Muted Lead) and `#8f96a3` (Faded Stencil).
- **Primary Accent (`#0f5132` / `#007a3d`):** Vintage phosphor green, reserved for successful status, execution prompts (`$`, `>`), execution tags, and verified states.
- **Secondary Accent (`#b45309` / `#9a3412`):** Terminal amber and rust, reserved for warnings, root privileges, active cursors, and system warnings.
- **Tertiary Accent (`#0369a1`):** Cyan/slate punch, reserved for hyperlinks, system flags, structural headers, and metadata tags.
- **Surface Elevation:** Borders, box-drawing characters, and subtle hairline dividers utilize `#dcd7cc` and `#c8c2b3`. Never introduce saturated primary colors for full-bleed panel fills; use them solely as crisp line accents and ink glyphs.

## Typography

The entire typography stack is governed by **JetBrains Mono**, standardizing on monospace tabular metrics across every layer of the UI. This provides mathematical character alignment across tables, forms, logs, and layout trees.

### Usage Guidelines
- **Strict Grid Alignment:** All vertical rhythmic increments correlate directly to the line-height tokens (12px, 16px, 20px, 24px, 28px).
- **Unix Header Syntax:** Large titles are preceded by semantic shell markers (e.g., `#! /usr/bin/env` or `## [SECTION_ID]`).
- **Uppercase Labels:** System metrics, status pill tags, and table header keys must use `label-md` or `label-sm` set to uppercase with loose character spacing.
- **ASCII Glyphs:** Tree navigation nodes and branching lists must integrate explicit Unicode box-drawing characters (`├──`, `└──`, `│  `, `─`).

## Layout & Spacing

The layout model uses a strict tabular column system paired with terminal printouts. Spacing units adhere strictly to a 4px/8px rhythm to correspond cleanly with monospace text blocks.

### Breakpoints & Grids
- **Desktop (1024px+):** 12-column layout with 24px gutters, max-width bounded at 1280px or set fluid with fixed margin borders (40px). Columns resemble split terminal panes.
- **Tablet (768px – 1023px):** 8-column layout with 16px gutters and 24px canvas margins. Multi-column tree view splits into side-drawer panes.
- **Mobile (< 768px):** 4-column layout with 16px gutters and 16px canvas margins. Sidebar trees collapse into linear accordion sequences or stacked breadcrumbs.

### Layout Rules
- **Terminal Panes:** Panels are arranged in split shells using solid hairline borders (`1px solid #dcd7cc`).
- **Monospace Offsets:** Gaps between terminal labels and inline values should be fixed string spacers or `space-sm` increments.

## Elevation & Depth

This design system avoids soft blurry dropshadows, modern gaussian blurs, and neomorphic lighting. Depth is constructed strictly through paper layering, hairline rules, and high-contrast stepped borders.

### Elevation Principles
- **Tier 0 (Base Canvas):** Raw parchment (`#f5f2eb`) mimicking archival teleprinter feed stock.
- **Tier 1 (Panels & Shell Containers):** Flat, solid tint `#eae5d9` framed by a 1px solid rule (`#c8c2b3`).
- **Tier 2 (Popovers, Tooltips & Modals):** Background `#f5f2eb` bounded by a double hairline border or a high-contrast offset block shadow: `3px 3px 0px #1a1d20`. This creates a tactile, retro printed feel.
- **Interactive Focus & Hover:** Elements never float outward. Hovering an interactive surface either inverts colors (black ground, parchment ink) or draws an active terminal bracket (`[ ... ]`).

## Shapes

The roundedness level is strictly **0 (Sharp)** across all elements.

- **Zero Radius:** Buttons, inputs, modals, tags, tooltips, and containers feature crisp 90-degree corners.
- **Structural Integrity:** Curvature contradicts the technical monospace and paper-terminal aesthetic; all frames mimic cardstock edges or mechanical cathode/matrix print borders.
- **Cut Corner Accents (Optional):** When mechanical distinction is required, use 45-degree chamfered clips (`polygon`) instead of radius curves.

## Components

### Buttons
- **Primary:** Background `#0f5132`, text `#f5f2eb`, border `1px solid #0f5132`. On hover: background `#007a3d`. Content syntax wrapped in prompt notation: `[ RUN COMMAND ]`.
- **Secondary / Ghost:** Background `transparent`, text `#1a1d20`, border `1px solid #c8c2b3`. On hover: background `#eae5d9`, border color `#1a1d20`.
- **Destructive:** Background `transparent`, text `#9a3412`, border `1px solid #9a3412`. On hover: background `#9a3412`, text `#f5f2eb`.
- **Padding:** Vertical `0.5rem` (`space-sm`), horizontal `1rem` (`space-md`). All buttons carry zero radius.

### Input Fields & Terminal Consoles
- **Field Canvas:** `#eae5d9`, framed by `1px solid #c8c2b3`.
- **Prompt Prefix:** Dedicated monospace prompt prefix (`>`, `$`, or `#`) rendered in `#b45309`.
- **Focus State:** Border shifts to `1px solid #1a1d20` accompanied by a blinking block cursor (`▋` or CSS simulated box). No outer fuzzy focus rings.
- **Error State:** Border shifts to `1px solid #9a3412` accompanied by error output prepended with `ERR:`.

### Chips & Status Badges
- **Structure:** Monospace text encased in straight-corner bounding boxes or literal brackets: `[ ACTIVE ]`, `[ FAIL ]`.
- **Success Tag:** Border `1px solid #0f5132`, background `#0f513214`, text `#0f5132`.
- **Warning/Pending Tag:** Border `1px solid #b45309`, background `#b4530914`, text `#b45309`.
- **Info/Trace Tag:** Border `1px solid #0369a1`, background `#0369a114`, text `#0369a1`.

### Lists & ASCII Trees
- **Structure:** Monospace file-tree hierarchy.
- **Tree Branches:** Uses explicit characters:
  ```text
  ├── src/
  │   ├── kernel.sys
  │   └── terminal.conf
  └── root.sh
  ```
- **Active Row:** Active item indicated by inverse highlighting (`background: #1a1d20; color: #f5f2eb;`) or leading cursor `>`.

### Checkboxes & Radio Buttons
- **Checkboxes:** Monospace simulated brackets `[ ]` and `[x]`, or a `14px x 14px` square box with `0px` radius, `#eae5d9` surface, and `#1a1d20` solid fill with a crisp checkmark icon when selected.
- **Radio Buttons:** Rendered as `( )` and `(*)`, or crisp diamond glyphs `< >` to avoid standard circular bubbles.

### Cards & Panes
- **Window Headers:** Every card or panel contains a top status strip with title in `label-sm` uppercase, timestamp, and optional window toggles (`[—] [□] [×]`).
- **Body Canvas:** Background `#eae5d9`, border `1px solid #c8c2b3`.

### Terminal Dividers
- Hairlines constructed from either CSS `1px solid #dcd7cc` or repeating text characters: `----------------------------------------` or `========================================`.