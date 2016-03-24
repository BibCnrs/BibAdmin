.PHONY: default install run-dev run-prod test npm build help
.DEFAULT_GOAL := help

help:
	@test -f /usr/bin/xmlstarlet || echo "Needs: sudo apt-get install --yes xmlstarlet"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := npm
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

bump: ## create currentCommit file
	git rev-parse HEAD > .currentCommit

npm-install: ## ## install npm dependencies
	docker-compose -f docker-compose.base.yml run npm install

install: npm-install bump ## install npm dependencies and bump currentCommit file

run-dev: ## run BibAdmin for development
	docker-compose -f docker-compose.dev.yml up --force-recreate

run-prod: ## run BibAdmin for production make sure env BIBAPI_HOST and BIBADMIN_HOST are set
	docker-compose up -d --force-recreate

docker-stop: ## stop all bibadmin container
	test -z "$$(docker ps | grep bibadmin)" || \
            docker stop $$(docker ps -a | grep bibadmin | awk '{ print $$1 }')

build: ## build javascript and css for production make sure env BIBAPI_HOST and BIBADMIN_HOST are set
	cp -f node_modules/ng-admin/build/ng-admin.min.js ./public/vendor/ng-admin.min.js
	cp -f node_modules/ng-admin/build/ng-admin.min.css ./public/vendor/ng-admin.min.css
	docker-compose -f docker-compose.base.yml run build

npm: ## dockerized npm command exampne: make npm 'install some_dependency --save'
	docker-compose -f docker-compose.base.yml run --rm npm $(COMMAND_ARGS)

docker-rm: ## remove all bibadmin container
	test -z "$$(docker ps -a | grep bibadmin)" || \
            docker rm --force $$(docker ps -a | grep bibadmin | awk '{ print $$1 }')
