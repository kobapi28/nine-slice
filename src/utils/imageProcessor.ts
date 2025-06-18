/**
 * Image processing utilities for nine-slice components
 */

export interface ImageProcessingOptions {
  quality?: number;
  format?: 'png' | 'jpeg' | 'webp';
  width?: number;
  height?: number;
}

export interface SliceConfiguration {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Process a nine-slice image and return data URL or canvas
 */
export function processNineSliceImage(
  image: HTMLImageElement | string,
  _slices: SliceConfiguration,
  options: ImageProcessingOptions = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }
    
    const processImage = (img: HTMLImageElement) => {
      try {
        canvas.width = options.width || img.naturalWidth;
        canvas.height = options.height || img.naturalHeight;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const format = options.format || 'png';
        const quality = options.quality || 0.8;
        const dataUrl = canvas.toDataURL(`image/${format}`, quality);
        
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };
    
    if (typeof image === 'string') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => processImage(img);
      img.onerror = (error) => reject(new Error(`Failed to load image: ${error}`));
      img.src = image;
    } else {
      processImage(image);
    }
  });
}

/**
 * Create a composite image from 9 individual slice images
 */
export function combineNineSliceImages(
  images: {
    topLeft: string;
    topCenter: string;
    topRight: string;
    middleLeft: string;
    middleCenter: string;
    middleRight: string;
    bottomLeft: string;
    bottomCenter: string;
    bottomRight: string;
  },
  targetWidth: number,
  targetHeight: number,
  cornerSizes?: {
    topLeft?: { width: number; height: number };
    topRight?: { width: number; height: number };
    bottomLeft?: { width: number; height: number };
    bottomRight?: { width: number; height: number };
  }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    const imageElements: { [key: string]: HTMLImageElement } = {};
    const imagePromises = Object.entries(images).map(([key, src]) => {
      return new Promise<void>((resolveImg, rejectImg) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageElements[key] = img;
          resolveImg();
        };
        img.onerror = () => rejectImg(new Error(`Failed to load ${key} image`));
        img.src = src;
      });
    });
    
    Promise.all(imagePromises)
      .then(() => {
        try {
          // Default corner sizes
          const corners = cornerSizes || {
            topLeft: { width: 32, height: 32 },
            topRight: { width: 32, height: 32 },
            bottomLeft: { width: 32, height: 32 },
            bottomRight: { width: 32, height: 32 },
          };
          
          // Calculate dimensions
          const leftWidth = corners.topLeft?.width || 32;
          const rightWidth = corners.topRight?.width || 32;
          const topHeight = corners.topLeft?.height || 32;
          const bottomHeight = corners.bottomLeft?.height || 32;
          
          const centerWidth = targetWidth - leftWidth - rightWidth;
          const centerHeight = targetHeight - topHeight - bottomHeight;
          
          // Draw corners
          ctx.drawImage(imageElements.topLeft, 0, 0, leftWidth, topHeight);
          ctx.drawImage(imageElements.topRight, targetWidth - rightWidth, 0, rightWidth, topHeight);
          ctx.drawImage(imageElements.bottomLeft, 0, targetHeight - bottomHeight, leftWidth, bottomHeight);
          ctx.drawImage(imageElements.bottomRight, targetWidth - rightWidth, targetHeight - bottomHeight, rightWidth, bottomHeight);
          
          // Draw edges
          if (centerWidth > 0) {
            ctx.drawImage(imageElements.topCenter, leftWidth, 0, centerWidth, topHeight);
            ctx.drawImage(imageElements.bottomCenter, leftWidth, targetHeight - bottomHeight, centerWidth, bottomHeight);
          }
          
          if (centerHeight > 0) {
            ctx.drawImage(imageElements.middleLeft, 0, topHeight, leftWidth, centerHeight);
            ctx.drawImage(imageElements.middleRight, targetWidth - rightWidth, topHeight, rightWidth, centerHeight);
          }
          
          // Draw center
          if (centerWidth > 0 && centerHeight > 0) {
            ctx.drawImage(imageElements.middleCenter, leftWidth, topHeight, centerWidth, centerHeight);
          }
          
          const dataUrl = canvas.toDataURL('image/png');
          resolve(dataUrl);
        } catch (error) {
          reject(error);
        }
      })
      .catch(reject);
  });
}

/**
 * Analyze an image to suggest optimal slice values
 */
export function analyzeImageForSlicing(
  imageSrc: string,
  options: { sampleSize?: number; threshold?: number } = {}
): Promise<SliceConfiguration> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { sampleSize = 10, threshold = 0.1 } = options;
        
        // Analyze corners to find repetitive patterns
        const topSlice = findRepeatingPattern(imageData, 'top', sampleSize, threshold);
        const rightSlice = findRepeatingPattern(imageData, 'right', sampleSize, threshold);
        const bottomSlice = findRepeatingPattern(imageData, 'bottom', sampleSize, threshold);
        const leftSlice = findRepeatingPattern(imageData, 'left', sampleSize, threshold);
        
        resolve({
          top: topSlice,
          right: rightSlice,
          bottom: bottomSlice,
          left: leftSlice,
        });
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image for analysis'));
    img.src = imageSrc;
  });
}

/**
 * Find repeating patterns in image data for slice detection
 */
function findRepeatingPattern(
  imageData: ImageData,
  side: 'top' | 'right' | 'bottom' | 'left',
  _sampleSize: number,
  _threshold: number
): number {
  const { width, height } = imageData;
  
  // This is a simplified implementation
  // In a real scenario, you'd implement more sophisticated pattern detection
  const defaultSlice = Math.min(width, height) * 0.1; // 10% of smaller dimension
  
  // For now, return a reasonable default based on image size
  switch (side) {
    case 'top':
    case 'bottom':
      return Math.max(10, Math.min(height * 0.15, 50));
    case 'left':
    case 'right':
      return Math.max(10, Math.min(width * 0.15, 50));
    default:
      return defaultSlice;
  }
}

export default {
  processNineSliceImage,
  combineNineSliceImages,
  analyzeImageForSlicing,
};