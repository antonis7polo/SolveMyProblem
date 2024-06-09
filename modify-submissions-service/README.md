# Modify Submissions Service

## Overview
The Modify Submissions Service is a critical microservice in the solveMyProblem SaaS project, responsible for managing submissions sent by users. This includes creating new submissions, updating existing submissions (changing parameters and files if the problem has not been sent for execution yet), and deleting submissions.

## Features
- Create new submissions
- Update existing submissions
- Delete submissions

## API Endpoints
- `GET /health`: Check the health of the service.
- `POST /submission/create`: Create a new submission.
- `DELETE /submission/delete/:id`: Delete a submission.

## Setup and Running
To set up and run the Modify Submissions Service, please refer to the general project README for Docker installation instructions.

