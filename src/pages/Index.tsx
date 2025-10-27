import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { HeroSection } from "@/components/HeroSection";
import { ClassificationSection } from "@/components/ClassificationSection";
import { LearnSection } from "@/components/LearnSection";
import { FooterSection } from "@/components/FooterSection";

const Index = () => {
  const scrollToClassification = () => {
    const element = document.getElementById("classify");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen gradient-eco-subtle">
      <Logo />
      <Header />
      <HeroSection onStartClassification={scrollToClassification} />
      <ClassificationSection />
      <LearnSection />
      <FooterSection />
    </div>
  );
};

export default Index;
