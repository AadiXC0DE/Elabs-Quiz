"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const QuizComp = () => {
  const [questionData, setQuestionData] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [code, setCode] = useState("");
  const [qid, setQid] = useState("");
  const [answer, setAnswer] = useState(""); // Store the user's selected answer
  const [score, setScore] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Initialize as false

  useEffect(() => {
    fetchQuestionData();
  }, []);

  const fetchQuestionData = async () => {
    try {
      const selct = localStorage.getItem("selectedValue");
      const endpoint = `https://elabs-quiz-api.el.r.appspot.com/api/v1/quiz/getQna/${selct}`;
      const uid = localStorage.getItem("uid");

      setIsButtonDisabled(false); // Enable the button when a new question is fetched

      const res = await axios.post(endpoint, {
        uid: uid,
      });

      if (res.data.code === "complete") {
        setCode(res.data.code);
        setScore(res.data.final);
      }

      setQuestionData(res.data.question);
      setSelectedOption(res.data.options);
      setCorrectOption(res.data.correctOption);
      setQid(res.data.qid);
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to get questions");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const selct = localStorage.getItem("selectedValue");
      const endpoint = `https://elabs-quiz-api.el.r.appspot.com/api/v1/quiz/eval/${selct}`;
      const uid = localStorage.getItem("uid");

      setIsButtonDisabled(true); // Disable the button after submission

      const res = await axios.post(endpoint, {
        uid: uid,
        qid: qid,
        ans: answer,
      });

      fetchQuestionData();
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  //framer
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleOptionChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={qid} // Ensure a unique key for each question
          initial="hidden"
          animate="visible"
          variants={variants}
          className="max-w-3xl max-h-2xl h-full w-full p-6 rounded-lg shadow-lg bg-white "
          exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
        >
          {code !== "complete" && (
            <motion.p
              className="text-2xl text-gray-800 mb-4"
              variants={variants}
            >
              Q.{questionData}
            </motion.p>
          )}
          {selectedOption &&
            selectedOption.map((option, index) => (
              <motion.label
                key={index}
                className="block mb-2"
                variants={variants}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  onChange={handleOptionChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-gray-700">{option}</span>
              </motion.label>
            ))}
          {code !== "complete" && (
            <motion.button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              variants={variants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            >
              Submit
            </motion.button>
          )}
          {code === "complete" && (
            <motion.div
              className="text-center flex flex-col items-center justify-center"
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              <motion.p className="text-green-500 font-bold text-3xl mt-2">
                Quiz Completed
              </motion.p>
              <motion.p className="text-black text-xl mt-2">
                Your Final Score is{" "}
                <span className="font-bold text-green-600 px-1">
                  {score.crct}/{score.ttl}
                </span>
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizComp;
