# Tenatica File Sharing API

This is a file sharing backend application.

## Getting started

You should have [nodejs](https://nodejs.org/en/) installed on your machine.

> The following environment variables are required to start the server:

- PORT (default to 5000)
- FIREBASE_DATABASE_URL
- FIREBASE_PRIVATE_KEY
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_STORAGE_BUCKET_URL

## Start the server

In development mode:

```bash
    yarn start:dev
```

In production mode:

```bash
    yarn start
```

If all good, you would see `Server started on port 5000 (default)`
