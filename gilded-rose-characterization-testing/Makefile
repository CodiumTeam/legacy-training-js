.PHONY: default build test test-watch coverage docker-test docker-test-watch docker-coverage
default: docker-test

build:
	npm install

test:
	npm test

test-watch:
	npm run test:watch

coverage:
	npm run coverage
	@printf "To visualize the lines open the report at coverage/lcov-report/index.html\n"

mutation: test
	npm run stryker
	@printf "To visualize the lines open the report at reports/mutation/html/index.html\n"

docker-build:
	docker build -t codiumteam/legacy-training-js:gilded-rose-characterization -f ../Dockerfile .

docker-test:
	docker run -it --rm -v ${PWD}:/code codiumteam/legacy-training-js:gilded-rose-characterization make test

docker-test-watch:
	docker run -it --rm -v ${PWD}:/code codiumteam/legacy-training-js:gilded-rose-characterization make test-watch

docker-coverage:
	@docker run -it --rm -v ${PWD}:/code codiumteam/legacy-training-js:gilded-rose-characterization make coverage

docker-mutation:
	@docker run -it --rm -v ${PWD}:/code codiumteam/legacy-training-js:gilded-rose-characterization make mutation
