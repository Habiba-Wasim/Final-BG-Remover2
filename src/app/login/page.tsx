// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import toast from "react-hot-toast"
// import { useRouter } from "next/navigation"

// type FormData = {
//   email: string
//   password: string
// }

// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>()

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // For demo purposes, we'll just show a success message
//       // In a real app, you would authenticate with a backend
//       toast.success("Login successful!")
//       router.push("/")
//     } catch (error) {
//       toast.error("Login failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)]">
//       <div className="container-custom">
//         <motion.div
//           className="max-w-md mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="card p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
//               <p className="text-gray-600">Sign in to your account</p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div>
//                 <label htmlFor="email" className="form-label">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   className={`input-field ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
//                   placeholder="you@example.com"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                 />
//                 {errors.email && <p className="form-error">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <Link href="/forgot-password" className="text-sm text-[hsl(var(--primary))] hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <input
//                   id="password"
//                   type="password"
//                   className={`input-field ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
//                   placeholder="••••••••"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 8,
//                       message: "Password must be at least 8 characters",
//                     },
//                   })}
//                 />
//                 {errors.password && <p className="form-error">{errors.password.message}</p>}
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="btn-primary w-full flex items-center justify-center"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Signing in...
//                     </>
//                   ) : (
//                     "Sign In"
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{" "}
//                 <Link href="/signup" className="text-[hsl(var(--primary))] hover:underline">
//                   Sign up
//                 </Link>
//               </p>
//             </div>

//             <div className="mt-8">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <button className="btn-secondary flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.23H12v4.51h5.92c-.26 1.34-1.04 2.48-2.21 3.25v2.69h3.57c2.08-1.92 3.28-4.74 3.28-8.22z"
//                       fill="#4285F4"
//                     />
//                     <path
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       fill="#34A853"
//                     />
//                     <path
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//                       fill="#FBBC05"
//                     />
//                     <path
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       fill="#EA4335"
//                     />
//                   </svg>
//                   Google
//                 </button>
//                 <button className="btn-secondary flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       fill="#1877F2"
//                     />
//                     <path
//                       d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.06 10.06 0 003.115 0v-6.987h2.33z"
//                       fill="white"
//                     />
//                   </svg>
//                   Facebook
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }
























































// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import toast from "react-hot-toast"
// import { useRouter } from "next/navigation"

// type FormData = {
//   email: string
//   password: string
// }

// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const router = useRouter()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>()

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // Mock user data - in a real app, this would come from your auth system
//       const userData = {
//         id: "user_" + Math.random().toString(36).substr(2, 9),
//         name: data.email.split("@")[0],
//         email: data.email,
//       }

//       // Store user data in localStorage (for demo purposes only)
//       // In a real app, you would use a proper auth system like NextAuth.js
//       localStorage.setItem("user", JSON.stringify(userData))

//       toast.success("Login successful!")

//       // Track user login activity
//       try {
//         await fetch("/api/user-activity", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userData.id,
//             action: "login",
//           }),
//         })
//       } catch (error) {
//         console.error("Failed to track login activity:", error)
//       }

//       // Redirect to contact page
//       router.push("/contact")
//     } catch (error) {
//       console.error("Login error:", error)
//       toast.error("Login failed. Please check your credentials.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)]">
//       <div className="container-custom">
//         <motion.div
//           className="max-w-md mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="card p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
//               <p className="text-gray-600">Sign in to your account</p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div>
//                 <label htmlFor="email" className="form-label">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   className={`input-field ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
//                   placeholder="you@example.com"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                 />
//                 {errors.email && <p className="form-error">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <Link href="/forgot-password" className="text-sm text-[hsl(var(--primary))] hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     className={`input-field pr-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
//                     placeholder="••••••••"
//                     {...register("password", {
//                       required: "Password is required",
//                       minLength: {
//                         value: 8,
//                         message: "Password must be at least 8 characters",
//                       },
//                     })}
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                         <path
//                           fillRule="evenodd"
//                           d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
//                           clipRule="evenodd"
//                         />
//                         <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && <p className="form-error">{errors.password.message}</p>}
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="btn-primary w-full flex items-center justify-center"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Signing in...
//                     </>
//                   ) : (
//                     "Sign In"
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{" "}
//                 <Link href="/signup" className="text-[hsl(var(--primary))] hover:underline">
//                   Sign up
//                 </Link>
//               </p>
//             </div>

//             <div className="mt-8">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <button className="btn-secondary flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.23H12v4.51h5.92c-.26 1.34-1.04 2.48-2.21 3.25v2.69h3.57c2.08-1.92 3.28-4.74 3.28-8.22z"
//                       fill="#4285F4"
//                     />
//                     <path
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       fill="#34A853"
//                     />
//                     <path
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//                       fill="#FBBC05"
//                     />
//                     <path
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       fill="#EA4335"
//                     />
//                   </svg>
//                   Google
//                 </button>
//                 <button className="btn-secondary flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       fill="#1877F2"
//                     />
//                     <path
//                       d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.06 10.06 0 003.115 0v-6.987h2.33z"
//                       fill="white"
//                     />
//                   </svg>
//                   Facebook
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }




























































"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type FormData = {
  email: string
  password: string
}

// Generate a strong password suggestion
const generatePasswordSuggestion = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?"
  let password = ""

  // Ensure at least one of each character type
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]
  password += "0123456789"[Math.floor(Math.random() * 10)]
  password += "!@#$%^&*()_-+=<>?"[Math.floor(Math.random() * 16)]

  // Add more random characters to reach length 12
  for (let j = 0; j < 8; j++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }

  // Shuffle the password characters
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")

  return password
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordSuggestion, setPasswordSuggestion] = useState<string>("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  // Generate a new password suggestion when requested
  const generateNewSuggestion = useCallback(() => {
    setPasswordSuggestion(generatePasswordSuggestion())
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock user data - in a real app, this would come from your auth system
      const userData = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: data.email.split("@")[0],
        email: data.email,
      }

      // Store user data in sessionStorage instead of localStorage
      // This will be cleared when the browser/tab is closed
      sessionStorage.setItem("user", JSON.stringify(userData))

      toast.success("Login successful!")

      // Track user login activity
      try {
        await fetch("/api/user-activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.id,
            action: "login",
          }),
        })
      } catch (error) {
        console.error("Failed to track login activity:", error)
      }

      // Redirect to contact page
      router.push("/contact")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg border shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
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

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 rounded-md border pr-10 ${
                      errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition`}
                    placeholder=""
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}

                {/* Password suggestion button */}
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                    onClick={generateNewSuggestion}
                  >
                    Suggest strong password
                  </button>
                </div>

                {/* Password suggestion display */}
                {passwordSuggestion && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-100">
                    <div className="flex items-center justify-between">
                      <code className="text-xs bg-white px-2 py-1 rounded border border-blue-100 font-mono">
                        {passwordSuggestion}
                      </code>
                      <button
                        type="button"
                        className="text-xs text-blue-600 hover:text-blue-800"
                        onClick={() => setValue("password", passwordSuggestion)}
                      >
                        Use
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.23H12v4.51h5.92c-.26 1.34-1.04 2.48-2.21 3.25v2.69h3.57c2.08-1.92 3.28-4.74 3.28-8.22z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      fill="#1877F2"
                    />
                    <path
                      d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.06 10.06 0 003.115 0v-6.987h2.33z"
                      fill="white"
                    />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
