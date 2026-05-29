"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Home",        href: "/" },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "Tissue Sarees", href: "/collections/women?cat=tissue" },
      { label: "Silk Sarees",   href: "/collections/women?cat=silk" },
      { label: "Fabrics",       href: "/collections/women?cat=fabric" },
    ],
  },
  { label: "Bridal",    href: "/collections/women?occ=bridal" },
  { label: "Festive",   href: "/collections/women?occ=festive" },
  { label: "Our Story", href: "/about" },
  { label: "Contact",   href: "/contact" },
  { label: "Wishlist",  href: "/wishlist" },
]

export default function MobileMenu() {
  const [open, setOpen]         = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Toggle menu"
        className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-[hsl(var(--border))]">
                <div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", letterSpacing: "0.2em", fontWeight: 300 }} className="uppercase">
                    Vasthrika
                  </span>
                </div>
                <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center text-foreground/60 hover:text-foreground">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto py-4 px-6">
                {navItems.map(item => (
                  <div key={item.label} className="border-b border-[hsl(0_0%_94%)] last:border-0">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                          className="flex w-full items-center justify-between py-4 text-sm font-light"
                        >
                          {item.label}
                          <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 pl-3 space-y-0.5">
                                {item.children.map(c => (
                                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                                    className="block py-2.5 text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                                    {c.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={item.href} onClick={() => setOpen(false)}
                        className="flex py-4 text-sm font-light text-foreground hover:text-[hsl(var(--gold))] transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-[hsl(var(--border))]">
                <a href="mailto:vasthrikabyvasavi@gmail.com" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors">
                  vasthrikabyvasavi@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
