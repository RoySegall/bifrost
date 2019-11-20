#!/usr/bin/env bash
pip install -r requirements.txt

if [ $1 -eq 1 ]; then
    # When first argument is 1 we want a DB.
    mysql -e 'CREATE DATABASE bifrost;'
    cp bifrost/local_settings.travis.py bifrost/local_settings.py
fi
