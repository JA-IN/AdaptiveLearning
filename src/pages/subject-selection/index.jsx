import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import OnboardingStepIndicator from "../../components/ui/OnboardingStepIndicator";
import TechnologyGrid from "./components/TechnologyGrid";
import SelectionSummary from "./components/SelectionSummary";

const SubjectSelection = () => {
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [activeCategory, setActiveCategory] = useState("tech");
  const navigate = useNavigate();

  // Categories
  const categories = [
    {
      id: "tech",
      label: "Technology",
      icon: "💻",
      description: "Master programming & web development",
    },
    {
      id: "iks",
      label: "Indian Knowledge System",
      icon: "🪷",
      description: "Explore India's heritage & wisdom",
    },
    {
      id: "btech",
      label: "B.Tech CSE",
      icon: "🎓",
      description: "B.Tech CSE curriculum — Semester-wise subjects",
    },
  ];

  // Tech subjects (existing — unchanged)
  const techSubjects = [
    {
      id: 1,
      name: "Python",
      category: "tech",
      description:
        "Versatile programming language perfect for beginners and professionals alike. Build web applications, data science projects, and automation tools.",
      useCases: [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Automation",
        "API Development",
      ],
      learningOutcomes: [
        "Master Python syntax and core concepts",
        "Build web applications with Django/Flask",
        "Work with data using pandas and NumPy",
        "Create automation scripts and tools",
      ],
      estimatedModules: 10,
      estimatedHours: 25,
      difficulty: "Beginner Friendly",
    },
    {
      id: 2,
      name: "JavaScript",
      category: "tech",
      description:
        "The language of the web. Create interactive websites, mobile apps, and server-side applications with the most popular programming language.",
      useCases: [
        "Frontend Development",
        "Backend Development",
        "Mobile Apps",
        "Desktop Apps",
        "Game Development",
      ],
      learningOutcomes: [
        "Master modern JavaScript ES6+ features",
        "Build interactive web applications",
        "Understand asynchronous programming",
        "Work with APIs and databases",
      ],
      estimatedModules: 12,
      estimatedHours: 30,
      difficulty: "Essential Skill",
    },
    {
      id: 3,
      name: "React",
      category: "tech",
      description:
        "Build modern, fast, and scalable user interfaces. The most popular frontend library used by companies like Facebook, Netflix, and Airbnb.",
      useCases: [
        "Single Page Applications",
        "Mobile Apps",
        "Desktop Apps",
        "Progressive Web Apps",
        "Component Libraries",
      ],
      learningOutcomes: [
        "Master React components and hooks",
        "Build responsive user interfaces",
        "Manage application state effectively",
        "Deploy production-ready applications",
      ],
      estimatedModules: 8,
      estimatedHours: 20,
      difficulty: "Intermediate",
    },
    {
      id: 4,
      name: "Node.js",
      category: "tech",
      description:
        "Server-side JavaScript runtime for building scalable network applications. Create APIs, microservices, and full-stack applications.",
      useCases: [
        "REST APIs",
        "Microservices",
        "Real-time Applications",
        "CLI Tools",
        "Backend Services",
      ],
      learningOutcomes: [
        "Build RESTful APIs and microservices",
        "Work with databases and authentication",
        "Handle real-time communications",
        "Deploy scalable backend systems",
      ],
      estimatedModules: 9,
      estimatedHours: 22,
      difficulty: "Backend Focus",
    },
  ];

  // Indian Knowledge System subjects (NEW)
  const iksSubjects = [
    {
      id: 101,
      name: "History",
      category: "iks",
      description:
        "Journey through India's rich past — from the Indus Valley Civilization to Modern India. Master historical events, freedom movements, and cultural evolution.",
      useCases: [
        "UPSC Preparation",
        "Academic Research",
        "Cultural Understanding",
        "Competitive Exams",
        "Teaching",
      ],
      learningOutcomes: [
        "Understand Ancient, Medieval & Modern Indian History",
        "Analyze freedom movements and key events",
        "Connect historical patterns to present-day India",
        "Master chronological frameworks and source analysis",
      ],
      estimatedModules: 12,
      estimatedHours: 35,
      difficulty: "Comprehensive",
    },
    {
      id: 102,
      name: "Economics",
      category: "iks",
      description:
        "Decode the Indian economy — from Five-Year Plans to GST, monetary policy to rural development. Build a strong foundation in economic thinking.",
      useCases: [
        "UPSC Economics",
        "Banking & Finance",
        "Policy Analysis",
        "Business Strategy",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Understand Indian economic planning and reforms",
        "Analyze fiscal and monetary policy frameworks",
        "Master concepts of growth, inflation, and trade",
        "Evaluate government schemes and their impact",
      ],
      estimatedModules: 10,
      estimatedHours: 30,
      difficulty: "Analytical",
    },
    {
      id: 103,
      name: "Geography",
      category: "iks",
      description:
        "Explore India's diverse landscapes, climate systems, and resource distribution. From Himalayan geography to coastal ecosystems.",
      useCases: [
        "UPSC Geography",
        "Environmental Studies",
        "Map Skills",
        "Disaster Management",
        "Urban Planning",
      ],
      learningOutcomes: [
        "Master physical and human geography of India",
        "Understand climate patterns and natural resources",
        "Analyze environmental challenges and solutions",
        "Develop map reading and spatial reasoning skills",
      ],
      estimatedModules: 10,
      estimatedHours: 28,
      difficulty: "Visual & Analytical",
    },
    {
      id: 104,
      name: "Politics",
      category: "iks",
      description:
        "Understand the Indian Constitution, governance framework, and political system. From Panchayati Raj to Parliament, master the structure of Indian democracy.",
      useCases: [
        "UPSC Polity",
        "Civil Services",
        "Political Analysis",
        "Law Studies",
        "Governance Research",
      ],
      learningOutcomes: [
        "Master the Indian Constitution and its amendments",
        "Understand the structure of Union, State & Local governance",
        "Analyze electoral processes and political dynamics",
        "Evaluate fundamental rights, duties, and judicial review",
      ],
      estimatedModules: 10,
      estimatedHours: 28,
      difficulty: "Foundational",
    },
    {
      id: 105,
      name: "Mahabharata",
      category: "iks",
      description:
        "Dive into the world's greatest epic — exploring its characters, philosophy, dharma dilemmas, and timeless leadership lessons through an analytical lens.",
      useCases: [
        "Philosophical Study",
        "Leadership Lessons",
        "Cultural Heritage",
        "Ethics & Dharma",
        "Literature Analysis",
      ],
      learningOutcomes: [
        "Analyze the narrative arc and key characters",
        "Extract leadership and strategic thinking lessons",
        "Understand dharma, karma, and ethical dilemmas",
        "Connect ancient wisdom to modern decision-making",
      ],
      estimatedModules: 8,
      estimatedHours: 22,
      difficulty: "Wisdom & Analysis",
    },
    {
      id: 106,
      name: "Ramayana",
      category: "iks",
      description:
        "Study the Ramayana as a treatise on governance, ethics, and ideal conduct. Explore Rama Rajya, character archetypes, and its influence on Indian culture.",
      useCases: [
        "Dharma & Ethics",
        "Leadership & Governance",
        "Cultural Study",
        "Philosophy",
        "Comparative Literature",
      ],
      learningOutcomes: [
        "Understand the narrative, structure, and key characters",
        "Analyze governance lessons and the concept of Rama Rajya",
        "Explore ethical frameworks and duty (dharma) concepts",
        "Connect Ramayana's teachings to modern leadership",
      ],
      estimatedModules: 8,
      estimatedHours: 20,
      difficulty: "Wisdom & Ethics",
    },
  ];

  // B.Tech CSE subjects
  const btechSubjects = [
    // ── Semester 1 ──
    {
      id: 201,
      name: "Mathematics-1",
      category: "btech",
      semester: 1,
      description:
        "Build a strong foundation in calculus, linear algebra, and differential equations — the backbone of all engineering disciplines.",
      useCases: [
        "Engineering Mathematics",
        "Competitive Exams",
        "Higher Studies",
        "Data Science Foundation",
        "Algorithm Analysis",
      ],
      learningOutcomes: [
        "Master single & multivariable calculus",
        "Solve systems of linear equations using matrices",
        "Understand sequences, series, and convergence",
        "Apply differential equations to real-world problems",
      ],
      estimatedModules: 10,
      estimatedHours: 30,
      difficulty: "Foundation",
    },
    {
      id: 202,
      name: "BEE",
      category: "btech",
      semester: 1,
      description:
        "Understand the fundamentals of electrical circuits, machines, and power systems — Basic Electrical Engineering for CSE students.",
      useCases: [
        "Circuit Analysis",
        "Embedded Systems",
        "IoT Projects",
        "Hardware Understanding",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Analyze DC and AC circuits using Kirchhoff's laws",
        "Understand transformers, motors, and generators",
        "Learn electrical measurement and safety concepts",
        "Apply network theorems to solve circuit problems",
      ],
      estimatedModules: 8,
      estimatedHours: 22,
      difficulty: "Foundation",
    },
    {
      id: 203,
      name: "Physics",
      category: "btech",
      semester: 1,
      description:
        "Explore engineering physics — optics, quantum mechanics, semiconductors, and electromagnetic theory for technology applications.",
      useCases: [
        "Semiconductor Devices",
        "Laser & Fiber Optics",
        "Quantum Computing Basics",
        "Material Science",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Understand wave optics, interference, and diffraction",
        "Learn basics of quantum mechanics and applications",
        "Study semiconductor physics and band theory",
        "Explore electromagnetic wave propagation",
      ],
      estimatedModules: 9,
      estimatedHours: 25,
      difficulty: "Foundation",
    },
    // ── Semester 2 ──
    {
      id: 204,
      name: "English",
      category: "btech",
      semester: 2,
      description:
        "Develop professional communication skills — technical writing, presentation, grammar, and comprehension for engineering careers.",
      useCases: [
        "Technical Writing",
        "Presentations",
        "Email & Reports",
        "Interview Preparation",
        "Research Papers",
      ],
      learningOutcomes: [
        "Master technical report and essay writing",
        "Improve grammar, vocabulary, and comprehension",
        "Develop effective presentation and speaking skills",
        "Learn professional email and business communication",
      ],
      estimatedModules: 7,
      estimatedHours: 18,
      difficulty: "Essential Skill",
    },
    {
      id: 205,
      name: "Chemistry",
      category: "btech",
      semester: 2,
      description:
        "Study engineering chemistry — electrochemistry, polymers, corrosion, water treatment, and materials relevant to technology.",
      useCases: [
        "Material Science",
        "Battery Technology",
        "Environmental Engineering",
        "Nanotechnology",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Understand electrochemistry and battery principles",
        "Learn polymer chemistry and engineering materials",
        "Study corrosion mechanisms and prevention",
        "Explore water treatment and environmental chemistry",
      ],
      estimatedModules: 8,
      estimatedHours: 22,
      difficulty: "Foundation",
    },
    {
      id: 206,
      name: "PPS",
      category: "btech",
      semester: 2,
      description:
        "Programming for Problem Solving — Learn C language fundamentals, logic building, and algorithmic thinking from scratch.",
      useCases: [
        "C Programming",
        "Logic Building",
        "Competitive Coding",
        "System Programming",
        "Interview Preparation",
      ],
      learningOutcomes: [
        "Master C language syntax, data types, and operators",
        "Implement control structures, loops, and functions",
        "Work with arrays, strings, pointers, and structures",
        "Develop problem-solving and debugging skills",
      ],
      estimatedModules: 10,
      estimatedHours: 28,
      difficulty: "Beginner Friendly",
    },
    {
      id: 207,
      name: "Mathematics-2",
      category: "btech",
      semester: 2,
      description:
        "Advanced engineering mathematics — Laplace transforms, Fourier series, complex analysis, and probability & statistics.",
      useCases: [
        "Signal Processing",
        "Machine Learning Math",
        "Statistical Analysis",
        "Higher Studies",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Apply Laplace and Fourier transforms to engineering problems",
        "Understand complex variables and analytic functions",
        "Master probability distributions and statistical methods",
        "Solve partial differential equations",
      ],
      estimatedModules: 10,
      estimatedHours: 30,
      difficulty: "Intermediate",
    },
    // ── Semester 3 ──
    {
      id: 208,
      name: "Mathematics-3",
      category: "btech",
      semester: 3,
      description:
        "Discrete mathematics and numerical methods — graph theory, combinatorics, number theory, and computational techniques.",
      useCases: [
        "Algorithm Design",
        "Cryptography",
        "Computer Networks",
        "AI & ML Foundation",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Master graph theory and combinatorial mathematics",
        "Understand number theory and algebraic structures",
        "Apply numerical methods for engineering computations",
        "Learn mathematical logic and proof techniques",
      ],
      estimatedModules: 10,
      estimatedHours: 28,
      difficulty: "Intermediate",
    },
    {
      id: 209,
      name: "DSA",
      category: "btech",
      semester: 3,
      description:
        "Data Structures & Algorithms — arrays, linked lists, trees, graphs, sorting, searching, and complexity analysis.",
      useCases: [
        "Placement Preparation",
        "Competitive Programming",
        "Software Development",
        "System Design",
        "Technical Interviews",
      ],
      learningOutcomes: [
        "Implement fundamental data structures from scratch",
        "Analyze time and space complexity of algorithms",
        "Master sorting, searching, and graph algorithms",
        "Solve problems using dynamic programming and greedy methods",
      ],
      estimatedModules: 14,
      estimatedHours: 40,
      difficulty: "Core Subject",
    },
    {
      id: 210,
      name: "OOPS",
      category: "btech",
      semester: 3,
      description:
        "Object-Oriented Programming — classes, inheritance, polymorphism, abstraction, and design principles using C++/Java.",
      useCases: [
        "Software Engineering",
        "Application Development",
        "Design Patterns",
        "Technical Interviews",
        "Project Development",
      ],
      learningOutcomes: [
        "Understand classes, objects, and encapsulation",
        "Implement inheritance, polymorphism, and abstraction",
        "Apply OOP design principles and patterns",
        "Build real-world projects using OOP concepts",
      ],
      estimatedModules: 10,
      estimatedHours: 28,
      difficulty: "Core Subject",
    },
    {
      id: 211,
      name: "Digital Electronics",
      category: "btech",
      semester: 3,
      description:
        "Learn digital logic design — Boolean algebra, combinational & sequential circuits, flip-flops, and microprocessor basics.",
      useCases: [
        "Computer Architecture",
        "VLSI Design",
        "Embedded Systems",
        "IoT Development",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Simplify Boolean expressions using K-maps and theorems",
        "Design combinational circuits (adders, multiplexers, decoders)",
        "Understand sequential circuits (flip-flops, counters, registers)",
        "Learn basics of microprocessor architecture",
      ],
      estimatedModules: 9,
      estimatedHours: 25,
      difficulty: "Intermediate",
    },
    {
      id: 212,
      name: "Development of Society",
      category: "btech",
      semester: 3,
      description:
        "Understand the evolution of human society, social structures, Indian constitution basics, and environmental awareness.",
      useCases: [
        "General Awareness",
        "Social Understanding",
        "Environmental Studies",
        "Ethics & Values",
        "Competitive Exams",
      ],
      learningOutcomes: [
        "Understand social evolution and Indian heritage",
        "Learn basics of Indian Constitution and governance",
        "Study environmental sustainability and awareness",
        "Develop ethical thinking and social responsibility",
      ],
      estimatedModules: 6,
      estimatedHours: 15,
      difficulty: "General",
    },
  ];

  // Get subjects for the active category
  const technologies =
    activeCategory === "tech"
      ? techSubjects
      : activeCategory === "iks"
        ? iksSubjects
        : btechSubjects;

  // Load saved selection from localStorage
  useEffect(() => {
    const savedSelection = localStorage.getItem(
      "Nayi Disha_selected_technology"
    );
    if (savedSelection) {
      try {
        const parsed = JSON.parse(savedSelection);
        // Check in all arrays
        const allSubjects = [...techSubjects, ...iksSubjects, ...btechSubjects];
        const technology = allSubjects?.find((t) => t?.id === parsed?.id);
        if (technology) {
          setSelectedTechnology(technology);
          setActiveCategory(technology.category);
        }
      } catch (error) {
        console.error("Error loading saved technology selection:", error);
      }
    }
  }, []);

  // Save selection to localStorage
  const handleTechnologySelect = (technology) => {
    setSelectedTechnology(technology);
    localStorage.setItem(
      "Nayi Disha_selected_technology",
      JSON.stringify(technology)
    );
  };

  // Reset selection
  const handleReset = () => {
    setSelectedTechnology(null);
    localStorage.removeItem("Nayi Disha_selected_technology");
  };

  // Continue to next step
  const handleContinue = () => {
    if (selectedTechnology) {
      navigate("/goal-selection");
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/landing-page");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom,_#000000_0%,_rgba(74,26,125,0.5)_0.1%,_#000000_70%)] ">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Step Indicator */}
          <OnboardingStepIndicator
            currentStep={2}
            totalSteps={4}
            onBack={handleBack}
            className="mb-12"
          />

          {/* Category Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-[#171717] border border-purple-500/20 rounded-xl p-1.5 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // Don't reset selection if it belongs to the target category
                    if (selectedTechnology?.category !== cat.id) {
                      setSelectedTechnology(null);
                    }
                  }}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    ${activeCategory === cat.id
                      ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }
                  `}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Description */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm text-muted-foreground mb-8"
          >
            {categories.find((c) => c.id === activeCategory)?.description}
          </motion.p>

          {/* Main Content */}
          <motion.div
            key={activeCategory + "-grid"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {/* Technology Selection Grid */}
            <TechnologyGrid
              technologies={technologies}
              selectedTechnology={selectedTechnology}
              onTechnologySelect={handleTechnologySelect}
              activeCategory={activeCategory}
              className="mb-12"
            />

            {/* Selection Summary */}
            {selectedTechnology && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="max-w-md mx-auto"
              >
                <SelectionSummary
                  selectedTechnology={selectedTechnology}
                  onContinue={handleContinue}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Background Gradient */}
          <div className="fixed inset-0 -z-10 gradient-bg opacity-30"></div>
        </div>
      </main>
    </div>
  );
};

export default SubjectSelection;
