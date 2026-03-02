import { GameState } from '@/pages/index'
import { 
  StarIcon, TrophyIcon, MoonIcon, EnergyIcon, HeartIcon, 
  CoinsIcon, LevelUpIcon, StrengthIcon, ChickenIcon, CowIcon,
  CarrotIcon, WheatIcon, AppleIcon, BerryIcon, CalendarIcon, CheckIcon 
} from '@/components/icons/Icons'

interface DayEndProps {
  gameState: GameState
  onNextDay: () => void
  onReturnToMenu: () => void
}

export default function DayEnd({ gameState, onNextDay, onReturnToMenu }: DayEndProps) {
  const totalAnimals = gameState.chickens + gameState.cows
  const totalResources = gameState.carrots + gameState.wheat + gameState.apples + gameState.berries
  
  let ratingScore = 0
  
  if (gameState.level >= 5) ratingScore += 4
  else if (gameState.level >= 4) ratingScore += 3
  else if (gameState.level >= 3) ratingScore += 2
  else if (gameState.level >= 2) ratingScore += 1
  
  if (gameState.gold >= 80) ratingScore += 3
  else if (gameState.gold >= 50) ratingScore += 2
  else if (gameState.gold >= 25) ratingScore += 1
  
  if (totalAnimals >= 3) ratingScore += 2
  else if (totalAnimals >= 1) ratingScore += 1
  
  if (totalResources >= 15) ratingScore += 1

  const getRating = () => {
    if (ratingScore >= 8) return { title: 'LEGENDARY FARMER', stars: 5, desc: 'You are the pride of the village! Your farm is known throughout the land!' }
    if (ratingScore >= 6) return { title: 'MASTER FARMER', stars: 4, desc: 'Incredible harvest day! Your farm is thriving and prosperous!' }
    if (ratingScore >= 4) return { title: 'SKILLED FARMER', stars: 3, desc: 'Really productive day! Your farm is growing nicely.' }
    if (ratingScore >= 2) return { title: 'GROWING FARMER', stars: 2, desc: 'Not bad for a day\'s work! You\'re making steady progress.' }
    return { title: 'BEGINNER FARMER', stars: 1, desc: 'Every great farmer starts somewhere. Tomorrow will be even better!' }
  }

  const rating = getRating()

  const achievements = []
  if (gameState.level >= 5) achievements.push('Master Level Farmer')
  if (gameState.gold >= 100) achievements.push('Wealthy Landowner')
  if (totalAnimals >= 5) achievements.push('Animal Caretaker')
  if (gameState.inventory.length >= 3) achievements.push('Treasure Collector')
  if (gameState.day >= 7) achievements.push(`Week of Farming (Day ${gameState.day})`)

  return (
    <div className="space-y-6">
      {/* Day Summary */}
      <div className="card bg-gradient-to-br from-farm-barn-500 to-farm-barn-600 text-white">
        <div className="flex items-center gap-3 mb-2">
          <MoonIcon size={32} />
          <h2 className="text-3xl font-bold">End of Day {gameState.day}</h2>
        </div>
        <p className="text-farm-barn-100">Here&apos;s how you did today</p>
      </div>

      {/* Stats Summary */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Day Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-farm-grass-50 rounded-lg">
            <div className="flex justify-center mb-2">
              <LevelUpIcon className="text-farm-grass-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-farm-grass-700">{gameState.level}</div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
          <div className="text-center p-4 bg-farm-wheat-50 rounded-lg">
            <div className="flex justify-center mb-2">
              <CoinsIcon className="text-farm-wheat-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-farm-wheat-700">{gameState.gold}</div>
            <div className="text-sm text-gray-600">Gold</div>
          </div>
          <div className="text-center p-4 bg-farm-sky-50 rounded-lg">
            <div className="flex justify-center mb-2">
              <EnergyIcon className="text-farm-sky-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-farm-sky-700">{gameState.energy}</div>
            <div className="text-sm text-gray-600">Energy</div>
          </div>
          <div className="text-center p-4 bg-farm-barn-50 rounded-lg">
            <div className="flex justify-center mb-2">
              <StrengthIcon className="text-farm-barn-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-farm-barn-700">{gameState.strength}</div>
            <div className="text-sm text-gray-600">Strength</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Animals</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ChickenIcon className="text-farm-wheat-600" size={16} />
                  <span>Chickens</span>
                </div>
                <span className="font-semibold">{gameState.chickens}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CowIcon className="text-farm-soil-600" size={16} />
                  <span>Cows</span>
                </div>
                <span className="font-semibold">{gameState.cows}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Storage</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CarrotIcon className="text-orange-500" size={16} />
                  <span>Carrots</span>
                </div>
                <span className="font-semibold">{gameState.carrots}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <WheatIcon className="text-farm-wheat-600" size={16} />
                  <span>Wheat</span>
                </div>
                <span className="font-semibold">{gameState.wheat}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AppleIcon className="text-red-500" size={16} />
                  <span>Apples</span>
                </div>
                <span className="font-semibold">{gameState.apples}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BerryIcon className="text-purple-600" size={16} />
                  <span>Berries</span>
                </div>
                <span className="font-semibold">{gameState.berries}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="card bg-gradient-to-br from-farm-wheat-50 to-farm-wheat-100 border-2 border-farm-wheat-300">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Daily Rating</h3>
        
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-farm-wheat-700 mb-2">{rating.title}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: rating.stars }, (_, i) => (
              <StarIcon key={i} className="text-farm-wheat-600" size={36} />
            ))}
          </div>
          <p className="text-gray-700">{rating.desc}</p>
        </div>

        {achievements.length > 0 && (
          <div className="mt-6 pt-6 border-t border-farm-wheat-200">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TrophyIcon className="text-farm-wheat-700" size={24} />
              <h4 className="font-semibold text-gray-800">Achievements</h4>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {achievements.map((achievement, idx) => (
                <span 
                  key={idx}
                  className="bg-farm-wheat-100 text-farm-wheat-900 px-3 py-1 rounded-full text-sm font-medium border border-farm-wheat-300"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onNextDay}
          className="btn-primary text-lg py-4 flex items-center justify-center gap-2"
        >
          <CalendarIcon size={20} />
          Continue to Day {gameState.day + 1}
        </button>
        <button
          onClick={onReturnToMenu}
          className="btn-secondary text-lg py-4"
        >
          Save & Exit
        </button>
      </div>

      <p className="text-center text-gray-600 text-sm flex items-center justify-center gap-2">
        <CheckIcon size={16} className="text-farm-grass-600" />
        Game automatically saved • Day {gameState.day} complete
      </p>
    </div>
  )
}
