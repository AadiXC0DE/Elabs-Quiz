"use client";
import React, { useState } from "react";
import background from "../../../public/background.png";
import { motion } from "framer-motion";

const questionForQuiz = [
  {
    question: "Which one is the smallest ocean in the World?",
    options: ["Indian", "Pacific", "Atlantic", "Arctic"],
    correctOption: "Arctic",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctOption: "Mars",
  },
  {
    question: "What is the capital city of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctOption: "Paris",
  },
  {
    question: "Which gas do plants primarily use for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctOption: "Carbon Dioxide",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
    correctOption: "Blue Whale",
  },
  // Add more questions here...
];

const QuizComp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const currentQuestion = questionForQuiz[currentQuestionIndex];

  const optionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
    }

    setSelectedOption("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  //framer
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div initial="initial" animate="animate" variants={pageVariants}>
        <div
          className="max-w-lg mx-auto p-8 rounded-lg shadow-md bg-white"
          style={{ height: "600px", width: "600px" }}
        >
          <div className="text-center pb-6">
            <h1 className="text-2xl md:text-4xl font-semibold text-black">
              Quiz
            </h1>
            <p className="text-lg md:text-xl text-black pt-2">
              Choose the correct option!
            </p>
          </div>
          <div>
            {currentQuestionIndex < questionForQuiz.length ? (
              <div>
                <div className="mb-6 p-4 bg-yellow-300 rounded-lg">
                  <h1 className="text-xl md:text-2xl">
                    {currentQuestion.question}
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className={`block cursor-pointer transition duration-300 ${
                        selectedOption === option
                          ? "bg-yellow-300"
                          : "bg-gray-200"
                      } p-4 rounded-lg`}
                      onClick={() => optionSelection(option)}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        className="mr-2"
                        checked={selectedOption === option}
                        readOnly
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button
                    className={`px-6 py-2 rounded-md ${
                      selectedOption
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-gray-400 cursor-not-allowed"
                    } text-white font-semibold transition duration-300`}
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-2xl text-center">
                Your total score is {score} out of {questionForQuiz.length}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizComp;
