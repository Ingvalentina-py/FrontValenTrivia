"use client"

import { History, Beaker, Dumbbell, Globe2, Sparkles, BookOpen } from "lucide-react"

export default function CategorySelection({ onSelectCategory }) {
  const categories = [
    {
      id: "historia",
      name: "Historia",
      icon: <History className="h-6 w-6 text-pink-600" />,
      description: "5 preguntas de trivia",
    },
    {
      id: "ciencia",
      name: "Ciencia",
      icon: <Beaker className="h-6 w-6 text-pink-600" />,
      description: "5 preguntas de trivia",
    },
    {
      id: "deporte",
      name: "Deporte",
      icon: <Dumbbell className="h-6 w-6 text-pink-600" />,
      description: "5 preguntas de trivia",
    },
    {
      id: "geografia",
      name: "Geografía",
      icon: <Globe2 className="h-6 w-6 text-pink-600" />,
      description: "5 preguntas de trivia",
    },
    {
      id: "cultura",
      name: "Cultura",
      icon: <BookOpen className="h-6 w-6 text-pink-600" />,
      description: "5 preguntas de trivia",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-pink-600" />
          <h2 className="text-xl font-bold text-gray-800">Trivia de Conocimientos</h2>
        </div>
        <p className="text-center text-gray-600 mb-4">
          Elige un tema para poner a prueba tus conocimientos con 5 preguntas interactivas.
        </p>

        <div className="bg-pink-100 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-pink-500 rounded-full p-1">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-medium text-pink-800">Trivia Mixta</h3>
          </div>
          <p className="text-sm text-pink-700 ml-8">Una pregunta de cada tema</p>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-3">O elige un tema específico:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-pink-50 transition-colors duration-300 text-left"
            >
              <div className="bg-pink-100 p-2 rounded-lg">{category.icon}</div>
              <div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
