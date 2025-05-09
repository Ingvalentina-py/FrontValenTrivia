"use client"

import { Award, CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function ResultsScreen({ answeredQuestions, userName, onPlayAgain }) {
  const correctAnswers = answeredQuestions.filter((q) => q.isCorrect).length
  const score = (correctAnswers / answeredQuestions.length) * 100

  let message = ""
  if (score === 100) {
    message = "¡Perfecto! Eres un genio."
  } else if (score >= 80) {
    message = "¡Excelente! Casi perfecto."
  } else if (score >= 60) {
    message = "¡Muy bien! Tienes buenos conocimientos."
  } else if (score >= 40) {
    message = "No está mal, pero puedes mejorar."
  } else {
    message = "Sigue intentando, ¡la práctica hace al maestro!"
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-pink-100 p-4 rounded-full mb-4">
            <Award className="h-10 w-10 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">¡Resultados de {userName}!</h2>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          <div className="bg-pink-100 px-4 py-2 rounded-full">
            <span className="text-pink-800 font-bold">
              {correctAnswers} de {answeredQuestions.length} correctas ({score}%)
            </span>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-pink-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pregunta</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tu respuesta</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {answeredQuestions.map((q, index) => (
                <tr key={index} className={q.isCorrect ? "bg-green-50" : "bg-red-50"}>
                  <td className="py-3 px-4 text-sm text-gray-800">{q.question}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{q.selectedAnswer}</td>
                  <td className="py-3 px-4 text-center">
                    {q.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-5 w-5" />
          Jugar de nuevo
        </button>
      </div>
    </div>
  )
}
