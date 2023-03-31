import React from 'react'

interface ActivePlayerIndicatorProps {
  activePlayer: Player
}

function ActivePlayerIndicator({ activePlayer }: ActivePlayerIndicatorProps) {
  const indicatorColor = activePlayer === 'w' ? 'bg-white' : 'bg-black'

  return (
    <div className="flex h-16 w-full items-center justify-center">
      <div
        className={`h-8 w-8 rounded-full border-4 border-gray-700 ${indicatorColor}`}
      ></div>
      <div className="ml-2 text-gray-300">{activePlayer}'s turn</div>
    </div>
  )
}

export default ActivePlayerIndicator
