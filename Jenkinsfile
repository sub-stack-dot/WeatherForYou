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
                script {
                    docker.build("${BACKEND_IMAGE}", "./backend")
                }
            }
        }

        stage('Build Frontend Image') {
    steps {
        script {
            docker.build("${FRONTEND_IMAGE}", "-f ./frontend/weatherapp/Dockerfile ./frontend/weatherapp")
        }
    }
}


        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        docker.image("${BACKEND_IMAGE}").push()
                        docker.image("${FRONTEND_IMAGE}").push()
                    }
                }
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
