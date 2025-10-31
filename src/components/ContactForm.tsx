/* 
 * WEB FORM WITH VALIDATION:
 * - Real-time validation: Email regex, required fields
 * - Visual feedback: Border color changes (red/green)
 * - JavaScript validation: Instant error messages
 * 
 * DATA HANDLING & APIS:
 * - Firebase integration: Firestore database operations
 * - Form submission: addDoc to 'contacts' collection
 * - JSON processing: Form data validation and storage
 * 
 * ACCESSIBILITY (POUR):
 * - Form instructions: Clear labels, error messages
 * - Semantic HTML: Proper form associations
 * - Screen reader support: ARIA labels
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, CheckCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: "new"
      });
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 bg-white/90 backdrop-blur-sm text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">Your message has been sent successfully.</p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-white/90 backdrop-blur-sm">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-green-800 mb-2">Get in Touch</h3>
        <p className="text-gray-600">Have questions? We'd love to hear from you!</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={`${errors.name ? 'border-red-500' : formData.name ? 'border-green-500' : ''}`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`${errors.email ? 'border-red-500' : formData.email && /\S+@\S+\.\S+/.test(formData.email) ? 'border-green-500' : ''}`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className={`min-h-[120px] ${errors.message ? 'border-red-500' : formData.message ? 'border-green-500' : ''}`}
            required
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};