import { Github, Linkedin, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FooterSection = () => {
  return (
    <footer id="about" className="gradient-eco-subtle py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-10 h-10 text-primary" />
            <h3 className="text-3xl font-bold">EcoSmart</h3>
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
