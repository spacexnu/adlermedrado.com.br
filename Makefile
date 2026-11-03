DEPLOY_ENV ?= deploy.env
-include $(DEPLOY_ENV)
export PATH := $(CURDIR)/.tools/bin:$(PATH)

help:
	@echo "targets:"
	@echo "setup: Install the pinned Hugo version locally"
	@echo "serve: Run a local hugo development server"
	@echo "build: Stamp humans.txt and build the minified site"
	@echo "clear-sign: Generate .asc signatures for published assets"
	@echo "deploy: Deploy files to server"
	@echo "verify-agent-discovery: Build and validate agent discovery artifacts"
	@echo "verify-site-ui: Build and validate site UI and accessibility contracts"
	@echo "help: Show this help"
	@echo "build-onion: Stamp humans.txt and build the Tor version of the site"
	@echo "deploy-onion: Deploy Tor version to the hidden service"

setup:
	sh ./scripts/setup_hugo.sh

serve:
	hugo server -D

build: update-humans-txt
	hugo --gc --minify

build-onion: update-humans-txt
	hugo --gc --minify --config config.toml,config.onion.toml

update-humans-txt:
	@stamp=$$(TZ=America/Sao_Paulo date +'%Y/%m/%d %H:%M'); \
	grep -q '^[[:space:]]*Last update:' static/humans.txt || { printf '%s\n' 'static/humans.txt has no Last update line' >&2; exit 1; }; \
	sed -i -E "s|^([[:space:]]*)Last update:.*|\1Last update: $$stamp GMT-3|" static/humans.txt; \
	printf '%s\n' "humans.txt: Last update $$stamp GMT-3"

clear-sign:
	./clearsign_html.sh

deploy:
	rsync -rvh --progress --delete -e "ssh -o BatchMode=yes -o IdentitiesOnly=yes -o PreferredAuthentications=publickey -i $(DEPLOY_SSH_KEY)" ./public/ $(DEPLOY_USER)@$(DEPLOY_HOST):$(DEPLOY_PATH)

deploy-onion:
	rsync -rvh --progress --delete -e "ssh -o BatchMode=yes -o IdentitiesOnly=yes -o PreferredAuthentications=publickey -i $(DEPLOY_SSH_KEY)" ./public/ $(DEPLOY_ONION_USER)@$(DEPLOY_ONION_HOST):$(DEPLOY_ONION_PATH)

verify-agent-discovery:
	./scripts/verify_agent_discovery.sh

verify-site-ui:
	./scripts/verify_site_ui.sh

.PHONY: help setup serve build build-onion update-humans-txt clear-sign deploy deploy-onion verify-agent-discovery verify-site-ui
