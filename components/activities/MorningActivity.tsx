import { useState } from 'react'
import { GameState } from '@/pages/index'
import { SunIcon, ChickenIcon, CowIcon, WheatIcon, CarrotIcon } from '@/components/icons/Icons'

interface ActivityProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => void
  addLog: (message: string) => void
  gainXP: (amount: number) => void
  onComplete: () => void
}

export default function MorningActivity({ gameState, updateGameState, addLog, gainXP, onComplete }: ActivityProps) {
  const [showChickenPrompt, setShowChickenPrompt] = useState(gameState.chickens > 0)
  const [showCowPrompt, setShowCowPrompt] = useState(false)
  const [chickensFed, setChickensFed] = useState(false)
  const [cowsFed, setCowsFed] = useState(false)

  const feedChickens = (choice: boolean) => {
    setShowChickenPrompt(false)
    
    if (!choice) {
      addLog('You decide not to feed your chickens today.')
      addLog('Your chickens are sad and didn\'t lay any eggs today.')
      setShowCowPrompt(gameState.cows > 0)
      if (gameState.cows === 0) {
        setTimeout(() => onComplete(), 1500)
      }
      return
    }

    const wheatNeeded = gameState.chickens
    if (gameState.wheat < wheatNeeded) {
      addLog(`You don't have enough wheat! You need ${wheatNeeded} wheat but only have ${gameState.wheat}.`)
      addLog('Your chickens are sad and didn\'t lay any eggs today.')
      setShowCowPrompt(gameState.cows > 0)
      if (gameState.cows === 0) {
        setTimeout(() => onComplete(), 1500)
      }
      return
    }

    const goldEarned = gameState.chickens * 3
    const xpEarned = gameState.chickens * 2
    
    updateGameState(prev => ({
      wheat: prev.wheat - wheatNeeded,
      gold: prev.gold + goldEarned
    }))
    gainXP(xpEarned)
    
    addLog(`You fed your chickens with ${wheatNeeded} wheat.`)
    addLog('Happy chickens laid eggs for you!')
    addLog(`You got ${goldEarned} gold and ${xpEarned} XP from the eggs.`)
    
    setChickensFed(true)
    setShowCowPrompt(gameState.cows > 0)
    
    if (gameState.cows === 0) {
      setTimeout(() => onComplete(), 1500)
    }
  }

  const feedCows = (choice: boolean) => {
    setShowCowPrompt(false)
    
    if (!choice) {
      addLog('You decide not to feed your cows today.')
      addLog('Your cows are sad and didn\'t produce milk today.')
      setTimeout(() => onComplete(), 1500)
      return
    }

    const carrotsNeeded = gameState.cows * 2
    if (gameState.carrots < carrotsNeeded) {
      addLog(`You don't have enough carrots! You need ${carrotsNeeded} carrots but only have ${gameState.carrots}.`)
      addLog('Your cows are sad and didn\'t produce milk today.')
      setTimeout(() => onComplete(), 1500)
      return
    }

    const goldEarned = gameState.cows * 5
    const xpEarned = gameState.cows * 3
    
    updateGameState(prev => ({
      carrots: prev.carrots - carrotsNeeded,
      gold: prev.gold + goldEarned
    }))
    gainXP(xpEarned)
    
    addLog(`You fed your cows with ${carrotsNeeded} carrots.`)
    addLog('Happy cows produced milk for you!')
    addLog(`You got ${goldEarned} gold and ${xpEarned} XP from the milk.`)
    
    setCowsFed(true)
    setTimeout(() => onComplete(), 1500)
  }

  // If no animals, skip morning phase
  if (gameState.chickens === 0 && gameState.cows === 0) {
    setTimeout(() => onComplete(), 100)
    return null
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <SunIcon className="text-farm-wheat-600" size={32} />
        <h3 className="text-xl font-bold text-gray-800">Morning - Animal Care</h3>
      </div>

      <div className="space-y-6">
        {/* Chicken Feeding */}
        {gameState.chickens > 0 && showChickenPrompt && (
          <div className="p-6 border-2 border-farm-wheat-300 rounded-lg bg-farm-wheat-50">
            <div className="flex items-center gap-3 mb-4">
              <ChickenIcon className="text-farm-wheat-600" size={32} />
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Feed Your Chickens</h4>
                <p className="text-sm text-gray-600">You have {gameState.chickens} {gameState.chickens === 1 ? 'chicken' : 'chickens'}</p>
              </div>
            </div>
            
            <div className="mb-4 p-4 bg-white rounded border border-farm-wheat-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <WheatIcon className="text-farm-wheat-600" size={20} />
                  <span className="text-sm font-medium">Wheat needed:</span>
                </div>
                <span className="font-bold text-farm-wheat-700">{gameState.chickens}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current wheat in storage:</span>
                <span className={`font-bold ${gameState.wheat >= gameState.chickens ? 'text-green-600' : 'text-red-600'}`}>
                  {gameState.wheat}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Do you want to feed your chickens? Happy chickens lay eggs you can sell!
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => feedChickens(true)}
                className="btn-primary flex-1"
              >
                Yes, feed them
              </button>
              <button
                onClick={() => feedChickens(false)}
                className="btn-secondary flex-1"
              >
                No, skip today
              </button>
            </div>
          </div>
        )}

        {/* Cow Feeding */}
        {gameState.cows > 0 && showCowPrompt && (
          <div className="p-6 border-2 border-farm-soil-300 rounded-lg bg-farm-soil-50">
            <div className="flex items-center gap-3 mb-4">
              <CowIcon className="text-farm-soil-600" size={32} />
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Feed Your Cows</h4>
                <p className="text-sm text-gray-600">You have {gameState.cows} {gameState.cows === 1 ? 'cow' : 'cows'}</p>
              </div>
            </div>
            
            <div className="mb-4 p-4 bg-white rounded border border-farm-soil-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CarrotIcon className="text-orange-600" size={20} />
                  <span className="text-sm font-medium">Carrots needed:</span>
                </div>
                <span className="font-bold text-farm-soil-700">{gameState.cows * 2}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current carrots in storage:</span>
                <span className={`font-bold ${gameState.carrots >= gameState.cows * 2 ? 'text-green-600' : 'text-red-600'}`}>
                  {gameState.carrots}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Do you want to feed your cows? Happy cows produce milk you can sell!
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => feedCows(true)}
                className="btn-primary flex-1"
              >
                Yes, feed them
              </button>
              <button
                onClick={() => feedCows(false)}
                className="btn-secondary flex-1"
              >
                No, skip today
              </button>
            </div>
          </div>
        )}

        {/* Waiting message */}
        {!showChickenPrompt && !showCowPrompt && (
          <div className="text-center py-8">
            <div className="animate-pulse text-gray-600">
              Continuing to field work...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
