import React, { useMemo, CSSProperties } from 'react';
// import { processNineSliceImage } from '../../utils/imageProcessor';
import { validateSlices } from '../../utils/validation';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import { NineSliceProps as BaseNineSliceProps, ScalingMode } from '../../types/common';
import styles from './NineSlice.module.css';

export interface NineSliceProps extends BaseNineSliceProps {
  // Additional props for backwards compatibility
  image?: string; // Maps to 'src' prop
  fill?: ScalingMode; // Maps to 'edgeMode' prop
  contentPadding?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export const NineSlice: React.FC<NineSliceProps> = ({
  // Support both new and legacy prop names
  image,
  src,
  images,
  slices = { top: 0, right: 0, bottom: 0, left: 0 },
  width = '100%',
  height = 'auto',
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  fill = 'stretch',
  edgeMode,
  centerMode: _centerMode,
  renderMode = 'css',
  children,
  contentPadding = 0,
  className,
  style,
  onLoad,
  onError,
  ...rest
}) => {
  // Resolve prop conflicts (new props take precedence)
  const imageSrc = src || image;
  const scalingMode = edgeMode || fill || 'stretch';
  // Validate props
  if (!imageSrc && !images) {
    throw new Error('NineSlice: Either "src"/"image" or "images" prop must be provided');
  }
  
  if (imageSrc && images) {
    throw new Error('NineSlice: Cannot provide both "src"/"image" and "images" props');
  }
  
  if (renderMode !== 'css' && renderMode !== 'auto') {
    throw new Error('NineSlice: Only "css" and "auto" render modes are currently supported');
  }
  
  // Prepare image URLs for preloading
  const imageUrls = useMemo(() => {
    if (imageSrc) {
      return [imageSrc];
    }
    if (images) {
      return Object.values(images);
    }
    return [];
  }, [imageSrc, images]);
  
  // Preload images
  const { loaded, error } = useImagePreloader(imageUrls);
  
  // Handle loading states
  React.useEffect(() => {
    if (loaded && onLoad) {
      onLoad();
    }
  }, [loaded, onLoad]);
  
  React.useEffect(() => {
    if (error && onError) {
      onError(new Error(error));
    }
  }, [error, onError]);
  
  // Calculate padding
  const paddingStyle = useMemo(() => {
    if (typeof contentPadding === 'number') {
      return {
        padding: contentPadding,
      };
    }
    return {
      paddingTop: contentPadding.top || 0,
      paddingRight: contentPadding.right || 0,
      paddingBottom: contentPadding.bottom || 0,
      paddingLeft: contentPadding.left || 0,
    };
  }, [contentPadding]);
  
  // Generate border-image style for single image mode
  const borderImageStyle = useMemo(() => {
    if (!imageSrc || !loaded) return {};
    
    try {
      // Handle different slice config formats
      let normalizedSlices;
      if (typeof slices === 'number') {
        normalizedSlices = { top: slices, right: slices, bottom: slices, left: slices };
      } else {
        normalizedSlices = slices;
      }
      
      // Validate slices
      const validation = validateSlices(normalizedSlices);
      if (!validation.isValid) {
        throw new Error(`Invalid slices: ${validation.errors.join(', ')}`);
      }
      
      // Create border-image CSS
      const { top, right, bottom, left } = normalizedSlices;
      const borderImageSlice = `${top} ${right} ${bottom} ${left}`;
      const borderImageWidth = `${top}px ${right}px ${bottom}px ${left}px`;
      
      return {
        borderImage: `url(${imageSrc}) ${borderImageSlice} fill`,
        borderImageSlice: borderImageSlice,
        borderImageWidth: borderImageWidth,
        borderImageRepeat: scalingMode === 'stretch' ? 'stretch' : scalingMode,
        borderStyle: 'solid',
        borderColor: 'transparent',
      };
    } catch (err) {
      if (onError) {
        onError(err as Error);
      }
      return {};
    }
  }, [imageSrc, slices, scalingMode, loaded, onError]);
  
  // Generate grid-based style for 9 images mode
  const gridStyle = useMemo(() => {
    if (!images || !loaded) return {};
    
    // This would be implemented with a CSS grid layout
    // For now, we'll use border-image with a composite image
    // In a real implementation, you might use a canvas to combine the 9 images
    console.warn('NineSlice: 9-image mode is not fully implemented yet');
    return {};
  }, [images, loaded]);
  
  // Combine all styles
  const containerStyle: CSSProperties = {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    ...paddingStyle,
    ...(imageSrc ? borderImageStyle : gridStyle),
    ...style,
  };
  
  // Show loading state
  if (!loaded) {
    return (
      <div 
        className={`${styles.nineSlice} ${styles.loading} ${className || ''}`}
        style={containerStyle}
      >
        {children}
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div 
        className={`${styles.nineSlice} ${styles.error} ${className || ''}`}
        style={containerStyle}
      >
        {children || <span className={styles.errorText}>Failed to load image</span>}
      </div>
    );
  }
  
  return (
    <div 
      className={`${styles.nineSlice} ${className || ''}`}
      style={containerStyle}
      {...rest}
    >
      {children}
    </div>
  );
};

export default NineSlice;