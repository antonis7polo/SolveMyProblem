# Add Credits Service

## Overview
The Add Credits Service is a critical microservice in the solveMyProblem SaaS project, responsible for adding credits to a specific user's account. Users must purchase credits to exchange them for solving problems, with each problem having a different cost based on its difficulty.

## Features
- Add credits to a user's account
- Publish an event when credits are added

## How to add Credits
In order to add credits you will have to visit the following website [Payment with Stripe](https://docs.stripe.com/testing) select one of the available credit card numbers, select a future date and a valid ZIP/Postal code to complete the mock payment using the Add Credits functionality.

## API Endpoints
- `GET /health`: Check the health of the service.
- `POST /credits/add`: Add credits to a user's account.

## Setup and Running
To set up and run the Add Credits Service, please refer to the general project README for Docker installation instructions.

