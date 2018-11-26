package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

/**
 * 
 *
 */
public class UserMgmtManageAccountRequest {

	private String sessionKey;
	
	private String username;
	private String email;
	private String firstName;
	private String lastName;
	private String organization;
	
	private boolean assignOrganizationNull;
	

	@Override
	public String toString() {
		return "UserMgmtManageAccountRequest [sessionKey=" + sessionKey + ", username=" + username + ", email=" + email
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", organization=" + organization
				+ ", assignOrganizationNull=" + assignOrganizationNull + "]";
	}


	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public boolean isAssignOrganizationNull() {
		return assignOrganizationNull;
	}

	public void setAssignOrganizationNull(boolean assignOrganizationNull) {
		this.assignOrganizationNull = assignOrganizationNull;
	}
}