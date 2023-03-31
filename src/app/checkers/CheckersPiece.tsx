import React from 'react'

export interface CheckersPieceProps {
  type: CheckersPieceType
  isActive?: boolean
}

export function CheckersPiece({ type, isActive }: CheckersPieceProps) {
  if (type === '') return null

  let backgroundColor =
    type.toLowerCase() === 'w'
      ? 'bg-yellow-50 hover:bg-red-400'
      : 'bg-gray-900 hover:bg-red-500'
  let activeBackgroundColor =
    type.toLowerCase() === 'w' ? 'fill-red-400' : 'fill-red-500'

  const isQueen = type === 'W' || type === 'B'

  return (
    <div
      className={`h-8 w-8 cursor-pointer rounded-full transition ${backgroundColor}`}
      style={{
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="10"
          cy="10"
          r="8"
          className={`${isActive ? activeBackgroundColor : backgroundColor}`}
          stroke="#4B5563"
          strokeWidth="2"
        />
        {isQueen ? (
          <>
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={type.toLowerCase() === 'w' ? '#4B5563' : '#F9FAFB'}
              fontSize="text-base"
            >
              ♕
            </text>
          </>
        ) : null}
      </svg>
    </div>
  )
}
