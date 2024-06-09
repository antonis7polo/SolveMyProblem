# Accounts Service

## Overview
The Accounts Service is a critical microservice in the solveMyProblem SaaS project, responsible for managing user accounts. This includes user registration (sign up), login, and admin user creation. Additionally, this service handles the provision of user information to other services within the application.

## Features
User registration (sign up)
User login
Admin user creation
Retrieval of user information

## API Endpoints
- `GET /health`: Check the health of the service.
- `POST /signup`: Sign up a new user.
- `POST /login`: Log in an existing user.
- `GET /user/:id`: Get user data.
- `POST /create-admin`: Create an admin user.

## Setup and Running
To set up and run the Accounts Service, please refer to the general project README for Docker installation instructions.

