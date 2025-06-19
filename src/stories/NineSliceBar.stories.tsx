import type { Meta, StoryObj } from '@storybook/react';
import { NineSliceBar } from '../components/NineSliceBar';

const meta: Meta<typeof NineSliceBar> = {
  title: 'Components/NineSliceBar',
  component: NineSliceBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress bar component with nine-slice scaling, perfect for game UIs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Current value of the progress bar',
    },
    maxValue: {
      control: { type: 'number', min: 1, max: 1000, step: 1 },
      description: 'Maximum value of the progress bar',
    },
    variant: {
      control: { type: 'select' },
      options: ['health', 'mana', 'experience', 'progress'],
    },
    preset: {
      control: { type: 'select' },
      options: ['fantasy', 'cyberpunk', 'retro', 'modern'],
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    animated: {
      control: { type: 'boolean' },
    },
    showLabel: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 75,
    maxValue: 100,
    variant: 'health',
    showLabel: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      {['health', 'mana', 'experience', 'progress'].map((variant) => (
        <div key={variant}>
          <h4 style={{ margin: '0 0 8px 0', textTransform: 'capitalize' }}>{variant}</h4>
          <NineSliceBar
            variant={variant as any}
            value={Math.random() * 100}
            maxValue={100}
            showLabel={true}
          />
        </div>
      ))}
    </div>
  ),
};

export const GamePresets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      {['fantasy', 'cyberpunk', 'retro', 'modern'].map((preset) => (
        <div key={preset}>
          <h4 style={{ margin: '0 0 8px 0', textTransform: 'capitalize' }}>{preset}</h4>
          <NineSliceBar
            preset={preset as any}
            variant="health"
            value={80}
            maxValue={100}
            showLabel={true}
          />
        </div>
      ))}
    </div>
  ),
};

export const LowHealth: Story = {
  args: {
    value: 15,
    maxValue: 100,
    variant: 'health',
    showLabel: true,
    animated: true,
  },
};

export const Segmented: Story = {
  args: {
    value: 6,
    maxValue: 10,
    variant: 'health',
    showLabel: true,
    segments: 10,
  },
};

export const Vertical: Story = {
  args: {
    value: 60,
    maxValue: 100,
    variant: 'mana',
    direction: 'vertical',
    showLabel: true,
    style: { height: '200px' },
  },
};

export const CustomLabel: Story = {
  args: {
    value: 1250,
    maxValue: 2000,
    variant: 'experience',
    showLabel: true,
    labelFormat: '{value} / {maxValue} XP',
  },
};

export const Animated: Story = {
  args: {
    value: 45,
    maxValue: 100,
    variant: 'progress',
    animated: true,
    showLabel: true,
  },
};