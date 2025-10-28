import { Github, Linkedin, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";

export const FooterSection = () => {
  return (
    <footer id="about" className="relative bg-gradient-to-br from-green-100 to-yellow-100 py-16 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-8 h-8 bg-green-400/25 rounded-full top-12 left-1/4 animate-[float_7s_ease-in-out_infinite]" />
        <div className="absolute w-6 h-6 bg-yellow-400/30 rounded-full top-20 right-1/4 animate-[float_5s_ease-in-out_infinite_2s]" />
        <div className="absolute w-4 h-4 bg-green-300/40 rounded-full bottom-16 left-1/3 animate-[float_4s_ease-in-out_infinite_1s]" />
        <div className="absolute w-10 h-10 bg-amber-400/20 rounded-full top-1/3 right-16 animate-[float_6.2s_ease-in-out_infinite_1.2s]" />
        <div className="absolute w-5 h-5 bg-green-500/35 rounded-full bottom-1/3 right-1/3 animate-[float_4.7s_ease-in-out_infinite_0.7s]" />
        <div className="absolute w-7 h-7 bg-yellow-300/25 rounded-full top-16 left-16 animate-[float_5.8s_ease-in-out_infinite_2.3s]" />
        <div className="absolute w-3 h-3 bg-green-600/50 rounded-full bottom-20 left-1/2 animate-[float_3.8s_ease-in-out_infinite_1.6s]" />
        <div className="absolute w-12 h-12 bg-amber-200/15 rounded-full top-1/2 left-1/5 animate-[float_8s_ease-in-out_infinite_0.4s]" />
        <div className="absolute w-2 h-2 bg-yellow-800/40 rounded-full top-8 right-1/5 animate-[float_2.9s_ease-in-out_infinite_1.8s]" />
        <div className="absolute w-16 h-16 bg-green-100/12 rounded-full bottom-4 right-1/4 animate-[float_10.2s_ease-in-out_infinite_0.8s]" />
        <div className="absolute w-9 h-9 bg-amber-500/18 rounded-full top-1/4 right-1/3 animate-[float_6.4s_ease-in-out_infinite_2.7s]" />
        <div className="absolute w-4 h-4 bg-green-700/42 rounded-full bottom-1/4 right-20 animate-[float_4.4s_ease-in-out_infinite_1.4s]" />
        <div className="absolute w-11 h-11 bg-yellow-400/16 rounded-full top-2/3 left-1/4 animate-[float_7.3s_ease-in-out_infinite_0.6s]" />
        <div className="absolute w-6 h-6 bg-green-300/32 rounded-full bottom-32 right-1/6 animate-[float_5.1s_ease-in-out_infinite_2.9s]" />
        <div className="absolute w-18 h-18 bg-amber-300/10 rounded-full top-4 left-2/3 animate-[float_11.5s_ease-in-out_infinite_1.2s]" />
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-10 h-10 text-primary" />
            <h3 className="text-3xl font-bold text-green-700">EcoSmart</h3>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            EcoSmart Waste Classifier is an AI-driven initiative promoting sustainable
            waste segregation through advanced computer vision technology.
          </p>
          <p className="text-muted-foreground">
            Built with Machine Learning and Computer Vision for a greener tomorrow.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="mailto:contact@ecosmart.com">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} EcoSmart. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <ContactForm />
        </div>

        {/* Extra Info */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            🌍 Together, we've helped classify over 10,000 waste items for sustainable disposal
          </p>
        </div>
      </div>
    </footer>
  );
};
