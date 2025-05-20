-- Simple script to ensure color variant columns exist
DO $$
BEGIN
    -- Add has_color_variants column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'has_color_variants'
    ) THEN
        ALTER TABLE products ADD COLUMN has_color_variants BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Added has_color_variants column';
    ELSE
        RAISE NOTICE 'has_color_variants column already exists';
    END IF;

    -- Add color_variants column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'color_variants'
    ) THEN
        ALTER TABLE products ADD COLUMN color_variants JSONB DEFAULT '[]'::JSONB;
        RAISE NOTICE 'Added color_variants column';
    ELSE
        RAISE NOTICE 'color_variants column already exists';
    END IF;
    
    -- If color_variants exists but as TEXT type, convert it to JSONB
    IF EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'color_variants' 
        AND data_type <> 'jsonb'
    ) THEN
        RAISE NOTICE 'Converting color_variants to JSONB type';
        -- Create a temporary column
        ALTER TABLE products ADD COLUMN color_variants_new JSONB DEFAULT '[]'::JSONB;
        
        -- Try to update from the existing column if possible
        BEGIN
            UPDATE products
            SET color_variants_new = 
                CASE 
                    WHEN color_variants IS NULL THEN '[]'::JSONB
                    WHEN color_variants::text = '' THEN '[]'::JSONB
                    ELSE color_variants::JSONB
                END;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Could not convert existing data, using empty arrays';
        END;
        
        -- Drop the old column and rename the new one
        ALTER TABLE products DROP COLUMN color_variants;
        ALTER TABLE products RENAME COLUMN color_variants_new TO color_variants;
        RAISE NOTICE 'Converted column to JSONB type';
    END IF;
    
    RAISE NOTICE 'Column setup complete';
END$$; 