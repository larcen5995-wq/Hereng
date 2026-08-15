---
name: Vocalize
colors:
  surface: '#121319'
  surface-dim: '#121319'
  surface-bright: '#393840'
  surface-container-lowest: '#0d0e14'
  surface-container-low: '#1b1b22'
  surface-container: '#1f1f26'
  surface-container-high: '#292930'
  surface-container-highest: '#34343b'
  on-surface: '#e4e1eb'
  on-surface-variant: '#c6c5d5'
  inverse-surface: '#e4e1eb'
  inverse-on-surface: '#303037'
  outline: '#908f9e'
  outline-variant: '#454653'
  surface-tint: '#bdc2ff'
  primary: '#bdc2ff'
  on-primary: '#131e8c'
  primary-container: '#818cf8'
  on-primary-container: '#101b8a'
  inverse-primary: '#4953bc'
  secondary: '#ddb8ff'
  on-secondary: '#490081'
  secondary-container: '#62259b'
  on-secondary-container: '#d1a1ff'
  tertiary: '#f7bd3e'
  on-tertiary: '#402d00'
  tertiary-container: '#c08d00'
  on-tertiary-container: '#3e2b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000767'
  on-primary-fixed-variant: '#2f3aa3'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb8ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#62259b'
  tertiary-fixed: '#ffdea3'
  tertiary-fixed-dim: '#f7bd3e'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4200'
  background: '#121319'
  on-background: '#e4e1eb'
  surface-variant: '#34343b'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for a high-performance audio and vocal processing platform. It balances a **Modern / Corporate** structure with a **Vaporwave-inflected** aesthetic in its dark modes. The interface must feel immersive, precise, and technologically advanced. It utilizes high-contrast accents against deep backgrounds to guide the user's focus toward critical audio controls and data visualizations. The overall atmosphere is cinematic and focused, transitioning from a late-night studio vibe in its "Deep Midnight" mode to a clean, architectural professional tool in "Pure White."

## Colors
The color strategy employs a "Tri-Mode" logic to ensure accessibility and environmental comfort.

- **Deep Midnight:** The primary aesthetic. Use `#10131c` for the base. Accents are neon-weighted indigo and purple to simulate luminous hardware interfaces.
- **Slate Gray:** A reduced-contrast alternative. Surfaces use cool grays to prevent eye fatigue during long sessions.
- **Pure White:** A high-clarity daylight mode. Indigo accents become bolder and darker to maintain AA/AAA contrast ratios against white backgrounds.

In all modes, the **Primary Color** is reserved for main actions and active states, while the **Secondary Color** is used for creative flourishes, status indicators, or secondary data sets.

## Typography
The design system exclusively uses **Outfit**. As a geometric sans-serif, it provides the "tech-forward" clarity required for a digital audio workstation (DAW) style interface.

- **Headlines:** Use Bold or Semi-Bold weights with slight negative letter-spacing to create a tight, professional appearance.
- **Body:** Regular weight at 16px is the standard for legibility.
- **Labels:** Small labels use Semi-Bold weight and all-caps transformation with increased tracking to differentiate functional UI metadata from content.

## Layout & Spacing
The design system utilizes an **8px linear scale** to ensure mathematical harmony across all components.

- **Grid:** A 12-column fluid grid is used for desktop layouts with a maximum container width of 1440px. 
- **Gutters:** 24px fixed gutters maintain breathing room between complex audio modules.
- **Margins:** Desktop margins are set to 40px; mobile scales down to 16px.
- **Logic:** Components should use `md` (16px) for internal padding and `lg` (24px) for spacing between distinct functional groups.

## Elevation & Depth
Depth is communicated differently across color modes:

- **Midnight & Slate Modes:** Use **Tonal Layers**. Elevation is shown by making the surface color lighter (closer to the light source). Shadows should be avoided or kept extremely subtle with a primary-tinted glow (`#818cf8` at 10% opacity) rather than black.
- **Pure White Mode:** Use **Ambient Shadows**. Objects are elevated using soft, diffused shadows (Y: 4px, Blur: 12px, Opacity: 5%). Surfaces are separated by subtle `#e2e8f0` borders.
- **Glassmorphism:** Use sparingly for floating overlays (modals or popovers). Apply a 12px backdrop-blur and a thin 1px white border at 10% opacity.

## Shapes
The shape language is consistent across all modes, emphasizing a **Rounded** (8px) base. 

- **Standard Elements:** Buttons, input fields, and small cards use the base 8px (`0.5rem`) radius.
- **Large Containers:** Dashboard widgets and main content areas use 16px (`1rem`).
- **Interactive Logic:** Active states for selection indicators (like radio active pills) may use a full-pill radius to distinguish them from structural containers.

## Components
- **Buttons:** 
  - *Primary:* Solid fill with the mode's primary color. Text is white or high-contrast slate.
  - *Secondary:* Outlined with a 1.5px border in the primary color.
- **Input Fields:** 
  - Dark Modes: Deep background (`#1a1e2e`) with a 1px border that glows when focused.
  - White Mode: White background with a soft gray border.
- **Cards:** Use "Surface" tokens from the color section. In dark modes, cards have no shadows; in light mode, they feature a soft ambient shadow.
- **Chips:** Small, 8px rounded capsules used for tagging audio genres or file types. Use secondary color at 15% opacity for the background and 100% opacity for the text.
- **Lists:** Clean rows separated by a 1px line in the "border" token color. Use a 4px left-accent bar in the primary color for "Active" or "Selected" list items.
- **Knobs & Sliders:** Specific to this design system's audio focus, sliders should use a thick track and a large 20px circular handle to facilitate easy touch and mouse interaction.