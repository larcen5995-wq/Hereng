---
name: Vocalize Neon Berry
colors:
  surface: '#19101e'
  surface-dim: '#19101e'
  surface-bright: '#403545'
  surface-container-lowest: '#130b18'
  surface-container-low: '#211826'
  surface-container: '#251c2a'
  surface-container-high: '#302635'
  surface-container-highest: '#3b3140'
  on-surface: '#eeddf1'
  on-surface-variant: '#debec8'
  inverse-surface: '#eeddf1'
  inverse-on-surface: '#372d3c'
  outline: '#a68992'
  outline-variant: '#574048'
  surface-tint: '#ffb0cd'
  primary: '#ffb0cd'
  on-primary: '#640039'
  primary-container: '#f751a1'
  on-primary-container: '#570032'
  inverse-primary: '#b4136d'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#e7b8e2'
  on-tertiary: '#462446'
  tertiary-container: '#ae83ab'
  on-tertiary-container: '#3e1d3f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e4'
  primary-fixed-dim: '#ffb0cd'
  on-primary-fixed: '#3e0022'
  on-primary-fixed-variant: '#8c0053'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffd6f9'
  tertiary-fixed-dim: '#e7b8e2'
  on-tertiary-fixed: '#2e0f30'
  on-tertiary-fixed-variant: '#5e3a5d'
  background: '#19101e'
  on-background: '#eeddf1'
  surface-variant: '#3b3140'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '500'
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
  container-margin: 24px
  gutter: 16px
  section-gap: 48px
---

## Brand & Style
This design system centers on high-energy, rhythmic expression tailored for a modern social or music-centric audience. The personality is vibrant, youthful, and immersive, utilizing a **Vaporwave-inspired Glassmorphism** aesthetic. 

The interface relies on a deep, dark base to allow neon accents to pop, creating a "late-night" atmosphere that feels both premium and playful. Design elements should utilize heavy background blurs (frosted glass) and vibrant outer glows to simulate light emission. The emotional response should be one of excitement, creativity, and digital fluency.

## Colors
The palette is anchored by a deep plum-black (`#0f0714`) for the main canvas, providing a high-contrast foundation for the vibrant highlights.

- **Primary (Vibrant Pink):** Used for critical actions, active states, and primary glow effects.
- **Secondary (Lavender):** Used for supporting interactive elements, gradients, and subtle accents.
- **Tertiary (Deep Berry):** Used for container backgrounds and low-level surfaces to create a tiered dark-mode experience.
- **Surface Tints:** All neutral greys should be replaced with desaturated plum tones to maintain the "Berry" warmth even in subtle UI elements.

## Typography
The typography strategy blends avant-garde display faces with highly legible geometric sans-serifs.

- **Headlines:** Use **Syne** for its expressive, wide proportions. It should be typeset with tight letter-spacing to feel impactful and modern.
- **Body:** Use **Be Vietnam Pro** for all long-form content. Its contemporary, open apertures ensure readability against dark, vibrant backgrounds.
- **Labels & Data:** Use **Space Mono** for small labels, timestamps, or technical metadata. This adds a "tech" edge that complements the neon aesthetic.

## Layout & Spacing
This design system utilizes a **fluid grid** with generous internal padding to create a sense of "air" within a dark environment.

- **Desktop:** 12-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px gutters and 24px side margins.
- **Rhythm:** All spacing must be multiples of 8px. Use larger gaps (48px+) between major content sections to prevent the vibrant colors from feeling cluttered or overwhelming.

## Elevation & Depth
Depth is communicated through **translucency and luminosity** rather than traditional grey shadows.

- **Surface Layers:** The base layer is `#0f0714`. Primary containers use a semi-transparent Deep Berry (`#311132` at 60% opacity) with a `20px` backdrop blur.
- **Glows:** Higher elevation elements (like active buttons or cards) feature a `0px 4px 20px` outer glow using the primary pink color at 30% opacity.
- **Overlays:** Modals and drawers should use a heavily blurred "Glass" effect to maintain the user's context of the vibrant background.

## Shapes
The shape language is consistently **Rounded**. 

- Standard components (Inputs, Cards) use a **0.5rem (8px)** corner radius.
- Buttons and interactive Chips should use **Pill-shaped (Full)** rounding to contrast against the more structural card layouts.
- Avoid sharp corners entirely to maintain the "playful" and "fluid" brand narrative.

## Components
- **Buttons:** Primary buttons are solid Vibrant Pink with white text. They must feature a subtle pink drop-shadow glow. Secondary buttons use a Rose border with a glass-blur fill.
- **Cards:** Cards are semi-transparent with a 1px inner border in a Lavender tint (10% opacity) to define edges against dark backgrounds.
- **Inputs:** Fields should be dark plum with a 1px bottom border. Upon focus, the border glows pink and the label shifts to the Lavender accent.
- **Chips:** Small, pill-shaped tags used for categories. Use Lavender backgrounds with dark plum text for high contrast.
- **Sliders/Progress Bars:** Vital for a "Vocalize" app. The track is deep berry, while the progress fill is a gradient from Lavender to Vibrant Pink. The "thumb" or handle should have a prominent neon glow.
- **Audio Visualizers:** Use varying heights of vertical rounded bars in a pink-to-lavender gradient to mimic the rhythmic nature of the app.