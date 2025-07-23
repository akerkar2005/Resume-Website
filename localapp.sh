#!/bin/bash

cd "$(dirname "$(realpath $0)")"

npm install -g concurrently
cd frontend; npm start
