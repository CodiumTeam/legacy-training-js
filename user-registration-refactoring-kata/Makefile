.PHONY: default build test test-watch coverage docker-test docker-test-watch docker-coverage
default: docker-test-watch

build:
	npm install

test:
	npm test

test-watch:
	npm run test:watch

server:
	npm run server

coverage:
	npm run coverage
	@printf "To visualize the lines open the report at coverage/lcov-report/index.html\n"

docker-test:
	docker run -it --rm -v ${PWD}:/kata codiumteam/legacy-training-js make test

docker-test-watch:
	docker run -it --rm -v ${PWD}:/kata codiumteam/legacy-training-js make test-watch

docker-coverage:
	@docker run -it --rm -v ${PWD}:/kata codiumteam/legacy-training-js make coverage

docker-server:
	@docker run -it --rm -p 3000:3000 -v ${PWD}:/kata codiumteam/legacy-training-js make server
