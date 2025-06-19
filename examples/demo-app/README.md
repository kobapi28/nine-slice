# Nine-Slice Demo App

This demo application showcases the various components and features of the Nine-Slice React library.

## Features Demonstrated

### 🎮 Components Showcased

- **NineSlice** - Core nine-slice scaling component
- **NineSliceButton** - Interactive buttons with various styles and effects
- **NineSliceBar** - Progress bars for health, mana, and experience
- **NineSliceFrame** - Decorative frames with game UI styling
- **Custom Modal** - Dialog implementation (nine-slice dialog component has type issues)

### 🚀 Interactive Examples

1. **Basic Nine-Slice Scaling** - Demonstrates core scaling functionality
2. **Button Variants** - Different button styles, sizes, and effects
3. **Animated Status Bars** - Live updating progress bars with game-style variants
4. **Decorative Frames** - Showcase frame variants with rarity system integration
5. **Performance Test** - 20 components rendering simultaneously
6. **Quest Dialog** - Game-style modal dialog

## Running the Demo

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Key Features Tested

- ✅ Component integration with main library
- ✅ TypeScript compatibility
- ✅ CSS Modules styling
- ✅ Performance with multiple components
- ✅ Game UI preset systems
- ✅ Interactive state management
- ✅ Responsive design
- ✅ Animation effects

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Notes

The demo renders 20+ components simultaneously to test performance. In a real application, consider:

- Lazy loading for off-screen components
- Memoization for expensive calculations
- Virtual scrolling for large lists

## Next Steps

After exploring the demo, check out:

- [Storybook documentation](../../storybook-static/index.html)
- [Component API reference](../../README.md)
- [Library source code](../../src/)

---

*Built with React 19, Vite, and TypeScript*
