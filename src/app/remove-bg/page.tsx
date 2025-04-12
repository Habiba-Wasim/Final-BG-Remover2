"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { FaSpinner } from "react-icons/fa"
import Button from "@/components/ImageUploader"

export default function RemoveBackground() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleUrlSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!imageUrl) return

    setError("")
    setIsProcessing(true)

    try {
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error("Failed to fetch image from URL")
      }

      const blob = await response.blob()
      processFile(blob)
    } catch (err) {
      console.error("Error fetching image:", err)
      setError("Failed to load image from URL. Please try a different URL or upload an image directly.")
      setIsProcessing(false)
    }
  }

  const processFile = async (file: File | Blob) => {
    setError("")
    setIsProcessing(true)

    // First, display the original image
    const reader = new FileReader()
    reader.onload = (event) => {
      if (!event || !event.target || typeof event.target.result !== "string") {
        setError("Failed to read the image file. Please try again.")
        setIsProcessing(false)
        return
      }

      const dataUrl = event.target.result
      setOriginalImage(dataUrl)
    }
    reader.readAsDataURL(file)

    try {
      // Create form data for the API request
      const formData = new FormData()
      formData.append("image_file", file)

      // Call the remove.bg API through our proxy
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to remove background")
      }

      const result = await response.json()

      if (result.imageUrl) {
        setProcessedImage(result.imageUrl)
      } else {
        throw new Error("No image URL returned")
      }
    } catch (err) {
      console.error("Error removing background:", err)
      setError("Failed to remove background. Please try a different image.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement("a")
      link.href = processedImage
      link.download = "removed-background.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleNewImage = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setImageUrl("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-blue-600 font-bold text-xl">
          BG Remover Pro
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600">
            Pricing
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Remove Background</h1>
        <p className="text-center text-gray-600 mb-8">
          Upload your image and our tool will automatically remove the background in seconds
        </p>

        <div className="max-w-3xl mx-auto">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center">
                <FaSpinner className="h-8 w-8 animate-spin mb-2" />
                <p>Processing your image...</p>
              </div>
            ) : originalImage && processedImage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Original Image</h3>
                  <div className="bg-gray-100 p-2 rounded">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Background Removed</h3>
                  <div className="bg-[url('/checkerboard.png')] p-2 rounded">
                    <img
                      src={processedImage || "/placeholder.svg"}
                      alt="Processed"
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                  <div className="flex gap-2 mt-4 hover:text-blue-600">
                    <button onClick={downloadImage} className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                      Download Image
                    </button>
                    <button onClick={handleNewImage} className="flex-1 border border-gray-300 rounded px-4 py-2">
                      New Image
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg mb-2">Upload an Image</p>
                <p className="text-gray-500 mb-4">Drag and drop an image, or click to browse</p>
                <Button onImageSelectAction={() => fileInputRef.current?.click()} />
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-center text-gray-600 mb-2">You can also paste an image URL below</p>
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={!imageUrl || isProcessing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Process
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

