"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function ProgressApp() {
    const [progresses, setProgresses] = useState([0, 0, 0, 0]);
    const [inputs, setInputs] = useState(["", "", "", ""]);

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleSubmit = (index, e) => {
        e.preventDefault(); // Corrected missing parentheses
        console.log("Submitted progress update");

        const step = parseInt(inputs[index]) || 0;
        
        setProgresses((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[index] = Math.min(newProgress[index] + step, 100);
            return newProgress;
        });

        setInputs((prevInputs) => {
            const clearedInputs = [...prevInputs];
            clearedInputs[index] = "";
            return clearedInputs;
        });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {progresses.map((progress, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                    <input
                        type="number"
                        value={inputs[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder="Enter steps"
                        style={{ marginRight: "10px", padding: "5px" }}
                    />
                    <button 
                        onClick={(e) => handleSubmit(index, e)} 
                        style={{ padding: "5px 10px", cursor: "pointer" }}
                    >
                        Submit
                    </button>
                    <div
                        style={{
                            height: "20px",
                            width: "100%",
                            backgroundColor: "#eee",
                            marginTop: "10px",
                            overflow: "hidden",
                            borderRadius: "5px"
                        }}
                    >
                        <motion.div
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                            style={{
                                height: "100%",
                                backgroundColor: "green",
                            }}
                        />
                    </div>
                    <p>{progress}%</p>
                </div>
            ))}
        </div>
    );
}
