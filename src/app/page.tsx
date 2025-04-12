// "use client";

// import { useState, useRef } from "react"
// import { motion } from "framer-motion"
// import toast from "react-hot-toast"
// import Link from "next/link"
// import ImageUploader from "../components/ImageUploader"
// import FeatureCard from "../components/FeatureCard"
// import TestimonialCard from "../components/TestimonialCard"
// import PricingCard from "../components/PricingCard"

// export default function Home() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [processedImage, setProcessedImage] = useState<string | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   const handleImageSelect = (file: File, imageDataUrl: string) => {
//     setSelectedImage(imageDataUrl)
//     setProcessedImage(null)
//   }

//   const removeBackground = () => {
//     if (!selectedImage || !canvasRef.current) {
//       toast.error("Please select an image first")
//       return
//     }

//     setIsProcessing(true)
//     toast.loading("Processing your image...", { id: "processing" })

//     const img = new Image()
//     img.onload = () => {
//       try {
//         const canvas = canvasRef.current
//         if (!canvas) {
//           throw new Error("Canvas reference is null")
//         }

//         const ctx = canvas.getContext("2d")
//         if (!ctx) {
//           throw new Error("Could not get canvas context")
//         }

//         // Set canvas dimensions to match image
//         canvas.width = img.width
//         canvas.height = img.height

//         // Draw the original image
//         ctx.drawImage(img, 0, 0)

//         // Get image data
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//         const data = imageData.data

//         // Simple background removal - assuming background is mostly in the corners
//         // Get the average color of the four corners
//         const cornerSize = 10

//         // Calculate average colors for corners
//         let topLeftR = 0,
//           topLeftG = 0,
//           topLeftB = 0
//         let topRightR = 0,
//           topRightG = 0,
//           topRightB = 0
//         let bottomLeftR = 0,
//           bottomLeftG = 0,
//           bottomLeftB = 0
//         let bottomRightR = 0,
//           bottomRightG = 0,
//           bottomRightB = 0
//         let count = 0

//         // Top left corner
//         for (let y = 0; y < cornerSize; y++) {
//           for (let x = 0; x < cornerSize; x++) {
//             const index = (y * canvas.width + x) * 4
//             topLeftR += data[index]
//             topLeftG += data[index + 1]
//             topLeftB += data[index + 2]
//             count++
//           }
//         }

//         topLeftR /= count
//         topLeftG /= count
//         topLeftB /= count

//         // Top right corner
//         count = 0
//         for (let y = 0; y < cornerSize; y++) {
//           for (let x = canvas.width - cornerSize; x < canvas.width; x++) {
//             const index = (y * canvas.width + x) * 4
//             topRightR += data[index]
//             topRightG += data[index + 1]
//             topRightB += data[index + 2]
//             count++
//           }
//         }

//         topRightR /= count
//         topRightG /= count
//         topRightB /= count

//         // Bottom left corner
//         count = 0
//         for (let y = canvas.height - cornerSize; y < canvas.height; y++) {
//           for (let x = 0; x < cornerSize; x++) {
//             const index = (y * canvas.width + x) * 4
//             bottomLeftR += data[index]
//             bottomLeftG += data[index + 1]
//             bottomLeftB += data[index + 2]
//             count++
//           }
//         }

//         bottomLeftR /= count
//         bottomLeftG /= count
//         bottomLeftB /= count

//         // Bottom right corner
//         count = 0
//         for (let y = canvas.height - cornerSize; y < canvas.height; y++) {
//           for (let x = canvas.width - cornerSize; x < canvas.width; x++) {
//             const index = (y * canvas.width + x) * 4
//             bottomRightR += data[index]
//             bottomRightG += data[index + 1]
//             bottomRightB += data[index + 2]
//             count++
//           }
//         }

//         bottomRightR /= count
//         bottomRightG /= count
//         bottomRightB /= count

//         // Average of the corners
//         const bgColorR = (topLeftR + topRightR + bottomLeftR + bottomRightR) / 4
//         const bgColorG = (topLeftG + topRightG + bottomLeftG + bottomRightG) / 4
//         const bgColorB = (topLeftB + topRightB + bottomLeftB + bottomRightB) / 4

//         // Threshold for color similarity
//         const threshold = 30

//         // Process each pixel
//         for (let i = 0; i < data.length; i += 4) {
//           const r = data[i]
//           const g = data[i + 1]
//           const b = data[i + 2]

//           // Calculate color distance
//           const distance = Math.sqrt(Math.pow(r - bgColorR, 2) + Math.pow(g - bgColorG, 2) + Math.pow(b - bgColorB, 2))

//           // If color is similar to background, make it transparent
//           if (distance < threshold) {
//             data[i + 3] = 0 // Alpha channel
//           }
//         }

//         // Put the modified image data back
//         ctx.putImageData(imageData, 0, 0)

//         // Convert canvas to data URL
//         const processedDataUrl = canvas.toDataURL("image/png")
//         setProcessedImage(processedDataUrl)
//         toast.success("Background removed successfully!", { id: "processing" })
//       } catch (err) {
//         console.error("Error in image processing:", err)
//         toast.error("Error processing image. Please try again.", { id: "processing" })
//       } finally {
//         setIsProcessing(false)
//       }
//     }

//     img.onerror = () => {
//       console.error("Error loading image")
//       toast.error("Error loading image. Please try again.", { id: "processing" })
//       setIsProcessing(false)
//     }

//     img.crossOrigin = "anonymous"
//     img.src = selectedImage
//   }

//   const handleDownload = () => {
//     if (!processedImage) return

//     const link = document.createElement("a")
//     link.href = processedImage
//     link.download = "removed-background.png"
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)

//     toast.success("Image downloaded successfully!")
//   }

//   const handleReset = () => {
//     setSelectedImage(null)
//     setProcessedImage(null)
//   }

//   return (
//     <div>
//       {/* Hidden canvas for image processing */}
//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
//         <div className="container-custom">
//           <motion.div
//             className="max-w-3xl mx-auto text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Professional Background Removal</h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Remove backgrounds from images automatically with our AI-powered tool
//             </p>
//             <div className="flex justify-center gap-4">
//               <Link href="#tool" className="btn-primary hover:text-blue-600">
//                 Try It Now
//               </Link>
//               <Link href="/pricing" className="btn-secondary">
//                 View Pricing
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Tool Section */}
//       <section id="tool" className="py-16 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4 hover:text-blue-600">Remove Background</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Upload your image and our AI will automatically remove the background in seconds
//             </p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             {!selectedImage && !processedImage ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <ImageUploader onImageSelectAction={handleImageSelect} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 className="card p-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-medium mb-2">Original Image</h3>
//                     <div className="bg-gray-100 rounded-lg overflow-hidden">
//                       {selectedImage && (
//                         <img
//                           src={selectedImage || "/placeholder.svg"}
//                           alt="Original"
//                           className="w-full h-auto max-h-[300px] object-contain"
//                         />
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium mb-2">
//                       {processedImage ? "Background Removed" : "Result Preview"}
//                     </h3>
//                     <div className="checkered-background rounded-lg overflow-hidden h-[300px] flex items-center justify-center">
//                       {processedImage ? (
//                         <img
//                           src={processedImage || "/placeholder.svg"}
//                           alt="Processed"
//                           className="w-full h-auto max-h-[300px] object-contain"
//                         />
//                       ) : (
//                         <p className="text-gray-500">Processing result will appear here</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-wrap gap-3 justify-center">
//                   {!processedImage ? (
//                     <button
//                       className="btn-primary flex items-center justify-center min-w-[150px]"
//                       onClick={removeBackground}
//                       disabled={isProcessing}
//                     >
//                       {isProcessing ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Processing...
//                         </>
//                       ) : (
//                         "Remove Background"
//                       )}
//                     </button>
//                   ) : (
//                     <button
//                       className="btn-primary flex items-center justify-center min-w-[150px]"
//                       onClick={handleDownload}
//                     >
//                       <svg
//                         className="w-4 h-4 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         ></path>
//                       </svg>
//                       Download
//                     </button>
//                   )}
//                   <button className="btn-secondary min-w-[150px]" onClick={handleReset}>
//                     New Image
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Why Choose Our Service</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Our background removal tool offers professional results with advanced features
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <FeatureCard
//               title="High Quality Results"
//               description="Our AI technology ensures clean edges and precise background removal for professional results."
//               icon="sparkles"
//               delay={0}
//             />
//             <FeatureCard
//               title="Fast Processing"
//               description="Get your images processed in seconds, saving you time and effort."
//               icon="zap"
//               delay={0.1}
//             />
//             <FeatureCard
//               title="Bulk Processing"
//               description="Process multiple images at once with our premium plan for maximum efficiency."
//               icon="layers"
//               delay={0.2}
//             />
//             <FeatureCard
//               title="No Watermarks"
//               description="All processed images are delivered without any watermarks, even with our free plan."
//               icon="check"
//               delay={0.3}
//             />
//             <FeatureCard
//               title="Privacy Focused"
//               description="Your images are processed securely and never stored on our servers without permission."
//               icon="shield"
//               delay={0.4}
//             />
//             <FeatureCard
//               title="24/7 Support"
//               description="Our customer support team is available around the clock to assist you."
//               icon="headphones"
//               delay={0.5}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Thousands of professionals trust our background removal tool for their projects
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <TestimonialCard
//               name="Sarah Johnson"
//               role="Photographer"
//               quote="This tool has saved me countless hours of editing. The results are incredibly professional and the process is so simple."
//               image="/testimonial1.jpg"
//               delay={0}
//             />
//             <TestimonialCard
//               name="Michael Chen"
//               role="E-commerce Manager"
//               quote="We use this for all our product photos. The quality is outstanding and it's helped us improve our conversion rates significantly."
//               image="/testimonial2.jpg"
//               delay={0.1}
//             />
//             <TestimonialCard
//               name="Emma Rodriguez"
//               role="Graphic Designer"
//               quote="As a designer, I need precision. This tool delivers exactly that - clean edges and perfect background removal every time."
//               image="/testimonial3.jpg"
//               delay={0.2}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             <PricingCard
//               title="Free"
//               price="$0"
//               features={["5 images per day", "Standard quality", "Basic support", "No watermarks", "Web access only"]}
//               buttonText="Get Started"
//               buttonLink="/signup"
//               popular={false}
//               delay={0}
//             />
//             <PricingCard
//               title="Pro"
//               price="$9.99"
//               period="per month"
//               features={[
//                 "100 images per day",
//                 "HD quality",
//                 "Priority support",
//                 "No watermarks",
//                 "API access",
//                 "Bulk processing",
//               ]}
//               buttonText="Try Pro"
//               buttonLink="/signup"
//               popular={true}
//               delay={0.1}
//             />
//             <PricingCard
//               title="Enterprise"
//               price="$49.99"
//               period="per month"
//               features={[
//                 "Unlimited images",
//                 "Ultra HD quality",
//                 "24/7 dedicated support",
//                 "No watermarks",
//                 "Full API access",
//                 "Bulk processing",
//                 "Custom integration",
//               ]}
//               buttonText="Contact Sales"
//               buttonLink="/contact"
//               popular={false}
//               delay={0.2}
//             />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-[hsl(var(--primary))] text-white">
//         <div className="container-custom">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//             <p className="text-xl mb-8 opacity-90">
//               Join thousands of satisfied customers using our background removal tool
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link
//                 href="/signup"
//                 className="bg-white text-[hsl(var(--primary))] px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
//               >
//                 Sign Up Now
//               </Link>
//               <Link
//                 href="/contact"
//                 className="bg-transparent border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
//               >
//                 Contact Sales
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }























































// "use client";

// import { useState } from "react";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import ImageUploader from "../components/ImageUploader";
// import FeatureCard from "../components/FeatureCard";
// import TestimonialCard from "../components/TestimonialCard";
// import PricingCard from "../components/PricingCard";

// export default function Home() {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [processedImage, setProcessedImage] = useState<string | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // ✅ Handle Image Selection
//   const handleImageSelect = (imageDataUrl: string) => {
//     setSelectedImage(null);
//     setPreviewUrl(imageDataUrl);
//     setProcessedImage(null);
//   };

//   // ✅ Remove Background (Calls Backend API)
//   const removeBackground = async () => {
//     if (!selectedImage) {
//       toast.error("Please select an image first");
//       return;
//     }

//     setIsProcessing(true);
//     toast.loading("Processing your image...", { id: "processing" });

//     try {
//       const formData = new FormData();
//       formData.append("image_file", selectedImage);

//       const response = await fetch("/api/remove-background", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to remove background");
//       }

//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);
//       setProcessedImage(imageUrl);
//       toast.success("Background removed successfully!", { id: "processing" });
//     } catch (error) {
//       toast.error("Error processing image. Please try again.", { id: "processing" });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // ✅ Download Processed Image
//   const handleDownload = () => {
//     if (!processedImage) return;

//     const link = document.createElement("a");
//     link.href = processedImage;
//     link.download = "removed-background.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     toast.success("Image downloaded successfully!");
//   };

//   // ✅ Reset Image Selection
//   const handleReset = () => {
//     setSelectedImage(null);
//     setPreviewUrl(null);
//     setProcessedImage(null);
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
//         <div className="container-custom text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Professional Background Removal</h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Remove backgrounds from images automatically with our AI-powered tool
//           </p>
//           <div className="flex justify-center gap-4">
//             <Link href="#tool" className="btn-primary hover:text-blue-600">
//               Try It Now
//             </Link>
//             <Link href="/pricing" className="btn-secondary">
//               View Pricing
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Tool Section */}
//       <section id="tool" className="py-16 bg-white">
//         <div className="container-custom text-center">
//           <h2 className="text-3xl font-bold mb-4">Remove Background</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Upload your image and our AI will automatically remove the background in seconds.
//           </p>

//           <div className="max-w-4xl mx-auto mt-8">
//             {!selectedImage && !processedImage ? (
//               <ImageUploader onImageSelect={handleImageSelect} />
//             ) : (
//               <div className="card p-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-medium mb-2">Original Image</h3>
//                     <div className="bg-gray-100 rounded-lg overflow-hidden">
//                       {previewUrl && <img src={previewUrl} alt="Original" className="w-full h-auto max-h-[300px] object-contain" />}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium mb-2">
//                       {processedImage ? "Background Removed" : "Processing..."}
//                     </h3>
//                     <div className="checkered-background rounded-lg overflow-hidden h-[300px] flex items-center justify-center">
//                       {processedImage ? (
//                         <img src={processedImage} alt="Processed" className="w-full h-auto max-h-[300px] object-contain" />
//                       ) : (
//                         <p className="text-gray-500">Processing result will appear here</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-wrap gap-3 justify-center">
//                   {!processedImage ? (
//                     <button className="btn-primary min-w-[150px]" onClick={removeBackground} disabled={isProcessing}>
//                       {isProcessing ? "Processing..." : "Remove Background"}
//                     </button>
//                   ) : (
//                     <button className="btn-primary min-w-[150px]" onClick={handleDownload}>
//                       Download
//                     </button>
//                   )}
//                   <button className="btn-secondary min-w-[150px]" onClick={handleReset}>
//                     New Image
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

























































































// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import toast from "react-hot-toast"
// import Link from "next/link"
// import Image from "next/image"
// import ImageUploader from "../components/ImageUploader"
// import FeatureCard from "../components/FeatureCard"
// import TestimonialCard from "../components/TestimonialCard"
// import PricingCard from "../components/PricingCard"

// export default function Home() {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [processedImage, setProcessedImage] = useState<string | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)

//   // Handle Image Selection
//   const handleImageSelect = (file: File, imageDataUrl: string) => {
//     setSelectedImage(file)
//     setPreviewUrl(imageDataUrl)
//     setProcessedImage(null)
//   }

//   // Remove Background (Calls Backend API)
//   const removeBackground = async () => {
//     if (!selectedImage) {
//       toast.error("Please select an image first")
//       return
//     }

//     setIsProcessing(true)
//     toast.loading("Processing your image...", { id: "processing" })

//     try {
//       // Create a new FormData instance
//       const formData = new FormData()

//       // Append the file with the correct field name
//       formData.append("image", selectedImage)

//       // Make the API request
//       const response = await fetch("/api/remove-background", {
//         method: "POST",
//         body: formData,
//       })

//       // Parse the response as JSON
//       const data = await response.json()

//       // Check if the response contains an error
//       if (data.error) {
//         throw new Error(data.error)
//       }

//       // Check if the response contains an image
//       if (data && data.image) {
//         setProcessedImage(data.image)
//         toast.success("Background removed successfully!", { id: "processing" })
//       } else {
//         throw new Error("No image returned from API")
//       }
//     } catch (error) {
//       console.error("Error processing image:", error)
//       let errorMessage = "Error processing image. Please try again."
//       if (error instanceof Error) {
//         errorMessage = error.message
//       }
//       toast.error(errorMessage, { id: "processing" })
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   // Download Processed Image
//   const handleDownload = () => {
//     if (!processedImage) return

//     const link = document.createElement("a")
//     link.href = processedImage
//     link.download = "removed-background.png"
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)

//     toast.success("Image downloaded successfully!")
//   }

//   // Reset Image Selection
//   const handleReset = () => {
//     setSelectedImage(null)
//     setPreviewUrl(null)
//     setProcessedImage(null)
//   }

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         {/* Tool Section */}
//         <section id="tool" className="py-16 bg-white w-full">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4 hover:text-blue-600">Remove Background</h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Upload your image and our AI will automatically remove the background in seconds
//               </p>
//             </div>

//             <div className="max-w-4xl mx-auto">
//               {!selectedImage && !processedImage ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <ImageUploader onImageSelectAction={handleImageSelect} />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   className="card p-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-medium mb-2">Original Image</h3>
//                       <div className="bg-gray-100 rounded-lg overflow-hidden">
//                         {previewUrl && (
//                           <img
//                             src={previewUrl || "/placeholder.svg"}
//                             alt="Original"
//                             className="w-full h-auto max-h-[300px] object-contain"
//                           />
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-medium mb-2">
//                         {processedImage ? "Background Removed" : "Result Preview"}
//                       </h3>
//                       <div className="checkered-background rounded-lg overflow-hidden h-[300px] flex items-center justify-center">
//                         {processedImage ? (
//                           <img
//                             src={processedImage || "/placeholder.svg"}
//                             alt="Processed"
//                             className="w-full h-auto max-h-[300px] object-contain"
//                           />
//                         ) : (
//                           <p className="text-gray-500">Processing result will appear here</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex flex-wrap gap-3 justify-center">
//                     {!processedImage ? (
//                       <button
//                         className="btn-primary flex items-center justify-center min-w-[150px]"
//                         onClick={removeBackground}
//                         disabled={isProcessing}
//                       >
//                         {isProcessing ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Processing...
//                           </>
//                         ) : (
//                           "Remove Background"
//                         )}
//                       </button>
//                     ) : (
//                       <button
//                         className="btn-primary flex items-center justify-center min-w-[150px]"
//                         onClick={handleDownload}
//                       >
//                         <svg
//                           className="w-4 h-4 mr-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                           ></path>
//                         </svg>
//                         Download
//                       </button>
//                     )}
//                     <button className="btn-secondary min-w-[150px]" onClick={handleReset}>
//                       New Image
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="py-16 bg-gray-50 w-full">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">Why Choose Our Service</h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Our background removal tool offers professional results with advanced features
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               <FeatureCard
//                 title="High Quality Results"
//                 description="Our AI technology ensures clean edges and precise background removal for professional results."
//                 icon="sparkles"
//                 delay={0}
//               />
//               <FeatureCard
//                 title="Fast Processing"
//                 description="Get your images processed in seconds, saving you time and effort."
//                 icon="zap"
//                 delay={0.1}
//               />
//               <FeatureCard
//                 title="Bulk Processing"
//                 description="Process multiple images at once with our premium plan for maximum efficiency."
//                 icon="layers"
//                 delay={0.2}
//               />
//               <FeatureCard
//                 title="No Watermarks"
//                 description="All processed images are delivered without any watermarks, even with our free plan."
//                 icon="check"
//                 delay={0.3}
//               />
//               <FeatureCard
//                 title="Privacy Focused"
//                 description="Your images are processed securely and never stored on our servers without permission."
//                 icon="shield"
//                 delay={0.4}
//               />
//               <FeatureCard
//                 title="24/7 Support"
//                 description="Our customer support team is available around the clock to assist you."
//                 icon="headphones"
//                 delay={0.5}
//               />
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section className="py-16 bg-white w-full">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Thousands of professionals trust our background removal tool for their projects
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               <TestimonialCard
//                 name="Sarah Johnson"
//                 role="Photographer"
//                 quote="This tool has saved me countless hours of editing. The results are incredibly professional and the process is so simple."
//                 image="/testimonial1.jpg"
//                 delay={0}
//               />
//               <TestimonialCard
//                 name="Michael Chen"
//                 role="E-commerce Manager"
//                 quote="We use this for all our product photos. The quality is outstanding and it's helped us improve our conversion rates significantly."
//                 image="/testimonial2.jpg"
//                 delay={0.1}
//               />
//               <TestimonialCard
//                 name="Emma Rodriguez"
//                 role="Graphic Designer"
//                 quote="As a designer, I need precision. This tool delivers exactly that - clean edges and perfect background removal every time."
//                 image="/testimonial3.jpg"
//                 delay={0.2}
//               />
//             </div>
//           </div>
//         </section>

//         {/* Pricing Section */}
//         <section id="pricing" className="py-16 bg-gray-50 w-full">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs</p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//               <PricingCard
//                 title="Free"
//                 price="$0"
//                 features={["5 images per day", "Standard quality", "Basic support", "No watermarks", "Web access only"]}
//                 buttonText="Get Started"
//                 buttonLink="/signup"
//                 popular={false}
//                 delay={0}
//               />
//               <PricingCard
//                 title="Pro"
//                 price="$9.99"
//                 period="per month"
//                 features={[
//                   "100 images per day",
//                   "HD quality",
//                   "Priority support",
//                   "No watermarks",
//                   "API access",
//                   "Bulk processing",
//                 ]}
//                 buttonText="Try Pro"
//                 buttonLink="/signup"
//                 popular={true}
//                 delay={0.1}
//               />
//               <PricingCard
//                 title="Enterprise"
//                 price="$49.99"
//                 period="per month"
//                 features={[
//                   "Unlimited images",
//                   "Ultra HD quality",
//                   "24/7 dedicated support",
//                   "No watermarks",
//                   "Full API access",
//                   "Bulk processing",
//                   "Custom integration",
//                 ]}
//                 buttonText="Contact Sales"
//                 buttonLink="/contact"
//                 popular={false}
//                 delay={0.2}
//               />
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 bg-[hsl(var(--primary))] text-white w-full">
//           <div className="container-custom">
//             <div className="max-w-3xl mx-auto text-center">
//               <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//               <p className="text-xl mb-8 opacity-90">
//                 Join thousands of satisfied customers using our background removal tool
//               </p>
//               <div className="flex flex-wrap justify-center gap-4">
//                 <Link
//                   href="/signup"
//                   className="bg-white text-[hsl(var(--primary))] px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
//                 >
//                   Sign Up Now
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="bg-transparent border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
//                 >
//                   Contact Sales
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   )
// }





















































































// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import toast from "react-hot-toast"
// import Link from "next/link"
// import ImageUploader from "@/components/ImageUploader"
// import FeatureCard from "@/components/FeatureCard"
// import TestimonialCard from "@/components/TestimonialCard"
// import PricingCard from "@/components/PricingCard"

// export default function Home() {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [processedImage, setProcessedImage] = useState<string | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)

//   // Handle Image Selection
//   const handleImageSelect = (file: File, imageDataUrl: string) => {
//     setSelectedImage(file)
//     setPreviewUrl(imageDataUrl)
//     setProcessedImage(null)
//   }

//   // Remove Background (Calls Backend API)
//   const removeBackground = async () => {
//     if (!selectedImage) {
//       toast.error("Please select an image first")
//       return
//     }

//     setIsProcessing(true)
//     toast.loading("Processing your image...", { id: "processing" })

//     try {
//       // Create a new FormData instance
//       const formData = new FormData()

//       // Append the file with the correct field name
//       formData.append("image", selectedImage)

//       // Make the API request
//       const response = await fetch("/api/remove-background", {
//         method: "POST",
//         body: formData,
//       })

//       // Parse the response as JSON
//       const data = await response.json()

//       // Check if the response contains an error
//       if (data.error) {
//         throw new Error(data.error)
//       }

//       // Check if the response contains an image
//       if (data && data.image) {
//         setProcessedImage(data.image)
//         toast.success("Background removed successfully!", { id: "processing" })
//       } else {
//         throw new Error("No image returned from API")
//       }
//     } catch (error) {
//       console.error("Error processing image:", error)
//       let errorMessage = "Error processing image. Please try again."
//       if (error instanceof Error) {
//         errorMessage = error.message
//       }
//       toast.error(errorMessage, { id: "processing" })
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   // Download Processed Image
//   const handleDownload = () => {
//     if (!processedImage) return

//     const link = document.createElement("a")
//     link.href = processedImage
//     link.download = "removed-background.png"
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)

//     toast.success("Image downloaded successfully!")
//   }

//   // Reset Image Selection
//   const handleReset = () => {
//     setSelectedImage(null)
//     setPreviewUrl(null)
//     setProcessedImage(null)
//   }

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
//         <div className="container-custom">
//           <motion.div
//             className="max-w-3xl mx-auto text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Professional Background Removal</h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Remove backgrounds from images automatically with our AI-powered tool
//             </p>
//             <div className="flex justify-center gap-4">
//               <a href="#tool" className="btn-primary hover:text-white">
//                 Try It Now
//               </a>
//               <Link href="/pricing" className="btn-secondary">
//                 View Pricing
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Tool Section */}
//       <section id="tool" className="py-16 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4 hover:text-blue-600">Remove Background</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Upload your image and our AI will automatically remove the background in seconds
//             </p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             {!selectedImage && !processedImage ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <ImageUploader onImageSelectAction={handleImageSelect} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 className="card p-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-medium mb-2">Original Image</h3>
//                     <div className="bg-gray-100 rounded-lg overflow-hidden">
//                       {previewUrl && (
//                         <img
//                           src={previewUrl || "/placeholder.svg"}
//                           alt="Original"
//                           className="w-full h-auto max-h-[300px] object-contain"
//                         />
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium mb-2">
//                       {processedImage ? "Background Removed" : "Result Preview"}
//                     </h3>
//                     <div className="checkered-background rounded-lg overflow-hidden h-[300px] flex items-center justify-center">
//                       {processedImage ? (
//                         <img
//                           src={processedImage || "/placeholder.svg"}
//                           alt="Processed"
//                           className="w-full h-auto max-h-[300px] object-contain"
//                         />
//                       ) : (
//                         <p className="text-gray-500">Processing result will appear here</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-wrap gap-3 justify-center">
//                   {!processedImage ? (
//                     <button
//                       className="btn-primary flex items-center justify-center min-w-[150px]"
//                       onClick={removeBackground}
//                       disabled={isProcessing}
//                     >
//                       {isProcessing ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Processing...
//                         </>
//                       ) : (
//                         "Remove Background"
//                       )}
//                     </button>
//                   ) : (
//                     <button
//                       className="btn-primary flex items-center justify-center min-w-[150px]"
//                       onClick={handleDownload}
//                     >
//                       <svg
//                         className="w-4 h-4 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         ></path>
//                       </svg>
//                       Download
//                     </button>
//                   )}
//                   <button className="btn-secondary min-w-[150px]" onClick={handleReset}>
//                     New Image
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Why Choose Our Service</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Our background removal tool offers professional results with advanced features
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <FeatureCard
//               title="High Quality Results"
//               description="Our AI technology ensures clean edges and precise background removal for professional results."
//               icon="sparkles"
//               delay={0}
//             />
//             <FeatureCard
//               title="Fast Processing"
//               description="Get your images processed in seconds, saving you time and effort."
//               icon="zap"
//               delay={0.1}
//             />
//             <FeatureCard
//               title="Bulk Processing"
//               description="Process multiple images at once with our premium plan for maximum efficiency."
//               icon="layers"
//               delay={0.2}
//             />
//             <FeatureCard
//               title="No Watermarks"
//               description="All processed images are delivered without any watermarks, even with our free plan."
//               icon="check"
//               delay={0.3}
//             />
//             <FeatureCard
//               title="Privacy Focused"
//               description="Your images are processed securely and never stored on our servers without permission."
//               icon="shield"
//               delay={0.4}
//             />
//             <FeatureCard
//               title="24/7 Support"
//               description="Our customer support team is available around the clock to assist you."
//               icon="headphones"
//               delay={0.5}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Thousands of professionals trust our background removal tool for their projects
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <TestimonialCard
//               name="Sarah Johnson"
//               role="Photographer"
//               quote="This tool has saved me countless hours of editing. The results are incredibly professional and the process is so simple."
//               image="/testimonial1.jpg"
//               delay={0}
//             />
//             <TestimonialCard
//               name="Michael Chen"
//               role="E-commerce Manager"
//               quote="We use this for all our product photos. The quality is outstanding and it's helped us improve our conversion rates significantly."
//               image="/testimonial2.jpg"
//               delay={0.1}
//             />
//             <TestimonialCard
//               name="Emma Rodriguez"
//               role="Graphic Designer"
//               quote="As a designer, I need precision. This tool delivers exactly that - clean edges and perfect background removal every time."
//               image="/testimonial3.jpg"
//               delay={0.2}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             <PricingCard
//               title="Free"
//               price="$0"
//               features={["5 images per day", "Standard quality", "Basic support", "No watermarks", "Web access only"]}
//               buttonText="Get Started"
//               buttonLink="/signup"
//               popular={false}
//               delay={0}
//             />
//             <PricingCard
//               title="Pro"
//               price="$9.99"
//               period="per month"
//               features={[
//                 "100 images per day",
//                 "HD quality",
//                 "Priority support",
//                 "No watermarks",
//                 "API access",
//                 "Bulk processing",
//               ]}
//               buttonText="Try Pro"
//               buttonLink="/signup"
//               popular={true}
//               delay={0.1}
//             />
//             <PricingCard
//               title="Enterprise"
//               price="$49.99"
//               period="per month"
//               features={[
//                 "Unlimited images",
//                 "Ultra HD quality",
//                 "24/7 dedicated support",
//                 "No watermarks",
//                 "Full API access",
//                 "Bulk processing",
//                 "Custom integration",
//               ]}
//               buttonText="Contact Sales"
//               buttonLink="/contact"
//               popular={false}
//               delay={0.2}
//             />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-[hsl(var(--primary))] text-white">
//         <div className="container-custom">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//             <p className="text-xl mb-8 opacity-90">
//               Join thousands of satisfied customers using our background removal tool
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link
//                 href="/signup"
//                 className="bg-white text-[hsl(var(--primary))] px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
//               >
//                 Sign Up Now
//               </Link>
//               <Link
//                 href="/contact"
//                 className="bg-transparent border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }



























































































"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import Link from "next/link"
import ImageUploader from "@/components/ImageUploader"
import FeatureCard from "@/components/FeatureCard"
import TestimonialCard from "@/components/TestimonialCard"
import PricingCard from "@/components/PricingCard"
import ColorWheel from "@/components/color-wheel"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Handle Image Selection
  const handleImageSelect = (file: File, imageDataUrl: string) => {
    setSelectedImage(file)
    setPreviewUrl(imageDataUrl)
    setProcessedImage(null)
  }

  // Remove Background (Calls Backend API)
  const removeBackground = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first")
      return
    }

    setIsProcessing(true)
    toast.loading("Processing your image...", { id: "processing" })

    try {
      // Create a new FormData instance
      const formData = new FormData()

      // Append the file with the correct field name
      formData.append("image", selectedImage)

      // Make the API request
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      })

      // Parse the response as JSON
      const data = await response.json()

      // Check if the response contains an error
      if (data.error) {
        throw new Error(data.error)
      }

      // Check if the response contains an image
      if (data && data.image) {
        setProcessedImage(data.image)
        toast.success("Background removed successfully!", { id: "processing" })
      } else {
        throw new Error("No image returned from API")
      }
    } catch (error) {
      console.error("Error processing image:", error)
      let errorMessage = "Error processing image. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast.error(errorMessage, { id: "processing" })
    } finally {
      setIsProcessing(false)
    }
  }

  // Download Processed Image
  const handleDownload = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "removed-background.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("Image downloaded successfully!")
  }

  // Reset Image Selection
  const handleReset = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setProcessedImage(null)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Professional Background Removal</h1>
            <p className="text-xl text-gray-600 mb-8">
              Remove backgrounds from images automatically with our AI-powered tool
            </p>
            <div className="flex justify-center gap-4">
              <a href="#tool" className="btn-primary hover:text-white">
                Try It Now
              </a>
              <Link href="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 hover:text-blue-600">Remove Background</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your image and our AI will automatically remove the background in seconds
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {!selectedImage && !processedImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ImageUploader onImageSelectAction={handleImageSelect} />
              </motion.div>
            ) : (
              <motion.div
                className="card p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Original Image</h3>
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      {previewUrl && (
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Original"
                          className="w-full h-auto max-h-[300px] object-contain"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {processedImage ? "Background Removed" : "Result Preview"}
                    </h3>
                    <div className="checkered-background rounded-lg overflow-hidden h-[300px] flex items-center justify-center">
                      {processedImage ? (
                        <img
                          src={processedImage || "/placeholder.svg"}
                          alt="Processed"
                          className="w-full h-auto max-h-[300px] object-contain"
                        />
                      ) : (
                        <p className="text-gray-500">Processing result will appear here</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  {!processedImage ? (
                    <button
                      className="btn-primary flex items-center justify-center min-w-[150px]"
                      onClick={removeBackground}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Remove Background"
                      )}
                    </button>
                  ) : (
                    <button
                      className="btn-primary flex items-center justify-center min-w-[150px]"
                      onClick={handleDownload}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                      Download
                    </button>
                  )}
                  <button className="btn-secondary min-w-[150px]" onClick={handleReset}>
                    New Image
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our background removal tool offers professional results with advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="High Quality Results"
              description="Our AI technology ensures clean edges and precise background removal for professional results."
              icon="sparkles"
              delay={0}
            />
            <FeatureCard
              title="Fast Processing"
              description="Get your images processed in seconds, saving you time and effort."
              icon="zap"
              delay={0.1}
            />
            <FeatureCard
              title="Bulk Processing"
              description="Process multiple images at once with our premium plan for maximum efficiency."
              icon="layers"
              delay={0.2}
            />
            <FeatureCard
              title="No Watermarks"
              description="All processed images are delivered without any watermarks, even with our free plan."
              icon="check"
              delay={0.3}
            />
            <FeatureCard
              title="Privacy Focused"
              description="Your images are processed securely and never stored on our servers without permission."
              icon="shield"
              delay={0.4}
            />
            <FeatureCard
              title="24/7 Support"
              description="Our customer support team is available around the clock to assist you."
              icon="headphones"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thousands of professionals trust our background removal tool for their projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Photographer"
              quote="This tool has saved me countless hours of editing. The results are incredibly professional and the process is so simple."
              image="/placeholder.svg?height=48&width=48"
              delay={0}
            />
            <TestimonialCard
              name="Michael Chen"
              role="E-commerce Manager"
              quote="We use this for all our product photos. The quality is outstanding and it's helped us improve our conversion rates significantly."
              image="/placeholder.svg?height=48&width=48"
              delay={0.1}
            />
            <TestimonialCard
              name="Emma Rodriguez"
              role="Graphic Designer"
              quote="As a designer, I need precision. This tool delivers exactly that - clean edges and perfect background removal every time."
              image="/placeholder.svg?height=48&width=48"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Free"
              price="$0"
              features={["5 images per day", "Standard quality", "Basic support", "No watermarks", "Web access only"]}
              buttonText="Get Started"
              buttonLink="/signup"
              popular={false}
              delay={0}
            />
            <PricingCard
              title="Pro"
              price="$9.99"
              period="per month"
              features={[
                "100 images per day",
                "HD quality",
                "Priority support",
                "No watermarks",
                "API access",
                "Bulk processing",
              ]}
              buttonText="Try Pro"
              buttonLink="/signup"
              popular={true}
              delay={0.1}
            />
            <PricingCard
              title="Enterprise"
              price="$49.99"
              period="per month"
              features={[
                "Unlimited images",
                "Ultra HD quality",
                "24/7 dedicated support",
                "No watermarks",
                "Full API access",
                "Bulk processing",
                "Custom integration",
              ]}
              buttonText="Contact Sales"
              buttonLink="/contact"
              popular={false}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Color Wheel Section */}
      <section id="color-wheel" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 hover:text-blue-600">Color Wheel</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create, customize, and export beautiful color palettes with our interactive color wheel
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ColorWheel />
          </div>
        </div>
      </section>

      {/* Color Wheel Features Section */}
      <section id="color-wheel-features" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Color Wheel</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our color wheel tool offers professional features for designers and artists
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Color Harmonies</h3>
              <p className="text-gray-600">
                Create perfect color combinations with our advanced harmony options including analogous, complementary,
                triadic and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Precise Color Control</h3>
              <p className="text-gray-600">
                Fine-tune your colors with RGB and HSL sliders for precise control over every aspect of your palette.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Export Options</h3>
              <p className="text-gray-600">
                Export your color palettes in multiple formats for use in your design projects, websites, or
                applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[hsl(var(--primary))] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers using our tools</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-[hsl(var(--primary))] px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}






















































































































































































































// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import toast from "react-hot-toast"
// import Link from "next/link"
// import ImageUploader from "@/components/ImageUploader"
// import FeatureCard from "@/components/FeatureCard"
// import TestimonialCard from "@/components/TestimonialCard"
// import PricingCard from "@/components/PricingCard"
// import ColorWheel from "@/components/color-wheel"

// export default function Home() {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [processedImage, setProcessedImage] = useState<string | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)

//   // Handle Image Selection
//   const handleImageSelect = (file: File, imageDataUrl: string) => {
//     setSelectedImage(file)
//     setPreviewUrl(imageDataUrl)
//     setProcessedImage(null)
//   }

//   // Remove Background (Calls Backend API)
//   const removeBackground = async () => {
//     if (!selectedImage) {
//       toast.error("Please select an image first")
//       return
//     }

//     setIsProcessing(true)
//     toast.loading("Processing your image...", { id: "processing" })

//     try {
//       // Create a new FormData instance
//       const formData = new FormData()

//       // Append the file with the correct field name
//       formData.append("image", selectedImage)

//       // Make the API request
//       const response = await fetch("/api/remove-background", {
//         method: "POST",
//         body: formData,
//       })

//       // Parse the response as JSON
//       const data = await response.json()

//       // Check if the response contains an error
//       if (data.error) {
//         throw new Error(data.error)
//       }

//       // Check if the response contains an image
//       if (data && data.image) {
//         setProcessedImage(data.image)
//         toast.success("Background removed successfully!", { id: "processing" })
//       } else {
//         throw new Error("No image returned from API")
//       }
//     } catch (error) {
//       console.error("Error processing image:", error)
//       let errorMessage = "Error processing image. Please try again."
//       if (error instanceof Error) {
//         errorMessage = error.message
//       }
//       toast.error(errorMessage, { id: "processing" })
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   // Download Processed Image
//   const handleDownload = () => {
//     if (!processedImage) return

//     const link = document.createElement("a")
//     link.href = processedImage
//     link.download = "removed-background.png"
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)

//     toast.success("Image downloaded successfully!")
//   }

//   // Reset Image Selection
//   const handleReset = () => {
//     setSelectedImage(null)
//     setPreviewUrl(null)
//     setProcessedImage(null)
//   }

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
//         <div className="container-custom">
//           <motion.div
//             className="max-w-3xl mx-auto text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Professional Background Removal</h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Remove backgrounds from images automatically with our AI-powered tool
//             </p>
//             <div className="flex justify-center gap-4">
//               <a href="#tool" className="btn-primary hover:text-white">
//                 Try It Now
//               </a>
//               <Link href="/pricing" className="btn-secondary">
//                 View Pricing
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Tool Section */}
//       <section id="tool" className="py-16 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4 hover:text-blue-600">Remove Background</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Upload your image and our AI will automatically remove the background in seconds
//             </p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             {!selectedImage && !processedImage ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <ImageUploader onImageSelectAction={handleImageSelect} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 className="card p-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-medium mb-2">Original Image</h3>
//                     <div className="bg-gray-100 rounded-lg overflow-hidden">
//                       {previewUrl && (
//                         <img
//                           src={previewUrl || "/placeholder.svg"}
//                           alt="Original"
//                           className="w-full h-auto max-h-[300px] object-contain"
//                         />
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium mb-2">
//                       {processedImage ? "Background Removed" : "Result Preview"}
//                     </h3>
//                     <div className="checkered-background rounded-lg overflow-hidden h-[300px] flex items-center justify-center">
//                       {processedImage ? (
//                         <img
//                           src={processedImage || "/placeholder.svg"}
//                           alt="Processed"
//                           className="w-full h-auto max-h-[300px] object-contain"
//                         />
//                       ) : (
//                         <p className="text-gray-500">Processing result will appear here</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-wrap gap-3 justify-center">
//                   {!processedImage ? (
//                     <button
//                       className="btn-primary flex items-center justify-center min-w-[150px]"
//                       onClick={removeBackground}
//                       disabled={isProcessing}
//                     >
//                       {isProcessing ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Processing...
//                         </>
//                       ) : (
//                         "Remove Background"
//                       )}
//                     </button>
//                   ) : (
//                     <button
//                       className="btn-primary flex items-center justify-center min-w-[150px]"
//                       onClick={handleDownload}
//                     >
//                       <svg
//                         className="w-4 h-4 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         ></path>
//                       </svg>
//                       Download
//                     </button>
//                   )}
//                   <button className="btn-secondary min-w-[150px]" onClick={handleReset}>
//                     New Image
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Why Choose Our Service</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Our background removal tool offers professional results with advanced features
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <FeatureCard
//               title="High Quality Results"
//               description="Our AI technology ensures clean edges and precise background removal for professional results."
//               icon="sparkles"
//               delay={0}
//             />
//             <FeatureCard
//               title="Fast Processing"
//               description="Get your images processed in seconds, saving you time and effort."
//               icon="zap"
//               delay={0.1}
//             />
//             <FeatureCard
//               title="Bulk Processing"
//               description="Process multiple images at once with our premium plan for maximum efficiency."
//               icon="layers"
//               delay={0.2}
//             />
//             <FeatureCard
//               title="No Watermarks"
//               description="All processed images are delivered without any watermarks, even with our free plan."
//               icon="check"
//               delay={0.3}
//             />
//             <FeatureCard
//               title="Privacy Focused"
//               description="Your images are processed securely and never stored on our servers without permission."
//               icon="shield"
//               delay={0.4}
//             />
//             <FeatureCard
//               title="24/7 Support"
//               description="Our customer support team is available around the clock to assist you."
//               icon="headphones"
//               delay={0.5}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Thousands of professionals trust our background removal tool for their projects
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <TestimonialCard
//               name="Sarah Johnson"
//               role="Photographer"
//               quote="This tool has saved me countless hours of editing. The results are incredibly professional and the process is so simple."
//               image="/placeholder.svg?height=48&width=48"
//               delay={0}
//             />
//             <TestimonialCard
//               name="Michael Chen"
//               role="E-commerce Manager"
//               quote="We use this for all our product photos. The quality is outstanding and it's helped us improve our conversion rates significantly."
//               image="/placeholder.svg?height=48&width=48"
//               delay={0.1}
//             />
//             <TestimonialCard
//               name="Emma Rodriguez"
//               role="Graphic Designer"
//               quote="As a designer, I need precision. This tool delivers exactly that - clean edges and perfect background removal every time."
//               image="/placeholder.svg?height=48&width=48"
//               delay={0.2}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             <PricingCard
//               title="Free"
//               price="$0"
//               features={["5 images per day", "Standard quality", "Basic support", "No watermarks", "Web access only"]}
//               buttonText="Get Started"
//               buttonLink="/signup"
//               popular={false}
//               delay={0}
//             />
//             <PricingCard
//               title="Pro"
//               price="$9.99"
//               period="per month"
//               features={[
//                 "100 images per day",
//                 "HD quality",
//                 "Priority support",
//                 "No watermarks",
//                 "API access",
//                 "Bulk processing",
//               ]}
//               buttonText="Try Pro"
//               buttonLink="/signup"
//               popular={true}
//               delay={0.1}
//             />
//             <PricingCard
//               title="Enterprise"
//               price="$49.99"
//               period="per month"
//               features={[
//                 "Unlimited images",
//                 "Ultra HD quality",
//                 "24/7 dedicated support",
//                 "No watermarks",
//                 "Full API access",
//                 "Bulk processing",
//                 "Custom integration",
//               ]}
//               buttonText="Contact Sales"
//               buttonLink="/contact"
//               popular={false}
//               delay={0.2}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Color Wheel Section */}
//       <section id="color-wheel" className="py-16 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4 hover:text-blue-600">Color Wheel</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Create, customize, and export beautiful color palettes with our interactive color wheel
//             </p>
//           </div>

//           <div className="max-w-6xl mx-auto">
//             <ColorWheel />
//           </div>
//         </div>
//       </section>

//       {/* Color Wheel Features Section */}
//       <section id="color-wheel-features" className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Why Choose Our Color Wheel</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Our color wheel tool offers professional features for designers and artists
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold mb-2">Advanced Color Harmonies</h3>
//               <p className="text-gray-600">
//                 Create perfect color combinations with our advanced harmony options including analogous, complementary,
//                 triadic and more.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold mb-2">Precise Color Control</h3>
//               <p className="text-gray-600">
//                 Fine-tune your colors with RGB and HSL sliders for precise control over every aspect of your palette.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold mb-2">Export Options</h3>
//               <p className="text-gray-600">
//                 Export your color palettes in multiple formats for use in your design projects, websites, or
//                 applications.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-[hsl(var(--primary))] text-white">
//         <div className="container-custom">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//             <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers using our tools</p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link
//                 href="/signup"
//                 className="bg-white text-[hsl(var(--primary))] px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
//               >
//                 Sign Up Now
//               </Link>
//               <Link
//                 href="/contact"
//                 className="bg-transparent border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }
