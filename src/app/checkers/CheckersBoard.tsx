'use client'
import React, { useState } from 'react'
import { CheckersPiece } from '@/app/checkers/CheckersPiece'

function LetterCell(props: { letter: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center text-sm font-semibold">
      {props.letter}
    </div>
  )
}

function NumberCell(props: { rowIndex: number }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center text-sm font-semibold">
      {8 - props.rowIndex}
    </div>
  )
}

function CheckersBoardSquare(props: {
  rowIndex: number
  columnIndex: number
  children: React.ReactNode
}) {
  return (
    <div
      className={`h-10 w-10 ${
        (props.rowIndex + props.columnIndex) % 2 === 0
          ? 'bg-white'
          : 'bg-gray-500'
      }`}
    >
      {props.children}
    </div>
  )
}

export function CheckersBoard() {
  const [board, setBoard] = useState<CheckersPieceType[][]>([
    ['', 'b', '', 'b', '', 'b', '', 'b'],
    ['b', '', 'b', '', 'b', '', 'b', ''],
    ['', 'b', '', 'b', '', 'b', '', 'b'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['w', '', 'w', '', 'w', '', 'w', ''],
    ['', 'w', '', 'w', '', 'w', '', 'w'],
    ['w', '', 'w', '', 'w', '', 'w', ''],
  ])

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-800">
      <div className="border-4 border-gray-700 bg-white p-2">
        <div className="flex">
          <div className="w-10"></div>
          {letters.map((letter, index) => (
            <LetterCell key={`letter-${index}`} letter={letter} />
          ))}
          <div className="w-10"></div>
        </div>

        {board.map((row, rowIndex) => (
          <div className="flex" key={`row-${rowIndex}`}>
            <NumberCell rowIndex={rowIndex} />
            {row.map((square, columnIndex) => (
              <CheckersBoardSquare
                key={`square-${rowIndex}-${columnIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
              >
                <CheckersPiece type={square} />
              </CheckersBoardSquare>
            ))}
            <NumberCell rowIndex={rowIndex} />
          </div>
        ))}

        <div className="flex">
          <div className="w-10"></div>
          {letters.map((letter, index) => (
            <LetterCell key={`letter-${index}`} letter={letter} />
          ))}
          <div className="w-10"></div>
        </div>
      </div>
    </div>
  )
}
