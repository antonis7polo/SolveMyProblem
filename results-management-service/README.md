# Results Management Service

## Overview
The Results Management Service is a critical microservice in the solveMyProblem SaaS project, responsible for storing the results of problem executions. When a problem execution is successful, the results are sent to this service, where they are stored. Each user has access to their own results, while admin users have access to all results.

## Features
- Store results of problem executions
- Provide user-specific access to results
- Provide admin access to all results

## API Endpoints
- `GET /health`: Check the health of the service.
- `GET /result/:id`: Get result by ID.

## Setup and Running
To set up and run the Results Management Service, please refer to the general project README for Docker installation instructions.

