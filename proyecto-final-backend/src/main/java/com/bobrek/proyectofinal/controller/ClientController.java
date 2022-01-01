package com.bobrek.proyectofinal.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.bobrek.proyectofinal.model.Client;
import com.bobrek.proyectofinal.repository.ClientRepository;

@RestController
@RequestMapping("/api/v1/")
public class ClientController {

	@Autowired
	private ClientRepository clientRepository;

	// Get all clients
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/clients")
	public List<Client> getAllClients() {
		return clientRepository.findAll();
	}

	// Create client
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/clients")
	public Client createClient(@RequestBody Client client) {
		return clientRepository.save(client);
	}

	// Get client by id
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/clients/{id}")
	public ResponseEntity<Client> getClientById(@PathVariable Long id) {
		return ResponseEntity
				.ok(clientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Client not exist")));
	}

	// Get client by email and password\
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/clients/login")
	public ResponseEntity<Map<String, Boolean>> getClientByEmailEqualsAndPasswordEquals(@RequestBody Client client) {
		Client c = clientRepository.findByEmailAndPassword(client.getEmail(), client.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Client not exist"));
		Map<String, Boolean> response = new HashMap<>();
		response.put("client", true);
		return ResponseEntity.ok(response);
	}

	// Update client
	@CrossOrigin(origins = "http://localhost:8100")
	@PutMapping("/clients/{id}")
	public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client newclient) {
		Client client = clientRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Client not exist"));
		client.setFirstName(newclient.getFirstName());
		client.setLastName(newclient.getLastName());
		client.setEmail(newclient.getEmail());
		return ResponseEntity.ok(clientRepository.save(client));
	}
}
