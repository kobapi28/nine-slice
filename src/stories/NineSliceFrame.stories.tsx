import type { Meta, StoryObj } from '@storybook/react';
import { NineSliceFrame } from '../components/NineSliceFrame';

const meta: Meta<typeof NineSliceFrame> = {
  title: 'Components/NineSliceFrame',
  component: NineSliceFrame,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Decorative frame component with various styles and effects.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['golden', 'silver', 'wood', 'stone', 'modern', 'ornate', 'minimal'],
    },
    thickness: {
      control: { type: 'number', min: 1, max: 50, step: 1 },
    },
    cornerStyle: {
      control: { type: 'select' },
      options: ['rounded', 'sharp', 'ornate'],
    },
    effect: {
      control: { type: 'select' },
      options: ['none', 'shimmer', 'glow', 'pulse'],
    },
    rarity: {
      control: { type: 'select' },
      options: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'golden',
    thickness: 8,
    children: (
      <div style={{ 
        width: '200px', 
        height: '150px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f0f0f0',
        color: '#333'
      }}>
        <p>Framed Content</p>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
      {['golden', 'silver', 'wood', 'stone', 'modern', 'ornate', 'minimal'].map((variant) => (
        <div key={variant}>
          <h4 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{variant}</h4>
          <NineSliceFrame variant={variant as any} thickness={6}>
            <div style={{ 
              width: '140px', 
              height: '100px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#f5f5f5',
              fontSize: '12px'
            }}>
              {variant}
            </div>
          </NineSliceFrame>
        </div>
      ))}
    </div>
  ),
};

export const Portrait: Story = {
  args: {
    variant: 'golden',
    thickness: 12,
    cornerStyle: 'ornate',
    children: (
      <div style={{ 
        width: '120px', 
        height: '160px', 
        background: 'linear-gradient(45deg, #8B4513, #D2691E)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold'
      }}>
        Portrait
      </div>
    ),
  },
};

export const WithEffects: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {['shimmer', 'glow', 'pulse'].map((effect) => (
        <div key={effect}>
          <h4 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{effect}</h4>
          <NineSliceFrame variant="golden" thickness={8} effect={effect as any}>
            <div style={{ 
              width: '140px', 
              height: '100px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#f0f0f0'
            }}>
              {effect}
            </div>
          </NineSliceFrame>
        </div>
      ))}
    </div>
  ),
};

export const RaritySystem: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
      {['common', 'uncommon', 'rare', 'epic', 'legendary'].map((rarity) => (
        <div key={rarity}>
          <h4 style={{ textAlign: 'center', margin: '0 0 10px 0', textTransform: 'capitalize' }}>{rarity}</h4>
          <NineSliceFrame 
            variant="golden" 
            thickness={6} 
            rarity={rarity as any}
            effect={rarity === 'legendary' ? 'glow' : rarity === 'epic' ? 'shimmer' : 'none'}
          >
            <div style={{ 
              width: '100px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#f5f5f5',
              fontSize: '12px'
            }}>
              Item
            </div>
          </NineSliceFrame>
        </div>
      ))}
    </div>
  ),
};

export const GameCard: Story = {
  args: {
    variant: 'ornate',
    thickness: 10,
    cornerStyle: 'ornate',
    rarity: 'epic',
    effect: 'shimmer',
    children: (
      <div style={{ 
        width: '180px', 
        height: '240px', 
        background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
        color: 'white',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#ff6b35' }}>Epic Sword</h3>
          <p style={{ fontSize: '12px', margin: '0', opacity: 0.8 }}>
            A legendary blade forged in the fires of Mount Doom.
          </p>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          ATK: 250
        </div>
      </div>
    ),
  },
};