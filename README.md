Here’s the enhanced README.md file for your project:

# BiteSpeed Contact Reconciliation API

The **BiteSpeed Contact Reconciliation API** is a Node.js-based service that identifies and manages 
contacts using provided email and/or phone numbers. It ensures accurate linking of primary and secondary 
contacts and stores the data in a MySQL database.

---

## 🚀 Features

### 1. **Contact Identification (`POST /api/v1/identify`)**
- Accepts **email** and/or **phone number** in the request body.
- Performs the following:
  - Identifies an existing contact based on the input.
  - Links secondary contacts to the primary contact.
  - If no matching contact is found, creates a new **primary contact**.
- Returns a structured response:
  ```json
  {
    "contact": {
      "primaryContactId": 1,
      "emails": ["test@example.com"],
      "phoneNumbers": ["1234567890"],
      "secondaryContactIds": [2, 3]
    }
  }

2. Retrieve All Contacts (GET /api/v1/identify)

	•	Fetches all contacts stored in the database.
	•	Useful for debugging and testing.

🛠️ Tech Stack

	•	Backend: Node.js, Express.js
	•	Database: MySQL
	•	ORM/Driver: mysql2/promise
	•	Environment Variables: dotenv

📦 Setup and Installation

Follow these steps to set up the project locally:

1. Clone the Repository

git clone https://github.com/Aryan2vb/biteSpeed.git
cd biteSpeed

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add the following variables:

DB_HOST=<your_db_host>
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_db_name>
DB_PORT=<your_db_port>

4. Set Up the Database

Manually create a MySQL database and a table named Contact with the following schema:

CREATE TABLE Contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    phoneNumber VARCHAR(20),
    linkedId INT,
    linkPrecedence ENUM('primary', 'secondary'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

5. Start the Server

npm start

The API will be running at http://localhost:3000.

📋 API Endpoints

1. POST /api/v1/identify

Identifies or creates a contact based on the provided email and/or phone number.

Request Body

{
  "email": "test@example.com",
  "phoneNumber": "1234567890"
}

Response Body

{
  "contact": {
    "primaryContactId": 1,
    "emails": ["test@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}

2. GET /api/v1/identify

Fetches all contacts for testing or debugging.

Response Body

[
  {
    "id": 1,
    "email": "test@example.com",
    "phoneNumber": "1234567890",
    "linkedId": null,
    "linkPrecedence": "primary",
    "createdAt": "2024-11-27T12:00:00Z",
    "updatedAt": "2024-11-27T12:00:00Z",
    "deletedAt": null
  }
]

🛡️ Error Handling

	•	400 Bad Request: If required fields (email or phoneNumber) are missing in the request.
	•	500 Internal Server Error: If a database error occurs or the server encounters an unexpected issue.

👨‍💻 Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.
