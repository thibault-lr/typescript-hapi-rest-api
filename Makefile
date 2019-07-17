.DEFAULT_GOAL := help

CONTAINER_PREFIX=hapi-rest-api
DC=docker-compose -p ${CONTAINER_PREFIX}

copy-env: ## Create the .env file at the root
	cp -n .env.template .env;  if [ $$? -eq 0 ] ; then echo "\n\033[31m[ERR] File .env already exists\033[0m\n" ; fi
	
setup: pull build up ## Setup the development environment

pull: ## Pull the external images
	${DC} pull

build: ## Build the containers and pull FROM statements
	${DC} build

rebuild: ## Rebuild the containers
	${MAKE} down build up

up:
	${DC} up -d 

down: 
	${DC} down 

destroy: ## Destroy the containers, volumes, networks…
	${DC} down -v --remove-orphan


bash: ARGS = hapi-rest-api_api
bash: ## Run bash shell
	${DC} exec ${ARGS} bash	

logs: ## Show containers logs
	${DC} logs -f --tail="100"	