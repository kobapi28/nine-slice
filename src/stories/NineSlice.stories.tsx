import type { Meta, StoryObj } from '@storybook/react';
import { NineSlice } from '../components/NineSlice';

const meta: Meta<typeof NineSlice> = {
  title: 'Components/NineSlice',
  component: NineSlice,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile nine-slice component for creating scalable UI elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 100, max: 800, step: 10 },
      description: 'Width of the component',
    },
    height: {
      control: { type: 'number', min: 50, max: 600, step: 10 },
      description: 'Height of the component',
    },
    slices: {
      control: { type: 'text' },
      description: 'Nine-slice boundaries',
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base64 sample image for demo
const sampleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

export const Default: Story = {
  args: {
    src: sampleImage,
    width: 200,
    height: 100,
    slices: 30,
  },
};

export const WithContent: Story = {
  args: {
    src: sampleImage,
    width: 300,
    height: 200,
    slices: 30,
    children: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Nine Slice Content</h3>
        <p>This content is rendered inside the nine-slice container.</p>
      </div>
    ),
  },
};

export const CustomSlicing: Story = {
  args: {
    src: sampleImage,
    width: 250,
    height: 150,
    slices: { top: 20, right: 30, bottom: 40, left: 10 },
  },
};

export const Responsive: Story = {
  args: {
    src: sampleImage,
    width: '100%',
    height: 120,
    slices: 25,
    style: { maxWidth: '400px' },
  },
};