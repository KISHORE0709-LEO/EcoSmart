import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
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
            <Leaf className="w-10 h-10 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">EcoSmart</h1>
          </div>
          <p className="text-gray-600">Welcome back to sustainable living</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
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

          <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700">
            Sign In
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-4">
          <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
            Forgot your password?
          </Link>
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};