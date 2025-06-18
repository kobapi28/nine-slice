/**
 * General helper functions
 */

/**
 * Merge multiple class names, filtering out falsy values
 * @param classes Class names to merge
 * @returns Merged class name string
 */
export function mergeClassNames(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}

/**
 * Debounce a function call
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
}

/**
 * Throttle a function call
 * @param func Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Clamp a number between min and max values
 * @param value Value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a unique ID
 * @param prefix Optional prefix for the ID
 * @returns Unique ID string
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if a value is a valid number
 * @param value Value to check
 * @returns Whether the value is a valid number
 */
export function isValidNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Parse a size value (number, string with px/%, etc.)
 * @param size Size value to parse
 * @param relativeTo Optional value for percentage calculations
 * @returns Parsed size in pixels
 */
export function parseSize(size: string | number, relativeTo?: number): number {
  if (typeof size === 'number') {
    return size;
  }

  const trimmed = size.trim();
  
  if (trimmed.endsWith('px')) {
    return parseFloat(trimmed.slice(0, -2));
  }
  
  if (trimmed.endsWith('%') && relativeTo !== undefined) {
    const percentage = parseFloat(trimmed.slice(0, -1));
    return (percentage / 100) * relativeTo;
  }
  
  if (trimmed.endsWith('em') && relativeTo !== undefined) {
    const ems = parseFloat(trimmed.slice(0, -2));
    return ems * relativeTo;
  }
  
  return parseFloat(trimmed) || 0;
}

/**
 * Deep clone an object
 * @param obj Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }
  
  if (obj instanceof Object) {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  
  return obj;
}

/**
 * Check if two objects are deeply equal
 * @param a First object
 * @param b Second object
 * @returns Whether objects are equal
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  
  return true;
}