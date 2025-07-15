-- Add host_id column to bookings table
ALTER TABLE bookings ADD COLUMN host_id BIGINT NOT NULL DEFAULT 0;

-- Update host_id for property bookings
UPDATE bookings 
SET host_id = (
    SELECT u.id 
    FROM users u 
    WHERE u.email = (
        SELECT p.host_email 
        FROM properties p 
        WHERE p.id = bookings.property_id
    )
)
WHERE bookings.property_id IS NOT NULL;

-- Update host_id for service bookings
UPDATE bookings 
SET host_id = (
    SELECT u.id 
    FROM users u 
    WHERE u.email = (
        SELECT s.provider_email 
        FROM service_offers s 
        WHERE s.id = bookings.service_id
    )
)
WHERE bookings.service_id IS NOT NULL;

-- Update host_id for experience bookings
UPDATE bookings 
SET host_id = (
    SELECT u.id 
    FROM users u 
    WHERE u.email = (
        SELECT e.host_email 
        FROM experiences e 
        WHERE e.id = bookings.experience_id
    )
)
WHERE bookings.experience_id IS NOT NULL;

-- Add foreign key constraint
ALTER TABLE bookings ADD CONSTRAINT fk_bookings_host_id FOREIGN KEY (host_id) REFERENCES users(id);

-- Remove the default value constraint
ALTER TABLE bookings ALTER COLUMN host_id DROP DEFAULT; 