import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock Image constructor for preloading tests
class MockImage {
  public src: string = '';
  public crossOrigin: string | null = null;
  public onload: ((event: Event) => void) | null = null;
  public onerror: ((event: string | Event) => void) | null = null;
  public onabort: ((event: Event) => void) | null = null;

  constructor() {
    // Simulate async image loading
    setTimeout(() => {
      if (this.src && this.onload) {
        this.onload(new Event('load'));
      }
    }, 100);
  }
}

// Replace the global Image constructor
global.Image = MockImage as any;

// Mock CSS.supports for border-image tests
Object.defineProperty(CSS, 'supports', {
  value: vi.fn((property: string, value: string) => {
    return property === 'border-image' || property === 'border-image-slice';
  }),
  writable: true,
});

// Mock console methods to avoid test noise
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
  console.warn = vi.fn();
  console.error = vi.fn();
});

afterEach(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});