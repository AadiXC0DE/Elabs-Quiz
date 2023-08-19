"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Selection = () => {
  const [selectedValue, setSelectedValue] = useState("ml1"); // Default selected value
  const [options, setOptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Replace 'your-api-endpoint' with your actual API endpoint
    axios
      .get("https://elabs-quiz-api.el.r.appspot.com/api/v1/quiz/getTopics")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

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
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
