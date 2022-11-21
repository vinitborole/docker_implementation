## Compose sample application

### Use with Docker Development Environments

A simple full stack Docker Containerised Solution with NodeJs Express backend, ReactJs frontend and MYSQL backend DB. 
Application is under frequent development and currently used for dev envirnonment only. 


### ROADMAP
1. Setup containerised architecture - DONE
2. Setup backend with CRUD operations - DONE
3. Use Internal backend for react application - DONE
4. Implement redux for application 


## Development
Clone the repo
```
git clone https://github.com/vinitborole/docker_implementation.git
```
Build the images
```
docker-compose build
```
or
to build and run dirctly
```
docker-compose up -d
```

For development, the `backend/` and `frontend/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The frontend server is spun up at `http://localhost`. 

A Healthcheck is configured for mysql to let wait for backend server unless mysql imports the dump files and is ready to accept connection.

Any changes in the `backend/` and `frontend/` will need to update build 
```
docker-compose down && docker-compose build && docker-compose up 
```

