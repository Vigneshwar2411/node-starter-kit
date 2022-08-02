#!/bin/sh

for filename in /run/secrets/*; do
  . $filename
done