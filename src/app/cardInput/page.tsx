'use client'
import React, { useRef } from 'react';

export default function CardInput() {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const NUM_FIELDS = 4;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        const sanitized = value.replace(/\D/g, '');

        if (sanitized.length === 4 && index < NUM_FIELDS - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('Text').replace(/\D/g, '');

        if (pasted.length === 16) {
            for (let i = 0; i < NUM_FIELDS; i++) {
                const chunk = pasted.slice(i * 4, (i + 1) * 4);
                if (inputsRef.current[i]) {
                    inputsRef.current[i]!.value = chunk;
                }
            }
            //focus on last input
            inputsRef.current[NUM_FIELDS - 1]?.focus();
        }
    };

    return (
        <div className="flex gap-2 items-center justify-center mt-10">
            {[...Array(NUM_FIELDS)].map((_, index) => (
                <input
                    type="text"
                    key={index}
                    maxLength={4}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={handlePaste}
                    className='w-32 p-2 border text-center'
                    ref={(el) =>{
                        inputsRef.current[index] = el;
                    }}
                />
            ))}
        </div>
    ) 
    
}
