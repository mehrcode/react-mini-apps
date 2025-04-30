'use client'
import React, { useState } from 'react'

const page = () => {
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");
    const [error, setError] = useState("");

    const maxNameLength = 20;

    const capitalizeName = (name: string) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim() === "") {
            setError("لطفا یک نام وارد کن")
            setGreeting("");
            return;
        }

        if (name.length > maxNameLength) {
            setError(`نام باید کمتر از ${maxNameLength} کاراکتر باشد.`);
            setGreeting("");
            return;
        }

        const finalName = capitalizeName(name);
        setGreeting(`سلام ${finalName}! خوش اومدی 🌟`);
        setError("");
        setName("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);

        if (newName.length > maxNameLength) {
            setError(`نام باید کمتر از ${maxNameLength} کاراکتر باشد.`);
        } else {
            setError("");
        }
    };

    const progressPercentage = Math.min((name.length / maxNameLength) * 100, 100);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">فرم خوش آمد گویی</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                <input
                    type="text"
                    value={name}
                    placeholder='اسم خودتو وارد کن...'
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-400 rounded px-4 py-2"
                />

                <div className="w-full bg-gray-300 rounded h-2 overflow-hidden">
                    <div className='bg-green-500 h-full'
                        style={{ width: `${progressPercentage}%` }}>

                    </div>
                </div>

                <button type='submit'
                    disabled={name.trim() === "" || name.length > maxNameLength}
                    className={`px-4 py-2 rounded text-white ${name.trim() === "" || name.length > maxNameLength ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}>
                    ارسال
                </button>
            </form>
            {error && (
                <p className="mt-4 text-red-600 font-semibold">{error}</p>
            )}

            {greeting && (
                <p className="mt-6 text-xl text-green-700">{greeting}</p>
            )}
        </div>
    )
}

export default page