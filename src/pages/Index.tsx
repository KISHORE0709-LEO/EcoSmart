/* 
 * CSS3 & RESPONSIVE DESIGN:
 * - CSS Grid: Main page layout structure
 * - Viewport units: min-h-screen for full height
 * - Responsive design: Mobile-first approach
 * 
 * JAVASCRIPT ES6+ FEATURES:
 * - Modules: Import/export statements
 * - Arrow functions: Component functions
 * - useEffect: Component lifecycle management
 * 
 * DATA HANDLING & APIS:
 * - Firebase initialization: Database collections setup
 * - Component composition: Modular architecture
 */
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { HeroSection } from "@/components/HeroSection";
import { ClassificationSection } from "@/components/ClassificationSection";
import { LearnSection } from "@/components/LearnSection";
import { FooterSection } from "@/components/FooterSection";
import { AIChatbot } from "@/components/AIChatbot";
import { CursorSparkles } from "@/components/CursorSparkles";
import { initializeFirebaseCollections } from "@/utils/firebase-init";
import { useEffect } from "react";

const Index = () => {
  // DOM manipulation: Smooth scrolling to sections
  const scrollToClassification = () => {
    const element = document.getElementById("classify");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Firebase initialization: Create database collections
  useEffect(() => {
    initializeFirebaseCollections();
  }, []);

  return (
    <div className="min-h-screen gradient-eco-subtle dark:bg-gray-900 transition-colors">
      <CursorSparkles />
      <AIChatbot />
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
