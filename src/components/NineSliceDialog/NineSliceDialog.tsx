import React, { useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { NineSlice, NineSliceProps } from '../NineSlice/NineSlice';
import styles from './NineSliceDialog.module.css';

export interface NineSliceDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Called when the dialog should close */
  onClose?: () => void;
  /** Dialog content */
  children?: ReactNode;
  /** Dialog title */
  title?: ReactNode;
  /** Dialog header content */
  header?: ReactNode;
  /** Dialog footer content */
  footer?: ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Dialog preset variant */
  variant?: 'fantasy' | 'medieval' | 'modern' | 'retro' | 'dark' | 'light';
  /** Animation preset */
  animation?: 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'none';
  /** Portal container element */
  container?: HTMLElement;
  /** Z-index for the modal */
  zIndex?: number;
  /** Custom overlay className */
  overlayClassName?: string;
  /** Custom overlay styles */
  overlayStyle?: React.CSSProperties;
  /** Padding inside the dialog content */
  contentPadding?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /** Maximum width of the dialog */
  maxWidth?: number | string;
  /** Maximum height of the dialog */
  maxHeight?: number | string;
  /** Minimum width of the dialog */
  minWidth?: number | string;
  /** Minimum height of the dialog */
  minHeight?: number | string;
  /** Custom aria-label for the dialog */
  'aria-label'?: string;
  /** Custom aria-labelledby for the dialog */
  'aria-labelledby'?: string;
  /** Custom aria-describedby for the dialog */
  'aria-describedby'?: string;
  /** Called when the dialog opens */
  onOpen?: () => void;
  /** Called after the dialog closes */
  onAfterClose?: () => void;
  /** Whether to disable scroll on body when open */
  disableBodyScroll?: boolean;
  /** Whether to focus the dialog on open */
  autoFocus?: boolean;
  /** Whether to restore focus on close */
  restoreFocus?: boolean;
}

const defaultPresets: Record<string, Partial<NineSliceProps>> = {
  fantasy: {
    slices: { top: 32, right: 32, bottom: 32, left: 32 },
    contentPadding: { top: 40, right: 40, bottom: 40, left: 40 }
  },
  medieval: {
    slices: { top: 24, right: 24, bottom: 24, left: 24 },
    contentPadding: { top: 32, right: 32, bottom: 32, left: 32 }
  },
  modern: {
    slices: { top: 8, right: 8, bottom: 8, left: 8 },
    contentPadding: { top: 24, right: 24, bottom: 24, left: 24 }
  },
  retro: {
    slices: { top: 16, right: 16, bottom: 16, left: 16 },
    contentPadding: { top: 20, right: 20, bottom: 20, left: 20 }
  },
  dark: {
    slices: { top: 12, right: 12, bottom: 12, left: 12 },
    contentPadding: { top: 24, right: 24, bottom: 24, left: 24 }
  },
  light: {
    slices: { top: 12, right: 12, bottom: 12, left: 12 },
    contentPadding: { top: 24, right: 24, bottom: 24, left: 24 }
  }
};

export const NineSliceDialog: React.FC<NineSliceDialogProps> = ({
  open,
  onClose,
  title,
  header,
  footer,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  variant = 'modern',
  animation = 'scale',
  container,
  zIndex = 1000,
  overlayClassName,
  overlayStyle,
  contentPadding,
  maxWidth = '90vw',
  maxHeight = '90vh',
  minWidth,
  minHeight,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  onOpen,
  onAfterClose,
  disableBodyScroll = true,
  autoFocus = true,
  restoreFocus = true,
  className,
  style,
  ...nineSliceProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const titleId = useRef(`nine-slice-dialog-title-${Date.now()}`);
  const contentId = useRef(`nine-slice-dialog-content-${Date.now()}`);

  // Handle body scroll lock
  useEffect(() => {
    if (disableBodyScroll && open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [open, disableBodyScroll]);

  // Handle dialog open/close animations
  useEffect(() => {
    if (open) {
      if (restoreFocus) {
        previousActiveElement.current = document.activeElement as HTMLElement;
      }
      setIsVisible(true);
      setIsAnimating(true);
      onOpen?.();
      
      // Focus the dialog after animation
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (autoFocus && dialogRef.current) {
          const focusableElement = dialogRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          if (focusableElement) {
            focusableElement.focus();
          } else {
            dialogRef.current.focus();
          }
        }
      }, 150);
      
      return () => clearTimeout(timer);
    } else if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        if (restoreFocus && previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
        onAfterClose?.();
      }, 150);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, autoFocus, restoreFocus, onOpen, onAfterClose, isVisible]);

  // Handle escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && open) {
      event.preventDefault();
      onClose?.();
    }
  }, [closeOnEscape, open, onClose]);

  // Handle focus trap
  const handleDialogKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  }, []);

  // Handle overlay click
  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose?.();
    }
  }, [closeOnOverlayClick, onClose]);

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Attach/detach event listeners
  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
    return undefined;
  }, [open, handleKeyDown]);

  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  // Get preset configuration
  const presetConfig = defaultPresets[variant] || defaultPresets.modern;
  
  // Merge props with preset
  const mergedProps = {
    ...presetConfig,
    ...nineSliceProps,
    contentPadding: contentPadding ?? presetConfig.contentPadding,
    style: {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      ...style
    },
    className: `${styles.dialog} ${styles[`dialog--${variant}`]} ${className || ''}`
  };

  // Determine ARIA attributes
  const ariaLabelledByValue = ariaLabelledBy || (title ? titleId.current : undefined);
  const ariaDescribedByValue = ariaDescribedBy || contentId.current;

  const dialogContent = (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${overlayClassName || ''}`}
      style={{
        zIndex,
        ...overlayStyle
      }}
      onClick={handleOverlayClick}
      data-animation={animation}
      data-animating={isAnimating}
    >
      <div
        ref={dialogRef}
        className={`${styles.dialogContainer} ${styles[`animation--${animation}`]}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledByValue}
        aria-describedby={ariaDescribedByValue}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        data-animating={isAnimating}
      >
        <NineSlice {...mergedProps}>
          <div className={styles.dialogContent}>
            {(title || header || showCloseButton) && (
              <div className={styles.dialogHeader}>
                {header || (
                  <>
                    {title && (
                      <h2 id={titleId.current} className={styles.dialogTitle}>
                        {title}
                      </h2>
                    )}
                    {showCloseButton && (
                      <button
                        type="button"
                        className={`${styles.closeButton} ${styles[`closeButton--${variant}`]}`}
                        onClick={handleCloseClick}
                        aria-label="Close dialog"
                      >
                        <span className={styles.closeIcon}>×</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
            
            <div
              id={contentId.current}
              className={styles.dialogBody}
            >
              {children}
            </div>
            
            {footer && (
              <div className={styles.dialogFooter}>
                {footer}
              </div>
            )}
          </div>
        </NineSlice>
      </div>
    </div>
  );

  // Render in portal
  const portalContainer = container || document.body;
  return createPortal(dialogContent, portalContainer);
};

export default NineSliceDialog;