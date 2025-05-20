-- Ensure products table has the necessary columns for color variants
DO $$
BEGIN
    -- Check if hasColorVariants column exists, if not add it
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'has_color_variants'
    ) THEN
        ALTER TABLE products ADD COLUMN has_color_variants BOOLEAN DEFAULT FALSE;
    END IF;

    -- Check if colorVariants column exists, if not add it as JSONB
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'color_variants'
    ) THEN
        ALTER TABLE products ADD COLUMN color_variants JSONB DEFAULT '[]'::JSONB;
    END IF;
    
    -- If color_variants exists but as TEXT type, convert it to JSONB
    IF EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'color_variants' 
        AND data_type = 'text'
    ) THEN
        -- Create a temporary column
        ALTER TABLE products ADD COLUMN color_variants_jsonb JSONB DEFAULT '[]'::JSONB;
        
        -- Update the new column with parsed JSON from text column
        UPDATE products
        SET color_variants_jsonb = 
            CASE 
                WHEN color_variants IS NULL THEN '[]'::JSONB
                WHEN color_variants = '' THEN '[]'::JSONB
                ELSE color_variants::JSONB
            END;
        
        -- Drop the old column and rename the new one
        ALTER TABLE products DROP COLUMN color_variants;
        ALTER TABLE products RENAME COLUMN color_variants_jsonb TO color_variants;
    END IF;
END$$;

-- Make sure column names follow Supabase conventions (snake_case)
DO $$
BEGIN
    -- Rename hasColorVariants to has_color_variants if it exists
    IF EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'hascolorvariants'
    ) THEN
        ALTER TABLE products RENAME COLUMN hascolorvariants TO has_color_variants;
    END IF;
    
    -- Rename colorVariants to color_variants if it exists
    IF EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'colorvariants'
    ) THEN
        ALTER TABLE products RENAME COLUMN colorvariants TO color_variants;
    END IF;
END$$;

-- Create functions to help manage color variants
CREATE OR REPLACE FUNCTION add_color_variant(
    product_id UUID,
    color TEXT,
    images JSONB,
    stock INTEGER
) RETURNS JSONB AS $$
DECLARE
    current_variants JSONB;
    new_variant JSONB;
BEGIN
    -- Get current variants
    SELECT color_variants INTO current_variants FROM products WHERE id = product_id;
    
    -- If null, initialize as empty array
    IF current_variants IS NULL THEN
        current_variants := '[]'::JSONB;
    END IF;
    
    -- Create new variant JSON
    new_variant := jsonb_build_object(
        'color', color,
        'images', images,
        'stock', stock
    );
    
    -- Add to array
    current_variants := current_variants || new_variant;
    
    -- Update product
    UPDATE products 
    SET 
        color_variants = current_variants,
        has_color_variants = TRUE
    WHERE id = product_id;
    
    -- Return updated variants
    RETURN current_variants;
END;
$$ LANGUAGE plpgsql;

-- Function to update a specific color variant
CREATE OR REPLACE FUNCTION update_color_variant(
    product_id UUID,
    variant_index INTEGER,
    color TEXT DEFAULT NULL,
    images JSONB DEFAULT NULL,
    stock INTEGER DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
    current_variants JSONB;
    variant_to_update JSONB;
BEGIN
    -- Get current variants
    SELECT color_variants INTO current_variants FROM products WHERE id = product_id;
    
    -- Validate variant exists
    IF current_variants IS NULL OR jsonb_array_length(current_variants) <= variant_index THEN
        RAISE EXCEPTION 'Variant index out of bounds';
    END IF;
    
    -- Get the variant to update
    variant_to_update := current_variants->variant_index;
    
    -- Update fields if provided
    IF color IS NOT NULL THEN
        variant_to_update := jsonb_set(variant_to_update, '{color}', to_jsonb(color));
    END IF;
    
    IF images IS NOT NULL THEN
        variant_to_update := jsonb_set(variant_to_update, '{images}', images);
    END IF;
    
    IF stock IS NOT NULL THEN
        variant_to_update := jsonb_set(variant_to_update, '{stock}', to_jsonb(stock));
    END IF;
    
    -- Update the array
    current_variants := jsonb_set(current_variants, ARRAY[variant_index::text], variant_to_update);
    
    -- Update product
    UPDATE products SET color_variants = current_variants WHERE id = product_id;
    
    -- Return updated variants
    RETURN current_variants;
END;
$$ LANGUAGE plpgsql;

-- Function to remove a color variant
CREATE OR REPLACE FUNCTION remove_color_variant(
    product_id UUID,
    variant_index INTEGER
) RETURNS JSONB AS $$
DECLARE
    current_variants JSONB;
    result_variants JSONB;
BEGIN
    -- Get current variants
    SELECT color_variants INTO current_variants FROM products WHERE id = product_id;
    
    -- Validate variant exists
    IF current_variants IS NULL OR jsonb_array_length(current_variants) <= variant_index THEN
        RAISE EXCEPTION 'Variant index out of bounds';
    END IF;
    
    -- Initialize result array
    result_variants := '[]'::JSONB;
    
    -- Build new array excluding the specified index
    FOR i IN 0..jsonb_array_length(current_variants)-1 LOOP
        IF i != variant_index THEN
            result_variants := result_variants || current_variants->i;
        END IF;
    END LOOP;
    
    -- Update product
    UPDATE products SET 
        color_variants = result_variants,
        has_color_variants = jsonb_array_length(result_variants) > 0
    WHERE id = product_id;
    
    -- Return updated variants
    RETURN result_variants;
END;
$$ LANGUAGE plpgsql;

-- Example usage:
-- SELECT add_color_variant('your-product-id', 'Red', '["image1.jpg", "image2.jpg"]'::jsonb, 10);
-- SELECT update_color_variant('your-product-id', 0, 'Blue', NULL, 5);
-- SELECT remove_color_variant('your-product-id', 0); 