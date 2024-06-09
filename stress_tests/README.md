# Stress Testing with JMeter

This directory contains scripts and configurations for stress testing our services using Apache JMeter. The tests were designed to simulate various load conditions and to observe the performance and stability of our services under high traffic.

## Test Scenarios

1. **Sign Up Requests**
   - We initiated 200 sign up requests simultaneously to test the user registration endpoint.
   
2. **Login Requests**
   - Following the sign up tests, we simulated 200 login requests simultaneously to test the authentication endpoint.

3. **Submission Services**
   - **Initial Submission Test**
     - We started with 300 simultaneous submissions to check the basic functionality and stability of the submission service.
     - Next, we scaled up to 1000 simultaneous submissions and repeated this step to ensure the system can handle a larger load without errors.
   
   - **Queue Durability Test**
     - We ran 300 simultaneous problem submissions to test the durability and performance of the queue. All requests were successful.
     - We then scaled up to 1000 simultaneous problem submissions, followed by another batch of 1000 submissions. During these tests, we encountered some errors:
       - **Errors Encountered**:
         - `Non HTTP response code: java.net.SocketException / Non HTTP response message: Broken pipe`
         - `Non HTTP response code: java.net.SocketException / Non HTTP response message: Connection reset by peer`
       - These errors are typically caused by the limitations of the local machine used for testing, such as network capacity and resource constraints. If the application were deployed in a cloud environment, these errors would likely not occur due to better scalability and resource management in the cloud.

Despite these errors, the queue processed more than 1.5k problems successfully, demonstrating its robustness.

## Queue Performance

The RabbitMQ queue performance was monitored throughout the tests. Below is a screenshot showing the queue handling over 1.5k problems without issues.

![Queue Performance](https://github.com/ntua/saas2024-21/blob/main/stress_tests/queue.png)

## Results and Reports

Thorough results can be found in the `report` folders (e.g., `problem_report`) in the `index.html` and `statistics.json` files. These reports provide detailed insights into the performance and behavior of the application under stress.

## Focus of Testing

The primary stress point of the application is the solver queue, and this was tested in more detail. Tests for services such as results, logs, analytics, and submissions fetching were not conducted, as these are not expected to be heavier or more demanding than the sign-up process.

## Test Plans and Data Generation

The `.jmx` files in this directory contain the JMeter test plans used for the stress tests. Additionally, the `.ipynb` notebook is used to create the CSV files required for load testing.

## Conclusion

The stress tests revealed that our services can handle a significant number of simultaneous requests, though occasional network-related errors were observed at peak loads due to local machine limitations. The queue system demonstrated strong durability, efficiently processing a high volume of submissions even under heavy load.

In a cloud environment, these specific socket errors are unlikely to occur, and the application would benefit from the enhanced scalability and resource management provided by cloud infrastructure.

## Usage

To replicate these tests, follow these steps:

1. **Install JMeter**: Ensure Apache JMeter is installed on your machine. You can download it from the [Apache JMeter website](https://jmeter.apache.org/download_jmeter.cgi).

2. **Set Up Test Plan**: Use the provided JMeter test plans (`.jmx` files) and CSV data files to set up your tests containing the Thread Groups, HTTP Requests, and Header Managers.

3. **Run Tests**: Execute the test plans and monitor the results using JMeter's listeners (e.g., View Results Tree, Summary Report).

4. **Generate Test Data**: Use the provided `.ipynb` notebook to generate the necessary CSV files for load testing.

5. **Analyze Results**: Review the test results to identify any performance bottlenecks or errors, and use the insights to improve the robustness and scalability of the services.

For more details and test scripts, refer to the files in this directory.

---


