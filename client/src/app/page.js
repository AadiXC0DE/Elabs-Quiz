import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white rounded-lg p-10 shadow-lg max-w-xl px-48">
        <div className="flex flex-col items-center justify-center mb-5">
          <Image src={logo} width={196} height={196} className="mb-2"></Image>
          <div className="flex items-center">
            <h1 className="text-6xl font-bold text-gray-900 mr-2">
              <span className="text-yellow-500">E</span>labs
            </h1>
            <h2 className="text-6xl font-semibold text-gray-900">Quiz</h2>
          </div>
        </div>
        <p className="text-2xl text-gray-900 mb-5 text-center">
          Are you ready?
        </p>
        <Link legacyBehavior href="/quiz">
          <a className="block w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 rounded-md py-3 text-center text-white font-bold transform hover:scale-105">
            Start Quiz
          </a>
        </Link>
      </div>
    </div>
  );
}
