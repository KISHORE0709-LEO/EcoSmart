import { Button } from "@/components/ui/button";
import { Recycle, Leaf, Droplets, TreePine } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onStartClassification: () => void;
}

export const HeroSection = ({ onStartClassification }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background - faster zoom */}
      <div className="absolute inset-0 bg-cover bg-center animate-[slow-zoom_8s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      
      {/* Animated Gradient Overlays - faster pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-accent/30 animate-[gradient-shift_3s_ease_infinite]" />
      <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-black/40 to-transparent animate-[gradient-shift_4s_ease_infinite]" />
      
      {/* Animated Particles - larger and more visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-8 h-8 bg-primary/60 rounded-full top-1/4 left-1/4 animate-[float-slow_4s_ease-in-out_infinite] blur-sm" />
        <div className="absolute w-12 h-12 bg-accent/50 rounded-full top-1/3 right-1/4 animate-[float-slow_5s_ease-in-out_infinite] blur-sm" />
        <div className="absolute w-6 h-6 bg-primary/70 rounded-full bottom-1/3 left-1/3 animate-[float-slow_4s_ease-in-out_infinite] delay-1000 blur-sm" />
        <div className="absolute w-10 h-10 bg-accent/60 rounded-full bottom-1/4 right-1/3 animate-[float-slow_6s_ease-in-out_infinite] delay-2000 blur-sm" />
        <div className="absolute w-16 h-16 bg-primary/40 rounded-full top-1/2 left-1/2 animate-[float-slow_7s_ease-in-out_infinite] delay-1500 blur-md" />
      </div>

      {/* Floating Icons - larger and more animated */}
      <div className="absolute inset-0 pointer-events-none">
        <Recycle className="absolute top-20 left-10 w-16 h-16 md:w-20 md:h-20 text-primary/40 animate-[float_3s_ease-in-out_infinite] drop-shadow-lg" />
        <Leaf className="absolute top-40 right-20 w-20 h-20 md:w-24 md:h-24 text-accent/50 animate-[float_3s_ease-in-out_infinite_2s] drop-shadow-lg" />
        <Droplets className="absolute bottom-32 left-20 w-14 h-14 md:w-18 md:h-18 text-primary/35 animate-[float_3s_ease-in-out_infinite] drop-shadow-lg" />
        <TreePine className="absolute bottom-40 right-32 w-18 h-18 md:w-22 md:h-22 text-accent/45 animate-[float_3s_ease-in-out_infinite_2s] drop-shadow-lg" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 animate-[fade-in_1s_ease-out]">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl animate-[slide-up_1s_ease-out]">
            Classify Waste.<br />Save the Planet.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg animate-[fade-in_1.5s_ease-out]">
            AI-powered waste classification for a cleaner tomorrow
          </p>
        </div>
        
        <Button
          variant="hero"
          size="lg"
          className="text-lg px-8 py-6 animate-[scale-in_0.5s_ease-out] shadow-elevated hover:scale-110 transition-transform duration-300"
          onClick={onStartClassification}
        >
          Try Now ♻
        </Button>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white animate-[fade-in_2s_ease-out]">
          <div className="text-center animate-[scale-in_1s_ease-out]">
            <div className="text-3xl font-bold text-accent">10,000+</div>
            <div className="text-sm text-white/80">Items Classified</div>
          </div>
          <div className="text-center animate-[scale-in_1.2s_ease-out]">
            <div className="text-3xl font-bold text-accent">95%</div>
            <div className="text-sm text-white/80">Accuracy Rate</div>
          </div>
          <div className="text-center animate-[scale-in_1.4s_ease-out]">
            <div className="text-3xl font-bold text-accent">24/7</div>
            <div className="text-sm text-white/80">Always Available</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-2 bg-white/70 rounded-full animate-[float_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
