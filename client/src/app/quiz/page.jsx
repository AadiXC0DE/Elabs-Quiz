"use client";
import React, { useState, useEffect } from "react";
import background from "../../../public/background.png";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const QuizComp = () => {
  const [questionData, setQuestionData] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [code, setCode] = useState("");
  const [qid, setQid] = useState("");
  const [answer, setAnswer] = useState(""); // Store the user's selected answer
  const [score, setScore] = useState({});

  useEffect(() => {
    fetchQuestionData();
  }, []);

  const fetchQuestionData = async () => {
    try {
      const selct = localStorage.getItem("selectedValue");
      const endpoint = `https://elabs-quiz-api.el.r.appspot.com/api/v1/quiz/getQna/${selct}`;
      const uid = localStorage.getItem("uid");

      const res = await axios.post(endpoint, {
        uid: uid,
      });

      if (res.data.code === "complete") {
        setCode(res.data.code);
        console.log(res.data);
        console.log(res.data.final);
        setScore(res.data.final);
      }

      setQuestionData(res.data.question);
      setSelectedOption(res.data.options);
      setCorrectOption(res.data.correctOption);
      setQid(res.data.qid);
      console.log(qid);
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
      console.log(answer);

      const res = await axios.post(endpoint, {
        uid: uid,
        qid: qid,
        ans: answer,
      });
      console.log(res.data);
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
                  onChange={(event) => setAnswer(event.target.value)}
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
