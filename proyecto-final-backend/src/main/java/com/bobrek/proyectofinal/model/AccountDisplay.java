package com.bobrek.proyectofinal.model;

import java.math.BigInteger;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "accounts")
public class AccountDisplay {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private BigInteger id;

	@Column(name = "idclient")
	private BigInteger idClient;

	@Column(name = "type")
	private String type;
	
	@Column(name = "number")
	private int number;

	@Column(name = "created")
	private Date created;

	@Column(name = "status")
	private byte status;

	@Column(name = "amount")
	private double amount;

	public AccountDisplay() {

	}

	public AccountDisplay(BigInteger id, BigInteger idClient, String type, int number, Date created, byte status, double amount) {
		super();
		this.id = id;
		this.idClient = idClient;
		this.type = type;
		this.number = number;
		this.created = created;
		this.status = status;
		this.amount = amount;
	}

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public BigInteger getIdClient() {
		return idClient;
	}

	public void setIdClient(BigInteger idClient) {
		this.idClient = idClient;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public byte getStatus() {
		return status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "AccountDisplay [id=" + id + ", idClient=" + idClient + ", type=" + type + ", number=" + number
				+ ", created=" + created + ", status=" + status + ", amount=" + amount + "]";
	}
	
	
	
}
