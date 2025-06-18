# React Nine-Slice

<p align="center">
  <img src="https://via.placeholder.com/600x200/4a5568/ffffff?text=React+Nine-Slice" alt="React Nine-Slice" />
</p>

<p align="center">
  <strong>Unity スタイルのナインスライススケーリングを React で実現</strong><br>
  ゲーム UI でおなじみの 9-slice scaling を Web アプリケーションで簡単に使えるようにした React コンポーネントライブラリ
</p>

<p align="center">
  <a href="#インストール">インストール</a> •
  <a href="#クイックスタート">クイックスタート</a> •
  <a href="#使用例">使用例</a> •
  <a href="#api">API</a> •
  <a href="#unityからの移行">Unity からの移行</a>
</p>

## 📖 概要

### ナインスライス（9-slice scaling）とは？

ナインスライススケーリングは、画像を 9 つの領域に分割して、角の部分を保持しながら画像をスケーリングする技術です。Unity や他のゲームエンジンでは UI 要素の作成に広く使用されていますが、Web では CSS の `border-image` を除いてあまり一般的ではありません。

<table>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/300x150/e3e3e3/666?text=Original" alt="Original" /><br>
      <strong>元の画像</strong>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/450x150/e3e3e3/666?text=Scaled+with+Nine-Slice" alt="Scaled" /><br>
      <strong>ナインスライスでスケール</strong>
    </td>
  </tr>
</table>

### 9つの領域の構成

```
┌─────┬─────────┬─────┐
│  1  │    2    │  3  │  1,3,7,9: コーナー（固定サイズ）
├─────┼─────────┼─────┤  2,8: 上下エッジ（横方向に伸縮）
│  4  │    5    │  6  │  4,6: 左右エッジ（縦方向に伸縮）
├─────┼─────────┼─────┤  5: センター（両方向に伸縮）
│  7  │    8    │  9  │
└─────┴─────────┴─────┘
```

### なぜ React Nine-Slice を使うのか？

- 🎮 **Unity 開発者に馴染みやすい API** - Unity の 9-slice と同じ感覚で使える
- 🚀 **パフォーマンス重視** - CSS、Canvas、SVG の最適なレンダリング方式を自動選択
- 📱 **レスポンシブ対応** - あらゆる画面サイズで美しい UI を実現
- 🎨 **柔軟なカスタマイズ** - 9枚の個別画像、1枚の画像、スプライトシートに対応
- 📦 **軽量** - React 以外の依存関係なし

## 🚀 インストール

```bash
npm install react-nine-slice
```

または

```bash
yarn add react-nine-slice
```

## 🎯 クイックスタート

### 基本的な使い方（1枚の画像から自動分割）

```jsx
import { NineSlice } from 'react-nine-slice';

function App() {
  return (
    <NineSlice 
      src="/images/button-background.png"
      slices={16}  // 四辺から16pxずつスライス
      width={200}
      height={60}
    >
      <span>Click Me!</span>
    </NineSlice>
  );
}
```

### 9枚の個別画像を使用

```jsx
import { NineSlice } from 'react-nine-slice';

function FancyPanel() {
  const images = {
    topLeft: '/ui/panel/corner-tl.png',
    topCenter: '/ui/panel/edge-t.png',
    topRight: '/ui/panel/corner-tr.png',
    middleLeft: '/ui/panel/edge-l.png',
    middleCenter: '/ui/panel/center.png',
    middleRight: '/ui/panel/edge-r.png',
    bottomLeft: '/ui/panel/corner-bl.png',
    bottomCenter: '/ui/panel/edge-b.png',
    bottomRight: '/ui/panel/corner-br.png'
  };

  return (
    <NineSlice 
      images={images}
      width="80%"
      height={400}
      cornerSize={{ width: 32, height: 32 }}
    >
      <h2>ゲーム設定</h2>
      <p>音量やグラフィック設定を調整できます</p>
    </NineSlice>
  );
}
```

## 📚 使用例

### RPG スタイルのダイアログボックス

```jsx
import { NineSliceDialog } from 'react-nine-slice';

function QuestDialog() {
  return (
    <NineSliceDialog
      variant="fantasy"  // プリセットスタイル
      images={{
        corners: {
          topLeft: '/ui/dialog/ornate-corner-tl.png',
          topRight: '/ui/dialog/ornate-corner-tr.png',
          bottomLeft: '/ui/dialog/ornate-corner-bl.png',
          bottomRight: '/ui/dialog/ornate-corner-br.png'
        },
        edges: {
          top: '/ui/dialog/ornate-edge-t.png',
          right: '/ui/dialog/ornate-edge-r.png',
          bottom: '/ui/dialog/ornate-edge-b.png',
          left: '/ui/dialog/ornate-edge-l.png'
        },
        center: '/ui/dialog/parchment-bg.png'
      }}
      edgeMode="repeat"   // エッジを繰り返し表示
      centerMode="tile"    // 中央をタイル状に配置
      shadow
    >
      <h2>🗡️ クエスト完了！</h2>
      <p>冒険者よ、よくぞ戻った！君の勇気により村は救われた。</p>
      <div className="rewards">
        <span>💰 金貨 x100</span>
        <span>🧪 ポーション x5</span>
      </div>
    </NineSliceDialog>
  );
}
```

### ゲーム風ボタン

```jsx
import { NineSliceButton } from 'react-nine-slice';

function GameMenu() {
  return (
    <div className="menu">
      <NineSliceButton
        variant="primary"
        size="large"
        images={buttonImages}
        hoverEffect="glow"
        pressEffect="scale"
        onClick={() => startGame()}
      >
        ゲームスタート
      </NineSliceButton>
      
      <NineSliceButton
        variant="secondary"
        size="medium"
        disabled
      >
        続きから（セーブデータなし）
      </NineSliceButton>
    </div>
  );
}
```

### ステータスバー / プログレスバー

```jsx
import { NineSliceBar } from 'react-nine-slice';

function PlayerStatus() {
  return (
    <div className="status">
      {/* HP バー */}
      <NineSliceBar
        images={{
          left: '/ui/bar/hp-cap-left.png',
          center: '/ui/bar/hp-fill.png',
          right: '/ui/bar/hp-cap-right.png'
        }}
        value={75}
        maxValue={100}
        height={24}
        fillColor="#ef4444"
        showLabel="75/100 HP"
      />
      
      {/* 経験値バー */}
      <NineSliceBar
        variant="experience"
        value={1250}
        maxValue={2000}
        animated
        glowOnFull
      />
    </div>
  );
}
```

### 装飾的なフレーム

```jsx
import { NineSliceFrame } from 'react-nine-slice';

function CharacterPortrait() {
  return (
    <NineSliceFrame
      variant="golden"
      thickness={16}
      cornerStyle="rounded"
      animate="shimmer"
    >
      <img src="/characters/hero.png" alt="Hero" />
      <span className="level">Lv. 42</span>
    </NineSliceFrame>
  );
}
```

### レイヤード構成（影やエフェクト付き）

```jsx
import { NineSliceLayered, NineSliceLayer } from 'react-nine-slice';

function PremiumCard() {
  return (
    <NineSliceLayered width={300} height={400}>
      {/* 影レイヤー */}
      <NineSliceLayer
        images={shadowImages}
        offset={{ x: 8, y: 8 }}
        opacity={0.3}
        blur={4}
      />
      
      {/* ベースカード */}
      <NineSliceLayer
        images={cardImages}
        zIndex={1}
      />
      
      {/* 光沢エフェクト */}
      <NineSliceLayer
        images={glossImages}
        zIndex={2}
        blendMode="screen"
        animate="slide"
      />
      
      {/* コンテンツ */}
      <div className="card-content">
        <h3>レジェンダリーソード</h3>
        <p>攻撃力 +150</p>
      </div>
    </NineSliceLayered>
  );
}
```

### アニメーション対応

```jsx
import { NineSliceAnimated } from 'react-nine-slice';

function InteractivePanel() {
  return (
    <NineSliceAnimated
      images={panelImages}
      states={{
        idle: { 
          scale: 1,
          brightness: 1
        },
        hover: { 
          scale: 1.02,
          brightness: 1.1,
          shadow: '0 8px 32px rgba(0,0,0,0.2)'
        },
        active: { 
          scale: 0.98,
          brightness: 0.9
        }
      }}
      transition={{
        duration: 200,
        easing: 'ease-out'
      }}
    >
      <p>ホバーやクリックで反応します</p>
    </NineSliceAnimated>
  );
}
```

## 🔧 API

### NineSlice コンポーネント

主要なコンポーネントのプロパティ：

```typescript
interface NineSliceProps {
  // 画像ソース（1枚の画像の場合）
  src?: string;
  
  // 9枚の個別画像
  images?: {
    topLeft: string;
    topCenter: string;
    topRight: string;
    middleLeft: string;
    middleCenter: string;
    middleRight: string;
    bottomLeft: string;
    bottomCenter: string;
    bottomRight: string;
  };
  
  // スライス設定（srcを使用する場合）
  slices?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  } | number;  // 数値1つで四辺共通
  
  // コーナーサイズ（imagesを使用する場合）
  cornerSize?: {
    width: number;
    height: number;
  };
  
  // サイズ
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  
  // スケーリングモード
  edgeMode?: 'stretch' | 'repeat' | 'round';
  centerMode?: 'stretch' | 'repeat' | 'round' | 'none';
  
  // レンダリング設定
  renderMode?: 'auto' | 'css' | 'canvas' | 'svg';
  pixelPerfect?: boolean;
  
  // スタイリング
  className?: string;
  style?: React.CSSProperties;
  
  // その他
  children?: React.ReactNode;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}
```

### スケーリングモードの説明

- **stretch**: 画像を引き伸ばして領域を埋める（デフォルト）
- **repeat**: 画像を繰り返して領域を埋める
- **round**: 画像を整数回繰り返すようにサイズ調整

### プリセットコンポーネント

```jsx
// ダイアログ
<NineSliceDialog variant="fantasy" title="Quest Complete">
  {content}
</NineSliceDialog>

// ボタン
<NineSliceButton 
  variant="primary" 
  size="large"
  onClick={handleClick}
>
  Start Game
</NineSliceButton>

// パネル
<NineSlicePanel variant="wood" padding={24}>
  {content}
</NineSlicePanel>

// フレーム
<NineSliceFrame variant="golden" thickness={16}>
  <img src="portrait.jpg" />
</NineSliceFrame>
```

## 🎮 Unity からの移行

Unity の 9-slice に慣れている開発者のための移行ガイド：

### Unity → React Nine-Slice 対応表

| Unity の機能 | React Nine-Slice の対応 |
|------------|----------------------|
| Sprite Editor の Border 設定 | `slices` プロパティ |
| Sliced Draw Mode | `edgeMode="stretch"` |
| Tiled Draw Mode | `edgeMode="repeat"` |
| Sprite の Pixels Per Unit | `pixelPerfect` プロパティ |
| Fill Center | `centerMode` プロパティ |

### コード例の比較

**Unity (C#)**:
```csharp
// Unity での設定
image.type = Image.Type.Sliced;
image.sprite = mySprite; // Border が設定済み
image.fillCenter = true;
```

**React Nine-Slice**:
```jsx
// React Nine-Slice での同等の設定
<NineSlice
  src="/sprites/my-sprite.png"
  slices={{ top: 32, right: 32, bottom: 32, left: 32 }}
  centerMode="stretch"
/>
```

## ⚡ パフォーマンス最適化

### レンダリングモードの選択

```jsx
// 自動選択（推奨）
<NineSlice renderMode="auto" />

// CSS border-image（最速、シンプルなケース）
<NineSlice renderMode="css" />

// Canvas（複雑なエフェクト）
<NineSlice renderMode="canvas" />

// SVG（ベクターグラフィックス）
<NineSlice renderMode="svg" />
```

### 画像の最適化

1. **スプライトシートの使用**:
```jsx
<NineSlice
  spriteSheet="/ui/sprites.png"
  spriteRegion={{ x: 0, y: 0, width: 96, height: 96 }}
  slices={32}
/>
```

2. **遅延読み込み**:
```jsx
<NineSlice
  src="/large-image.png"
  lazy
  placeholder={<div>Loading...</div>}
/>
```

3. **画像のプリロード**:
```jsx
import { preloadImages } from 'react-nine-slice';

// アプリ起動時
await preloadImages([
  '/ui/button-bg.png',
  '/ui/panel-bg.png',
  // ...
]);
```

## 🌐 ブラウザサポート

- Chrome / Edge: 完全サポート
- Firefox: 完全サポート
- Safari: 完全サポート（iOS 含む）
- IE11: 非サポート

## 🤝 コントリビューション

バグ報告や機能提案は [GitHub Issues](https://github.com/yourusername/react-nine-slice/issues) までお願いします。

## 📄 ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) ファイルを参照してください。