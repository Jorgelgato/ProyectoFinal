package com.bobrek.proyectofinal.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.bobrek.proyectofinal.model.Account;
import com.bobrek.proyectofinal.repository.AccountRepository;

@RestController
@RequestMapping("/api/v1/")
public class AccountController {

	@Autowired
	private AccountRepository accountRepository;

	// Get all accounts
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/account")
	public List<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	// Get account by id
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/account/{id}")
	public ResponseEntity<Account> getClientById(@PathVariable Long id) {
		return ResponseEntity
				.ok(accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account not exist")));
	}

	// Create account
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/account")
	public Account createAccount(@RequestBody Account account) {
		return accountRepository.save(account);
	}

	// Get accounts by client id
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/account/user/{id}")
	public List<Account> getAccountsByClientId(@PathVariable Long id) {
		return accountRepository.findClientAccounts(id);
	}

	// Account add amount
	@CrossOrigin(origins = "http://localhost:8100")
	@PutMapping("/account/add")
	public ResponseEntity<Account> addAmount(@RequestBody Account account) {
		Account acc = accountRepository.findById(account.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Account not exist"));
		acc.setAmount(acc.getAmount() + account.getAmount());
		return ResponseEntity.ok(accountRepository.save(acc));
	}

	// Account subtract amount
	@CrossOrigin(origins = "http://localhost:8100")
	@PutMapping("/account/subtract")
	public ResponseEntity<Account> subtractAmount(@RequestBody Account account) {
		Account acc = accountRepository.findById(account.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Account not exist"));
		if (acc.getAmount() - account.getAmount() < 0) {
			return new ResponseEntity<Account>(HttpStatus.BAD_REQUEST);
		}
		acc.setAmount(acc.getAmount() - account.getAmount());
		return ResponseEntity.ok(accountRepository.save(acc));
	}
	

	// Cancel account
	@CrossOrigin(origins = "http://localhost:8100")
	@PutMapping("/account/status")
	public ResponseEntity<Account> cancelAmount(@RequestBody Account account) {
		Account acc = accountRepository.findById(account.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Account not exist"));
		acc.setStatus(account.getStatus());
		return ResponseEntity.ok(accountRepository.save(acc));
	}
	

	// Account types
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/account/types")
	public List<Map<String, Object>> accountTypes() {
		List<Map<String, Object>> response = new ArrayList<Map<String,Object>>();
		for (Object[] data : accountRepository.getAccountTypes()) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", data[0]);
			map.put("type", data[1]);
			response.add(map);
		}
		return response;
	}

}
