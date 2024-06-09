# Submissions Service

## Overview
The Submissions Service is a critical microservice in the solveMyProblem SaaS project, responsible for handling all user submissions. This includes storing submissions, providing access to submissions for users and admin users, and communicating with the Modify Submissions Service. Additionally, it provides other services with information about submissions.

## Features
- Store all submissions
- Provide access to user-specific submissions
- Provide access to all submissions for admin users
- Communicate with the Modify Submissions Service
- Provide information about submissions to other services

## API Endpoints
- `GET /health`: Check the health of the service.
- `GET /submission/:userId`: Get submissions by user ID.
- `GET /submission`: Get all submissions (admin only).
- `GET /submission/data/:id`: Get submission data by ID.

## Setup and Running
To set up and run the Submissions Service, please refer to the general project README for Docker installation instructions.

