import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { NineSliceButton, NineSliceButtonProps } from './NineSliceButton';

// Mock the CSS module
vi.mock('./NineSliceButton.module.css', () => ({
  default: {
  nineSliceButton: 'nineSliceButton',
  'variant-primary': 'variant-primary',
  'variant-secondary': 'variant-secondary',
  'variant-success': 'variant-success',
  'variant-danger': 'variant-danger',
  'variant-warning': 'variant-warning',
  'variant-info': 'variant-info',
  'variant-light': 'variant-light',
  'variant-dark': 'variant-dark',
  'size-small': 'size-small',
  'size-medium': 'size-medium',
  'size-large': 'size-large',
  'size-xlarge': 'size-xlarge',
  'preset-fantasy': 'preset-fantasy',
  'preset-medieval': 'preset-medieval',
  'preset-sci-fi': 'preset-sci-fi',
  'preset-retro': 'preset-retro',
  'preset-modern': 'preset-modern',
  disabled: 'disabled',
  loading: 'loading',
  pressed: 'pressed',
  focused: 'focused',
  hovered: 'hovered',
  'pressEffect-scale': 'pressEffect-scale',
  'pressEffect-glow': 'pressEffect-glow',
  'pressEffect-shadow': 'pressEffect-shadow',
  'pressEffect-none': 'pressEffect-none',
  icon: 'icon',
  'icon-left': 'icon-left',
  'icon-right': 'icon-right',
  loadingSpinner: 'loadingSpinner',
  spinner: 'spinner',
  spinnerCircle: 'spinnerCircle',
  text: 'text',
  textHidden: 'textHidden',
  buttonElement: 'buttonElement',
  },
}));

// Mock the NineSlice component
vi.mock('../NineSlice/NineSlice', () => ({
  NineSlice: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('NineSliceButton', () => {
  const defaultProps: NineSliceButtonProps = {
    src: 'button-bg.png',
    slices: { top: 10, right: 10, bottom: 10, left: 10 },
    children: 'Click me',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<NineSliceButton {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders button text', () => {
      render(<NineSliceButton {...defaultProps}>Test Button</NineSliceButton>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} variant="secondary" />
      );
      expect(container.firstChild).toHaveClass('variant-secondary');
    });

    it('applies size classes', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} size="large" />
      );
      expect(container.firstChild).toHaveClass('size-large');
    });

    it('applies custom className', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} className="custom-button" />
      );
      expect(container.firstChild).toHaveClass('custom-button');
    });
  });

  describe('Button variants', () => {
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        const { container } = render(
          <NineSliceButton {...defaultProps} variant={variant} />
        );
        expect(container.firstChild).toHaveClass(`variant-${variant}`);
      });
    });
  });

  describe('Button sizes', () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        const { container } = render(
          <NineSliceButton {...defaultProps} size={size} />
        );
        expect(container.firstChild).toHaveClass(`size-${size}`);
      });
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} disabled />
      );
      expect(container.firstChild).toHaveClass('disabled');
    });

    it('sets button disabled attribute', () => {
      render(<NineSliceButton {...defaultProps} disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('prevents click when disabled', () => {
      const onClick = vi.fn();
      render(<NineSliceButton {...defaultProps} disabled onClick={onClick} />);
      
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('sets aria-disabled attribute', () => {
      render(<NineSliceButton {...defaultProps} disabled />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Loading state', () => {
    it('applies loading class when loading', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} loading />
      );
      expect(container.firstChild).toHaveClass('loading');
    });

    it('shows default spinner when loading', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} loading />
      );
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('shows custom spinner when provided', () => {
      const customSpinner = <div data-testid="custom-spinner">Loading...</div>;
      render(
        <NineSliceButton {...defaultProps} loading spinner={customSpinner} />
      );
      expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
    });

    it('hides text when loading', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} loading>Button Text</NineSliceButton>
      );
      expect(container.querySelector('.textHidden')).toBeInTheDocument();
    });

    it('prevents click when loading', () => {
      const onClick = vi.fn();
      render(<NineSliceButton {...defaultProps} loading onClick={onClick} />);
      
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('sets button disabled when loading', () => {
      render(<NineSliceButton {...defaultProps} loading />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Icons', () => {
    const testIcon = <span data-testid="test-icon">★</span>;

    it('renders icon on the left by default', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} icon={testIcon} />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(container.querySelector('.icon-left')).toBeInTheDocument();
    });

    it('renders icon on the right when specified', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} icon={testIcon} iconPosition="right" />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(container.querySelector('.icon-right')).toBeInTheDocument();
    });

    it('hides icon when loading', () => {
      render(
        <NineSliceButton {...defaultProps} icon={testIcon} loading />
      );
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    it('sets aria-hidden on icon', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} icon={testIcon} />
      );
      expect(container.querySelector('.icon')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Press effects', () => {
    const pressEffects = ['scale', 'glow', 'shadow', 'none'] as const;

    pressEffects.forEach(effect => {
      it(`applies ${effect} press effect class`, () => {
        const { container } = render(
          <NineSliceButton {...defaultProps} pressEffect={effect} />
        );
        
        if (effect !== 'none') {
          expect(container.firstChild).toHaveClass(`pressEffect-${effect}`);
        } else {
          expect(container.firstChild).not.toHaveClass('pressEffect-none');
        }
      });
    });
  });

  describe('Interaction states', () => {
    it('applies pressed class on mouse down', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.mouseDown(button);
      expect(container.firstChild).toHaveClass('pressed');
    });

    it('removes pressed class on mouse up', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      expect(container.firstChild).not.toHaveClass('pressed');
    });

    it('applies hovered class on mouse enter', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.mouseEnter(button);
      expect(container.firstChild).toHaveClass('hovered');
    });

    it('removes hovered class on mouse leave', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.mouseEnter(button);
      fireEvent.mouseLeave(button);
      expect(container.firstChild).not.toHaveClass('hovered');
    });

    it('applies focused class on focus', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.focus(button);
      expect(container.firstChild).toHaveClass('focused');
    });

    it('removes focused class on blur', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.focus(button);
      fireEvent.blur(button);
      expect(container.firstChild).not.toHaveClass('focused');
    });
  });

  describe('Keyboard interaction', () => {
    it('applies pressed class on Space key down', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: ' ' });
      expect(container.firstChild).toHaveClass('pressed');
    });

    it('applies pressed class on Enter key down', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(container.firstChild).toHaveClass('pressed');
    });

    it('removes pressed class on key up', () => {
      const { container } = render(<NineSliceButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: ' ' });
      fireEvent.keyUp(button, { key: ' ' });
      expect(container.firstChild).not.toHaveClass('pressed');
    });

    it('does not apply pressed state when disabled', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} disabled />
      );
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: ' ' });
      expect(container.firstChild).not.toHaveClass('pressed');
    });

    it('does not apply pressed state when loading', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} loading />
      );
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: ' ' });
      expect(container.firstChild).not.toHaveClass('pressed');
    });
  });

  describe('Event handlers', () => {
    it('calls onClick when clicked', () => {
      const onClickSpy = vi.fn();
      render(<NineSliceButton {...defaultProps} onClick={onClickSpy} />);
      
      fireEvent.click(screen.getByRole('button'));
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus when focused', () => {
      const onFocusSpy = vi.fn();
      render(<NineSliceButton {...defaultProps} onFocus={onFocusSpy} />);
      
      fireEvent.focus(screen.getByRole('button'));
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', () => {
      const onBlurSpy = vi.fn();
      render(<NineSliceButton {...defaultProps} onBlur={onBlurSpy} />);
      
      fireEvent.blur(screen.getByRole('button'));
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('calls onKeyDown when key is pressed', () => {
      const onKeyDownSpy = vi.fn();
      render(<NineSliceButton {...defaultProps} onKeyDown={onKeyDownSpy} />);
      
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button types', () => {
    it('defaults to button type', () => {
      render(<NineSliceButton {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('accepts submit type', () => {
      render(<NineSliceButton {...defaultProps} type="submit" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('accepts reset type', () => {
      render(<NineSliceButton {...defaultProps} type="reset" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  describe('Accessibility', () => {
    it('sets aria-label when provided', () => {
      render(
        <NineSliceButton {...defaultProps} aria-label="Custom button" />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom button');
    });

    it('sets aria-describedby when provided', () => {
      render(
        <NineSliceButton {...defaultProps} aria-describedby="button-description" />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'button-description');
    });

    it('sets aria-pressed when provided', () => {
      render(
        <NineSliceButton {...defaultProps} aria-pressed={true} />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('has proper aria-hidden on spinner', () => {
      const { container } = render(
        <NineSliceButton {...defaultProps} loading />
      );
      expect(container.querySelector('.loadingSpinner')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Game presets', () => {
    const gamePresets = ['fantasy', 'medieval', 'sci-fi', 'retro', 'modern'] as const;

    gamePresets.forEach(preset => {
      it(`applies ${preset} game preset class`, () => {
        const { container } = render(
          <NineSliceButton {...defaultProps} gamePreset={preset} />
        );
        expect(container.firstChild).toHaveClass(`preset-${preset}`);
      });
    });
  });

  describe('forwardRef', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<NineSliceButton {...defaultProps} ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });

  describe('Display name', () => {
    it('has correct display name', () => {
      expect(NineSliceButton.displayName).toBe('NineSliceButton');
    });
  });

  describe('Integration with NineSlice', () => {
    it('passes nine-slice props to NineSlice component', () => {
      const nineSliceProps = {
        src: 'test.png',
        slices: { top: 5, right: 5, bottom: 5, left: 5 },
        edgeMode: 'repeat' as const,
      };

      render(<NineSliceButton {...nineSliceProps}>Test</NineSliceButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});