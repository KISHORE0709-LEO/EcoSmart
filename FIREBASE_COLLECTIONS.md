# 🔥 Firebase Collections in EcoSmart Database

## 📊 **Database Collections Created**

### 1. **`contacts`** Collection
**Purpose**: Store contact form submissions
**Created by**: `src/components/ContactForm.tsx`
**Data Structure**:
```json
{
  "name": "User Name",
  "email": "user@example.com", 
  "message": "Contact message text",
  "timestamp": "2024-01-01T00:00:00Z",
  "status": "new"
}
```

### 2. **`users`** Collection  
**Purpose**: Store user profiles and statistics
**Created by**: `src/pages/Register.tsx`, `src/pages/Profile.tsx`
**Data Structure**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "City, State",
  "createdAt": "2024-01-01T00:00:00Z",
  "stats": {
    "itemsClassified": 25,
    "ecoPoints": 150,
    "streakDays": 7,
    "level": "Eco Warrior"
  },
  "lastUpdated": "2024-01-01T00:00:00Z"
}
```

### 3. **`classifications`** Collection
**Purpose**: Track ML classification history
**Created by**: `src/components/ClassificationSection.tsx`, `src/utils/firebase-init.ts`
**Data Structure**:
```json
{
  "userId": "firebase-user-id",
  "userEmail": "user@example.com",
  "category": "biodegradable",
  "confidence": 95.5,
  "timestamp": "2024-01-01T00:00:00Z",
  "imageSize": 1024000,
  "processingTime": 1.2
}
```

## 🎯 **How Collections Are Created**

### **Automatic Creation**:
1. **App Load**: `src/pages/Index.tsx` calls `initializeFirebaseCollections()`
2. **User Registration**: Creates user profile in `users` collection
3. **Contact Form**: Saves submissions to `contacts` collection  
4. **ML Classification**: Saves results to `classifications` collection

### **View Collections**:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `ecosmart-513a8`
3. Click **Firestore Database**
4. Collections will appear after first use

## 📈 **Collection Usage**

- **`contacts`**: 📧 Contact form submissions
- **`users`**: 👤 User profiles, stats, achievements
- **`classifications`**: 🤖 ML prediction history, analytics

All collections are automatically created when the app is used! 🌱