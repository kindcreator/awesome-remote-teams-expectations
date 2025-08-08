"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedTextProps = {
  text?: string
  className?: string
  delay?: number
}

export default function AnimatedText({
  text = "Welcome",
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        staggerChildren: 0.015,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 30,
        mass: 0.6,
      },
    },
  }

  return (
    <div className="relative">
      <motion.h1
        className={cn(
          "text-emerald-700",
          "tracking-tight",
          className
        )}
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label={text}
        role="heading"
      >
        {letters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={child}
            className={cn(
              char === " " ? "inline-block w-2 sm:w-3" : "inline-block"
            )}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <div
        aria-hidden="true"
        className="pointer-events-none mt-2 h-2 w-48 rounded-full bg-emerald-200/60 blur-xl dark:bg-emerald-700/40"
      />
    </div>
  )
}