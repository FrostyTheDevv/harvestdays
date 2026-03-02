import { GameState } from '@/pages/index'
import { 
  LevelUpIcon, CalendarIcon, CoinsIcon, EnergyIcon, HeartIcon, 
  StrengthIcon, ChickenIcon, CowIcon, CarrotIcon, WheatIcon, 
  AppleIcon, BerryIcon, InventoryIcon 
} from '@/components/icons/Icons'

interface GameStatsProps {
  gameState: GameState
}

export default function GameStats({ gameState }: GameStatsProps) {
  const xpToNextLevel = gameState.level * 20
  const xpProgress = (gameState.xp / xpToNextLevel) * 100

  return (
    <div className="space-y-4 sticky top-4">
      {/* Player Info */}
      <div className="card">
        <h2 className="text-2xl font-bold text-farm-barn-800 mb-4">{gameState.name}</h2>
        
        <div className="space-y-3">
          <div className="stat-card">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <LevelUpIcon className="text-farm-grass-600" size={18} />
                <span className="text-sm font-medium text-gray-600">Level</span>
              </div>
              <span className="text-xl font-bold text-farm-grass-700">{gameState.level}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-farm-grass-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {gameState.xp} / {xpToNextLevel} XP
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="stat-card">
              <div className="flex items-center gap-1 mb-1">
                <CalendarIcon className="text-farm-sky-600" size={14} />
                <div className="text-xs text-gray-600">Day</div>
              </div>
              <div className="text-2xl font-bold text-farm-sky-700">{gameState.day}</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-1 mb-1">
                <CoinsIcon className="text-farm-wheat-600" size={14} />
                <div className="text-xs text-gray-600">Gold</div>
              </div>
              <div className="text-2xl font-bold text-farm-wheat-700">{gameState.gold}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <EnergyIcon className="text-farm-sky-600" size={18} />
                <span className="text-sm font-medium text-gray-600">Energy</span>
              </div>
              <span className="text-lg font-bold text-farm-sky-700">{gameState.energy}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-farm-sky-500 h-2 rounded-full transition-all"
                style={{ width: `${gameState.energy}%` }}
              />
            </div>
          </div>

          <div className="stat-card">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <HeartIcon className="text-red-500" size={18} />
                <span className="text-sm font-medium text-gray-600">Health</span>
              </div>
              <span className="text-lg font-bold text-red-600">{gameState.health}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${gameState.health}%` }}
              />
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <StrengthIcon className="text-farm-barn-600" size={18} />
              <span className="text-sm font-medium text-gray-600">Strength</span>
            </div>
            <div className="text-2xl font-bold text-farm-barn-700">{gameState.strength}</div>
          </div>
        </div>

        {(gameState.chickens > 0 || gameState.cows > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Animals</div>
            <div className="space-y-1">
              {gameState.chickens > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <ChickenIcon className="text-farm-wheat-600" size={16} />
                    <span>Chickens</span>
                  </div>
                  <span className="font-semibold">{gameState.chickens}</span>
                </div>
              )}
              {gameState.cows > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <CowIcon className="text-farm-soil-600" size={16} />
                    <span>Cows</span>
                  </div>
                  <span className="font-semibold">{gameState.cows}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm font-medium text-gray-600 mb-2">Storage</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-orange-50 p-2 rounded flex items-center gap-2">
              <CarrotIcon className="text-orange-600" size={20} />
              <div className="flex-1">
                <div className="text-gray-600 text-xs">Carrots</div>
                <div className="font-bold text-orange-600">{gameState.carrots}</div>
              </div>
            </div>
            <div className="bg-farm-wheat-50 p-2 rounded flex items-center gap-2">
              <WheatIcon className="text-farm-wheat-600" size={20} />
              <div className="flex-1">
                <div className="text-gray-600 text-xs">Wheat</div>
                <div className="font-bold text-farm-wheat-700">{gameState.wheat}</div>
              </div>
            </div>
            <div className="bg-red-50 p-2 rounded flex items-center gap-2">
              <AppleIcon className="text-red-600" size={20} />
              <div className="flex-1">
                <div className="text-gray-600 text-xs">Apples</div>
                <div className="font-bold text-red-600">{gameState.apples}</div>
              </div>
            </div>
            <div className="bg-purple-50 p-2 rounded flex items-center gap-2">
              <BerryIcon className="text-purple-600" size={20} />
              <div className="flex-1">
                <div className="text-gray-600 text-xs">Berries</div>
                <div className="font-bold text-purple-600">{gameState.berries}</div>
              </div>
            </div>
          </div>
        </div>

        {gameState.inventory.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <InventoryIcon className="text-farm-barn-600" size={16} />
              <div className="text-sm font-medium text-gray-600">Special Items</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {gameState.inventory.map((item, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-farm-wheat-100 text-farm-wheat-900 px-2 py-1 rounded-full border border-farm-wheat-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
