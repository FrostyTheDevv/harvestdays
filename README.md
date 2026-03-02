# Harvest Days - Web Version

A professional farming simulation game built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌾 Farm management with crops and animals
- 💰 Economic system with gold and trading
- 📈 XP and leveling system
- 🎮 Multiple activities: farming, exploration, market, and special events
- 💾 Browser-based save system using localStorage
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎨 Professional farm-themed color palette

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Custom SVG components
- **State Management:** React hooks
- **Storage:** Browser localStorage

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will automatically detect Next.js and deploy

### Option 3: Vercel Dashboard

1. Create a new project on [vercel.com](https://vercel.com)
2. Import from Git or drag & drop the `web-version` folder
3. Vercel will build and deploy automatically

## Project Structure

```
web-version/
├── components/
│   ├── activities/     # Game activity components
│   ├── icons/          # Custom SVG icons
│   ├── GameLog.tsx     # Activity log component
│   └── GameStats.tsx   # Player stats sidebar
├── pages/
│   ├── _app.tsx        # App wrapper with global styles
│   ├── _document.tsx   # HTML document structure
│   └── index.tsx       # Main game page
├── styles/
│   └── globals.css     # Global styles and Tailwind config
└── public/             # Static assets
```

## Game Activities

- **Morning:** Feed animals and start your day
- **Field Work:** Harvest crops, pick fruits, and play mini-games
- **Market:** Buy animals, tools, seeds, and trade goods
- **Exploration:** Discover treasures and face challenges
- **Evening:** Answer riddles and earn rewards
- **Special Events:** Traveling merchant, quests, and fishing

## Color Palette

- **Farm Grass:** Green tones for growth and nature
- **Farm Wheat:** Golden yellow for harvest and prosperity
- **Farm Sky:** Light blue for energy and freshness
- **Farm Barn:** Rich brown/red for structures and strength
- **Farm Soil:** Deep brown for earth and foundation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private project - All rights reserved
