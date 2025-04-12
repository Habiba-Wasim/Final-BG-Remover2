"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-[hsl(var(--primary))]">BG Remover Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-[hsl(var(--primary))]" : "text-gray-700 hover:text-[hsl(var(--primary))]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors ${
                pathname === "/pricing"
                  ? "text-[hsl(var(--primary))]"
                  : "text-gray-700 hover:text-[hsl(var(--primary))]"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-[hsl(var(--primary))]"
                  : "text-gray-700 hover:text-[hsl(var(--primary))]"
              }`}
            >
              Contact
            </Link>

            <Link
                href="/color-wheel"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/color-wheel"
                    ? "text-[hsl(var(--primary))]"
                    : "text-gray-700 hover:text-[hsl(var(--primary))]"
                }`}
              >
                Color Wheel
              </Link>

            <div className="flex items-center space-x-4 ml-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-[hsl(var(--primary))] transition-colors"
              >
                Login
              </Link>
              <Link href="/signup" className="btn-primary text-sm hover:text-white">
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/"
                      ? "bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/pricing"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/pricing"
                      ? "bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/contact"
                      ? "bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Contact
                </Link>
                <div className="pt-2 border-t border-gray-200">
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-[hsl(var(--primary))] text-white mt-2"
                  >
                    Sign Up
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

