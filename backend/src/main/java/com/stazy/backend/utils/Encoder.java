package com.stazy.backend.utils;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class Encoder {

    private static final int ITERATIONS = 65536;
    private static final int KEY_LENGTH = 256;
    private static final String ALGORITHM = "PBKDF2WithHmacSHA256";

    // Generate a secure random salt
    public String generateSalt() {
        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    // Hash the password using PBKDF2
    public String hashPassword(String rawPassword, String salt) {
        try {
            PBEKeySpec spec = new PBEKeySpec(rawPassword.toCharArray(), Base64.getDecoder().decode(salt), ITERATIONS,
                    KEY_LENGTH);
            SecretKeyFactory factory = SecretKeyFactory.getInstance(ALGORITHM);
            byte[] hash = factory.generateSecret(spec).getEncoded();
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Password hashing failed", e);
        }
    }

    // Compare raw password with stored hash and salt
    public boolean matches(String rawPassword, String storedHash, String salt) {
        String newHash = hashPassword(rawPassword, salt);
        return storedHash.equals(newHash);
    }
}
