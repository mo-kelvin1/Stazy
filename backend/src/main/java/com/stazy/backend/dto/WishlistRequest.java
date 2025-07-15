package com.stazy.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WishlistRequest {
    private Long entityId;
    private String itemType; // "PROPERTY", "SERVICE", "EXPERIENCE"
    private String notes;
}