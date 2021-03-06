# Introduction to Docker

> Docker provides a way to run applications securely isolated in a container, packaged with all its dependencies and libraries.

If you don't already have it installed, please install [Docker for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac) on your machine. If you're using Windows, then uhhh sorry, but we should be pair-programming anyways and we don't have time to do other stuff.

So, why do we want this?

- use a set of instructions to build the same thing every time
- don't need multiple versions of node/ruby/python etc installed on your machine and being managed
- can easily test upgrading node versions or some other dependencies without messing with your host machine.
- makes DevOps love us 😍

To achieve this, we need to create a Dockerfile, which contains the instructions to build our app. This is an example Dockerfile.
Let's examine what each line of this is doing. It's for a Ruby app, so you can't copy and paste it 😇.

```
FROM ruby:2.4-alpine

RUN apk update && apk add build-base nodejs postgresql-dev git

RUN mkdir /app
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

LABEL maintainer="Lee Freeman <lee.freeman1@gmail.com>"

CMD puma -C config/puma.rb
```

# A few useful commands

- FROM - The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions.
- WORKDIR - The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile. If the WORKDIR doesn’t exist, it will be created even if it’s not used in any subsequent Dockerfile instruction.
- COPY - The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.
- RUN - The RUN instruction will execute any commands in a new layer on top of the current image and commit the results. The resulting committed image will be used for the next step in the Dockerfile.
- EXPOSE - The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime.
- CMD - The main purpose of a CMD is to provide defaults for an executing container.

We're aiming to build a container for a Node.js app (Express server). If this goes well and we do more in the future, then we'll look at deploying a React app as well and then getting the front-end and back-end talking to each other.

Today's goals:

- [ ] ensure 01-server/index.js runs locally
- [ ] write a Dockerfile and build an image (it's useful to _tag_ your image so we can easily refer to it later)
- [ ] run the Dockerfile and observe that it works on localhost.

Stretch goals:

- [ ] optimize your build process
- [ ] repeat above steps for 02-client (please don't get this far, I haven't written anything)
- [ ] amend 02-client to fetch data from 01-server and get them speaking to each other.

Resources:

- [writing Dockerfiles](https://docs.docker.com/engine/reference/builder/#usage)
- [building images](https://docs.docker.com/engine/reference/commandline/build/)
- [running images](https://docs.docker.com/engine/reference/commandline/run/)
