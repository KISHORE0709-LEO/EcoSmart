import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ClassificationResult {
  category: "biodegradable" | "non-biodegradable";
  confidence: number;
  tip: string;
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
      
      setResult({
        category: isBiodegradable ? "biodegradable" : "non-biodegradable",
        confidence,
        tip: isBiodegradable
          ? "This can be composted naturally. Add it to your compost bin for eco-friendly disposal."
          : "This cannot decompose naturally. Please send it to a recycling center or dispose of it properly.",
      });
      
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
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
                <div className="space-y-4 animate-slide-up">
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

                  <div className="flex gap-4">
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
