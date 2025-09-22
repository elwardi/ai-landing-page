"use client";
import { JSX, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FaceSkinAIPage(): JSX.Element {
  // ⏳ Chrono (5 min = 300 sec)
  const TOTAL_TIME = 300;
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const [expired, setExpired] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convertir secondes → mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // 🔄 Quotes rotation
  const quotes: string[] = [
    "Reveal the true age of your skin with AI.",
    "Your face tells a story – let AI decode it.",
    "Smart analysis for flawless beauty results.",
    "Know your skin, know your future.",
    "The AI that sees what mirrors can't.",
  ];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(quoteTimer);
  }, [quotes.length]);

  // Progress %
  const progress = (timeLeft / TOTAL_TIME) * 100;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/skin-face.jpg')" }}
    >
      {/* Overlay sombre + dégradé futuriste */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-pink-900/70 to-purple-900/70" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[90%] max-w-3xl bg-pink-900/30 backdrop-blur-lg rounded-2xl shadow-2xl p-10 text-center border border-pink-400/40"
      >
        <h1 className="text-5xl font-extrabold mb-6 text-pink-400">
          ✨ AI Face & Skin Analyzer
        </h1>

        {/* 🔄 Quotes dynamiques */}
        <p className="italic text-xl text-pink-200 mb-6 animate-fade">
          "{quotes[currentQuoteIndex]}"
        </p>

        <p className="mb-8 text-lg text-gray-200">
          Scan your face with AI to reveal your skin health and discover your
          real beauty age 💖
        </p>

        {/* Mockup agrandi */}
        <div className="flex justify-center">
          <img
            src="/skin-app.jpg"
            alt="AI Skin Analyzer App Preview"
            className="w-[300px] h-auto rounded-xl mb-8 shadow-lg"
          />
        </div>

        {/* Chrono + Progress Bar */}
        {!expired ? (
          <div className="mb-8">
            <motion.div
              className={`text-4xl font-extrabold ${
                timeLeft < 30 ? "text-red-500" : "text-pink-300"
              }`}
              animate={
                timeLeft < 30
                  ? { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {timeLeft <= 10
                ? `⚠️ Hurry! Only ${seconds}s left!`
                : `⏳ Offer ends in ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </motion.div>

            {/* Barre de progression */}
            <div className="w-full bg-gray-700 h-3 rounded-full mt-4">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                initial={{ width: "100%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 1 }}
              />
            </div>
          </div>
        ) : (
          <div className="text-3xl font-bold text-red-400 mb-8 animate-bounce">
            ❌ Offer Expired – Try Again Soon!
          </div>
        )}

        {/* CTA */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            type="button"
            className="w-full text-xl py-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold shadow-lg transform hover:scale-105 transition"
          >
            📲 Start Free AI Skin Scan
          </button>
        </a>

        <p className="mt-6 text-sm text-gray-300">Works on iOS & Android 📱</p>

        {/* Signature */}
        <p className="mt-8 text-xs text-gray-400 italic">
          Designed for beauty & health by{" "}
          <span className="font-semibold text-pink-300">Youssef Elwardi</span>
        </p>
      </motion.div>
    </div>
  );
}
