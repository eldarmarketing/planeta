#!/bin/bash

# ===========================================
# Deployment Script for Beget Hosting
# ===========================================

# Configuration - ИЗМЕНИТЕ ЭТИ ЗНАЧЕНИЯ
BEGET_USER="your_username"        # Ваш логин на Beget
BEGET_HOST="${BEGET_USER}.beget.tech"
REMOTE_PATH="~/public_html"       # Или ~/domains/yourdomain.ru/public_html

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment to Beget...${NC}"
echo ""

# Step 1: Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Step 2: Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"
echo ""

# Step 3: Copy .htaccess to dist
echo -e "${YELLOW}📝 Copying .htaccess...${NC}"
cp public/.htaccess dist/.htaccess

# Step 4: Show what will be uploaded
echo -e "${YELLOW}📁 Files to upload:${NC}"
ls -la dist/
echo ""

# Step 5: Confirm deployment
read -p "Deploy to ${BEGET_HOST}? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Deployment cancelled.${NC}"
    exit 1
fi

# Step 6: Upload to Beget
echo -e "${YELLOW}📤 Uploading to Beget...${NC}"

# Using rsync (recommended)
rsync -avz --delete --progress \
    dist/ \
    ${BEGET_USER}@${BEGET_HOST}:${REMOTE_PATH}/

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌐 Your site is live at: https://yourdomain.ru${NC}"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    echo ""
    echo "Возможные причины:"
    echo "1. Проверьте SSH ключи: ssh-keygen -t rsa"
    echo "2. Добавьте ключ в панели Beget: SSH-доступ"
    echo "3. Или используйте FTP загрузку вручную"
    exit 1
fi

