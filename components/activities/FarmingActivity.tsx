import { useState } from 'react'
import { GameState } from '@/pages/index'
import { CarrotIcon, WheatIcon, AppleIcon, BerryIcon, SunIcon, EnergyIcon, CheckIcon } from '@/components/icons/Icons'
import Dialog from '@/components/Dialog'

interface ActivityProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => void
  addLog: (message: string) => void
  gainXP: (amount: number) => void
  onComplete: () => void
}

export default function FarmingActivity({ gameState, updateGameState, addLog, gainXP, onComplete }: ActivityProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [dialogConfig, setDialogConfig] = useState<{
    title: string
    message: string
    type: 'confirm' | 'prompt'
    onConfirm: (value?: string) => void
  } | null>(null)

  const showChoice = (title: string, message: string, onYes: () => void, onNo: () => void) => {
    setDialogConfig({
      title,
      message,
      type: 'confirm',
      onConfirm: (value) => {
        setShowDialog(false)
        if (value === 'yes') onYes()
        else onNo()
      }
    })
    setShowDialog(true)
  }

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

  const pickCarrots = () => {
    if (completedTasks.includes('carrots')) return
    
    addLog('You walk to your field and see a carrot ready to harvest.')

    if (gameState.energy < 10) {
      showChoice(
        'Low Energy Warning',
        `You're getting tired! (${gameState.energy} energy left)\n\nDo you want to pick the carrot anyway?\n(This needs 10 energy)`,
        () => {
          addLog("You don't have enough energy! Skipping carrots.")
        },
        () => {
          addLog('You decide to skip the carrots to save energy.')
        }
      )
      return
    }

    showChoice(
      'Carrot Field',
      'In front of you there is a carrot.\n\nDo you want to pick it?',
      () => {
        const xpGain = Math.floor(Math.random() * 8) + 8
        updateGameState(prev => ({
          carrots: prev.carrots + 1,
          energy: prev.energy - 10
        }))
        gainXP(xpGain)
        addLog(`You picked a fresh carrot! +1 carrot, +${xpGain} XP`)
        
        const newEnergy = gameState.energy - 10
        if (newEnergy >= 20) {
          addLog('You still have plenty of energy!')
        } else if (newEnergy >= 10) {
          addLog("You're getting a bit tired.")
        }
        
        setCompletedTasks([...completedTasks, 'carrots'])
      },
      () => {
        addLog('You decided to skip the carrots.')
        setCompletedTasks([...completedTasks, 'carrots'])
      }
    )
  }

  const harvestWheat = () => {
    if (completedTasks.includes('wheat')) return
    
    addLog('You walk to your wheat field. The golden stalks sway in the breeze.')

    if (gameState.energy < 15) {
      showChoice(
        'Low Energy Warning',
        `You're tired! (${gameState.energy} energy left)\n\nDo you want to harvest wheat anyway?\n(This needs 15 energy)`,
        () => {
          addLog("You don't have enough energy! Skipping wheat harvest.")
        },
        () => {
          addLog('You decide to skip the wheat harvest.')
        }
      )
      return
    }

    showChoice(
      'Wheat Field',
      'In front of you is a field of wheat ready for harvest.\n\nDo you want to harvest it?',
      () => {
        const wheatAmount = Math.floor(Math.random() * 3) + 2
        updateGameState(prev => ({
          wheat: prev.wheat + wheatAmount,
          energy: prev.energy - 15
        }))
        gainXP(12)
        addLog(`You harvested ${wheatAmount} wheat bundles! +${wheatAmount} wheat, +12 XP`)
        
        const newEnergy = gameState.energy - 15
        if (newEnergy < 20) {
          addLog("You're starting to feel tired...")
        }
        
        setCompletedTasks([...completedTasks, 'wheat'])
      },
      () => {
        addLog('You decided to skip the wheat harvest.')
        setCompletedTasks([...completedTasks, 'wheat'])
      }
    )
  }

  const pickApples = () => {
    if (completedTasks.includes('apples')) return
    
    addLog('You approach your apple tree. Red apples hang from the branches.')

    if (gameState.energy < 8) {
      showChoice(
        'Low Energy Warning',
        `You're exhausted! (${gameState.energy} energy left)\n\nDo you want to pick apples anyway?\n(This needs 8 energy)`,
        () => {
          addLog("You don't have enough energy! Skipping apples.")
        },
        () => {
          addLog('You decide to skip the apples.')
        }
      )
      return
    }

    showChoice(
      'Apple Tree',
      'There are ripe apples hanging from the tree.\n\nDo you want to pick them?',
      () => {
        const appleAmount = Math.floor(Math.random() * 3) + 1
        updateGameState(prev => ({
          apples: prev.apples + appleAmount,
          energy: prev.energy - 8
        }))
        gainXP(6)
        addLog(`You picked ${appleAmount} delicious ${appleAmount === 1 ? 'apple' : 'apples'}! +${appleAmount} apples, +6 XP`)
        
        setCompletedTasks([...completedTasks, 'apples'])
      },
      () => {
        addLog('You decided to skip picking apples.')
        setCompletedTasks([...completedTasks, 'apples'])
      }
    )
  }

  const pickBerries = () => {
    if (completedTasks.includes('berries')) return
    
    addLog('You walk deeper into the farm and find wild berry bushes.')

    if (gameState.energy < 6) {
      showChoice(
        'Low Energy Warning',
        `You're very tired! (${gameState.energy} energy left)\n\nDo you want to pick berries anyway?\n(This needs 6 energy)`,
        () => {
          addLog("You don't have enough energy! Skipping berries.")
        },
        () => {
          addLog('You decide to skip the berries.')
        }
      )
      return
    }

    showChoice(
      'Berry Bushes',
      'You found a patch of wild berries!\n\nDo you want to pick them?',
      () => {
        const berryAmount = Math.floor(Math.random() * 4) + 2
        updateGameState(prev => ({
          berries: prev.berries + berryAmount,
          energy: prev.energy - 6
        }))
        gainXP(8)
        addLog(`You gathered ${berryAmount} juicy berries! +${berryAmount} berries, +8 XP`)
        
        setCompletedTasks([...completedTasks, 'berries'])
      },
      () => {
        addLog('You decided to leave the berries for another day.')
        setCompletedTasks([...completedTasks, 'berries'])
      }
    )
  }

  const luckyDiscovery = () => {
    if (completedTasks.includes('lucky')) return
    
    addLog('As you explore your farm, something catches your eye...')
    addLog('Lucky you! You found a golden fruit on a tree!')
    addLog("There's a bird guarding it. It chirps and holds up its talons.")

    if (gameState.energy < 5) {
      addLog("You're too tired to try for it. Maybe tomorrow...")
      setCompletedTasks([...completedTasks, 'lucky'])
      return
    }

    showChoice(
      'Bird Challenge',
      'The bird challenges you to a guessing game!\n\n"Guess which talon the seed is under: 1, 2, or 3!"\n\nDo you want to play?\n(Costs 5 energy)',
      () => {
        updateGameState(prev => ({ energy: prev.energy - 5 }))
        
        showPrompt(
          'Guess the Talon',
          'The bird shows you three talons.\n\nWhich one has the seed?\n\nEnter 1, 2, or 3:',
          (guessStr: string) => {
            const guess = parseInt(guessStr)
            const magic = Math.floor(Math.random() * 3) + 1

            if (guess === magic) {
              const bonusXp = Math.floor(Math.random() * 11) + 20
              addLog('THE BIRD CHIRPS EXCITEDLY! You guessed correctly!')
              addLog('The bird gives you the golden fruit and flies down to share more treasures!')
              updateGameState(prev => ({
                gold: prev.gold + 25,
                carrots: prev.carrots + 2,
                berries: prev.berries + 1,
                inventory: [...prev.inventory, 'golden fruit']
              }))
              gainXP(bonusXp)
              addLog(`JACKPOT! +golden fruit, +25 gold, +2 carrots, +1 berry, +${bonusXp} XP!`)
            } else {
              addLog(`The seed was under talon ${magic}! You guessed ${guess}.`)
              addLog('The bird chirps sympathetically and gives you a small berry for trying.')
              gainXP(5)
              addLog('+5 XP for being brave!')
            }
            
            setCompletedTasks([...completedTasks, 'lucky'])
          },
          () => {
            addLog('You changed your mind. The bird looks disappointed.')
            gainXP(5)
            setCompletedTasks([...completedTasks, 'lucky'])
          }
        )
      },
      () => {
        addLog('You politely decline and wave goodbye to the bird.')
        setCompletedTasks([...completedTasks, 'lucky'])
      }
    )
  }

  const actions = [
    {
      id: 'carrots',
      title: 'Pick Carrots',
      description: 'Harvest fresh carrots from your field',
      energyCost: 10,
      icon: CarrotIcon,
      iconColor: 'text-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-300',
      onClick: pickCarrots
    },
    {
      id: 'wheat',
      title: 'Harvest Wheat',
      description: 'Gather golden wheat from the field',
      energyCost: 15,
      icon: WheatIcon,
      iconColor: 'text-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-300',
      onClick: harvestWheat
    },
    {
      id: 'apples',
      title: 'Pick Apples',
      description: 'Collect ripe apples from the tree',
      energyCost: 8,
      icon: AppleIcon,
      iconColor: 'text-red-600',
      bgGradient: 'from-red-50 to-red-100',
      borderColor: 'border-red-300',
      onClick: pickApples
    },
    {
      id: 'berries',
      title: 'Pick Berries',
      description: 'Gather wild berries from bushes',
      energyCost: 6,
      icon: BerryIcon,
      iconColor: 'text-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-300',
      onClick: pickBerries,
      disabled: gameState.day < 2,
      disabledReason: 'Available from Day 2'
    },
    {
      id: 'lucky',
      title: 'Lucky Discovery',
      description: 'A mysterious bird challenges you to a game',
      energyCost: 5,
      icon: SunIcon,
      iconColor: 'text-amber-500',
      bgGradient: 'from-amber-100 to-yellow-100',
      borderColor: 'border-yellow-300',
      onClick: luckyDiscovery
    }
  ]

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
          <SunIcon className="text-farm-wheat-500" size={28} />
          <h3 className="text-xl font-bold text-gray-800">Field Work</h3>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <EnergyIcon className="text-amber-600" size={20} />
            <p className="text-sm font-semibold text-gray-700">
              Energy: <span className={gameState.energy < 20 ? 'text-red-600' : 'text-green-600'}>{gameState.energy}</span>
            </p>
          </div>
          <p className="text-xs text-gray-600 mt-1">Choose which tasks to complete today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {actions.map((action) => {
            const Icon = action.icon
            const isCompleted = completedTasks.includes(action.id)
            const hasEnergy = gameState.energy >= action.energyCost
            const isDisabled = action.disabled || isCompleted || !hasEnergy

            return (
              <div
                key={action.id}
                className={`bg-gradient-to-br ${action.bgGradient} border-2 ${action.borderColor} rounded-xl p-4 ${
                  isCompleted ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Icon className={action.iconColor} size={32} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      {action.title}
                      {isCompleted && <CheckIcon className="text-green-600" size={16} />}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <EnergyIcon className="text-gray-600" size={16} />
                    <span className={`text-sm font-semibold ${
                      hasEnergy ? 'text-gray-700' : 'text-red-600'
                    }`}>
                      {action.energyCost} energy
                    </span>
                  </div>

                  <button
                    onClick={action.onClick}
                    disabled={isDisabled}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isCompleted
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : isDisabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                  >
                    {isCompleted ? '✓ Done' : action.disabled ? action.disabledReason : 'Start Task'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => {
            addLog('Field work complete! Heading to the village market.')
            onComplete()
          }}
          className="btn-primary w-full py-3 text-lg"
        >
          Head to Village Market →
        </button>
      </div>
    </>
  )
}
