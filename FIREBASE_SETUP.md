# 🔥 Firebase Setup Guide

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name: "EcoSmart"
4. Enable Google Analytics (optional)

## Step 2: Setup Firestore Database
1. **Firestore Database** → **Create database**
2. **Start in test mode** (for development)
3. **Location**: Choose nearest region

## Step 3: Setup Authentication
1. **Authentication** → **Get started**
2. **Sign-in method** → **Email/Password** → **Enable**

## Step 4: Get Configuration
1. **Project Settings** → **General**
2. **Your apps** → **Web app** → **Add app**
3. **Copy the config object**

## Step 5: Update Environment Variables
Create `.env.local` file:
```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 6: View Database
1. **Firestore Database** → **Data**
2. You'll see collections like:
   - `feedback` (contact form submissions)
   - `users` (user profiles)
   - `classifications` (ML results)

## Collections Structure:
```
feedback/
├── document1
│   ├── name: "John Doe"
│   ├── email: "john@example.com"
│   ├── message: "Great app!"
│   ├── timestamp: 2024-01-01
│   └── status: "new"
```