import React, { useMemo, useEffect, useRef, useState, CSSProperties } from 'react';
import { NineSlice } from '../NineSlice/NineSlice';
import { NineSliceBarProps, NineSliceImages } from '../../types/common';
import styles from './NineSliceBar.module.css';

// Bar-specific types
export type FillDirection = 'left-to-right' | 'right-to-left' | 'bottom-to-top' | 'top-to-bottom';
export type BarVariant = 'health' | 'mana' | 'experience' | 'progress' | 'custom';
export type GameStyle = 'fantasy' | 'cyberpunk' | 'retro' | 'modern';

// Extended bar props with additional features
export interface ExtendedNineSliceBarProps extends Omit<NineSliceBarProps, 'variant'> {
  // Core bar properties
  value: number;
  maxValue: number;
  
  // Bar configuration
  variant?: BarVariant;
  gameStyle?: GameStyle;
  fillDirection?: FillDirection;
  
  // Visual customization
  fillColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  
  // Label configuration
  showLabel?: boolean;
  labelText?: string;
  labelPosition?: 'center' | 'left' | 'right';
  labelFormat?: (value: number, maxValue: number) => string;
  
  // Animation settings
  animated?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  
  // Effects
  glowEffect?: boolean;
  glowColor?: string;
  gradientFill?: boolean;
  pulsateOnLow?: boolean;
  
  // Critical thresholds
  criticalThreshold?: number;
  warningThreshold?: number;
  criticalColor?: string;
  warningColor?: string;
  
  // Segmented bar
  segments?: number;
  segmentSpacing?: number;
  
  // Callbacks
  onValueChange?: (value: number, maxValue: number, percentage: number) => void;
  onCriticalThreshold?: (value: number, maxValue: number) => void;
  onWarningThreshold?: (value: number, maxValue: number) => void;
  
  // Bar-specific images (simplified for horizontal bars)
  barImages?: {
    background?: NineSliceImages | string;
    fill?: NineSliceImages | string;
    overlay?: NineSliceImages | string;
  };
}

// Default configurations for different variants
const VARIANT_CONFIGS: Record<BarVariant, Partial<ExtendedNineSliceBarProps>> = {
  health: {
    fillColor: '#e74c3c',
    criticalThreshold: 0.25,
    warningThreshold: 0.5,
    criticalColor: '#c0392b',
    warningColor: '#f39c12',
    pulsateOnLow: true,
    glowEffect: true,
    glowColor: '#e74c3c',
  },
  mana: {
    fillColor: '#3498db',
    glowEffect: true,
    glowColor: '#2980b9',
    gradientFill: true,
  },
  experience: {
    fillColor: '#f1c40f',
    glowEffect: true,
    glowColor: '#f39c12',
    gradientFill: true,
  },
  progress: {
    fillColor: '#2ecc71',
    glowEffect: false,
    gradientFill: false,
  },
  custom: {},
};

// Game style configurations
const GAME_STYLE_CONFIGS: Record<GameStyle, Partial<ExtendedNineSliceBarProps>> = {
  fantasy: {
    borderColor: '#8b4513',
    backgroundColor: '#2c1810',
    glowEffect: true,
  },
  cyberpunk: {
    borderColor: '#00ffff',
    backgroundColor: '#0d1117',
    glowEffect: true,
    gradientFill: true,
  },
  retro: {
    borderColor: '#ffff00',
    backgroundColor: '#000000',
    glowEffect: false,
  },
  modern: {
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    glowEffect: false,
  },
};

export const NineSliceBar: React.FC<ExtendedNineSliceBarProps> = ({
  value,
  maxValue,
  variant = 'progress',
  gameStyle = 'modern',
  fillDirection = 'left-to-right',
  width = '200px',
  height = '20px',
  
  // Visual customization
  fillColor,
  backgroundColor,
  borderColor,
  
  // Label configuration
  showLabel = false,
  labelText,
  labelPosition = 'center',
  labelFormat,
  
  // Animation settings
  animated = true,
  animationDuration = 300,
  animationEasing = 'ease-out',
  
  // Effects
  glowEffect,
  glowColor,
  gradientFill,
  pulsateOnLow,
  
  // Critical thresholds
  criticalThreshold,
  warningThreshold,
  criticalColor,
  warningColor,
  
  // Segmented bar
  segments,
  segmentSpacing = 2,
  
  // Callbacks
  onValueChange,
  onCriticalThreshold,
  onWarningThreshold,
  
  // Bar images
  barImages,
  
  // NineSlice props
  src,
  images,
  slices = 4,
  className,
  style
}) => {
  // State for animated value
  const [animatedValue, setAnimatedValue] = useState(value);
  const animationRef = useRef<number>();
  
  // Merge configurations
  const variantConfig = VARIANT_CONFIGS[variant] || {};
  const gameStyleConfig = GAME_STYLE_CONFIGS[gameStyle] || {};
  const mergedConfig = { ...variantConfig, ...gameStyleConfig };
  
  // Resolve final values with priority: explicit props > variant config > game style config
  const resolvedFillColor = fillColor || mergedConfig.fillColor || '#2ecc71';
  const resolvedBackgroundColor = backgroundColor || mergedConfig.backgroundColor || '#e9ecef';
  const resolvedBorderColor = borderColor || mergedConfig.borderColor || '#ced4da';
  const resolvedGlowEffect = glowEffect ?? mergedConfig.glowEffect ?? false;
  const resolvedGlowColor = glowColor || mergedConfig.glowColor || resolvedFillColor;
  const resolvedGradientFill = gradientFill ?? mergedConfig.gradientFill ?? false;
  const resolvedPulsateOnLow = pulsateOnLow ?? mergedConfig.pulsateOnLow ?? false;
  const resolvedCriticalThreshold = criticalThreshold ?? mergedConfig.criticalThreshold ?? 0;
  const resolvedWarningThreshold = warningThreshold ?? mergedConfig.warningThreshold ?? 0;
  const resolvedCriticalColor = criticalColor || mergedConfig.criticalColor || '#dc3545';
  const resolvedWarningColor = warningColor || mergedConfig.warningColor || '#ffc107';
  
  // Calculate percentage
  const percentage = Math.min(Math.max(value / maxValue, 0), 1);
  const animatedPercentage = Math.min(Math.max(animatedValue / maxValue, 0), 1);
  
  // Determine current state
  const isCritical = percentage <= resolvedCriticalThreshold && resolvedCriticalThreshold > 0;
  const isWarning = percentage <= resolvedWarningThreshold && resolvedWarningThreshold > 0 && !isCritical;
  
  // Animate value changes
  useEffect(() => {
    if (!animated || value === animatedValue) return;
    
    const startValue = animatedValue;
    const endValue = value;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Apply easing
      let easedProgress = progress;
      if (animationEasing === 'ease-out') {
        easedProgress = 1 - Math.pow(1 - progress, 3);
      } else if (animationEasing === 'ease-in') {
        easedProgress = Math.pow(progress, 3);
      } else if (animationEasing === 'ease-in-out') {
        easedProgress = progress < 0.5 
          ? 4 * Math.pow(progress, 3)
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      }
      
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, animatedValue, animated, animationDuration, animationEasing]);
  
  // Trigger callbacks
  useEffect(() => {
    if (onValueChange) {
      onValueChange(value, maxValue, percentage);
    }
  }, [value, maxValue, percentage, onValueChange]);
  
  useEffect(() => {
    if (isCritical && onCriticalThreshold) {
      onCriticalThreshold(value, maxValue);
    }
  }, [isCritical, value, maxValue, onCriticalThreshold]);
  
  useEffect(() => {
    if (isWarning && onWarningThreshold) {
      onWarningThreshold(value, maxValue);
    }
  }, [isWarning, value, maxValue, onWarningThreshold]);
  
  // Generate fill color based on state
  const currentFillColor = isCritical ? resolvedCriticalColor : isWarning ? resolvedWarningColor : resolvedFillColor;
  
  // Generate gradient if enabled
  const fillStyle = useMemo(() => {
    if (resolvedGradientFill) {
      const color1 = currentFillColor;
      const color2 = `${currentFillColor}80`; // Add transparency
      
      if (fillDirection === 'left-to-right') {
        return `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`;
      } else if (fillDirection === 'right-to-left') {
        return `linear-gradient(270deg, ${color1} 0%, ${color2} 100%)`;
      } else if (fillDirection === 'bottom-to-top') {
        return `linear-gradient(0deg, ${color1} 0%, ${color2} 100%)`;
      } else {
        return `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`;
      }
    }
    return currentFillColor;
  }, [resolvedGradientFill, currentFillColor, fillDirection]);
  
  // Generate label text
  const displayLabel = useMemo(() => {
    if (!showLabel) return '';
    if (labelText) return labelText;
    if (labelFormat) return labelFormat(value, maxValue);
    return `${Math.round(value)}/${Math.round(maxValue)}`;
  }, [showLabel, labelText, labelFormat, value, maxValue]);
  
  // Calculate fill width/height based on direction
  const fillSize = useMemo(() => {
    const size = animatedPercentage * 100;
    if (fillDirection === 'left-to-right' || fillDirection === 'right-to-left') {
      return { width: `${size}%`, height: '100%' };
    } else {
      return { width: '100%', height: `${size}%` };
    }
  }, [animatedPercentage, fillDirection]);
  
  // Calculate fill position
  const fillPosition = useMemo(() => {
    if (fillDirection === 'right-to-left') {
      return { right: 0, top: 0 };
    } else if (fillDirection === 'top-to-bottom') {
      return { left: 0, top: 0 };
    } else if (fillDirection === 'bottom-to-top') {
      return { left: 0, bottom: 0 };
    } else {
      return { left: 0, top: 0 };
    }
  }, [fillDirection]);
  
  // Generate segments if specified
  const segmentElements = useMemo(() => {
    if (!segments || segments <= 1) return null;
    
    const segmentWidth = 100 / segments;
    const elements = [];
    
    for (let i = 0; i < segments - 1; i++) {
      const position = (i + 1) * segmentWidth;
      elements.push(
        <div
          key={i}
          className={styles.segment}
          style={{
            left: `${position}%`,
            width: `${segmentSpacing}px`,
            height: '100%',
            backgroundColor: resolvedBorderColor,
            position: 'absolute',
            zIndex: 3,
          }}
        />
      );
    }
    
    return elements;
  }, [segments, segmentSpacing, resolvedBorderColor]);
  
  // Container styles
  const containerStyles: CSSProperties = {
    position: 'relative',
    width,
    height,
    backgroundColor: resolvedBackgroundColor,
    border: `1px solid ${resolvedBorderColor}`,
    overflow: 'hidden',
    ...style,
  };
  
  // Fill styles
  const fillStyles: CSSProperties = {
    position: 'absolute',
    background: fillStyle,
    transition: animated ? `all ${animationDuration}ms ${animationEasing}` : 'none',
    ...fillSize,
    ...fillPosition,
    zIndex: 1,
  };
  
  // Glow styles
  const glowStyles: CSSProperties = resolvedGlowEffect ? {
    boxShadow: `0 0 10px ${resolvedGlowColor}`,
    filter: `drop-shadow(0 0 5px ${resolvedGlowColor})`,
  } : {};
  
  // Pulsate styles
  const pulsateClass = resolvedPulsateOnLow && isCritical ? styles.pulsate : '';
  
  // Label styles
  const labelStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    zIndex: 4,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    ...(labelPosition === 'center' && { left: '50%', transform: 'translate(-50%, -50%)' }),
    ...(labelPosition === 'left' && { left: '8px' }),
    ...(labelPosition === 'right' && { right: '8px' }),
  };
  
  // If using custom bar images, render with NineSlice
  if (barImages?.background || src || images) {
    return (
      <div
        className={`${styles.nineSliceBar} ${pulsateClass} ${className || ''}`}
        style={{
          ...containerStyles,
          ...glowStyles,
        }}
      >
        {/* Background */}
        <NineSlice
          src={typeof barImages?.background === 'string' ? barImages.background : src}
          images={typeof barImages?.background === 'object' ? barImages.background : images}
          slices={slices}
          width="100%"
          height="100%"
          className={styles.barBackground}
        />
        
        {/* Fill */}
        <div className={styles.fillContainer} style={fillStyles}>
          {barImages?.fill ? (
            <NineSlice
              src={typeof barImages.fill === 'string' ? barImages.fill : undefined}
              images={typeof barImages.fill === 'object' ? barImages.fill : undefined}
              slices={slices}
              width="100%"
              height="100%"
              className={styles.barFill}
              style={{ background: fillStyle }}
            />
          ) : (
            <div className={styles.simpleFill} style={{ background: fillStyle, width: '100%', height: '100%' }} />
          )}
        </div>
        
        {/* Overlay */}
        {barImages?.overlay && (
          <NineSlice
            src={typeof barImages.overlay === 'string' ? barImages.overlay : undefined}
            images={typeof barImages.overlay === 'object' ? barImages.overlay : undefined}
            slices={slices}
            width="100%"
            height="100%"
            className={styles.barOverlay}
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
          />
        )}
        
        {/* Segments */}
        {segmentElements}
        
        {/* Label */}
        {showLabel && displayLabel && (
          <div className={styles.label} style={labelStyles}>
            {displayLabel}
          </div>
        )}
      </div>
    );
  }
  
  // Simple bar without nine-slice
  return (
    <div
      className={`${styles.simpleBar} ${pulsateClass} ${className || ''}`}
      style={{
        ...containerStyles,
        ...glowStyles,
      }}
    >
      {/* Fill */}
      <div className={styles.fill} style={fillStyles} />
      
      {/* Segments */}
      {segmentElements}
      
      {/* Label */}
      {showLabel && displayLabel && (
        <div className={styles.label} style={labelStyles}>
          {displayLabel}
        </div>
      )}
    </div>
  );
};

export default NineSliceBar;