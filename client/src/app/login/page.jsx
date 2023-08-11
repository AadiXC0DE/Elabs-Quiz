"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let endpoint = isSignUp ? "/api/v1/quiz/signup" : "/api/v1/quiz/login";

      const res = await axios.post(endpoint, {
        uid: id,
        pwd: password,
        name: name,
      });

      if (res.status === 200) {
        router.push("/admin/addQuestion");
        alert("Authentication successful, redirecting...");
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setId("");
    setName("");
    setPassword("");
  };
  //framer
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div className="bg-white rounded-lg p-10 shadow-lg max-w-xl">
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="flex items-center mb-2">
              <h1 className="text-6xl font-bold text-gray-900 mr-2">
                <span className="text-yellow-500">E</span>labs
              </h1>
              <h2 className="text-6xl font-semibold text-gray-900">Quiz</h2>
            </div>
          </div>
          <p className="text-2xl text-gray-900 mb-5 text-center">
            {isSignUp ? "Sign Up" : "Are you ready?"}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="number"
                className="w-full py-2 px-4 rounded-md border focus:outline-none focus:border-yellow-500"
                placeholder={isSignUp ? "ID" : "ID or Name"}
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </div>
            {isSignUp && (
              <div className="mb-5">
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded-md border focus:outline-none focus:border-yellow-500"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            )}
            <div className="mb-5">
              <input
                type="password"
                className="w-full py-2 px-4 rounded-md border focus:outline-none focus:border-yellow-500"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 rounded-md py-3 text-center text-white font-bold mb-2"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
            <button
              type="button"
              onClick={toggleSignUp}
              className="w-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-md py-3 text-center text-gray-800 font-bold"
            >
              {isSignUp ? "Login Instead" : "Sign Up Instead"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
