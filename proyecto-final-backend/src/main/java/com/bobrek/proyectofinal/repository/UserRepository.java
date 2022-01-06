package com.bobrek.proyectofinal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query(value = "SELECT * FROM users WHERE email = ? AND active = true", nativeQuery = true)
	Optional<User> findByEmail(String email);

}
