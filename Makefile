serve:
	hugo server -D

build:
	hugo --gc --minify

clear-sign:
	./clearsign_html.sh
