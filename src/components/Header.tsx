/* 
 * CSS3 & RESPONSIVE DESIGN:
 * - Flexbox: Navigation layout, mobile menu
 * - Media queries: Mobile-first responsive design
 * - Transitions: Hover effects, smooth animations
 * 
 * ACCESSIBILITY (POUR):
 * - Keyboard navigation: Tab order, focus management
 * - ARIA labels: aria-expanded, aria-label for screen readers
 * - Semantic HTML: <nav>, role="navigation"
 * 
 * JAVASCRIPT FUNDAMENTALS:
 * - Event handling: onClick, smooth scrolling
 * - DOM manipulation: scrollIntoView, getElementById
 * - State management: Mobile menu toggle
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ThemeToggle } from "@/components/ThemeToggle";


export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 right-4 z-50 bg-amber-200/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg transform -translate-x-1/6" role="banner">
      <div className="px-6 py-4">
        <div className="flex items-center justify-evenly w-full">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-evenly w-full gap-6" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('classify')}
              className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors font-medium"
            >
              Classify
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors font-medium"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors font-medium"
            >
              About
            </button>
            <ThemeToggle />
            {user ? (
              <>
                <Button variant="eco-action" size="sm" onClick={() => window.location.href = '/profile'}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/login'}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-green-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
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
              {user ? (
                <>
                  <Button variant="eco-action" size="sm" className="flex-1" onClick={() => window.location.href = '/profile'}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" className="flex-1" onClick={() => window.location.href = '/login'}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
