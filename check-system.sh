#!/bin/bash
ERROR=""
OUTPUT=""
function printStatus() {
  if [ $? -ne 0 ]; then
    echo "Error"
    ERROR="${ERROR} \n\n${OUTPUT}"
  else
    echo "Ok"
  fi
}

function validateKata() {
    echo -n "Validating $1..."
    OUTPUT=$($2 2>&1 && $3 2>&1 && $4 2>&1)
    printStatus
}

function validateDocker() {
    echo -n "Validating docker running..."
    (docker ps) > /dev/null
    if [ $? -ne 0 ]; then
      echo "Error"
      echo "Are you sure that you have docker running?"
      echo "If you don't want to install docker, you can open tennis-refactoring-kata and run the tests using your IDE."
      exit 1
    else
      echo "Ok"
    fi

    echo -n "Downloading the docker image..."
    (docker pull codiumteam/legacy-training-js) > /dev/null
    if [ $? -ne 0 ]; then
      echo "Error"
      echo "There is a problem downloading the docker image"
      exit 1
    else
      echo "Ok"
    fi

    echo -n "Validating docker mount permissions..."
    (docker run -it --rm -v ${PWD}:/kata codiumteam/legacy-training-js ls) > /dev/null
    if [ $? -ne 0 ]; then
      echo "Error"
      echo "Are you sure that you have permissions to mount your volumes?"
      exit 1
    else
      echo "Ok"
    fi
}

function validateMake() {
  echo -n "Validating make installed..."
    (make -h) > /dev/null
    if [ $? -ne 0 ]; then
      echo "Error"
      echo "Do you have make installed?"
      echo "If you don't want to install make, you can run read how to run the tests opening the Makefile."
      exit 1
    else
      echo "Ok"
    fi
}

validateDocker
validateMake
validateKata web-page-generator-kata "cd web-page-generator-kata" "make docker-generate-webpage"
validateKata tennis-refactoring-kata "cd tennis-refactoring-kata" "make docker-test"
validateKata user-registration-refactoring-kata "cd user-registration-refactoring-kata" "make docker-test"
validateKata gilded-rose-characterization-testing "cd gilded-rose-characterization-testing" "make docker-test"
validateKata weather-kata "cd weather-kata" "make docker-test"
validateKata trip-service-kata "cd trip-service-kata" "make docker-test"
validateKata trivia-golden-master "cd trivia-golden-master" "make docker-test"
validateKata print-date "cd print-date" "make docker-test"

if [ -z "$ERROR" ]; then
  echo "Congratulations! You are ready for the training!"
else
  echo -e "----------------------------------------------------------\n\n$ERROR"
  echo -e "\n\nPlease send an email with the problem you have to info@codium.team\n"
fi
