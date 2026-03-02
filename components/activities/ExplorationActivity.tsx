import { useState } from 'react'
import { GameState } from '@/pages/index'
import { BarnIcon, FishIcon, TrophyIcon, CheckIcon, MoonIcon } from '@/components/icons/Icons'
import Dialog from '@/components/Dialog'

interface ActivityProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => void
  addLog: (message: string) => void
  gainXP: (amount: number) => void
  onComplete: () => void
}

export default function ExplorationActivity({ gameState, updateGameState, addLog, gainXP, onComplete }: ActivityProps) {
  const [explored, setExplored] = useState<string[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [dialogConfig, setDialogConfig] = useState<{
    title: string
    message: string
    type: 'confirm' | 'prompt' | 'choice'
    onConfirm: (value?: string) => void
  } | null>(null)

  const showPrompt = (title: string, message: string, onSubmit: (value: string) => void, onCancel: () => void) => {
    setDialogConfig({
      title,
      message,
      type: 'prompt',
      onConfirm: (value) => {
        setShowDialog(false)
        if (value) onSubmit(value)
        else onCancel()
      }
    })
    setShowDialog(true)
  }

  const exploreBarn = () => {
    if (gameState.energy < 20) {
      addLog('Not enough energy! Need 20 energy.')
      return
    }

    updateGameState(prev => ({ energy: prev.energy - 20 }))
    const luck = Math.floor(Math.random() * 3) + 1

    if (luck === 1) {
      const goldFound = Math.floor(Math.random() * 16) + 25
      updateGameState(prev => ({ gold: prev.gold + goldFound }))
      gainXP(20)
      addLog(`Found a hidden chest with ${goldFound} gold! +20 XP`)
    } else if (luck === 2) {
      const ratHp = 25
      const damage = Math.floor(Math.random() * 6) + gameState.strength - 2
      if (damage >= ratHp) {
        updateGameState(prev => ({ gold: prev.gold + 12, carrots: prev.carrots + 1 }))
        gainXP(18)
        addLog('Fought and defeated a rat! +18 XP, +12 gold, +1 carrot')
      } else {
        updateGameState(prev => ({ health: Math.max(15, prev.health - 10) }))
        addLog('Encountered a rat and had to flee! Lost some health.')
      }
    } else {
      updateGameState(prev => ({ wheat: prev.wheat + 2, carrots: prev.carrots + 1 }))
      gainXP(10)
      addLog('Found old farming supplies! +2 wheat, +1 carrot, +10 XP')
    }
    setExplored([...explored, 'barn'])
  }

  const answerRiddle = () => {
    const riddles = [
      { question: 'What is 7 times 8?', answer: '56', xp: 22, gold: 15 },
      { question: 'How many days in a year?', answer: '365', xp: 20, gold: 12 },
      { question: 'What is 12 divided by 4?', answer: '3', xp: 18, gold: 10 }
    ]
    const riddle = riddles[Math.floor(Math.random() * riddles.length)]
    
    showPrompt(
      'Elder\'s Riddle',
      `The village elder asks you:\n\n"${riddle.question}"\n\nWhat is your answer?`,
      (answer) => {
        if (answer === riddle.answer) {
          updateGameState(prev => ({ gold: prev.gold + riddle.gold }))
          gainXP(riddle.xp)
          addLog(`Correct! +${riddle.xp} XP, +${riddle.gold} gold`)
        } else {
          gainXP(5)
          addLog(`Wrong answer (correct: ${riddle.answer}), but +5 XP for trying`)
        }
        setExplored([...explored, 'riddle'])
      },
      () => {
        addLog('You decided not to answer the riddle.')
        setExplored([...explored, 'riddle'])
      }
    )
  }

  const goFishing = () => {
    if (gameState.energy < 15) {
      addLog('Not enough energy! Need 15 energy.')
      return
    }

    updateGameState(prev => ({ energy: prev.energy - 15 }))
    const catchRate = Math.floor(Math.random() * 4) + 1

    if (catchRate === 1) {
      updateGameState(prev => ({ gold: prev.gold + 20 }))
      gainXP(15)
      addLog('Caught a big fish! +20 gold, +15 XP')
    } else if (catchRate === 2) {
      updateGameState(prev => ({ gold: prev.gold + 8 }))
      gainXP(8)
      addLog('Caught a small fish! +8 gold, +8 XP')
    } else if (catchRate === 3) {
      gainXP(5)
      addLog('Caught an old boot! +5 XP for effort')
    } else {
      gainXP(3)
      addLog('Nothing biting today, but relaxing! +3 XP')
    }
    setExplored([...explored, 'fishing'])
  }

  const searchForShovel = () => {
    if (gameState.energy < 30 || gameState.level < 3) {
      addLog('Need level 3+ and 30 energy for this quest!')
      return
    }

    updateGameState(prev => ({ energy: prev.energy - 30 }))
    const luck = Math.floor(Math.random() * 3) + 1

    if (luck === 1) {
      updateGameState(prev => ({
        gold: prev.gold + 35,
        strength: prev.strength + 5,
        apples: prev.apples + 3,
        inventory: [...prev.inventory, 'golden shovel']
      }))
      gainXP(50)
      addLog('Found the legendary golden shovel! +50 XP, +35 gold, +5 strength!')
    } else if (luck === 2) {
      updateGameState(prev => ({ gold: prev.gold + 15, berries: prev.berries + 3 }))
      gainXP(20)
      addLog('Searched the forest but no shovel. Found valuables! +20 XP, +15 gold, +3 berries')
    } else {
      gainXP(10)
      addLog('The forest was too dark. Turned back early. +10 XP')
    }
    setExplored([...explored, 'shovel'])
  }

  return (
    <>
      {showDialog && dialogConfig && (
        <Dialog
          title={dialogConfig.title}
          message={dialogConfig.message}
          type={dialogConfig.type}
          onConfirm={(value) => dialogConfig.onConfirm(value)}
          onCancel={() => setShowDialog(false)}
        />
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <MoonIcon className="text-farm-sky-600" size={28} />
          <h3 className="text-xl font-bold text-gray-800">Exploration & Adventures</h3>
        </div>
        <p className="text-gray-600 mb-6">Discover what the world has to offer</p>

      <div className="space-y-4 mb-6">
        <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-farm-barn-400 transition-all bg-white">
          <div className="flex items-center gap-2 mb-2">
            <BarnIcon className="text-farm-barn-600" size={24} />
            <h4 className="font-semibold text-gray-800">Explore Old Barn</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Energy: 20 | Find treasure, supplies, or danger!</p>
          <button
            onClick={exploreBarn}
            disabled={gameState.energy < 20 || explored.includes('barn')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {explored.includes('barn') && <CheckIcon size={18} />}
            {explored.includes('barn') ? 'Explored' : 'Explore Barn'}
          </button>
        </div>

        <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-farm-grass-400 transition-all bg-white">
          <div className="flex items-center gap-2 mb-2">
            <TrophyIcon className="text-farm-grass-600" size={24} />
            <h4 className="font-semibold text-gray-800">Answer Elder's Riddle</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Test your knowledge for rewards</p>
          <button
            onClick={answerRiddle}
            disabled={explored.includes('riddle')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {explored.includes('riddle') && <CheckIcon size={18} />}
            {explored.includes('riddle') ? 'Completed' : 'Answer Riddle'}
          </button>
        </div>

        {gameState.day >= 4 && (
          <div className="p-4 border-2 border-farm-sky-200 rounded-lg hover:border-farm-sky-400 transition-all bg-farm-sky-50">
            <div className="flex items-center gap-2 mb-2">
              <FishIcon className="text-farm-sky-600" size={24} />
              <h4 className="font-semibold text-gray-800">Go Fishing</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Energy: 15 | Catch fish for gold</p>
            <button
              onClick={goFishing}
              disabled={gameState.energy < 15 || explored.includes('fishing')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              {explored.includes('fishing') && <CheckIcon size={18} />}
              {explored.includes('fishing') ? 'Fished' : 'Go Fishing'}
            </button>
          </div>
        )}

        {gameState.level >= 3 && (
          <div className="p-4 border-2 border-amber-300 rounded-lg hover:border-amber-500 transition-all bg-gradient-to-br from-amber-50 to-yellow-50">
            <div className="flex items-center gap-2 mb-2">
              <TrophyIcon className="text-amber-600" size={24} />
              <h4 className="font-semibold text-gray-800">Quest: Find Golden Shovel</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Energy: 30 | Requires Level 3+ | Legendary reward!</p>
            <button
              onClick={searchForShovel}
              disabled={gameState.energy < 30 || gameState.level < 3 || explored.includes('shovel')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              {explored.includes('shovel') && <CheckIcon size={18} />}
              {explored.includes('shovel') ? 'Attempted' : 'Search for Shovel'}
            </button>
          </div>
        )}
      </div>

      <button onClick={onComplete} className="btn-secondary w-full">
        End Day
      </button>
    </div>
    </>
  )
}
