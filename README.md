# CITY Break App

This project is an implementation of the CITY Break App, a web-based application for managing and using city breaks. This README provides instructions on how to set up and run the project.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/your-repo/city-break-app.git
    cd city-break-app
    ```

2. Install dependencies for both backend and frontend.

    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

## Environment Setup

1. In the backend directory, there is an example environment file called `.env.example`. Copy this to a new file named `.env`.

    ```bash
    cd backend
    cp .env.example .env
    ```

## Database Setup

1. Navigate to the `backend` directory and start the Docker containers.

    ```bash
    cd backend
    docker compose up -d
    ```

2. Run the database migrations.

    ```bash
    npm run db:migrate
    ```

## Running the Project

1. Open a terminal and navigate to the `backend` directory. Start the backend server.

    ```bash
    cd backend
    npm start
    ```

2. Open another terminal and navigate to the `frontend` directory. Start the frontend server.

    ```bash
    cd frontend
    npm start
    ```

## Accessing the Project

- You can now access the project by opening your browser and navigating to: [http://localhost:3000/](http://localhost:3000/).
- Adminer (a database management tool) is available at: [http://localhost:10101/](http://localhost:10101/).

## Additional Notes

- Make sure Docker is running on your machine before starting the setup.
- Ensure that the `.env` file in the backend directory is correctly configured with your environment variables.

## Troubleshooting

- If you encounter any issues, check the Docker containers' logs for any error messages.
- Ensure that the database migrations have run successfully.
- Verify that both backend and frontend servers are running without errors.

## Acknowledgments

- CITY College, University of York Europe Campus
- Supervisor: Dr. Konstantinos Dimopoulos

