BASEDIR=$(dirname "$0")
cd "$BASEDIR"
cd ..

docker-compose rm -f

#xhost +
#docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix firefox:0.0.1
#docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix nodejs-app-new-note_app:latest

#docker-compose up
#xhost -

docker-compose build

#export MY_UID=`id -u`
#export MY_GID=`id -g`
export NOTES_PATH="/mnt/microsd/ext4/qsync-notes/"

docker-compose run app bash
#export 
#docker-compose run app bash