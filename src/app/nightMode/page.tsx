'use client'
import { useState } from 'react';

export default function NightMode() {
    const [isNight, setIsNight] = useState(false);

    return (
        <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${isNight ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <button onClick={() => setIsNight(!isNight)} className='border p-4 rounded'>
                {isNight ? 'Day Mode ☀️' : 'Night Mode 🌙'}
            </button>
        </div>
    )
}