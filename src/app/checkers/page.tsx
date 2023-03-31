import CheckersGame from '@/app/checkers/CheckersGame'
import Board from '@/app/checkers/Board'

export default function CheckersPage(params: { params: {} }) {
  return (
    <div>
      <h1>Checkers Game</h1>
      <CheckersGame>
        <div>
          <h2>Checkers Board</h2>
          <Board></Board>
        </div>
      </CheckersGame>
    </div>
  )
}
