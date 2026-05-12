DEPLOY_ENV ?= deploy.env
-include $(DEPLOY_ENV)

help:
	@echo "targets:"
	@echo "serve: Run a local hugo development server"
	@echo "build: Build the minified version of the site"
	@echo "clear-sign: Generate .asc signatures for published assets"
	@echo "deploy: Deploy files to server"
	@echo "help: Show this help"
	@echo "build-onion: Build the Tor version of the site"
	@echo "deploy-onion: Deploy Tor version to the hidden service"

serve:
	hugo server -D

build:
	hugo --gc --minify

build-onion:
	hugo --gc --minify --config config.toml,config.onion.toml

clear-sign:
	./clearsign_html.sh

deploy:
	rsync -rvh --progress --delete -e "ssh -i $(DEPLOY_SSH_KEY)" ./public/ $(DEPLOY_USER)@$(DEPLOY_HOST):$(DEPLOY_PATH)

deploy-onion:
	# rsync -avz --delete --rsync-path="sudo rsync" ./public/ spacexnu@192.168.1.167:/srv/www/htdocs/adlermedrado
	rsync -avz ./public/ $(DEPLOY_ONION_USER)@$(DEPLOY_ONION_HOST):$(DEPLOY_ONION_PATH)

.PHONY: serve build build-onion clear-sign deploy deploy-onion
