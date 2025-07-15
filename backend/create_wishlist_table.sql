-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlists (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    property_id BIGINT,
    service_id BIGINT,
    experience_id BIGINT,
    item_type VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraints
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES service_offers(id) ON DELETE CASCADE,
    FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE,
    
    -- Ensure only one entity reference is set
    CONSTRAINT check_entity_reference CHECK (
        (property_id IS NOT NULL AND service_id IS NULL AND experience_id IS NULL) OR
        (property_id IS NULL AND service_id IS NOT NULL AND experience_id IS NULL) OR
        (property_id IS NULL AND service_id IS NULL AND experience_id IS NOT NULL)
    ),
    
    -- Ensure unique combinations of user and entity
    UNIQUE KEY unique_user_property (user_id, property_id),
    UNIQUE KEY unique_user_service (user_id, service_id),
    UNIQUE KEY unique_user_experience (user_id, experience_id)
);

-- Create indexes for better performance
CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX idx_wishlists_property_id ON wishlists(property_id);
CREATE INDEX idx_wishlists_service_id ON wishlists(service_id);
CREATE INDEX idx_wishlists_experience_id ON wishlists(experience_id);
CREATE INDEX idx_wishlists_item_type ON wishlists(item_type); 