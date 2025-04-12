"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
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
      className={`rounded-lg overflow-hidden ${
        popular
          ? "border-2 border-blue-500 shadow-lg transform scale-105 md:scale-110 z-10"
          : "border border-gray-200 shadow-sm"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {popular && <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">Most Popular</div>}

      <div className="bg-white p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-gray-500 ml-1">{period}</span>}
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={buttonLink}
          className={`block text-center py-2 px-4 rounded-md font-medium transition-colors ${
            popular ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </motion.div>
  )
}
