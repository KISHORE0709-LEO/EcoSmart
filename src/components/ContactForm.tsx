import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, "feedback"), {
        ...formData,
        timestamp: new Date(),
        status: "new"
      });
      
      toast.success("Feedback sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error("Failed to send feedback");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 max-w-md mx-auto" role="form" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="text-2xl font-bold mb-4 text-green-700">Contact Us</h3>
      <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-description">
        <div id="form-description" className="sr-only">
          Use this form to send us your feedback about the EcoSmart waste classifier.
        </div>
        <Input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
          aria-label="Your full name"
          aria-describedby="name-help"
          className={formData.name ? "border-green-500" : ""}
        />
        <div id="name-help" className="sr-only">Enter your full name for contact purposes</div>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
          className={formData.email && formData.email.includes("@") ? "border-green-500" : "border-red-500"}
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={4}
          required
        />
        <Button type="submit" className="w-full">Send Feedback</Button>
      </form>
    </Card>
  );
};