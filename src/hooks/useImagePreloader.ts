/**
 * Hook for preloading images with loading state management
 */

import { useState, useEffect, useRef } from 'react';

export interface ImagePreloaderState {
  loaded: boolean;
  loading: boolean;
  error: string | null;
  progress: number; // 0-100
  loadedImages: Set<string>;
  failedImages: Set<string>;
}

export interface ImagePreloaderOptions {
  timeout?: number; // Timeout in milliseconds
  retryCount?: number; // Number of retry attempts
  retryDelay?: number; // Delay between retries in milliseconds
  concurrent?: number; // Max concurrent downloads
}

/**
 * Hook to preload multiple images with state management
 */
export function useImagePreloader(
  imageUrls: string[],
  options: ImagePreloaderOptions = {}
): ImagePreloaderState {
  const {
    timeout = 10000,
    retryCount = 2,
    retryDelay = 1000,
    concurrent = 4,
  } = options;
  
  const [state, setState] = useState<ImagePreloaderState>({
    loaded: false,
    loading: false,
    error: null,
    progress: 0,
    loadedImages: new Set(),
    failedImages: new Set(),
  });
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountsRef = useRef<Map<string, number>>(new Map());
  
  useEffect(() => {
    if (!imageUrls.length) {
      setState({
        loaded: true,
        loading: false,
        error: null,
        progress: 100,
        loadedImages: new Set(),
        failedImages: new Set(),
      });
      return;
    }
    
    // Cancel any ongoing preloading
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const abortSignal = abortControllerRef.current.signal;
    
    // Reset state
    setState(prev => ({
      ...prev,
      loaded: false,
      loading: true,
      error: null,
      progress: 0,
      loadedImages: new Set(),
      failedImages: new Set(),
    }));
    
    retryCountsRef.current.clear();
    
    // Load images with concurrency control
    loadImagesWithConcurrency(
      imageUrls,
      concurrent,
      timeout,
      retryCount,
      retryDelay,
      abortSignal,
      (progress, loadedImages, failedImages, error) => {
        if (abortSignal.aborted) return;
        
        setState({
          loaded: progress === 100,
          loading: progress < 100,
          error,
          progress,
          loadedImages: new Set(loadedImages),
          failedImages: new Set(failedImages),
        });
      }
    );
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [imageUrls, timeout, retryCount, retryDelay, concurrent]);
  
  return state;
}

/**
 * Load images with concurrency control
 */
async function loadImagesWithConcurrency(
  imageUrls: string[],
  concurrent: number,
  timeout: number,
  retryCount: number,
  retryDelay: number,
  abortSignal: AbortSignal,
  onProgress: (
    progress: number,
    loadedImages: string[],
    failedImages: string[],
    error: string | null
  ) => void
): Promise<void> {
  const loadedImages: string[] = [];
  const failedImages: string[] = [];
  let completed = 0;
  
  const updateProgress = () => {
    const progress = Math.round((completed / imageUrls.length) * 100);
    const error = failedImages.length === imageUrls.length 
      ? 'All images failed to load'
      : failedImages.length > 0
      ? `${failedImages.length} of ${imageUrls.length} images failed to load`
      : null;
    
    onProgress(progress, loadedImages, failedImages, error);
  };
  
  const loadImage = async (url: string, attempt: number = 0): Promise<void> => {
    if (abortSignal.aborted) return;
    
    return new Promise((resolve) => {
      const img = new Image();
      const timeoutId = setTimeout(() => {
        img.src = ''; // Cancel loading
        handleFailure();
      }, timeout);
      
      const handleSuccess = () => {
        clearTimeout(timeoutId);
        if (!abortSignal.aborted) {
          loadedImages.push(url);
          completed++;
          updateProgress();
        }
        resolve();
      };
      
      const handleFailure = async () => {
        clearTimeout(timeoutId);
        
        if (attempt < retryCount && !abortSignal.aborted) {
          // Retry after delay
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          if (!abortSignal.aborted) {
            await loadImage(url, attempt + 1);
          }
        } else {
          if (!abortSignal.aborted) {
            failedImages.push(url);
            completed++;
            updateProgress();
          }
        }
        resolve();
      };
      
      img.onload = handleSuccess;
      img.onerror = handleFailure;
      img.onabort = handleFailure;
      
      // Set crossOrigin to handle CORS
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  };
  
  // Process images in batches with concurrency limit
  const batches: string[][] = [];
  for (let i = 0; i < imageUrls.length; i += concurrent) {
    batches.push(imageUrls.slice(i, i + concurrent));
  }
  
  for (const batch of batches) {
    if (abortSignal.aborted) break;
    
    await Promise.all(
      batch.map(url => loadImage(url))
    );
  }
}

/**
 * Hook to preload a single image
 */
export function useImagePreload(
  imageUrl: string | null,
  options: ImagePreloaderOptions = {}
) {
  const urls = imageUrl ? [imageUrl] : [];
  const state = useImagePreloader(urls, options);
  
  return {
    loaded: state.loaded,
    loading: state.loading,
    error: state.error,
  };
}

/**
 * Utility function to preload images imperatively
 */
export function preloadImages(
  imageUrls: string[],
  options: ImagePreloaderOptions = {}
): Promise<{
  loadedImages: string[];
  failedImages: string[];
}> {
  const {
    timeout = 10000,
    retryCount = 2,
    retryDelay = 1000,
    concurrent = 4,
  } = options;
  
  return new Promise((resolve, reject) => {
    const abortController = new AbortController();
    
    loadImagesWithConcurrency(
      imageUrls,
      concurrent,
      timeout,
      retryCount,
      retryDelay,
      abortController.signal,
      (progress, loadedImages, failedImages, error) => {
        if (progress === 100) {
          resolve({ loadedImages, failedImages });
        }
      }
    ).catch(reject);
  });
}

export default useImagePreloader;