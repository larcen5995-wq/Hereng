---
name: Sacred Breath
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede8'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#55423d'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#89726c'
  outline-variant: '#dcc1b9'
  surface-tint: '#9b4427'
  primary: '#5e1700'
  on-primary: '#ffffff'
  primary-container: '#7c2d12'
  on-primary-container: '#ff9b7b'
  inverse-primary: '#ffb59e'
  secondary: '#9b4500'
  on-secondary: '#ffffff'
  secondary-container: '#fd8a42'
  on-secondary-container: '#682c00'
  tertiary: '#263143'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c475a'
  on-tertiary-container: '#aab5cc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#7c2d12'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb68e'
  on-secondary-fixed: '#331200'
  on-secondary-fixed-variant: '#763300'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  reading-body:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  reading-body-mobile:
    fontFamily: Literata
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  verse-number:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-mobile: 20px
  margin-desktop: 120px
  gutter: 16px
  reading-max-width: 680px
  stack-gap: 24px
---

## Brand & Style

The design system is centered on **Classic & Sacred** aesthetics, designed to evoke a sense of reverence, history, and tranquility. The target audience seeks a digital space that feels less like a mobile app and more like a sanctuary. 

The style utilizes **Sophisticated Minimalism** with a **Tactile** influence. It prioritizes the "Parchment" feel—a physical metaphor for ancient manuscripts—to reduce eye strain during long-form reading. Visuals are grounded and steady, avoiding trendy animations in favor of soft, purposeful transitions that respect the user's meditative state.

## Colors

The palette is anchored in heritage and warmth.

- **Primary (Oxblood/Burgundy):** Used for key branding elements, active states, and emphasis. It provides a sense of weight and authority.
- **Secondary (Heritage Gold):** Reserved for focus elements, audio progress bars, and highlighting sacred text passages.
- **Neutral (Parchment):** The primary background color is an off-white `#F5F2ED`, which provides a softer contrast than pure white, mimicking high-quality paper.
- **Dark Mode:** Transitions to "Midnight Vellum." The background shifts to a deep charcoal, while text moves to a muted cream to maintain high readability without glare.

Use a 5% opacity of the Primary color for subtle row highlighting in lists or verse selections.

## Typography

Typography is the cornerstone of this design system. 

- **Headlines (EB Garamond):** Used for Book titles and Chapter headings. It provides a classical, editorial feel.
- **Body (Literata):** Specifically chosen for its exceptional screen readability in long-form text. The line height is intentionally generous (1.6x) to facilitate a calm reading pace.
- **Labels (Inter):** A functional sans-serif used for metadata, verse numbers, and navigation to provide a clear, modern contrast against the serif body text.

**Formatting Rules:**
- Red-letter text (words of Christ) should use a slightly desaturated version of the Primary color for readability.
- Poetry/Psalms should utilize indented margins and increased line spacing.

## Layout & Spacing

The layout follows a **Fixed-Width Content** philosophy for reading. Long-form text is constrained to a maximum width of `680px` regardless of screen size to ensure optimal line length (50-75 characters).

- **Margins:** Large, generous white space on the sides to focus the eye inward.
- **Rhythm:** Vertical rhythm is strictly based on the `reading-body` line height to ensure headers and text align across columns if used.
- **Mobile:** Margins compress to 20px, but the "Audio Bar" remains fixed at the bottom with a frosted glass effect to show content passing underneath.

## Elevation & Depth

To maintain the "Sacred" feel, we avoid heavy drop shadows that feel too "app-like."

- **Tonal Layers:** Depth is created by shifting background tones. The main reading surface is the lightest, while sidebars or menus are 2% darker/more saturated.
- **Soft Shadows:** If an element must float (like a "Play" button), use a very diffused, low-opacity shadow tinted with the Primary color `#7C2D12` rather than pure black.
- **Dividers:** Use extremely thin (1px) lines in a "Gold" or "Muted Clay" tone to separate sections, rather than using boxes or shadows.

## Shapes

The shape language is **Soft and Reserved**. 

- **Radius:** A standard `0.25rem` (4px) radius is used for buttons and cards. This provides a subtle modern touch without feeling overly bubbly or "friendly" like a social app.
- **Interactive Elements:** Play buttons and progress sliders may use a circular (Pill) shape to distinguish them from structural elements, emphasizing their touch-friendly nature.

## Components

- **Audio Playback Controller:** The primary interaction point for listening. Use custom, thin-stroke icons. The "Play/Pause" button is the only element that uses the Secondary Gold color for high visibility.
- **Verse Highlight:** When a user taps a verse, the background should transition to a soft, semi-transparent Gold (`#D97706` at 10% opacity) with a vertical gold line in the left margin.
- **Cards:** Used for "Daily Bread" or "Plan Progress." Cards should have a 1px border of `#E5E7EB` rather than a shadow.
- **Input Fields:** Search bars should be minimal, using a simple bottom border that darkens when focused, rather than a full box.
- **Navigation:** Use a bottom bar on mobile with labels. Icons should be "Outline" style when inactive and "Solid" Primary color when active.
- **Mini-Player:** A collapsed version of the player that persists at the bottom of the screen. It should use a subtle Backdrop Blur (Glassmorphism) to feel integrated into the parchment background.