import React from 'react';
import { NineSliceFrame } from './NineSliceFrame';

/**
 * Example usage of the NineSliceFrame component
 */
export const NineSliceFrameExample: React.FC = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>NineSliceFrame Examples</h2>
      
      {/* Basic Variants */}
      <section>
        <h3>Frame Variants</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <NineSliceFrame variant="golden" width={200} height={150}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>Golden Frame</h4>
              <p>Elegant golden border</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame variant="silver" width={200} height={150}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>Silver Frame</h4>
              <p>Classic silver border</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame variant="wood" width={200} height={150}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>Wood Frame</h4>
              <p>Rustic wooden border</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame variant="stone" width={200} height={150}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>Stone Frame</h4>
              <p>Solid stone border</p>
            </div>
          </NineSliceFrame>
        </div>
      </section>

      {/* Content Types */}
      <section>
        <h3>Content Types</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <NineSliceFrame 
            variant="golden" 
            contentType="portrait" 
            width={150}
            shadow
          >
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              Portrait
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="silver" 
            contentType="avatar" 
            width={120}
            glow="#c0c0c0"
          >
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'radial-gradient(circle, #ff9a9e 0%, #fecfef 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              👤
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="modern" 
            contentType="card" 
            width={120}
            animate="shimmer"
          >
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              Game Card
            </div>
          </NineSliceFrame>
        </div>
      </section>

      {/* Animations */}
      <section>
        <h3>Animation Effects</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <NineSliceFrame 
            variant="golden" 
            animate="shimmer" 
            width={180} 
            height={120}
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>Shimmer</h4>
              <p>Light sweep effect</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="ornate" 
            animate="glow" 
            width={180} 
            height={120}
            glow
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>Glow</h4>
              <p>Pulsing glow effect</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="silver" 
            animate="pulse" 
            width={180} 
            height={120}
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>Pulse</h4>
              <p>Scale pulsing effect</p>
            </div>
          </NineSliceFrame>
        </div>
      </section>

      {/* Game UI Integration */}
      <section>
        <h3>Game UI Features</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <NineSliceFrame 
            variant="golden" 
            width={150} 
            height={200}
            gameUI={{ rarity: 'legendary', enchanted: true }}
            level={5}
            status="active"
            animate="glow"
          >
            <div style={{ 
              padding: '15px', 
              textAlign: 'center',
              background: 'linear-gradient(45deg, #4a148c, #7b1fa2)',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h4>Legendary Item</h4>
              <p style={{ fontSize: '12px' }}>Enchanted Sword</p>
              <p style={{ fontSize: '10px', opacity: 0.8 }}>+50 Attack</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="stone" 
            width={150} 
            height={200}
            gameUI={{ rarity: 'rare', locked: true }}
            status="inactive"
          >
            <div style={{ 
              padding: '15px', 
              textAlign: 'center',
              background: '#3498db',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h4>Rare Item</h4>
              <p style={{ fontSize: '12px' }}>Locked Shield</p>
              <p style={{ fontSize: '10px', opacity: 0.8 }}>Requires Level 10</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="modern" 
            width={150} 
            height={200}
            gameUI={{ rarity: 'uncommon', new: true }}
            level={1}
            status="success"
          >
            <div style={{ 
              padding: '15px', 
              textAlign: 'center',
              background: '#27ae60',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h4>New Item</h4>
              <p style={{ fontSize: '12px' }}>Health Potion</p>
              <p style={{ fontSize: '10px', opacity: 0.8 }}>+25 HP</p>
            </div>
          </NineSliceFrame>
        </div>
      </section>

      {/* Custom Thickness and Corner Styles */}
      <section>
        <h3>Customization Options</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <NineSliceFrame 
            variant="golden" 
            thickness={8}
            cornerStyle="square"
            width={160} 
            height={120}
          >
            <div style={{ padding: '15px', textAlign: 'center' }}>
              <h4>Thin + Square</h4>
              <p style={{ fontSize: '12px' }}>8px thickness</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="ornate" 
            thickness={24}
            cornerStyle="ornate"
            width={160} 
            height={120}
            shadow="both"
          >
            <div style={{ padding: '15px', textAlign: 'center' }}>
              <h4>Thick + Ornate</h4>
              <p style={{ fontSize: '12px' }}>24px thickness</p>
            </div>
          </NineSliceFrame>
          
          <NineSliceFrame 
            variant="wood" 
            thickness={16}
            cornerStyle="beveled"
            width={160} 
            height={120}
            glow="#8b4513"
          >
            <div style={{ padding: '15px', textAlign: 'center' }}>
              <h4>Medium + Beveled</h4>
              <p style={{ fontSize: '12px' }}>16px thickness</p>
            </div>
          </NineSliceFrame>
        </div>
      </section>

      {/* Status Indicators */}
      <section>
        <h3>Status Indicators</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {(['active', 'inactive', 'warning', 'error', 'success'] as const).map(status => (
            <NineSliceFrame 
              key={status}
              variant="modern" 
              width={120} 
              height={80}
              status={status}
            >
              <div style={{ 
                padding: '10px', 
                textAlign: 'center',
                textTransform: 'capitalize'
              }}>
                <strong>{status}</strong>
                <br />
                <small>Status</small>
              </div>
            </NineSliceFrame>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NineSliceFrameExample;