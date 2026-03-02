import { neon } from '@neondatabase/serverless'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const gameData = req.body

    if (!gameData.name) {
      return res.status(400).json({ error: 'Player name is required' })
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const sql = neon(process.env.DATABASE_URL)

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS game_saves (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(255) UNIQUE NOT NULL,
        game_data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert or update game save
    await sql`
      INSERT INTO game_saves (player_name, game_data, updated_at)
      VALUES (${gameData.name}, ${JSON.stringify(gameData)}, CURRENT_TIMESTAMP)
      ON CONFLICT (player_name)
      DO UPDATE SET
        game_data = ${JSON.stringify(gameData)},
        updated_at = CURRENT_TIMESTAMP
    `

    res.status(200).json({ success: true, message: 'Game saved successfully' })
  } catch (error) {
    console.error('Save game error:', error)
    res.status(500).json({ error: 'Failed to save game', details: String(error) })
  }
}
