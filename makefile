.PHONY: default install run-dev run-prod test npm build

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := npm
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

bump:
	git rev-parse HEAD > .currentCommit

npm-install:
	docker-compose -f docker-compose.base.yml run npm install

install: npm-install bump

run-dev:
	NODE_ENV=development docker-compose -f docker-compose.dev.yml up --force-recreate

run-prod:
	NODE_ENV=production docker-compose up -d --force-recreate

stop:
	docker stop bibadmin_server_1

build:
	docker-compose -f docker-compose.base.yml run build

npm:
	docker-compose -f docker-compose.base.yml run --rm npm $(COMMAND_ARGS)
