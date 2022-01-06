package com.bobrek.proyectofinal.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "idtype")
	private String idType;

	@Column(name = "idnumber")
	private String idNumber;

	@Column(name = "lastname")
	private String lastName;

	@Column(name = "firstname")
	private String firstName;

	@Column(name = "borndate")
	private Date bornDate;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "created")
	private Date created;
	
	@Column(name = "active")
	private boolean active;

	@Column(name = "admin")
	private boolean admin;

	public User() {

	}

	public User(long id, String idType, String idNumber, String lastName, String firstName, Date bornDate, String email,
			String password, Date created, boolean active, boolean admin) {
		super();
		this.id = id;
		this.idType = idType;
		this.idNumber = idNumber;
		this.lastName = lastName;
		this.firstName = firstName;
		this.bornDate = bornDate;
		this.email = email;
		this.password = password;
		this.created = created;
		this.active = active;
		this.admin = admin;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Date getBornDate() {
		return bornDate;
	}

	public void setBornDate(Date bornDate) {
		this.bornDate = bornDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

}
