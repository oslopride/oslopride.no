#!/bin/bash

if [ "${TRAVIS_BRANCH}" = "master" ] && [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
	now alias set $NOW_DEPLOYMENT beta.oslopride.no --token=$NOW_TOKEN --scope oslopride;
fi
