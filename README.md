# NTUA ECE SAAS 2024 PROJECT
  
## TEAM 21
  
# solveMyProblem

## Project Overview

solveMyProblem is a sophisticated web application designed to provide computational problem-solving capabilities as a service (SaaS). Developed as part of the Software as a Service course at ECE NTUA, this project aims to offer users access to significant computational resources and specialized software licenses necessary for solving complex problems, such as simulations, optimizations, and predictions. Users can leverage these resources without incurring the high costs associated with purchasing the hardware and software themselves.

## Contributors

This project is the result of collaborative efforts by a team of aspiring software engineers:

- **Antonios Alexiadis el20167@mail.ntua.gr** - Contributed to the backend and frontend, worked on Dockerization, and also contributed to user interface design.
- **Nikolaos Bothos Vouterakos el20158@mail.ntua.gr** - Contributed to the backend and frontend, focused on user interface design, and assisted with stress testing.
- **Chrisostomos Kopitas el20136@mail.ntua.gr** - Contributed to the architecture and backend.
- **Charidimos Papadakis el20022@mail.ntua.gr** - Contributed to the backend and frontend, focused on the architecture and stress testing, and had a significant involvement in backend development.

## Description
solveMyProblem is a web-based service targeting users who need to solve computationally intensive problems but lack the necessary resources. The service uses Google OR-Tools to handle various operations research problems, including optimization problems that require significant processing power. Users can submit their problems, which are then processed using the computational resources and software licenses provided by the service. solveMyProblem operates on a microservices architecture and is deployed using Docker containers.

## Table of Contents

- [Usage](#usage)
- [Running with Docker](#running-with-docker)
- [Services](#services)
- [Stress Testing](#stress-testing)
- [Diagrams](#diagrams)
- [AI Assistance Log](#ai-assistance-log)
- [Project Planning and Monitoring](#project-planning-and-monitoring)
- [License](#license)


## Usage

### Running with Docker
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ntua/saas2024-21.git
   cd saas2024-21
   ```

2. **Ensure Docker is Installed:**
   Make sure you have Docker installed on your system. You can download it from [Docker's official website](https://www.docker.com/get-started).

3. **Run Docker Compose:**
   Navigate to the directory containing (it's the root directory of the project) the docker-compose.yml file and run Docker Compose (the Docker Engine should already be running, i.e. start the Docker Desktop App):
   ```bash
   docker-compose up --build
   ```
   This command will start all the services defined in the docker-compose.yml file. It will pull the necessary Docker images, build the custom images, and start all the containers. After the containers have been build, to run the project you only need to run the following command:

   ```bash
   docker-compose up
   ```
   If changes are made to any of the microservices you will have to rebuild the project using docker-compose up --build to apply the modifications.

4. **Access the Services:**

- Accounts Service: http://localhost:3005
- Add Credits Service: http://localhost:3004
- Log Management Service: http://localhost:3007
- Modify Submissions Service: http://localhost:3001
- Problem Issue Service: http://localhost:3002
- Results Management Service: http://localhost:3003
- Solver Service: http://localhost:3006
- Submissions Service: http://localhost:3000
- Solver Wrapper Service: http://localhost:3008
- Front-end Service: http://localhost:4000

5. **Stopping the Services:**
   To stop the services, press Ctrl + C in the terminal where Docker Compose is running. You can also use:
   ```bash
   docker-compose down
   ```
   You may also need to stop the Docker Engine running in the background.

## Services

### Accounts Service
- Manages user accounts, including registration, login, and admin user creation.
- [Accounts Service README](https://github.com/ntua/saas2024-21/tree/main/accounts-service/README.md)

### Add Credits Service
- Handles adding credits to user accounts.
- [Add Credits Service README](https://github.com/ntua/saas2024-21/tree/main/add-credits-service/README.md)

### Admin CLI Service
- Handles the creation of a user with Admin Privileges
- [Admin CLI Service README](https://github.com/ntua/saas2024-21/tree/main/admin-cli/README.md)

### Log Management Service
- Manages logs and analytics, communicating with the Results Management and Accounts services.
- [Log Management Service README](https://github.com/ntua/saas2024-21/tree/main/log-management-service/README.md)

### Modify Submissions Service
- Handles creating, updating, and deleting user submissions.
- [Modify Submissions Service README](https://github.com/ntua/saas2024-21/tree/main/modify-submissions-service/README.md)

### Problem Issue Service
- Manages problems ready for execution, calculating costs, and sending problems for execution.
- [Problem Issue Service README](https://github.com/ntua/saas2024-21/tree/main/problem-issue-service/README.md)

### Results Management Service
- Stores and provides access to problem execution results.
- [Results Management Service README](https://github.com/ntua/saas2024-21/tree/main/results-management-service/README.md)

### Solver Service
- Solves the problems it receives using provided parameters.
- [Solver Service README](https://github.com/ntua/saas2024-21/tree/main/solver-service/README.md)

### Submissions Service
- Manages user submissions and provides information to other services.
- [Submissions Service README](https://github.com/ntua/saas2024-21/tree/main/submissions-service/README.md)

### Solver Wrapper Service
- Sends problems for execution to the appropriate solver.
- [Solver Wrapper Service README](https://github.com/ntua/saas2024-21/tree/main/solver-wrapper-service/README.md)

### Front-end Service
- Provides the user interface for the application.
- [Front-end Service README](https://github.com/ntua/saas2024-21/tree/main/front-end/solve_my_problem/README.md)

## Stress Testing

### Overview
Stress testing for the solveMyProblem project was conducted using Apache JMeter to simulate various load conditions and observe the performance and stability of our services under high traffic. Detailed information and test scripts can be found in the [Stress Tests README](https://github.com/ntua/saas2024-21/tree/main/stress_tests/README.md).

## Diagrams

### Overview
---
In our project documentation, we have utilized Visual Paradigm to create a comprehensive set of diagrams. These diagrams provide a detailed visual representation of various aspects of the solveMyProblem system, aiding in understanding the design, architecture, and functionality of the platform.

### Types of Diagrams and Their Purposes
---
We have included the following diagrams:

1. **UML Class/API Diagram**: Provides an overview of the system's classes, their attributes, methods, and the relationships between them. This is particularly useful for understanding the API structure and object-oriented design of the system.

2. **UML Sequence Diagram**: Illustrates the sequence of messages exchanged between different objects or components of the system in a particular scenario, which is key for understanding the interaction and timing between system components.

3. **UML Deployment Diagram**: Demonstrates how the software is deployed on the hardware architecture, showing the physical configuration of hardware nodes and their software counterparts.

4. **UML Component Diagram**: Outlines the organization and dependencies among a set of components, which include software components, libraries, packages, files, etc.

### Accessing the Diagrams
---
These diagrams are available in the `architecture` folder within our project repository. 

### Usage
---
These diagrams serve as an essential reference for developers, architects, and project managers. They are instrumental in onboarding new team members, conducting system audits, and facilitating discussions about system enhancements and maintenance.

## AI Assistance Log

### Overview
---
In our development process, we have incorporated AI tools for assistance in various phases of the project. The `ai-log` folder in our repository is a dedicated space for documenting these interactions.

### Contents of the AI Log
---
The `ai-log` folder contains several zip files, each representing a different instance of interaction with an AI tool. Inside each zip file, you will find:

- **Text File (`.txt`) Containing the Prompt**: This file includes the exact prompt we used with the AI tool. It serves as a record of our query or request, providing context for the AI's response.

- **Corresponding JSON File**: Alongside each text file, there's a JSON file that contains the AI's response to our prompt. This structured format makes it easy to review and analyze the AI's output.

For instance, a zip file could contain:

1. `architecture_decision_prompt.txt` - The text of our query about architectural decision-making.
2. `architecture_decision_response.json` - The AI-generated response, offering insights or solutions based on the prompt.

### Example JSON Record
---
Each AI interaction is also summarized in a JSON record format like the following:

```json
{
    "answers": {
        "phase": "architecture",
        "action": "microservices definition",
        "scope":  "backend",
        "action experience":  3,
        "prog lang": "js-node",
        "other prog lang": "<fill in>",
        "aimodel": "chatgpt",
        "aimodel version": "4",
        "lmstudio-hosted aimodel": "<fill-in>",
        "tool option":  "online full",
        "experience with tool":  3,
        "time allocated (h)": 1,
        "time saved estimate (h)": 1, 
        "quality of ai help": 4,
        "knowledge acquired":  4,
        "generic feeling - now": 3,
        "generic feeling - future": 3,
        "threat level":  1,
        "notes": "Detailed explanation of pros and cons of using a sovlver wrapper in a microservices architecture"
    }
}
```

This file provides a structured summary of the interaction, detailing the context, tools used, time invested, and the perceived quality and impact of the AI's assistance.

### Purpose and Use
---
The AI log serves to:

- **Document AI Interactions**: It offers a transparent account of how AI tools were used during the development of solveMyProblem.
- **Analyze AI's Effectiveness**: By reviewing these logs, we can assess the impact and efficiency of AI assistance in our project.
- **Inform Future Projects**: These logs act as a learning tool for future teams to understand the potential and limitations of AI in software development processes.

By meticulously documenting our AI interactions, we aim to provide insights into the integration of AI in software engineering and its evolving role.

## Project Planning and Monitoring
For detailed project planning and monitoring, please refer to our [GitHub Project Board](https://github.com/users/ntua-el20022/projects/2).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
