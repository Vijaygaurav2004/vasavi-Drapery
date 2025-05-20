"use client"

import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="bg-background p-4 border-b shadow-sm">
        <div className="container flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Link href="/" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                View Store
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="pt-4 pb-12">
        {children}
      </div>
    </div>
  )
} 