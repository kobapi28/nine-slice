import {
  calculateSlices,
  parseSliceValue,
  normalizeSlices,
  SliceCoordinates,
  NineSliceRegions
} from './slicing';

describe('slicing', () => {
  describe('calculateSlices', () => {
    it('calculates slices correctly for valid inputs', () => {
      const result = calculateSlices(100, 80, 10, 15, 12, 8);
      
      // Check dimensions
      expect(result.topLeft.width).toBe(8);
      expect(result.topLeft.height).toBe(10);
      expect(result.topCenter.width).toBe(77); // 100 - 8 - 15
      expect(result.topCenter.height).toBe(10);
      expect(result.topRight.width).toBe(15);
      expect(result.topRight.height).toBe(10);
      
      expect(result.middleLeft.width).toBe(8);
      expect(result.middleLeft.height).toBe(58); // 80 - 10 - 12
      expect(result.middleCenter.width).toBe(77);
      expect(result.middleCenter.height).toBe(58);
      expect(result.middleRight.width).toBe(15);
      expect(result.middleRight.height).toBe(58);
      
      expect(result.bottomLeft.width).toBe(8);
      expect(result.bottomLeft.height).toBe(12);
      expect(result.bottomCenter.width).toBe(77);
      expect(result.bottomCenter.height).toBe(12);
      expect(result.bottomRight.width).toBe(15);
      expect(result.bottomRight.height).toBe(12);
    });

    it('calculates correct positions', () => {
      const result = calculateSlices(100, 80, 10, 15, 12, 8);
      
      // Top row
      expect(result.topLeft.x).toBe(0);
      expect(result.topLeft.y).toBe(0);
      expect(result.topCenter.x).toBe(8);
      expect(result.topCenter.y).toBe(0);
      expect(result.topRight.x).toBe(85); // 100 - 15
      expect(result.topRight.y).toBe(0);
      
      // Middle row
      expect(result.middleLeft.x).toBe(0);
      expect(result.middleLeft.y).toBe(10);
      expect(result.middleCenter.x).toBe(8);
      expect(result.middleCenter.y).toBe(10);
      expect(result.middleRight.x).toBe(85);
      expect(result.middleRight.y).toBe(10);
      
      // Bottom row
      expect(result.bottomLeft.x).toBe(0);
      expect(result.bottomLeft.y).toBe(68); // 80 - 12
      expect(result.bottomCenter.x).toBe(8);
      expect(result.bottomCenter.y).toBe(68);
      expect(result.bottomRight.x).toBe(85);
      expect(result.bottomRight.y).toBe(68);
    });

    it('throws error when horizontal slices exceed image width', () => {
      expect(() => {
        calculateSlices(100, 80, 10, 60, 12, 50); // 60 + 50 = 110 > 100
      }).toThrow('Left and right slices exceed image width');
    });

    it('throws error when vertical slices exceed image height', () => {
      expect(() => {
        calculateSlices(100, 80, 50, 15, 40, 8); // 50 + 40 = 90 > 80
      }).toThrow('Top and bottom slices exceed image height');
    });

    it('handles edge case where slices equal image dimensions', () => {
      const result = calculateSlices(100, 80, 40, 50, 40, 50);
      
      expect(result.topCenter.width).toBe(0); // 100 - 50 - 50
      expect(result.middleCenter.width).toBe(0);
      expect(result.bottomCenter.width).toBe(0);
      
      expect(result.middleLeft.height).toBe(0); // 80 - 40 - 40
      expect(result.middleCenter.height).toBe(0);
      expect(result.middleRight.height).toBe(0);
    });

    it('handles zero slice values', () => {
      const result = calculateSlices(100, 80, 0, 0, 0, 0);
      
      expect(result.topLeft.width).toBe(0);
      expect(result.topLeft.height).toBe(0);
      expect(result.topCenter.width).toBe(100);
      expect(result.topCenter.height).toBe(0);
      expect(result.middleCenter.width).toBe(100);
      expect(result.middleCenter.height).toBe(80);
    });
  });

  describe('parseSliceValue', () => {
    it('returns number values as-is', () => {
      expect(parseSliceValue(10, 100)).toBe(10);
      expect(parseSliceValue(0, 100)).toBe(0);
      expect(parseSliceValue(-5, 100)).toBe(-5);
      expect(parseSliceValue(3.14, 100)).toBe(3.14);
    });

    it('parses pixel values', () => {
      expect(parseSliceValue('20px', 100)).toBe(20);
      expect(parseSliceValue('0px', 100)).toBe(0);
      expect(parseSliceValue('100px', 100)).toBe(100);
      expect(parseSliceValue('  15px  ', 100)).toBe(15);
    });

    it('parses percentage values', () => {
      expect(parseSliceValue('10%', 100)).toBe(10);
      expect(parseSliceValue('50%', 200)).toBe(100);
      expect(parseSliceValue('25%', 80)).toBe(20);
      expect(parseSliceValue('0%', 100)).toBe(0);
      expect(parseSliceValue('100%', 50)).toBe(50);
    });

    it('rounds percentage calculations', () => {
      expect(parseSliceValue('33%', 100)).toBe(33);
      expect(parseSliceValue('33%', 101)).toBe(33); // 33.33 rounded to 33
    });

    it('parses plain number strings', () => {
      expect(parseSliceValue('25', 100)).toBe(25);
      expect(parseSliceValue('0', 100)).toBe(0);
      expect(parseSliceValue('100', 100)).toBe(100);
    });

    it('returns 0 for invalid strings', () => {
      expect(parseSliceValue('invalid', 100)).toBe(0);
      expect(parseSliceValue('', 100)).toBe(0);
      expect(parseSliceValue('   ', 100)).toBe(0);
      expect(parseSliceValue('px', 100)).toBe(0); // parseInt('', 10) returns NaN, || 0 makes it 0
      expect(parseSliceValue('%', 100)).toBe(0);  // parseInt('', 10) returns NaN, || 0 makes it 0
    });

    it('handles whitespace correctly', () => {
      expect(parseSliceValue('  20px  ', 100)).toBe(20);
      expect(parseSliceValue('  50%  ', 100)).toBe(50);
      expect(parseSliceValue('  25  ', 100)).toBe(25);
    });
  });

  describe('normalizeSlices', () => {
    it('returns slices unchanged when within bounds', () => {
      const slices = { top: 10, right: 15, bottom: 20, left: 25 };
      const result = normalizeSlices(slices, 100, 80);
      
      expect(result).toEqual(slices);
    });

    it('scales horizontal slices when they exceed width', () => {
      const slices = { top: 10, right: 60, bottom: 20, left: 50 }; // 60 + 50 = 110 > 100
      const result = normalizeSlices(slices, 100, 80);
      
      // Scale factor: 100 / 110 ≈ 0.909
      expect(result.left).toBe(45); // Math.floor(50 * 0.909)
      expect(result.right).toBe(54); // Math.floor(60 * 0.909)
      expect(result.top).toBe(10); // unchanged
      expect(result.bottom).toBe(20); // unchanged
    });

    it('scales vertical slices when they exceed height', () => {
      const slices = { top: 50, right: 15, bottom: 40, left: 25 }; // 50 + 40 = 90 > 80
      const result = normalizeSlices(slices, 100, 80);
      
      // Scale factor: 80 / 90 ≈ 0.889
      expect(result.top).toBe(44); // Math.floor(50 * 0.889)
      expect(result.bottom).toBe(35); // Math.floor(40 * 0.889)
      expect(result.left).toBe(25); // unchanged
      expect(result.right).toBe(15); // unchanged
    });

    it('scales both dimensions when necessary', () => {
      const slices = { top: 50, right: 60, bottom: 40, left: 50 };
      const result = normalizeSlices(slices, 100, 80);
      
      // Horizontal scale: 100 / 110 ≈ 0.909
      // Vertical scale: 80 / 90 ≈ 0.889
      expect(result.left).toBe(45);
      expect(result.right).toBe(54);
      expect(result.top).toBe(44);
      expect(result.bottom).toBe(35);
    });

    it('handles zero dimensions gracefully', () => {
      const slices = { top: 10, right: 10, bottom: 10, left: 10 };
      const result = normalizeSlices(slices, 0, 0);
      
      expect(result.top).toBe(0);
      expect(result.right).toBe(0);
      expect(result.bottom).toBe(0);
      expect(result.left).toBe(0);
    });

    it('handles zero slice values', () => {
      const slices = { top: 0, right: 0, bottom: 0, left: 0 };
      const result = normalizeSlices(slices, 100, 80);
      
      expect(result).toEqual(slices);
    });

    it('handles single large slice', () => {
      const slices = { top: 0, right: 150, bottom: 0, left: 0 }; // 150 > 100
      const result = normalizeSlices(slices, 100, 80);
      
      expect(result.right).toBe(100); // Math.floor(150 * (100/150))
      expect(result.left).toBe(0);
      expect(result.top).toBe(0);
      expect(result.bottom).toBe(0);
    });

    it('preserves aspect ratio during scaling', () => {
      const slices = { top: 30, right: 40, bottom: 60, left: 80 }; // total: 120 horizontal, 90 vertical
      const result = normalizeSlices(slices, 100, 80);
      
      // Horizontal scale: 100/120 = 0.833...
      // Vertical scale: 80/90 = 0.888...
      const horizontalScale = 100 / 120;
      const verticalScale = 80 / 90;
      
      expect(result.left).toBe(Math.floor(80 * horizontalScale));
      expect(result.right).toBe(Math.floor(40 * horizontalScale));
      expect(result.top).toBe(Math.floor(30 * verticalScale));
      expect(result.bottom).toBe(Math.floor(60 * verticalScale));
    });
  });

  describe('type definitions', () => {
    it('SliceCoordinates has correct properties', () => {
      const coord: SliceCoordinates = {
        x: 0,
        y: 0,
        width: 100,
        height: 50
      };
      
      expect(typeof coord.x).toBe('number');
      expect(typeof coord.y).toBe('number');
      expect(typeof coord.width).toBe('number');
      expect(typeof coord.height).toBe('number');
    });

    it('NineSliceRegions has all required regions', () => {
      const regions: NineSliceRegions = calculateSlices(100, 100, 10, 10, 10, 10);
      
      expect(regions).toHaveProperty('topLeft');
      expect(regions).toHaveProperty('topCenter');
      expect(regions).toHaveProperty('topRight');
      expect(regions).toHaveProperty('middleLeft');
      expect(regions).toHaveProperty('middleCenter');
      expect(regions).toHaveProperty('middleRight');
      expect(regions).toHaveProperty('bottomLeft');
      expect(regions).toHaveProperty('bottomCenter');
      expect(regions).toHaveProperty('bottomRight');
    });
  });

  describe('edge cases', () => {
    it('handles very small images', () => {
      const result = calculateSlices(10, 10, 2, 2, 2, 2);
      
      expect(result.topCenter.width).toBe(6); // 10 - 2 - 2
      expect(result.middleCenter.height).toBe(6); // 10 - 2 - 2
    });

    it('handles very large slice values that need normalization', () => {
      const slices = { top: 1000, right: 1000, bottom: 1000, left: 1000 };
      const result = normalizeSlices(slices, 100, 100);
      
      // Should be scaled down significantly
      expect(result.left + result.right).toBeLessThanOrEqual(100);
      expect(result.top + result.bottom).toBeLessThanOrEqual(100);
    });

    it('handles decimal slice values', () => {
      const result = calculateSlices(100, 100, 10.5, 15.7, 12.3, 8.9);
      
      expect(result.topLeft.width).toBe(8.9);
      expect(result.topLeft.height).toBe(10.5);
      expect(result.topCenter.width).toBeCloseTo(75.4); // 100 - 8.9 - 15.7
    });
  });
});