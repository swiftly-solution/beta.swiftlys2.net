#!/bin/bash

COMMAND=${1}

if [ "${COMMAND}" = "server" ]; then
    cd server
    air --build.cmd "go build -o build/api main.go" --build.bin "build/api"
elif [ "${COMMAND}" = "client" ]; then
    cd client
    nodemon
fi
