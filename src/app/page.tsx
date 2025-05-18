import React from 'react'
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Link from 'next/link';


export default function Home() {
  const apps = [
    { name: "🧠 Pomodoro Timer", path: "/pomodoroTimer" },
    { name: "🐢 Progress Tracker", path: "/turtleProgress" },
    { name: "🐢 Guess Game", path: "/magicGuessGame" },
    { name: "📝 ToDo App", path: "/todo" },
    { name: "📅 Appointment", path: "/appointment" },
    { name: "⏰ Digital Clock", path: "/digitalClock" },
    { name: "🐣 Egg Timer", path: "/eggTimer" },
    { name: "⏱️ Cornometr", path: "/cornometr" },
    { name: "🎨 Color Picker", path: "/colorpicker" },
    { name: "📶 Connection Status", path: "/connectionStatus" },
  ]
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#fef8e0] p-6">
      <TypingAnimation className="text-2xl md:text-4xl font-bold mb-8 text-[#4b2e83] drop-shadow">🎮 React Mini Apps</TypingAnimation>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {apps.map((app, index) => (
          <li key={index}>
            <Link
              href={app.path}
              className="block bg-[#fdd835] hover:bg-[#fbc02d] text-black font-semibold py-4 px-2 rounded-xl text-center border-4 border-dashed border-[#4b2e83] shadow-lg transition-all duration-300"
            >
              {app.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

