/* 
 * WEB FORM WITH VALIDATION:
 * - Login form with email/password validation
 * - Real-time validation with visual feedback
 * - Firebase Auth integration for user authentication
 * 
 * JAVASCRIPT ES6+ FEATURES:
 * - Async/await: Firebase authentication
 * - Destructuring: Form data handling
 * - Template literals: Dynamic error messages
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      if (isRegisterMode) {
        // Register new user
        const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
        const { doc, setDoc } = await import('firebase/firestore');
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await updateProfile(userCredential.user, {
          displayName: name
        });
        
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
          stats: {
            itemsClassified: 0,
            ecoPoints: 0,
            streakDays: 0,
            level: "Beginner"
          }
        });
      } else {
        // Login existing user
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      window.location.href = "/profile";
    } catch (error: any) {
      setError(isRegisterMode ? "Registration failed. Please try again." : "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 bg-green-200/30 rounded-full top-20 left-20 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute w-16 h-16 bg-yellow-200/40 rounded-full top-40 right-32 animate-[float_8s_ease-in-out_infinite_2s]" />
        <div className="absolute w-12 h-12 bg-green-300/25 rounded-full bottom-32 left-40 animate-[float_7s_ease-in-out_infinite_1s]" />
      </div>

      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/biodegradable_logo.png" alt="EcoSmart Logo" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-green-800">EcoSmart</h1>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">{isRegisterMode ? "Create Account" : "Sign In"}</h2>
          <div>
          </div>
          <p className="text-gray-600">{isRegisterMode ? "Join the sustainable living community" : "Welcome back to sustainable living"}</p>
        </div>

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegisterMode && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12"
                  required={isRegisterMode}
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? (isRegisterMode ? "Creating Account..." : "Signing In...") : (isRegisterMode ? "Create Account" : "Sign In")}
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600">
            {isRegisterMode ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError("");
              }}
              className="text-green-600 hover:underline font-medium"
            >
              {isRegisterMode ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};