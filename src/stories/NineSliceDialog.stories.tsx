import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NineSliceDialog } from '../components/NineSliceDialog';
import { NineSliceButton } from '../components/NineSliceButton';

const meta: Meta<typeof NineSliceDialog> = {
  title: 'Components/NineSliceDialog',
  component: NineSliceDialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal dialog component with nine-slice styling and various animation effects.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    animation: {
      control: { type: 'select' },
      options: ['fade', 'scale', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'],
    },
    preset: {
      control: { type: 'select' },
      options: ['fantasy', 'medieval', 'stone', 'wood', 'modern', 'glass'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'fullscreen'],
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const DialogWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <NineSliceButton onClick={() => setIsOpen(true)} variant="primary">
        Open Dialog
      </NineSliceButton>
      <NineSliceDialog
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </NineSliceDialog>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <div style={{ padding: '20px' }}>
        <h2>Default Dialog</h2>
        <p>This is a basic nine-slice dialog with default styling.</p>
        <NineSliceButton variant="secondary">Action Button</NineSliceButton>
      </div>
    </DialogWrapper>
  ),
  args: {
    animation: 'fade',
    preset: 'fantasy',
  },
};

export const WithHeader: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <div>
        <div style={{ 
          padding: '15px 20px', 
          borderBottom: '1px solid #333', 
          background: 'rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0 }}>Dialog Title</h2>
        </div>
        <div style={{ padding: '0 20px 20px' }}>
          <p>Dialog content goes here. This dialog has a header section.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <NineSliceButton variant="primary">Confirm</NineSliceButton>
            <NineSliceButton variant="secondary">Cancel</NineSliceButton>
          </div>
        </div>
      </div>
    </DialogWrapper>
  ),
  args: {
    animation: 'scale',
    preset: 'medieval',
    size: 'medium',
  },
};

export const GamePresets: Story = {
  render: () => {
    const [currentPreset, setCurrentPreset] = useState('fantasy');
    const [isOpen, setIsOpen] = useState(false);
    const presets = ['fantasy', 'medieval', 'stone', 'wood', 'modern', 'glass'];

    return (
      <div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {presets.map((preset) => (
            <NineSliceButton
              key={preset}
              variant={currentPreset === preset ? 'primary' : 'secondary'}
              onClick={() => {
                setCurrentPreset(preset);
                setIsOpen(true);
              }}
            >
              {preset}
            </NineSliceButton>
          ))}
        </div>
        <NineSliceDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          preset={currentPreset as any}
          animation="slideUp"
        >
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <h2 style={{ textTransform: 'capitalize', marginBottom: '15px' }}>
              {currentPreset} Dialog
            </h2>
            <p>This dialog uses the {currentPreset} preset styling.</p>
            <NineSliceButton 
              variant="primary" 
              onClick={() => setIsOpen(false)}
              style={{ marginTop: '20px' }}
            >
              Close
            </NineSliceButton>
          </div>
        </NineSliceDialog>
      </div>
    );
  },
};

export const Animations: Story = {
  render: () => {
    const [currentAnimation, setCurrentAnimation] = useState('fade');
    const [isOpen, setIsOpen] = useState(false);
    const animations = ['fade', 'scale', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'];

    return (
      <div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {animations.map((animation) => (
            <NineSliceButton
              key={animation}
              variant="primary"
              onClick={() => {
                setCurrentAnimation(animation);
                setIsOpen(true);
              }}
            >
              {animation}
            </NineSliceButton>
          ))}
        </div>
        <NineSliceDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          animation={currentAnimation as any}
          preset="fantasy"
        >
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <h2>Animation: {currentAnimation}</h2>
            <p>This dialog opened with the {currentAnimation} animation.</p>
            <NineSliceButton 
              variant="secondary" 
              onClick={() => setIsOpen(false)}
              style={{ marginTop: '20px' }}
            >
              Close
            </NineSliceButton>
          </div>
        </NineSliceDialog>
      </div>
    );
  },
};

export const QuestDialog: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <div>
        <div style={{ 
          padding: '20px', 
          background: 'linear-gradient(135deg, #2c1810, #4a2c17)',
          color: '#f4e4bc',
          borderBottom: '2px solid #8b4513'
        }}>
          <h2 style={{ margin: 0, color: '#ffd700' }}>🏰 Quest Available</h2>
        </div>
        <div style={{ padding: '25px', background: '#1a1a1a', color: '#f4e4bc' }}>
          <h3 style={{ color: '#ff6b35', marginBottom: '15px' }}>The Dragon's Treasure</h3>
          <p style={{ lineHeight: 1.6, marginBottom: '20px' }}>
            A fearsome dragon has been terrorizing the nearby village. 
            Brave adventurer, will you accept this perilous quest to defeat 
            the beast and claim its legendary treasure?
          </p>
          <div style={{ marginBottom: '20px' }}>
            <strong>Rewards:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>1000 Gold Coins</li>
              <li>Dragon Scale Armor</li>
              <li>Experience Points: 5000</li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <NineSliceButton variant="success" preset="fantasy">
              Accept Quest
            </NineSliceButton>
            <NineSliceButton variant="danger" preset="fantasy">
              Decline
            </NineSliceButton>
          </div>
        </div>
      </div>
    </DialogWrapper>
  ),
  args: {
    animation: 'scale',
    preset: 'fantasy',
    size: 'large',
  },
};