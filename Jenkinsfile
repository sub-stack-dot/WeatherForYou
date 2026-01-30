pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = 'github-credentials'
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        BACKEND_IMAGE = 'subhanisenevirathne/weatherforyou-backend:latest'
        FRONTEND_IMAGE = 'subhanisenevirathne/weatherforyou-frontend:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sub-stack-dot/WeatherForYou.git',
                    credentialsId: "${GITHUB_CREDENTIALS}"
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE} ./backend"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE} ./frontend/weatherapp"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                    sh "docker push ${BACKEND_IMAGE}"
                    sh "docker push ${FRONTEND_IMAGE}"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh 'ssh -o StrictHostKeyChecking=no -i /home/jenkins/.ssh/id_rsa ubuntu@13.202.40.167 \\"cd /home/ubuntu && docker-compose pull && docker-compose up -d\\"'
            }
        }
    }

    post {
        success {
            echo "CI/CD Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
    }
}
