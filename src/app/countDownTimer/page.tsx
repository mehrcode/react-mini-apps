'use client'
import React, { useState, useEffect, useRef } from 'react'

const page = () => {
    const initialTime = 5 * 60;
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        // Cleanup function 
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive]);

    const handleStart = () => {
        if (time > 0) setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(initialTime);
    };

    // format time mm:ss
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };


    return (
        <div className='flex flex-col items-center justify-center h-screen bg-black text-lime-300 font-mono text-5xl'>
            <h1 className='mb-10'>Countdown Timer</h1>
            <div className='text-7xl mb-6'>
                {formatTime(time)}
            </div>
            <div className="flex gap-4">
                <button
                    onClick={handleStart}
                    className='px-4 py-2 bg-lime-600 hover:bg-lime-500 rounded'>
                    Start
                </button>
                <button
                    onClick={handlePause}
                    className='px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded'>
                    Pause
                </button>
                <button
                    onClick={handleReset}
                    className='px-4 py-2 bg-red-600 hover:bg-red-500 rounded'>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default page