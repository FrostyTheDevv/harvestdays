# Database Setup for Harvest Days

This game uses **Neon Serverless Postgres** for persistent cloud storage.

## Setup Instructions

### 1. Create a Neon Database (Free Tier Available)

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `harvestdays` project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Neon Postgres**
6. Follow the prompts to create your database

### 2. Environment Variables

Vercel will automatically add the `DATABASE_URL` environment variable to your project. No manual configuration needed!

### 3. Database Schema

The database table is automatically created on first use:

```sql
CREATE TABLE IF NOT EXISTS game_saves (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(255) UNIQUE NOT NULL,
  game_data JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## How It Works

- **Game saves** are stored in the `game_saves` table
- Each player has a unique save file identified by their name
- Game data is stored as JSONB for flexible storage
- Saves are automatically updated when players progress

## API Endpoints

- `POST /api/game/save` - Save game data
- `GET /api/game/load?name=PlayerName` - Load saved game
- `GET /api/game/list` - List all saved players

## Benefits

✅ **Persistent Storage** - Saves work across devices and browsers  
✅ **Concurrent Access** - Multiple players can play simultaneously  
✅ **Automatic Backups** - Neon handles database backups  
✅ **Free Tier** - 0.5GB storage, 10GB transfer per month  
✅ **Zero Configuration** - Works automatically on Vercel

## Local Development

For local development, you can:
1. Get your DATABASE_URL from Vercel project settings
2. Create a `.env.local` file in the project root
3. Add: `DATABASE_URL=your_neon_connection_string`

The game will work locally with the cloud database!
