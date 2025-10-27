import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, Apple, Leaf, FlaskConical, Package } from "lucide-react";

const wasteTypes = [
  {
    id: "biodegradable",
    title: "Biodegradable Waste",
    icon: Apple,
    color: "primary",
    examples: [
      { name: "Food Scraps", icon: "🍎", desc: "Fruits, vegetables, cooked food" },
      { name: "Paper Products", icon: "📄", desc: "Newspapers, cardboard, paper bags" },
      { name: "Natural Materials", icon: "🍂", desc: "Leaves, wood, cotton, wool" },
      { name: "Garden Waste", icon: "🌿", desc: "Grass clippings, plant trimmings" },
    ],
    tip: "Use compost bins for natural disposal. These materials break down naturally and enrich the soil.",
  },
  {
    id: "non-biodegradable",
    title: "Non-Biodegradable Waste",
    icon: FlaskConical,
    color: "destructive",
    examples: [
      { name: "Plastic Items", icon: "🧴", desc: "Bottles, bags, packaging" },
      { name: "Glass Products", icon: "🍶", desc: "Bottles, jars, broken glass" },
      { name: "Metal Objects", icon: "🔧", desc: "Cans, foil, electronics" },
      { name: "Synthetic Materials", icon: "👕", desc: "Polyester, nylon, rubber" },
    ],
    tip: "Send to recycling centers. These materials don't decompose and can harm the environment if not handled properly.",
  },
];

export const LearnSection = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section id="learn" className="relative py-20 px-4 bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-5 h-5 bg-yellow-400/30 rounded-full top-16 right-16 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute w-7 h-7 bg-green-300/40 rounded-full top-1/3 left-12 animate-[float_4s_ease-in-out_infinite_1.5s]" />
        <div className="absolute w-6 h-6 bg-yellow-300/35 rounded-full bottom-20 right-1/3 animate-[float_5s_ease-in-out_infinite_0.5s]" />
        <div className="absolute w-8 h-8 bg-green-400/25 rounded-full top-24 left-1/4 animate-[float_5.5s_ease-in-out_infinite_2s]" />
        <div className="absolute w-4 h-4 bg-amber-400/40 rounded-full top-2/3 right-20 animate-[float_3.5s_ease-in-out_infinite_1s]" />
        <div className="absolute w-9 h-9 bg-yellow-500/20 rounded-full bottom-32 left-20 animate-[float_6.5s_ease-in-out_infinite_0.8s]" />
        <div className="absolute w-3 h-3 bg-green-500/45 rounded-full top-1/2 right-1/4 animate-[float_4.2s_ease-in-out_infinite_2.2s]" />
        <div className="absolute w-11 h-11 bg-amber-300/20 rounded-full bottom-1/4 left-1/2 animate-[float_7.5s_ease-in-out_infinite_1.8s]" />
        <div className="absolute w-6 h-6 bg-green-600/30 rounded-full top-40 right-1/2 animate-[float_4.8s_ease-in-out_infinite_0.3s]" />
        <div className="absolute w-2 h-2 bg-yellow-700/45 rounded-full top-12 left-1/3 animate-[float_3.2s_ease-in-out_infinite_1.4s]" />
        <div className="absolute w-13 h-13 bg-green-200/18 rounded-full bottom-12 right-16 animate-[float_8.8s_ease-in-out_infinite_0.9s]" />
        <div className="absolute w-7 h-7 bg-amber-600/25 rounded-full top-1/4 left-1/6 animate-[float_5.3s_ease-in-out_infinite_2.6s]" />
        <div className="absolute w-4 h-4 bg-green-800/35 rounded-full bottom-1/3 right-1/6 animate-[float_4.1s_ease-in-out_infinite_1.1s]" />
        <div className="absolute w-10 h-10 bg-yellow-200/22 rounded-full top-3/4 left-3/4 animate-[float_6.9s_ease-in-out_infinite_0.7s]" />
        <div className="absolute w-5 h-5 bg-green-500/28 rounded-full top-56 left-1/5 animate-[float_4.6s_ease-in-out_infinite_2.8s]" />
        <div className="absolute w-15 h-15 bg-amber-400/12 rounded-full bottom-8 left-3/4 animate-[float_9.7s_ease-in-out_infinite_1.9s]" />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-700">
            Know Your Waste ♻
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn the difference between biodegradable and non-biodegradable waste
            to make informed disposal decisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {wasteTypes.map((type, index) => {
            const Icon = type.icon;
            const isExpanded = expandedCard === type.id;

            return (
              <Card
                key={type.id}
                className={`p-8 cursor-pointer transition-all duration-500 hover:shadow-elevated border-2 animate-slide-up ${
                  type.color === "primary"
                    ? "hover:border-primary/50"
                    : "hover:border-destructive/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setExpandedCard(isExpanded ? null : type.id)}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        type.color === "primary" ? "bg-yellow-100" : "bg-red-100"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          type.color === "primary" ? "text-primary" : "text-destructive"
                        }`}
                      />
                    </div>
                    <h3 className="text-2xl font-bold">{type.title}</h3>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-lg">Examples:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {type.examples.map((example) => (
                        <div
                          key={example.name}
                          className="p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                        >
                          <div className="text-3xl mb-2">{example.icon}</div>
                          <div className="font-semibold text-sm">{example.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {example.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl ${
                      type.color === "primary"
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-destructive/10 border border-destructive/20"
                    }`}
                  >
                    <h4 className="font-semibold mb-2">💡 Disposal Tip:</h4>
                    <p className="text-sm text-muted-foreground">{type.tip}</p>
                  </div>
                </div>

                {!isExpanded && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Click to learn more about proper disposal methods
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
