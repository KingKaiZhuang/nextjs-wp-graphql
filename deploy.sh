#!/bin/bash

echo "== Pulling latest code =="
git pull origin main

echo "== Installing deps =="
npm install

echo "== Building Next.js =="
npm run build

echo "== Restarting PM2 =="
pm2 restart nextjs-wp

echo "== Done. =="
