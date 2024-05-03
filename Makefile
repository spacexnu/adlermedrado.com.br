help:
	@echo "targets:"
	@echo "serve: Run a local hugo development server"
	@echo "build: Build the minified version of the site"
	@echo "clear-sign: PGP Clearsign all HTML pages of the site"
	@echo "deploy: Deploy files to server"
	@echo "help: Show this help"

serve:
	hugo server -D

build:
	hugo --gc --minify

clear-sign:
	./clearsign_html.sh

deploy:
	rsync -rvhe ssh --progress --delete ./public/ root@64.227.102.201:/var/www/adlermedrado.com.br

.PHONY: serve build sign
