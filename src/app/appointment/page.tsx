'use client'
import React, { useState } from 'react'

export default function Appointment() {
    const [turn, setTurn] = useState(1);

    const formatTurn = (number: number) => {
        return String(number).padStart(3, "0");
    };

    const nextTurn = () => {
        setTurn(prev => prev + 1);
    };


    return (
        <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'monospace' }}>
            <h1>شماره نوبت شما: </h1>
            <div style={{ fontSize: '72px', color: 'tomato' }}>
                {formatTurn(turn)}
            </div>
            <button onClick={nextTurn} style={{
                marginTop: '30px',
                padding: '10px 30px',
                fontSize: '18px',
                cursor: 'pointer'
            }}>
                نوبت دهی
            </button>
        </div>
    );
};
