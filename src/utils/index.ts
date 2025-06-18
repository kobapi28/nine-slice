/**
 * Export all utilities
 */

// Image loading and caching utilities
export {
  preloadImages,
  loadImage,
  clearImageCache,
  removeFromCache,
  getCacheSize,
  isImageCached
} from './imageLoader';

// Slicing logic
export {
  calculateSlices,
  parseSliceValue,
  normalizeSlices,
  type SliceCoordinates,
  type NineSliceRegions
} from './slicing';

// Rendering mode selection and optimization
export {
  getRenderMode,
  checkBorderImageSupport,
  getOptimalCanvasSettings,
  shouldUseOffscreenCanvas,
  getPixelRatio,
  shouldThrottleRendering,
  type RenderMode,
  type RenderModeOptions
} from './rendering';

// CSS generation for border-image approach
export {
  generateBorderImageCSS,
  cssObjectToString,
  createNineSliceStyleElement,
  generateFallbackCSS,
  type BorderImageOptions
} from './css';

// General helper functions
export {
  mergeClassNames,
  debounce,
  throttle,
  clamp,
  generateId,
  isValidNumber,
  parseSize,
  deepClone,
  deepEqual
} from './helpers';

// Image processing utilities
export {
  processNineSliceImage,
  combineNineSliceImages,
  analyzeImageForSlicing,
  type ImageProcessingOptions,
  type SliceConfiguration as ImageSliceConfiguration
} from './imageProcessor';

// Validation utilities
export {
  validateSlices,
  validateImageUrls,
  validateNineSliceProps,
  validateBrowserSupport,
  type ValidationResult
} from './validation';