"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Selection = () => {
  const [selectedValue, setSelectedValue] = useState("xyz"); // Default selected value
  const router = useRouter();

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedValue", selectedValue);
    router.push("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl p-10 shadow-lg max-w-xl px-20 py-12">
        <div className="flex flex-col items-center justify-center mb-5">
          <div className="flex items-center mb-2">
            <h1 className="text-6xl font-bold text-yellow-500 mr-2">Select</h1>
            <h2 className="text-6xl font-semibold text-gray-900">Quiz</h2>
          </div>
        </div>
        <div className="mb-5">
          <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="w-full py-2 px-4 rounded-md border focus:outline-none focus:border-yellow-500 text-black"
          >
            <option value="ml1">ml1</option>
            <option value="ui1">ui1</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 rounded-xl py-3 text-center text-white font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Selection;
