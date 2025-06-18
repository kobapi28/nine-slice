/**
 * Logic for slicing images into 9 parts
 */

export interface SliceCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NineSliceRegions {
  topLeft: SliceCoordinates;
  topCenter: SliceCoordinates;
  topRight: SliceCoordinates;
  middleLeft: SliceCoordinates;
  middleCenter: SliceCoordinates;
  middleRight: SliceCoordinates;
  bottomLeft: SliceCoordinates;
  bottomCenter: SliceCoordinates;
  bottomRight: SliceCoordinates;
}

/**
 * Calculate the coordinates for each of the 9 slices
 * @param imageWidth Total width of the source image
 * @param imageHeight Total height of the source image
 * @param top Top slice size
 * @param right Right slice size
 * @param bottom Bottom slice size
 * @param left Left slice size
 * @returns Object containing coordinates for all 9 regions
 */
export function calculateSlices(
  imageWidth: number,
  imageHeight: number,
  top: number,
  right: number,
  bottom: number,
  left: number
): NineSliceRegions {
  // Validate inputs
  if (left + right > imageWidth) {
    throw new Error('Left and right slices exceed image width');
  }
  if (top + bottom > imageHeight) {
    throw new Error('Top and bottom slices exceed image height');
  }

  const centerWidth = imageWidth - left - right;
  const centerHeight = imageHeight - top - bottom;

  return {
    // Top row
    topLeft: {
      x: 0,
      y: 0,
      width: left,
      height: top
    },
    topCenter: {
      x: left,
      y: 0,
      width: centerWidth,
      height: top
    },
    topRight: {
      x: imageWidth - right,
      y: 0,
      width: right,
      height: top
    },
    
    // Middle row
    middleLeft: {
      x: 0,
      y: top,
      width: left,
      height: centerHeight
    },
    middleCenter: {
      x: left,
      y: top,
      width: centerWidth,
      height: centerHeight
    },
    middleRight: {
      x: imageWidth - right,
      y: top,
      width: right,
      height: centerHeight
    },
    
    // Bottom row
    bottomLeft: {
      x: 0,
      y: imageHeight - bottom,
      width: left,
      height: bottom
    },
    bottomCenter: {
      x: left,
      y: imageHeight - bottom,
      width: centerWidth,
      height: bottom
    },
    bottomRight: {
      x: imageWidth - right,
      y: imageHeight - bottom,
      width: right,
      height: bottom
    }
  };
}

/**
 * Calculate slice values from percentage or pixel values
 * @param value String value (e.g., "20px", "10%") or number
 * @param totalSize Total size (width or height) for percentage calculations
 * @returns Calculated pixel value
 */
export function parseSliceValue(value: string | number, totalSize: number): number {
  if (typeof value === 'number') {
    return value;
  }

  const trimmed = value.trim();
  
  if (trimmed.endsWith('px')) {
    return parseInt(trimmed.slice(0, -2), 10) || 0;
  }
  
  if (trimmed.endsWith('%')) {
    const percentage = parseInt(trimmed.slice(0, -1), 10) || 0;
    return Math.round((percentage / 100) * totalSize);
  }
  
  // Default to parsing as number
  return parseInt(trimmed, 10) || 0;
}

/**
 * Normalize slice values to ensure they don't exceed image dimensions
 * @param slices Object containing top, right, bottom, left values
 * @param imageWidth Image width
 * @param imageHeight Image height
 * @returns Normalized slice values
 */
export function normalizeSlices(
  slices: { top: number; right: number; bottom: number; left: number },
  imageWidth: number,
  imageHeight: number
): { top: number; right: number; bottom: number; left: number } {
  let { top, right, bottom, left } = slices;

  // Ensure horizontal slices don't exceed image width
  if (left + right > imageWidth) {
    const scale = imageWidth / (left + right);
    left = Math.floor(left * scale);
    right = Math.floor(right * scale);
  }

  // Ensure vertical slices don't exceed image height
  if (top + bottom > imageHeight) {
    const scale = imageHeight / (top + bottom);
    top = Math.floor(top * scale);
    bottom = Math.floor(bottom * scale);
  }

  return { top, right, bottom, left };
}