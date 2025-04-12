// "use client"

// import type React from "react"

// import { useEffect, useRef, useState } from "react"
// import { Trash2, Copy, Plus, ChevronDown, Download, Share2, Undo, Redo, Maximize, Edit3, Check } from "lucide-react"
// import { cn } from "../lib/utils"
// import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// type ColorHarmony =
//   | "analogous"
//   | "monochromatic"
//   | "triad"
//   | "complementary"
//   | "shades"
//   | "square"
//   | "compound"
//   | "custom"

// interface ColorSwatch {
//   id: string
//   hex: string
//   isActive: boolean
//   name?: string
// }

// export default function ColorWheel() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const wheelRef = useRef<HTMLDivElement>(null)
//   const [activeColor, setActiveColor] = useState("#2F58EB")
//   const [activeColorIndex, setActiveColorIndex] = useState(0)
//   const [isDragging, setIsDragging] = useState(false)
//   const [draggedMarkerIndex, setDraggedMarkerIndex] = useState<number | null>(null)
//   const [harmony, setHarmony] = useState<ColorHarmony>("analogous")
//   const [colorMode, setColorMode] = useState("RGB")
//   const [showColorPicker, setShowColorPicker] = useState(false)
//   const [editingColorName, setEditingColorName] = useState<number | null>(null)
//   const [colorName, setColorName] = useState("")
//   const [swatches, setSwatches] = useState<ColorSwatch[]>([
//     { id: "1", hex: "#2F58EB", isActive: true, name: "Blue" },
//     { id: "2", hex: "#2ECFEA", isActive: false, name: "Cyan" },
//     { id: "3", hex: "#2FEBC9", isActive: false, name: "Teal" },
//     { id: "4", hex: "#2FEB89", isActive: false, name: "Green" },
//     { id: "5", hex: "#7DDAEB", isActive: false, name: "Light Blue" },
//   ])
//   const [showCopied, setShowCopied] = useState<string | null>(null)
//   const [markerPositions, setMarkerPositions] = useState<Array<{ x: number; y: number }>>([
//     { x: 50, y: 50 }, // Center
//     { x: 70, y: 30 },
//     { x: 80, y: 50 },
//     { x: 70, y: 70 },
//     { x: 30, y: 70 },
//   ])
//   const [lockHarmony, setLockHarmony] = useState(true)
//   const [rgbValues, setRgbValues] = useState({ r: 47, g: 88, b: 235 })
//   const [hslValues, setHslValues] = useState({ h: 223, s: 83, l: 55 })
//   const [showDropdown, setShowDropdown] = useState<string | null>(null)
//   const [paletteHistory, setPaletteHistory] = useState<
//     Array<{ swatches: ColorSwatch[]; markerPositions: Array<{ x: number; y: number }> }>
//   >([])
//   const [historyIndex, setHistoryIndex] = useState(-1)

//   // Draw color wheel on canvas
//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d", { willReadFrequently: true })
//     if (!ctx) return

//     const centerX = canvas.width / 2
//     const centerY = canvas.height / 2
//     const radius = Math.min(centerX, centerY) - 5

//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     // Draw color wheel with smoother gradient
//     const imageData = ctx.createImageData(canvas.width, canvas.height)
//     const data = imageData.data

//     for (let y = 0; y < canvas.height; y++) {
//       for (let x = 0; x < canvas.width; x++) {
//         const dx = x - centerX
//         const dy = y - centerY
//         const distance = Math.sqrt(dx * dx + dy * dy)

//         if (distance <= radius) {
//           // Calculate hue based on angle
//           const angle = Math.atan2(dy, dx)
//           const hue = ((angle * 180) / Math.PI + 360) % 360

//           // Calculate saturation based on distance from center (0 at center, 1 at edge)
//           const saturation = Math.min(1, distance / radius)

//           // Convert HSL to RGB
//           const rgb = hslToRgb(hue / 360, saturation, 0.5)

//           const index = (y * canvas.width + x) * 4
//           data[index] = rgb.r
//           data[index + 1] = rgb.g
//           data[index + 2] = rgb.b
//           data[index + 3] = 255 // alpha
//         }
//       }
//     }

//     ctx.putImageData(imageData, 0, 0)

//     // Draw a white circle in the center
//     ctx.beginPath()
//     ctx.arc(centerX, centerY, 10, 0, Math.PI * 2)
//     ctx.fillStyle = "#FFFFFF"
//     ctx.fill()
//     ctx.strokeStyle = "#DDDDDD"
//     ctx.lineWidth = 1
//     ctx.stroke()

//     // Draw outer border
//     ctx.beginPath()
//     ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
//     ctx.strokeStyle = "#DDDDDD"
//     ctx.lineWidth = 1
//     ctx.stroke()
//   }, [])

//   // Save history when swatches or marker positions change
//   useEffect(() => {
//     if (swatches.length > 0 && markerPositions.length > 0) {
//       // Only save history if it's a user action (not initial load or undo/redo)
//       if (historyIndex === -1 || historyIndex === paletteHistory.length - 1) {
//         const newHistory = [
//           ...paletteHistory.slice(0, historyIndex + 1),
//           {
//             swatches: [...swatches],
//             markerPositions: [...markerPositions],
//           },
//         ]
//         setPaletteHistory(newHistory)
//         setHistoryIndex(newHistory.length - 1)
//       }
//     }
//   }, [swatches, markerPositions])

//   // Update RGB and HSL values when active color changes
//   useEffect(() => {
//     const rgb = hexToRgb(activeColor)
//     if (rgb) {
//       setRgbValues(rgb)
//       const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
//       setHslValues(hsl)
//     }
//   }, [activeColor])

//   // Handle mouse events on the color wheel
//   useEffect(() => {
//     const wheel = wheelRef.current
//     if (!wheel) return

//     const handleMouseDown = (e: MouseEvent) => {
//       const rect = wheel.getBoundingClientRect()
//       const centerX = rect.width / 2
//       const centerY = rect.height / 2

//       // Check if we're clicking on a marker
//       const x = e.clientX - rect.left
//       const y = e.clientY - rect.top

//       for (let i = 0; i < markerPositions.length; i++) {
//         const markerX = (markerPositions[i].x / 100) * rect.width
//         const markerY = (markerPositions[i].y / 100) * rect.height
//         const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2))

//         if (distance < 20) {
//           // 20px radius for marker hit detection
//           setDraggedMarkerIndex(i)
//           setActiveColorIndex(i)
//           setActiveColor(swatches[i].hex)
//           setSwatches((prev) =>
//             prev.map((swatch, idx) => ({
//               ...swatch,
//               isActive: idx === i,
//             })),
//           )
//           setIsDragging(true)
//           return
//         }
//       }

//       // If we didn't click on a marker, update the active marker
//       setIsDragging(true)
//       updateColorFromPosition(e)
//     }

//     const handleMouseMove = (e: MouseEvent) => {
//       if (isDragging) {
//         updateColorFromPosition(e)
//       }
//     }

//     const handleMouseUp = () => {
//       setIsDragging(false)
//       setDraggedMarkerIndex(null)
//     }

//     const updateColorFromPosition = (e: MouseEvent) => {
//       const rect = wheel.getBoundingClientRect()
//       const centerX = rect.width / 2
//       const centerY = rect.height / 2

//       const x = e.clientX - rect.left - centerX
//       const y = e.clientY - rect.top - centerY

//       // Calculate distance from center
//       const distance = Math.sqrt(x * x + y * y)
//       const maxRadius = Math.min(centerX, centerY) - 5

//       // Limit to wheel radius
//       if (distance > maxRadius) {
//         const ratio = maxRadius / distance
//         const newX = x * ratio
//         const newY = y * ratio

//         // Update with constrained position
//         updateColorFromXY(newX, newY, centerX, centerY, rect)
//       } else {
//         updateColorFromXY(x, y, centerX, centerY, rect)
//       }
//     }

//     const updateColorFromXY = (x: number, y: number, centerX: number, centerY: number, rect: DOMRect) => {
//       // Calculate angle and distance from center
//       const angle = (Math.atan2(y, x) * 180) / Math.PI
//       const hue = (angle + 360) % 360

//       // Calculate distance from center (0-1)
//       const maxRadius = Math.min(centerX, centerY) - 5
//       const distance = Math.min(1, Math.sqrt(x * x + y * y) / maxRadius)

//       // Calculate saturation and lightness based on distance
//       const saturation = distance * 100
//       const lightness = 50

//       // Convert HSL to hex
//       const color = hslToHex(hue, saturation, lightness)

//       if (draggedMarkerIndex !== null) {
//         // Update only the dragged marker
//         const newPositions = [...markerPositions]
//         newPositions[draggedMarkerIndex] = {
//           x: ((x + centerX) / rect.width) * 100,
//           y: ((y + centerY) / rect.height) * 100,
//         }
//         setMarkerPositions(newPositions)

//         // Update the color of the dragged marker
//         const newSwatches = [...swatches]
//         newSwatches[draggedMarkerIndex] = {
//           ...newSwatches[draggedMarkerIndex],
//           hex: color,
//           isActive: true,
//         }

//         // Update other swatches if harmony is locked
//         if (lockHarmony && harmony !== "custom") {
//           updateHarmonyColorsFromDrag(color, draggedMarkerIndex, newSwatches, newPositions)
//         }

//         setSwatches(newSwatches)
//         setActiveColor(color)
//       } else {
//         // Update the active marker
//         setActiveColor(color)

//         // Update marker position
//         const newPositions = [...markerPositions]
//         newPositions[activeColorIndex] = {
//           x: ((x + centerX) / rect.width) * 100,
//           y: ((y + centerY) / rect.height) * 100,
//         }
//         setMarkerPositions(newPositions)

//         // Update the active swatch
//         updateActiveSwatch(color)

//         // Update related colors based on harmony
//         if (lockHarmony) {
//           updateHarmonyColors(color)
//         }
//       }
//     }

//     wheel.addEventListener("mousedown", handleMouseDown)
//     document.addEventListener("mousemove", handleMouseMove)
//     document.addEventListener("mouseup", handleMouseUp)

//     return () => {
//       wheel.removeEventListener("mousedown", handleMouseDown)
//       document.removeEventListener("mousemove", handleMouseMove)
//       document.removeEventListener("mouseup", handleMouseUp)
//     }
//   }, [isDragging, harmony, activeColorIndex, markerPositions, swatches, draggedMarkerIndex, lockHarmony])

//   // Update the active swatch with the new color
//   const updateActiveSwatch = (color: string) => {
//     setSwatches((prev) =>
//       prev.map((swatch, index) =>
//         index === activeColorIndex ? { ...swatch, hex: color, isActive: true } : { ...swatch, isActive: false },
//       ),
//     )
//   }

//   // Update harmony colors when dragging a specific marker
//   const updateHarmonyColorsFromDrag = (
//     baseColor: string,
//     draggedIndex: number,
//     newSwatches: ColorSwatch[],
//     newPositions: Array<{ x: number; y: number }>,
//   ) => {
//     const hsl = hexToHsl(baseColor)

//     switch (harmony) {
//       case "analogous":
//         // -30°, -15°, 0°, +15°, +30°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== draggedIndex) {
//             const offset = (i - draggedIndex) * 15
//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             const centerX = 50
//             const centerY = 50
//             newPositions[i] = {
//               x: centerX + Math.cos(angle) * distance,
//               y: centerY + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "monochromatic":
//         // Same hue, different saturation/lightness
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== draggedIndex) {
//             const satOffset = (i - draggedIndex) * 15
//             const newSat = Math.max(20, Math.min(100, hsl.s + satOffset))
//             const newLight = Math.max(20, Math.min(80, hsl.l - satOffset / 2))
//             newSwatches[i].hex = hslToHex(hsl.h, newSat, newLight)

//             // Update marker positions
//             const angle = (hsl.h * Math.PI) / 180
//             const distance = (newSat / 100) * 40
//             const centerX = 50
//             const centerY = 50
//             newPositions[i] = {
//               x: centerX + Math.cos(angle) * distance,
//               y: centerY + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "triad":
//         // 0°, +120°, +240°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== draggedIndex) {
//             const offset = Math.floor((i - draggedIndex) / 2) * 120
//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             const centerX = 50
//             const centerY = 50
//             newPositions[i] = {
//               x: centerX + Math.cos(angle) * distance,
//               y: centerY + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "complementary":
//         // 0°, +180°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== draggedIndex) {
//             const offset = i % 2 === draggedIndex % 2 ? 0 : 180
//             const newHue = (hsl.h + offset) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             const centerX = 50
//             const centerY = 50
//             newPositions[i] = {
//               x: centerX + Math.cos(angle) * distance,
//               y: centerY + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "square":
//         // 0°, +90°, +180°, +270°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== draggedIndex) {
//             const offset = ((i - draggedIndex) % 4) * 90
//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             const centerX = 50
//             const centerY = 50
//             newPositions[i] = {
//               x: centerX + Math.cos(angle) * distance,
//               y: centerY + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "compound":
//         // Complex harmony with complementary and analogous aspects
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== draggedIndex) {
//             let offset = 0
//             if (i === (draggedIndex + 1) % newSwatches.length) offset = 30
//             else if (i === (draggedIndex + 2) % newSwatches.length) offset = 180
//             else if (i === (draggedIndex + 3) % newSwatches.length) offset = 210
//             else offset = 15

//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             const centerX = 50
//             const centerY = 50
//             newPositions[i] = {
//               x: centerX + Math.cos(angle) * distance,
//               y: centerY + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "shades":
//         // Same hue and saturation, different lightness
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== draggedIndex) {
//             const lightOffset = (i - draggedIndex) * 15
//             const newLight = Math.max(10, Math.min(90, hsl.l + lightOffset))
//             newSwatches[i].hex = hslToHex(hsl.h, hsl.s, newLight)

//             // Update marker positions - for shades, we'll place them along a line
//             const angle = (hsl.h * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             const centerX = 50
//             const centerY = 50
//             const baseDistance = distance * (1 - Math.abs(i - draggedIndex) * 0.15)
//             newPositions[i] = {
//               x: centerX + Math.cos(angle) * baseDistance,
//               y: centerY + Math.sin(angle) * baseDistance,
//             }
//           }
//         }
//         break
//     }
//   }

//   // Update related colors based on harmony
//   const updateHarmonyColors = (baseColor: string) => {
//     if (harmony === "custom") return

//     const hsl = hexToHsl(baseColor)
//     const newSwatches = [...swatches]
//     const newPositions = [...markerPositions]

//     switch (harmony) {
//       case "analogous":
//         // -30°, -15°, 0°, +15°, +30°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== activeColorIndex) {
//             const offset = (i - activeColorIndex) * 15
//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             newPositions[i] = {
//               x: 50 + Math.cos(angle) * distance,
//               y: 50 + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "monochromatic":
//         // Same hue, different saturation/lightness
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== activeColorIndex) {
//             const satOffset = (i - activeColorIndex) * 15
//             const newSat = Math.max(20, Math.min(100, hsl.s + satOffset))
//             const newLight = Math.max(20, Math.min(80, hsl.l - satOffset / 2))
//             newSwatches[i].hex = hslToHex(hsl.h, newSat, newLight)

//             // Update marker positions
//             const angle = (hsl.h * Math.PI) / 180
//             const distance = (newSat / 100) * 40
//             newPositions[i] = {
//               x: 50 + Math.cos(angle) * distance,
//               y: 50 + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "triad":
//         // 0°, +120°, +240°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== activeColorIndex) {
//             const offset = Math.floor((i - activeColorIndex) / 2) * 120
//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             newPositions[i] = {
//               x: 50 + Math.cos(angle) * distance,
//               y: 50 + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "complementary":
//         // 0°, +180°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== activeColorIndex) {
//             const offset = i % 2 === activeColorIndex % 2 ? 0 : 180
//             const newHue = (hsl.h + offset) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             newPositions[i] = {
//               x: 50 + Math.cos(angle) * distance,
//               y: 50 + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "square":
//         // 0°, +90°, +180°, +270°
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== activeColorIndex) {
//             const offset = ((i - activeColorIndex) % 4) * 90
//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             newPositions[i] = {
//               x: 50 + Math.cos(angle) * distance,
//               y: 50 + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "compound":
//         // Complex harmony with complementary and analogous aspects
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== activeColorIndex) {
//             let offset = 0
//             if (i === (activeColorIndex + 1) % newSwatches.length) offset = 30
//             else if (i === (activeColorIndex + 2) % newSwatches.length) offset = 180
//             else if (i === (activeColorIndex + 3) % newSwatches.length) offset = 210
//             else offset = 15

//             const newHue = (hsl.h + offset + 360) % 360
//             newSwatches[i].hex = hslToHex(newHue, hsl.s, hsl.l)

//             // Update marker positions
//             const angle = (newHue * Math.PI) / 180
//             const distance = (hsl.s / 100) * 40
//             newPositions[i] = {
//               x: 50 + Math.cos(angle) * distance,
//               y: 50 + Math.sin(angle) * distance,
//             }
//           }
//         }
//         break
//       case "shades":
//         // Same hue and saturation, different lightness
//         for (let i = 0; i < newSwatches.length; i++) {
//           if (i !== activeColorIndex) {
//             const lightOffset = (i - activeColorIndex) * 15
//             const newLight = Math.max(10, Math.min(90, hsl.l + lightOffset))
//             newSwatches[i].hex = hslToHex(hsl.h, hsl.s, newLight)

//             // Update marker positions - for shades, we'll place them along a line
//             const angle = (hsl.h * Math.PI) / 180
//             const baseDistance = (hsl.s / 100) * 40 * (1 - Math.abs(i - activeColorIndex) * 0.15)
//             newPositions[i] = {
//               x: 50 + Math.cos(angle) * baseDistance,
//               y: 50 + Math.sin(angle) * baseDistance,
//             }
//           }
//         }
//         break
//     }

//     setSwatches(newSwatches)
//     setMarkerPositions(newPositions)
//   }

//   // Set active swatch
//   const handleSwatchClick = (index: number) => {
//     setActiveColorIndex(index)
//     setActiveColor(swatches[index].hex)

//     setSwatches((prev) =>
//       prev.map((swatch, i) => ({
//         ...swatch,
//         isActive: i === index,
//       })),
//     )
//   }

//   // Delete a swatch
//   const handleDeleteSwatch = (index: number, e: React.MouseEvent) => {
//     e.stopPropagation()

//     if (swatches.length <= 3) return // Maintain at least 3 swatches

//     const newSwatches = swatches.filter((_, i) => i !== index)
//     const newPositions = markerPositions.filter((_, i) => i !== index)

//     // If we're deleting the active swatch, set the first one as active
//     if (index === activeColorIndex) {
//       setActiveColorIndex(0)
//       setActiveColor(newSwatches[0].hex)
//       newSwatches[0].isActive = true
//     } else if (index < activeColorIndex) {
//       // Adjust active index if we're deleting a swatch before it
//       setActiveColorIndex(activeColorIndex - 1)
//     }

//     setSwatches(newSwatches)
//     setMarkerPositions(newPositions)
//   }

//   // Add a new swatch
//   const handleAddSwatch = () => {
//     if (swatches.length >= 8) return // Limit to 8 swatches

//     const newColor = generateRandomColor()
//     setSwatches([
//       ...swatches,
//       {
//         id: Date.now().toString(),
//         hex: newColor,
//         isActive: false,
//         name: `Color ${swatches.length + 1}`,
//       },
//     ])

//     // Add a new marker position
//     const hsl = hexToHsl(newColor)
//     const angle = (hsl.h * Math.PI) / 180
//     const distance = (hsl.s / 100) * 40
//     setMarkerPositions([
//       ...markerPositions,
//       {
//         x: 50 + Math.cos(angle) * distance,
//         y: 50 + Math.sin(angle) * distance,
//       },
//     ])
//   }

//   // Copy hex code to clipboard
//   const copyToClipboard = (hex: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     navigator.clipboard.writeText(hex)
//     setShowCopied(hex)
//     setTimeout(() => setShowCopied(null), 1500)
//   }

//   // Edit color name
//   const startEditingColorName = (index: number, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setEditingColorName(index)
//     setColorName(swatches[index].name || "")
//   }

//   const saveColorName = () => {
//     if (editingColorName !== null) {
//       setSwatches((prev) =>
//         prev.map((swatch, index) => (index === editingColorName ? { ...swatch, name: colorName } : swatch)),
//       )
//       setEditingColorName(null)
//     }
//   }

//   // Update color from RGB sliders
//   const updateFromRgb = (r: number, g: number, b: number) => {
//     const hex = rgbToHex(r, g, b)
//     setActiveColor(hex)
//     updateActiveSwatch(hex)

//     // Update HSL values
//     const hsl = rgbToHsl(r, g, b)
//     setHslValues(hsl)

//     // Update marker position based on HSL
//     const newPositions = [...markerPositions]
//     const angle = (hsl.h * Math.PI) / 180
//     const distance = (hsl.s / 100) * 40
//     newPositions[activeColorIndex] = {
//       x: 50 + Math.cos(angle) * distance,
//       y: 50 + Math.sin(angle) * distance,
//     }
//     setMarkerPositions(newPositions)

//     // Update related colors if harmony is locked
//     if (lockHarmony && harmony !== "custom") {
//       updateHarmonyColors(hex)
//     }
//   }

//   // Update color from HSL sliders
//   const updateFromHsl = (h: number, s: number, l: number) => {
//     const hex = hslToHex(h, s, l)
//     setActiveColor(hex)
//     updateActiveSwatch(hex)

//     // Update RGB values
//     const rgb = hexToRgb(hex)
//     if (rgb) {
//       setRgbValues(rgb)
//     }

//     // Update marker position based on HSL
//     const newPositions = [...markerPositions]
//     const angle = (h * Math.PI) / 180
//     const distance = (s / 100) * 40
//     newPositions[activeColorIndex] = {
//       x: 50 + Math.cos(angle) * distance,
//       y: 50 + Math.sin(angle) * distance,
//     }
//     setMarkerPositions(newPositions)

//     // Update related colors if harmony is locked
//     if (lockHarmony && harmony !== "custom") {
//       updateHarmonyColors(hex)
//     }
//   }

//   // Undo/Redo functions
//   const handleUndo = () => {
//     if (historyIndex > 0) {
//       const newIndex = historyIndex - 1
//       const historyItem = paletteHistory[newIndex]
//       setSwatches(historyItem.swatches)
//       setMarkerPositions(historyItem.markerPositions)
//       setHistoryIndex(newIndex)

//       // Update active color
//       const activeSwatchIndex = historyItem.swatches.findIndex((s) => s.isActive)
//       if (activeSwatchIndex >= 0) {
//         setActiveColorIndex(activeSwatchIndex)
//         setActiveColor(historyItem.swatches[activeSwatchIndex].hex)
//       }
//     }
//   }

//   const handleRedo = () => {
//     if (historyIndex < paletteHistory.length - 1) {
//       const newIndex = historyIndex + 1
//       const historyItem = paletteHistory[newIndex]
//       setSwatches(historyItem.swatches)
//       setMarkerPositions(historyItem.markerPositions)
//       setHistoryIndex(newIndex)

//       // Update active color
//       const activeSwatchIndex = historyItem.swatches.findIndex((s) => s.isActive)
//       if (activeSwatchIndex >= 0) {
//         setActiveColorIndex(activeSwatchIndex)
//         setActiveColor(historyItem.swatches[activeSwatchIndex].hex)
//       }
//     }
//   }

//   // Helper function to generate a random color
//   const generateRandomColor = () => {
//     const letters = "0123456789ABCDEF"
//     let color = "#"
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)]
//     }
//     return color
//   }

//   // Helper function to convert HSL to Hex
//   const hslToHex = (h: number, s: number, l: number) => {
//     h /= 360
//     s /= 100
//     l /= 100
//     let r, g, b
//     if (s === 0) {
//       r = g = b = l
//     } else {
//       const hue2rgb = (p: number, q: number, t: number) => {
//         if (t < 0) t += 1
//         if (t > 1) t -= 1
//         if (t < 1 / 6) return p + (q - p) * 6 * t
//         if (t < 1 / 2) return q
//         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
//         return p
//       }
//       const q = l < 0.5 ? l * (1 + s) : l + s - l * s
//       const p = 2 * l - q
//       r = hue2rgb(p, q, h + 1 / 3)
//       g = hue2rgb(p, q, h)
//       b = hue2rgb(p, q, h - 1 / 3)
//     }
//     const toHex = (x: number) => {
//       const hex = Math.round(x * 255).toString(16)
//       return hex.length === 1 ? "0" + hex : hex
//     }
//     return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
//   }

//   // Helper function to convert Hex to HSL
//   const hexToHsl = (hex: string) => {
//     // Remove the # if present
//     hex = hex.replace(/^#/, "")

//     // Parse the hex values
//     const r = Number.parseInt(hex.substring(0, 2), 16) / 255
//     const g = Number.parseInt(hex.substring(2, 4), 16) / 255
//     const b = Number.parseInt(hex.substring(4, 6), 16) / 255

//     // Find min and max values
//     const max = Math.max(r, g, b)
//     const min = Math.min(r, g, b)
//     let h = 0,
//       s = 0,
//       l = (max + min) / 2

//     if (max !== min) {
//       const d = max - min
//       s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

//       switch (max) {
//         case r:
//           h = (g - b) / d + (g < b ? 6 : 0)
//           break
//         case g:
//           h = (b - r) / d + 2
//           break
//         case b:
//           h = (r - g) / d + 4
//           break
//       }

//       h /= 6
//     }

//     return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
//   }

//   // Helper function to convert RGB to Hex
//   const rgbToHex = (r: number, g: number, b: number) => {
//     const toHex = (c: number) => {
//       const hex = Math.round(c).toString(16)
//       return hex.length === 1 ? "0" + hex : hex
//     }
//     return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
//   }

//   // Helper function to convert Hex to RGB
//   const hexToRgb = (hex: string) => {
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
//     return result
//       ? {
//           r: Number.parseInt(result[1], 16),
//           g: Number.parseInt(result[2], 16),
//           b: Number.parseInt(result[3], 16),
//         }
//       : null
//   }

//   // Helper function to convert RGB to HSL
//   const rgbToHsl = (r: number, g: number, b: number) => {
//     r /= 255
//     g /= 255
//     b /= 255

//     const max = Math.max(r, g, b)
//     const min = Math.min(r, g, b)
//     let h = 0,
//       s = 0
//     const l = (max + min) / 2

//     if (max !== min) {
//       const d = max - min
//       s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

//       switch (max) {
//         case r:
//           h = (g - b) / d + (g < b ? 6 : 0)
//           break
//         case g:
//           h = (b - r) / d + 2
//           break
//         case b:
//           h = (r - g) / d + 4
//           break
//       }

//       h /= 6
//     }

//     return {
//       h: Math.round(h * 360),
//       s: Math.round(s * 100),
//       l: Math.round(l * 100),
//     }
//   }

//   // Helper function to convert HSL to RGB
//   const hslToRgb = (h: number, s: number, l: number) => {
//     let r, g, b

//     if (s === 0) {
//       r = g = b = l // achromatic
//     } else {
//       const hue2rgb = (p: number, q: number, t: number) => {
//         if (t < 0) t += 1
//         if (t > 1) t -= 1
//         if (t < 1 / 6) return p + (q - p) * 6 * t
//         if (t < 1 / 2) return q
//         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
//         return p
//       }

//       const q = l < 0.5 ? l * (1 + s) : l + s - l * s
//       const p = 2 * l - q

//       r = hue2rgb(p, q, h + 1 / 3)
//       g = hue2rgb(p, q, h)
//       b = hue2rgb(p, q, h - 1 / 3)
//     }

//     return {
//       r: Math.round(r * 255),
//       g: Math.round(g * 255),
//       b: Math.round(b * 255),
//     }
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//       <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//         <div className="flex space-x-2">
//           <Button variant="ghost" size="icon" onClick={handleUndo} disabled={historyIndex <= 0}>
//             <Undo className="h-4 w-4" />
//           </Button>
//           <Button variant="ghost" size="icon" onClick={handleRedo} disabled={historyIndex >= paletteHistory.length - 1}>
//             <Redo className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="flex items-center">
//           <div className="mr-4 flex items-center">
//             <input
//               type="checkbox"
//               id="lock-harmony"
//               checked={lockHarmony}
//               onChange={() => setLockHarmony(!lockHarmony)}
//               className="mr-2"
//             />
//             <label htmlFor="lock-harmony" className="text-sm text-gray-700">
//               Lock Harmony
//             </label>
//           </div>
//           <div className="flex space-x-2">
//             <Button variant="ghost" size="icon">
//               <Maximize className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <Share2 className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <Download className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="flex-1">
//             <div className="mb-6 flex justify-between items-center">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Color Harmony</label>
//                 <div className="relative">
//                   <select
//                     className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     value={harmony}
//                     onChange={(e) => {
//                       setHarmony(e.target.value as ColorHarmony)
//                       if (e.target.value !== "custom" && lockHarmony) {
//                         updateHarmonyColors(activeColor)
//                       }
//                     }}
//                   >
//                     <option value="analogous">Analogous</option>
//                     <option value="monochromatic">Monochromatic</option>
//                     <option value="triad">Triad</option>
//                     <option value="complementary">Complementary</option>
//                     <option value="square">Square</option>
//                     <option value="compound">Compound</option>
//                     <option value="shades">Shades</option>
//                     <option value="custom">Custom</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                     <ChevronDown className="h-4 w-4" />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Color Mode</label>
//                 <div className="relative">
//                   <select
//                     className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     value={colorMode}
//                     onChange={(e) => setColorMode(e.target.value)}
//                   >
//                     <option value="RGB">RGB</option>
//                     <option value="HSB">HSB</option>
//                     <option value="CMYK">CMYK</option>
//                     <option value="LAB">LAB</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                     <ChevronDown className="h-4 w-4" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-6 items-center">
//               <div ref={wheelRef} className="relative w-[300px] h-[300px] cursor-pointer">
//                 <canvas ref={canvasRef} width={300} height={300} className="rounded-full" />

//                 {/* Marker spokes */}
//                 {markerPositions.map((pos, index) => (
//                   <div
//                     key={`spoke-${index}`}
//                     className={cn(
//                       "absolute top-1/2 left-1/2 h-0.5 bg-white/50 origin-left",
//                       swatches[index].isActive && "bg-white",
//                     )}
//                     style={{
//                       width: `${Math.sqrt(Math.pow(pos.x - 50, 2) + Math.pow(pos.y - 50, 2))}%`,
//                       transform: `rotate(${Math.atan2(pos.y - 50, pos.x - 50)}rad)`,
//                     }}
//                   />
//                 ))}

//                 {/* Color markers */}
//                 {markerPositions.map((pos, index) => (
//                   <div
//                     key={`marker-${index}`}
//                     className={cn(
//                       "absolute w-8 h-8 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-md",
//                       swatches[index].isActive && "ring-2 ring-white",
//                     )}
//                     style={{
//                       backgroundColor: swatches[index].hex,
//                       left: `${pos.x}%`,
//                       top: `${pos.y}%`,
//                     }}
//                     onClick={() => handleSwatchClick(index)}
//                   >
//                     {swatches[index].isActive && (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-1 h-1 bg-white rounded-full"></div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col gap-2">
//                 <button
//                   className="w-10 h-10 rounded-full border border-gray-300 bg-white shadow-sm"
//                   onClick={() => {
//                     setActiveColor("#FFFFFF")
//                     updateActiveSwatch("#FFFFFF")
//                   }}
//                 ></button>
//                 <button
//                   className="w-10 h-10 rounded-full border border-gray-300 bg-black shadow-sm"
//                   onClick={() => {
//                     setActiveColor("#000000")
//                     updateActiveSwatch("#000000")
//                   }}
//                 ></button>
//                 <hr className="my-2 border-gray-300" />
//                 <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full shadow-sm bg-white">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
//                     <path d="M11.2285,8.5185,4.116,15.631a1.2355,1.2355,0,0,1-1.7772-1.7168l.0302-.0302L9.4815,6.7715ZM14.864,1.053a1.79554,1.79554,0,0,0-1.273.5275L11.3285,3.843l-.707-.707a.5.5,0,0,0-.707,0L8.2335,4.8165a.5.5,0,0,0,0,.707l.5405.541L1.662,13.177a2.23516,2.23516,0,0,0,3.161,3.161l7.1125-7.112.541.5405a.5.5,0,0,0,.707,0L14.864,8.086a.5.5,0,0,0,.00039-.70711L14.864,7.3785l-.707-.707L16.4195,4.409a1.8,1.8,0,0,0,.00042-2.54558L16.4195,1.863l-.2825-.2825A1.796,1.796,0,0,0,14.864,1.053Z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Color Adjustment Panel */}
//             <div className="mt-6 border border-gray-200 rounded-md p-4">
//               <Tabs defaultValue="rgb" className="w-full">
//                 <TabsList className="grid w-full grid-cols-2">
//                   <TabsTrigger value="rgb">RGB</TabsTrigger>
//                   <TabsTrigger value="hsl">HSL</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="rgb" className="space-y-4 pt-4">
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <label className="text-sm font-medium text-gray-700">R</label>
//                       <span className="text-sm text-gray-500">{rgbValues.r}</span>
//                     </div>
//                     <Slider
//                       value={[rgbValues.r]}
//                       min={0}
//                       max={255}
//                       step={1}
//                       onValueChange={(value: any[]) => {
//                         const newRgb = { ...rgbValues, r: value[0] }
//                         setRgbValues(newRgb)
//                         updateFromRgb(newRgb.r, newRgb.g, newRgb.b)
//                       }}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <label className="text-sm font-medium text-gray-700">G</label>
//                       <span className="text-sm text-gray-500">{rgbValues.g}</span>
//                     </div>
//                     <Slider
//                       value={[rgbValues.g]}
//                       min={0}
//                       max={255}
//                       step={1}
//                       onValueChange={(value: any[]) => {
//                         const newRgb = { ...rgbValues, g: value[0] }
//                         setRgbValues(newRgb)
//                         updateFromRgb(newRgb.r, newRgb.g, newRgb.b)
//                       }}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <label className="text-sm font-medium text-gray-700">B</label>
//                       <span className="text-sm text-gray-500">{rgbValues.b}</span>
//                     </div>
//                     <Slider
//                       value={[rgbValues.b]}
//                       min={0}
//                       max={255}
//                       step={1}
//                       onValueChange={(value: any[]) => {
//                         const newRgb = { ...rgbValues, b: value[0] }
//                         setRgbValues(newRgb)
//                         updateFromRgb(newRgb.r, newRgb.g, newRgb.b)
//                       }}
//                       className="w-full"
//                     />
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="hsl" className="space-y-4 pt-4">
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <label className="text-sm font-medium text-gray-700">H</label>
//                       <span className="text-sm text-gray-500">{hslValues.h}°</span>
//                     </div>
//                     <Slider
//                       value={[hslValues.h]}
//                       min={0}
//                       max={360}
//                       step={1}
//                       onValueChange={(value: any[]) => {
//                         const newHsl = { ...hslValues, h: value[0] }
//                         setHslValues(newHsl)
//                         updateFromHsl(newHsl.h, newHsl.s, newHsl.l)
//                       }}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <label className="text-sm font-medium text-gray-700">S</label>
//                       <span className="text-sm text-gray-500">{hslValues.s}%</span>
//                     </div>
//                     <Slider
//                       value={[hslValues.s]}
//                       min={0}
//                       max={100}
//                       step={1}
//                       onValueChange={(value: any[]) => {
//                         const newHsl = { ...hslValues, s: value[0] }
//                         setHslValues(newHsl)
//                         updateFromHsl(newHsl.h, newHsl.s, newHsl.l)
//                       }}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <label className="text-sm font-medium text-gray-700">L</label>
//                       <span className="text-sm text-gray-500">{hslValues.l}%</span>
//                     </div>
//                     <Slider
//                       value={[hslValues.l]}
//                       min={0}
//                       max={100}
//                       step={1}
//                       onValueChange={(value: any[]) => {
//                         const newHsl = { ...hslValues, l: value[0] }
//                         setHslValues(newHsl)
//                         updateFromHsl(newHsl.h, newHsl.s, newHsl.l)
//                       }}
//                       className="w-full"
//                     />
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>

//           <div className="flex-1">
//             <div className="grid grid-cols-1 gap-4">
//               {swatches.map((swatch, index) => (
//                 <div
//                   key={swatch.id}
//                   className={cn(
//                     "relative h-16 rounded-md cursor-pointer group transition-all",
//                     swatch.isActive ? "ring-2 ring-black" : "hover:ring-1 hover:ring-gray-300",
//                   )}
//                   style={{ backgroundColor: swatch.hex }}
//                   onClick={() => handleSwatchClick(index)}
//                 >
//                   <div
//                     className={cn(
//                       "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end p-2 gap-2",
//                       hexToHsl(swatch.hex).l < 50 ? "text-white" : "text-black",
//                     )}
//                   >
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-none shadow-sm hover:bg-white/30"
//                       onClick={(e: React.MouseEvent<Element, MouseEvent>) => copyToClipboard(swatch.hex, e)}
//                     >
//                       <Copy size={14} />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-none shadow-sm hover:bg-white/30"
//                       onClick={(e: React.MouseEvent<Element, MouseEvent>) => startEditingColorName(index, e)}
//                     >
//                       <Edit3 size={14} />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-none shadow-sm hover:bg-white/30"
//                       onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleDeleteSwatch(index, e)}
//                     >
//                       <Trash2 size={14} />
//                     </Button>
//                   </div>

//                   <div
//                     className={cn(
//                       "absolute bottom-2 left-2 flex flex-col",
//                       hexToHsl(swatch.hex).l < 50 ? "text-white" : "text-black",
//                     )}
//                   >
//                     {editingColorName === index ? (
//                       <div className="flex items-center">
//                         <input
//                           type="text"
//                           value={colorName}
//                           onChange={(e) => setColorName(e.target.value)}
//                           className="bg-transparent border-b border-current py-0 px-1 text-sm focus:outline-none"
//                           onClick={(e) => e.stopPropagation()}
//                           autoFocus
//                         />
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-6 w-6"
//                           onClick={(e: { stopPropagation: () => void }) => {
//                             e.stopPropagation()
//                             saveColorName()
//                           }}
//                         >
//                           <Check size={12} />
//                         </Button>
//                       </div>
//                     ) : (
//                       <span className="text-xs opacity-80">{swatch.name}</span>
//                     )}
//                     <span className="text-sm font-mono">
//                       {swatch.hex}
//                       {showCopied === swatch.hex && <span className="ml-2 text-xs opacity-70">Copied!</span>}
//                     </span>
//                   </div>
//                 </div>
//               ))}

//               {swatches.length < 8 && (
//                 <Button
//                   variant="outline"
//                   className="h-16 border-dashed flex items-center justify-center"
//                   onClick={handleAddSwatch}
//                 >
//                   <Plus size={20} className="mr-2" />
//                   Add Color
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-200 p-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
//         <div className="flex gap-2">
//           {swatches.map((swatch) => (
//             <div
//               key={swatch.id}
//               className="w-10 h-10 rounded-md shadow-sm"
//               style={{ backgroundColor: swatch.hex }}
//             ></div>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">Export</Button>
//           <Button>Save Palette</Button>
//         </div>
//       </div>
//     </div>
//   )
// }






















































































































































"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

type ColorHarmony = "analogous" | "monochromatic" | "triad" | "complementary" | "square" | "compound"

interface ColorMarker {
  angle: number
  distance: number // 0-1 value representing distance from center (0 = center, 1 = edge)
  color: string
}

export default function ColorWheel() {
  const [markers, setMarkers] = useState<ColorMarker[]>([])
  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number>(0)
  const [harmony, setHarmony] = useState<ColorHarmony>("analogous")
  const [brightness, setBrightness] = useState<number>(50)
  const [saturation, setSaturation] = useState<number>(100)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wheelSize = useRef<number>(300)
  const isDragging = useRef<boolean>(false)

  // Initialize the color wheel
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      wheelSize.current = isMobile ? 250 : 300
      drawColorWheel()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Initialize markers
    initializeMarkers("analogous")

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Redraw when brightness or saturation changes
  useEffect(() => {
    drawColorWheel()
  }, [brightness, saturation, markers])

  const initializeMarkers = (harmonyType: ColorHarmony) => {
    let newMarkers: ColorMarker[] = []

    // Base hue at 0 degrees (red)
    const baseAngle = 0
    const defaultDistance = 0.8 // Default distance from center (0-1)

    switch (harmonyType) {
      case "analogous":
        // 5 colors next to each other on the wheel
        newMarkers = [
          {
            angle: baseAngle,
            distance: defaultDistance,
            color: hslToHex(baseAngle, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 30) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 30) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 60) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 60) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle - 30 + 360) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle - 30 + 360) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle - 60 + 360) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle - 60 + 360) % 360, saturation / 100, brightness / 100),
          },
        ]
        break
      case "monochromatic":
        // 5 colors with same hue but different brightness/saturation
        newMarkers = [
          {
            angle: baseAngle,
            distance: 0.8,
            color: hslToHex(baseAngle, saturation / 100, brightness / 100),
          },
          {
            angle: baseAngle,
            distance: 0.65,
            color: hslToHex(baseAngle, saturation / 100, Math.max(0.2, brightness / 100 - 0.2)),
          },
          {
            angle: baseAngle,
            distance: 0.5,
            color: hslToHex(baseAngle, saturation / 100, Math.min(0.9, brightness / 100 + 0.2)),
          },
          {
            angle: baseAngle,
            distance: 0.35,
            color: hslToHex(baseAngle, Math.max(0.2, saturation / 100 - 0.3), brightness / 100),
          },
          {
            angle: baseAngle,
            distance: 0.2,
            color: hslToHex(baseAngle, Math.min(1, saturation / 100 + 0.3), brightness / 100),
          },
        ]
        break
      case "triad":
        // 3 colors evenly spaced (120 degrees apart)
        newMarkers = [
          {
            angle: baseAngle,
            distance: defaultDistance,
            color: hslToHex(baseAngle, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 120) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 120) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 240) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 240) % 360, saturation / 100, brightness / 100),
          },
        ]
        break
      case "complementary":
        // 2 colors opposite each other
        newMarkers = [
          {
            angle: baseAngle,
            distance: defaultDistance,
            color: hslToHex(baseAngle, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 180) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 180) % 360, saturation / 100, brightness / 100),
          },
        ]
        break
      case "square":
        // 4 colors evenly spaced (90 degrees apart)
        newMarkers = [
          {
            angle: baseAngle,
            distance: defaultDistance,
            color: hslToHex(baseAngle, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 90) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 90) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 180) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 180) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 270) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 270) % 360, saturation / 100, brightness / 100),
          },
        ]
        break
      case "compound":
        // Base color plus 2 adjacent and 2 complementary
        newMarkers = [
          {
            angle: baseAngle,
            distance: defaultDistance,
            color: hslToHex(baseAngle, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 30) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 30) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle - 30 + 360) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle - 30 + 360) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 180) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 180) % 360, saturation / 100, brightness / 100),
          },
          {
            angle: (baseAngle + 150) % 360,
            distance: defaultDistance,
            color: hslToHex((baseAngle + 150) % 360, saturation / 100, brightness / 100),
          },
        ]
        break
    }

    setMarkers(newMarkers)
    setActiveMarkerIndex(0)
    setHarmony(harmonyType)
  }

  const drawColorWheel = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = wheelSize.current
    canvas.width = size
    canvas.height = size
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 5

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = ((angle - 1) * Math.PI) / 180
      const endAngle = ((angle + 1) * Math.PI) / 180

      const hue = angle
      const sat = saturation / 100
      const light = brightness / 100

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Convert HSL to RGB for canvas
      ctx.fillStyle = `hsl(${hue}, ${sat * 100}%, ${light * 100}%)`
      ctx.fill()
    }

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.15, 0, Math.PI * 2)
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()
    ctx.strokeStyle = "#CCCCCC"
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw markers
    markers.forEach((marker, index) => {
      const isActive = index === activeMarkerIndex
      const markerRadius = isActive ? 12 : 10

      // Convert angle to radians
      const angleRad = ((marker.angle - 90) * Math.PI) / 180

      // Calculate position based on distance from center
      const markerX = centerX + Math.cos(angleRad) * (radius * marker.distance)
      const markerY = centerY + Math.sin(angleRad) * (radius * marker.distance)

      // Draw line from center
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(markerX, markerY)
      ctx.strokeStyle = isActive ? "#FFFFFF" : "#CCCCCC"
      ctx.lineWidth = isActive ? 2 : 1
      ctx.stroke()

      // Draw marker circle
      ctx.beginPath()
      ctx.arc(markerX, markerY, markerRadius, 0, Math.PI * 2)
      ctx.fillStyle = marker.color
      ctx.fill()
      ctx.strokeStyle = isActive ? "#FFFFFF" : "#CCCCCC"
      ctx.lineWidth = isActive ? 2 : 1
      ctx.stroke()

      // Draw number in marker
      ctx.fillStyle = getBestTextColor(marker.color)
      ctx.font = `${isActive ? "bold " : ""}10px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText((index + 1).toString(), markerX, markerY)
    })
  }

  const getBestTextColor = (bgColor: string) => {
    // Convert hex to RGB
    const r = Number.parseInt(bgColor.slice(1, 3), 16)
    const g = Number.parseInt(bgColor.slice(3, 5), 16)
    const b = Number.parseInt(bgColor.slice(5, 7), 16)

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? "#000000" : "#FFFFFF"
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find if we clicked on a marker
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = canvas.width / 2 - 5

    // Check each marker
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i]
      const angleRad = ((marker.angle - 90) * Math.PI) / 180
      const markerX = centerX + Math.cos(angleRad) * (radius * marker.distance)
      const markerY = centerY + Math.sin(angleRad) * (radius * marker.distance)

      // Calculate distance from click to marker
      const dx = x - markerX
      const dy = y - markerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // If clicked on a marker, set it as active
      if (distance <= 15) {
        setActiveMarkerIndex(i)
        return
      }
    }

    // If we didn't click on a marker, move the active marker
    moveMarker(x, y)
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging.current) {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      moveMarker(x, y)
    }
  }

  const handleCanvasMouseUp = () => {
    isDragging.current = false
  }

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDragging.current = true
    e.preventDefault()
    const touch = e.touches[0]
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      // First check if we're touching a marker
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = canvas.width / 2 - 5

      let touchedMarker = false

      // Check each marker
      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i]
        const angleRad = ((marker.angle - 90) * Math.PI) / 180
        const markerX = centerX + Math.cos(angleRad) * (radius * marker.distance)
        const markerY = centerY + Math.sin(angleRad) * (radius * marker.distance)

        // Calculate distance from touch to marker
        const dx = x - markerX
        const dy = y - markerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // If touched a marker, set it as active
        if (distance <= 20) {
          setActiveMarkerIndex(i)
          touchedMarker = true
          break
        }
      }

      // If we didn't touch a marker, move the active marker
      if (!touchedMarker) {
        moveMarker(x, y)
      }
    }
  }

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging.current) {
      e.preventDefault()
      const touch = e.touches[0]
      const canvas = canvasRef.current
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        moveMarker(x, y)
      }
    }
  }

  const handleCanvasTouchEnd = () => {
    isDragging.current = false
  }

  const moveMarker = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Calculate distance from center
    const dx = x - centerX
    const dy = y - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const radius = canvas.width / 2 - 5

    // Only update if click is within the wheel
    if (distance <= radius) {
      // Calculate angle in degrees
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI
      // Convert to 0-360 range
      angle = (angle + 90) % 360
      if (angle < 0) angle += 360

      // Calculate normalized distance (0-1)
      const normalizedDistance = Math.min(1, Math.max(0.2, distance / radius))

      // Update the active marker
      updateMarkerPosition(activeMarkerIndex, angle, normalizedDistance)
    }
  }

  const updateMarkerPosition = (index: number, newAngle: number, newDistance: number) => {
    // Create a copy of the markers array
    const newMarkers = [...markers]

    // Calculate the difference between the new angle and the current angle
    const angleDiff = newAngle - newMarkers[index].angle

    // For monochromatic, we only update the distance, not the angle
    if (harmony === "monochromatic") {
      // Update the active marker's distance and color
      // For monochromatic, distance affects saturation or brightness
      const satValue = newDistance * 100 // Map distance to saturation
      newMarkers[index] = {
        ...newMarkers[index],
        distance: newDistance,
        color: hslToHex(newMarkers[index].angle, satValue / 100, brightness / 100),
      }
    } else {
      // Update the active marker
      newMarkers[index] = {
        ...newMarkers[index],
        angle: newAngle,
        distance: newDistance,
        color: hslToHex(newAngle, saturation / 100, brightness / 100),
      }

      // For certain harmony types, we need to update other markers too
      // For each marker, update its position based on the harmony type
      for (let i = 0; i < newMarkers.length; i++) {
        if (i !== index) {
          // Rotate all other markers by the same amount
          const rotatedAngle = (newMarkers[i].angle + angleDiff) % 360
          newMarkers[i] = {
            ...newMarkers[i],
            angle: rotatedAngle,
            // Keep the same distance for other markers
            color: hslToHex(rotatedAngle, saturation / 100, brightness / 100),
          }
        }
      }
    }

    setMarkers(newMarkers)
  }

  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    // Remove # if present
    hex = hex.replace(/^#/, "")

    // Parse the hex values
    const r = Number.parseInt(hex.substring(0, 2), 16) / 255
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h /= 6
    }

    return { h: h * 360, s, l }
  }

  const hslToHex = (h: number, s: number, l: number): string => {
    // Ensure h is between 0 and 360
    h = h % 360
    if (h < 0) h += 360

    h /= 360
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      alert(`${color} has been copied to clipboard.`)
    })
  }

  const downloadPalette = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 500
    canvas.height = 100
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Calculate width per color
      const colorWidth = 500 / markers.length

      // Draw each color
      markers.forEach((marker, index) => {
        ctx.fillStyle = marker.color
        ctx.fillRect(index * colorWidth, 0, colorWidth, 100)
      })

      // Create download link
      const link = document.createElement("a")
      link.download = "color-palette.png"
      link.href = canvas.toDataURL("image/png")
      link.click()

      alert("Your color palette has been downloaded.")
    }
  }

  const rotateHarmony = () => {
    if (markers.length > 0) {
      // Rotate all markers by 30 degrees
      const newMarkers = markers.map((marker) => ({
        ...marker,
        angle: (marker.angle + 30) % 360,
        color: hslToHex((marker.angle + 30) % 360, saturation / 100, brightness / 100),
      }))

      setMarkers(newMarkers)
    }
  }

  const handleHarmonyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    initializeMarkers(e.target.value as ColorHarmony)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <canvas
            ref={canvasRef}
            className="cursor-pointer touch-none"
            onClick={handleCanvasClick}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            onTouchStart={handleCanvasTouchStart}
            onTouchMove={handleCanvasTouchMove}
            onTouchEnd={handleCanvasTouchEnd}
          />
          <div className="text-center text-sm mt-2 text-gray-500">Drag markers to adjust position and distance</div>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Harmony Type</label>
            <select
              value={harmony}
              onChange={handleHarmonyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="analogous">Analogous</option>
              <option value="monochromatic">Monochromatic</option>
              <option value="triad">Triad</option>
              <option value="complementary">Complementary</option>
              <option value="square">Square</option>
              <option value="compound">Compound</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Brightness</label>
            <input
              type="range"
              value={brightness}
              min={20}
              max={80}
              step={1}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Saturation</label>
            <input
              type="range"
              value={saturation}
              min={0}
              max={100}
              step={1}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <button
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={() => initializeMarkers(harmony)}
            >
              Reset
            </button>

            <button
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={rotateHarmony}
            >
              Rotate
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Color Palette</h2>

        <div className="space-y-4">
          <div className="flex overflow-hidden rounded-md shadow-sm">
            {markers.map((marker, index) => (
              <div
                key={index}
                className={`h-16 flex-1 cursor-pointer transition-all ${
                  index === activeMarkerIndex ? "h-20 -mt-2" : ""
                }`}
                style={{ backgroundColor: marker.color }}
                onClick={() => setActiveMarkerIndex(index)}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {markers.map((marker, index) => (
              <ColorCard
                key={index}
                title={`Color ${index + 1}`}
                color={marker.color}
                isActive={index === activeMarkerIndex}
                onCopy={() => copyToClipboard(marker.color)}
                onClick={() => setActiveMarkerIndex(index)}
              />
            ))}
          </div>

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onClick={downloadPalette}
          >
            Download Palette
          </button>
        </div>
      </div>
    </div>
  )
}

interface ColorCardProps {
  title: string
  color: string
  isActive?: boolean
  onCopy: () => void
  onClick: () => void
}

function ColorCard({ title, color, isActive = false, onCopy, onClick }: ColorCardProps) {
  // Determine if text should be white or black based on background color
  const getContrastColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = Number.parseInt(hexColor.slice(1, 3), 16)
    const g = Number.parseInt(hexColor.slice(3, 5), 16)
    const b = Number.parseInt(hexColor.slice(5, 7), 16)

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? "#000000" : "#FFFFFF"
  }

  const textColor = getContrastColor(color)

  return (
    <div
      className={`overflow-hidden cursor-pointer transition-all rounded-md shadow-sm ${
        isActive ? "ring-2 ring-blue-500 ring-offset-2" : ""
      }`}
      onClick={onClick}
    >
      <div className="h-16 flex items-center justify-between px-4" style={{ backgroundColor: color }}>
        <span style={{ color: textColor }} className="font-medium">
          {title}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onCopy()
          }}
          style={{ color: textColor }}
          className={`p-1 rounded-full hover:bg-opacity-20 ${
            textColor === "#FFFFFF" ? "hover:bg-white" : "hover:bg-black"
          }`}
        >
          Copy
        </button>
      </div>
      <div className="p-2 text-center text-sm font-mono">{color}</div>
    </div>
  )
}
