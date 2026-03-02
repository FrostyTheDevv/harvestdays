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
    const { name } = req.query

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Player name is required' })
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const sql = neon(process.env.DATABASE_URL)

    // Query the game save
    const result = await sql`
      SELECT game_data FROM game_saves
      WHERE player_name = ${name}
    `

    if (result.length === 0) {
      return res.status(404).json({ error: 'Save not found' })
    }

    res.status(200).json({ gameData: result[0].game_data })
  } catch (error) {
    console.error('Load game error:', error)
    res.status(500).json({ error: 'Failed to load game', details: String(error) })
  }
}
