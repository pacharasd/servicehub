---
name: ServiceHub — ระบบงานบริการสาธารณะ เทศบาลนครนนทบุรี
description: ระบบบันทึกและติดตามผลการปฏิบัติงานบริการสาธารณะ สำนักสาธารณสุขและสิ่งแวดล้อม เทศบาลนครนนทบุรี
colors:
  primary: "#0F766E"
  primary-dark: "#115E59"
  primary-soft: "#E4F4F1"
  rail-dark: "#0F2926"
  rail-border: "#1F423D"
  rail-accent: "#2DD4BF"
  corridor-cleaning: "#0F766E"
  corridor-waste: "#B45309"
  corridor-sanitation: "#1D4ED8"
  corridor-projects: "#4338CA"
  surface: "#F6F5F1"
  surface-raised: "#FFFFFF"
  surface-muted: "#ECEEE9"
  ink: "#16313A"
  ink-muted: "#52676B"
  line: "#D8DDD8"
  line-strong: "#B9C2BC"
  success: "#166534"
  warning: "#92400E"
  danger: "#B91C1C"
  info: "#075985"
typography:
  display:
    fontFamily: "'LINE Seed Sans TH', 'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.35rem + 0.9vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0em"
  headline:
    fontFamily: "'LINE Seed Sans TH', 'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0em"
  title:
    fontFamily: "'LINE Seed Sans TH', 'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0em"
  body:
    fontFamily: "'LINE Seed Sans TH', 'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "'LINE Seed Sans TH', 'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0em"
  kpi:
    fontFamily: "'LINE Seed Sans TH', 'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
    fontFeature: "'tnum' 1"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-raised}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.surface-raised}"
    rounded: "{rounded.md}"
  button-outlined:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "44px"
  card-ledger:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px"
  input-field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "44px"
---

# Design System: ServiceHub — ระบบงานบริการสาธารณะ เทศบาลนครนนทบุรี

## Overview

**Creative North Star: "Civic Infrastructure Ledger (ทะเบียนสาธารณูปโภคและสมุดตรวจการเทศบาล)"**

ServiceHub is an internal operational ledger for the Bureau of Public Health and Environment, Nonthaburi City Municipality. Its design treats municipal sanitation, waste collection, drain cleaning, and environmental inspection data as authoritative public records rather than consumer marketing metrics. Surfaces are structured around visible `1px` hairline rules (`#D8DDD8`), warm stone ledger paper (`#F6F5F1`), a dark cypress navigation spine (`#0F2926`), and color-coded operational corridors that distinguish the four municipal service divisions at a glance.

Rather than floating cards in soft drop shadows, the interface joins related metrics into unified hairline ledger bars (`gap-px bg-line border border-line`) and anchors each service group with an index-tab top rule (`border-t-[3px]`) or left spine rule (`border-l-[3px]`). Every Thai typographic role is engineered with generous vertical line-height (`1.35` to `1.65`) so upper and lower vowel/tone marks (`วรรณยุกต์และสระบน-ล่าง`) never clip inside tables, buttons, or inputs, and every numeric metric uses `font-variant-numeric: tabular-nums` with explicit Thai physical units (`กก.`, `ลบ.ม.`, `กม.`, `เมตร`, `ครั้ง`, `ราย`, `แห่ง`).

The visual system explicitly rejects generic AI SaaS clichés: there are no uppercase eyebrow kickers above headings, no gradient text or gradient hero banners, no diffuse colored drop shadows on buttons, no decorative icon circles in KPI cards, and no bounce animations.

**Key Characteristics:**
- **Structural Hairline Grid:** Related KPI cells and summary strips share a unified `1px` border grid (`#D8DDD8`) rather than floating as isolated cards.
- **Dark Cypress Index Spine:** A high-contrast `#0F2926` sidebar rail with a `3px` inset `#2DD4BF` active indicator anchors the application shell.
- **Four-Corridor Wayfinding:** Every service group and module carries a dedicated corridor accent—Cleaning (`#0F766E`), Waste (`#B45309`), Sanitation (`#1D4ED8`), and Projects (`#4338CA`).
- **Thai-First Editorial Utility:** Zero letter-spacing (`letter-spacing: 0`), protected vowel clearance, Buddhist Era (`พ.ศ.`) dates, and tabular numerals paired with explicit units.

## Colors

The palette pairs warm archival stone paper and deep municipal cypress with four high-contrast corridor accents that meet WCAG 2.2 AA contrast thresholds against their respective backgrounds.

### Primary
- **Municipal Cypress Teal** (`#0F766E`): Primary interactive accent, primary action buttons, active links, and the Cleaning corridor identifier.
- **Deep Cypress Teal** (`#115E59`): Hover and active state for primary buttons and high-emphasis interactive controls.
- **Soft Cypress Wash** (`#E4F4F1`): Subtle selection tint and focus-ring halo background.
- **Dark Cypress Ledger Spine** (`#0F2926`): Dedicated background for the persistent left navigation rail and login index panel.
- **Luminous Teal Indicator** (`#2DD4BF`): Active navigation bar indicator (`inset 3px 0`) and focus highlight on dark cypress surfaces.

### Secondary
- **Waste Corridor Ochre** (`#B45309`): Top/left index rule and badge accent for Group 2 (`งานจัดการมูลฝอย`: general waste, infectious waste, hazardous waste).
- **Sanitation Corridor Cobalt** (`#1D4ED8`): Top/left index rule and badge accent for Group 3 (`งานสุขาภิบาล`: septic disposal, septic treatment, public restrooms).

### Tertiary
- **Projects Corridor Indigo** (`#4338CA`): Top/left index rule and badge accent for Group 4 (`งานโครงการและสิ่งแวดล้อม`: pollution complaints).
- **Semantic Status Tokens:** Success Forest (`#166534`), Warning Amber (`#92400E`), Danger Crimson (`#B91C1C`), and Info Slate Blue (`#075985`) for validation, filter banners, and RBAC status pills.

### Neutral
- **Warm Stone Ledger Ground** (`#F6F5F1`): Primary canvas background across `.app-shell` and authentication screens, reducing glare during extended data entry.
- **Crisp Ledger Sheet** (`#FFFFFF`): Elevated surface for data tables, form sheets, filter bars, and individual ledger cells.
- **Muted Stone Well** (`#ECEEE9`): Table header background (`thead`), inactive tab wells, and secondary metric strips.
- **Deep Slate Ink** (`#16313A`): Primary body copy, headings, and tabular numerals (`13.3:1` contrast on `#FFFFFF`).
- **Muted Slate Ink** (`#52676B`): Secondary labels, timestamps, and unit suffixes (`5.9:1` contrast on `#FFFFFF`).
- **Structural Hairline** (`#D8DDD8`): Default `1px` border and cell divider across all ledger grids, cards, and tables.
- **Strong Structural Line** (`#B9C2BC`): Emphasized border for form inputs and hovered interactive containers.

### Named Rules
**The Four-Corridor Coding Rule.** Every module card, department summary, and activity log row must display its assigned corridor color (`#0F766E` Cleaning, `#B45309` Waste, `#1D4ED8` Sanitation, `#4338CA` Projects) via a `3px` structural border or compact dot indicator—never as a full-card background fill.

**The Dark Spine Contrast Rule.** Dark cypress (`#0F2926`) is reserved exclusively for the navigation spine and authentication index panel; content workspaces remain light (`#F6F5F1` / `#FFFFFF`) to preserve daytime legibility and print fidelity.

## Typography

**Display Font:** `LINE Seed Sans TH` (with calibrated `LINE Seed Sans TH Fallback`, `Sarabun`, `Noto Sans Thai`, `system-ui`, `sans-serif`)
**Body Font:** `LINE Seed Sans TH` (Regular `400` and Bold `700` WOFF2 self-hosted)
**Label/Mono Font:** `LINE Seed Sans TH` with `font-variant-numeric: tabular-nums` (`'tnum' 1`)

**Character:** Clean, modern geometric Thai-Latin sans-serif with open counters and unmistakable weight separation between Regular (`400`) and Bold (`700`), engineered for dense municipal tables and multi-column forms.

### Hierarchy
- **Display / Page Title (`.type-page-title`)** (`700`, `clamp(1.625rem, 1.35rem + 0.9vw, 2rem)`, `line-height: 1.35`): Primary `<h1>` page header anchored by a bottom hairline divider.
- **Headline / Section Title (`.type-section-title`)** (`700`, `1.375rem` / `22px`, `line-height: 1.4`): Major section headings (`<h2>`) separating ledger bands.
- **Title / Card Title (`.type-card-title`)** (`700`, `1.125rem` / `18px`, `line-height: 1.45`): Module card titles (`<h3>`) and dialog titles.
- **Body (`.type-body`)** (`400`, `1rem` / `16px`, `line-height: 1.65`): Default prose, form input text, and table cell descriptions (`max-width: 68ch` for help text).
- **Label / Table Header (`.type-form-label`, `.type-table-header`)** (`700`, `0.875rem` / `14px`, `line-height: 1.5`, `letter-spacing: 0`): Form field labels, table column headers, and primary action buttons.
- **KPI Value (`.type-kpi`)** (`700`, `clamp(1.5rem, 1.25rem + 0.8vw, 1.875rem)`, `line-height: 1.2`, `tabular-nums`): Primary numeric readouts inside ledger cells.

### Named Rules
**The Thai Vowel Clearance Rule.** Never apply tight line-height (`< 1.35` on headings or `< 1.5` on labels/controls), negative letter-spacing, or `uppercase` transforms to Thai text; upper and lower tone marks (`่ ้ ๊ ๋ ั ิ ี ึ ื ุ ู`) must remain unclipped in every state.

**The No-Kicker Rule.** Page headings (`<h1>`) and section headings (`<h2>`) stand on their own hierarchy and bottom hairline rule (`border-b border-line pb-4`); never place a small muted eyebrow/kicker label above a heading.

**The Explicit Unit Rule.** Every tabular number (`tabular-nums`) must be accompanied by its explicit Thai unit (`กก.`, `ลบ.ม.`, `กม.`, `เมตร`, `ครั้ง`, `ราย`, `แห่ง`) in `.type-unit` (`0.75rem`, `#52676B`).

## Layout

ServiceHub uses a fixed-rail + fluid-ledger spatial architecture designed for desktop data entry (`1024px+`) with responsive drawer adaptation below `1024px`:
- **Navigation Rail (`#sidebar`):** `296px` fixed width on desktop (`72px` when collapsed via `data-collapsed="true"`), pinned to the left edge with independent vertical scrolling.
- **Top Utility Bar:** `64px` (`h-16`) sticky header (`bg-white border-b border-line`) housing the breadcrumb/page context, active user role, and profile menu.
- **Main Workspace (`#main-content`):** Fluid container (`max-w-[1440px] mx-auto px-4 py-6 sm:px-6 lg:px-8`) organized into vertical bands separated by `24px` (`space-y-6`).
- **Hairline Ledger Grids:** Summary KPI strips use `grid gap-px bg-line border border-line rounded-md overflow-hidden` so adjacent white cells (`bg-white p-5`) share a single `1px` divider instead of double borders and outer margins.
- **Print Layout (`@media print`):** Collapses the navigation rail, topbar, and interactive filter controls into an A4 landscape (`@page { size: A4 landscape; margin: 10mm; }`) document with solid `#94a3b8` table borders.

## Elevation & Depth

ServiceHub is **flat and structural by default**. Depth is communicated through surface tone contrast (`#0F2926` dark cypress rail -> `#F6F5F1` stone paper ground -> `#FFFFFF` ledger sheet -> `#ECEEE9` muted header well) and crisp `1px` hairline borders (`#D8DDD8`), never through ambient drop shadows on resting cards.

### Shadow Vocabulary
- **Resting Ledger Surface (`.panel-shadow`)** (`box-shadow: none`): Cards, tables, and KPI grids use `1px solid #D8DDD8` with zero drop shadow.
- **Floating Popover / Dropdown** (`box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08)`): Reserved strictly for transient overlays that physically overlap document content (user menu dropdown, Thai Buddhist calendar popover, modal dialogs).
- **Active Rail Inset** (`box-shadow: inset 3px 0 0 #2DD4BF`): Marks the active navigation route inside the dark cypress sidebar.

### Named Rules
**The Single-Elevation Rule.** Resting containers define their boundary with a `1px solid #D8DDD8` hairline border and `box-shadow: none`. Never combine a `1px` border with a soft drop shadow on cards, KPI cells, or buttons.

## Shapes

The form language is **crisp, squared-off editorial utility**:
- **Standard Container & Control Radius (`6px` / `rounded-md`):** Applied uniformly across ledger grids, module cards, buttons, inputs, selects, and dropdown menus inside `.app-shell`.
- **Compact Badge & Tag Radius (`4px` / `rounded`):** Used for RBAC role badges, record counts, and status tags.
- **Index-Tab Corridor Rules (`3px` solid):** Group cards on the dashboard use a `3px` top border (`border-t-[3px]`) in their corridor accent color; individual module cards use a `3px` left spine (`border-l-[3px]`).
- **No Pill Buttons or Pill Cards:** Full-pill geometry (`9999px`) is restricted to tiny `8px` status dots.

## Components

### Buttons
All interactive buttons enforce a minimum `44px` (`min-h-11`) touch/click target and `150ms` cubic-bezier transitions.
- **Shape:** Crisp `6px` corners (`rounded-md`), no drop shadow.
- **Primary (`.primaryButton`):** Solid Municipal Cypress Teal (`#0F766E`) background, white (`#FFFFFF`) bold `14px` text (`type-primary-action`), `padding: 10px 16px`.
- **Hover / Focus:** Hover shifts background to Deep Cypress (`#115E59`); keyboard `:focus-visible` renders a `2px solid #0F766E` outline with `2px` offset.
- **Outlined / Secondary (`.outlinedButton`):** White (`#FFFFFF`) background, `1px solid #D8DDD8` border, `#16313A` text; hover shifts border to `#0F766E` and background to `#F6F5F1`.

### Chips & Status Badges
- **Style:** Rectangular `4px` radius (`rounded`) with `1px` border and solid high-contrast text (`12px` bold).
- **State:** Role and status badges pair semantic text colors (`#166534`, `#92400E`, `#B91C1C`, `#075985`) with subtle tinted grounds (`#F0FDF4`, `#FFFBEB`, `#FEF2F2`, `#F0F9FF`).

### Cards / Ledger Containers
- **Corner Style:** `6px` (`rounded-md`).
- **Background:** `#FFFFFF` on `#F6F5F1` workspace ground.
- **Shadow Strategy:** None (`box-shadow: none`); separated by `1px solid #D8DDD8`.
- **Border:** `1px solid #D8DDD8`, augmented by a `3px` corridor accent rule (`border-t-[3px]` for group cards, `border-l-[3px]` for module cards).
- **Internal Padding:** `20px` (`p-5`) for ledger cells and cards; `16px 20px` for card headers.

### Inputs & Thai Calendar Fields
- **Style:** `44px` height (`min-h-11`), `#FFFFFF` background, `1px solid #D8DDD8` border, `6px` radius (`rounded-md`), `16px` (`1rem`) text size to prevent mobile zoom and protect Thai vowel marks.
- **Focus:** `2px solid #0F766E` focus outline (`outline-offset: 2px`) and `#0F766E` border.
- **Error / Disabled:** Validation errors switch the border to `#B91C1C` and bind an inline `#B91C1C` message via `aria-describedby`.

### Navigation (`#sidebar`)
- **Style:** Committed Dark Cypress (`#0F2926`) vertical spine with `#1F423D` structural dividers and white/slate typography.
- **States:** Default links use `#CBD5E1` text with `#163834` hover fill; the active route (`[aria-current="page"]`) uses `#163834` background, `#FFFFFF` bold text, and `box-shadow: inset 3px 0 0 #2DD4BF`.
- **Responsive / Collapse:** Collapses to a `72px` icon rail on desktop when toggled (`#sidebar-collapse-btn`) and transforms into a slide-over drawer (`#sidebar-backdrop`) below `1024px`.

### Signature Component: Hairline Ledger KPI Bar (`[aria-label="ยอดรวม"]`)
- **Description:** Replaces floating KPI cards with a unified multi-column hairline ledger (`grid gap-px bg-line border border-line rounded-md overflow-hidden`). Each cell (`bg-white p-5`) presents the Thai metric label at top, the tabular numeral (`.type-kpi`) paired inline with its unit (`รายการ`, `ประเภทงาน`), and a `1px` top-bordered footnote strip (`border-t border-line/70`) showing secondary operational context.

## Do's and Don'ts

### Do:
- **Do** join adjacent KPI and summary metrics into unified `1px` hairline ledger grids (`gap-px bg-line border border-line rounded-md overflow-hidden`).
- **Do** mark every service group and module with its assigned corridor color (`#0F766E` Cleaning, `#B45309` Waste, `#1D4ED8` Sanitation, `#4338CA` Projects) using a `3px` top or left index rule.
- **Do** use `font-variant-numeric: tabular-nums` on every number and always display explicit Thai units (`กก.`, `ลบ.ม.`, `กม.`, `เมตร`, `ครั้ง`, `ราย`, `แห่ง`).
- **Do** preserve `min-h-11` (`44px`) minimum height on all buttons, inputs, selects, and navigation items.
- **Do** format all user-facing dates in Thai Buddhist Era (`พ.ศ.`) while transmitting ISO `YYYY-MM-DD` to backend APIs.

### Don't:
- **Don't** place small muted eyebrow/kicker labels above `<h1>` or `<h2>` headings.
- **Don't** combine a `1px` border with a soft ambient drop shadow on cards, KPI containers, or buttons.
- **Don't** use decorative icon circles inside KPI summary cells; let the tabular typography and hairline structure carry the hierarchy.
- **Don't** apply `uppercase`, negative letter-spacing, or `line-height < 1.35` to Thai text.
- **Don't** use gradient text, gradient hero banners, or bounce/elastic animations anywhere in the interface.
