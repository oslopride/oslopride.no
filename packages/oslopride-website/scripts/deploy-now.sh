#!/bin/bash

# Deploy
NOW_DEPLOYMENT=$(now --token=$NOW_TOKEN --scope oslopride --no-clipboard)

# Pull Request
if [ $TRAVIS_PULL_REQUEST != "false" ]; then
	curl -H "Authorization: token $PRIDEBOT_TOKEN" -X POST -d "{\"body\": \"${NOW_DEPLOYMENT}\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments";
# Release on commit to master
elif [ $TRAVIS_BRANCH = "master" ]; then
  now alias set $NOW_DEPLOYMENT www.oslopride.no --token=$NOW_TOKEN --scope oslopride;
fi
