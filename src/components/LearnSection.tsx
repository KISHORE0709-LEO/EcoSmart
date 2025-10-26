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
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
                        type.color === "primary" ? "bg-primary/10" : "bg-destructive/10"
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
