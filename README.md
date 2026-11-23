# Cyberpunk 3D Web Experience

An interactive 3D web application built with **Three.js**, **GSAP**, and **Vite**.

## Features

- **3D Model Rendering**: Realistic PBR rendering of a sci-fi helmet using `GLTFLoader`.
- **HDRI Environment Lighting**: Realistic reflections and ambient environment from Polyhaven HDRI via `RGBELoader`.
- **Post-Processing**: Chromatic aberration and RGB shift effect using Three.js `EffectComposer` and `RGBShiftShader`.
- **Interactive Mouse Tracking**: Smooth model tilt and rotation responding to mouse cursor position powered by `GSAP`.
- **3D Navigation**: Full scene examination support with `OrbitControls`.
- **Modern UI**: Dark futuristic landing page styled with Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
git clone <repository-url>
cd cyberpunk
npm install
```

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Build for Production

```bash
npm run build
```
