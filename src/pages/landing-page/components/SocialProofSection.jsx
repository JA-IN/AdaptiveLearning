import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import CountUp from "../../../components/ui/CountUp";

const SocialProofSection = () => {
  const stats = [
    {
      id: 1,
      end: 10,
      suffix: "K+",
      label: "Active Learners",
      icon: "Users",
    },
    {
      id: 2,
      end: 50,
      suffix: "+",
      label: "Expert Courses",
      icon: "BookOpen",
    },
    {
      id: 3,
      end: 95,
      suffix: "%",
      label: "Success Rate",
      icon: "TrendingUp",
    },
    {
      id: 4,
      end: 24,
      suffix: "/7",
      label: "AI Support",
      icon: "MessageCircle",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Thousands of <span className="text-primary">Learners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join a growing community of developers mastering their skills through AI-powered learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={stat.icon} size={24} className="text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                <CountUp end={stat.end} suffix={stat.suffix} duration={1800 + index * 300} />
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;

