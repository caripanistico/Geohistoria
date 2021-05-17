#!/bin/bash

echo "(1) installing back-end..."

cd ./Back-End
python3 -m pip install -r requirements.txt

echo "(2) starting back-end..."

export FLASK_APP="test"
gnome-terminal -- python3 -m flask run

echo "(3) installing front-end"

cd ../Front-End
npm install

echo "(4) starting front-end"
gnome-terminal -- npm start
