"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

// Sample gallery images - in a real app, this would come from Instagram API
const galleryImages = [
  {
    id: "1",
    src: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    alt: "Handcrafted silk saree",
    likes: 124,
    caption: "Our artisans at work, creating timeless pieces. #SilkHeritage #Handcrafted"
  },
  {
    id: "2",
    src: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317", 
    alt: "Kanchipuram silk weaving",
    likes: 89,
    caption: "The intricate process of creating gold zari work. #TraditionalCrafts"
  },
  {
    id: "3",
    src: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    alt: "Close-up of silk weaving",
    likes: 156,
    caption: "Every thread tells a story of heritage and tradition. #SilkArtistry"
  },
  {
    id: "4",
    src: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317", 
    alt: "Traditional motifs",
    likes: 102,
    caption: "Our new collection brings ancient motifs to contemporary designs. #ModernHeritage"
  },
  {
    id: "5",
    src: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317", 
    alt: "Silk saree draping",
    likes: 176,
    caption: "The art of draping a traditional silk saree. #SilkElegance #Tradition"
  },
  {
    id: "6",
    src: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317", 
    alt: "Silk yarn dyeing",
    likes: 95,
    caption: "The natural dyeing process creates our signature rich colors. #SustainableFashion"
  }
]

export default function ImageGallery() {
  const [activeImage, setActiveImage] = useState<null | string>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const openModal = (id: string) => {
    setActiveImage(id)
    document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
  }

  const closeModal = () => {
    setActiveImage(null)
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  // Close modal when clicking outside of image
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (activeImage) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeImage])

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (activeImage) {
      document.addEventListener('keydown', handleEscKey)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [activeImage])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      } 
    }
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {galleryImages.map((image) => (
          <motion.div 
            key={image.id} 
            className="relative aspect-square overflow-hidden cursor-pointer group"
            variants={item}
            onClick={() => openModal(image.id)}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <Instagram className="text-white mb-2" size={24} />
                <p className="text-white text-xs text-center line-clamp-2 font-medium">{image.caption}</p>
                <p className="text-white/80 text-xs mt-2">{image.likes} likes</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4">
            <button 
              onClick={closeModal}
              className="text-white hover:text-primary transition-colors p-2"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div 
            ref={modalRef}
            className="bg-white rounded-md overflow-hidden max-w-2xl w-full shadow-xl"
          >
            <div className="relative aspect-square">
              <Image
                src={galleryImages.find(img => img.id === activeImage)?.src || ''}
                alt={galleryImages.find(img => img.id === activeImage)?.alt || ''}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <Instagram size={16} className="text-primary" />
                  </div>
                  <span className="font-medium">vasthrikasilks</span>
                </div>
                <div className="flex items-center text-sm text-foreground/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <span>{galleryImages.find(img => img.id === activeImage)?.likes}</span>
                </div>
              </div>
              <p className="text-sm">
                {galleryImages.find(img => img.id === activeImage)?.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}