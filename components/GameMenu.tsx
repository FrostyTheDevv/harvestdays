import { useState } from 'react'
import { BarnIcon, SunIcon } from '@/components/icons/Icons'

interface GameMenuProps {
  onStartNew: (playerName: string) => void
  onLoadGame: (playerName: string) => void
}

export default function GameMenu({ onStartNew, onLoadGame }: GameMenuProps) {
  const [playerName, setPlayerName] = useState('')
  const [showInput, setShowInput] = useState<'new' | 'load' | null>(null)
  const [savedGames, setSavedGames] = useState<string[]>([])

  const handleNewGame = () => {
    if (playerName.trim()) {
      onStartNew(playerName)
    }
  }

  const handleLoadClick = async () => {
    try {
      const response = await fetch('/api/game/list')
      if (response.ok) {
        const { players } = await response.json()
        setSavedGames(players)
        setShowInput('load')
      } else {
        alert('Failed to load saved games')
      }
    } catch (error) {
      console.error('Failed to load saved games:', error)
      alert('Failed to load saved games')
    }
  }

  const handleSelectSave = (name: string) => {
    onLoadGame(name)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {!showInput ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BarnIcon className="text-farm-barn-600" size={40} />
              <h2 className="text-3xl font-bold text-farm-barn-800">Welcome, Farmer!</h2>
            </div>
            
            <button 
              onClick={() => setShowInput('new')}
              className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
            >
              <SunIcon size={20} />
              Start New Game
            </button>
            
            <button 
              onClick={handleLoadClick}
              className="btn-secondary w-full text-lg py-4"
            >
              Continue Saved Game
            </button>
          </div>
        ) : showInput === 'new' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <BarnIcon className="text-farm-barn-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">Create Your Character</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your name?
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNewGame()}
                placeholder="Enter your farmer name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-farm-grass-500 focus:outline-none text-lg"
                autoFocus
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleNewGame}
                disabled={!playerName.trim()}
                className="btn-primary flex-1"
              >
                Start Farming
              </button>
              <button 
                onClick={() => { setShowInput(null); setPlayerName('') }}
                className="btn-secondary flex-1"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Load Saved Game</h2>
            
            {savedGames.length > 0 ? (
              <div className="space-y-2">
                {savedGames.map((name) => {
                  const players = JSON.parse(localStorage.getItem('harvestDaysPlayers') || '{}')
                  const save = players[name]
                  return (
                    <button
                      key={name}
                      onClick={() => handleSelectSave(name)}
                      className="w-full text-left p-4 border-2 border-farm-grass-200 rounded-lg hover:border-farm-grass-500 hover:bg-farm-grass-50 transition-all"
                    >
                      <div className="font-semibold text-lg text-gray-800">{name}</div>
                      <div className="text-sm text-gray-600">
                        Level {save.level} • Day {save.day} • {save.gold} Gold
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">No saved games found</p>
            )}
            
            <button 
              onClick={() => setShowInput(null)}
              className="btn-secondary w-full"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
