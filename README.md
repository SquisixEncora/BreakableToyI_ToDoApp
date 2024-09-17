# BreakableToyI_ToDoApp
Breakable Toy I: To-Do Application. 

## Description

This project is a to-do list application that allows users to create, edit, filter, sort, and paginate tasks.
The project is divided into two main parts: 
  - The frontend (developed in React with Vite)
  - The backend (developed in Java with Spring Boot and Maven).

## Requirements

- **Frontend:**
  - Node.js - v20.17.0 or higher
  - npm - v10.8.3
- **Backend:**
  - Java 22.0.2 or higher
  - Maven 3.9.9 or higher
 
You can find more information on how to install the required packages at the following links:

- Node.js: [https://nodejs.org/en/learn/getting-started/how-to-install-nodejs](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- Java: [https://jdk.java.net/22/](https://jdk.java.net/22/)
- Maven: [https://maven.apache.org/install.html](https://maven.apache.org/install.html)


## Alternative Package Installation

If you prefer using Homebrew to install the required packages, you can follow these steps:

- **Frontend:**
    1. Install Node.js and npm using Homebrew:
         ```bash
         brew install node
         ```

- **Backend:**
    1. Install Java using Homebrew:
         ```bash
         brew install openjdk@22
         ```

    2. Install Maven using Homebrew:
         ```bash
         brew install maven
         ```

For more information on how to install Homebrew, you can visit their official website: [https://brew.sh/](https://brew.sh/)


## Project Structure

The project is organized into two main folders:

- `todo-app-frontend`: Contains the React application. This folder includes all the necessary files and dependencies for the frontend development. It contains the source code, components, styles, and other assets related to the React application.

- `todo-app-backend`: Contains the Spring Boot application. This folder includes all the necessary files and dependencies for the backend development. It contains the source code, controllers, services, models, and other components related to the Spring Boot application.

Each folder has its own specific purpose and contains the relevant files and code for that part of the project. This separation allows for easier maintenance, scalability, and modularity of the application.

By organizing the project into these two main folders, it becomes easier to navigate and work on specific parts of the application. It also helps in separating concerns and following best practices for code organization.

## Backend Setup

1. **Navigate to the backend folder:**

    ```bash
    cd todo-app-backend
    ```

    This command will change your current directory to the `todo-app-backend` folder. Make sure you are in the root directory of your project before running this command.

2. **Install the required dependencies:**

    ```bash
    mvn install
    ```

    This command will install all the necessary dependencies for the backend application. Make sure you have Java and Maven installed before running this command.

3. **Start the backend server:**

    ```bash
    mvn spring-boot:run
    ```

    This command will start the backend server for the application. It will compile the code and run the Spring Boot application. You can access the backend API endpoints at `http://localhost:9090/api/todos`.

4. **Test the backend API:**

    Once the backend server is running, you can test the API endpoints using tools like Postman or cURL. Send HTTP requests to `http://localhost:9090/api/todos` to interact with the backend and perform CRUD operations on the tasks.

    You are now ready to start working on the backend part of the to-do application.



## Frontend Setup

1. **Navigate to the frontend folder:**

    ```bash
    cd todo-app-frontend
    ```

    This command will change your current directory to the `todo-app-frontend` folder. Make sure you are in the root directory of your project before running this command.

2. **Install the required dependencies:**

    ```bash
    npm install
    ```

    This command will install all the necessary dependencies for the frontend application. Make sure you have Node.js and npm installed before running this command.

3. **Start the development server:**

    ```bash
    npm run start
    ```

    This command will start the development server for the frontend application. It will compile the code and serve it on a local development server. You can access the application in your browser at `http://localhost:8080`.

4. **Open the application in your browser:**

    Once the development server is running, open your preferred web browser and navigate to `http://localhost:8080` to access the frontend application.

    You are now ready to start working on the frontend part of your to-do application.


    ## Running the Application

    To ensure that the web page functions correctly, make sure to start both the frontend and backend services. 

    Enjoy!

