-- Automatically find a product and add color variants
DO $$
DECLARE
    product_id UUID;
BEGIN
    -- Get the first product ID from the database
    SELECT id INTO product_id FROM products LIMIT 1;
    
    IF product_id IS NULL THEN
        RAISE EXCEPTION 'No products found in the database.';
        RETURN;
    END IF;
    
    RAISE NOTICE 'Found product ID: %', product_id;
    RAISE NOTICE 'Adding color variants to this product...';
    
    -- Clear any existing color variants
    UPDATE products
    SET 
        color_variants = '[]'::JSONB,
        has_color_variants = TRUE
    WHERE id = product_id;
    
    -- Add Red variant
    WITH variant AS (
        SELECT jsonb_build_object(
            'color', 'Red',
            'images', jsonb_build_array(
                'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1621997247670-24e2ee4ee488?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1000&auto=format&fit=crop'
            ),
            'stock', 5
        ) as red_variant
    )
    UPDATE products
    SET color_variants = color_variants || (SELECT red_variant FROM variant)
    WHERE id = product_id;
    
    -- Add Blue variant
    WITH variant AS (
        SELECT jsonb_build_object(
            'color', 'Blue',
            'images', jsonb_build_array(
                'https://images.unsplash.com/photo-1529374814797-de52885a0249?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1577455944840-19a2b66be9b7?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1604928141064-207cea5062db?q=80&w=1000&auto=format&fit=crop'
            ),
            'stock', 8
        ) as blue_variant
    )
    UPDATE products
    SET color_variants = color_variants || (SELECT blue_variant FROM variant)
    WHERE id = product_id;
    
    -- Add Green variant
    WITH variant AS (
        SELECT jsonb_build_object(
            'color', 'Green',
            'images', jsonb_build_array(
                'https://images.unsplash.com/photo-1592295876781-ea6fe0ca5ce7?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=1000&auto=format&fit=crop'
            ),
            'stock', 3
        ) as green_variant
    )
    UPDATE products
    SET color_variants = color_variants || (SELECT green_variant FROM variant)
    WHERE id = product_id;
    
    RAISE NOTICE 'Color variants added successfully!';
    RAISE NOTICE 'IMPORTANT: Navigate to this URL to test color variants:';
    RAISE NOTICE '/product/%', product_id;
END $$; 