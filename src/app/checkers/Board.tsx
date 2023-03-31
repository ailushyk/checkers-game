import React from 'react'

function Pawn(props: { square: string }) {
  return (
    <div
      className={`h-8 w-8 rounded-full ${
        props.square === 'w' ? 'bg-yellow-50' : 'bg-black'
      }`}
      style={{
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

function CheckersBoard() {
  const board = [
    ['', 'b', '', 'b', '', 'b', '', 'b'],
    ['b', '', 'b', '', 'b', '', 'b', ''],
    ['', 'b', '', 'b', '', 'b', '', 'b'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['w', '', 'w', '', 'w', '', 'w', ''],
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
                {square !== '' && <Pawn square={square} />}
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
