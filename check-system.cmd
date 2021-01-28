@echo off

CALL :validateDocker
CALL :validateKata tennis-refactoring-kata "docker run --rm -it -v %CD%:/kata codiumteam/tdd-training-js make test"
CALL :validateKata user-registration-refactoring-kata "docker run --rm -it -v %CD%:/kata codiumteam/tdd-training-js make test"
CALL :validateKata gilded-rose-characterization-testing "docker run --rm -it -v %CD%:/kata codiumteam/tdd-training-js make test"

goto :eof

:validateKata
    echo Validating %1...
    pushd %1
    CALL %~2
    popd
goto :eof

:validateDocker
    echo Validating docker running...
    docker ps >NUL: 2>NUL:
    IF ERRORLEVEL 1 (
      echo Error
      echo Are you sure that you have docker running?
      goto :eof
    ) else (
      echo "Ok"
    )

    echo Downloading docker image...
    docker pull codiumteam/tdd-training-js >NUL: 2>NUL:
    IF ERRORLEVEL 1 (
      echo Error
      echo There is a problem downloading the docker image
      goto :eof
    ) else (
      echo Ok
    )

    echo Validating docker mount permissions...
    docker run --rm -v "%CD%":/kata -w /kata codiumteam/tdd-training-js ls >NUL: 2>NUL:
    IF ERRORLEVEL 1 (
      echo Error
      echo Are you sure that you have permissions to mount your volumes?
      goto :eof
    ) else (
      echo Ok
    )
goto :eof

