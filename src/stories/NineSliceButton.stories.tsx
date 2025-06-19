import type { Meta, StoryObj } from '@storybook/react';
import { NineSliceButton } from '../components/NineSliceButton';

const meta: Meta<typeof NineSliceButton> = {
  title: 'Components/NineSliceButton',
  component: NineSliceButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive button component with nine-slice scaling and multiple variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    gamePreset: {
      control: { type: 'select' },
      options: ['fantasy', 'medieval', 'sci-fi', 'retro', 'modern'],
    },
    pressEffect: {
      control: { type: 'select' },
      options: ['scale', 'glow', 'shadow', 'none'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map((variant) => (
        <NineSliceButton key={variant} variant={variant as any}>
          {variant}
        </NineSliceButton>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
      {['small', 'medium', 'large', 'xlarge'].map((size) => (
        <NineSliceButton key={size} size={size as any} variant="primary">
          {size} Button
        </NineSliceButton>
      ))}
    </div>
  ),
};

export const GamePresets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {['fantasy', 'medieval', 'sci-fi', 'retro', 'modern'].map((preset) => (
        <NineSliceButton key={preset} gamePreset={preset as any} variant="primary">
          {preset}
        </NineSliceButton>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'Button with Icon',
    variant: 'primary',
    icon: '⚔️',
    iconPosition: 'left',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

export const PressEffects: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {['scale', 'glow', 'shadow', 'none'].map((effect) => (
        <NineSliceButton key={effect} pressEffect={effect as any} variant="primary">
          {effect}
        </NineSliceButton>
      ))}
    </div>
  ),
};