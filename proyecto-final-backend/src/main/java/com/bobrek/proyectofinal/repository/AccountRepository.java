package com.bobrek.proyectofinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	@Query(value = "SELECT a.id, a.idclient, t.type, a.number, a.created, a.status, a.amount FROM accounts a, accounttype t WHERE a.idclient = 1 AND a.type = t.id ORDER BY a.id;", nativeQuery = true)
	List<Object[]> findClientAccounts(Long idclient);

}
