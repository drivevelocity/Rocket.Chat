# creates a nodejs app bundle
set -x
rm -rf ./tmp
meteor build --directory ./tmp

# create docker image
cp .docker/Dockerfile ./tmp
cd ./tmp
docker build -t rocketchat-dc .