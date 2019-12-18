# creates a nodejs app bundle
set -x
TMP=/home/$USER/tmp/rocketchat-build
rm -rf $TMP
meteor build --directory $TMP

# create docker image
cp ./Dockerfile $TMP
cd $TMP
docker build -t rocketchat-dc .
