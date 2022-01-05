package com.bobrek.proyectofinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bobrek.proyectofinal.model.Operation;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {

	@Query(value = "SELECT id, idAccount, cast(date as date) as date, operationType, description, amount, credit FROM operations WHERE idaccount = ?;", nativeQuery = true)
	List<Operation> findByAccount(Long idaccount);

	@Query(value = "Select id, type from operationtype", nativeQuery = true)
	List<Object[]> getOperationTypes();
}
