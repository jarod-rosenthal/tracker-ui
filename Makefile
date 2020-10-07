all:
	npm run build
	
proto:
	docker run --user $(shell id -u):$(shell id -g) -v $(shell pwd):/workspace --rm docker.io/skyhuborg/omniproto:1.32_0