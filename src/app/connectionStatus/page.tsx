'use client'
import React, { useState, useEffect } from 'react'

const Page = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        setIsOnline(navigator.onLine);

        return () => {
            window.addEventListener("online", handleOnline);
            window.addEventListener("offline", handleOffline);
        };
    }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isOnline ? 'bg-green-200' : 'bg-red-200'}`}>
        <div className="text-center">
            <h1 className='text-4xl font-bold mb-4 text-black'>
                {isOnline ? "You are online ✅" : "Your not connected to the Enternet ❌"}
            </h1>
        </div>
    </div>
  )
}

export default Page