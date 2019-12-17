# creates a nodejs app bundle
set -x
meteor build

# create docker image
docker build -t rocketchat-dc .