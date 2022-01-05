package com.bobrek.proyectofinal.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bobrek.proyectofinal.model.Operation;
import com.bobrek.proyectofinal.model.OperationDisplay;
import com.bobrek.proyectofinal.repository.OperationRepository;

@RestController
@RequestMapping("/api/v1/")
public class OperationController {

	@Autowired
	private OperationRepository operationRepository;

	// Get all operations
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/operation")
	public List<Operation> getAllOperations() {
		return operationRepository.findAll();
	}
	
	// Get operation by idaccount
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/operation/{idaccount}")
	public List<Operation> getByAccountc(@PathVariable Long idaccount) {
		return operationRepository.findByAccount(idaccount);
	}
	
	// Create operation
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/operation")
	public Operation createOperation(@RequestBody Operation operation) {
		return operationRepository.save(operation);
	}
	
	// Operation types
	@CrossOrigin(origins = "http://localhost:8100")
	@GetMapping("/operation/types")
	public List<Map<String, Object>> operationTypes() {
		List<Map<String, Object>> response = new ArrayList<Map<String,Object>>();
		for (Object[] data : operationRepository.getOperationTypes()) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", data[0]);
			map.put("type", data[1]);
			response.add(map);
		}
		return response;
	}
	
}
