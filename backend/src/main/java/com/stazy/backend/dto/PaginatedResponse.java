package com.stazy.backend.dto;

import java.util.List;

public class PaginatedResponse<T> {
    private List<T> items;
    private int currentPage;
    private int totalPages;
    private long totalItems;

    public PaginatedResponse(List<T> items, int currentPage, int totalPages, long totalItems) {
        this.items = items;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
    }

    public List<T> getItems() {
        return items;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public long getTotalItems() {
        return totalItems;
    }
} 