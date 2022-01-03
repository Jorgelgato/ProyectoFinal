package com.bobrek.proyectofinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	@Query(value = "SELECT a.id, a.idclient, a.type, a.number, a.created, a.status, a.amount FROM accounts a WHERE a.idclient = ? AND a.status <> 2 ORDER BY a.id;", nativeQuery = true)
	List<Account> findClientAccounts(Long idclient);

}
