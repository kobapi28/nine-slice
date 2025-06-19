import { useState } from 'react';
import {
  NineSlice,
  NineSliceButton,
  NineSliceBar,
  NineSliceFrame,
} from 'nine-slice';
import './App.css';

// Sample images (simple colored rectangles as base64)
const sampleImages = {
  button: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0YjVjZjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDNhOGMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSJ1cmwoI2EpIiByeD0iOCIvPjwvc3ZnPg==',
  frame: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmQ3MDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjk5MDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNhKSIgcng9IjEwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
  dialog: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZTBlMGUwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9InVybCgjYSkiIHJ4PSIxNSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4='
};

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [healthValue, setHealthValue] = useState(75);
  const [manaValue, setManaValue] = useState(60);
  const [expValue, setExpValue] = useState(45);

  // Simulate health/mana changes
  const updateValues = () => {
    setHealthValue(Math.max(0, Math.min(100, healthValue + (Math.random() - 0.5) * 20)));
    setManaValue(Math.max(0, Math.min(100, manaValue + (Math.random() - 0.5) * 30)));
    setExpValue(Math.max(0, Math.min(100, expValue + Math.random() * 10)));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nine-Slice Component Demo</h1>
        <p>Interactive examples of the nine-slice React components</p>
      </header>

      <main className="app-main">
        {/* Basic Nine-Slice */}
        <section className="demo-section">
          <h2>Basic Nine-Slice</h2>
          <div className="demo-grid">
            <NineSlice
              src={sampleImages.button}
              width={200}
              height={80}
              slices={20}
            >
              <div className="nine-slice-content">
                Basic nine-slice with content
              </div>
            </NineSlice>
            
            <NineSlice
              src={sampleImages.frame}
              width={250}
              height={100}
              slices={25}
            >
              <div className="nine-slice-content">
                Scalable container
              </div>
            </NineSlice>
          </div>
        </section>

        {/* Buttons */}
        <section className="demo-section">
          <h2>Interactive Buttons</h2>
          <div className="demo-grid">
            <NineSliceButton variant="primary" size="medium">
              Primary Button
            </NineSliceButton>
            <NineSliceButton variant="success" size="large" gamePreset="fantasy">
              Fantasy Success
            </NineSliceButton>
            <NineSliceButton variant="warning" size="small" pressEffect="glow">
              Warning Glow
            </NineSliceButton>
            <NineSliceButton 
              variant="danger" 
              icon="⚔️" 
              iconPosition="left"
              pressEffect="scale"
              onClick={() => setIsDialogOpen(true)}
            >
              Open Dialog
            </NineSliceButton>
          </div>
        </section>

        {/* Progress Bars */}
        <section className="demo-section">
          <h2>Status Bars</h2>
          <div className="bars-container">
            <div className="bar-group">
              <label>Health: {Math.round(healthValue)}%</label>
              <NineSliceBar
                variant="health"
                value={healthValue}
                maxValue={100}
                animated
                showLabel
                style={{ width: '300px' }}
              />
            </div>
            
            <div className="bar-group">
              <label>Mana: {Math.round(manaValue)}%</label>
              <NineSliceBar
                variant="mana"
                value={manaValue}
                maxValue={100}
                animated
                showLabel
                style={{ width: '300px' }}
              />
            </div>
            
            <div className="bar-group">
              <label>Experience: {Math.round(expValue)}%</label>
              <NineSliceBar
                variant="experience"
                value={expValue}
                maxValue={100}
                animated
                showLabel
                style={{ width: '300px' }}
              />
            </div>
            
            <NineSliceButton 
              variant="info" 
              size="small"
              onClick={updateValues}
            >
              Update Values
            </NineSliceButton>
          </div>
        </section>

        {/* Frames */}
        <section className="demo-section">
          <h2>Decorative Frames</h2>
          <div className="frames-container">
            <NineSliceFrame 
              variant="golden" 
              thickness={12} 
              gameUI={{ rarity: "legendary" }}
              glow={true}
            >
              <div className="frame-content legendary">
                <h3>Legendary Item</h3>
                <p>Epic Sword of Destiny</p>
              </div>
            </NineSliceFrame>
            
            <NineSliceFrame 
              variant="silver" 
              thickness={8} 
              gameUI={{ rarity: "rare" }} 
              animate="shimmer"
            >
              <div className="frame-content rare">
                <h3>Rare Artifact</h3>
                <p>Mystic Crystal</p>
              </div>
            </NineSliceFrame>
            
            <NineSliceFrame variant="wood" thickness={6} cornerStyle="rounded">
              <div className="frame-content common">
                <img 
                  src="https://via.placeholder.com/120x160/8B4513/FFFFFF?text=Portrait" 
                  alt="Portrait" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </NineSliceFrame>
          </div>
        </section>

        {/* Performance Test */}
        <section className="demo-section">
          <h2>Performance Test</h2>
          <div className="performance-grid">
            {Array.from({ length: 20 }, (_, i) => (
              <NineSliceButton 
                key={i}
                variant={['primary', 'secondary', 'success', 'danger'][i % 4] as any}
                size="small"
              >
                Btn {i + 1}
              </NineSliceButton>
            ))}
          </div>
        </section>
      </main>

      {/* Dialog */}
      {isDialogOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="dialog-content" style={{
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            color: '#f4e4bc',
            borderRadius: '12px',
            padding: '0',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            border: '2px solid #ffd700'
          }}>
            <div className="dialog-header" style={{
              background: 'rgba(255, 215, 0, 0.1)',
              padding: '20px',
              textAlign: 'center',
              borderBottom: '2px solid rgba(255, 215, 0, 0.3)'
            }}>
              <h2 style={{ margin: 0, color: '#ffd700', fontSize: '1.5rem' }}>
                🏰 Quest Available!
              </h2>
            </div>
            <div className="dialog-body" style={{ padding: '25px', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>
                A mysterious dungeon has appeared near the village. 
                Will you brave its depths to uncover ancient treasures?
              </p>
              <div className="dialog-stats" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '15px',
                borderRadius: '8px',
                borderLeft: '4px solid #ffd700'
              }}>
                <div style={{ marginBottom: '5px', fontSize: '0.9rem' }}>Recommended Level: 15</div>
                <div style={{ fontSize: '0.9rem' }}>Rewards: 1000 Gold, Rare Equipment</div>
              </div>
            </div>
            <div style={{
              padding: '20px 25px',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.1)'
            }}>
              <NineSliceButton 
                variant="success" 
                gamePreset="fantasy"
                onClick={() => {
                  alert('Quest accepted! Good luck, adventurer!');
                  setIsDialogOpen(false);
                }}
              >
                Accept Quest
              </NineSliceButton>
              <NineSliceButton 
                variant="secondary" 
                onClick={() => setIsDialogOpen(false)}
              >
                Maybe Later
              </NineSliceButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
