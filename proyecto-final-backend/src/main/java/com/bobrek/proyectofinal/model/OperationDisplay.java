package com.bobrek.proyectofinal.model;

import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "operations")
public class OperationDisplay {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private BigInteger id;

	@Column(name = "idaccount")
	private BigInteger idAccount;

	@Column(name = "date")
	private String date;

	@Column(name = "operationtype")
	private String operationType;

	@Column(name = "description")
	private String description;

	@Column(name = "amount")
	private double amount;

	@Column(name = "credit")
	private String credit;

	public OperationDisplay() {

	}

	public OperationDisplay(BigInteger id, BigInteger idAccount, String date, String operationType,
			String description, double amount, String credit) {
		super();
		this.id = id;
		this.idAccount = idAccount;
		this.date = date;
		this.operationType = operationType;
		this.description = description;
		this.amount = amount;
		this.credit = credit;
	}

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public BigInteger getIdAccount() {
		return idAccount;
	}

	public void setIdAccount(BigInteger idAccount) {
		this.idAccount = idAccount;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getOperationType() {
		return operationType;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCredit() {
		return credit;
	}

	public void setCredit(String credit) {
		this.credit = credit;
	}

}
