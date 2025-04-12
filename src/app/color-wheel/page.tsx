"use client"

import ColorWheel from "@/components/color-wheel"

export default function ColorWheelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Color Wheel Tool</h1>
          <p className="text-gray-600">Create beautiful color palettes with our interactive color wheel</p>
        </div>
        <ColorWheel />
      </div>
    </div>
  )
}
