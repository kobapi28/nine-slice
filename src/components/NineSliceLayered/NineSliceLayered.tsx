import React, { useMemo, CSSProperties, ReactNode } from 'react';
import { NineSliceLayer } from './NineSliceLayer';
import styles from './NineSliceLayered.module.css';

export interface NineSliceLayeredProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Layer configurations */
  layers: Array<{
    /** Images for this layer */
    images?: any;
    /** Single image source for this layer */
    src?: string;
    /** Slice configuration for this layer */
    slices?: any;
    /** Position offset */
    offset?: { x: number; y: number };
    /** Layer opacity (0-1) */
    opacity?: number;
    /** Blur amount in pixels */
    blur?: number;
    /** Z-index for stacking order */
    zIndex?: number;
    /** CSS blend mode */
    blendMode?: string;
    /** Animation type */
    animate?: 'slide' | 'fade' | 'pulse' | 'rotate' | 'scale' | string;
    /** Animation duration in milliseconds */
    animationDuration?: number;
    /** Animation delay in milliseconds */
    animationDelay?: number;
    /** Custom CSS class for the layer */
    className?: string;
    /** Custom inline styles for the layer */
    style?: CSSProperties;
  }>;
  
  /** Component dimensions */
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  
  /** Container styling */
  className?: string;
  style?: CSSProperties;
  
  /** Content to render inside the layered container */
  children?: ReactNode;
  
  /** Shadow configuration */
  shadow?: boolean | {
    /** Shadow blur radius */
    blur?: number;
    /** Shadow spread radius */
    spread?: number;
    /** Shadow color */
    color?: string;
    /** Shadow offset */
    offset?: { x: number; y: number };
    /** Shadow opacity */
    opacity?: number;
  };
  
  /** Global effects */
  effects?: {
    /** Global brightness multiplier */
    brightness?: number;
    /** Global contrast multiplier */
    contrast?: number;
    /** Global saturation multiplier */
    saturation?: number;
    /** Global hue rotation in degrees */
    hueRotate?: number;
    /** Global sepia effect (0-1) */
    sepia?: number;
  };
  
  /** Performance options */
  optimizeRendering?: boolean;
  enableGPUAcceleration?: boolean;
  
  /** Event handlers */
  onLoad?: () => void;
  onError?: (error: Error, layerIndex: number) => void;
}

export const NineSliceLayered: React.FC<NineSliceLayeredProps> = ({
  layers = [],
  width = '100%',
  height = 'auto',
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  className,
  style,
  children,
  shadow,
  effects,
  optimizeRendering = true,
  enableGPUAcceleration = true,
  onLoad,
  onError,
  ...rest
}) => {
  // Sort layers by z-index
  const sortedLayers = useMemo(() => {
    return [...layers].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
  }, [layers]);

  // Generate shadow styles
  const shadowStyle = useMemo(() => {
    if (!shadow) return {};
    
    if (typeof shadow === 'boolean' && shadow) {
      return {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      };
    }
    
    if (typeof shadow === 'object') {
      const {
        blur = 12,
        spread = 0,
        color = 'rgba(0, 0, 0, 0.15)',
        offset = { x: 0, y: 4 },
        opacity = 1,
      } = shadow;
      
      const shadowColor = color.includes('rgba') || color.includes('hsla')
        ? color.replace(/[\d.]+\)$/, `${opacity})`)
        : color;
      
      return {
        boxShadow: `${offset.x}px ${offset.y}px ${blur}px ${spread}px ${shadowColor}`,
      };
    }
    
    return {};
  }, [shadow]);

  // Generate effects filter
  const effectsFilter = useMemo(() => {
    if (!effects) return {};
    
    const filters: string[] = [];
    
    if (effects.brightness !== undefined) {
      filters.push(`brightness(${effects.brightness})`);
    }
    if (effects.contrast !== undefined) {
      filters.push(`contrast(${effects.contrast})`);
    }
    if (effects.saturation !== undefined) {
      filters.push(`saturate(${effects.saturation})`);
    }
    if (effects.hueRotate !== undefined) {
      filters.push(`hue-rotate(${effects.hueRotate}deg)`);
    }
    if (effects.sepia !== undefined) {
      filters.push(`sepia(${effects.sepia})`);
    }
    
    return filters.length > 0 ? { filter: filters.join(' ') } : {};
  }, [effects]);

  // Container styles
  const containerStyle: CSSProperties = {
    position: 'relative',
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    ...shadowStyle,
    ...effectsFilter,
    ...(enableGPUAcceleration && {
      transform: 'translateZ(0)',
      willChange: 'transform',
    }),
    ...style,
  };

  // Handle layer load completion
  const handleLayerLoad = React.useCallback(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  // Handle layer errors
  const handleLayerError = React.useCallback((error: Error, layerIndex: number) => {
    if (onError) {
      onError(error, layerIndex);
    }
  }, [onError]);

  return (
    <div 
      className={`${styles.layeredContainer} ${className || ''}`}
      style={containerStyle}
      {...rest}
    >
      {sortedLayers.map((layer, index) => (
        <NineSliceLayer
          key={`layer-${index}-${layer.zIndex || 0}`}
          {...layer}
          onLoad={index === sortedLayers.length - 1 ? handleLayerLoad : undefined}
          onError={(error) => handleLayerError(error, index)}
        />
      ))}
      
      {children && (
        <div className={styles.content} style={{ zIndex: 1000 }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default NineSliceLayered;