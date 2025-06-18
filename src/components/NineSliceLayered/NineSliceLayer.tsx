import React, { useMemo, CSSProperties } from 'react';
import { NineSlice } from '../NineSlice/NineSlice';
import styles from './NineSliceLayer.module.css';

export interface NineSliceLayerProps {
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
  /** Event handlers */
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const NineSliceLayer: React.FC<NineSliceLayerProps> = ({
  images,
  src,
  slices,
  offset = { x: 0, y: 0 },
  opacity = 1,
  blur = 0,
  zIndex = 0,
  blendMode,
  animate,
  animationDuration = 1000,
  animationDelay = 0,
  className,
  style,
  onLoad,
  onError,
}) => {
  // Generate animation class name
  const animationClass = useMemo(() => {
    switch (animate) {
      case 'slide':
        return styles.slideAnimation;
      case 'fade':
        return styles.fadeAnimation;
      case 'pulse':
        return styles.pulseAnimation;
      case 'rotate':
        return styles.rotateAnimation;
      case 'scale':
        return styles.scaleAnimation;
      default:
        return '';
    }
  }, [animate]);

  // Generate layer styles
  const layerStyle: CSSProperties = {
    position: 'absolute',
    top: offset.y,
    left: offset.x,
    width: '100%',
    height: '100%',
    opacity,
    zIndex,
    mixBlendMode: blendMode as any,
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
    animationDuration: `${animationDuration}ms`,
    animationDelay: `${animationDelay}ms`,
    animationFillMode: 'both',
    pointerEvents: 'none', // Layers don't intercept pointer events by default
    ...style,
  };

  return (
    <div 
      className={`${styles.layer} ${animationClass} ${className || ''}`}
      style={layerStyle}
    >
      <NineSlice
        src={src}
        images={images}
        slices={slices}
        width="100%"
        height="100%"
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
};

export default NineSliceLayer;