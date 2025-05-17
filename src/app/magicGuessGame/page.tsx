'use client'
import { useState, useRef, useEffect } from 'react';


export default function MagicGuessGame() {
    const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleGuess = () => {
        const num = parseInt(guess);
        if (isNaN(num)) {
            setMessage('لطفا یه عدد وارد کن');
            return;
        }

        setAttempts((prev) => prev + 1);

        if (num === targetNumber) {
            setMessage('🎉 درست حدس زدی!');
            setGameOver(true);
        } else if (num < targetNumber) {
            setMessage('🔼 عدد بزرگ‌تره');
        } else {
            setMessage('🔽 عدد کوچکتره');
        }

        setGuess('');
    };

    const handleRestart = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setMessage('');
        setAttempts(0);
        setGameOver(false);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [message, gameOver]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-900">
            <h1 className="text-2xl font-bold mb-4">
                🎯 حدس عدد جادویی
            </h1>
            <input
                type="number"
                ref={inputRef}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                disabled={gameOver}
                className='border px-2 py-1 rounded mb-2'
            />
            <button
                onClick={handleGuess}
                disabled={gameOver}
                className='bg-blue-500 text-white px-4 py-1 mb-2'
            >
                حدس بزن
            </button>
            <p className='mb-2'>{message}</p>
            <p>تعداد تلاش ها :{attempts}</p>
            {gameOver && (
                <button
                    onClick={handleRestart} className='mt-4 bg-green-500 text-white px-4 py-1 rounded'>
                    بازی مجدد
                </button>
            )}
        </div>
    )


}