"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import background from "../../../public/background.png";

//login function
const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const endpoint =
        "https://elabs-quiz-api.el.r.appspot.com/api/v1/quiz/login";

      const res = await axios.post(endpoint, {
        name: name,
        pwd: password,
      });
      console.log(res.data);

      if (res.status === 200) {
        localStorage.setItem("uid", res.data.uid);
        router.push("/quiz");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Login failed");
    }
  };

  const handleSignUp = async () => {
    try {
      const endpoint =
        "https://elabs-quiz-api.el.r.appspot.com/api/v1/quiz/crtUser";

      const res = await axios.post(endpoint, {
        pwd: password,
        name: name,
      });

      if (res.status === 200) {
        router.push("/login");
        alert("signUp successful, you can log in now");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Sign Up failed");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setName("");
    setPassword("");
  };
  //framer
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div className="bg-white rounded-xl p-10 shadow-lg max-w-xl">
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="flex items-center mb-2">
              <h1 className="text-6xl font-bold text-yellow-500 mr-2 ">
                ELABS
              </h1>
              <h2 className="text-6xl font-semibold text-gray-900">QUIZ</h2>
            </div>
          </div>
          <p className="text-2xl text-gray-900 mb-5 text-center">
            {isSignUp ? "Sign Up" : "Are you ready?"}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="text"
                className="w-full py-2 px-4 rounded-md border focus:outline-none focus:border-yellow-500 text-black"
                placeholder={"Roll No"}
                value={name}
                maxLength={9}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="mb-5">
              <input
                type="password"
                className="w-full py-2 px-4 rounded-md border focus:outline-none focus:border-yellow-500 text-black"
                placeholder="Password"
                value={password}
                maxLength={8}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 rounded-xl py-3 text-center text-white font-bold mb-2"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
            <button
              type="button"
              onClick={toggleSignUp}
              className="w-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-xl py-3 text-center text-gray-800 font-bold"
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
