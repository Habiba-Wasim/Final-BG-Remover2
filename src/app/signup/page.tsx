// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import toast from "react-hot-toast"
// import { useRouter } from "next/navigation"

// type FormData = {
//   name: string
//   email: string
//   password: string
//   confirmPassword: string
//   terms: boolean
// }

// export default function SignUp() {
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>()

//   const password = watch("password")

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // For demo purposes, we'll just show a success message
//       // In a real app, you would register with a backend
//       toast.success("Account created successfully!")
//       router.push("/login")
//     } catch (error) {
//       toast.error("Registration failed. Please try again.")
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
//               <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
//               <p className="text-gray-600">Get started with our background removal tool</p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="form-label">
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   className={`input-field ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
//                   placeholder="John Doe"
//                   {...register("name", {
//                     required: "Name is required",
//                     minLength: {
//                       value: 2,
//                       message: "Name must be at least 2 characters",
//                     },
//                   })}
//                 />
//                 {errors.name && <p className="form-error">{errors.name.message}</p>}
//               </div>

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
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
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
//                 <label htmlFor="confirmPassword" className="form-label">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   className={`input-field ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
//                   placeholder="••••••••"
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value: any) => value === password || "Passwords do not match",
//                   })}
//                 />
//                 {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
//               </div>

//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="terms"
//                     type="checkbox"
//                     className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
//                     {...register("terms", {
//                       required: "You must agree to the terms and conditions",
//                     })}
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label htmlFor="terms" className="font-light text-gray-600">
//                     I accept the{" "}
//                     <Link href="/terms" className="text-[hsl(var(--primary))] hover:underline">
//                       Terms and Conditions
//                     </Link>
//                   </label>
//                   {errors.terms && <p className="form-error">{errors.terms.message}</p>}
//                 </div>
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
//                       Creating account...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link href="/login" className="text-[hsl(var(--primary))] hover:underline">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }
























































"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

// Function to generate a strong password
const generateStrongPassword = () => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?"

  const allChars = lowercase + uppercase + numbers + symbols
  let password = ""

  // Ensure at least one of each character type
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
  password += numbers.charAt(Math.floor(Math.random() * numbers.length))
  password += symbols.charAt(Math.floor(Math.random() * symbols.length))

  // Fill the rest of the password
  for (let i = 0; i < 8; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length))
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const password = watch("password")

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock user data - in a real app, this would come from your auth system
      const userData = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
      }

      // Store user data in localStorage (for demo purposes only)
      // In a real app, you would use a proper auth system like NextAuth.js
      localStorage.setItem("user", JSON.stringify(userData))

      toast.success("Account created successfully!")

      // Track user signup activity
      try {
        await fetch("/api/user-activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.id,
            action: "signup",
          }),
        })
      } catch (error) {
        console.error("Failed to track signup activity:", error)
      }

      // Redirect to contact page
      router.push("/contact")
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword()
    setGeneratedPassword(newPassword)
    setValue("password", newPassword)
    setValue("confirmPassword", newPassword)
    setShowPassword(true)

    // Copy to clipboard
    navigator.clipboard
      .writeText(newPassword)
      .then(() => toast.success("Strong password generated and copied to clipboard!"))
      .catch(() => toast.error("Couldn't copy to clipboard. Please copy it manually."))
  }

  return (
    <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="container-custom">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
              <p className="text-gray-600">Get started with our background removal tool</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`input-field ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="Enter Your Name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={`input-field ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`input-field pr-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
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
                {errors.password && <p className="form-error">{errors.password.message}</p>}
                {generatedPassword && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                    <p className="font-medium text-blue-800">Generated Password:</p>
                    <p className="font-mono text-blue-700 mt-1">{generatedPassword}</p>
                    <p className="text-xs text-blue-600 mt-1">This password has been copied to your clipboard.</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className={`input-field ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder=""
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value: any) => value === password || "Passwords do not match",
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    {...register("terms", {
                      required: "You must agree to the terms and conditions",
                    })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-600">
                    I accept the{" "}
                    <Link href="/terms" className="text-[hsl(var(--primary))] hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                  {errors.terms && <p className="form-error">{errors.terms.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
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
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-[hsl(var(--primary))] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

