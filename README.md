# biteSpeedAssignment
Identity Reconciliation


```markdown
# BiteSpeed API

This API identifies and manages contacts based on provided email and/or phone number.  It utilizes a MySQL database to store and retrieve contact information.

## Functionality

The API offers two main functionalities:

1. **Contact Identification (`POST /api/v1/identify`):**  This endpoint takes an email and/or phone number as input (JSON payload) and returns a structured response containing:
    * `primaryContactId`: The ID of the primary contact.
    * `emails`: A unique array of emails associated with the contact.
    * `phoneNumbers`: A unique array of phone numbers associated with the contact.
    * `secondaryContactIds`: An array of IDs for secondary contacts associated with the primary contact.

    If no matching contact is found, a new primary contact is created.  If new information (email or phone number) is provided for an existing contact, a new secondary contact is added. The API ensures that secondary contacts are properly linked to their primary contact.

2. **Get All Contacts (`GET /api/v1/identify`):** This endpoint returns all contacts from the database.  Primarily for debugging and testing purposes.

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:** Create a `.env` file in the root directory and add the following variables:
   ```
   DB_HOST=<your_db_host>
   DB_USER=<your_db_user>
   DB_PASSWORD=<your_db_password>
   DB_NAME=<your_db_name>
   DB_PORT=<your_db_port> 
   ```

4. **Create the database and table:**  You'll need to manually create a MySQL database and table named `Contact` with the following structure:

   ```sql
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
   ```

5. **Run the server:**
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint             | Description                                                                 | Request Body (JSON)          | Response Body (JSON)                                      |
|--------|----------------------|-----------------------------------------------------------------------------|-------------------------------|-------------------------------------------------------------|
| POST   | `/api/v1/identify` | Identifies a contact based on email and/or phone number.                     | `{ "email": "test@example.com", "phoneNumber": "1234567890" }` | `{ contact: { primaryContactId, emails, phoneNumbers, secondaryContactIds } }` |
| GET    | `/api/v1/identify` | Retrieves all contacts from the database (for testing/debugging purposes). | None                            | `[{ id, email, phoneNumber, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt }]` |


## Technologies Used

* Node.js
* Express.js
* MySQL
* mysql2/promise
* dotenv


## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios:

* **400 Bad Request:** If the request body is missing required fields (email or phoneNumber).
* **500 Internal Server Error:** If a database error occurs.
