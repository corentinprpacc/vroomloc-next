"use client"
import { useState } from "react"

interface TextToggle {
  text: string
  toggleText: () => void
  showFullText: boolean
}

const useTextToggle = (initialText: string, maxLength: number): TextToggle => {
  const [showFullText, setShowFullText] = useState(false)
  const text = showFullText ? initialText : initialText.slice(0, maxLength)

  const toggleText = (): void => {
    setShowFullText(!showFullText)
  }

  return { text, toggleText, showFullText }
}

export default useTextToggle
