"use client";
import React, { useState, useEffect, useRef } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const playBeep = () => {
    const audio = new Audio("/beep.mp3");
    audio.play();
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (!isRunning || timeLeft === 0) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    }

    if (timeLeft === 0 && isRunning) {
      playBeep();

      if (isWorkTime) {
        setPomodoroCount((prev) => prev + 1);
        setTimeLeft(5 * 60); // استراحت
      } else {
        setTimeLeft(25 * 60); // کار
      }

      setIsWorkTime((prev) => !prev);
    }

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    };
  }, [isRunning, timeLeft, isWorkTime]);

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
            setIsWorkTime(true);
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
