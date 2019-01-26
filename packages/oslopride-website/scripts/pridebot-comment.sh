#!/bin/bash

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
	curl -H "Authorization: token ${PRIDEBOT_TOKEN}" -X POST -d "{\"body\": \"${NOW_DEPLOYMENT}\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments";
fi
