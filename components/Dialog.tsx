import { useState } from 'react'

interface DialogProps {
  title: string
  message: string
  type: 'confirm' | 'prompt' | 'choice'
  choices?: string[]
  yesText?: string
  noText?: string
  onConfirm: (value?: string) => void
  onCancel: () => void
}

export default function Dialog({ title, message, type, choices, yesText, noText, onConfirm, onCancel }: DialogProps) {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl max-w-lg w-full p-8 border-4 border-farm-barn-600 transform animate-slideUp">
        <div className="bg-farm-barn-600 -mx-8 -mt-8 px-8 py-4 rounded-t-xl mb-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        
        <div className="text-gray-800 mb-6 whitespace-pre-line leading-relaxed text-lg font-medium">
          {message}
        </div>

        {type === 'prompt' && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border-3 border-farm-grass-500 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-farm-grass-300 text-lg font-semibold shadow-inner"
            placeholder="Type your answer here..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                onConfirm(inputValue)
              }
            }}
          />
        )}

        {type === 'choice' && choices && (
          <div className="grid grid-cols-1 gap-3 mb-4 max-h-96 overflow-y-auto">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onConfirm(choice)}
                className="px-5 py-4 bg-gradient-to-r from-farm-grass-600 to-farm-grass-700 text-white rounded-xl font-bold hover:from-farm-grass-700 hover:to-farm-grass-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-left border-2 border-farm-grass-800"
              >
                <span className="text-lg">{choice}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          {type === 'confirm' && (
            <>
              <button
                onClick={() => onConfirm('yes')}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-xl border-2 border-green-800"
              >
                ✓ {yesText || 'Yes'}
              </button>
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-xl border-2 border-red-800"
              >
                ✗ {noText || 'No'}
              </button>
            </>
          )}

          {type === 'prompt' && (
            <>
              <button
                onClick={() => inputValue.trim() && onConfirm(inputValue)}
                disabled={!inputValue.trim()}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg text-xl border-2 border-green-800 disabled:transform-none"
              >
                ✓ Submit
              </button>
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-xl border-2 border-gray-800"
              >
                ✗ Skip
              </button>
            </>
          )}

          {type === 'choice' && (
            <button
              onClick={onCancel}
              className="w-full px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-xl border-2 border-gray-800"
            >
              ← Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
