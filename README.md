# Salesforce Validation Rule Switch

This project is a web-based application that connects to Salesforce using OAuth 2.0
and allows users to view, enable, disable, and deploy Account validation rules
directly from a web interface.

This project is created as part of an assignment to demonstrate Salesforce OAuth,
Connected Apps, and usage of Tooling / Metadata APIs.

---

## Assignment Requirements Covered

✔ Create Salesforce Developer Org  
✔ Create Account Validation Rules  
✔ Create Salesforce Connected App  
✔ OAuth 2.0 Authentication  
✔ Fetch validation rules using Tooling API  
✔ Enable / Disable validation rules  
✔ Deploy validation rule changes  
✔ Web UI for interaction  
✔ Deployed frontend and backend  

---

## Architecture Overview

- **Frontend**: React (deployed on Render)
- **Backend**: Node.js + Express (deployed on Render)
- **Salesforce APIs**:
  - OAuth 2.0
  - Tooling API
  - Metadata API
- **Library Used**: jsforce

---

## How Authentication Works (Important)

- A **Salesforce Connected App** is created inside a Salesforce Developer Org.
- The Connected App acts as a **bridge** between the web application and Salesforce.
- When the user clicks **Login with Salesforce**, Salesforce’s official login page opens.
- The user logs in using their **Salesforce org credentials**.
- Salesforce returns an **access token** to the backend.
- That access token is used to fetch and update validation rules.

⚠️ Note:
This Connected App works for the Salesforce org in which it is created.
Users must belong to the **same Salesforce organization** or be allowed by the Connected App policy.

---

## Features

- Login with Salesforce
- Fetch Account validation rules
- View rule status (Active / Inactive)
- Toggle individual validation rules
- Enable all rules
- Disable all rules
- Deploy changes to Salesforce
- Logout functionality

---

## Environment Variables (Backend)

Create a `.env` file in backend with:

CLIENT_ID=Your_Salesforce_Connected_App_Client_ID
CLIENT_SECRET=Your_Salesforce_Connected_App_Client_Secret
REDIRECT_URI=https://salesforce-switch-backend.onrender.com/oauth/callback

FRONTEND_URL=https://salesforce-switch-frontend.onrender.com


---

## How to Test the Application

1. Open the deployed frontend URL
2. Click **Login with Salesforce**
3. Salesforce login page opens
4. Login using Salesforce Developer Org credentials
5. Click **Get Validation Rules**
6. Toggle rules ON / OFF
7. Click **Deploy Changes** to apply changes in Salesforce

---

## Deployment

- **Frontend**: Deployed on Render
- **Backend**: Deployed on Render
- **Salesforce**: Developer Org

---

## Reference Application

Sample reference used for understanding:
https://sfswitch.herokuapp.com/

---

## Conclusion

This project demonstrates:
- Salesforce OAuth 2.0 integration
- Secure access to Salesforce metadata
- Real-time control of validation rules
- Practical usage of Salesforce Tooling and Metadata APIs

This fulfills all requirements mentioned in the assignment.
