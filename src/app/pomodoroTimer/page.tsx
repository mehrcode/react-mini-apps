// app/pomodoro/page.tsx (یا هر مسیری که پروژه‌ت توشه)
"use client";

import React, { useState, useEffect, useRef } from "react";

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 دقیقه
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [isWorkTime, setIsWorkTime] = useState(true); //true = work / false = rest
    const [pomodoroCount, setPomodoroCount] = useState(0);

    // تبدیل ثانیه به دقیقه:ثانیه
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // کنترل تایمر
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    setTimeLeft((prev) => Math.max(prev - 1, 0)); // Avoid negative values
                }, 1000);
            }
        } else {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            intervalRef.current = null;
        }

        return () => {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            intervalRef.current = null;
        };
    }, [isRunning, timeLeft]);

    // beep sound
    const playBeep = () => {
        const audio = new Audio("/beep.mp3");
        audio.play();
    };

    // اگه تموم شد
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        if (timeLeft === 0) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            playBeep();

            if (isWorkTime) {
                setPomodoroCount((prev) => prev + 1);         // یک پومودورو تموم شد
                setTimeLeft(5 * 60);                          // استراحت ۵ دقیقه‌ای
            } else {
                setTimeLeft(25 * 60);                         // فاز بعدی: کار
            }

            setIsWorkTime((prev) => !prev);                 // سوییچ بین کار/استراحت
        }

        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, [isRunning, timeLeft]);



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">🕒 پومودورو تایمر</h1>
            <div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>
            <div className="flex gap-4">
                <button
                    onClick={() => setIsRunning((prev) => !prev)}
                    className="px-6 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
                >
                    {isRunning ? "⏸ توقف" : "▶️ شروع"}
                </button>
                <button
                    onClick={() => {
                        setIsRunning(false);
                        setTimeLeft(25 * 60);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded-xl shadow hover:bg-gray-400 transition"
                >
                    🔄 ریست
                </button>
            </div>
            <div className="flex gap-4 mt-6">
                <h2>{isWorkTime ? "🧠 تایم تمرکز" : "☕ تایم استراحت"}</h2>
                <h2>پومودوروهای امروز: {pomodoroCount}</h2>
            </div>
        </div>
    );
};

export default PomodoroTimer;
