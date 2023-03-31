'use client'
import React, { useRef, useState } from 'react'
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
  const [activePlayer, setActivePlayer] = useState<Player>('b')
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(
    null,
  )
  const [isJumping, setIsJumping] = useState<boolean>(false)

  const [board, setBoard] = useState<CheckersPieceType[][]>([
    // ['', 'b', '', 'b', '', 'b', '', 'b'],
    // ['b', '', 'b', '', 'b', '', 'b', ''],
    // ['', 'b', '', 'b', '', 'b', '', 'b'],
    // ['', '', '', '', '', '', '', ''],
    // ['', '', '', '', '', '', '', ''],
    // ['w', '', 'w', '', 'w', '', 'w', ''],
    // ['', 'w', '', 'w', '', 'w', '', 'w'],
    // ['w', '', 'w', '', 'w', '', 'w', ''],
    //
    //
    ['', 'b', '', 'b', '', 'b', '', 'B'],
    ['', '', 'w', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', 'w', '', 'w', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', 'w', '', 'w', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ])

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  function inNewKingRow(row: number, activePlayer: Player) {
    return activePlayer === 'w' ? row === 0 : row === 7
  }

  function handleSquareClick(row: number, col: number) {
    // Check if there is a selected piece
    if (selectedPiece) {
      if (isEqual(selectedPiece, [row, col])) {
        if (isJumping) {
          setIsJumping(false)
          setSelectedPiece(null)
          setActivePlayer(activePlayer === 'w' ? 'b' : 'w')
          return
        }
        setSelectedPiece(null)
        return
      }

      const [selectedRow, selectedCol] = selectedPiece
      const squaresCopy = [...board]
      const piece = squaresCopy[selectedRow][selectedCol]
      const isKing = piece === 'W' || piece === 'B'
      let isJumpDiagonal = false

      if (squaresCopy[row][col] !== '') {
        console.log('Cannot move to a non-empty square')
        return // Cannot move to a non-empty square
      }

      if (isKing) {
        // Check if move is diagonal
        if (Math.abs(selectedRow - row) !== Math.abs(selectedCol - col)) {
          console.log('not diagonal')
          return
        }

        // check if there are any pieces in the way
        const rowDir = row < selectedRow ? -1 : 1
        const colDir = col < selectedCol ? -1 : 1
        let kRow = selectedRow + rowDir
        let kCol = selectedCol + colDir

        while (kRow !== row && kCol !== col) {
          if (squaresCopy[kRow][kCol] !== '') {
            console.log('piece in the way')

            if (squaresCopy[kRow][kCol].toLowerCase() === activePlayer) {
              console.log('Cannot jump over a piece of the same color')
              return
            }

            squaresCopy[kRow][kCol] = ''
            // set jumping to true
            isJumpDiagonal = true
          }
          kRow += rowDir
          kCol += colDir
        }

        if (isJumping && !isJumpDiagonal) {
          console.log('Cannot move a piece that is jumping')
          return
        }
      } else {
        // Check if the move is diagonal and only one square away from the starting position
        const rowDiff = row - selectedRow
        const colDiff = col - selectedCol
        isJumpDiagonal = Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2

        if (isJumpDiagonal) {
          // Check if a jump move is valid
          const jumpRow = selectedRow + (row - selectedRow) / 2
          const jumpCol = selectedCol + (col - selectedCol) / 2
          const jumpedPiece = squaresCopy[jumpRow][jumpCol]
          if (jumpedPiece === '') {
            console.log('Cannot jump over an empty square')
            return // Cannot jump over an empty square
          }
          if (jumpedPiece.toLowerCase() === activePlayer) {
            console.log('Cannot jump over a piece of the same color')
            return // Cannot jump over a piece of the same color
          }
          squaresCopy[jumpRow][jumpCol] = ''
        }

        const isMoveForward = !isJumping
          ? activePlayer === 'w'
            ? rowDiff === -1
            : rowDiff === 1
          : false

        if (!isJumpDiagonal && !isMoveForward) {
          return // Simple pieces can only move one square diagonally forward or backward
        }
      }

      squaresCopy[selectedRow][selectedCol] = ''
      squaresCopy[row][col] =
        isKing || inNewKingRow(row, activePlayer)
          ? (piece.toUpperCase() as CheckersPieceType)
          : piece

      setBoard(squaresCopy)
      if (isJumpDiagonal) {
        setIsJumping(true)
        setSelectedPiece([row, col])
      } else {
        console.log('switching players')
        setIsJumping(false)
        setSelectedPiece(null)
        setActivePlayer(activePlayer === 'w' ? 'b' : 'w')
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
