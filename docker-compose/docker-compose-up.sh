BASEDIR=$(dirname "$0")
cd "$BASEDIR"
cd ..

#xhost +
#docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix firefox:0.0.1
#docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix nodejs-app-new-note_app:latest

#docker-compose up
#xhost -

docker-compose run app npm run note-docker
#export 
#docker-compose run app bash