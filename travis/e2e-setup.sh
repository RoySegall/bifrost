#!/usr/bin/env bash

# Installing django stuff.

echo "------\n"
echo "Setting up dango stuff"
pip install -r requirements.txt
mysql -e 'CREATE DATABASE bifrost;'
cp bifrost/local_settings.travis.py bifrost/local_settings.py
python manage.py migrate
python manage.py runserver &
echo "Server is runing!"
echo "------\n"



