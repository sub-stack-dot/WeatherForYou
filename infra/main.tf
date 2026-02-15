terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

# Security Group
resource "aws_security_group" "weather_app_sg" {
  name        = "weather-app-security-group"
  description = "Security group for WeatherForYou application"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Change to your IP for security
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend API
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Jenkins UI
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Jenkins Agents
  ingress {
    from_port   = 50000
    to_port     = 50000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound - Allow all
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "weather-app-sg"
  }
}

# EC2 Instance
resource "aws_instance" "weather_app_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.small"
  vpc_security_group_ids = [aws_security_group.weather_app_sg.id]
  key_name               = aws_key_pair.deployer.key_name

  # 2GB RAM is default for t3.small
  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    delete_on_termination = true
  }

  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    jenkins_memory = "512m"
  }))

  tags = {
    Name = "weather-app-server"
  }

  depends_on = [aws_key_pair.deployer]
}

# Elastic IP
resource "aws_eip" "weather_app_eip" {
  instance = aws_instance.weather_app_server.id
  domain   = "vpc"

  tags = {
    Name = "weather-app-eip"
  }

  depends_on = [aws_instance.weather_app_server]
}

# Get latest Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# SSH Key Pair - Generate new key in AWS
resource "aws_key_pair" "deployer" {
  key_name   = "weather-app-key"
  public_key = file("${path.module}/../my-key.pub")

  tags = {
    Name = "weather-app-deployer-key"
  }
}

# Outputs
output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_eip.weather_app_eip.public_ip
}

output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.weather_app_server.id
}

output "security_group_id" {
  description = "The ID of the security group"
  value       = aws_security_group.weather_app_sg.id
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i ../my-key ubuntu@${aws_eip.weather_app_eip.public_ip}"
}

output "jenkins_url" {
  description = "Jenkins URL"
  value       = "http://${aws_eip.weather_app_eip.public_ip}:8080"
}

output "app_url" {
  description = "Application URL"
  value       = "http://${aws_eip.weather_app_eip.public_ip}"
}

output "backend_url" {
  description = "Backend API URL"
  value       = "http://${aws_eip.weather_app_eip.public_ip}:5000"
}
