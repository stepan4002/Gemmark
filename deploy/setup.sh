#!/bin/bash
# GemMARK Deployment Script for Hetzner
# Run this on a fresh Ubuntu server with root access
# Usage: bash setup.sh

set -e

echo "=== GemMARK Deployment Setup ==="
echo "Domain: gemmark.sk"
echo ""

# Update system
echo ">> Updating system..."
apt update && apt upgrade -y

# Install Docker
echo ">> Installing Docker..."
apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Install Docker Compose plugin
echo ">> Installing Docker Compose..."
apt install -y docker-compose-plugin

# Install Nginx
echo ">> Installing Nginx..."
apt install -y nginx

# Install Certbot for SSL
echo ">> Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# Clone the repository
echo ">> Cloning GemMARK repository..."
cd /opt
if [ -d "Gemmark" ]; then
    cd Gemmark && git pull
else
    git clone https://github.com/stepan4002/Gemmark.git
    cd Gemmark
fi

# Build and start with Docker
echo ">> Building and starting GemMARK..."
docker compose up -d --build

# Configure Nginx
echo ">> Configuring Nginx..."
cp deploy/nginx.conf /etc/nginx/sites-available/gemmark.sk
ln -sf /etc/nginx/sites-available/gemmark.sk /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx

echo ""
echo "=== Basic setup complete! ==="
echo ""
echo "Next steps:"
echo "1. Make sure your DNS A records point to this server's IP:"
echo "   gemmark.sk     -> YOUR_SERVER_IP"
echo "   www.gemmark.sk -> YOUR_SERVER_IP"
echo ""
echo "2. Once DNS propagates, run this to enable HTTPS:"
echo "   certbot --nginx -d gemmark.sk -d www.gemmark.sk"
echo ""
echo "3. Verify at: http://gemmark.sk"
echo ""
echo "To update the site later:"
echo "   cd /opt/Gemmark && git pull && docker compose up -d --build"
