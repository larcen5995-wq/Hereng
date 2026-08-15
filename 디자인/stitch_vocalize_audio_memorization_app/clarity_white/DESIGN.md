---
name: Clarity White
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system for Vocalize centers on hyper-legibility and cognitive ease. The brand personality is articulate, modern, and transparent. By merging **Minimalism** with subtle **Glassmorphism**, the UI achieves a "breathable" atmosphere that prioritizes content over container. 

The aesthetic is characterized by expansive white space, precise typography, and delicate translucent layers that suggest depth without the visual weight of traditional shadows. It targets an audience that values efficiency and high-fidelity communication, evoking a sense of calm, focused productivity.

## Colors
The palette is rooted in a "High-Contrast Light" philosophy. 
- **Primary & Secondary:** Deep Indigo (#4f46e5) and Vibrant Purple (#7c3aed) are used exclusively for interactive elements, status indicators, and brand moments to ensure a clear path for the eye.
- **Backgrounds:** The foundation is Pure White (#ffffff), utilizing Light Grey (#f8fafc) for sectional grouping and "sunken" UI surfaces.
- **Accents:** Feedback loops (success, error) should utilize highly saturated tones to remain legible against the bright backdrop.

## Typography
This design system utilizes a tiered typographic approach:
- **Headlines:** Hanken Grotesk provides a sharp, contemporary edge for all major titles.
- **Body:** Inter is used for all long-form content and UI labels to ensure maximum accessibility and neutral tone.
- **Technical/Labels:** JetBrains Mono is used sparingly for metadata, timestamps, or system status to provide a "technical" secondary accent that complements the vocal-to-text nature of the app.

All headlines above 32px must transition to their mobile-specific tokens on screens smaller than 768px.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a strict 4px baseline rhythm. 
- **Desktop:** 12-column grid with 64px outer margins.
- **Tablet:** 8-column grid with 32px outer margins.
- **Mobile:** 4-column grid with 16px outer margins.

Spacing is used to create visual grouping rather than lines. Elements within a card should use `md` (16px) spacing, while major section breaks should leverage `xl` (40px) to maintain the clean, "airy" brand feeling.

## Elevation & Depth
Depth is communicated through **Glassmorphism** and **Low-contrast outlines** rather than traditional dropshadows.
- **Level 0 (Base):** Pure White (#ffffff).
- **Level 1 (Cards/Containers):** Semi-transparent white (rgba(255, 255, 255, 0.7)) with a 12px backdrop blur and a 1px border (#e2e8f0).
- **Level 2 (Floating/Modals):** Same as Level 1 but with a very soft, diffused primary-tinted shadow (8% opacity of the primary color) to indicate interaction.
- **Overlays:** Use a 40% opacity white background blur for page-level modals to maintain the light-mode brilliance.

## Shapes
The shape language is consistently **Rounded**, reflecting the fluidity of voice and sound.
- **Standard UI Elements:** (Buttons, Inputs) use the 0.5rem base.
- **Large Containers:** (Cards, Sections) use 1rem (rounded-lg).
- **Feature Elements:** (Avatars, Play Buttons) may use the 1.5rem (rounded-xl) or full-pill shapes to distinguish them from structural components.

## Components
- **Buttons:** Primary buttons use a solid Indigo fill with white text. Secondary buttons are "ghost" style with a 1px Indigo border. All buttons have a height of 48px for touch-accessibility.
- **Glass Cards:** The signature component. These must feature a 1px border (#e2e8f0) and a backdrop-filter blur of at least 12px. Internal padding should be `lg` (24px).
- **Input Fields:** Use a light grey fill (#f8fafc) and a 1px subtle border. On focus, the border transitions to the primary Indigo with a 2px stroke.
- **Chips:** Small, pill-shaped elements used for tags. Use a secondary purple tint at 10% opacity for the background and 100% opacity for the text.
- **Lists:** Items are separated by whitespace and light horizontal rules (#f1f5f9). Tap targets must be a minimum of 56px in height.
- **Visualizers:** For voice data, use a gradient of Primary to Secondary colors with rounded-cap bars to match the shape language.