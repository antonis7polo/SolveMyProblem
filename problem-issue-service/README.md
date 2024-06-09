# Problem Issue Service

## Overview
The Problem Issue Service is a critical microservice in the solveMyProblem SaaS project, responsible for managing problems received from the Submissions Service that are ready to be executed. This service stores problems, calculates the cost required to run them, sends problems for execution to the Solver Wrapper Service, and updates the user's credits accordingly. Additionally, it handles creating, updating, and deleting problems based on modifications to the corresponding submissions.

## Features
- Store problems received from the Submissions Service
- Calculate the cost to run a problem
- Send problems for execution to the Solver Wrapper Service
- Update user credits after problem execution
- Create, update, and delete problems based on submission modifications

## API Endpoints
- `GET /health`: Check the health of the service.
- `POST /run`: Run a problem.
- `GET /cost/:problemId`: Get the cost to run a problem.

## Setup and Running
To set up and run the Problem Issue Service, please refer to the general project README for Docker installation instructions.

