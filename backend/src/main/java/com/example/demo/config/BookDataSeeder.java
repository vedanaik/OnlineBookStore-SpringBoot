package com.example.demo.config;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class BookDataSeeder {

    @Bean
    CommandLineRunner seedBooks(BookRepository bookRepository) {
        return args -> {
            if (bookRepository.count() > 0) {
                return;
            }

            bookRepository.saveAll(List.of(
                new Book(
                    "The Midnight Library",
                    "Matt Haig",
                    16.99,
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
                ),
                new Book(
                    "Atomic Habits",
                    "James Clear",
                    18.50,
                    "https://images.unsplash.com/photo-1589993360482-2d9b8b0f9f26?auto=format&fit=crop&w=600&q=80"
                ),
                new Book(
                    "The Alchemist",
                    "Paulo Coelho",
                    14.25,
                    "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&q=80"
                ),
                new Book(
                    "Educated",
                    "Tara Westover",
                    17.75,
                    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
                ),
                new Book(
                    "The Design of Everyday Things",
                    "Don Norman",
                    22.00,
                    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
                )
            ));
        };
    }
}
