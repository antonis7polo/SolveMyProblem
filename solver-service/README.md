# Solver Service

## Overview
The Solver Service is a critical microservice in the solveMyProblem SaaS project, responsible for solving the problems it receives. Specifically, it handles Vehicle Routing Problems (VRP). The Solver Service receives a Python file, a parameters file, and other relevant parameters (such as the number of vehicles, depot, and maximum distance) from the Solver Wrapper Service. It then executes a Python command to run the problem and notifies the corresponding services about the results of the execution.

## Features
- Solve Vehicle Routing Problems (VRP)
- Execute Python scripts for problem solving
- Notify corresponding services about execution results

## API Endpoints
- `GET /health`: Check the health of the service.

## Setup and Running
To set up and run the Solver Service, please refer to the general project README for Docker installation instructions.

