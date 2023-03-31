import React from 'react'

export function CheckersPiece({ type }: CheckersPieceProps) {
  if (type === '') return null

  const backgroundColor =
    type.toLowerCase() === 'w' ? 'bg-yellow-50' : 'bg-black'
  const isQueen = type === 'W' || type === 'B'

  return (
    <div
      className={`h-8 w-8 rounded-full ${backgroundColor}`}
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
          fill={backgroundColor}
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
