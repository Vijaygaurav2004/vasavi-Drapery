"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu-container')
      if (menu && !menu.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="md:hidden" id="mobile-menu-container">
      <Button 
        className="hover:bg-rose-100" 
        size="icon" 
        variant="ghost"
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {isOpen ? (
            // X icon when menu is open
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            // Hamburger icon when menu is closed
            <>
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </>
          )}
        </svg>
      </Button>

      <div 
        className={`absolute left-0 right-0 top-[80px] bg-rose-50 transform transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto py-4 px-4 flex flex-col gap-4 border-t border-rose-100">
          <Link 
            href="/" 
            className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider py-2 transition-colors"
            onClick={toggleMenu}
          >
            HOME
          </Link>
          <Link 
            href="/collections" 
            className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider py-2 transition-colors"
            onClick={toggleMenu}
          >
            COLLECTIONS
          </Link>
          <Link 
            href="/about" 
            className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider py-2 transition-colors"
            onClick={toggleMenu}
          >
            OUR STORY
          </Link>
          <Link 
            href="/contact" 
            className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider py-2 transition-colors"
            onClick={toggleMenu}
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </div>
  )
} 