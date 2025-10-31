/* 
 * ACCESSIBILITY (POUR):
 * - Alt text: Descriptive alt attribute for logo image
 * - Semantic HTML: Proper image element usage
 * - Interactive elements: Clickable logo with cursor pointer
 * 
 * JAVASCRIPT FUNDAMENTALS:
 * - Event handling: onClick for smooth scrolling
 * - DOM manipulation: scrollIntoView for navigation
 */
import logo from "/biodegradable_logo.png";

export const Logo = () => {
  // DOM manipulation: getElementById and scrollIntoView
  const scrollToHero = () => {
    const element = document.getElementById('hero');
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div 
      className="fixed top-4 left-12 z-50 flex items-center gap-3 cursor-pointer animate-fade-in"
      onClick={scrollToHero}
    >
      <img src={logo} alt="EcoSmart Logo" className="h-14 w-14 md:h-16 md:w-16" />
      <span className="text-xl md:text-2xl font-bold text-amber-300 drop-shadow-lg">
        EcoSmart
      </span>
    </div>
  );
};