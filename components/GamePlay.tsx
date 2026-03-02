import { useState } from 'react'
import { GameState } from '@/pages/index'
import MorningActivity from './activities/MorningActivity'
import FarmingActivity from './activities/FarmingActivity'
import MarketActivity from './activities/MarketActivity'
import ExplorationActivity from './activities/ExplorationActivity'
import EveningActivity from './activities/EveningActivity'
import DayEnd from './activities/DayEnd'

interface GamePlayProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => void
  onReturnToMenu: () => void
}

type GamePhase = 'morning' | 'farming' | 'market' | 'exploration' | 'evening' | 'end'

export default function GamePlay({ gameState, updateGameState, onReturnToMenu }: GamePlayProps) {
  const [phase, setPhase] = useState<GamePhase>('morning')
  const [logs, setLogs] = useState<string[]>([`Welcome to Day ${gameState.day}!`])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message])
  }

  const checkLevelUp = (currentXp: number, currentLevel: number, currentStrength: number) => {
    let xp = currentXp
    let level = currentLevel
    let strength = currentStrength

    while (xp >= level * 20) {
      xp -= level * 20
      level += 1
      strength += 3
      addLog(`🎉 Level Up! You are now level ${level}!`)
      addLog(`Your strength increased to ${strength}`)
    }

    return { xp, level, strength }
  }

  const gainXP = (amount: number) => {
    updateGameState(prevState => {
      const newXp = prevState.xp + amount
      const { xp, level, strength } = checkLevelUp(newXp, prevState.level, prevState.strength)
      
      // If leveled up, also restore energy
      if (level > prevState.level) {
        return { xp, level, strength, energy: 100 }
      }
      
      return { xp, level, strength }
    })
  }

  const startMorning = () => {
    // Feed animals if any
    if (gameState.chickens === 0 && gameState.cows === 0) {
      setPhase('farming')
      addLog('Time to start your day!')
    } else {
      setPhase('morning')
    }
  }

  const nextDay = () => {
    const newDay = gameState.day + 1
    updateGameState({ 
      day: newDay,
      energy: 100,
      health: Math.min(gameState.health + 20, 100)
    })
    setLogs([`Welcome to Day ${newDay}!`])
    setPhase('morning')
  }

  return (
    <div className="space-y-6">
      {/* Day Header */}
      <div className="card bg-gradient-to-r from-harvest-600 to-harvest-700 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Day {gameState.day}</h2>
            <p className="text-harvest-100">
              {phase === 'morning' && 'Morning - Animal Care'}
              {phase === 'farming' && 'Field Work'}
              {phase === 'market' && 'Village Market'}
              {phase === 'exploration' && 'Exploration Time'}
              {phase === 'evening' && 'Evening - Village Square'}
              {phase === 'end' && 'Day\'s End'}
            </p>
          </div>
          <button
            onClick={onReturnToMenu}
            className="bg-white text-harvest-700 px-4 py-2 rounded-lg font-medium hover:bg-harvest-50 transition-all"
          >
            Save & Exit
          </button>
        </div>
      </div>

      {/* Game Log */}
      {logs.length > 0 && (
        <div className="card bg-gray-50 max-h-48 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Recent Activity</h3>
          <div className="space-y-1">
            {logs.slice(-10).map((log, idx) => (
              <p key={idx} className="text-sm text-gray-700">{log}</p>
            ))}
          </div>
        </div>
      )}

      {/* Phase Content */}
      {phase === 'morning' && (
        <MorningActivity
          gameState={gameState}
          updateGameState={updateGameState}
          addLog={addLog}
          gainXP={gainXP}
          onComplete={() => setPhase('farming')}
        />
      )}

      {phase === 'farming' && (
        <FarmingActivity 
          gameState={gameState}
          updateGameState={updateGameState}
          addLog={addLog}
          gainXP={gainXP}
          onComplete={() => setPhase('market')}
        />
      )}

      {phase === 'market' && (
        <MarketActivity
          gameState={gameState}
          updateGameState={updateGameState}
          addLog={addLog}
          gainXP={gainXP}
          onComplete={() => setPhase('exploration')}
        />
      )}

      {phase === 'exploration' && (
        <ExplorationActivity
          gameState={gameState}
          updateGameState={updateGameState}
          addLog={addLog}
          gainXP={gainXP}
          onComplete={() => setPhase('evening')}
        />
      )}

      {phase === 'evening' && (
        <EveningActivity
          gameState={gameState}
          updateGameState={updateGameState}
          addLog={addLog}
          gainXP={gainXP}
          onComplete={() => setPhase('end')}
        />
      )}

      {phase === 'end' && (
        <DayEnd
          gameState={gameState}
          onNextDay={nextDay}
          onReturnToMenu={onReturnToMenu}
        />
      )}
    </div>
  )
}
