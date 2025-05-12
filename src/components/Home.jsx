"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import StartScreen from "./Start-screen.jsx";
import CategorySelection from "./Category-selection.jsx";
import QuestionScreen from "./Question-screen.jsx";
import ResultsScreen from "./Results-screen.jsx";

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function Home() {
  const [gameState, setGameState] = useState("start"); // start, category, question, results
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const handleStartGame = async (name) => {
    try {
      const url = `${API_URL}/save-user`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      console.log("User saved:", data);
      setUserId(data.user._id);
      setUserName(name);
      setGameState("category");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleSelectCategory = async (category) => {
    setSelectedCategory(category);
    await getNewQuestion(category);
    setGameState("question");
  };

  const getNewQuestion = async (category) => {
    try {
      const url = `${API_URL}/get-question?category=${category}`;
      const response = await fetch(
        url
      );
      const data = await response.json();
      setCurrentQuestion(data);
    } catch (error) {
      console.error("Error fetching questio 2n:", error);
    }
  };

  const handleAnswerQuestion = async (
    questionText,
    selectedAnswer,
    isCorrect
  ) => {
    try {
      // Save question to backend
      const url = `${API_URL}/save-question`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          questionText: questionText.questionText,
          questionIsTrue: isCorrect,
        }),
      });

      // Save question locally
      setAnsweredQuestions([
        ...answeredQuestions,
        {
          question: questionText,
          selectedAnswer,
          isCorrect,
        },
      ]);

      if (questionNumber < 5) {
        setQuestionNumber(questionNumber + 1);
        await getNewQuestion(selectedCategory);
      } else {
        setGameState("results");
      }
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const resetGame = () => {
    setGameState("start");
    setUserId("");
    setUserName("");
    setSelectedCategory("");
    setCurrentQuestion(null);
    setQuestionNumber(1);
    setAnsweredQuestions([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="bg-pink-700 text-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-center gap-2">
            <Brain className="h-8 w-8" />
            <h1 className="text-3xl font-bold text-center">¡Valen's Trivia!</h1>
          </div>
          <p className="text-center text-pink-200 mt-1">
            ¿Listos para jugar? ¡vamos!
          </p>
        </header>

        {gameState === "start" && <StartScreen onStartGame={handleStartGame} />}

        {gameState === "category" && (
          <CategorySelection onSelectCategory={handleSelectCategory} />
        )}

        {gameState === "question" && currentQuestion && (
          <QuestionScreen
            question={currentQuestion}
            questionNumber={questionNumber}
            onAnswerSelected={handleAnswerQuestion}
          />
        )}

        {gameState === "results" && (
          <ResultsScreen
            answeredQuestions={answeredQuestions}
            userName={userName}
            onPlayAgain={resetGame}
          />
        )}
      </div>
    </main>
  );
}
