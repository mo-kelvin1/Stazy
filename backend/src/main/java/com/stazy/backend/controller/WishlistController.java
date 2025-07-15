package com.stazy.backend.controller;

import com.stazy.backend.dto.WishlistRequest;
import com.stazy.backend.dto.WishlistResponse;
import com.stazy.backend.dto.ApiResponse;
import com.stazy.backend.model.Wishlist;
import com.stazy.backend.service.WishlistService;
import com.stazy.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(@RequestBody WishlistRequest request,
            @RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            Wishlist wishlist = wishlistService.addToWishlist(request, userEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Item added to wishlist successfully",
                    WishlistResponse.fromWishlist(wishlist)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFromWishlist(@RequestParam Long entityId,
            @RequestParam String itemType,
            @RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            wishlistService.removeFromWishlist(entityId, itemType, userEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Item removed from wishlist successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/items")
    public ResponseEntity<?> getUserWishlist(@RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            List<Wishlist> wishlistItems = wishlistService.getUserWishlist(userEmail);
            List<WishlistResponse> responses = wishlistItems.stream()
                    .map(WishlistResponse::fromWishlist)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new ApiResponse(true, "Wishlist retrieved successfully", responses));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<?> getWishlistCount(@RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            Long count = wishlistService.getWishlistCount(userEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Wishlist count retrieved successfully", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkWishlistStatus(@RequestParam Long entityId,
            @RequestParam String itemType,
            @RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            String userEmail = jwtUtil.getEmailFromToken(token);
            boolean isInWishlist = wishlistService.isInWishlist(entityId, itemType, userEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Wishlist status checked successfully", isInWishlist));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}