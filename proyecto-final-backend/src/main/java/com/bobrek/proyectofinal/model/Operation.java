package com.bobrek.proyectofinal.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "operations")
public class Operation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "idaccount")
	private long idAccount;
	
	@Column(name = "date")
	private Date date;

	@Column(name = "operationtype")
	private int operationType;

	@Column(name = "description")
	private String description;

	@Column(name = "amount")
	private double amount;

	@Column(name = "credit")
	private int credit;

	public Operation() {

	}

	public Operation(long id, long idAccount, Date date, int operationType, String description, double amount,
			int credit) {
		super();
		this.id = id;
		this.idAccount = idAccount;
		this.date = date;
		this.operationType = operationType;
		this.description = description;
		this.amount = amount;
		this.credit = credit;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getIdAccount() {
		return idAccount;
	}

	public void setIdAccount(long idAccount) {
		this.idAccount = idAccount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getOperationType() {
		return operationType;
	}

	public void setOperationType(int operationType) {
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

	public int getCredit() {
		return credit;
	}

	public void setCredit(int credit) {
		this.credit = credit;
	}

}
