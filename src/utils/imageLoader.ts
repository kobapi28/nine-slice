/**
 * Image loading and caching utilities
 */

// Cache for loaded images
const imageCache = new Map<string, HTMLImageElement>();

/**
 * Preload multiple images and cache them
 * @param urls Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export async function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  const promises = urls.map(url => loadImage(url));
  return Promise.all(promises);
}

/**
 * Load a single image with caching
 * @param url Image URL to load
 * @returns Promise that resolves with the loaded image
 */
export async function loadImage(url: string): Promise<HTMLImageElement> {
  // Check cache first
  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`));
    };
    
    img.src = url;
  });
}

/**
 * Clear the image cache
 */
export function clearImageCache(): void {
  imageCache.clear();
}

/**
 * Remove a specific image from cache
 * @param url URL of the image to remove from cache
 */
export function removeFromCache(url: string): boolean {
  return imageCache.delete(url);
}

/**
 * Get the size of the image cache
 * @returns Number of cached images
 */
export function getCacheSize(): number {
  return imageCache.size;
}

/**
 * Check if an image is cached
 * @param url URL of the image to check
 * @returns Whether the image is in cache
 */
export function isImageCached(url: string): boolean {
  return imageCache.has(url);
}