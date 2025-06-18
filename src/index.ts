// Main export file for the nine-slice library

// Export all components
export * from './components';

// Export hooks (excluding preloadImages to avoid conflict with utils)
export { useImagePreloader } from './hooks';

// Export utilities (excluding preloadImages from components)
export { 
  generateBorderImageCSS,
  cssObjectToString,
  createNineSliceStyleElement,
  generateFallbackCSS,
  mergeClassNames,
  debounce,
  throttle,
  clamp,
  generateId,
  isValidNumber,
  parseSize,
  deepClone,
  deepEqual,
  getRenderMode,
  checkBorderImageSupport,
  getOptimalCanvasSettings,
  shouldUseOffscreenCanvas,
  getPixelRatio,
  shouldThrottleRendering,
  calculateSlices,
  parseSliceValue,
  normalizeSlices,
  preloadImages,
  loadImage,
  clearImageCache,
  removeFromCache,
  getCacheSize,
  isImageCached,
  processNineSliceImage,
  validateSlices,
  validateNineSliceProps
} from './utils';

// Export core types (only what's actually exported)
export type {
  RenderMode,
  ScalingMode,
  SliceConfig,
  CornerSize,
  NineSliceImages,
  GroupedImages,
  SpriteRegion,
  BarImages,
  AnimationState,
  AnimationStates,
  TransitionConfig,
  PresetConfig,
  PreloadOptions
} from './types';