import { CheckersBoard } from '@/app/checkers/CheckersBoard'

export default function CheckersPage(params: { params: {} }) {
  return (
    <div>
      <h1>Checkers Game</h1>
      <div>
        <h2>Checkers Board</h2>
        <CheckersBoard />
      </div>
    </div>
  )
}
