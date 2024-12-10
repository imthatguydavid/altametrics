# David Kim - Altametrics Full Stack Code Test

This document will guide you through building Docker images for the backend, ensuring Docker runs properly, and running the frontend locally so users can log in.

## Prerequisites

- **Docker**: Ensure that Docker is installed on your machine. You can download and install it from [here](https://docs.docker.com/get-docker/).

- **Node.js & npm**: Make sure Node.js and npm are installed for running the frontend locally. You can download them from [here](https://nodejs.org/).

## Getting Started

### 1. Set Up Environment Variables

Before building Docker images, make sure to create a `.env` file in the root directory with the following contents:

```env
POSTGRES_USER=tonyStark
POSTGRES_PASSWORD=iamironman
POSTGRES_DB=altametrics
```

### 2. Building Docker Images for the Backend

#### Step 1: Clone the Repository

Begin by cloning the repository and navigating into the project's directory:

```bash
git clone https://github.com/imthatguydavid/altametrics.git
cd altametrics
```

#### Step 2: Build Docker Images

Build the Docker images using Docker Compose, which will take care of building all services defined in your `docker-compose.yml`, such as the backend:

```bash
docker-compose build
```

### 3. Running Docker Containers for the Backend

Start the backend with Docker Compose:

```bash
docker-compose up -d
```

#### Step 1: Verify Backend Docker Container

Ensure your backend container is running:

```bash
docker ps
```

You should see your backend container listed and running.

### 4. Running the Frontend Locally

Since the frontend is not containerized, it needs to be run locally using Node.js and npm.

#### Step 1: Navigate to the Frontend Directory

Go to your frontend directory:

```bash
cd frontend
```

#### Step 2: Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

#### Step 3: Start the Frontend Development Server

Start the development server to serve your frontend application:

```bash
npm run dev
```

Your frontend should now be running and accessible in your browser at `http://localhost:5173` or whichever port your Vite dev server uses.

### Accessing the Application

- **Backend API**: Typically available at `http://localhost:3000`.
- **Frontend Application**: Launch your browser and go to `http://localhost:5173`.

### Troubleshooting

- **Docker Issues**: Verify that Docker Desktop is running and no network-related issues are present that might hinder container communication.

- **Logs**:
    - View Docker logs via `docker-compose logs`.
    - Check terminal output for Node.js-related issues when running the frontend locally.

### Additional Notes

- **Environment Variables**: Ensure that you correctly set up `.env` files for both frontend and backend sections, specifying any sensitive information like API URLs or database credentials.

- Always verify that URLs, paths, and ports reflect actual settings used in your project configuration files.

For further support, please check our [repository's issue tracker](https://github.com/imthatguydavid/altametrics/issues) or contact our support team.