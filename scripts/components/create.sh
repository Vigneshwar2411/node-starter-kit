#!/bin/bash

if [[ "$1" == "" ]]; then
  echo 'Usage: ./create.sh Header'
  exit 1
fi

FULL_NAME=$1
NAME=$(echo "$FULL_NAME" | grep -Eo '[[:alnum:]_]+$')
COMP_PATH="client/javascripts/components/$FULL_NAME"
DIR_PATH="src/client/javascripts/components/$FULL_NAME"
SRC_PATH="$DIR_PATH/$NAME.jsx"
TEST_DIR="test/unit/client/javascripts/components/$FULL_NAME"
TEST_PATH="$TEST_DIR/$NAME.spec.jsx"
INDEX_PATH="$DIR_PATH/index.js"

if [ -e $SRC_PATH ]; then
  echo "ERROR: Component $FULL_NAME already exists"
  exit 1
fi
if [ -e $TEST_PATH ]; then
  echo "ERROR: Test for component $FULL_NAME already exists"
  exit 1
fi

mkdir -p $DIR_PATH
mkdir -p $TEST_DIR
cat scripts/components/Component.template.jsx | sed "s~__NAME__~$NAME~g" > $SRC_PATH
cat scripts/components/Component.template.spec.jsx | sed "s~__NAME__~$NAME~g" | sed "s~__COMP_PATH__~$COMP_PATH~g" > $TEST_PATH
cat scripts/components/index.template.js | sed "s~__NAME__~$NAME~g" > $INDEX_PATH
