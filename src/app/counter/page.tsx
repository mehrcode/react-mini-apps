'use client'
import { useState } from 'react';

export default function Home() {
    const [count, setCount] = useState(0);

    const increase = () => setCount(count + 1);
    const decrease = () => {
        if (count > 0) setCount(count - 1);
    };

    const reset = () => setCount(0);

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold mb-4'>شمارنده هوشمنده</h1>
            <p className='text-xl mb-4'>عدد فعلی : {count} </p>
            <div className='flex gap-4'>
                <button onClick={increase}
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                    افزایش
                </button>
                <button
                    onClick={decrease}
                    disabled={count === 0}
                    className={`${count === 0 ?
                        "bg-gray-400 cursor-not-allowed" :
                        "bg-yellow-500 hover:bg-yellow-600"
                        } text-white px-4 py-2 rounded`}
                >
                    کاهش
                </button>
                <button onClick={reset}
                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                    ریست
                </button>
            </div>
        </div>
    );
}
