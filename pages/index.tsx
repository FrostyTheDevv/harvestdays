import { useState, useEffect } from 'react'
import Head from 'next/head'
import GameMenu from '@/components/GameMenu'
import GamePlay from '@/components/GamePlay'
import GameStats from '@/components/GameStats'
import { BarnIcon } from '@/components/icons/Icons'

export interface GameState {
  name: string
  xp: number
  level: number
  gold: number
  day: number
  strength: number
  carrots: number
  wheat: number
  chickens: number
  cows: number
  energy: number
  health: number
  apples: number
  berries: number
  inventory: string[]
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [showMenu, setShowMenu] = useState(true)

  const startNewGame = (playerName: string) => {
    const newGame: GameState = {
      name: playerName || 'Farmer',
      xp: 0,
      level: 1,
      gold: 0,
      day: 1,
      strength: 10,
      carrots: 0,
      wheat: 0,
      chickens: 0,
      cows: 0,
      energy: 100,
      health: 100,
      apples: 0,
      berries: 0,
      inventory: []
    }
    setGameState(newGame)
    saveGame(newGame)
    setShowMenu(false)
  }

  const loadGame = async (playerName: string) => {
    try {
      const response = await fetch(`/api/game/load?name=${encodeURIComponent(playerName)}`)
      if (response.ok) {
        const { gameData } = await response.json()
        setGameState(gameData)
        setShowMenu(false)
      } else {
        console.error('Failed to load game')
        alert('Failed to load saved game. Please try again.')
      }
    } catch (error) {
      console.error('Load game error:', error)
      alert('Failed to load saved game. Please try again.')
    }
  }

  const saveGame = async (state: GameState) => {
    try {
      const response = await fetch('/api/game/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      })
      if (!response.ok) {
        console.error('Failed to save game')
      }
    } catch (error) {
      console.error('Save game error:', error)
    }
  }

  const updateGameState = (updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => {
    setGameState(prevState => {
      if (!prevState) return prevState
      const updateObj = typeof updates === 'function' ? updates(prevState) : updates
      const newState = { ...prevState, ...updateObj }
      saveGame(newState)
      return newState
    })
  }

  const returnToMenu = () => {
    setShowMenu(true)
    setGameState(null)
  }

  return (
    <>
      <Head>
        <title>Harvest Days - Farm Simulator</title>
        <meta name="description" content="A farming simulation game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-gray-800 via-farm-soil-900 to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <BarnIcon className="text-farm-barn-500" size={48} />
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">Harvest Days</h1>
            </div>
            <p className="text-farm-wheat-300 text-lg font-medium">Build your dream farm</p>
          </header>

          {/* Game Content */}
          {showMenu ? (
            <GameMenu 
              onStartNew={startNewGame}
              onLoadGame={loadGame}
            />
          ) : gameState ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GamePlay 
                  gameState={gameState}
                  updateGameState={updateGameState}
                  onReturnToMenu={returnToMenu}
                />
              </div>
              <div>
                <GameStats gameState={gameState} />
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </>
  )
}
