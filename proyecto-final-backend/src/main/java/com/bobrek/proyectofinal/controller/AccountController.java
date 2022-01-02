package com.bobrek.proyectofinal.controller;

import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bobrek.proyectofinal.exception.ResourceNotFoundException;
import com.bobrek.proyectofinal.model.Account;
import com.bobrek.proyectofinal.model.AccountDisplay;
import com.bobrek.proyectofinal.model.Client;
import com.bobrek.proyectofinal.repository.AccountRepository;
import com.bobrek.proyectofinal.repository.ClientRepository;

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

	// Create account
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/account")
	public Account createAccount(@RequestBody Account account) {
		return accountRepository.save(account);
	}
	
	// Get accounts by client id
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/account/{id}")
	public List<AccountDisplay> getAccountsByClientId(@PathVariable Long id) {
		List<Object[]> adlist = accountRepository.findClientAccounts(id);
		List<AccountDisplay> ad = new ArrayList<AccountDisplay>();
		for (Object[] data : adlist) {
			ad.add(new AccountDisplay((BigInteger) data[0], (BigInteger) data[1], (String) data[2], (int) data[3], (Date) data[4], (String) data[5], (double) data[6]));
		}
		return ad;
	}

}
