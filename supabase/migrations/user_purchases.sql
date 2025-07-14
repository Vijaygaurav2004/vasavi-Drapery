-- Create user_purchases table to track detailed purchase history
CREATE TABLE IF NOT EXISTS user_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  color_name TEXT,
  color_code TEXT,
  order_id UUID NOT NULL,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'completed'
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_email ON user_purchases(user_email);
CREATE INDEX IF NOT EXISTS idx_user_purchases_product_id ON user_purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_order_id ON user_purchases(order_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_razorpay_order_id ON user_purchases(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_purchase_date ON user_purchases(purchase_date);

-- Add foreign key constraint to orders table
ALTER TABLE user_purchases 
ADD CONSTRAINT fk_user_purchases_order_id 
FOREIGN KEY (order_id) 
REFERENCES orders(id) 
ON DELETE CASCADE;
