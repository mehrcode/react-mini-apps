'use client'
import React, { useEffect, useRef } from 'react'

export default function AutoFocusInput() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-retro-bgDay text-retro-textDay">
            <input
                ref={inputRef}
                type="text"
                placeholder='Say something...'
                className='border-2 border-retro-textDay p-2 text-lg rounded-md'
            />
        </div>
    );
}