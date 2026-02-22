import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import SpotlightCard from "../../../components/SpotlightCard";

const FeatureCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Generated Roadmaps",
      description:
        "Personalized learning paths created by advanced AI algorithms tailored to your goals and skill level.",
      accentColor: "#a855f7",
    },
    {
      id: 2,
      icon: "Target",
      title: "Adaptive Quiz System",
      description:
        "Intelligent quizzes that adjust difficulty in real-time based on your performance.",
      accentColor: "#6366f1",
    },
    {
      id: 3,
      icon: "TrendingUp",
      title: "Progress Analytics",
      description:
        "Comprehensive tracking and visualization of your learning journey with detailed insights.",
      accentColor: "#06b6d4",
    },
    {
      id: 4,
      icon: "Lightbulb",
      title: "Smart Recommendations",
      description:
        "AI-powered suggestions for resources and next steps based on your learning patterns.",
      accentColor: "#10b981",
    },
  ];

  // Auto-cycle through cards
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % features.length);
  //   }, 2500);
  //   return () => clearInterval(interval);
  // }, [features.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-[#000] to-[#09090b]">
      <div className="max-w-6xl mx-auto ">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Nayi Disha</span>?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Experience personalized education with AI technology designed to
            accelerate your learning.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features?.map((feature, index) => {
            const isActive = index === activeIndex;
            const accent = feature.accentColor;

            return (
              <motion.div
                key={feature?.id}
                variants={cardVariants}
                className="group relative"
                onMouseEnter={() => setActiveIndex(index)}
                animate={{
                  scale: isActive ? 1.03 : 1,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Card */}
                <SpotlightCard
                  className="relative bg-card border rounded-lg p-6 h-full transition-all duration-500 !rounded-lg"
                  spotlightColor={`${accent}40`}
                  style={{
                    borderColor: isActive ? accent : "rgba(255,255,255,0.1)",
                    boxShadow: isActive
                      ? `0 0 20px ${accent}30, 0 0 40px ${accent}15, inset 0 1px 0 ${accent}20`
                      : "none",
                  }}
                >
                  {/* Corner Brackets (visible when active) */}
                  {isActive && (
                    <>
                      <motion.span
                        className="absolute w-4 h-4 border-[2px] rounded-[2px] top-[-6px] left-[-6px] border-r-0 border-b-0"
                        style={{ borderColor: accent }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className="absolute w-4 h-4 border-[2px] rounded-[2px] top-[-6px] right-[-6px] border-l-0 border-b-0"
                        style={{ borderColor: accent }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      />
                      <motion.span
                        className="absolute w-4 h-4 border-[2px] rounded-[2px] bottom-[-6px] left-[-6px] border-r-0 border-t-0"
                        style={{ borderColor: accent }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                      <motion.span
                        className="absolute w-4 h-4 border-[2px] rounded-[2px] bottom-[-6px] right-[-6px] border-l-0 border-t-0"
                        style={{ borderColor: accent }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                      />
                    </>
                  )}

                  {/* Icon */}
                  <div className="mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      animate={{
                        backgroundColor: isActive
                          ? `${accent}25`
                          : "rgba(139, 92, 246, 0.1)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon
                        name={feature?.icon}
                        size={24}
                        className="text-primary"
                        style={isActive ? { color: accent } : {}}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg font-semibold mb-2 transition-colors duration-500"
                    style={{ color: isActive ? accent : "var(--foreground)" }}
                  >
                    {feature?.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature?.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;

