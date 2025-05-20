"use client"

import React from 'react'
import Link from 'next/link'
import { Layers, Package, ShoppingBag, Users, MessageSquare, Settings } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/products">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-6 w-6 mr-2 text-primary" />
                Products
              </CardTitle>
              <CardDescription>Manage products and inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Add, edit, or remove products from your store.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/orders">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
                Orders
              </CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Process orders, update status, and view order history.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/categories">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="h-6 w-6 mr-2 text-primary" />
                Categories
              </CardTitle>
              <CardDescription>Manage product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Create, edit, or delete product categories.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/customers">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-primary" />
                Customers
              </CardTitle>
              <CardDescription>View customer information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Access customer profiles and purchase history.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/messages">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                Messages
              </CardTitle>
              <CardDescription>Customer inquiries and contact forms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">View and respond to messages from your contact form.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-6 w-6 mr-2 text-primary" />
                Settings
              </CardTitle>
              <CardDescription>Configure store settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Adjust store settings and preferences.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
} 