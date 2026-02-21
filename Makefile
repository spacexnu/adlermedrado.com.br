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
	rsync -rvhe ssh --progress --delete ./public/ xablau

deploy-onion:
	# rsync -avz --delete --rsync-path="sudo rsync" ./public/ spacexnu@192.168.1.167:/srv/www/htdocs/adlermedrado
	rsync -avz ./public/ spacexnu@217.154.210.46:/home/spacexnu/code/onion

.PHONY: serve build build-onion clear-sign deploy deploy-onion
