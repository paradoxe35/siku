#!/bin/bash

echo "Waiting Docker Db Service to launch on 3306..."

while ! nc -z siku-db 3306; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

echo "Docker Db Service launched"
