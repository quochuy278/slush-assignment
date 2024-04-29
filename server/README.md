## Description

This Node.js project provides a robust backend framework for managing to-do items and user accounts with security features.

## Technologies

- Node.js: The core server-side runtime environment for the project.
- Class Validator: Employs a class-based approach for data validation, ensuring data integrity.
- pg: Facilitates seamless connection to PostgreSQL databases for persistent data storage.
- bcrypt: Implements secure password hashing to protect user credentials.
- jsonwebtoken: Manages JSON Web Tokens (JWT) for authentication and authorization, safeguarding user access to resources.
- fs: Enables reading of migration files, potentially used for database schema updates.

## Features

- Create To-Do Items: Users can create and manage their to-do lists.
- Create User Accounts: Users can register for accounts, allowing them to securely store and access their to-do data.
- Secure User Data: User data is protected with bcrypt hashing during storage.
- JWT-based Authentication: JWTs are used to authenticate users, controlling access to critical functionalities.
