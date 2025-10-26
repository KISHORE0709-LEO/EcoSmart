import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn } from "lucide-react";
import logo from "@/assets/ecosmart-logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer animate-fade-in" onClick={() => scrollToSection('hero')}>
            <img src={logo} alt="EcoSmart Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="text-xl md:text-2xl font-bold gradient-eco bg-clip-text text-transparent">
              EcoSmart
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('classify')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Classify
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              About
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button variant="eco-action" size="sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-slide-down border-t border-border/50">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('classify')}
              className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              Classify
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              About
            </button>
            <div className="flex gap-2 px-4 pt-2">
              <Button variant="ghost" size="sm" className="flex-1">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button variant="eco-action" size="sm" className="flex-1">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
