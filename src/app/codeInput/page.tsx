'use client'
import React, { useRef } from 'react';

//این فانکشن برای یادگیری هوک یوزرف هست و توی این فانکشن 4 تا اینپئت داریم که با وارد کردن عدد خودش فوکوس رو میبره روی اینپوت بعدی

export default function CodeInput() {
    const inputsRef = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value.length === 4 && index < inputsRef.length - 1) {
            inputsRef[index + 1].current?.focus(); //focus on next input
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-retro-bgDay text-retro-textDay gap-4'>
            {inputsRef.map((ref, index) => (
                <input
                    key={index}
                    ref={ref}
                    maxLength={4}
                    onChange={(e) => handleChange(e, index)}
                    className='w-32 h-12 text-center text-2xl border-2 border-retro-textDay rounded-md'
                />
            ))}
        </div>
    );
}