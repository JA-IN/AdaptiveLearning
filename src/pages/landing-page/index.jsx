import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import TechnologyShowcase from "./components/TechnologyShowcase";
import SocialProofSection from "./components/SocialProofSection";
import CallToActionSection from "./components/CallToActionSection";
import Navbar from "./components/NavBar";


const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate("/subject-selection");
  };

  return (
    <div className="  w-screen -z-10 top-0 h-screen bg-[radial-gradient(circle_at_top,_#000000_0%,_rgba(74,26,125,0.5)_0%,_#000000_70%)]">
      <Navbar />
      {/* Hero Section */}
      <HeroSection onStartLearning={handleStartLearning} />
      {/* <div className="py-8 overflow-hidden opacity-30">
      </div> */}

      {/* Feature Cards Section */}
      <FeatureCards />

      {/* Technology Showcase */}
      <TechnologyShowcase />

      {/* Social Proof Section */}
      <SocialProofSection />
      {/* Call to Action Section */}
      <CallToActionSection onStartLearning={handleStartLearning} />
      {/* Footer */}
      <motion.footer
        className="border-t py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-4">
              © {new Date()?.getFullYear()} Nayi Disha. All rights reserved.
            </div>
            <div className="text-xs text-muted-foreground">
              Built with AI-powered technology
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
