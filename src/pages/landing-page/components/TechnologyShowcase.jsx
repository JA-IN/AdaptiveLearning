import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import CountUp from "../../../components/ui/CountUp";

const TechnologyShowcase = () => {
  const technologies = [
    {
      id: 1,
      name: "JavaScript",
      description:
        "Master modern JavaScript ES6+ features, async programming, and DOM manipulation",
      icon: "Code2",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20",
      borderColor: "border-yellow-400/30",
      features: ["ES6+ Syntax", "Async/Await", "DOM APIs", "Event Handling"],
    },
    {
      id: 2,
      name: "React",
      description:
        "Build dynamic user interfaces with hooks, state management, and component architecture",
      icon: "Atom",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/20",
      borderColor: "border-cyan-400/30",
      features: [
        "Hooks & State",
        "Component Design",
        "Context API",
        "Performance",
      ],
    },
    {
      id: 3,
      name: "Node.js",
      description:
        "Develop scalable backend applications with Express, APIs, and database integration",
      icon: "Server",
      color: "text-green-400",
      bgColor: "bg-green-400/20",
      borderColor: "border-green-400/30",
      features: ["Express.js", "REST APIs", "Database ORM", "Authentication"],
    },
    {
      id: 4,
      name: "Python",
      description:
        "Learn web development with Django/Flask, data structures, and algorithm optimization",
      icon: "FileCode",
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      borderColor: "border-blue-400/30",
      features: [
        "Django/Flask",
        "Data Structures",
        "Algorithms",
        "Web Scraping",
      ],
    },
  ];

  const iksSubjects = [
    {
      id: 5,
      name: "History",
      description:
        "Journey through India's rich past — from the Indus Valley Civilization to Modern India",
      icon: "Landmark",
      color: "text-amber-400",
      bgColor: "bg-amber-400/20",
      borderColor: "border-amber-400/30",
      features: ["Ancient India", "Freedom Movement", "Art & Culture", "UPSC"],
    },
    {
      id: 6,
      name: "Economics",
      description:
        "Decode the Indian economy — planning, reforms, monetary policy, and governance",
      icon: "TrendingUp",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/20",
      borderColor: "border-emerald-400/30",
      features: ["Indian Economy", "Banking", "Policy Analysis", "Trade"],
    },
    {
      id: 7,
      name: "Geography",
      description:
        "Explore India's diverse landscapes, climate systems, and resource distribution",
      icon: "Globe",
      color: "text-sky-400",
      bgColor: "bg-sky-400/20",
      borderColor: "border-sky-400/30",
      features: ["Physical", "Human", "Environment", "Maps & GIS"],
    },
    {
      id: 8,
      name: "Politics",
      description:
        "Understand the Indian Constitution, governance, and political processes",
      icon: "Scale",
      color: "text-rose-400",
      bgColor: "bg-rose-400/20",
      borderColor: "border-rose-400/30",
      features: ["Constitution", "Governance", "Judiciary", "Amendments"],
    },
    {
      id: 9,
      name: "Mahabharata",
      description:
        "Explore the world's greatest epic — philosophy, dharma, strategy, and leadership",
      icon: "Swords",
      color: "text-orange-400",
      bgColor: "bg-orange-400/20",
      borderColor: "border-orange-400/30",
      features: ["Bhagavad Gita", "Dharma", "Strategy", "Characters"],
    },
    {
      id: 10,
      name: "Ramayana",
      description:
        "Study Rama Rajya, ethical living, governance, and India's cultural foundation",
      icon: "Crown",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20",
      borderColor: "border-yellow-400/30",
      features: ["Dharma", "Governance", "Ethics", "Cultural Impact"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const renderCard = (item) => (
    <motion.div
      key={item?.id}
      variants={cardVariants}
      className="group"
    >
      <div className="bg-card border rounded-lg p-6 h-full hover:border-primary/50 transition-colors">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon
              name={item?.icon}
              size={20}
              className="text-primary"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {item?.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item?.description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section id="technology-showcase" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Tech Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Master In-Demand <span className="text-primary">Skills & Knowledge</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from programming technologies and Indian Knowledge System
            subjects — get personalized learning paths powered by AI.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span>💻</span> Technology
          </h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies?.map(renderCard)}
        </motion.div>

        {/* IKS Grid */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span>🪷</span> Indian Knowledge System
          </h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {iksSubjects?.map(renderCard)}
        </motion.div>

        {/* B.Tech CSE Section */}
        <motion.div
          className="mb-6 mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span>🎓</span> B.Tech CSE — 1st & 2nd Year
          </h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              id: 13,
              name: "Mathematics-1",
              description:
                "Calculus, linear algebra, and differential equations — the backbone of engineering",
              icon: "Calculator",
            },
            {
              id: 14,
              name: "PPS (C Language)",
              description:
                "Programming for Problem Solving — logic building and algorithmic thinking",
              icon: "Code2",
            },
            {
              id: 15,
              name: "DSA",
              description:
                "Data Structures & Algorithms — arrays, trees, graphs, sorting, and complexity",
              icon: "GitBranch",
            },
            {
              id: 16,
              name: "OOPS",
              description:
                "Object-Oriented Programming — classes, inheritance, polymorphism with C++/Java",
              icon: "Boxes",
            },
            {
              id: 17,
              name: "Digital Electronics",
              description:
                "Boolean algebra, combinational & sequential circuits, and microprocessor basics",
              icon: "Cpu",
            },
            {
              id: 18,
              name: "Physics",
              description:
                "Engineering physics — optics, quantum mechanics, semiconductors, and more",
              icon: "Atom",
            },
          ].map(renderCard)}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              <CountUp end={20} suffix="+" duration={2000} />
            </div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-2">
              <CountUp end={50} suffix="+" duration={2200} />
            </div>
            <div className="text-sm text-muted-foreground">
              Learning Modules
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-2">
              AI-Powered
            </div>
            <div className="text-sm text-muted-foreground">Personalization</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-2">
              Real-time
            </div>
            <div className="text-sm text-muted-foreground">Adaptation</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
