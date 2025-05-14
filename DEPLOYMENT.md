# Rock-Paper-Scissors Game Deployment Guide

## Overview

This document provides instructions for deploying the Rock-Paper-Scissors game with proper configuration. The deployment architecture is as follows:

- Frontend: https://game.sandboxas.lt
- Backend API: https://api.sandboxas.lt

## Requirements

### Frontend Requirements

1. Build the frontend using `npm run build`
2. Deploy the contents of the `build` folder to your web server hosting the frontend domain

### Backend Requirements

1. Make sure the API server is running with HTTPS (required for secure cookie authentication)
2. Configure proper CORS settings to allow requests from the frontend domain
3. Ensure the database is properly set up to store user data and game history

## CORS Configuration

The API server must have proper CORS headers configured to allow requests from the frontend domain:

```python
# Server-side CORS configuration
CORS(app, 
     origins=["https://game.sandboxas.lt", "http://localhost:3000"],
     supports_credentials=True, 
     methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
     allow_headers=["Content-Type", "Authorization"])
```

## API Server Nginx Configuration Example

Here's a sample Nginx configuration for the API server:

```nginx
server {
    listen 443 ssl;
    server_name api.sandboxas.lt;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' 'https://game.sandboxas.lt' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        
        # Handle preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://game.sandboxas.lt' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

## Frontend Build and Deployment

1. Run the build script:
   ```bash
   npm run build
   ```

2. Copy the contents of the `build` directory to your web server hosting the frontend domain.

### Environment Configuration

The frontend automatically uses the correct API URL based on the environment:

- Development: http://localhost:5000
- Production: https://api.sandboxas.lt (always uses HTTPS)

## Testing the Deployment

1. Access the frontend at https://game.sandboxas.lt
2. Register a new user account
3. Play a few games and verify that:
   - Game history is saved
   - Scores are updated
   - Highscores appear in the leaderboard

## Troubleshooting

### Mixed Content Errors

If you see mixed content errors in the browser console, ensure the API server is using HTTPS. The frontend expects the API to use HTTPS in production mode.

### Authentication Issues

If users can't log in or stay logged in:

1. Check that cookies are being properly set with the `SameSite=None` and `Secure` attributes
2. Verify that `credentials: 'include'` is set on all frontend fetch requests
3. Ensure the API server is sending the proper CORS headers

### Score Update Problems

If highscores are not updating properly:

1. Check browser console for error messages during score updates
2. Verify that the user is properly authenticated
3. Check server logs for any API errors during score update requests
