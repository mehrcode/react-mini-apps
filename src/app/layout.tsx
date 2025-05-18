import './globals.css'
import React from 'react'
import Link from 'next/link'


export const metadata = {
  title: 'React Mini Apps',
  description: 'A collection of small React apps to practice hooks and concepts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fef8e0] text-black font-sans">
        <header className="w-full p-4 bg-[#4b2e83] text-white shadow-md flex flex-row gap-x-6 justify-between">
          <Link href="/" className="text-lg font-bold hover:underline">Home</Link>
          <span className="text-sm opacity-80">Made With 💜 by MehrCode</span>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
