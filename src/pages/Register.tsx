/* 
 * WEB FORM WITH VALIDATION:
 * - Registration form with email, password validation
 * - Real-time validation with visual feedback
 * - Firebase Auth integration for user registration
 * 
 * ACCESSIBILITY (POUR):
 * - Form labels, error messages, keyboard navigation
 * - Semantic HTML structure with proper form elements
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });
      
      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
        stats: {
          itemsClassified: 0,
          ecoPoints: 0,
          streakDays: 0,
          level: "Beginner"
        }
      });
      
      // Redirect to profile
      window.location.href = "/profile";
    } catch (error: any) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm">
        <div className="text-center mb-8">
          <img src="/biodegradable_logo.png" alt="EcoSmart Logo" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-800 mb-2">Join EcoSmart</h1>
          <p className="text-gray-600">Create your account to start your eco journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`pl-10 ${errors.name ? 'border-red-500' : formData.name ? 'border-green-500' : ''}`}
                required
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 ${errors.email ? 'border-red-500' : formData.email && /\S+@\S+\.\S+/.test(formData.email) ? 'border-green-500' : ''}`}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : formData.password.length >= 6 ? 'border-green-500' : ''}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500' : ''}`}
                required
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:text-green-800 font-medium">
              Sign In
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};