#!/usr/bin/env bash
if [[ $1 == 1 ]]; then
    # When first argument is 1 we want a DB.
    pip install -r requirements.txt
    mysql -e 'CREATE DATABASE bifrost;'
    cp bifrost/local_settings.travis.py bifrost/local_settings.py
else
    pip install pycodestyle
fi
