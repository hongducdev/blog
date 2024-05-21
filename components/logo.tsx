import { Newspaper } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/">
      <div className='flex items-center space-x-3'>
        <Newspaper className='w-6 h-6' />
        <span className="text-xl font-semibold">
          hongducdev. <span className="text-green-500">blog</span>
        </span>
      </div>
    </Link>
  )
}

export default Logo