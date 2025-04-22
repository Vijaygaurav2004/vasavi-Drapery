"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog"

// Keyboard shortcut badge component
function KbdShortcut({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 font-mono">
      {children}
    </kbd>
  )
}

interface SearchDialogProps {
  children?: React.ReactNode
}

export function SearchDialog({ children }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Handle keyboard shortcut (Ctrl+K or Cmd+K) to open the search dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen((value) => !value)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setOpen(false) // Close the dialog after search
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden rounded-lg shadow-xl border border-primary/10">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-12 bg-white border-b border-amber-200 focus:outline-none focus:border-amber-500 text-base rounded-t-lg"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>
          
          {!searchQuery && (
            <div className="p-4 border-t border-gray-100 text-sm text-gray-500">
              <p className="font-medium text-amber-700 mb-2">Try searching for:</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    setSearchQuery("silk")
                    document.querySelector('form')?.dispatchEvent(
                      new Event('submit', { cancelable: true, bubbles: true })
                    )
                  }}
                  className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs hover:bg-amber-100"
                >
                  Silk
                </button>
                <button 
                  onClick={() => {
                    setSearchQuery("tissue")
                    document.querySelector('form')?.dispatchEvent(
                      new Event('submit', { cancelable: true, bubbles: true })
                    )
                  }}
                  className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs hover:bg-amber-100"
                >
                  Tissue
                </button>
                <button 
                  onClick={() => {
                    setSearchQuery("fabric")
                    document.querySelector('form')?.dispatchEvent(
                      new Event('submit', { cancelable: true, bubbles: true })
                    )
                  }}
                  className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs hover:bg-amber-100"
                >
                  Fabric
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 