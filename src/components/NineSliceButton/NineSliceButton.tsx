import React, { useState, useCallback, forwardRef, ReactNode } from 'react';
import { NineSlice, NineSliceProps } from '../NineSlice/NineSlice';
import styles from './NineSliceButton.module.css';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'light' 
  | 'dark';

export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

export type PressEffect = 'scale' | 'glow' | 'shadow' | 'none';

export type GamePreset = 'fantasy' | 'medieval' | 'sci-fi' | 'retro' | 'modern';

export type IconPosition = 'left' | 'right';

export interface NineSliceButtonProps extends Omit<NineSliceProps, 'onClick'> {
  /** Button variant style */
  variant?: ButtonVariant;
  
  /** Button size preset */
  size?: ButtonSize;
  
  /** Game-style preset */
  gamePreset?: GamePreset;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading state with spinner */
  loading?: boolean;
  
  /** Press effect type */
  pressEffect?: PressEffect;
  
  /** Icon element */
  icon?: ReactNode;
  
  /** Icon position */
  iconPosition?: IconPosition;
  
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Additional aria attributes */
  'aria-describedby'?: string;
  'aria-pressed'?: boolean;
  
  /** Custom spinner element */
  spinner?: ReactNode;
  
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  /** Key down handler */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const DefaultSpinner: React.FC = () => (
  <div className={styles.spinner} aria-hidden="true">
    <div className={styles.spinnerCircle} />
  </div>
);

export const NineSliceButton = forwardRef<HTMLButtonElement, NineSliceButtonProps>(
  ({
    variant = 'primary',
    size = 'medium',
    gamePreset,
    disabled = false,
    loading = false,
    pressEffect = 'scale',
    icon,
    iconPosition = 'left',
    type = 'button',
    spinner = <DefaultSpinner />,
    children,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    className,
    style,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-pressed': ariaPressed,
    ...nineSliceProps
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseDown = useCallback(() => {
      if (!disabled && !loading) {
        setIsPressed(true);
      }
    }, [disabled, loading]);

    const handleMouseUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsPressed(false);
      setIsHovered(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
      if (!disabled && !loading) {
        setIsHovered(true);
      }
    }, [disabled, loading]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    }, [disabled, loading, onClick]);

    const handleFocus = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    }, [onFocus]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    }, [onBlur]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        if (!disabled && !loading) {
          setIsPressed(true);
        }
      }
      onKeyDown?.(event);
    }, [disabled, loading, onKeyDown]);

    const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        setIsPressed(false);
      }
    }, []);

    // Build CSS classes
    const buttonClasses = [
      styles.nineSliceButton,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      gamePreset && styles[`preset-${gamePreset}`],
      disabled && styles.disabled,
      loading && styles.loading,
      isPressed && styles.pressed,
      isFocused && styles.focused,
      isHovered && styles.hovered,
      pressEffect !== 'none' && styles[`pressEffect-${pressEffect}`],
      className
    ].filter(Boolean).join(' ');

    // Build button content
    const iconElement = icon && !loading && (
      <span className={`${styles.icon} ${styles[`icon-${iconPosition}`]}`} aria-hidden="true">
        {icon}
      </span>
    );

    const spinnerElement = loading && (
      <span className={styles.loadingSpinner} aria-hidden="true">
        {spinner}
      </span>
    );

    const textContent = children && (
      <span className={`${styles.text} ${loading ? styles.textHidden : ''}`}>
        {children}
      </span>
    );

    const buttonContent = (
      <>
        {iconPosition === 'left' && iconElement}
        {spinnerElement}
        {textContent}
        {iconPosition === 'right' && iconElement}
      </>
    );

    return (
      <NineSlice
        {...nineSliceProps}
        className={buttonClasses}
        style={style}
      >
        <button
          ref={ref}
          type={type}
          disabled={disabled || loading}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-pressed={ariaPressed}
          aria-disabled={disabled || loading}
          className={styles.buttonElement}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          {buttonContent}
        </button>
      </NineSlice>
    );
  }
);

NineSliceButton.displayName = 'NineSliceButton';

export default NineSliceButton;