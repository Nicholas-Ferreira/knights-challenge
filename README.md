# knights-challenge

## Run Project with Docker

Create a .env file in the frontend and backend folder with the following information.

### For Backend:
```sh
PORT=8080
MONGODB_URI=mongodb://mongodb:27017/knights
```
### For Frontend:
```sh
VITE_API_URL="http://localhost:8080"
```

Install docker in device and run command below

```sh
docker compose up
```

