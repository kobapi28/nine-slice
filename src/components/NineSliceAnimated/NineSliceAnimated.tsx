import React, { useState, useMemo, useCallback, useRef, useEffect, CSSProperties } from 'react';
import { NineSlice } from '../NineSlice/NineSlice';
import { AnimationStates, TransitionConfig } from '../../types/common';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import styles from './NineSliceAnimated.module.css';

export interface NineSliceAnimatedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Base nine-slice props */
  src?: string;
  images?: any;
  slices?: any;
  
  /** Component dimensions */
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  
  /** Animation states configuration */
  states: AnimationStates;
  
  /** Transition configuration */
  transition?: TransitionConfig;
  
  /** Initial animation state */
  initialState?: keyof AnimationStates;
  
  /** Current animation state (controlled) */
  currentState?: keyof AnimationStates;
  
  /** Auto-detect interaction states */
  interactive?: boolean;
  
  /** Disable specific interaction states */
  disabledStates?: Array<keyof AnimationStates>;
  
  /** Advanced transition configurations per state */
  stateTransitions?: {
    [key: string]: TransitionConfig;
  };
  
  /** Performance optimizations */
  optimizeAnimations?: boolean;
  enableGPUAcceleration?: boolean;
  preloadStates?: boolean;
  
  /** Animation loop configuration */
  loop?: boolean | {
    states: Array<keyof AnimationStates>;
    duration: number;
    iterations?: number;
  };
  
  /** Trigger animations */
  triggers?: {
    onMount?: keyof AnimationStates;
    onUnmount?: keyof AnimationStates;
    onFocus?: keyof AnimationStates;
    onBlur?: keyof AnimationStates;
  };
  
  /** Content */
  children?: React.ReactNode;
  
  /** Styling */
  className?: string;
  style?: CSSProperties;
  
  /** Event handlers */
  onStateChange?: (newState: keyof AnimationStates, previousState: keyof AnimationStates) => void;
  onAnimationStart?: (state: keyof AnimationStates) => void;
  onAnimationEnd?: (state: keyof AnimationStates) => void;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const NineSliceAnimated: React.FC<NineSliceAnimatedProps> = ({
  src,
  images,
  slices,
  width = '100%',
  height = 'auto',
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  states,
  transition = { duration: 300, easing: 'ease-in-out' },
  initialState = 'idle',
  currentState,
  interactive = true,
  disabledStates = [],
  stateTransitions = {},
  optimizeAnimations = true,
  enableGPUAcceleration = true,
  preloadStates = true,
  loop,
  triggers,
  children,
  className,
  style,
  onStateChange,
  onAnimationStart,
  onAnimationEnd,
  onLoad,
  onError,
  ...rest
}) => {
  const [internalState, setInternalState] = useState<keyof AnimationStates>(initialState);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const animationRef = useRef<number>();
  const elementRef = useRef<HTMLDivElement>(null);
  const previousStateRef = useRef<keyof AnimationStates>(initialState);
  
  // Use controlled or internal state
  const activeState = currentState !== undefined ? currentState : internalState;
  
  // Preload images if needed
  const imageUrls = useMemo(() => {
    if (!preloadStates) return [];
    
    const urls: string[] = [];
    if (src) urls.push(src);
    
    // Add images from different states if they exist
    Object.values(states).forEach(state => {
      if (state && typeof state === 'object') {
        // Look for image properties in animation states
        Object.values(state).forEach(value => {
          if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/'))) {
            urls.push(value);
          }
        });
      }
    });
    
    return [...new Set(urls)]; // Remove duplicates
  }, [src, states, preloadStates]);
  
  const { loaded, error } = useImagePreloader(imageUrls);
  
  // Handle state changes
  const changeState = useCallback((newState: keyof AnimationStates) => {
    if (disabledStates.includes(newState)) return;
    if (newState === activeState) return;
    
    const previousState = activeState;
    previousStateRef.current = previousState;
    
    if (onAnimationStart) {
      onAnimationStart(newState);
    }
    
    setIsAnimating(true);
    
    if (currentState === undefined) {
      setInternalState(newState);
    }
    
    if (onStateChange) {
      onStateChange(newState, previousState);
    }
    
    // Handle animation end
    const currentTransition = stateTransitions[newState as string] || transition;
    const duration = currentTransition.duration + (currentTransition.delay || 0);
    
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    animationRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      if (onAnimationEnd) {
        onAnimationEnd(newState);
      }
    }, duration);
  }, [activeState, currentState, disabledStates, onAnimationStart, onStateChange, onAnimationEnd, stateTransitions, transition]);
  
  // Interactive event handlers
  const handleMouseEnter = useCallback(() => {
    if (!interactive || isInteracting) return;
    setIsInteracting(true);
    if (states.hover && !disabledStates.includes('hover')) {
      changeState('hover');
    }
  }, [interactive, isInteracting, states.hover, disabledStates, changeState]);
  
  const handleMouseLeave = useCallback(() => {
    if (!interactive) return;
    setIsInteracting(false);
    if (states.idle && !disabledStates.includes('idle')) {
      changeState('idle');
    }
  }, [interactive, states.idle, disabledStates, changeState]);
  
  const handleMouseDown = useCallback(() => {
    if (!interactive) return;
    if (states.active && !disabledStates.includes('active')) {
      changeState('active');
    }
  }, [interactive, states.active, disabledStates, changeState]);
  
  const handleMouseUp = useCallback(() => {
    if (!interactive) return;
    if (isInteracting && states.hover && !disabledStates.includes('hover')) {
      changeState('hover');
    } else if (states.idle && !disabledStates.includes('idle')) {
      changeState('idle');
    }
  }, [interactive, isInteracting, states.hover, states.idle, disabledStates, changeState]);
  
  const handleFocus = useCallback(() => {
    if (triggers?.onFocus) {
      changeState(triggers.onFocus);
    }
  }, [triggers?.onFocus, changeState]);
  
  const handleBlur = useCallback(() => {
    if (triggers?.onBlur) {
      changeState(triggers.onBlur);
    }
  }, [triggers?.onBlur, changeState]);
  
  // Handle mount/unmount triggers
  useEffect(() => {
    if (triggers?.onMount) {
      changeState(triggers.onMount);
    }
    
    return () => {
      if (triggers?.onUnmount) {
        changeState(triggers.onUnmount);
      }
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [triggers?.onMount, triggers?.onUnmount, changeState]);
  
  // Handle loop animations
  useEffect(() => {
    if (!loop || typeof loop !== 'object') return;
    
    const { states: loopStates, duration: loopDuration, iterations = Infinity } = loop;
    let currentIteration = 0;
    let currentIndex = 0;
    
    const runLoop = () => {
      if (currentIteration >= iterations) return;
      
      const nextState = loopStates[currentIndex];
      if (nextState) {
        changeState(nextState);
      }
      
      currentIndex = (currentIndex + 1) % loopStates.length;
      if (currentIndex === 0) {
        currentIteration++;
      }
      
      setTimeout(runLoop, loopDuration);
    };
    
    const loopTimeout = setTimeout(runLoop, loopDuration);
    
    return () => {
      clearTimeout(loopTimeout);
    };
  }, [loop, changeState]);
  
  // Generate current animation styles
  const currentAnimationStyles = useMemo(() => {
    const currentStateConfig = states[activeState];
    if (!currentStateConfig) return {};
    
    const currentTransition = stateTransitions[activeState as string] || transition;
    
    const baseStyles: CSSProperties = {
      transition: `all ${currentTransition.duration}ms ${currentTransition.easing || 'ease-in-out'}`,
      transitionDelay: `${currentTransition.delay || 0}ms`,
    };
    
    // Apply state-specific styles
    if (currentStateConfig.scale !== undefined) {
      baseStyles.transform = `scale(${currentStateConfig.scale}) translateZ(0)`;
    }
    
    if (currentStateConfig.opacity !== undefined) {
      baseStyles.opacity = currentStateConfig.opacity;
    }
    
    if (currentStateConfig.brightness !== undefined) {
      const filters = [];
      if (currentStateConfig.brightness !== 1) {
        filters.push(`brightness(${currentStateConfig.brightness})`);
      }
      if (currentStateConfig.blur !== undefined && currentStateConfig.blur > 0) {
        filters.push(`blur(${currentStateConfig.blur}px)`);
      }
      baseStyles.filter = filters.join(' ');
    }
    
    if (currentStateConfig.shadow) {
      baseStyles.boxShadow = currentStateConfig.shadow;
    }
    
    // Apply GPU acceleration if enabled
    if (enableGPUAcceleration && !baseStyles.transform) {
      baseStyles.transform = 'translateZ(0)';
    }
    
    if (optimizeAnimations) {
      baseStyles.willChange = 'transform, opacity, filter';
      baseStyles.backfaceVisibility = 'hidden';
    }
    
    return baseStyles;
  }, [activeState, states, stateTransitions, transition, enableGPUAcceleration, optimizeAnimations]);
  
  // Container styles
  const containerStyle: CSSProperties = {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    ...currentAnimationStyles,
    ...style,
  };
  
  // Handle loading states
  useEffect(() => {
    if (loaded && onLoad) {
      onLoad();
    }
  }, [loaded, onLoad]);
  
  useEffect(() => {
    if (error && onError) {
      onError(new Error(error));
    }
  }, [error, onError]);
  
  // Generate state class names
  const stateClasses = useMemo(() => {
    const classes = [styles.animated];
    
    if (isAnimating) {
      classes.push(styles.animating);
    }
    
    if (interactive) {
      classes.push(styles.interactive);
    }
    
    if (optimizeAnimations) {
      classes.push(styles.optimized);
    }
    
    // Add state-specific classes
    classes.push(styles[`state-${String(activeState)}`] || '');
    
    return classes.filter(Boolean).join(' ');
  }, [activeState, isAnimating, interactive, optimizeAnimations]);
  
  if (!loaded && imageUrls.length > 0) {
    return (
      <div 
        className={`${styles.animated} ${styles.loading} ${className || ''}`}
        style={containerStyle}
      >
        {children}
      </div>
    );
  }
  
  if (error) {
    return (
      <div 
        className={`${styles.animated} ${styles.error} ${className || ''}`}
        style={containerStyle}
      >
        {children || <span>Animation failed to load</span>}
      </div>
    );
  }
  
  return (
    <div
      ref={elementRef}
      className={`${stateClasses} ${className || ''}`}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      <NineSlice
        src={src}
        images={images}
        slices={slices}
        width="100%"
        height="100%"
      />
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default NineSliceAnimated;