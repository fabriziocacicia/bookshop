DOCKER_COMPOSE = docker-compose up -d 

rebuild:
	docker-compose up -d --build

start: _start_backend _start_database

_start_backend:
	$(DOCKER_COMPOSE) backend

_start_database:
	$(DOCKER_COMPOSE) database

stop:
	docker-compose down