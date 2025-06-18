import React, { useState, useEffect } from 'react';
import { NineSliceBar } from './NineSliceBar';

export const NineSliceBarExample: React.FC = () => {
  const [health, setHealth] = useState(80);
  const [mana, setMana] = useState(60);
  const [experience, setExperience] = useState(450);
  const [progress, setProgress] = useState(0);

  // Demo: animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 101);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>NineSliceBar Component Examples</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Basic Health Bar */}
        <section>
          <h2>Health Bar (Fantasy Style)</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NineSliceBar
              value={health}
              maxValue={100}
              variant="health"
              gameStyle="fantasy"
              width="300px"
              height="24px"
              showLabel={true}
              animated={true}
              glowEffect={true}
              criticalThreshold={0.25}
              warningThreshold={0.5}
              pulsateOnLow={true}
            />
            <div>
              <button onClick={() => setHealth(Math.max(0, health - 10))}>Damage</button>
              <button onClick={() => setHealth(Math.min(100, health + 10))}>Heal</button>
            </div>
          </div>
        </section>

        {/* Mana Bar */}
        <section>
          <h2>Mana Bar (Cyberpunk Style)</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NineSliceBar
              value={mana}
              maxValue={100}
              variant="mana"
              gameStyle="cyberpunk"
              width="300px"
              height="20px"
              showLabel={true}
              labelFormat={(value, maxValue) => `${Math.round(value)} / ${maxValue} MP`}
              animated={true}
              glowEffect={true}
              gradientFill={true}
            />
            <div>
              <button onClick={() => setMana(Math.max(0, mana - 15))}>Cast Spell</button>
              <button onClick={() => setMana(Math.min(100, mana + 15))}>Restore</button>
            </div>
          </div>
        </section>

        {/* Experience Bar */}
        <section>
          <h2>Experience Bar (Retro Style)</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NineSliceBar
              value={experience}
              maxValue={1000}
              variant="experience"
              gameStyle="retro"
              width="400px"
              height="16px"
              showLabel={true}
              labelFormat={(value, _max) => `${Math.round(value)} XP`}
              animated={true}
              glowEffect={true}
              gradientFill={true}
            />
            <div>
              <button onClick={() => setExperience(Math.min(1000, experience + 50))}>Gain XP</button>
              <button onClick={() => setExperience(0)}>Reset</button>
            </div>
          </div>
        </section>

        {/* Animated Progress Bar */}
        <section>
          <h2>Animated Progress Bar (Modern Style)</h2>
          <NineSliceBar
            value={progress}
            maxValue={100}
            variant="progress"
            gameStyle="modern"
            width="350px"
            height="12px"
            showLabel={true}
            labelFormat={(value) => `${Math.round(value)}%`}
            animated={true}
          />
        </section>

        {/* Segmented Bar */}
        <section>
          <h2>Segmented Health Bar</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NineSliceBar
              value={health}
              maxValue={100}
              variant="health"
              gameStyle="fantasy"
              width="300px"
              height="20px"
              segments={10}
              segmentSpacing={2}
              showLabel={true}
              animated={true}
              criticalThreshold={0.25}
              pulsateOnLow={true}
            />
          </div>
        </section>

        {/* Vertical Bar */}
        <section>
          <h2>Vertical Mana Bar</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NineSliceBar
              value={mana}
              maxValue={100}
              variant="mana"
              gameStyle="fantasy"
              width="20px"
              height="200px"
              fillDirection="bottom-to-top"
              showLabel={true}
              animated={true}
              glowEffect={true}
            />
          </div>
        </section>

        {/* Right-to-Left Fill */}
        <section>
          <h2>Right-to-Left Fill Direction</h2>
          <NineSliceBar
            value={health}
            maxValue={100}
            variant="health"
            gameStyle="modern"
            width="300px"
            height="18px"
            fillDirection="right-to-left"
            showLabel={true}
            animated={true}
          />
        </section>

        {/* Custom Colors */}
        <section>
          <h2>Custom Colors</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <NineSliceBar
              value={75}
              maxValue={100}
              variant="custom"
              fillColor="#ff6b6b"
              backgroundColor="#2c3e50"
              borderColor="#34495e"
              width="300px"
              height="20px"
              showLabel={true}
              animated={true}
              glowEffect={true}
              glowColor="#ff6b6b"
            />
            <NineSliceBar
              value={50}
              maxValue={100}
              variant="custom"
              fillColor="#4ecdc4"
              backgroundColor="#34495e"
              borderColor="#2c3e50"
              width="300px"
              height="20px"
              showLabel={true}
              animated={true}
              gradientFill={true}
            />
          </div>
        </section>

        {/* Different Label Positions */}
        <section>
          <h2>Label Positions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <strong>Left Label:</strong>
              <NineSliceBar
                value={health}
                maxValue={100}
                variant="health"
                width="300px"
                height="20px"
                showLabel={true}
                labelPosition="left"
                animated={true}
              />
            </div>
            <div>
              <strong>Center Label:</strong>
              <NineSliceBar
                value={health}
                maxValue={100}
                variant="health"
                width="300px"
                height="20px"
                showLabel={true}
                labelPosition="center"
                animated={true}
              />
            </div>
            <div>
              <strong>Right Label:</strong>
              <NineSliceBar
                value={health}
                maxValue={100}
                variant="health"
                width="300px"
                height="20px"
                showLabel={true}
                labelPosition="right"
                animated={true}
              />
            </div>
          </div>
        </section>

        {/* With Callbacks */}
        <section>
          <h2>With Threshold Callbacks</h2>
          <NineSliceBar
            value={health}
            maxValue={100}
            variant="health"
            gameStyle="fantasy"
            width="300px"
            height="20px"
            showLabel={true}
            animated={true}
            criticalThreshold={0.25}
            warningThreshold={0.5}
            pulsateOnLow={true}
            onCriticalThreshold={(value, max) => console.log(`Critical! Health: ${value}/${max}`)}
            onWarningThreshold={(value, max) => console.log(`Warning! Health: ${value}/${max}`)}
            onValueChange={(value, max, percentage) => console.log(`Health changed: ${value}/${max} (${Math.round(percentage * 100)}%)`)}
          />
          <p style={{ fontSize: '12px', color: '#666' }}>
            Check console for callback messages when health changes
          </p>
        </section>

      </div>
    </div>
  );
};

export default NineSliceBarExample;