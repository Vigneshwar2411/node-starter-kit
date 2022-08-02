#!/bin/bash

echo "Awesome you are few steps away from your initial project setup"

read -p "Give a cool name for your project : " n1
read -p "What's repository URL for your project : " n2
read -p "Write an amazing description for your project : " n3

json -I -f package.json -e "this.name='$n1'"
json -I -f package.json -e "this.repository.url='$n2'"
json -I -f package.json -e "this.description='$n3'"

mv "$PWD" "${PWD%/*}/$n1"

rm -rf .git/

echo "You're all set to code this awesome project."