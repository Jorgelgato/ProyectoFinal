package com.bobrek.proyectofinal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.Account;
import com.bobrek.proyectofinal.model.AccountDisplay;
import com.bobrek.proyectofinal.model.Client;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	@Query(value = "SELECT a.id, a.idclient, t.type, a.number, a.created, s.status, a.amount FROM accounts a, accounttype t, accountstatus s WHERE a.idclient = ? AND a.type = t.id AND a.status = s.id;", nativeQuery = true)
	List<Object[]> findClientAccounts(Long idclient);

}
