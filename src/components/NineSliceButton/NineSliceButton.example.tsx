import React, { useState } from 'react';
import { NineSliceButton } from './NineSliceButton';

// Example usage of NineSliceButton component
export const NineSliceButtonExamples: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  // Example icon components
  const PlayIcon = () => <span>▶️</span>;
  const DownloadIcon = () => <span>⬇️</span>;
  const HeartIcon = () => <span>❤️</span>;
  const SwordIcon = () => <span>⚔️</span>;

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>NineSliceButton Examples</h2>
      
      {/* Basic Variants */}
      <section>
        <h3>Button Variants</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <NineSliceButton variant="primary">Primary</NineSliceButton>
          <NineSliceButton variant="secondary">Secondary</NineSliceButton>
          <NineSliceButton variant="success">Success</NineSliceButton>
          <NineSliceButton variant="danger">Danger</NineSliceButton>
          <NineSliceButton variant="warning">Warning</NineSliceButton>
          <NineSliceButton variant="info">Info</NineSliceButton>
          <NineSliceButton variant="light">Light</NineSliceButton>
          <NineSliceButton variant="dark">Dark</NineSliceButton>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3>Button Sizes</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <NineSliceButton size="small" variant="primary">Small</NineSliceButton>
          <NineSliceButton size="medium" variant="primary">Medium</NineSliceButton>
          <NineSliceButton size="large" variant="primary">Large</NineSliceButton>
          <NineSliceButton size="xlarge" variant="primary">X-Large</NineSliceButton>
        </div>
      </section>

      {/* States */}
      <section>
        <h3>Button States</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <NineSliceButton variant="primary">Normal</NineSliceButton>
          <NineSliceButton variant="primary" disabled>Disabled</NineSliceButton>
          <NineSliceButton variant="primary" loading={loading} onClick={handleAsyncAction}>
            {loading ? 'Loading...' : 'Load Data'}
          </NineSliceButton>
        </div>
      </section>

      {/* Icons */}
      <section>
        <h3>With Icons</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <NineSliceButton variant="success" icon={<PlayIcon />} iconPosition="left">
            Play
          </NineSliceButton>
          <NineSliceButton variant="info" icon={<DownloadIcon />} iconPosition="right">
            Download
          </NineSliceButton>
          <NineSliceButton variant="danger" icon={<HeartIcon />}>
            Like
          </NineSliceButton>
        </div>
      </section>

      {/* Press Effects */}
      <section>
        <h3>Press Effects</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <NineSliceButton variant="primary" pressEffect="scale">Scale Effect</NineSliceButton>
          <NineSliceButton variant="secondary" pressEffect="glow">Glow Effect</NineSliceButton>
          <NineSliceButton variant="success" pressEffect="shadow">Shadow Effect</NineSliceButton>
          <NineSliceButton variant="warning" pressEffect="none">No Effect</NineSliceButton>
        </div>
      </section>

      {/* Game Presets */}
      <section>
        <h3>Game Style Presets</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <NineSliceButton gamePreset="fantasy" icon={<SwordIcon />}>
            Fantasy Adventure
          </NineSliceButton>
          <NineSliceButton gamePreset="medieval" size="large">
            Medieval Quest
          </NineSliceButton>
          <NineSliceButton gamePreset="sci-fi" variant="info">
            Sci-Fi Mission
          </NineSliceButton>
          <NineSliceButton gamePreset="retro" variant="warning">
            Retro Arcade
          </NineSliceButton>
          <NineSliceButton gamePreset="modern" variant="primary" size="large">
            Modern Interface
          </NineSliceButton>
        </div>
      </section>

      {/* Custom Nine-Slice Integration */}
      <section>
        <h3>With Nine-Slice Images (Example)</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <NineSliceButton
            src="/path/to/button-texture.png"
            slices={{ top: 10, right: 10, bottom: 10, left: 10 }}
            variant="primary"
          >
            Custom Texture
          </NineSliceButton>
          <NineSliceButton
            src="/path/to/wooden-button.png"
            slices={20}
            gamePreset="fantasy"
            size="large"
          >
            Wooden Button
          </NineSliceButton>
        </div>
      </section>

      {/* Form Integration */}
      <section>
        <h3>Form Integration</h3>
        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <NineSliceButton type="submit" variant="success">
              Submit Form
            </NineSliceButton>
            <NineSliceButton type="reset" variant="secondary">
              Reset Form
            </NineSliceButton>
            <NineSliceButton type="button" variant="danger" onClick={() => alert('Cancelled!')}>
              Cancel
            </NineSliceButton>
          </div>
        </form>
      </section>

      {/* Accessibility Example */}
      <section>
        <h3>Accessibility Features</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <NineSliceButton
            variant="primary"
            aria-label="Save document to cloud storage"
            aria-describedby="save-help"
          >
            Save
          </NineSliceButton>
          <div id="save-help" style={{ fontSize: '12px', color: '#666' }}>
            Saves your work to the cloud
          </div>
          
          <NineSliceButton
            variant="secondary"
            aria-pressed={false}
            onClick={(e) => {
              const button = e.currentTarget;
              const pressed = button.getAttribute('aria-pressed') === 'true';
              button.setAttribute('aria-pressed', (!pressed).toString());
            }}
          >
            Toggle Feature
          </NineSliceButton>
        </div>
      </section>
    </div>
  );
};