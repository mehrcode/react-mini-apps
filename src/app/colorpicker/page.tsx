'use client'
import React, { useState } from 'react'

export default function ColorPicker() {
    const [color, setColor] = useState("#3498db");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="w-80 h-80 flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md max-w-xs mx-auto mt-10">
            <h2 className="text-l text-black text-center font-bold mb-4">🎨 Color Picker</h2>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className='w-24 h-24 border-none rounded-2xl cursor-pointer'
            />

            <div className="mt-4 flex items-center gap-2 text-black">
                <span className="text-lg font-mono">{color.toUpperCase()}</span>
                <button onClick={handleCopy}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-blue-600 transition">
                    {copied ? "copied!" : "copy"}
                </button>
            </div>

            <div style={{backgroundColor: color}} 
            className="mt-4 w-full h-10 rounded shadow-inner">
            </div>
        </div>
    );
};