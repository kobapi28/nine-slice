/**
 * CSS generation for border-image approach
 */

export interface BorderImageOptions {
  imageUrl: string;
  slices: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  width?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  outset?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  repeat?: 'stretch' | 'repeat' | 'round' | 'space';
  fill?: boolean;
}

/**
 * Generate CSS for border-image nine-slice rendering
 * @param options Border image configuration
 * @returns CSS properties object
 */
export function generateBorderImageCSS(options: BorderImageOptions): Record<string, string> {
  const {
    imageUrl,
    slices,
    width,
    outset,
    repeat = 'stretch',
    fill = true
  } = options;

  // Build border-image-slice value
  const sliceValues = `${slices.top} ${slices.right} ${slices.bottom} ${slices.left}`;
  const borderImageSlice = fill ? `${sliceValues} fill` : sliceValues;

  // Build border-image-width if provided
  let borderImageWidth = '';
  if (width) {
    const widthValues = [
      formatCSSValue(width.top ?? slices.top),
      formatCSSValue(width.right ?? slices.right),
      formatCSSValue(width.bottom ?? slices.bottom),
      formatCSSValue(width.left ?? slices.left)
    ];
    borderImageWidth = widthValues.join(' ');
  }

  // Build border-image-outset if provided
  let borderImageOutset = '';
  if (outset) {
    const outsetValues = [
      formatCSSValue(outset.top ?? 0),
      formatCSSValue(outset.right ?? 0),
      formatCSSValue(outset.bottom ?? 0),
      formatCSSValue(outset.left ?? 0)
    ];
    borderImageOutset = outsetValues.join(' ');
  }

  // Build the complete CSS object
  const css: Record<string, string> = {
    'border-image-source': `url("${imageUrl}")`,
    'border-image-slice': borderImageSlice,
    'border-image-repeat': repeat,
    'border-style': 'solid'
  };

  if (borderImageWidth) {
    css['border-image-width'] = borderImageWidth;
    // Also set border-width for fallback
    css['border-width'] = borderImageWidth;
  }

  if (borderImageOutset) {
    css['border-image-outset'] = borderImageOutset;
  }

  // Add vendor prefixes
  const prefixedCSS: Record<string, string> = {};
  const prefixes = ['-webkit-', '-moz-', '-o-'];

  Object.entries(css).forEach(([key, value]) => {
    prefixedCSS[key] = value;
    if (key.startsWith('border-image')) {
      prefixes.forEach(prefix => {
        prefixedCSS[`${prefix}${key}`] = value;
      });
    }
  });

  return prefixedCSS;
}

/**
 * Format a CSS value (adds 'px' to numbers)
 * @param value Value to format
 * @returns Formatted CSS value
 */
function formatCSSValue(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

/**
 * Generate inline style string from CSS object
 * @param cssObject CSS properties object
 * @returns Inline style string
 */
export function cssObjectToString(cssObject: Record<string, string>): string {
  return Object.entries(cssObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
}

/**
 * Create a style element with nine-slice CSS
 * @param className Class name for the nine-slice element
 * @param options Border image options
 * @returns Created style element
 */
export function createNineSliceStyleElement(
  className: string,
  options: BorderImageOptions
): HTMLStyleElement {
  const css = generateBorderImageCSS(options);
  const styleContent = `.${className} { ${cssObjectToString(css)} }`;
  
  const styleElement = document.createElement('style');
  styleElement.textContent = styleContent;
  
  return styleElement;
}

/**
 * Generate fallback CSS for browsers without border-image support
 * @param imageUrl Background image URL
 * @param slices Slice dimensions
 * @returns Fallback CSS properties
 */
export function generateFallbackCSS(
  imageUrl: string,
  slices: { top: number; right: number; bottom: number; left: number }
): Record<string, string> {
  return {
    'background-image': `url("${imageUrl}")`,
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'padding': `${slices.top}px ${slices.right}px ${slices.bottom}px ${slices.left}px`
  };
}