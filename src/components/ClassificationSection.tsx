import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, Lightbulb, Recycle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface ClassificationResult {
  category: "biodegradable" | "non-biodegradable";
  confidence: number;
  tip: string;
  mentorAdvice: {
    diyTutorials: string[];
    recyclingIdeas: string[];
    upcyclingTechniques: string[];
  };
}

export const ClassificationSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWaste = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock classification - randomly choose category for demo
      const isBiodegradable = Math.random() > 0.5;
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
      
      const biodegradableMentor = {
        diyTutorials: [
          "Create nutrient-rich compost for your garden",
          "Make eco-friendly plant fertilizer at home",
          "Build a DIY vermicomposting bin for kitchen waste"
        ],
        recyclingIdeas: [
          "Use food scraps to create natural dyes",
          "Turn fruit peels into natural cleaning solutions",
          "Make pet-safe deodorizers from citrus waste"
        ],
        upcyclingTechniques: [
          "Create decorative planters from coconut shells",
          "Transform coffee grounds into exfoliating scrubs",
          "Make seed paper from shredded paper waste"
        ]
      };

      const nonBiodegradableMentor = {
        diyTutorials: [
          "Transform plastic bottles into self-watering planters",
          "Create storage organizers from tin cans",
          "Build a vertical garden using plastic containers"
        ],
        recyclingIdeas: [
          "Convert glass jars into stylish candle holders",
          "Make decorative vases from old bottles",
          "Create mosaic art from broken ceramic pieces"
        ],
        upcyclingTechniques: [
          "Turn old clothing into reusable shopping bags",
          "Transform cardboard into desk organizers",
          "Make jewelry from bottle caps and metal scraps"
        ]
      };
      
      setResult({
        category: isBiodegradable ? "biodegradable" : "non-biodegradable",
        confidence,
        tip: isBiodegradable
          ? "This can be composted naturally. Add it to your compost bin for eco-friendly disposal."
          : "This cannot decompose naturally. Please send it to a recycling center or dispose of it properly.",
        mentorAdvice: isBiodegradable ? biodegradableMentor : nonBiodegradableMentor
      });
      
      setIsAnalyzing(false);
      toast.success("Analysis complete! Check out creative reuse ideas below!");
    }, 2000);
  };

  const resetClassification = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="classify" className="min-h-screen py-20 px-4 gradient-eco-subtle">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Waste Image for Classification
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI will identify if it's biodegradable or not
          </p>
        </div>

        {/* Upload Card */}
        <div 
          className={`glass-card rounded-3xl p-8 md:p-12 transition-all duration-500 ${
            result ? "scale-105" : ""
          } ${
            result?.category === "biodegradable" 
              ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30" 
              : result?.category === "non-biodegradable"
              ? "bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/30"
              : ""
          }`}
        >
          {!selectedImage ? (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">Drop your image here</p>
                <p className="text-sm text-muted-foreground mb-6">or click to browse</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="eco-action"
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2" />
                    Upload from Device
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.capture = "environment";
                      input.onchange = handleImageUpload as any;
                      input.click();
                    }}
                  >
                    <Camera className="mr-2" />
                    Use Camera
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-scale-in">
              {/* Image Preview */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={selectedImage}
                  alt="Uploaded waste"
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>

              {/* Result Display */}
              {result ? (
                <div className="space-y-6 animate-slide-up">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold">
                      {result.category === "biodegradable" ? "🌱 Biodegradable" : "🧴 Non-Biodegradable"}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Confidence: <span className="font-semibold">{result.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded-xl p-6 backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">Eco Tip:</h4>
                    <p className="text-muted-foreground">{result.tip}</p>
                  </div>

                  {/* Smart Waste Mentor Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xl font-bold">
                      <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                      <span className="gradient-eco bg-clip-text text-transparent">Smart Waste Mentor</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Don't just discard it - discover creative ways to reuse and repurpose!
                    </p>

                    {/* DIY Tutorials */}
                    <Card className="p-5 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-accent" />
                        <h4 className="font-semibold text-lg">DIY Tutorials</h4>
                      </div>
                      <ul className="space-y-2">
                        {result.mentorAdvice.diyTutorials.map((tutorial, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{tutorial}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Recycling Ideas */}
                    <Card className="p-5 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Recycle className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-lg">Recycling Ideas</h4>
                      </div>
                      <ul className="space-y-2">
                        {result.mentorAdvice.recyclingIdeas.map((idea, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Upcycling Techniques */}
                    <Card className="p-5 border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-accent" />
                        <h4 className="font-semibold text-lg">Upcycling Techniques</h4>
                      </div>
                      <ul className="space-y-2">
                        {result.mentorAdvice.upcyclingTechniques.map((technique, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-accent mt-1">•</span>
                            <span className="text-muted-foreground">{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={resetClassification}
                    >
                      Classify Another
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    onClick={analyzeWaste}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>Analyze Waste ♻</>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={resetClassification}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
