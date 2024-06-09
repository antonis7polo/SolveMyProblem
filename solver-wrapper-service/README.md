# Solver Wrapper Service

## Overview
The Solver Wrapper Service is a critical microservice in the solveMyProblem SaaS project. In its current implementation, the service handles the Vehicle Routing Problem (VRP). It receives problems sent for execution by the Problem Issue Service and forwards them to the Solver Service. If the software is expanded to handle multiple types of problems, the Solver Wrapper Service will manage all solvers and ensure that each problem is sent to the correct solver.

## Features
- Forward problems to the Solver Service
- Manage multiple solvers (future implementation)
- Ensure correct problem-solver matching

## API Endpoints
- `GET /health`: Check the health of the service.

## Setup and Running
To set up and run the Solver Wrapper Service, please refer to the general project README for Docker installation instructions.

