# Hat AR Store - Virtual Try-On Experience

A modern e-commerce application featuring augmented reality (AR) try-on capabilities for hat products. Built with Next.js, React Three Fiber, and TypeScript.

## Features

- **AR Try-On Experience**: Virtual try-on using 3D models and WebGL
- **Real-time 3D Controls**: Adjust hat position, rotation, and scale
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Zustand for efficient state management
- **Modern UI**: Framer Motion animations and smooth transitions
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **3D Graphics**: React Three Fiber + Three.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Data Fetching**: React Query
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hat-ar-store
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Heroku Deployment

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create a new Heroku app:
```bash
heroku create your-app-name
```

3. Add the Heroku Node.js buildpack:
```bash
heroku buildpacks:set heroku/nodejs
```

4. Deploy to Heroku:
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

5. Open your app:
```bash
heroku open
```

### Environment Variables

No environment variables are required for basic functionality.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (redirects to product)
│   └── product/[id]/      # Product detail pages
├── components/            # React components
│   ├── ar/               # AR-related components
│   ├── ProductGallery.tsx
│   ├── ProductInfo.tsx
│   └── ARFittingRoom.tsx
├── lib/                  # Utilities and data
│   └── data.ts          # Mock product data
├── store/               # State management
│   └── index.ts        # Zustand store
└── types/               # TypeScript types
    └── index.ts        # Type definitions
```

## AR Features

### 3D Hat Model
- Custom 3D hat model built with Three.js geometries
- Real-time color changes based on product selection
- Smooth animations and interactions

### AR Controls
- Position controls (X, Y, Z axes)
- Rotation controls for precise hat positioning
- Scale controls for size adjustments
- Real-time visual feedback

### Fitting Room Experience
- Full-screen AR mode
- Camera controls for viewing angles
- Product information overlay
- Smooth transitions between modes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
