// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { motion } from "framer-motion"
// import toast from "react-hot-toast"

// type FormData = {
//   name: string
//   email: string
//   subject: string
//   message: string
// }

// export default function Contact() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isSuccess, setIsSuccess] = useState(false)

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>()

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true)

//     try {
//       // Send form data to your backend API
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to send message")
//       }

//       // Show success message
//       toast.success("Message sent successfully! We'll get back to you soon.")
//       setIsSuccess(true)
//       reset()

//       // Reset success state after 5 seconds
//       setTimeout(() => {
//         setIsSuccess(false)
//       }, 5000)
//     } catch (error) {
//       console.error("Error sending message:", error)
//       toast.error("Failed to send message. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)]">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <motion.div
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Have questions or need assistance? We're here to help. Fill out the form below and we'll get back to you
//               as soon as possible.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <motion.div
//               className="md:col-span-1"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="bg-white rounded-lg shadow-md p-6 h-full">
//                 <h2 className="text-xl font-bold mb-4">Get in Touch</h2>

//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 bg-[hsl(var(--primary)/10%)] p-3 rounded-full">
//                       <svg
//                         className="w-5 h-5 text-[hsl(var(--primary))]"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="ml-4 overflow-hidden">
//                       <h3 className="text-lg font-medium">Email</h3>
//                       <a
//                         href="mailto:support@bgremoverpro.com"
//                         className="text-gray-600 mt-1 hover:text-primary transition-colors break-words"
//                       >
//                         support@bgremoverpro.com
//                       </a>
//                     </div>
//                   </div>

//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 bg-[hsl(var(--primary)/10%)] p-3 rounded-full">
//                       <svg
//                         className="w-5 h-5 text-[hsl(var(--primary))]"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                         ></path>
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-lg font-medium">Address</h3>
//                       <a
//                         href="https://maps.google.com/?q=123+Innovation+Street,+Tech+City,+TC+12345,+United+States"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-600 mt-1 hover:text-primary transition-colors"
//                       >
//                         123 Innovation Street
//                         <br />
//                         Tech City, TC 12345
//                         <br />
//                         United States
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <h3 className="text-lg font-medium mb-3">Follow Us</h3>
//                   <div className="flex space-x-4">
//                     <a
//                       href="#"
//                       className="bg-[hsl(var(--primary)/10%)] p-2 rounded-full hover:bg-[hsl(var(--primary)/20%)] transition-colors"
//                     >
//                       <svg
//                         className="w-5 h-5 text-[hsl(var(--primary))]"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
//                       </svg>
//                     </a>
//                     <a
//                       href="#"
//                       className="bg-[hsl(var(--primary)/10%)] p-2 rounded-full hover:bg-[hsl(var(--primary)/20%)] transition-colors"
//                     >
//                       <svg
//                         className="w-5 h-5 text-[hsl(var(--primary))]"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
//                       </svg>
//                     </a>
//                     <a
//                       href="#"
//                       className="bg-[hsl(var(--primary)/10%)] p-2 rounded-full hover:bg-[hsl(var(--primary)/20%)] transition-colors"
//                     >
//                       <svg
//                         className="w-5 h-5 text-[hsl(var(--primary))]"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
//                       </svg>
//                     </a>
//                     <a
//                       href="#"
//                       className="bg-[hsl(var(--primary)/10%)] p-2 rounded-full hover:bg-[hsl(var(--primary)/20%)] transition-colors"
//                     >
//                       <svg
//                         className="w-5 h-5 text-[hsl(var(--primary))]"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               className="md:col-span-2"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="bg-white rounded-lg shadow-md p-8">
//                 <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>

//                 {isSuccess ? (
//                   <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
//                     <svg
//                       className="w-12 h-12 text-green-500 mx-auto mb-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                       ></path>
//                     </svg>
//                     <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
//                     <p className="text-green-700">
//                       Thank you for contacting us. We'll get back to you as soon as possible.
//                     </p>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="w-full">
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                           Your Name
//                         </label>
//                         <input
//                           id="name"
//                           type="text"
//                           className={`w-full px-4 py-3 rounded-md border ${
//                             errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
//                           } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
//                           placeholder="Enter Your Name"
//                           {...register("name", {
//                             required: "Name is required",
//                           })}
//                         />
//                         {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
//                       </div>

//                       <div className="w-full">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                           Your Email
//                         </label>
//                         <input
//                           id="email"
//                           type="email"
//                           className={`w-full px-4 py-3 rounded-md border ${
//                             errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
//                           } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
//                           placeholder="you@example.com"
//                           {...register("email", {
//                             required: "Email is required",
//                             pattern: {
//                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                               message: "Invalid email address",
//                             },
//                           })}
//                         />
//                         {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
//                       </div>
//                     </div>

//                     <div className="w-full">
//                       <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
//                         Subject
//                       </label>
//                       <input
//                         id="subject"
//                         type="text"
//                         className={`w-full px-4 py-3 rounded-md border ${
//                           errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
//                         } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
//                         placeholder="How can we help you?"
//                         {...register("subject", {
//                           required: "Subject is required",
//                         })}
//                       />
//                       {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
//                     </div>

//                     <div className="w-full">
//                       <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                         Message
//                       </label>
//                       <textarea
//                         id="message"
//                         rows={8}
//                         className={`w-full px-4 py-3 rounded-md border ${
//                           errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
//                         } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
//                         placeholder="Your message here..."
//                         {...register("message", {
//                           required: "Message is required",
//                           minLength: {
//                             value: 10,
//                             message: "Message must be at least 10 characters",
//                           },
//                         })}
//                       ></textarea>
//                       {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
//                     </div>

//                     <div>
//                       <button
//                         type="submit"
//                         className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-medium rounded-md shadow-lg hover:shadow-xl hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center text-lg"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
//                             Sending...
//                           </>
//                         ) : (
//                           <>
//                             <svg
//                               className="w-5 h-5 mr-2"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                               ></path>
//                             </svg>
//                             Send Message
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }














































































































































"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

// This is a session-based authentication function
const useAuth = () => {
  const [user, setUser] = useState<null | { id: string; name: string; email: string }>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check auth state from sessionStorage (not localStorage)
    const checkAuth = async () => {
      try {
        // Check sessionStorage for user data
        const userData = sessionStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading }
}

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "")
      setValue("email", user.email || "")
    }
  }, [user, setValue])

  const onSubmit = async (data: FormData) => {
    // If not authenticated, show login message
    if (!user) {
      toast.error("Please log in or sign up to send a message")

      // Show a more prominent message
      const confirmed = window.confirm("You need to log in or sign up to send a message. Would you like to log in now?")
      if (confirmed) {
        router.push("/login")
      }
      return
    }

    setIsLoading(true)

    try {
      // Send form data to your backend API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId: user.id, // Include user ID for tracking
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Show success message
      toast.success("Message sent successfully! We'll get back to you soon.")
      setIsSuccess(true)
      reset()

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Fill out the form below and we'll get back to you
              as soon as possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-bold mb-4">Send The Message</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4 overflow-hidden" style={{ minWidth: "200px" }}>
                      <h3 className="text-lg font-medium">Email</h3>
                      <a
                        href="mailto:support@bgremoverpro.com?subject=Contact%20Inquiry"
                        className="text-gray-600 mt-1 hover:text-blue-600 transition-colors inline-block"
                        style={{ wordBreak: "keep-all", whiteSpace: "nowrap", fontSize: "0.95rem" }}
                      >
                        support@bgremoverpro.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Address</h3>
                      <a
                        href="https://maps.google.com/?q=123+Innovation+Street,+Tech+City,+TC+12345,+United+States"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 mt-1 hover:text-blue-600 transition-colors"
                      >
                        123 Innovation Street
                        <br />
                        Tech City, TC 12345
                        <br />
                        Pakistan
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>

                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                    <svg
                      className="w-12 h-12 text-green-500 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="w-full">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className={`w-full px-4 py-3 rounded-md border ${
                            errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                          } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
                          placeholder="Enter Your Name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                      </div>

                      <div className="w-full">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={`w-full px-4 py-3 rounded-md border ${
                            errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                          } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
                          placeholder="you@example.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="w-full">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className={`w-full px-4 py-3 rounded-md border ${
                          errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
                        placeholder="How can we help you?"
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
                    </div>

                    <div className="w-full">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={8}
                        className={`w-full px-4 py-3 rounded-md border ${
                          errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
                        placeholder="Your message here..."
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                      ></textarea>
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-medium rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center text-lg"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              ></path>
                            </svg>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
