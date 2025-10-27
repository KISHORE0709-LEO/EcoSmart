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
    <header className="fixed top-4 left-1/2 right-4 z-50 bg-amber-200/90 backdrop-blur-sm rounded-lg shadow-lg transform -translate-x-1/6">
      <div className="px-6 py-4">
        <div className="flex items-center justify-evenly w-full">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-evenly w-full gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-green-700 hover:text-green-900 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('classify')}
              className="text-green-700 hover:text-green-900 transition-colors font-medium"
            >
              Classify
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="text-green-700 hover:text-green-900 transition-colors font-medium"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-green-700 hover:text-green-900 transition-colors font-medium"
            >
              About
            </button>
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/login'}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button variant="eco-action" size="sm" onClick={() => window.location.href = '/profile'}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-green-700"
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
          <div className="md:hidden py-4 space-y-3 animate-slide-down border-t border-green-300/30">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left px-4 py-2 text-green-700 hover:text-green-900 hover:bg-green-100/50 rounded-lg transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('classify')}
              className="block w-full text-left px-4 py-2 text-green-700 hover:text-green-900 hover:bg-green-100/50 rounded-lg transition-colors"
            >
              Classify
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="block w-full text-left px-4 py-2 text-green-700 hover:text-green-900 hover:bg-green-100/50 rounded-lg transition-colors"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-green-700 hover:text-green-900 hover:bg-green-100/50 rounded-lg transition-colors"
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
