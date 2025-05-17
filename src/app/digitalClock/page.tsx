'use client'
import React, { useState, useEffect } from 'react'

export default function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "*");
        const minutes = String(date.getMinutes()).padStart(2, "*");
        const seconds = String(date.getSeconds()).padStart(2, "*");
        return `${hours}: ${minutes}: ${seconds}`;
    };
    
    
    return (
        <div className='min-h-screen bg-black text-green-400 flex items-center justify-center font-mono text-6xl tracking-widest'>
        {formatTime(time)}
    </div>
  )
}

