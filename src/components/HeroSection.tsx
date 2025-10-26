import { Button } from "@/components/ui/button";
import { Recycle, Leaf, Trash2 } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onStartClassification: () => void;
}

export const HeroSection = ({ onStartClassification }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Recycle className="absolute top-20 left-10 w-16 h-16 text-primary opacity-20 animate-float" />
        <Leaf className="absolute top-40 right-20 w-12 h-12 text-accent opacity-20 animate-float-delayed" />
        <Trash2 className="absolute bottom-32 left-1/4 w-14 h-14 text-primary opacity-20 animate-float" />
        <Recycle className="absolute bottom-20 right-1/3 w-10 h-10 text-accent opacity-20 animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Leaf className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              EcoSmart
            </h1>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Classify Waste.
          <br />
          <span className="text-accent">Save the Planet.</span>
        </h2>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          AI-powered waste classification for a cleaner tomorrow.
        </p>

        {/* CTA Button */}
        <Button
          variant="hero"
          size="lg"
          onClick={onStartClassification}
          className="text-lg px-12 py-8 h-auto"
        >
          Try Now ♻
        </Button>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">10,000+</div>
            <div className="text-sm text-white/80">Items Classified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">95%</div>
            <div className="text-sm text-white/80">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">24/7</div>
            <div className="text-sm text-white/80">Always Available</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
};
