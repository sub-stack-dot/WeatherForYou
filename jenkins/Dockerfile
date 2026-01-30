FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y docker.io
RUN apt-get install -y docker-compose-plugin curl git
# Add jenkins user to docker group so it can run docker commands
RUN usermod -aG docker jenkins
USER jenkins
