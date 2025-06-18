# NineSliceButton Component

A comprehensive button component that extends the NineSlice component with button-specific functionality, styling variants, interactive states, and game-style presets.

## Features

- **Multiple Variants**: Primary, secondary, success, danger, warning, info, light, dark
- **Size Presets**: Small, medium, large, xlarge
- **Interactive States**: Hover, active, focus, disabled, loading
- **Press Effects**: Scale, glow, shadow, none
- **Game Presets**: Fantasy, medieval, sci-fi, retro, modern
- **Icon Support**: Left or right positioned icons
- **Loading State**: Built-in spinner with customization
- **Full Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **Nine-Slice Integration**: All NineSlice props supported for custom textures

## Basic Usage

```tsx
import { NineSliceButton } from '@/components/NineSliceButton';

// Basic button
<NineSliceButton variant="primary" onClick={() => console.log('Clicked!')}>
  Click Me
</NineSliceButton>

// With icon
<NineSliceButton 
  variant="success" 
  icon={<PlayIcon />} 
  iconPosition="left"
>
  Play Game
</NineSliceButton>

// Loading state
<NineSliceButton variant="primary" loading>
  Processing...
</NineSliceButton>
```

## Props

### Button-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Button style variant |
| `size` | `ButtonSize` | `'medium'` | Button size preset |
| `gamePreset` | `GamePreset` | `undefined` | Game-style visual preset |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `pressEffect` | `PressEffect` | `'scale'` | Press animation effect |
| `icon` | `ReactNode` | `undefined` | Icon element |
| `iconPosition` | `IconPosition` | `'left'` | Icon position |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `spinner` | `ReactNode` | `<DefaultSpinner />` | Custom spinner element |

### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `(event: MouseEvent) => void` | Click handler |
| `onFocus` | `(event: FocusEvent) => void` | Focus handler |
| `onBlur` | `(event: FocusEvent) => void` | Blur handler |
| `onKeyDown` | `(event: KeyboardEvent) => void` | Key down handler |

### Accessibility Props

| Prop | Type | Description |
|------|------|-------------|
| `aria-label` | `string` | Accessible label |
| `aria-describedby` | `string` | References describing elements |
| `aria-pressed` | `boolean` | Toggle button pressed state |

### Inherited NineSlice Props

All `NineSliceProps` are supported for custom textures and styling:

- `src` - Single image source
- `images` - Nine individual images  
- `slices` - Slice configuration
- `width`, `height` - Dimensions
- `edgeMode`, `centerMode` - Scaling modes
- And more...

## Button Variants

```tsx
// Standard variants
<NineSliceButton variant="primary">Primary</NineSliceButton>
<NineSliceButton variant="secondary">Secondary</NineSliceButton>
<NineSliceButton variant="success">Success</NineSliceButton>
<NineSliceButton variant="danger">Danger</NineSliceButton>
<NineSliceButton variant="warning">Warning</NineSliceButton>
<NineSliceButton variant="info">Info</NineSliceButton>
<NineSliceButton variant="light">Light</NineSliceButton>
<NineSliceButton variant="dark">Dark</NineSliceButton>
```

## Size Presets

```tsx
<NineSliceButton size="small">Small (32px)</NineSliceButton>
<NineSliceButton size="medium">Medium (40px)</NineSliceButton>
<NineSliceButton size="large">Large (48px)</NineSliceButton>
<NineSliceButton size="xlarge">X-Large (56px)</NineSliceButton>
```

## Game Style Presets

### Fantasy
```tsx
<NineSliceButton gamePreset="fantasy">
  Epic Adventure
</NineSliceButton>
```
- Golden gradient background
- Ornate border styling
- Glow effects on hover
- Fantasy-appropriate typography

### Medieval  
```tsx
<NineSliceButton gamePreset="medieval">
  Quest Begins
</NineSliceButton>
```
- Brown/wood textures
- Decorative patterns
- Medieval font styling
- Inset shadow effects

### Sci-Fi
```tsx
<NineSliceButton gamePreset="sci-fi">
  Launch Sequence
</NineSliceButton>
```
- Cyan/blue color scheme
- Animated light sweeps
- Futuristic typography
- Glow and shadow effects

### Retro
```tsx
<NineSliceButton gamePreset="retro">
  High Score
</NineSliceButton>
```
- Pixel-perfect styling
- 8-bit color palette
- Layered shadow effects
- Retro gaming fonts

### Modern
```tsx
<NineSliceButton gamePreset="modern">
  Get Started
</NineSliceButton>
```
- Clean gradients
- Subtle shadows
- Contemporary typography
- Smooth animations

## Press Effects

```tsx
// Scale effect (default)
<NineSliceButton pressEffect="scale">Scale Down</NineSliceButton>

// Glow effect
<NineSliceButton pressEffect="glow">Glow On Press</NineSliceButton>

// Shadow effect
<NineSliceButton pressEffect="shadow">Inset Shadow</NineSliceButton>

// No effect
<NineSliceButton pressEffect="none">Static</NineSliceButton>
```

## Icon Integration

```tsx
// Left positioned icon (default)
<NineSliceButton 
  icon={<SaveIcon />} 
  iconPosition="left"
>
  Save File
</NineSliceButton>

// Right positioned icon
<NineSliceButton 
  icon={<ArrowIcon />} 
  iconPosition="right"
>
  Continue
</NineSliceButton>

// Icon only (no text)
<NineSliceButton 
  icon={<MenuIcon />}
  aria-label="Open menu"
/>
```

## Loading States

```tsx
// Basic loading state
<NineSliceButton loading>
  Processing...
</NineSliceButton>

// Custom spinner
<NineSliceButton 
  loading
  spinner={<CustomSpinner />}
>
  Custom Loading
</NineSliceButton>

// Async action example
const [loading, setLoading] = useState(false);

const handleAsync = async () => {
  setLoading(true);
  try {
    await someAsyncOperation();
  } finally {
    setLoading(false);
  }
};

<NineSliceButton 
  loading={loading}
  onClick={handleAsync}
>
  {loading ? 'Processing...' : 'Start Process'}
</NineSliceButton>
```

## Nine-Slice Integration

Use custom textures and images:

```tsx
// Single image with slicing
<NineSliceButton
  src="/textures/wood-button.png"
  slices={{ top: 16, right: 16, bottom: 16, left: 16 }}
  variant="primary"
>
  Wooden Button
</NineSliceButton>

// Nine separate images
<NineSliceButton
  images={{
    topLeft: '/ui/button-tl.png',
    topCenter: '/ui/button-tc.png',
    topRight: '/ui/button-tr.png',
    middleLeft: '/ui/button-ml.png',  
    middleCenter: '/ui/button-mc.png',
    middleRight: '/ui/button-mr.png',
    bottomLeft: '/ui/button-bl.png',
    bottomCenter: '/ui/button-bc.png',
    bottomRight: '/ui/button-br.png'
  }}
>
  Custom UI
</NineSliceButton>
```

## Accessibility

The component includes comprehensive accessibility support:

### Keyboard Navigation
- **Tab**: Focus navigation
- **Enter/Space**: Activate button
- **Escape**: Remove focus (when applicable)

### Screen Reader Support
- Proper ARIA roles and states
- Loading state announcements
- Disabled state handling
- Custom labels and descriptions

### High Contrast Mode
- Enhanced borders and outlines
- Improved focus indicators
- Dashed borders for disabled state

### Reduced Motion
- Respects `prefers-reduced-motion`
- Disables animations when requested
- Maintains functionality without motion

## Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <NineSliceButton type="submit" variant="success">
    Submit Form
  </NineSliceButton>
  
  <NineSliceButton type="reset" variant="secondary">
    Reset Form
  </NineSliceButton>
  
  <NineSliceButton type="button" onClick={handleCancel}>
    Cancel
  </NineSliceButton>
</form>
```

## Advanced Examples

### Toggle Button
```tsx
const [pressed, setPressed] = useState(false);

<NineSliceButton
  variant={pressed ? "success" : "secondary"}
  aria-pressed={pressed}
  onClick={() => setPressed(!pressed)}
>
  {pressed ? "Enabled" : "Disabled"}
</NineSliceButton>
```

### Button Group
```tsx
<div style={{ display: 'flex', gap: '1px' }}>
  <NineSliceButton variant="primary">First</NineSliceButton>
  <NineSliceButton variant="primary">Second</NineSliceButton>
  <NineSliceButton variant="primary">Third</NineSliceButton>
</div>
```

### Conditional Rendering
```tsx
<NineSliceButton
  variant={isDestructive ? "danger" : "primary"}
  disabled={!isValid}
  loading={isSubmitting}
  icon={isDestructive ? <WarningIcon /> : <CheckIcon />}
>
  {isDestructive ? "Delete Item" : "Save Item"}
</NineSliceButton>
```

## CSS Customization

The component uses CSS modules for styling. You can override styles:

```css
/* Custom styles */
.customButton {
  /* Your custom styles */
}

.customButton:hover {
  /* Custom hover effects */
}
```

```tsx
<NineSliceButton className="customButton">
  Custom Styled
</NineSliceButton>
```

## TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type { 
  NineSliceButtonProps,
  ButtonVariant,
  ButtonSize,
  PressEffect,
  GamePreset 
} from '@/components/NineSliceButton';

const MyButton: React.FC<{variant: ButtonVariant}> = ({ variant }) => (
  <NineSliceButton variant={variant}>
    Typed Button
  </NineSliceButton>
);
```

## Performance

- Efficient re-renders with React.memo
- CSS transitions for smooth animations
- Optimized event handlers
- Minimal DOM updates
- Image preloading support (inherited from NineSlice)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS Custom Properties recommended
- Progressive enhancement for older browsers