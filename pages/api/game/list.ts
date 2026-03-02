import { neon } from '@neondatabase/serverless'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
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

    // Get all player names
    const result = await sql`
      SELECT player_name, updated_at FROM game_saves
      ORDER BY updated_at DESC
    `

    const players = result.map(row => row.player_name as string)
    res.status(200).json({ players })
  } catch (error) {
    console.error('List games error:', error)
    res.status(500).json({ error: 'Failed to list games', details: String(error) })
  }
}
