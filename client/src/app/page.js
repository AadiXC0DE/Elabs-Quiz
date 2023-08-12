"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { motion } from "framer-motion";
import background from "../../public/background.png";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bg-white rounded-2xl p-10 shadow-lg max-w-xl px-48"
      >
        <div className="flex flex-col items-center justify-center mb-5">
          <Image src={logo} width={156} height={156} className="mb-2"></Image>
          <div className="flex items-center">
            <h1 className="text-6xl font-bold mr-2 text-yellow-500">ELABS</h1>
            <h2 className="text-6xl font-semibold text-gray-900">QUIZ</h2>
          </div>
        </div>
        <p className="text-2xl text-gray-900 mb-5 text-center">
          Are you ready?
        </p>
        <Link legacyBehavior href="/login">
          <a className="block w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 rounded-xl py-3 text-center text-white font-bold">
            Start Quiz
          </a>
        </Link>
      </motion.div>
    </div>
  );
}
