#!/bin/bash

if [ "${TRAVIS_BRANCH}" = "master" ] && [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
	now alias set $NOW_DEPLOYMENT oslopride.now.sh --token=$NOW_TOKEN --team oslopride;
fi
