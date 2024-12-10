## Docker Setup for Backend

To run the `invoice-api` using Docker Compose, ensure Docker and Docker Compose are installed on your machine. Then, inside the `Project` directory, run the following command:

```bash
npm run docker:dev
```

This will build and start the services defined in the `docker-compose.yml` file. Your backend should now be accessible at `http://localhost:3000`.

To stop the running containers, execute:

```bash
npm run docker:down
```