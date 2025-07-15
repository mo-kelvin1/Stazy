-- Fix bookings table to support multiple entity types
-- Run this script manually in your PostgreSQL database

-- Step 1: Make property_id nullable
ALTER TABLE bookings ALTER COLUMN property_id DROP NOT NULL;

-- Step 2: Add new columns for service and experience bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS experience_id BIGINT;

-- Step 3: Add foreign key constraints (if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'fk_bookings_service') THEN
        ALTER TABLE bookings ADD CONSTRAINT fk_bookings_service 
            FOREIGN KEY (service_id) REFERENCES service_offers(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'fk_bookings_experience') THEN
        ALTER TABLE bookings ADD CONSTRAINT fk_bookings_experience 
            FOREIGN KEY (experience_id) REFERENCES experiences(id);
    END IF;
END $$;

-- Step 4: Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_experience_id ON bookings(experience_id);
CREATE INDEX IF NOT EXISTS idx_bookings_type ON bookings(booking_type);

-- Step 5: Verify the changes
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
ORDER BY ordinal_position; 