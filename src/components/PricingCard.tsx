"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  features: string[]
  buttonText: string
  buttonLink: string
  popular?: boolean
  delay?: number
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  buttonText,
  buttonLink,
  popular = false,
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      className={`card p-6 relative ${popular ? "border-2 border-[hsl(var(--primary))]" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-[hsl(var(--primary))] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-md">
          Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-gray-600 ml-2">{period}</span>}
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-[hsl(var(--primary))] mr-2 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={buttonLink}
        className={`block text-center py-2 px-4 rounded-md transition-colors ${
          popular
            ? "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/90%)]"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        {buttonText}
      </Link>
    </motion.div>
  )
}

