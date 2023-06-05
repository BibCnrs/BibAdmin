.PHONY: default install run-dev run-prod test npm build help
.DEFAULT_GOAL := help

help:
	@test -f /usr/bin/xmlstarlet || echo "Needs: sudo apt-get install --yes xmlstarlet"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := npm build-docker build
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

bump: ## create currentCommit file
	git rev-parse HEAD > .currentCommit


npm-install-dev: ## ## install npm dependencies (after change in package.json)
	docker compose run --rm npm install

npm-install: ## ## install npm dependencies (respect package-lock.json)
	docker compose run --rm npm ci

install: npm-install bump ## install npm dependencies and bump currentCommit file

run-dev: ## run BibAdmin for development
	docker compose -f docker-compose.dev.yml up --force-recreate

run-preview: ## run BibAdmin for development
	docker compose -f docker-compose.preview.yml up --force-recreate

run-prod: ## run BibAdmin for production make sure env BIBAPI_HOST and BIBADMIN_HOST are set
	 docker compose -f docker-compose.prod.yml up -d --force-recreate

build-docker: ## args: <version> build bibcnrs/bibadmin:<version> docker image default <version> to latest
ifdef COMMAND_ARGS
	docker build --no-cache -t vxnexus-registry.intra.inist.fr:8083/bibcnrs/bibadmin:$(COMMAND_ARGS) .
else
	docker build --no-cache -t vxnexus-registry.intra.inist.fr:8083/bibcnrs/bibadmin:latest .
endif

build-script: ## build javascript and css for production make sure env REACT_APP_BIBAPI_HOST and REACT_APP_BIBADMIN_HOST are set
	docker compose run --rm build

build: build-script build-docker ## build javascript and css for production make sure env REACT_APP_BIBAPI_HOST and REACT_APP_BIBADMIN_HOST are set

build-docker-v4:
ifdef COMMAND_ARGS
	docker build --no-cache -t vxnexus-registry.intra.inist.fr:8083/bibcnrs/admin:$(COMMAND_ARGS) .
else
	docker build --no-cache -t vxnexus-registry.intra.inist.fr:8083/bibcnrs/admin:latest .
endif

build-script-v4:
	docker compose -f docker-compose.v4.yml run --rm build

build-v4: build-script-v4 build-docker-v4

update: stop cleanup-docker install build

npm: ## dockerized npm command example: make npm 'install some_dependency --save'
	docker compose run --rm npm $(COMMAND_ARGS)

docker-rm: ## remove all bibadmin container
	test -z "$$(docker ps -a | grep bibadmin)" || \
            docker rm --force $$(docker ps -a | grep bibadmin | awk '{ print $$1 }')

stop: ## stop all bibcnrs docker image
	test -z "$$(docker ps | grep bibadmin)" || \
            docker stop $$(docker ps | grep bibadmin | awk '{ print $$1 }')

cleanup-docker: ## stop all bibcnrs docker image
	test -z "$$(docker ps -a | grep bibadmin)" || \
            docker rm $$(docker ps -a | grep bibadmin | awk '{ print $$1 }')
