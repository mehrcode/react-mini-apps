'use client'
import React, { useState, useEffect, useRef } from 'react';

export default function EggTimer() {
    const [inputMinutes, setInputMinutes] = useState(5); //default value
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const beepRef = useRef<HTMLAudioElement | null>(null);
    const [isOkay, setIsOkay] = useState(false);

    //useEffect for timer
    useEffect(() => {
        if (isActive && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        }

        if (time === 0 && isActive) {
            beepRef.current?.play();
            setIsActive(false);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, time]);

    const handleStart = () => {
        setTime(inputMinutes * 60);
        setIsActive(true);
    };

    const handlePause = () => setIsActive(false);

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-yellow-100 text-gray-900 font-mono'>
            <h1>
                🍳 Egg Timer
            </h1>

            <input
                type="number"
                min="1"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(Number(e.target.value))}
                className='mb-4 p-2 border-gray-300 rounded text-lg w-24 text-center'
                disabled={isActive}
            />

            <div className="text-6xl my-4">
                {formatTime(time)}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleStart}
                    className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded'>
                    Start
                </button>
                <button
                    onClick={handlePause}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded">
                    Pause
                </button>
                <button
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded">
                    Reset
                </button>
            </div>

            {/* ending beep */}
            <audio 
            ref={beepRef}
            src="https://sedatoseda.com/wp-content/uploads/alarm-3.mp3"
            preload='auto'
            />
        </div>
    );



}