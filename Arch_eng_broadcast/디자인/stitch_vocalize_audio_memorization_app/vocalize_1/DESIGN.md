---
name: Vocalize
colors:
  surface: '#10131c'
  surface-dim: '#10131c'
  surface-bright: '#363943'
  surface-container-lowest: '#0b0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#272a34'
  surface-container-highest: '#32343f'
  on-surface: '#e0e2ef'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e0e2ef'
  inverse-on-surface: '#2d303a'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ddb7ff'
  on-tertiary: '#490080'
  tertiary-container: '#b76dff'
  on-tertiary-container: '#400071'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb7ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6900b3'
  background: '#10131c'
  on-background: '#e0e2ef'
  surface-variant: '#32343f'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Outfit
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
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  mono-label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  touch-target: 48px
---

## Brand & Style
The design system is engineered for a premium, immersive audio experience that blends the focused utility of a developer tool with the vibrant energy of a high-end streaming service. It targets commuters, students, and professionals who require a hands-free, high-focus environment. 

The aesthetic is **Cyber-Minimalist Glassmorphism**. It utilizes a deep, infinite background to reduce eye strain, while employing "frosted" glass surfaces to create a sense of physical layering. High-vibrancy neon accents serve as functional beacons for navigation and active states, ensuring the UI remains legible even at a glance or in peripheral vision during hands-free use.

## Colors
The palette is rooted in a "Deep Midnight" foundation to maximize the contrast of the glass effects and neon accents.

- **Primary (Neon Purple):** Used for primary actions, active playback states, and branding elements. It carries a subtle outer glow in high-interaction areas.
- **Secondary (Cyan):** Reserved for secondary metrics (e.g., progress time, speed settings) and successful state confirmations.
- **Surface:** A semi-transparent overlay of the neutral color, allowing background gradients or content to shimmer through.
- **Functional Accents:** Vibrant tints are used sparingly to denote recording (Red-Orange) and memorization "streaks" (Yellow-Gold).

## Typography
The typography system prioritizes immediate legibility at a distance. 

**Outfit** is used for headlines and large display stats to provide a modern, geometric personality. **Inter** handles all functional text and body copy due to its exceptional x-height and neutral clarity. For "Hands-free Mode," use `display-lg` to ensure the current memorization phrase is readable from several feet away. All labels for audio controls should be bold and high-contrast to assist with rapid cognitive processing.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column fluid grid** for mobile. 

The layout philosophy centers on "The Playback Zone"—the bottom third of the screen is always reserved for oversized, easily tappable audio controls. Spacing follows a strict 8px linear scale. For hands-free interfaces, internal margins within cards are increased to `32px` to provide "breathing room," making the content appear less cluttered and easier to focus on while multitasking.

## Elevation & Depth
Depth is communicated through **Backdrop Blurs** and **Tonal Translucency** rather than traditional drop shadows.

- **Level 1 (Base):** The Deep Midnight Indigo (#090c15) background.
- **Level 2 (Cards):** Surfaces with `background: rgba(255, 255, 255, 0.05)` and a `backdrop-filter: blur(12px)`. These surfaces feature a 1px solid border at `rgba(255, 255, 255, 0.1)` to define edges against the dark background.
- **Level 3 (Active/Pop-overs):** Same as Level 2 but with a subtle outer glow using the Primary color (Neon Purple) at 20% opacity.
- **Interactive Elements:** Buttons utilize a slight inner-light stroke to simulate a physical edge.

## Shapes
The shape language is "Soft-Modern." All cards and major UI containers use a `1rem` (16px) corner radius. Smaller interactive elements like chips and input fields use a `0.5rem` radius. 

**Exceptions:** 
- Playback buttons and progress sliders utilize full pill-shaping (circular ends) to signify their role as fluid, interactive audio elements. 
- Iconic indicators (like "Live" recording dots) are always perfect circles.

## Components

### Buttons & Pills
- **Primary Action:** Solid Neon Purple background with white text. High-contrast and elevated.
- **Accent Pills:** Used for category tags (e.g., "Fiction," "Meditation"). These use a Cyan outline with a faint Cyan tinted glow.

### Glass Cards
- Used for audiobook covers and memorization modules. Must include a `12px` backdrop blur. The border should be more prominent on the top and left to simulate a light source.

### Audio Controls
- **Play/Pause:** Oversized (min 80px) with a subtle pulse animation when active. 
- **Progress Bar:** A thin Cyan track with a Neon Purple thumb. The "played" portion of the track should have a soft glow.

### Input Fields
- Darker than the base background with a bottom-only border that glows Cyan when focused.

### Voice Visualizer
- A custom component for this design system. It consists of vertical Cyan and Purple bars that animate based on audio input, housed within a glass container.