"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
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
      label: "Categories",
      items: [
        { label: "Women's Collection", href: "/collections/women" },
        { label: "Men's Collection", href: "/collections/men" },
        { label: "Sarees", href: "/collections/sarees" },
        { label: "Dhothi", href: "/collections/dhothi" },
        { label: "Fabric", href: "/collections/fabric" },
      ]
    }
  },
  { label: "OUR STORY", href: "/about" },
  { label: "CONTACT", href: "/contact" }
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

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
              
              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-primary/10">
                <div className="flex justify-center space-x-6">
                  <a 
                    href="#" 
                    className="text-foreground/70 hover:text-primary transition-colors" 
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="text-foreground/70 hover:text-primary transition-colors" 
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="text-foreground/70 hover:text-primary transition-colors" 
                    aria-label="Pinterest"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12l4 0v4q0 4 4 4q4 0.5 4 -3.5"/><circle cx="12" cy="12" r="10"/><path d="M9 15c-.736 2.067 -1.52 3.435 -2.5 3.5c-1 0 -1.5 -1 -1.5 -3q-0.5 -6 2 -9l2 -1l1 2q-0.5 7 3 7c3.5 0 0.5 -9 0.5 -9"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="text-foreground/70 hover:text-primary transition-colors" 
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="mt-6 text-center text-sm text-foreground/70">
                <p className="mb-1">
                  <a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a>
                </p>
                <p>
                  <a href="mailto:info@vasthrika.com" className="hover:text-primary">info@vasthrika.com</a>
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}