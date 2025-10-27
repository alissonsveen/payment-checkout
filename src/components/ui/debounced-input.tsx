"use client"
import { useRef, useState } from "react"
import { Input } from "./input"

type Props = {
  defaultValue?: string
  delay?: number
  onCommit: (value: string) => void
  placeholder?: string
  className?: string
}

export default function DebouncedInput({
  defaultValue = "",
  delay = 250,
  onCommit,
  placeholder,
  className,
}: Props) {
  const [value, setValue] = useState(defaultValue)
  const timerRef = useRef<number | undefined>(undefined)

  const handleChange = (next: string) => {
    setValue(next)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      onCommit(next)
    }, delay)
  }

  return (
    <Input
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  )
}
