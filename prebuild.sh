#!/bin/bash

echo ">>> Install Packages"

yarn install || { echo 'yarn install failed' ; exit 1; }
