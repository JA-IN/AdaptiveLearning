import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { LayoutTextFlip } from "./LayoutText";

const HeroSection = ({ onStartLearning }) => {
  return (
    <section className="relative min-h-screen  flex items-center justify-center bg-transparent  ">
      {/* Radial Gradient Background */}
      {/* <div className="w-screen absolute -z-10 top-0 overflow-hidden h-screen"></div> */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Headline */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
           
            <LayoutTextFlip
               text="Empower your future by mastering"
              words={[
                "Web Development",
                "React & Node.js",
                "Full-Stack Skills",
                "Python & Django",
                "Indian Knowledge",
              ]}
              duration={2000}
            />
          </motion.div>
          {/* Value Proposition */}
          <motion.p
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience personalized learning journeys with AI-generated
            roadmaps, adaptive quizzes, and comprehensive progress tracking.
          </motion.p>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="default"
              size="lg"
              onClick={onStartLearning}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={18}
            >
              <p className="text-sm text-center  ">Start Learning</p>
            </Button>
          </motion.div>
          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Self-Paced</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} />
              <span>Certification Ready</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
