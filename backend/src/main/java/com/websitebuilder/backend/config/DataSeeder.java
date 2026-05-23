package com.websitebuilder.backend.config;

import com.websitebuilder.backend.model.User;
import com.websitebuilder.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@lumina.build").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@lumina.build");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRoles(Set.of("ADMIN", "USER"));
            userRepository.save(admin);
            System.out.println("Seeded Admin User: admin@lumina.build / admin123");
        }

        if (userRepository.findByEmail("user@lumina.build").isEmpty()) {
            User user = new User();
            user.setEmail("user@lumina.build");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRoles(Set.of("USER"));
            userRepository.save(user);
            System.out.println("Seeded Standard User: user@lumina.build / user123");
        }
    }
}
