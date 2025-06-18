/**
 * Rendering mode selection and optimization utilities
 */

export type RenderMode = 'canvas' | 'css' | 'hybrid';

export interface RenderModeOptions {
  preferCSS?: boolean;
  forceMode?: RenderMode;
  maxCanvasSize?: number;
  supportsBorderImage?: boolean;
}

/**
 * Determine the best rendering mode based on various factors
 * @param width Component width
 * @param height Component height
 * @param options Rendering options and constraints
 * @returns Recommended render mode
 */
export function getRenderMode(
  width: number,
  height: number,
  options: RenderModeOptions = {}
): RenderMode {
  const {
    preferCSS = true,
    forceMode,
    maxCanvasSize = 4096,
    supportsBorderImage = checkBorderImageSupport()
  } = options;

  // If mode is forced, use it
  if (forceMode) {
    return forceMode;
  }

  // Check if dimensions exceed canvas limits
  const exceedsCanvasSize = width > maxCanvasSize || height > maxCanvasSize;

  // CSS mode is preferred for static content
  if (preferCSS && supportsBorderImage && !exceedsCanvasSize) {
    return 'css';
  }

  // Canvas mode for dynamic content or when CSS is not supported
  if (!supportsBorderImage || !preferCSS) {
    return exceedsCanvasSize ? 'hybrid' : 'canvas';
  }

  // Default to CSS if supported
  return supportsBorderImage ? 'css' : 'canvas';
}

/**
 * Check if the browser supports CSS border-image
 * @returns Whether border-image is supported
 */
export function checkBorderImageSupport(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const el = document.createElement('div');
  const properties = [
    'borderImage',
    'WebkitBorderImage',
    'MozBorderImage',
    'OBorderImage'
  ];

  for (const prop of properties) {
    if (prop in el.style) {
      return true;
    }
  }

  return false;
}

/**
 * Get optimal canvas settings for the current device
 * @returns Canvas configuration object
 */
export function getOptimalCanvasSettings() {
  const pixelRatio = getPixelRatio();
  
  return {
    pixelRatio,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high' as ImageSmoothingQuality,
    willReadFrequently: false
  };
}

/**
 * Check if we should use OffscreenCanvas for better performance
 * @returns Whether OffscreenCanvas is available and recommended
 */
export function shouldUseOffscreenCanvas(): boolean {
  return typeof OffscreenCanvas !== 'undefined';
}

/**
 * Get device pixel ratio for high-DPI displays
 * @returns Device pixel ratio
 */
export function getPixelRatio(): number {
  if (typeof window === 'undefined') {
    return 1;
  }
  
  return window.devicePixelRatio || 1;
}

/**
 * Calculate if rendering should be throttled based on performance
 * @param fps Current frames per second
 * @param targetFps Target frames per second
 * @returns Whether to throttle rendering
 */
export function shouldThrottleRendering(fps: number, targetFps: number = 60): boolean {
  return fps < targetFps * 0.8; // Throttle if FPS drops below 80% of target
}