package com.bobrek.proyectofinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	@Query(value = "SELECT id, idclient, type, number, created, status, amount FROM accounts WHERE idclient = ? AND status <> 2 ORDER BY id;", nativeQuery = true)
	List<Account> findClientAccounts(Long idclient);
	
	@Query(value = "Select id, type from accounttype", nativeQuery = true)
	List<Object[]> getAccountTypes();

}
