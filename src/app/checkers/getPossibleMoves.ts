export function getPossibleMoves(
  board: CheckersBoardState,
  currentPosition: CheckersPosition,
): CheckersPosition[] {
  const [currentRow, currentCol] = currentPosition
  let pieceType = board[currentRow][currentCol]
  // Check the piece type and set the directions of movement accordingly
  const isKing = pieceType === 'W' || pieceType === 'B'
  const directions = isKing
    ? [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ]
    : pieceType.toLowerCase() === 'w'
    ? [
        [-1, -1],
        [-1, 1],
      ]
    : [
        [1, -1],
        [1, 1],
      ]

  const possibleMoves: CheckersPosition[] = []
  // console.log('directions', directions)
  // console.log('possibleMoves', possibleMoves)

  // Check all possible moves in each direction
  for (const [rowDir, colDir] of directions) {
    const newRow = currentRow + rowDir
    const newCol = currentCol + colDir

    // Check if the new position is within the board boundaries
    if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
      continue
    }

    // Check if the new position is already occupied by another piece
    if (board[newRow][newCol] !== '') {
      continue
    }

    possibleMoves.push([newRow, newCol])

    console.log('possibleMoves', possibleMoves)

    // If the piece is a king, keep checking in the same direction until there is a piece or the board boundary
    if (isKing) {
      let nextRow = newRow + rowDir
      let nextCol = newCol + colDir

      while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
        if (board[nextRow][nextCol] !== '') {
          break
        }

        possibleMoves.push([nextRow, nextCol])

        nextRow += rowDir
        nextCol += colDir
      }
    }
  }

  return possibleMoves
}
