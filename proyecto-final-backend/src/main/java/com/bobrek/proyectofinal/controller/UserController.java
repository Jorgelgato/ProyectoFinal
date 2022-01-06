package com.bobrek.proyectofinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bobrek.proyectofinal.exception.ResourceNotFoundException;
import com.bobrek.proyectofinal.model.User;
import com.bobrek.proyectofinal.repository.UserRepository;

@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserRepository clientRepository;

	// Get all users
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/user")
	public List<User> getAllClients() {
		return clientRepository.findAll();
	}

	// Create user
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/user")
	public User createClient(@RequestBody User user) {
		return clientRepository.save(user);
	}

	// Get user by id
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getClientById(@PathVariable Long id) {
		return ResponseEntity
				.ok(clientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist")));
	}

	// Get user by email and password\
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/user/login")
	public User getClientByEmail(@RequestBody User user) {
		return clientRepository.findByEmail(user.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("Client not exist"));
	}

	// Update user
	@CrossOrigin(origins = "http://localhost:8100")
	@PutMapping("/user/{id}")
	public ResponseEntity<User> updateClient(@PathVariable Long id, @RequestBody User newuser) {
		User user = clientRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Client not exist"));
		user.setIdType(newuser.getIdType());
		user.setIdNumber(newuser.getIdNumber());
		user.setLastName(newuser.getLastName());
		user.setFirstName(newuser.getFirstName());
		user.setBornDate(newuser.getBornDate());
		user.setEmail(newuser.getEmail());
		user.setPassword(newuser.getPassword());
		user.setActive(newuser.isActive());
		user.setAdmin(newuser.isAdmin());
		return ResponseEntity.ok(clientRepository.save(user));
	}
}
