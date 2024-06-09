# Log Management Service

## Overview
The Log Management Service is a critical microservice in the solveMyProblem SaaS project, responsible for managing logs and analytics. This service communicates with the Results Management and Accounts services to create and store logs with information about every user creation and every result stored from successful problem executions. The logs include details such as CPU usage, task completion time, and more. Based on these logs, the service generates various analytics, both general and user-specific. Only admin users have access to logs and analytics.

## Features
- Create and store logs with information about user creation and problem execution results
- Generate general and user-specific analytics based on logs
- Provide admin access to logs and analytics

## API Endpoints
- `GET /health`: Check the health of the service.
- `GET /analytics`: Get analytics data (admin only).
- `GET /logs`: Get logs data (admin only).

## Setup and Running
To set up and run the Log Management Service, please refer to the general project README for Docker installation instructions.
