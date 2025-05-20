-- List all products in the database to find one to add variants to
SELECT id, name, has_color_variants 
FROM products
ORDER BY created_at DESC
LIMIT 10;

-- AFTER FINDING A PRODUCT ID, uncomment and edit one of these examples:

-- Example 1: For a product with ID 'd290f1ee-6c54-4b01-90e6-d701748f0851'
-- UPDATE products
-- SET 
--     has_color_variants = TRUE,
--     color_variants = '[
--         {
--             "color": "Red",
--             "images": [
--                 "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1000&auto=format&fit=crop",
--                 "https://images.unsplash.com/photo-1621997247670-24e2ee4ee488?q=80&w=1000&auto=format&fit=crop"
--             ],
--             "stock": 5
--         },
--         {
--             "color": "Blue",
--             "images": [
--                 "https://images.unsplash.com/photo-1529374814797-de52885a0249?q=80&w=1000&auto=format&fit=crop",
--                 "https://images.unsplash.com/photo-1577455944840-19a2b66be9b7?q=80&w=1000&auto=format&fit=crop"
--             ],
--             "stock": 8
--         },
--         {
--             "color": "Green",
--             "images": [
--                 "https://images.unsplash.com/photo-1592295876781-ea6fe0ca5ce7?q=80&w=1000&auto=format&fit=crop",
--                 "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=1000&auto=format&fit=crop"
--             ],
--             "stock": 3
--         }
--     ]'::JSONB
-- WHERE id = 'd290f1ee-6c54-4b01-90e6-d701748f0851';  -- Replace with your product ID

-- Example 2: Simpler, with fewer images
-- UPDATE products
-- SET 
--     has_color_variants = TRUE,
--     color_variants = '[
--         {"color": "Red", "images": ["https://example.com/red1.jpg"], "stock": 5},
--         {"color": "Blue", "images": ["https://example.com/blue1.jpg"], "stock": 8},
--         {"color": "Green", "images": ["https://example.com/green1.jpg"], "stock": 3}
--     ]'::JSONB
-- WHERE id = 'd290f1ee-6c54-4b01-90e6-d701748f0851';  -- Replace with your product ID 