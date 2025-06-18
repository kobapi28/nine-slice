# NineSliceFrame Component

The `NineSliceFrame` component extends the base `NineSlice` component to create decorative frames with advanced features for game UI, portraits, avatars, and cards.

## Features

- 🎨 **Multiple frame variants**: Golden, Silver, Wood, Stone, Modern, Ornate, Minimal
- 🔧 **Customizable thickness** and corner styles
- 📱 **Content type optimization** for portraits, avatars, cards
- ✨ **Animation effects**: Shimmer, glow, pulse
- 🎮 **Game UI integration** with rarity colors and status indicators
- 🏷️ **Level badges** and status indicators
- 🌟 **Shadow and glow effects**
- 📱 **Responsive frame scaling**
- ♿ **Accessibility support** (high contrast, reduced motion)

## Basic Usage

```tsx
import { NineSliceFrame } from '@/components/NineSliceFrame';

// Basic frame
<NineSliceFrame variant="golden" width={200} height={150}>
  <div>Your content here</div>
</NineSliceFrame>

// Portrait frame with level badge
<NineSliceFrame 
  variant="golden" 
  contentType="portrait" 
  level={5}
  shadow
>
  <img src="portrait.jpg" alt="Character" />
</NineSliceFrame>

// Game item with rarity and effects
<NineSliceFrame 
  variant="ornate"
  gameUI={{ rarity: 'legendary', enchanted: true }}
  animate="glow"
  status="active"
>
  <div>Legendary Sword</div>
</NineSliceFrame>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `FrameVariant` | `'golden'` | Frame style variant |
| `thickness` | `number` | `undefined` | Frame thickness in pixels (overrides variant default) |
| `cornerStyle` | `CornerStyle` | `'rounded'` | Corner style |
| `animate` | `AnimationType` | `'none'` | Animation effect |
| `contentType` | `FrameContentType` | `'content'` | Content type optimization |

### Game UI Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `number` | `undefined` | Level badge number |
| `status` | `'active' \| 'inactive' \| 'warning' \| 'error' \| 'success'` | `undefined` | Status indicator |
| `gameUI` | `GameUIConfig` | `undefined` | Game UI configuration |

### Effects Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shadow` | `boolean \| 'inner' \| 'outer' \| 'both'` | `false` | Shadow effect |
| `glow` | `boolean \| string` | `false` | Glow effect (true for default, string for custom color) |
| `responsive` | `boolean` | `true` | Enable responsive scaling |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationConfig` | `AnimationConfig` | `{}` | Animation configuration |

## Frame Variants

### Built-in Variants

- **`golden`**: Elegant golden frame with 32px thickness
- **`silver`**: Classic silver frame with 28px thickness  
- **`wood`**: Rustic wooden frame with 24px thickness
- **`stone`**: Solid stone frame with 20px thickness
- **`modern`**: Clean modern frame with 16px thickness
- **`ornate`**: Decorative ornate frame with 48px thickness
- **`minimal`**: Simple minimal frame with 8px thickness

```tsx
// Different variants
<NineSliceFrame variant="golden">Golden Frame</NineSliceFrame>
<NineSliceFrame variant="wood">Wood Frame</NineSliceFrame>
<NineSliceFrame variant="modern">Modern Frame</NineSliceFrame>
```

## Content Types

Optimize frames for different content types:

```tsx
// Portrait (3:4 aspect ratio)
<NineSliceFrame contentType="portrait">
  <img src="portrait.jpg" />
</NineSliceFrame>

// Avatar (1:1 aspect ratio, circular)
<NineSliceFrame contentType="avatar">
  <img src="avatar.jpg" />
</NineSliceFrame>

// Card (3:5 aspect ratio, max 200px width)
<NineSliceFrame contentType="card">
  <div>Card Content</div>
</NineSliceFrame>
```

## Corner Styles

- **`rounded`**: Smooth rounded corners (8px radius)
- **`square`**: Sharp square corners
- **`ornate`**: Decorative rounded corners (12px radius)
- **`beveled`**: Cut corner effect using clip-path

```tsx
<NineSliceFrame cornerStyle="rounded">Rounded</NineSliceFrame>
<NineSliceFrame cornerStyle="beveled">Beveled</NineSliceFrame>
```

## Animation Effects

### Shimmer
Creates a light sweep effect across the frame:

```tsx
<NineSliceFrame animate="shimmer" animationConfig={{ duration: 3000 }}>
  Shimmer Effect
</NineSliceFrame>
```

### Glow
Pulsing glow effect around the frame:

```tsx
<NineSliceFrame animate="glow" glow="#ffd700">
  Glow Effect
</NineSliceFrame>
```

### Pulse
Scale pulsing animation:

```tsx
<NineSliceFrame animate="pulse" animationConfig={{ intensity: 0.1 }}>
  Pulse Effect
</NineSliceFrame>
```

## Game UI Integration

### Rarity System

```tsx
<NineSliceFrame gameUI={{ rarity: 'legendary' }}>
  Legendary Item
</NineSliceFrame>

<NineSliceFrame gameUI={{ rarity: 'epic', enchanted: true }}>
  Epic Enchanted Item
</NineSliceFrame>
```

Rarity colors:
- **Common**: Gray (#95a5a6)
- **Uncommon**: Green (#27ae60)
- **Rare**: Blue (#3498db)
- **Epic**: Purple (#9b59b6)
- **Legendary**: Orange (#f39c12) with glow animation

### Status Indicators

```tsx
<NineSliceFrame status="active" level={25}>
  Active Character
</NineSliceFrame>

<NineSliceFrame gameUI={{ locked: true }}>
  Locked Content
</NineSliceFrame>

<NineSliceFrame gameUI={{ new: true }}>
  New Item
</NineSliceFrame>
```

## Effects and Styling

### Shadow Effects

```tsx
// Basic shadow
<NineSliceFrame shadow>Content</NineSliceFrame>

// Inner shadow
<NineSliceFrame shadow="inner">Content</NineSliceFrame>

// Both inner and outer
<NineSliceFrame shadow="both">Content</NineSliceFrame>
```

### Glow Effects

```tsx
// Default glow (uses frame color)
<NineSliceFrame glow>Content</NineSliceFrame>

// Custom glow color
<NineSliceFrame glow="#ff6b6b">Content</NineSliceFrame>
```

### Custom Thickness

```tsx
// Thin frame
<NineSliceFrame thickness={8}>Thin Frame</NineSliceFrame>

// Thick frame
<NineSliceFrame thickness={48}>Thick Frame</NineSliceFrame>
```

## Responsive Design

The frame automatically scales on smaller screens:

```tsx
<NineSliceFrame responsive>
  Responsive Frame
</NineSliceFrame>
```

- Tablet (≤768px): 75% of original thickness
- Mobile (≤480px): 50% of original thickness

## Accessibility

The component supports:

- **High contrast mode**: Enhanced shadows and borders
- **Reduced motion**: Disables animations when `prefers-reduced-motion` is set
- **Keyboard navigation**: Inherits from underlying NineSlice component

## Advanced Usage

### Custom Frame Images

```tsx
<NineSliceFrame
  frameImages={{
    corners: ['/custom/corner.png'],
    edges: ['/custom/edge.png'],
    ornaments: ['/custom/ornament.png']
  }}
>
  Custom Frame
</NineSliceFrame>
```

### Complex Game UI

```tsx
<NineSliceFrame
  variant="ornate"
  gameUI={{
    rarity: 'legendary',
    enchanted: true,
    new: true
  }}
  level={99}
  status="active"
  animate="glow"
  shadow="both"
  animationConfig={{
    duration: 2000,
    intensity: 1.5
  }}
>
  <div>
    <h3>Excalibur</h3>
    <p>Legendary Enchanted Sword</p>
    <p>+999 Attack Power</p>
  </div>
</NineSliceFrame>
```

## CSS Custom Properties

The component exposes CSS custom properties for advanced customization:

```css
.custom-frame {
  --frame-color: #custom-color;
  --frame-accent: #custom-accent;
  --frame-shadow: rgba(custom, 0.5);
  --glow-color: #custom-glow;
  --animation-duration: 3000ms;
  --animation-intensity: 1.2;
  --frame-thickness: 20px;
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { 
  NineSliceFrameProps,
  FrameVariant,
  CornerStyle,
  AnimationType,
  FrameContentType
} from '@/components/NineSliceFrame';
```

## Performance Considerations

- Images are preloaded using the `useImagePreloader` hook
- Animations respect `prefers-reduced-motion`
- Responsive scaling uses CSS transforms for better performance
- Level badges and indicators are positioned with CSS for optimal rendering