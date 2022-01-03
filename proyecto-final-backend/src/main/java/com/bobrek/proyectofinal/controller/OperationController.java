package com.bobrek.proyectofinal.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public List<OperationDisplay> getByAccountc(@PathVariable Long idaccount) {
		List<Object[]> operations = operationRepository.findByAccount(idaccount);
		List<OperationDisplay> od = new ArrayList<OperationDisplay>();
		DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy.MM.dd hh:mm:ss");
		for (Object[] data : operations) {
			od.add(new OperationDisplay((BigInteger) data[0], (BigInteger) data[1], new SimpleDateFormat("yyyy-MM-dd").format(data[2]), (String) data[3], (String) data[4], (double) data[5], (String) data[6]));
		}
		return od;
	}
	
}
