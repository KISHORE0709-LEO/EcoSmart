import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Initialize Firebase collections with sample data
export const initializeFirebaseCollections = async () => {
  try {
    // Create contacts collection
    await addDoc(collection(db, "contacts"), {
      name: "Sample User",
      email: "sample@example.com",
      message: "This is a sample contact message to initialize the collection.",
      timestamp: serverTimestamp(),
      status: "sample"
    });

    // Create users collection
    await addDoc(collection(db, "users"), {
      profile: {
        name: "Demo User",
        email: "demo@ecosmart.com",
        phone: "+1 (555) 000-0000",
        location: "Demo City, DC"
      },
      stats: [
        { label: "Items Classified", value: "0", icon: "Recycle", color: "text-green-600" },
        { label: "Eco Points", value: "0", icon: "Leaf", color: "text-yellow-600" },
        { label: "Streak Days", value: "0", icon: "TrendingUp", color: "text-blue-600" },
        { label: "Level", value: "Beginner", icon: "Award", color: "text-purple-600" }
      ],
      achievements: [],
      createdAt: serverTimestamp()
    });

    // Create classifications collection
    await addDoc(collection(db, "classifications"), {
      userId: "demo-user",
      category: "biodegradable",
      confidence: 95.5,
      timestamp: serverTimestamp(),
      imageSize: "150x150",
      processingTime: 1.2
    });

    console.log("Firebase collections initialized successfully!");
    return true;
  } catch (error) {
    console.error("Error initializing Firebase collections:", error);
    return false;
  }
};