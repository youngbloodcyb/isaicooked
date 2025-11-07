#!/bin/bash

# Check if ADMIN_SECRET is set
if [ -z "$ADMIN_SECRET" ]; then
  echo "Error: ADMIN_SECRET environment variable is not set"
  exit 1
fi

# Default to localhost:3000 if PORT is not set
PORT=${PORT:-3000}
URL="http://localhost:${PORT}/api/cron?secret=${ADMIN_SECRET}"

echo "Calling endpoint: $URL"
curl -X GET "$URL" \
  -H "Content-Type: application/json" \
  -w "\n\nHTTP Status: %{http_code}\n"

