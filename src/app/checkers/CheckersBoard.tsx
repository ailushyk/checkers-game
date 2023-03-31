'use client'
import React, { useState } from 'react'
import { CheckersPiece } from '@/app/checkers/CheckersPiece'
import ActivePlayerIndicator from '@/app/checkers/ActivePlayerIndicator'
import { getPossibleMoves } from '@/app/checkers/getPossibleMoves'

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
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <div
      onClick={props.onClick}
      className={`h-10 w-10 transition ${
        (props.rowIndex + props.columnIndex) % 2 === 0
          ? 'bg-white'
          : 'bg-gray-500 hover:bg-gray-600'
      }`}
    >
      {props.children}
    </div>
  )
}

export function CheckersBoard() {
  const [activePlayer, setActivePlayer] = useState<Player>('w')
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(
    null,
  )
  const [board, setBoard] = useState<CheckersPieceType[][]>([
    ['', 'b', '', 'b', '', 'b', '', 'b'],
    ['b', '', 'b', '', 'b', '', 'b', ''],
    ['', 'b', '', '', '', 'b', '', 'b'],
    ['', '', 'b', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['w', '', 'w', '', 'w', '', 'w', ''],
    ['', 'w', '', 'w', '', 'w', '', 'w'],
    ['w', '', 'w', '', 'w', '', 'w', ''],
  ])

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  function makeMove(
    board: CheckersPieceType[][],
    selectedPiece: [number, number],
    targetSquare: [col: number, row: number],
  ) {
    const newBoard = board.map((row) => row.slice())
    const [selectedRow, selectedCol] = selectedPiece
    const [row, col] = targetSquare

    newBoard[row][col] = newBoard[selectedRow][selectedCol]
    newBoard[selectedRow][selectedCol] = ''

    return newBoard
  }

  function handleSquareClick(row: number, col: number) {
    // Check if there is a selected piece
    if (selectedPiece) {
      if (isEqual(selectedPiece, [row, col])) {
        setSelectedPiece(null)
        return
      }

      const moves = getPossibleMoves(board, selectedPiece)
      const targetSquare: [col: number, row: number] = [row, col]

      // Check if the selected piece can move to the target square
      console.log(moves)
      console.log(selectedPiece)
      console.log(targetSquare)
      if (moves.some((move) => isEqual(move, targetSquare))) {
        const newBoard = makeMove(board, selectedPiece, targetSquare)

        // Set the new board in state
        setBoard(newBoard)
        setSelectedPiece(null)
        setActivePlayer(activePlayer === 'w' ? 'b' : 'w')
      } else {
        // Invalid move
        console.log('Invalid move')
      }
    } else {
      // Check if there is a piece on the selected square
      const piece = board[row][col]
      if (piece !== '') {
        // Check if the piece belongs to the active player
        if (piece.toLowerCase() === activePlayer) {
          setSelectedPiece([row, col])
        } else {
          // Not the active player's turn
          console.log("It's not your turn")
        }
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-800">
      <ActivePlayerIndicator activePlayer={activePlayer} />
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
            {row.map((piece, columnIndex) => (
              <CheckersBoardSquare
                key={`square-${rowIndex}-${columnIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                onClick={() => handleSquareClick(rowIndex, columnIndex)}
              >
                <CheckersPiece
                  type={piece}
                  isActive={
                    selectedPiece
                      ? isEqual(selectedPiece, [rowIndex, columnIndex])
                      : false
                  }
                />
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

export function isEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }

  return true
}
