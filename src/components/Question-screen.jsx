"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle } from "lucide-react"

export default function QuestionScreen({ question, questionNumber, onAnswerSelected }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  
  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null)
    setIsAnswered(false)
    setTimeLeft(30)
  }, [question])

  useEffect(() => {
    if (isAnswered || !question) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Auto-select wrong answer if time runs out
          handleSelectOption(question.options[0], false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isAnswered, question])

  const handleSelectOption = (option, isCorrect) => {
    if (isAnswered) return

    setSelectedOption(option)
    setIsAnswered(true)

    // Wait 1.5 seconds before moving to next question
    setTimeout(() => {
      onAnswerSelected(question, option, isCorrect)
    }, 1500)
  }

  if (!question) return <div className="text-center">Cargando pregunta...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
            Pregunta {questionNumber} de 5
          </span>
          <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
            {timeLeft} segundos
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">{question.questionText}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = option.is_correct
            const isSelected = selectedOption?.text === option.text


            let optionClass = "border border-gray-200 p-4 rounded-lg transition-all duration-300 "

            if (isAnswered) {
              if (isSelected) {
                optionClass += isCorrect ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
              } else if (isCorrect) {
                optionClass += "bg-green-100 border-green-500"
              }
            } else {
              optionClass += "hover:bg-pink-50 cursor-pointer"
            }

            return (
              <div
                key={index}
                className={optionClass}
                onClick={() => !isAnswered && handleSelectOption(option, isCorrect)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">{option.text}</span>
                  {isAnswered && (
                    <>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        isSelected && <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 transition-all duration-300"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
