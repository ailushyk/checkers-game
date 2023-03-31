'use client'
import React, { useState } from 'react'
function CheckersGame({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState(/*initial game state*/)

  function handlePieceClick(/*piece clicked*/) {
    // update game state
  }

  function handleSquareClick(/*square clicked*/) {
    // update game state
  }

  return <div>{children}</div>
}

export default CheckersGame
