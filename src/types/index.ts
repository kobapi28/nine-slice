/**
 * React Nine-Slice Type Definitions
 * 
 * This file exports all type definitions for the react-nine-slice library.
 * These types provide comprehensive TypeScript support for all components
 * and utilities in the library.
 */

// Re-export all types from common.ts
export type {
  // Core types
  RenderMode,
  ScalingMode,
  SliceConfig,
  CornerSize,
  
  // Image configuration types
  NineSliceImages,
  GroupedImages,
  SpriteRegion,
  BarImages,
  
  // Animation types
  AnimationState,
  AnimationStates,
  TransitionConfig,
  
  // Layer types
  LayerConfig,
  
  // Component prop types
  NineSliceProps,
  NineSliceDialogProps,
  NineSliceButtonProps,
  NineSliceBarProps,
  NineSliceFrameProps,
  NineSlicePanelProps,
  NineSliceAnimatedProps,
  NineSliceLayeredProps,
  NineSliceLayerProps,
  
  // Configuration types
  PresetConfig,
  PreloadOptions
} from './common';

// Additional utility types that might be used across the library

/**
 * Utility type for size values (number or CSS string)
 */
export type SizeValue = number | string;

/**
 * Utility type for nullable values
 */
export type Nullable<T> = T | null;

/**
 * Utility type for optional async functions
 */
export type AsyncFunction<T = void> = () => Promise<T>;

/**
 * Event handler types
 */
export type LoadHandler = () => void;
export type ErrorHandler = (error: Error) => void;
export type ClickHandler = (event: React.MouseEvent) => void;
export type HoverHandler = (hovering: boolean) => void;

/**
 * Preset variant names
 */
export type DialogVariant = 'fantasy' | 'modern' | 'retro' | 'minimal' | string;
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | string;
export type BarVariant = 'hp' | 'mana' | 'experience' | 'progress' | string;
export type FrameVariant = 'golden' | 'silver' | 'wood' | 'stone' | string;
export type PanelVariant = 'wood' | 'metal' | 'glass' | 'stone' | string;

/**
 * Size variants
 */
export type SizeVariant = 'small' | 'medium' | 'large';

/**
 * Effect types
 */
export type HoverEffect = 'glow' | 'lift' | 'brightness' | 'none';
export type PressEffect = 'scale' | 'darken' | 'none';
export type AnimateEffect = 'shimmer' | 'pulse' | 'slide' | 'fade' | 'none';

/**
 * Corner styles
 */
export type CornerStyle = 'rounded' | 'square' | 'ornate';

/**
 * Blend modes for layered rendering
 */
export type BlendMode = 
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

/**
 * Error types that can be thrown by the library
 */
export type NineSliceError = 
  | ImageLoadError
  | InvalidConfigError
  | RenderError;

export interface ImageLoadError extends Error {
  type: 'IMAGE_LOAD_ERROR';
  imagePath: string;
}

export interface InvalidConfigError extends Error {
  type: 'INVALID_CONFIG_ERROR';
  field: string;
  value: any;
}

export interface RenderError extends Error {
  type: 'RENDER_ERROR';
  renderMode: RenderMode;
}

/**
 * Hook return types
 */
export interface UseNineSliceReturn {
  /** Whether images are loaded */
  loaded: boolean;
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: Error | null;
  /** Retry loading */
  retry: () => void;
}

export interface UseAnimationReturn {
  /** Current animation state */
  currentState: keyof AnimationStates;
  /** Set animation state */
  setState: (state: string) => void;
  /** Check if transitioning */
  isTransitioning: boolean;
}

/**
 * Context types for advanced usage
 */
export interface NineSliceContextValue {
  /** Global render mode preference */
  renderMode?: 'auto' | 'css' | 'canvas' | 'svg';
  /** Global pixel perfect setting */
  pixelPerfect?: boolean;
  /** Image cache */
  imageCache?: Map<string, HTMLImageElement>;
  /** Preload images */
  preloadImages?: (urls: string[]) => Promise<void>;
}

/**
 * Ref types for imperative API
 */
export interface NineSliceRef {
  /** Force re-render */
  forceUpdate: () => void;
  /** Get current dimensions */
  getDimensions: () => { width: number; height: number };
  /** Get render mode being used */
  getRenderMode: () => 'auto' | 'css' | 'canvas' | 'svg';
}