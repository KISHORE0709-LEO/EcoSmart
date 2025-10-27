import logo from "/biodegradable_logo.png";

export const Logo = () => {
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