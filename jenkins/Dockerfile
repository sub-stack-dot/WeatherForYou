FROM jenkins/jenkins:lts
USER root

ARG DOCKER_GID=999
RUN apt-get update && apt-get install -y docker.io docker-compose curl git
# Match host docker.sock group id so the jenkins user can access it.
RUN groupadd -g ${DOCKER_GID} docker || groupmod -g ${DOCKER_GID} docker
RUN usermod -aG docker jenkins

USER jenkins
