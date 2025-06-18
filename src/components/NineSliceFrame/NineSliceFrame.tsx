import React, { useMemo, CSSProperties } from 'react';
import { NineSlice } from '../NineSlice';
// import { NineSliceFrameProps as BaseNineSliceFrameProps } from '../../types/common';
import styles from './NineSliceFrame.module.css';

export type FrameVariant = 'golden' | 'silver' | 'wood' | 'stone' | 'modern' | 'ornate' | 'minimal';
export type CornerStyle = 'rounded' | 'square' | 'ornate' | 'beveled';
export type AnimationType = 'shimmer' | 'glow' | 'pulse' | 'none';
export type FrameContentType = 'portrait' | 'avatar' | 'card' | 'content';

export interface NineSliceFrameProps extends Omit<React.ComponentProps<typeof NineSlice>, 'variant'> {
  /** Frame style variant */
  variant?: FrameVariant;
  /** Frame thickness in pixels */
  thickness?: number;
  /** Corner style */
  cornerStyle?: CornerStyle;
  /** Animation type */
  animate?: AnimationType;
  /** Content type optimization */
  contentType?: FrameContentType;
  /** Level badge number */
  level?: number;
  /** Status indicator */
  status?: 'active' | 'inactive' | 'warning' | 'error' | 'success';
  /** Enable shadow effect */
  shadow?: boolean | 'inner' | 'outer' | 'both';
  /** Enable glow effect */
  glow?: boolean | string; // true for default, string for custom color
  /** Responsive scaling */
  responsive?: boolean;
  /** Custom frame images */
  frameImages?: {
    corners?: string[];
    edges?: string[];
    ornaments?: string[];
  };
  /** Game UI integration props */
  gameUI?: {
    rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    enchanted?: boolean;
    locked?: boolean;
    new?: boolean;
  };
  /** Animation configuration */
  animationConfig?: {
    duration?: number;
    intensity?: number;
    delay?: number;
  };
}

// Default frame image sets for different variants
const FRAME_VARIANTS: Record<FrameVariant, { slices: any; images?: any }> = {
  golden: {
    slices: { top: 32, right: 32, bottom: 32, left: 32 },
    images: {
      // In a real implementation, these would be actual image URLs
      topLeft: '/assets/frames/golden/corner-tl.png',
      topCenter: '/assets/frames/golden/edge-top.png',
      topRight: '/assets/frames/golden/corner-tr.png',
      middleLeft: '/assets/frames/golden/edge-left.png',
      middleCenter: '/assets/frames/golden/center.png',
      middleRight: '/assets/frames/golden/edge-right.png',
      bottomLeft: '/assets/frames/golden/corner-bl.png',
      bottomCenter: '/assets/frames/golden/edge-bottom.png',
      bottomRight: '/assets/frames/golden/corner-br.png',
    }
  },
  silver: {
    slices: { top: 28, right: 28, bottom: 28, left: 28 },
    images: {
      topLeft: '/assets/frames/silver/corner-tl.png',
      topCenter: '/assets/frames/silver/edge-top.png',
      topRight: '/assets/frames/silver/corner-tr.png',
      middleLeft: '/assets/frames/silver/edge-left.png',
      middleCenter: '/assets/frames/silver/center.png',
      middleRight: '/assets/frames/silver/edge-right.png',
      bottomLeft: '/assets/frames/silver/corner-bl.png',
      bottomCenter: '/assets/frames/silver/edge-bottom.png',
      bottomRight: '/assets/frames/silver/corner-br.png',
    }
  },
  wood: {
    slices: { top: 24, right: 24, bottom: 24, left: 24 },
    images: {
      topLeft: '/assets/frames/wood/corner-tl.png',
      topCenter: '/assets/frames/wood/edge-top.png',
      topRight: '/assets/frames/wood/corner-tr.png',
      middleLeft: '/assets/frames/wood/edge-left.png',
      middleCenter: '/assets/frames/wood/center.png',
      middleRight: '/assets/frames/wood/edge-right.png',
      bottomLeft: '/assets/frames/wood/corner-bl.png',
      bottomCenter: '/assets/frames/wood/edge-bottom.png',
      bottomRight: '/assets/frames/wood/corner-br.png',
    }
  },
  stone: {
    slices: { top: 20, right: 20, bottom: 20, left: 20 },
    images: {
      topLeft: '/assets/frames/stone/corner-tl.png',
      topCenter: '/assets/frames/stone/edge-top.png',
      topRight: '/assets/frames/stone/corner-tr.png',
      middleLeft: '/assets/frames/stone/edge-left.png',
      middleCenter: '/assets/frames/stone/center.png',
      middleRight: '/assets/frames/stone/edge-right.png',
      bottomLeft: '/assets/frames/stone/corner-bl.png',
      bottomCenter: '/assets/frames/stone/edge-bottom.png',
      bottomRight: '/assets/frames/stone/corner-br.png',
    }
  },
  modern: {
    slices: { top: 16, right: 16, bottom: 16, left: 16 },
    images: {
      topLeft: '/assets/frames/modern/corner-tl.png',
      topCenter: '/assets/frames/modern/edge-top.png',
      topRight: '/assets/frames/modern/corner-tr.png',
      middleLeft: '/assets/frames/modern/edge-left.png',
      middleCenter: '/assets/frames/modern/center.png',
      middleRight: '/assets/frames/modern/edge-right.png',
      bottomLeft: '/assets/frames/modern/corner-bl.png',
      bottomCenter: '/assets/frames/modern/edge-bottom.png',
      bottomRight: '/assets/frames/modern/corner-br.png',
    }
  },
  ornate: {
    slices: { top: 48, right: 48, bottom: 48, left: 48 },
    images: {
      topLeft: '/assets/frames/ornate/corner-tl.png',
      topCenter: '/assets/frames/ornate/edge-top.png',
      topRight: '/assets/frames/ornate/corner-tr.png',
      middleLeft: '/assets/frames/ornate/edge-left.png',
      middleCenter: '/assets/frames/ornate/center.png',
      middleRight: '/assets/frames/ornate/edge-right.png',
      bottomLeft: '/assets/frames/ornate/corner-bl.png',
      bottomCenter: '/assets/frames/ornate/edge-bottom.png',
      bottomRight: '/assets/frames/ornate/corner-br.png',
    }
  },
  minimal: {
    slices: { top: 8, right: 8, bottom: 8, left: 8 },
    images: {
      topLeft: '/assets/frames/minimal/corner-tl.png',
      topCenter: '/assets/frames/minimal/edge-top.png',
      topRight: '/assets/frames/minimal/corner-tr.png',
      middleLeft: '/assets/frames/minimal/edge-left.png',
      middleCenter: '/assets/frames/minimal/center.png',
      middleRight: '/assets/frames/minimal/edge-right.png',
      bottomLeft: '/assets/frames/minimal/corner-bl.png',
      bottomCenter: '/assets/frames/minimal/edge-bottom.png',
      bottomRight: '/assets/frames/minimal/corner-br.png',
    }
  }
};

export const NineSliceFrame: React.FC<NineSliceFrameProps> = ({
  variant = 'golden',
  thickness,
  cornerStyle = 'rounded',
  animate = 'none',
  contentType = 'content',
  level,
  status,
  shadow = false,
  glow = false,
  responsive = true,
  frameImages,
  gameUI,
  animationConfig = {},
  className,
  style,
  children,
  ...nineSliceProps
}) => {
  // Get frame configuration
  const frameConfig = FRAME_VARIANTS[variant as FrameVariant] || FRAME_VARIANTS.golden;
  
  // Override slices if thickness is provided
  const finalSlices = useMemo(() => {
    if (thickness) {
      return { top: thickness, right: thickness, bottom: thickness, left: thickness };
    }
    return frameConfig.slices;
  }, [thickness, frameConfig.slices]);

  // Combine frame images with custom images
  const finalImages = useMemo(() => {
    if (frameImages) {
      // Custom frame images provided
      return frameImages;
    }
    return frameConfig.images;
  }, [frameImages, frameConfig.images]);

  // Animation configuration
  const { duration = 2000, intensity = 1, delay = 0 } = animationConfig;

  // Build CSS classes
  const frameClasses = useMemo(() => {
    const classes = [styles.frame];
    
    // Variant class
    classes.push(styles[`frame--${variant}`]);
    
    // Corner style class
    classes.push(styles[`frame--${cornerStyle}`]);
    
    // Content type class
    classes.push(styles[`frame--${contentType}`]);
    
    // Animation class
    if (animate !== 'none') {
      classes.push(styles[`frame--${animate}`]);
    }
    
    // Status class
    if (status) {
      classes.push(styles[`frame--${status}`]);
    }
    
    // Shadow class
    if (shadow) {
      if (typeof shadow === 'string') {
        classes.push(styles[`frame--shadow-${shadow}`]);
      } else {
        classes.push(styles['frame--shadow']);
      }
    }
    
    // Glow class
    if (glow) {
      classes.push(styles['frame--glow']);
    }
    
    // Responsive class
    if (responsive) {
      classes.push(styles['frame--responsive']);
    }
    
    // Game UI classes
    if (gameUI) {
      if (gameUI.rarity) {
        classes.push(styles[`frame--${gameUI.rarity}`]);
      }
      if (gameUI.enchanted) {
        classes.push(styles['frame--enchanted']);
      }
      if (gameUI.locked) {
        classes.push(styles['frame--locked']);
      }
      if (gameUI.new) {
        classes.push(styles['frame--new']);
      }
    }
    
    // Custom className
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [variant, cornerStyle, contentType, animate, status, shadow, glow, responsive, gameUI, className]);

  // Custom CSS properties for animations and effects
  const customProperties = useMemo(() => {
    const props: Record<string, string | number> = {};
    
    // Animation properties
    if (animate !== 'none') {
      props['--animation-duration'] = `${duration}ms`;
      props['--animation-intensity'] = intensity;
      props['--animation-delay'] = `${delay}ms`;
    }
    
    // Glow color
    if (typeof glow === 'string') {
      props['--glow-color'] = glow;
    }
    
    // Thickness
    if (thickness) {
      props['--frame-thickness'] = `${thickness}px`;
    }
    
    return props;
  }, [animate, duration, intensity, delay, glow, thickness]);

  // Combine all styles
  const finalStyle: CSSProperties = {
    ...customProperties,
    ...style,
  };

  return (
    <div className={frameClasses} style={finalStyle}>
      <NineSlice
        images={finalImages}
        slices={finalSlices}
        className={styles.frameNineSlice}
        {...nineSliceProps}
      >
        <div className={styles.frameContent}>
          {children}
        </div>
      </NineSlice>
      
      {/* Level badge */}
      {level && (
        <div className={styles.levelBadge}>
          <span className={styles.levelText}>{level}</span>
        </div>
      )}
      
      {/* Status indicator */}
      {status && (
        <div className={styles.statusIndicator}>
          <div className={`${styles.statusDot} ${styles[`statusDot--${status}`]}`} />
        </div>
      )}
      
      {/* Game UI indicators */}
      {gameUI?.locked && (
        <div className={styles.lockIndicator}>
          <span className={styles.lockIcon}>🔒</span>
        </div>
      )}
      
      {gameUI?.new && (
        <div className={styles.newIndicator}>
          <span className={styles.newText}>NEW</span>
        </div>
      )}
      
      {gameUI?.enchanted && (
        <div className={styles.enchantedEffect}>
          <div className={styles.enchantedGlow} />
        </div>
      )}
    </div>
  );
};

export default NineSliceFrame;