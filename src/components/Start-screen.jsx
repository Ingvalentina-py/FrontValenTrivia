"use client"

import { useState } from "react"
import { Play } from "lucide-react"

export default function StartScreen({ onStartGame }) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Por favor, ingresa tu nombre para comenzar")
      return
    }
    onStartGame(name)
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-md max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-pink-100 p-4 rounded-full mb-4">
          <Play className="h-8 w-8 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Bienvenido a val's Trivia!</h2>
        <p className="text-gray-600 text-center">Let's go!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Tu nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError("")
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Ingresa tu nombre"
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <Play className="h-5 w-5" />
          Iniciar juego
        </button>
      </form>
    </div>
  )
}
