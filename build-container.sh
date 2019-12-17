# creates a nodejs app bundle
set -x
rm -rf ./tmp/rocketchat-build
meteor build --directory ./tmp/rocketchat-build

# create docker image
cp .docker/Dockerfile ./tmp/rocketchat-build
cd ./tmp/rocketchat-build
docker build -t rocketchat-dc .