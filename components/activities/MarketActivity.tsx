import { useState, useEffect } from 'react'
import { GameState } from '@/pages/index'
import { ChickenIcon, CowIcon, SeedIcon, ToolIcon, CoinsIcon, ShopIcon } from '@/components/icons/Icons'
import Dialog from '@/components/Dialog'

interface ActivityProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => void
  addLog: (message: string) => void
  gainXP: (amount: number) => void
  onComplete: () => void
}

export default function MarketActivity({ gameState, updateGameState, addLog, gainXP, onComplete }: ActivityProps) {
  const [greeted, setGreeted] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogConfig, setDialogConfig] = useState<{
    title: string
    message: string
    type: 'confirm' | 'prompt' | 'choice'
    choices?: string[]
    onConfirm: (value?: string) => void
  } | null>(null)

  const showChoice = (title: string, message: string, choices: string[], onSelect: (choice: string) => void) => {
    setDialogConfig({
      title,
      message,
      type: 'choice',
      choices,
      onConfirm: (value) => {
        setShowDialog(false)
        if (value) onSelect(value)
      }
    })
    setShowDialog(true)
  }

  const showConfirm = (title: string, message: string, onYes: () => void, onNo: () => void) => {
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

  const showShopMenu = () => {
    const choices = [
      `1 - Buy chicken (20 gold) ${gameState.gold < 20 ? '❌ Not enough gold' : '✓'}`,
      `2 - Buy cow (40 gold) ${gameState.gold < 40 ? '❌ Not enough gold' : '✓'}`,
      `3 - Buy seeds (10 gold) ${gameState.gold < 10 ? '❌ Not enough gold' : '✓'}`,
      `4 - Buy better tool (25 gold) ${gameState.gold < 25 ? '❌ Not enough gold' : '✓'}`,
      `5 - Sell apples (You have: ${gameState.apples})`,
      `6 - Sell berries (You have: ${gameState.berries})`,
      `7 - Leave market`
    ]

    showChoice(
      '🏪 Village Market',
      `Your Gold: ${gameState.gold}\n\nWhat would you like to do?`,
      choices,
      (choice) => {
        const num = parseInt(choice.charAt(0))
        handleChoice(num)
      }
    )
  }

  const handleChoice = (choice: number) => {
    switch (choice) {
      case 1: // Buy chicken
        if (gameState.gold >= 20) {
          showConfirm(
            'Buy Chicken',
            'Buy a chicken for 20 gold?\n\nChickens lay eggs daily when fed 1 wheat.',
            () => {
              updateGameState(prev => ({
                gold: prev.gold - 20,
                chickens: prev.chickens + 1
              }))
              addLog('You bought a chicken! Remember to feed it 1 wheat daily.')
              setTimeout(() => showShopMenu(), 1000)
            },
            () => {
              addLog('You decided not to buy the chicken.')
              setTimeout(() => showShopMenu(), 500)
            }
          )
        } else {
          addLog("You don't have enough gold! You need 20 gold.")
          setTimeout(() => showShopMenu(), 1000)
        }
        break

      case 2: // Buy cow
        if (gameState.gold >= 40) {
          showConfirm(
            'Buy Cow',
            'Buy a cow for 40 gold?\n\nCows produce milk daily when fed 2 carrots.',
            () => {
              updateGameState(prev => ({
                gold: prev.gold - 40,
                cows: prev.cows + 1
              }))
              addLog('You bought a cow! Remember to feed it 2 carrots daily.')
              setTimeout(() => showShopMenu(), 1000)
            },
            () => {
              addLog('You decided not to buy the cow.')
              setTimeout(() => showShopMenu(), 500)
            }
          )
        } else {
          addLog("You don't have enough gold! You need 40 gold.")
          setTimeout(() => showShopMenu(), 1000)
        }
        break

      case 3: // Buy seeds
        if (gameState.gold >= 10) {
          showConfirm(
            'Buy Seeds',
            'Buy seed package for 10 gold?\n\nYou will get 3 wheat and 3 carrots.',
            () => {
              updateGameState(prev => ({
                gold: prev.gold - 10,
                wheat: prev.wheat + 3,
                carrots: prev.carrots + 3
              }))
              gainXP(8)
              addLog('You bought seeds! +3 wheat, +3 carrots, +8 XP')
              setTimeout(() => showShopMenu(), 1000)
            },
            () => {
              addLog('You decided not to buy seeds.')
              setTimeout(() => showShopMenu(), 500)
            }
          )
        } else {
          addLog("You don't have enough gold! You need 10 gold.")
          setTimeout(() => showShopMenu(), 1000)
        }
        break

      case 4: // Buy tool
        if (gameState.gold >= 25) {
          showConfirm(
            'Buy Better Tool',
            'Buy a better tool for 25 gold?\n\nThis will permanently increase your strength by 7 points!',
            () => {
              const strengthIncrease = 7
              updateGameState(prev => ({
                gold: prev.gold - 25,
                strength: prev.strength + strengthIncrease
              }))
              addLog(`You bought a better tool! Strength increased by ${strengthIncrease}!`)
              setTimeout(() => showShopMenu(), 1000)
            },
            () => {
              addLog('You decided not to buy the tool.')
              setTimeout(() => showShopMenu(), 500)
            }
          )
        } else {
          addLog("You don't have enough gold! You need 25 gold.")
          setTimeout(() => showShopMenu(), 1000)
        }
        break

      case 5: // Sell apples
        if (gameState.apples > 0) {
          showPrompt(
            'Sell Apples',
            `How many apples do you want to sell?\n\nYou have ${gameState.apples} apples.\nPrice: 3 gold each\n\nEnter amount:`,
            (amountStr) => {
              const amount = parseInt(amountStr)
              if (amount > 0 && amount <= gameState.apples) {
                const goldEarned = amount * 3
                updateGameState(prev => ({
                  apples: prev.apples - amount,
                  gold: prev.gold + goldEarned
                }))
                addLog(`You sold ${amount} ${amount === 1 ? 'apple' : 'apples'} for ${goldEarned} gold!`)
              } else {
                addLog('Invalid amount!')
              }
              setTimeout(() => showShopMenu(), 1000)
            },
            () => {
              addLog('You decided not to sell apples.')
              setTimeout(() => showShopMenu(), 500)
            }
          )
        } else {
          addLog("You don't have any apples to sell!")
          setTimeout(() => showShopMenu(), 1000)
        }
        break

      case 6: // Sell berries
        if (gameState.berries > 0) {
          showPrompt(
            'Sell Berries',
            `How many berries do you want to sell?\n\nYou have ${gameState.berries} berries.\nPrice: 2 gold each\n\nEnter amount:`,
            (amountStr) => {
              const amount = parseInt(amountStr)
              if (amount > 0 && amount <= gameState.berries) {
                const goldEarned = amount * 2
                updateGameState(prev => ({
                  berries: prev.berries - amount,
                  gold: prev.gold + goldEarned
                }))
                addLog(`You sold ${amount} ${amount === 1 ? 'berry' : 'berries'} for ${goldEarned} gold!`)
              } else {
                addLog('Invalid amount!')
              }
              setTimeout(() => showShopMenu(), 1000)
            },
            () => {
              addLog('You decided not to sell berries.')
              setTimeout(() => showShopMenu(), 500)
            }
          )
        } else {
          addLog("You don't have any berries to sell!")
          setTimeout(() => showShopMenu(), 1000)
        }
        break

      case 7: // Leave
        addLog('You thank the merchant and leave the market.')
        setTimeout(() => onComplete(), 1500)
        break

      default:
        addLog('The merchant looks confused. Please choose 1-7.')
        setTimeout(() => showShopMenu(), 1000)
        break
    }
  }

  useEffect(() => {
    if (!greeted) {
      setGreeted(true)
      addLog('You arrive at the bustling village market.')
      addLog('A friendly merchant waves at you.')
      addLog('"Welcome! Come see what I have for sale!"')
      
      setTimeout(() => {
        showShopMenu()
      }, 1500)
    }
  }, [greeted])

  return (
    <>
      {showDialog && dialogConfig && (
        <Dialog
          title={dialogConfig.title}
          message={dialogConfig.message}
          type={dialogConfig.type}
          choices={dialogConfig.choices}
          onConfirm={(value) => dialogConfig.onConfirm(value)}
          onCancel={() => setShowDialog(false)}
        />
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <ShopIcon className="text-farm-barn-600" size={28} />
          <h3 className="text-xl font-bold text-gray-800">Village Market</h3>
        </div>

        <div className="bg-farm-wheat-50 border-2 border-farm-wheat-300 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <CoinsIcon className="text-farm-wheat-600" size={20} />
            <p className="text-sm font-semibold text-gray-700">Your Gold: <span className="text-farm-wheat-600 text-lg">{gameState.gold}</span></p>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="animate-pulse mb-4">
            <div className="text-6xl mb-4">🧑‍🌾</div>
            <p className="text-gray-600 text-lg">Shopping at the market...</p>
          </div>
        </div>
      </div>
    </>
  )
}
