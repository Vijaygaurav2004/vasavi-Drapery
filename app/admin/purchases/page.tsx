"use client";

import { useState, useEffect } from "react";
import { UserPurchase } from "@/lib/supabase/orders";
import { supabase } from "@/lib/supabase/config";
import Link from "next/link";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Search, ArrowLeft } from "lucide-react";

export default function AdminPurchasesPage() {
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchAllPurchases();
  }, []);

  const fetchAllPurchases = async () => {
    try {
      setLoading(true);
      
      // Direct Supabase query to get all purchase records
      const { data, error } = await supabase
        .from('user_purchases')
        .select('*')
        .order('purchase_date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setPurchases(data || []);
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      toast({
        title: "Error",
        description: "Failed to load purchase history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter purchases based on search term
  const filteredPurchases = purchases.filter(purchase => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      purchase.user_email.toLowerCase().includes(searchTermLower) ||
      purchase.user_name.toLowerCase().includes(searchTermLower) ||
      purchase.product_name.toLowerCase().includes(searchTermLower) ||
      purchase.razorpay_order_id.toLowerCase().includes(searchTermLower)
    );
  });

  // Export data as CSV
  const exportToCSV = () => {
    // Create CSV content
    const headers = [
      "Purchase ID",
      "User Email",
      "User Name",
      "Product Name",
      "Price",
      "Quantity",
      "Total",
      "Order ID",
      "Purchase Date",
      "Status"
    ];
    
    const csvContent = [
      headers.join(","),
      ...filteredPurchases.map(purchase => [
        purchase.id,
        `"${purchase.user_email}"`,
        `"${purchase.user_name}"`,
        `"${purchase.product_name}"`,
        purchase.product_price,
        purchase.quantity,
        purchase.product_price * purchase.quantity,
        purchase.razorpay_order_id,
        purchase.purchase_date ? format(new Date(purchase.purchase_date), "yyyy-MM-dd") : "",
        purchase.status
      ].join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `purchases-${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground/70">Loading purchase history...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 py-10">
      <div className="container">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Purchase History</h1>
            <p className="text-foreground/70 mt-1">
              View and manage all customer purchases
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
            <Input
              placeholder="Search by email, name, product, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-foreground/70">
                    No purchase records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{purchase.user_name}</p>
                        <p className="text-sm text-foreground/70">{purchase.user_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/product/${purchase.product_id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {purchase.product_name}
                      </Link>
                      {purchase.color_name && (
                        <p className="text-xs text-foreground/70">
                          Color: {purchase.color_name}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{purchase.product_price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {purchase.quantity}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{(purchase.product_price * purchase.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs">{purchase.razorpay_order_id}</span>
                    </TableCell>
                    <TableCell>
                      {purchase.purchase_date
                        ? format(new Date(purchase.purchase_date), "MMM d, yyyy")
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {purchase.status || "Completed"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
} 