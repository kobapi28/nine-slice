import { CSSProperties, ReactNode } from 'react';

/**
 * Render mode for the nine-slice component
 */
export type RenderMode = 'auto' | 'css' | 'canvas' | 'svg';

/**
 * Scaling mode for edges and center areas
 */
export type ScalingMode = 'stretch' | 'repeat' | 'round' | 'none';

/**
 * Configuration for slice boundaries
 */
export type SliceConfig = {
  /** Distance from the top edge */
  top: number;
  /** Distance from the right edge */
  right: number;
  /** Distance from the bottom edge */
  bottom: number;
  /** Distance from the left edge */
  left: number;
} | number; // Single number applies to all sides

/**
 * Size configuration for corners
 */
export interface CornerSize {
  /** Width of corner sections */
  width: number;
  /** Height of corner sections */
  height: number;
}

/**
 * Collection of nine images for nine-slice rendering
 */
export interface NineSliceImages {
  /** Top-left corner image */
  topLeft: string;
  /** Top-center edge image */
  topCenter: string;
  /** Top-right corner image */
  topRight: string;
  /** Middle-left edge image */
  middleLeft: string;
  /** Middle-center fill image */
  middleCenter: string;
  /** Middle-right edge image */
  middleRight: string;
  /** Bottom-left corner image */
  bottomLeft: string;
  /** Bottom-center edge image */
  bottomCenter: string;
  /** Bottom-right corner image */
  bottomRight: string;
}

/**
 * Alternative image format with corners and edges grouped
 */
export interface GroupedImages {
  /** Corner images */
  corners: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  /** Edge images */
  edges: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  /** Center fill image */
  center: string;
}

/**
 * Sprite sheet region definition
 */
export interface SpriteRegion {
  /** X coordinate in the sprite sheet */
  x: number;
  /** Y coordinate in the sprite sheet */
  y: number;
  /** Width of the region */
  width: number;
  /** Height of the region */
  height: number;
}

/**
 * Animation state configuration
 */
export interface AnimationState {
  /** Scale factor */
  scale?: number;
  /** Brightness multiplier */
  brightness?: number;
  /** CSS box-shadow property */
  shadow?: string;
  /** Opacity value (0-1) */
  opacity?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Additional CSS properties */
  [key: string]: any;
}

/**
 * Animation states configuration
 */
export interface AnimationStates {
  /** Default state */
  idle: AnimationState;
  /** Hover state */
  hover?: AnimationState;
  /** Active/pressed state */
  active?: AnimationState;
  /** Disabled state */
  disabled?: AnimationState;
  /** Additional custom states */
  [key: string]: AnimationState | undefined;
}

/**
 * Transition configuration for animations
 */
export interface TransitionConfig {
  /** Duration in milliseconds */
  duration: number;
  /** CSS easing function */
  easing?: string;
  /** Delay before transition starts */
  delay?: number;
}

/**
 * Layer configuration for multi-layered nine-slice
 */
export interface LayerConfig {
  /** Images for this layer */
  images: NineSliceImages | GroupedImages;
  /** Position offset */
  offset?: { x: number; y: number };
  /** Layer opacity */
  opacity?: number;
  /** Blur amount */
  blur?: number;
  /** Z-index for stacking */
  zIndex?: number;
  /** CSS blend mode */
  blendMode?: string;
  /** Animation type */
  animate?: 'slide' | 'fade' | 'pulse' | string;
}

/**
 * Main props for the NineSlice component
 */
export interface NineSliceProps {
  /** Single image source (will be sliced according to slices prop) */
  src?: string;
  
  /** Nine individual images */
  images?: NineSliceImages | GroupedImages;
  
  /** Sprite sheet source */
  spriteSheet?: string;
  
  /** Region within sprite sheet */
  spriteRegion?: SpriteRegion;
  
  /** Slice configuration (used with src or spriteSheet) */
  slices?: SliceConfig;
  
  /** Corner size (used with images prop) */
  cornerSize?: CornerSize;
  
  /** Component dimensions */
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  
  /** Scaling modes */
  edgeMode?: ScalingMode;
  centerMode?: ScalingMode;
  
  /** Rendering options */
  renderMode?: RenderMode;
  pixelPerfect?: boolean;
  
  /** Styling */
  className?: string;
  style?: CSSProperties;
  
  /** Content */
  children?: ReactNode;
  
  /** Performance options */
  lazy?: boolean;
  placeholder?: ReactNode;
  
  /** Event handlers */
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onClick?: (event: React.MouseEvent) => void;
  onHover?: (hovering: boolean) => void;
}

/**
 * Props for dialog variant component
 */
export interface NineSliceDialogProps extends NineSliceProps {
  /** Dialog style variant */
  variant?: 'fantasy' | 'modern' | 'retro' | 'minimal' | string;
  /** Dialog title */
  title?: ReactNode;
  /** Show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Enable shadow effect */
  shadow?: boolean;
  /** Padding inside dialog */
  padding?: number | string;
}

/**
 * Props for button variant component
 */
export interface NineSliceButtonProps extends NineSliceProps {
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | string;
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Disabled state */
  disabled?: boolean;
  /** Hover effect type */
  hoverEffect?: 'glow' | 'lift' | 'brightness' | 'none';
  /** Press effect type */
  pressEffect?: 'scale' | 'darken' | 'none';
}

/**
 * Props for progress bar component
 */
export interface NineSliceBarProps extends Omit<NineSliceProps, 'width'> {
  /** Current value */
  value: number;
  /** Maximum value */
  maxValue: number;
  /** Bar variant */
  variant?: 'hp' | 'mana' | 'experience' | 'progress' | string;
  /** Fill color */
  fillColor?: string;
  /** Show label */
  showLabel?: boolean | string;
  /** Enable animation */
  animated?: boolean;
  /** Glow when full */
  glowOnFull?: boolean;
  /** Bar width */
  width?: number | string;
}

/**
 * Props for frame component
 */
export interface NineSliceFrameProps extends NineSliceProps {
  /** Frame style variant */
  variant?: 'golden' | 'silver' | 'wood' | 'stone' | 'modern' | 'ornate' | 'minimal' | string;
  /** Frame thickness in pixels */
  thickness?: number;
  /** Corner style */
  cornerStyle?: 'rounded' | 'square' | 'ornate' | 'beveled';
  /** Animation type */
  animate?: 'shimmer' | 'glow' | 'pulse' | 'none';
  /** Content type optimization */
  contentType?: 'portrait' | 'avatar' | 'card' | 'content';
  /** Level badge number */
  level?: number;
  /** Status indicator */
  status?: 'active' | 'inactive' | 'warning' | 'error' | 'success';
  /** Enable shadow effect */
  shadow?: boolean | 'inner' | 'outer' | 'both';
  /** Enable glow effect */
  glow?: boolean | string;
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

/**
 * Props for panel component
 */
export interface NineSlicePanelProps extends NineSliceProps {
  /** Panel style variant */
  variant?: 'wood' | 'metal' | 'glass' | 'stone' | string;
  /** Padding inside panel */
  padding?: number | string;
  /** Enable shadow */
  shadow?: boolean;
}

/**
 * Props for animated nine-slice component
 */
export interface NineSliceAnimatedProps extends NineSliceProps {
  /** Animation states */
  states: AnimationStates;
  /** Transition configuration */
  transition?: TransitionConfig;
  /** Initial state */
  initialState?: keyof AnimationStates;
}

/**
 * Props for layered nine-slice component
 */
export interface NineSliceLayeredProps extends Omit<NineSliceProps, 'images' | 'src'> {
  /** Layer configurations */
  layers?: LayerConfig[];
}

/**
 * Props for individual layer component
 */
export interface NineSliceLayerProps extends LayerConfig {
  /** Layer children */
  children?: ReactNode;
}

/**
 * Bar-specific images interface
 */
export interface BarImages {
  /** Left cap image */
  left: string;
  /** Center fill image */
  center: string;
  /** Right cap image */
  right: string;
}

/**
 * Preset configuration
 */
export interface PresetConfig {
  /** Default images for the preset */
  images?: Partial<NineSliceImages>;
  /** Default slice configuration */
  slices?: SliceConfig;
  /** Default corner size */
  cornerSize?: CornerSize;
  /** Default edge mode */
  edgeMode?: ScalingMode;
  /** Default center mode */
  centerMode?: ScalingMode;
  /** Additional default props */
  defaultProps?: Partial<NineSliceProps>;
}

/**
 * Image preload options
 */
export interface PreloadOptions {
  /** Show loading progress */
  showProgress?: boolean;
  /** Timeout in milliseconds */
  timeout?: number;
  /** Error handling strategy */
  onError?: 'ignore' | 'warn' | 'throw';
}