"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SubMenu = {
  label: string;
  items: { label: string; href: string }[];
}

type MenuItem = {
  label: string;
  href: string;
  submenu?: SubMenu;
}

// Define menu structure
const menuItems: MenuItem[] = [
  { label: "HOME", href: "/" },
  { 
    label: "COLLECTIONS", 
    href: "/collections",
    submenu: {
      label: "Collections",
      items: [
        { label: "Women's Collection", href: "/collections/women" },
        { label: "Men's Collection", href: "/collections/men" },
        { label: "View All", href: "/collections" },
      ]
    }
  },
  { label: "OUR STORY", href: "/about" },
  { label: "CONTACT", href: "/contact" },
  { label: "WISHLIST", href: "/wishlist" },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleSubmenu = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label)
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
    setExpandedItem(null)
  }, [])

  return (
    <div className="md:hidden" id="mobile-menu-container">
      <button 
        className="p-2 text-foreground hover:text-primary transition-colors" 
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[80px] bg-white/95 backdrop-blur-sm shadow-lg border-t border-primary/10 z-50"
          >
            <nav className="container mx-auto py-6 px-4 flex flex-col gap-1">
              {menuItems.map((item) => (
                <div key={item.label} className="border-b border-primary/10 last:border-0">
                  {item.submenu ? (
                    <div>
                      <button 
                        onClick={() => toggleSubmenu(item.label)}
                        className="flex w-full items-center justify-between py-4 text-foreground hover:text-primary"
                      >
                        <span className="text-base uppercase tracking-wider">{item.label}</span>
                        {expandedItem === item.label ? 
                          <ChevronDown size={18} /> : 
                          <ChevronRight size={18} />
                        }
                      </button>
                      
                      <AnimatePresence>
                        {expandedItem === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gradient-subtle"
                          >
                            <div className="py-2 pl-4 pr-2 space-y-1">
                              {item.submenu.items.map((subItem) => (
                                <Link 
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="block py-3 px-2 text-sm text-foreground/80 hover:text-primary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link 
                      href={item.href}
                      className="block py-4 text-base uppercase tracking-wider text-foreground hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              
              {/* Contact Info */}
              <div className="mt-6 text-center text-sm text-foreground/70">
                <p>
                  <a href="mailto:vasthrikabyvasavi@gmail.com" className="hover:text-primary">vasthrikabyvasavi@gmail.com</a>
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}