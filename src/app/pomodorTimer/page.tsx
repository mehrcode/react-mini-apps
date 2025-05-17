'use client';
import React, { useState, useEffect, useRef } from 'react'

const PomodorTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); //25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // conver seconds into minutes
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // timer control
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // clear 
        useEffect(() => {
            if (timeLeft === 0 && isRunning) {
                alert("⏰ تایمر تموم شد! وقت استراحته.");
                setIsRunning(false);
            }
        }, [timeLeft, isRunning]);

    })

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">پومودورو تایمر 🕒</h1>
            <div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>
            <div className="flex gap-4">
                <button
                    onClick={() => setIsRunning((prev) => !prev)}
                    className="px-6 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition">
                    {isRunning ? "⏸ توقف" : "▶️ شروع"}
                </button>
                <button
                    onClick={() => {
                        setIsRunning(false);
                        setTimeLeft(25 * 60);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded-xl shadow hover:bg-gray-400 transition">
                    🔄 ریست
                </button>
            </div>
        </div>
    );
};

export default PomodorTimer