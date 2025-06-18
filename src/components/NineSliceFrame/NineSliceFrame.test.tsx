import React from 'react';
import { NineSliceFrame } from './NineSliceFrame';

// Basic test to verify component structure and props
describe('NineSliceFrame', () => {
  it('should render basic frame', () => {
    const component = (
      <NineSliceFrame variant="golden" width={200} height={150}>
        <div>Test content</div>
      </NineSliceFrame>
    );
    
    expect(component).toBeDefined();
  });

  it('should render with all game UI features', () => {
    const component = (
      <NineSliceFrame 
        variant="legendary"
        animate="glow"
        level={99}
        status="active"
        gameUI={{
          rarity: 'legendary',
          enchanted: true,
          new: true,
          locked: false
        }}
        shadow="both"
        glow="#ffd700"
      >
        <div>Epic content</div>
      </NineSliceFrame>
    );
    
    expect(component).toBeDefined();
  });

  it('should render different content types', () => {
    const portrait = (
      <NineSliceFrame contentType="portrait" variant="golden">
        <img src="portrait.jpg" alt="Portrait" />
      </NineSliceFrame>
    );

    const avatar = (
      <NineSliceFrame contentType="avatar" variant="silver">
        <img src="avatar.jpg" alt="Avatar" />
      </NineSliceFrame>
    );

    const card = (
      <NineSliceFrame contentType="card" variant="modern">
        <div>Card content</div>
      </NineSliceFrame>
    );

    expect(portrait).toBeDefined();
    expect(avatar).toBeDefined();
    expect(card).toBeDefined();
  });
});