pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    triggers {
        // Nightly run at 02:00; remove or adjust as needed.
        cron('H 2 * * *')
    }

    environment {
        // Selects src/env/<ENV>.env (dev | local | prod)
        ENV = 'dev'
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                // Requires the NodeJS plugin with a tool named 'node' configured,
                // OR Node already available on the agent/PATH.
                script {
                    def nodeHome = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'node --version && npm --version'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:ci'
            }
        }
    }

    post {
        always {
            // Machine-readable results for Jenkins trends and the qa-automation-hub.
            junit testResults: 'report/junit/results.xml', allowEmptyResults: true

            // Archive raw reports as build artifacts.
            archiveArtifacts artifacts: 'report/**', allowEmptyArchive: true, fingerprint: true

            // Visual HTML report (requires the HTML Publisher plugin).
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'report',
                reportFiles: 'index.html',
                reportName: 'API Test Report'
            ])
        }
    }
}
