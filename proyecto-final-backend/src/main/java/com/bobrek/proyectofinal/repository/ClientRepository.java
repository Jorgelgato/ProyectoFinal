package com.bobrek.proyectofinal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
	
	@Query(value = "SELECT * FROM clients WHERE email = ? AND password = ? AND active = true", nativeQuery = true)
	Optional<Client> findByEmailAndPassword(String email, String password);

}
