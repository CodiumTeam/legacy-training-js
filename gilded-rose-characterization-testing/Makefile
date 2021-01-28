.PHONY: default test test-watch coverage docker-test docker-test-watch docker-coverage
default: docker-test-watch

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

docker-test:
	docker run -it --rm -v ${PWD}:/kata codiumteam/tdd-training-js make test

docker-test-watch:
	docker run -it --rm -v ${PWD}:/kata codiumteam/tdd-training-js make test-watch

docker-coverage:
	@docker run -it --rm -v ${PWD}:/kata codiumteam/tdd-training-js make coverage

docker-mutation:
	@docker run -it --rm -v ${PWD}:/kata codiumteam/legacy-training-js make mutation