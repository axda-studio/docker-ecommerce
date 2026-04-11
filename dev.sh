#!/bin/bash

# Start Postgres in background
docker compose -f docker-compose.dev.yml up -d

# Wait for Postgres to be ready
echo "⏳ Waiting for Postgres..."
sleep 3

# Start Strapi and Next.js in parallel
echo "🚀 Starting Strapi and Next.js..."
cd backend && npm run develop &
cd frontend && pnpm dev &
# Wait for both
wait