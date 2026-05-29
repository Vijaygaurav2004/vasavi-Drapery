"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, ChevronDown, SlidersHorizontal, ArrowRight, Star } from "lucide-react"
import { getProducts } from "@/lib/supabase/products"
import { Product } from "@/types/product"
import ProductCard from "@/components/product-card"

const CATEGORIES = [
  { id: "all",      label: "All Sarees" },
  { id: "silk",     label: "Pure Silk" },
  { id: "tissue",   label: "Tissue" },
  { id: "banarasi", label: "Banarasi" },
  { id: "organza",  label: "Organza" },
  { id: "fabric",   label: "Fabrics" },
]

const OCCASIONS = [
  { id: "bridal",      label: "Bridal" },
  { id: "festive",     label: "Festive" },
  { id: "office",      label: "Office" },
  { id: "traditional", label: "Traditional" },
]

const SORT_OPTIONS = [
  { id: "featured",   label: "Featured" },
  { id: "newest",     label: "Newest First" },
  { id: "price-asc",  label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
]

export default function WomensCollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [sort, setSort]         = useState("featured")
  const [filterCat, setFilterCat]   = useState("all")
  const [priceMax, setPriceMax]     = useState(50000)
  const [filterDrawer, setFilterDrawer] = useState(false)
  const [search, setSearch]     = useState("")

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data.filter(p => p.category !== "men")))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let list = [...products]
    if (filterCat !== "all") {
      list = list.filter(p => p.category?.toLowerCase() === filterCat || p.name.toLowerCase().includes(filterCat))
    }
    if (search) {
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }
    list = list.filter(p => p.price <= priceMax)
    switch (sort) {
      case "newest":     list.sort((a, b) => ((b.id ?? "") > (a.id ?? "") ? 1 : -1)); break
      case "price-asc":  list.sort((a, b) => a.price - b.price); break
      case "price-desc": list.sort((a, b) => b.price - a.price); break
    }
    return list
  }, [products, filterCat, sort, priceMax, search])

  return (
    <div>
      {/* ── Page hero ── */}
      <div className="relative h-[340px] md:h-[440px] overflow-hidden bg-[hsl(var(--charcoal))]">
        <Image src="/1.jpg" alt="Women's Collection" fill className="object-cover opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <p className="overline text-[hsl(var(--gold-light))] mb-4">The Collection</p>
          <h1 className="display-md text-white mb-4">Women's Sarees</h1>
          <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>·</span>
            <span className="text-white/70">Women's Collection</span>
          </div>
        </div>
      </div>

      <div className="page-container py-10 md:py-14">

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-5" style={{ borderBottom: "1px solid hsl(var(--border))" }}>

          {/* Left: category pills */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setFilterCat(c.id)}
                className="text-xs font-medium uppercase tracking-widest px-4 py-2 transition-all duration-200"
                style={{
                  background: filterCat === c.id ? "hsl(var(--foreground))" : "transparent",
                  color: filterCat === c.id ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                  border: `1px solid ${filterCat === c.id ? "hsl(var(--foreground))" : "hsl(var(--border))"}`,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Right: sort + filter btn */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-muted-foreground font-light hidden sm:block">
              {loading ? "Loading..." : `${filtered.length} products`}
            </span>

            {/* Sort dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest px-4 py-2 border border-[hsl(var(--border))] hover:border-foreground transition-colors">
                Sort <ChevronDown size={12} />
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-[hsl(var(--border))] z-20 w-48 hidden group-hover:block shadow-lg">
                {SORT_OPTIONS.map(o => (
                  <button
                    key={o.id}
                    onClick={() => setSort(o.id)}
                    className="block w-full text-left px-4 py-3 text-xs font-light hover:bg-[hsl(var(--muted))] transition-colors"
                    style={{ color: sort === o.id ? "hsl(var(--gold))" : "hsl(var(--foreground))" }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile filter button */}
            <button
              className="md:hidden flex items-center gap-2 text-xs font-medium uppercase tracking-widest px-4 py-2 border border-[hsl(var(--border))]"
              onClick={() => setFilterDrawer(true)}
            >
              <SlidersHorizontal size={14} /> Filter
            </button>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="flex gap-8 lg:gap-12">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[220px] flex-shrink-0">
            <div className="sticky top-[80px] space-y-8">

              {/* Search */}
              <div>
                <p className="form-label mb-3">Search</p>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search sarees..."
                  className="form-input text-sm"
                />
              </div>

              {/* Price */}
              <div>
                <p className="form-label mb-3">Max Price: ₹{priceMax.toLocaleString("en-IN")}</p>
                <input
                  type="range"
                  min={0} max={100000} step={1000}
                  value={priceMax}
                  onChange={e => setPriceMax(+e.target.value)}
                  className="w-full accent-[hsl(var(--gold))]"
                />
              </div>

              {/* Categories */}
              <div>
                <p className="form-label mb-3">Category</p>
                <div className="space-y-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setFilterCat(c.id)}
                      className="flex items-center gap-2 text-sm font-light w-full text-left py-1 transition-colors hover:text-foreground"
                      style={{ color: filterCat === c.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                    >
                      <span
                        className="w-3 h-3 flex-shrink-0 transition-colors"
                        style={{
                          border: "1px solid hsl(var(--border))",
                          background: filterCat === c.id ? "hsl(var(--foreground))" : "transparent",
                        }}
                      />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasions */}
              <div>
                <p className="form-label mb-3">Occasion</p>
                <div className="space-y-2">
                  {OCCASIONS.map(o => (
                    <button
                      key={o.id}
                      className="flex items-center gap-2 text-sm font-light w-full text-left py-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="w-3 h-3 flex-shrink-0 border border-[hsl(var(--border))]" />
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i}>
                    <div className="skeleton aspect-product mb-3" />
                    <div className="skeleton h-4 w-3/4 mb-2" />
                    <div className="skeleton h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="heading-md text-muted-foreground mb-4">No sarees found</p>
                <p className="text-sm text-muted-foreground font-light mb-6">Try adjusting your filters</p>
                <button
                  onClick={() => { setFilterCat("all"); setSearch(""); setPriceMax(50000) }}
                  className="btn-ghost"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.4) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      <AnimatePresence>
        {filterDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setFilterDrawer(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed top-0 right-0 bottom-0 w-[310px] bg-white z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-[hsl(var(--border))]">
                <p className="font-medium uppercase text-xs tracking-widest">Filters</p>
                <button onClick={() => setFilterDrawer(false)}>
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                <div>
                  <p className="form-label mb-3">Category</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setFilterCat(c.id)}
                        className="text-xs font-medium uppercase tracking-wider py-2.5 px-3 text-center transition-all"
                        style={{
                          background: filterCat === c.id ? "hsl(var(--foreground))" : "transparent",
                          color: filterCat === c.id ? "white" : "hsl(var(--muted-foreground))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="form-label mb-3">Max Price: ₹{priceMax.toLocaleString("en-IN")}</p>
                  <input type="range" min={0} max={100000} step={1000} value={priceMax}
                    onChange={e => setPriceMax(+e.target.value)} className="w-full" />
                </div>
              </div>
              <div className="p-5 border-t border-[hsl(var(--border))]">
                <button onClick={() => setFilterDrawer(false)} className="btn-primary w-full justify-center">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
