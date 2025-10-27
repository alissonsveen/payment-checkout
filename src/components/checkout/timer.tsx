import React, { useState, useEffect } from "react"

interface TimerProps {
  onExpire?: () => void
}

const Timer: React.FC<TimerProps> = ({ onExpire }) => {
  const [seconds, setSeconds] = useState(180)

  useEffect(() => {
    if (seconds <= 0) {
      if (onExpire) {
        onExpire()
      }
      return
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds, onExpire])

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }

  return (
    <div
      className="text-2xl font-bold"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={
        seconds <= 0
          ? "Tempo esgotado"
          : `Tempo restante: ${formatTime(seconds)}`
      }
    >
      {seconds <= 0 ? "Tempo esgotado!" : formatTime(seconds)}
    </div>
  )
}

export default Timer
