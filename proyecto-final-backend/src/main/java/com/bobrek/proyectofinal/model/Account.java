package com.bobrek.proyectofinal.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "accounts")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "idclient")
	private long idClient;

	@Column(name = "type")
	private int type;

	@Column(name = "created")
	private Date created;

	@Column(name = "status")
	private int status;

	@Column(name = "amount")
	private double amount;

	public Account() {

	}

	public Account(long id, long idClient, int type, Date created, int status, double amount) {
		super();
		this.id = id;
		this.idClient = idClient;
		this.type = type;
		this.created = created;
		this.status = status;
		this.amount = amount;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getIdClient() {
		return idClient;
	}

	public void setClientId(long idClient) {
		this.idClient = idClient;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	
	
}
