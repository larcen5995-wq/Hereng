---
name: Vocalize Slate
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c4c6cb'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8e9195'
  outline-variant: '#44474b'
  surface-tint: '#bdc8d3'
  primary: '#e7f1fe'
  on-primary: '#28313b'
  primary-container: '#cbd5e1'
  on-primary-container: '#525c66'
  inverse-primary: '#565f6a'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#ffece3'
  on-tertiary: '#3e2d22'
  tertiary-container: '#ebcebe'
  on-tertiary-container: '#6c574a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae3f0'
  primary-fixed-dim: '#bdc8d3'
  on-primary-fixed: '#131d25'
  on-primary-fixed-variant: '#3e4852'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#faddcc'
  tertiary-fixed-dim: '#ddc1b1'
  on-tertiary-fixed: '#27180e'
  on-tertiary-fixed-variant: '#564337'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
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
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
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
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system embodies a sophisticated, executive-grade aesthetic tailored for high-stakes communication and professional environments. It leans heavily into a refined **Glassmorphism** style, utilizing depth through translucency rather than traditional shadows. 

The personality is composed, technical, and premium. By stripping away vibrant hues in favor of a monochromatic slate palette, the UI directs absolute focus toward content and data. The emotional response is one of calm authority and precision.

## Colors

The palette is a rigorous exploration of the Slate spectrum. 

- **Primary:** A soft silver-grey (Slate 300) used for high-impact actions and active states. 
- **Secondary:** A muted cool grey (Slate 500) for secondary interactions and iconography.
- **Backgrounds:** The foundation uses Slate 950 for the deepest layers, transitioning to Slate 900 for the main application canvas.
- **Surfaces:** Containers use Slate 800 with varying degrees of opacity (60-80%) to facilitate the glassmorphic effect.
- **Accents:** Occasional use of pure white for critical text legibility against dark backgrounds.

## Typography

This design system utilizes **Outfit** across all levels to maintain a clean, geometric, and modern feel. 

- **Headlines:** Use tighter letter spacing and heavier weights to create a strong visual anchor.
- **Body:** Set with generous line heights to ensure readability against dark, translucent backgrounds.
- **Labels:** Use medium or semi-bold weights with slight tracking to ensure functional clarity at small scales.
- **Contrast:** High-level headers should use the Primary Silver color, while body text should utilize a slightly dimmed Slate 200 for eye comfort.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy with a focus on internal containment. 

- **Grid:** A 12-column system for desktop, 8-column for tablet, and 4-column for mobile.
- **Rhythm:** An 8px linear scale drives all padding and margins. 
- **Breathing Room:** Use 'xl' spacing (40px) between major glass sections to emphasize the floating nature of the UI.
- **Mobile Reflow:** On mobile, margins reduce to 16px, and glass cards stack vertically with 12px gutters.

## Elevation & Depth

Depth is conveyed through **Glassmorphism** and tonal layering. 

- **Layer 0 (Background):** Solid Slate 950.
- **Layer 1 (Main Surfaces):** Slate 800 at 70% opacity with a 20px backdrop blur. A subtle 1px inner border (white at 10% opacity) defines the edges.
- **Layer 2 (Popovers/Modals):** Slate 700 at 80% opacity with a 40px backdrop blur. These layers receive a soft, diffused ambient shadow (Black, 40% opacity, 30px blur).
- **Interactive States:** When hovered, glass surfaces should increase in opacity by 10% rather than changing color, simulating a physical light interaction.

## Shapes

The shape language is consistently **Rounded**, providing a soft counterpoint to the "cold" slate color palette. 

- **Containers:** Use `rounded-lg` (1rem) for most surface cards to create a modern, friendly silhouette.
- **Buttons/Inputs:** Use `rounded-lg` (1rem) to maintain consistency with containers.
- **Small Elements:** Tooltips and chips use a base `rounded` (0.5rem) setting.
- **Inner Radii:** When nesting elements, ensure the inner radius is 4px smaller than the outer radius to maintain visual harmony.

## Components

- **Buttons:** 
  - *Primary:* Silver background with Slate 950 text. No transparency.
  - *Secondary:* Glass-effect (Slate 800 at 40%) with a white 1px border.
- **Input Fields:** Darker than the surrounding surface (Slate 950 at 50% opacity) with a persistent 1px Slate 700 border. Focus state triggers a Silver border glow.
- **Cards:** The core of the UI. Must utilize backdrop-blur (minimum 16px) and the 1px subtle top-light border to differentiate from the background.
- **Chips:** Highly rounded (pill-style), using Slate 700 backgrounds for inactive states and Primary Silver for active states.
- **Lists:** Items separated by 1px dividers (Slate 700). Hover states utilize a subtle background highlight (White at 5% opacity).
- **Audio Visualizers:** (App Specific) Should use the Primary Silver color with a gradient fade into the background, maintaining the ethereal glass aesthetic.