# Known Issues & Caveats

## 1. Image Storage
- Currently, uploaded images are stored locally in the `/uploads` directory. For a production environment, integration with a cloud storage service like AWS S3 or Cloudinary is recommended.

## 2. Real-time Features
- The messaging system currently uses polling. Under very high traffic, this might increase server load compared to a WebSocket (Socket.io) implementation.

## 3. Deployment Setup
- The current `.env.example` assumes a local MongoDB instance. If deploying, ensure the `MONGO_URI` is updated to a cloud instance (like MongoDB Atlas).
