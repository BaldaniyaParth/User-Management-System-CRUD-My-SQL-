# User Management System

This project is a simple User Management System that performs CRUD (Create, Read, Update, Delete) operations using MySQL for the database, Node.js for the backend, and EJS for the frontend. It allows users to:

- View user ID, username, and email
- Add a new user with a username, email, and password
- Delete a user if the provided password matches
- Update the username if the provided password matches


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/user-management-system.git
   cd user-management-system
   ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Set up the MySQL database:**

- Create a database named schema.sql.
- Run the following SQL script to create the necessary table:

    ```SQL
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    ```

4. **Configure environment variables:**

- Create a .env file in the root directory and add the following configuration:

    ```env 
    DB_HOST=your_mysql_host
    DB_USER=your_mysql_user
    DB_NAME=user_management
    DB_PASSWORD=your_mysql_password
    ```

5. **Start the application:**

    ```bash
    npm start
    ```


## Usage

### View Users:
Navigate to http://localhost:8080/user to view the list of users (ID, username, and email).

### Add User:
Navigate to http://localhost:8080/user/new and fill in the form to add a new user with a username, email, and password.

### Delete User:
Navigate to http://localhost:8080/user/:id/delete and provide the email and password to delete a user.

### Update Username:
Navigate to http://localhost:8080//user/:id/edit and provide the email, current password, and new username to update the username.


## Endpoints

### GET /user :
 Retrieve all users
### POST /user/new :
 Add a new user
### DELETE /user/:id/ :
 Delete a user
### PATCH /user/:id :
 Update a user's username


- Feel free to modify the details as necessary for your project.






