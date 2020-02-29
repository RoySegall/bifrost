#!/usr/bin/env bash

# Installing django stuff.

# Setting up the server.
echo "Setting up dango stuff"
pip install -r requirements.txt
mysql -e 'CREATE DATABASE bifrost;'
cp bifrost/local_settings.travis.py bifrost/local_settings.py
python manage.py migrate
python manage.py migrate_content
#python manage.py runserver &
#echo "Server is runing!"
#
## Setting up the front.
#echo "Setting up react stuff"
#cd static
#npm i
#npm start &
#echo "React is running"



