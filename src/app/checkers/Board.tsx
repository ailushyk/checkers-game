import React from 'react'

interface CheckersPieceProps {
  type: 'w' | 'b' | 'W' | 'B'
}

function CheckersPiece({ type }: CheckersPieceProps) {
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
      {isQueen ? (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="10"
            cy="10"
            r="8"
            fill={backgroundColor}
            stroke="#4B5563"
            strokeWidth="2"
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={type.toLowerCase() === 'w' ? '#4B5563' : '#F9FAFB'}
            fontSize="14px"
          >
            ♕
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="10"
            cy="10"
            r="8"
            fill={backgroundColor}
            stroke="#4B5563"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  )
}

function CheckersBoard() {
  const board = [
    ['', 'B', '', 'b', '', 'b', '', 'b'],
    ['b', '', 'b', '', 'b', '', 'b', ''],
    ['', 'b', '', 'b', '', 'b', '', 'b'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['w', '', 'W', '', 'w', '', 'w', ''],
    ['', 'w', '', 'w', '', 'w', '', 'w'],
    ['w', '', 'w', '', 'w', '', 'w', ''],
  ]

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-800">
      <div className="border-4 border-gray-700 bg-white p-2">
        <div className="flex">
          <div className="w-10"></div>
          {letters.map((letter, index) => (
            <div
              className="h-10 w-10 text-center text-lg font-bold"
              key={`letter-${index}`}
            >
              {letter}
            </div>
          ))}
          <div className="w-10"></div>
        </div>

        {board.map((row, rowIndex) => (
          <div className="flex" key={`row-${rowIndex}`}>
            <div className="h-10 w-10 text-center text-lg font-bold">
              {8 - rowIndex}
            </div>
            {row.map((square, columnIndex) => (
              <div
                className={`h-10 w-10 ${
                  (rowIndex + columnIndex) % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-500'
                }`}
                key={`square-${rowIndex}-${columnIndex}`}
              >
                {square !== '' && <CheckersPiece type={square} />}
              </div>
            ))}
            <div className="h-10 w-10 text-center text-lg font-bold">
              {8 - rowIndex}
            </div>
          </div>
        ))}

        <div className="flex">
          <div className="w-10"></div>
          {letters.map((letter, index) => (
            <div
              className="h-10 w-10 text-center text-lg font-bold"
              key={`letter-${index}`}
            >
              {letter}
            </div>
          ))}
          <div className="w-10"></div>
        </div>
      </div>
    </div>
  )
}

export default CheckersBoard
