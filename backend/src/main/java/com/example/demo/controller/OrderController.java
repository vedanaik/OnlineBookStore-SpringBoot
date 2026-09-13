package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        Optional<User> optionalUser = userRepository.findById(request.getUserId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = optionalUser.get();
        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Optional<Book> optionalBook = bookRepository.findById(itemRequest.getBookId());
            if (optionalBook.isEmpty()) {
                return ResponseEntity.badRequest().body("Book not found: " + itemRequest.getBookId());
            }

            Book book = optionalBook.get();
            OrderItem item = new OrderItem();
            item.setBook(book);
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(book.getPrice());
            item.setOrder(order);
            items.add(item);
            total += book.getPrice() * itemRequest.getQuantity();
        }

        order.setItems(items);
        order.setTotalPrice(total);

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        return ResponseEntity.ok(orderRepository.findByUser(optionalUser.get()));
    }

    public static class OrderRequest {
        private Long userId;
        private List<OrderItemRequest> items;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public List<OrderItemRequest> getItems() {
            return items;
        }

        public void setItems(List<OrderItemRequest> items) {
            this.items = items;
        }
    }

    public static class OrderItemRequest {
        private Long bookId;
        private int quantity;

        public Long getBookId() {
            return bookId;
        }

        public void setBookId(Long bookId) {
            this.bookId = bookId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
