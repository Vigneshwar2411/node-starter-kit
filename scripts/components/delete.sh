#!/bin/bash

if [[ "$1" == "" ]]; then
  echo 'Usage: ./delete.sh Header'
  exit 1
fi

FULL_NAME=$1
NAME=$(echo "$FULL_NAME" | grep -Eo '[[:alnum:]_]+$')
COMP_PATH="src/client/javascripts/components/$FULL_NAME"
SRC_PATH="$COMP_PATH/$NAME.jsx"
TEST_DIR="test/unit/client/javascripts/components/$FULL_NAME"
TEST_PATH="$TEST_DIR/$NAME.spec.jsx"
INDEX_PATH="$COMP_PATH/index.js"

if [ ! -e $SRC_PATH ]; then
  echo "ERROR: Component $FULL_NAME does not exist"
  exit 1
fi
if [ ! -e $TEST_PATH ]; then
  echo "ERROR: Test for component $FULL_NAME does not exist"
  exit 1
fi

rm -rf $COMP_PATH
rm -rf $TEST_DIR
