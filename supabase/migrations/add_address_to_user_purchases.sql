-- Add address column to user_purchases table
ALTER TABLE user_purchases
ADD COLUMN IF NOT EXISTS address TEXT;

-- Comment for the new column
COMMENT ON COLUMN user_purchases.address IS 'Shipping address of the customer for this purchase'; 