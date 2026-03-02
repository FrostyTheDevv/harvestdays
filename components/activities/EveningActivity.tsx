import { useState, useEffect } from 'react'
import { GameState } from '@/pages/index'
import { MoonIcon } from '@/components/icons/Icons'
import Dialog from '@/components/Dialog'

interface ActivityProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => void
  addLog: (message: string) => void
  gainXP: (amount: number) => void
  onComplete: () => void
}

export default function EveningActivity({ gameState, updateGameState, addLog, gainXP, onComplete }: ActivityProps) {
  const [riddleAsked, setRiddleAsked] = useState(false)
  const [riddleAnswered, setRiddleAnswered] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogConfig, setDialogConfig] = useState<{
    title: string
    message: string
    type: 'prompt'
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

  const riddles = [
    { question: 'What is 7 times 8?', answer: '56', correctXP: 22, correctGold: 15, wrongXP: 10, wrongGold: 5 },
    { question: 'How many days are in a year?', answer: '365', correctXP: 20, correctGold: 12, wrongXP: 8, wrongGold: 0, bonus: 2 },
    { question: 'What is 12 divided by 4?', answer: '3', correctXP: 18, correctGold: 10, wrongXP: 6, wrongGold: 0, bonusCarrots: 2 }
  ]

  const riddle = riddles[Math.floor(Math.random() * riddles.length)]

  const askRiddle = () => {
    setRiddleAsked(true)
    addLog('The sun is setting and the village gathers in the square.')
    addLog('An old farmer walks up to you. He wants to test your knowledge.')
    
    setTimeout(() => {
      showPrompt(
        'Elder\'s Riddle',
        `The old farmer asks:\n\n"${riddle.question}"\n\nWhat is your answer?`,
        (answer) => {
          if (answer === riddle.answer) {
            addLog(`Correct! The old farmer is impressed.`)
            addLog('He gives you a lucky charm and some rewards.')
            
            updateGameState(prev => {
              const updates: Partial<GameState> = {
                gold: prev.gold + riddle.correctGold,
                inventory: [...prev.inventory, 'lucky charm']
              }
              
              if (riddle.bonus) {
                updates.wheat = prev.wheat + riddle.bonus
              } else if (riddle.bonusCarrots) {
                updates.carrots = prev.carrots + riddle.bonusCarrots
              }
              
              return updates
            })
            
            if (riddle.bonus) {
              addLog(`You got ${riddle.correctXP} XP, ${riddle.correctGold} gold, and he gave you ${riddle.bonus} wheat!`)
            } else if (riddle.bonusCarrots) {
              addLog(`You got ${riddle.correctXP} XP, ${riddle.correctGold} gold, and ${riddle.bonusCarrots} carrots!`)
            } else {
              addLog(`You got ${riddle.correctXP} XP and ${riddle.correctGold} gold.`)
            }
            
            gainXP(riddle.correctXP)
          } else {
            addLog(`The correct answer was ${riddle.answer}.`)
            if (riddle.wrongGold > 0) {
              addLog('But the old farmer smiles and gives you something anyway.')
              addLog(`You got ${riddle.wrongXP} XP and ${riddle.wrongGold} gold.`)
              updateGameState(prev => ({ gold: prev.gold + riddle.wrongGold }))
            } else {
              addLog('The old farmer gives you a small reward for trying.')
              addLog(`You got ${riddle.wrongXP} XP.`)
            }
            gainXP(riddle.wrongXP)
          }
          
          setRiddleAnswered(true)
          setTimeout(() => onComplete(), 2000)
        },
        () => {
          addLog('You politely declined to answer.')
          setRiddleAnswered(true)
          setTimeout(() => onComplete(), 1500)
        }
      )
    }, 1000)
  }

  useEffect(() => {
    if (!riddleAsked) {
      setTimeout(() => askRiddle(), 500)
    }
  }, [riddleAsked])

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
          <MoonIcon className="text-farm-sky-700" size={32} />
          <h3 className="text-xl font-bold text-gray-800">Evening - Village Square</h3>
        </div>

        <div className="space-y-4">
          {!riddleAnswered ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="text-6xl mb-4">👴</div>
                <p className="text-gray-600 text-lg">The old farmer approaches...</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="animate-pulse text-gray-600">
                Preparing end of day summary...
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
