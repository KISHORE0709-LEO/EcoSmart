import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

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
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success("Feedback sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Failed to send feedback");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-green-700">Contact Us</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
          className={formData.name ? "border-green-500" : ""}
        />
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