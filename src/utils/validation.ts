/**
 * Validation utilities for nine-slice components
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface SliceConfiguration {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Validate slice configuration
 */
export function validateSlices(
  slices: SliceConfiguration,
  imageDimensions?: ImageDimensions
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for negative values
  Object.entries(slices).forEach(([key, value]) => {
    if (value < 0) {
      errors.push(`${key} slice cannot be negative (got ${value})`);
    }
  });
  
  // Check for non-numeric values
  Object.entries(slices).forEach(([key, value]) => {
    if (typeof value !== 'number' || !isFinite(value)) {
      errors.push(`${key} slice must be a finite number (got ${value})`);
    }
  });
  
  // Check against image dimensions if provided
  if (imageDimensions) {
    const { width, height } = imageDimensions;
    
    // Check horizontal slices don't exceed image width
    if (slices.left + slices.right >= width) {
      errors.push(`Combined left (${slices.left}) and right (${slices.right}) slices exceed image width (${width})`);
    }
    
    // Check vertical slices don't exceed image height
    if (slices.top + slices.bottom >= height) {
      errors.push(`Combined top (${slices.top}) and bottom (${slices.bottom}) slices exceed image height (${height})`);
    }
    
    // Warnings for potentially problematic values
    if (slices.left > width * 0.4) {
      warnings.push(`Left slice (${slices.left}) is more than 40% of image width (${width})`);
    }
    
    if (slices.right > width * 0.4) {
      warnings.push(`Right slice (${slices.right}) is more than 40% of image width (${width})`);
    }
    
    if (slices.top > height * 0.4) {
      warnings.push(`Top slice (${slices.top}) is more than 40% of image height (${height})`);
    }
    
    if (slices.bottom > height * 0.4) {
      warnings.push(`Bottom slice (${slices.bottom}) is more than 40% of image height (${height})`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate image URLs
 */
export function validateImageUrls(urls: string[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  urls.forEach((url, index) => {
    if (!url || typeof url !== 'string') {
      errors.push(`Image URL at index ${index} is not a valid string`);
      return;
    }
    
    if (url.trim() === '') {
      errors.push(`Image URL at index ${index} is empty`);
      return;
    }
    
    // Check for valid URL format
    try {
      new URL(url);
    } catch {
      // Could be a relative path, check if it looks reasonable
      if (!url.startsWith('/') && !url.startsWith('./') && !url.startsWith('../')) {
        warnings.push(`Image URL at index ${index} may not be a valid path: ${url}`);
      }
    }
    
    // Check for common image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const hasImageExtension = imageExtensions.some(ext => 
      url.toLowerCase().includes(ext)
    );
    
    if (!hasImageExtension) {
      warnings.push(`Image URL at index ${index} doesn't have a common image file extension: ${url}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate component props
 */
export function validateNineSliceProps(props: {
  image?: string;
  images?: Record<string, string>;
  slices?: SliceConfiguration;
  width?: number | string;
  height?: number | string;
  fill?: string;
  renderMode?: string;
}): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check that either image or images is provided
  if (!props.image && !props.images) {
    errors.push('Either "image" or "images" prop must be provided');
  }
  
  // Check that both image and images are not provided
  if (props.image && props.images) {
    errors.push('Cannot provide both "image" and "images" props');
  }
  
  // Validate single image
  if (props.image) {
    const imageValidation = validateImageUrls([props.image]);
    errors.push(...imageValidation.errors);
    warnings.push(...imageValidation.warnings);
  }
  
  // Validate 9-slice images
  if (props.images) {
    const requiredKeys = [
      'topLeft', 'topCenter', 'topRight',
      'middleLeft', 'middleCenter', 'middleRight',
      'bottomLeft', 'bottomCenter', 'bottomRight'
    ];
    
    const providedKeys = Object.keys(props.images);
    const missingKeys = requiredKeys.filter(key => !providedKeys.includes(key));
    
    if (missingKeys.length > 0) {
      errors.push(`Missing required image keys: ${missingKeys.join(', ')}`);
    }
    
    const imageValidation = validateImageUrls(Object.values(props.images));
    errors.push(...imageValidation.errors);
    warnings.push(...imageValidation.warnings);
  }
  
  // Validate slices
  if (props.slices) {
    const sliceValidation = validateSlices(props.slices);
    errors.push(...sliceValidation.errors);
    warnings.push(...sliceValidation.warnings);
  }
  
  // Validate dimensions
  if (props.width !== undefined) {
    if (typeof props.width === 'number' && (props.width < 0 || !isFinite(props.width))) {
      errors.push('Width must be a positive finite number');
    }
    if (typeof props.width === 'string' && props.width.trim() === '') {
      errors.push('Width string cannot be empty');
    }
  }
  
  if (props.height !== undefined) {
    if (typeof props.height === 'number' && (props.height < 0 || !isFinite(props.height))) {
      errors.push('Height must be a positive finite number');
    }
    if (typeof props.height === 'string' && props.height.trim() === '') {
      errors.push('Height string cannot be empty');
    }
  }
  
  // Validate fill mode
  if (props.fill && !['stretch', 'repeat', 'round', 'space'].includes(props.fill)) {
    errors.push(`Invalid fill mode: ${props.fill}. Must be one of: stretch, repeat, round, space`);
  }
  
  // Validate render mode
  if (props.renderMode && !['css', 'canvas'].includes(props.renderMode)) {
    errors.push(`Invalid render mode: ${props.renderMode}. Must be one of: css, canvas`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate browser compatibility for nine-slice features
 */
export function validateBrowserSupport(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for border-image support
  if (typeof CSS !== 'undefined' && CSS.supports) {
    if (!CSS.supports('border-image', 'url(test.png) 10 fill')) {
      warnings.push('Browser may not fully support border-image with fill');
    }
  } else {
    warnings.push('Cannot detect CSS feature support in this environment');
  }
  
  // Check for canvas support
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      warnings.push('Canvas 2D context not available');
    }
  } catch {
    warnings.push('Canvas element not supported');
  }
  
  return {
    isValid: true, // Browser compatibility issues are warnings, not errors
    errors,
    warnings,
  };
}

export default {
  validateSlices,
  validateImageUrls,
  validateNineSliceProps,
  validateBrowserSupport,
};