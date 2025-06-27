package com.stazy.backend.exception;

public class PropertyException extends RuntimeException {

    public PropertyException(String message) {
        super(message);
    }

    public PropertyException(String message, Throwable cause) {
        super(message, cause);
    }
}