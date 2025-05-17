'use client'
import React, { useState, useEffect } from 'react'

const Page = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const handleStart = () => setIsActive(true);
    const handleStop = () => setIsActive(false);
    const handleReset = () => {
        setSeconds(0);
        setIsActive(false);
        playBeep();
    };

    const playBeep = () => {
        const audio = new Audio("/beep.mp3");
        audio.play();
    };

    // progress circle
    const maxSeconds = 60;
    const progress = (seconds % maxSeconds) / maxSeconds;
    const circumference = 2 * Math.PI * 45;


    return (
        <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${isActive ? 'bg-green-800' : 'bg-red-800'}`}>
            <div className="relative w-32 h-32 mb-8">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        fill="transparent"
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45"
                        stroke="#34d399"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - progress)}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl font-bold animate-pulse">{seconds}</h1>
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={handleStart} className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl">شروع</button>
                <button onClick={handleStop} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl">توقف</button>
                <button onClick={handleReset} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">ریست</button>
            </div>
        </div>
    )
}

export default Page