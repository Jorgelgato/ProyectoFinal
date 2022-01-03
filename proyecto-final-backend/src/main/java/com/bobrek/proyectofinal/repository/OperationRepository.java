package com.bobrek.proyectofinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.Operation;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {

	@Query(value = "SELECT o.id, o.idaccount, o.date, t.typeo, o.description, o.amount, c.typec FROM operations o, operationtype t, operationcredit c WHERE o.operationtype = t.id AND o.credit = c.id;", nativeQuery = true)
	List<Object[]> findByAccount(Long idaccount);

}
