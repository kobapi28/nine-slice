# NineSliceBar Component

A comprehensive progress/health bar component that supports nine-slice scaling, animations, and game-style theming.

## Features

- **Progress/Health Bar Functionality**: Display values with customizable max values
- **Multiple Variants**: Health, mana, experience, progress, and custom bars
- **Animated Value Changes**: Smooth transitions with customizable easing
- **Label Support**: Text overlays with flexible positioning and formatting
- **Gradient Fills & Glow Effects**: Visual enhancements for game-style interfaces
- **Multiple Fill Modes**: Left-to-right, right-to-left, bottom-to-top, top-to-bottom
- **Critical Thresholds**: Color changes and pulsing effects for low values
- **Segmented Bars**: Break bars into segments for complex displays
- **Game-Style Presets**: Fantasy, cyberpunk, retro, and modern themes
- **Nine-Slice Support**: Use custom images with nine-slice scaling

## Basic Usage

```tsx
import { NineSliceBar } from 'nine-slice';

// Simple health bar
<NineSliceBar
  value={80}
  maxValue={100}
  variant="health"
  gameStyle="fantasy"
  width="300px"
  height="24px"
  showLabel={true}
  animated={true}
/>
```

## Props

### Core Properties

- `value: number` - Current value of the bar
- `maxValue: number` - Maximum value of the bar
- `variant?: BarVariant` - Bar type: 'health' | 'mana' | 'experience' | 'progress' | 'custom'
- `gameStyle?: GameStyle` - Visual theme: 'fantasy' | 'cyberpunk' | 'retro' | 'modern'

### Visual Customization

- `fillDirection?: FillDirection` - Fill direction: 'left-to-right' | 'right-to-left' | 'bottom-to-top' | 'top-to-bottom'
- `fillColor?: string` - Color of the fill area
- `backgroundColor?: string` - Background color
- `borderColor?: string` - Border color
- `width?: number | string` - Bar width (default: '200px')
- `height?: number | string` - Bar height (default: '20px')

### Label Configuration

- `showLabel?: boolean` - Show text label (default: false)
- `labelText?: string` - Custom label text
- `labelPosition?: 'center' | 'left' | 'right'` - Label position (default: 'center')
- `labelFormat?: (value: number, maxValue: number) => string` - Custom label formatter

### Animation Settings

- `animated?: boolean` - Enable animations (default: true)
- `animationDuration?: number` - Animation duration in ms (default: 300)
- `animationEasing?: string` - Easing function: 'ease-out' | 'ease-in' | 'ease-in-out' | 'linear'

### Effects

- `glowEffect?: boolean` - Enable glow effect
- `glowColor?: string` - Glow color
- `gradientFill?: boolean` - Use gradient fill
- `pulsateOnLow?: boolean` - Pulsate when value is low

### Thresholds

- `criticalThreshold?: number` - Critical threshold (0-1)
- `warningThreshold?: number` - Warning threshold (0-1)
- `criticalColor?: string` - Color when critical
- `warningColor?: string` - Color when warning

### Segmented Bars

- `segments?: number` - Number of segments
- `segmentSpacing?: number` - Spacing between segments in pixels

### Callbacks

- `onValueChange?: (value: number, maxValue: number, percentage: number) => void`
- `onCriticalThreshold?: (value: number, maxValue: number) => void`
- `onWarningThreshold?: (value: number, maxValue: number) => void`

### Nine-Slice Images

- `barImages?: { background?: NineSliceImages | string; fill?: NineSliceImages | string; overlay?: NineSliceImages | string; }`
- `src?: string` - Single image source for nine-slice
- `images?: NineSliceImages` - Nine individual images
- `slices?: number | SliceConfig` - Slice configuration

## Examples

### Health Bar with Critical Threshold

```tsx
<NineSliceBar
  value={25}
  maxValue={100}
  variant="health"
  gameStyle="fantasy"
  width="300px"
  height="24px"
  showLabel={true}
  animated={true}
  criticalThreshold={0.25}
  warningThreshold={0.5}
  pulsateOnLow={true}
  onCriticalThreshold={(value, max) => console.log('Critical health!')}
/>
```

### Mana Bar with Cyberpunk Theme

```tsx
<NineSliceBar
  value={60}
  maxValue={100}
  variant="mana"
  gameStyle="cyberpunk"
  width="300px"
  height="20px"
  showLabel={true}
  labelFormat={(value, max) => `${Math.round(value)} / ${max} MP`}
  glowEffect={true}
  gradientFill={true}
/>
```

### Vertical Bar

```tsx
<NineSliceBar
  value={80}
  maxValue={100}
  variant="health"
  width="20px"
  height="200px"
  fillDirection="bottom-to-top"
  showLabel={true}
  animated={true}
/>
```

### Segmented Bar

```tsx
<NineSliceBar
  value={70}
  maxValue={100}
  variant="health"
  width="300px"
  height="20px"
  segments={10}
  segmentSpacing={2}
  showLabel={true}
/>
```

### Custom Colors

```tsx
<NineSliceBar
  value={75}
  maxValue={100}
  variant="custom"
  fillColor="#ff6b6b"
  backgroundColor="#2c3e50"
  borderColor="#34495e"
  glowEffect={true}
  glowColor="#ff6b6b"
/>
```

### With Nine-Slice Images

```tsx
<NineSliceBar
  value={80}
  maxValue={100}
  src="/path/to/bar-image.png"
  slices={4}
  barImages={{
    background: "/path/to/background.png",
    fill: "/path/to/fill.png",
    overlay: "/path/to/overlay.png"
  }}
  width="300px"
  height="24px"
/>
```

## Game Style Presets

### Fantasy
- Warm colors with gold accents
- Textured appearance with shine animation
- Serif fonts for labels

### Cyberpunk
- Neon colors (cyan, magenta)
- Glowing effects and flowing animations
- Monospace fonts

### Retro
- Classic arcade colors (yellow, red)
- Pixelated rendering
- Simple, blocky appearance

### Modern
- Clean, minimal design
- Subtle gradients and backdrop blur
- System fonts

## Accessibility

The component includes:
- High contrast mode support
- Reduced motion preferences
- Screen reader friendly markup
- Print-friendly styles

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all props and variants.