'use client'
import React, { useState, useEffect, useRef } from 'react';

export default function EggTimer() {
    const [minutes, setMinutes] = useState(5);
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const timeRef = useRef<NodeJS.Timeout | null>(null);
    const [isNight, setIsNight] = useState(false);

    const initialTime = minutes * 60;
    //Progress Bar
    const percentage = (initialTime - timeLeft) / initialTime * 100;


    //count down
    useEffect(() => {
        setTimeLeft(minutes * 60);
    }, [minutes]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timeRef.current = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            new Audio("/chicken.mp3").play(); 
        }

        return () => clearTimeout(timeRef.current!);
    }, [isRunning, timeLeft]);

    // convert seconds to minutes
    const formatTime = (time: number) => {
        const min = String(Math.floor(time / 60)).padStart(2, "0");
        const sec = String(time % 60).padStart(2, "0");
        return `${min}:${sec}`;
    };


    return (
        <main className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500
            ${isNight ? 'bg-black text-green-300' : 'bg-white text-black text-retro-textDay'}`}>

            <h1 className="text-2xl font-pixel mb-8">🐔 Retro Egg Timer</h1>

            <div className="text-4xl font-pixel tracking-widest mb-4">
                {formatTime(timeLeft)}
            </div>

            <div className="w-64 h-4 bg-gray-300 rounded mb-6 overflow-hidden">
                <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => setIsRunning((prev) => !prev)}
                    className="px-4 py-2 font-pixel border border-black bg-white text-black hover:bg-gray-100"
                >
                    {isRunning ? "Pause" : "Start"}
                </button>

                <button
                    onClick={() => {
                        setTimeLeft(minutes * 60)
                        setIsRunning(false)
                    }}
                    className="px-4 py-2 font-pixel border border-black bg-white text-black hover:bg-gray-100"
                >
                    Reset
                </button>

                <button
                    onClick={() => setIsNight(!isNight)}
                    className="px-4 py-2 font-pixel border border-black text-black bg-white hover:bg-gray-100"
                >
                    {isNight ? "☀ Day" : "🌙 Night"}
                </button>
            </div>

            <div className="mt-4">
                <label className="font-pixel text-sm">Set Minutes: </label>
                <input
                    type="number"
                    value={minutes}
                    onChange={(e) => {
                        const val = parseInt(e.target.value)
                        setMinutes(val)
                        setTimeLeft(val * 60)
                    }}
                    className="w-16 text-center font-pixel border ml-2 p-1"
                />
            </div>
        </main>
    );
};