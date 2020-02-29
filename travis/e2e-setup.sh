#!/usr/bin/env bash

# Installing django stuff.

echo "------\n"
echo "Setting up dango stuff"
bash ./python-setup.sh
python manage.py migrate
python manage.py runserver &
echo "Server is runing!"
echo "------\n"



