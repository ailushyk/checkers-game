import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl">Checkers</h1>
      <Link href={'/checkers'}>checkers</Link>
    </main>
  )
}
