# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive Storybook documentation for all components
- Interactive demo application with React 19 + Vite
- Type safety improvements across the library
- npm package publishing setup with automated release workflow

### Fixed
- TypeScript type errors in NineSliceDialog component
- Missing props (children, className, style) in dialog interface
- Proper return types for useEffect hooks

### Changed
- Updated component stories with correct prop names
- Improved package.json for npm publishing
- Enhanced project structure with examples and documentation

## [0.1.0] - 2025-06-18

### Added
- Initial release of react-nine-slice library
- Core NineSlice component with CSS border-image implementation
- Specialized components:
  - NineSliceButton - Interactive buttons with game-style presets
  - NineSliceBar - Progress bars for health, mana, and experience
  - NineSliceFrame - Decorative frames with rarity system
  - NineSliceDialog - Modal dialogs with animations
- Comprehensive TypeScript type definitions
- Complete test suite with Vitest (161 tests)
- CI/CD pipeline with GitHub Actions
- Support for React 18+ and TypeScript 5+

### Features
- Nine-slice scaling preserving corner and edge details
- Game UI presets (fantasy, medieval, sci-fi, retro, modern)
- Interactive states (hover, active, disabled, loading)
- Animation effects (scale, glow, shadow, shimmer, pulse)
- Accessibility support with ARIA attributes
- CSS Modules for scoped styling
- Tree-shakable ESM and CommonJS builds

### Documentation
- Comprehensive README with usage examples
- TypeScript IntelliSense support
- Component examples and API documentation