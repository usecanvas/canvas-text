BROWSERIFY = node_modules/.bin/browserify
STYLUS = node_modules/.bin/stylus

.PHONY: all css js

all: css js

css: assets/bundle.css
js: assets/bundle.js

assets/bundle.css: src/css/* src/css/**/*
	$(STYLUS) src/css/main.styl -o assets/bundle.css --sourcemap-inline -c

assets/bundle.js: src/js/* src/js/**/*
	$(BROWSERIFY) src/js/main.js -o assets/bundle.js -d \
		-t [ babelify --presets [ es2015 stage-0 ] ] \
		-t uglifyify

watch:
	watchman-make -p 'src/**/*' -t all
