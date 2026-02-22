import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingStepIndicator from "../../components/ui/OnboardingStepIndicator";
import Button from "../../components/ui/Button";
import GoalCard from "./components/GoalCard";
import GoalComparisonModal from "./components/GoalComparisonModal";
import GoalSelectionHeader from "./components/GoalSelectionHeader";

const GoalSelection = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Goals data organized by technology
  const goalsByTechnology = {
    JavaScript: [
      {
        id: "frontend-development",
        type: "frontend-development",
        title: "Frontend Development",
        description:
          "Master modern JavaScript and create interactive, responsive web applications with the latest frontend technologies.",
        focusAreas: [
          "Modern JavaScript ES6+",
          "DOM Manipulation",
          "Async Programming",
          "Frontend Frameworks",
          "Responsive Design",
        ],
        careerOutcomes: [
          "Frontend Developer",
          "JavaScript Developer",
          "UI Developer",
          "Web Developer",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 10,
        skillsGained: [
          "ES6+ Features",
          "Event Handling",
          "API Integration",
          "Modern Build Tools",
        ],
      },
      {
        id: "full-stack-js",
        type: "full-stack-js",
        title: "Full-Stack JavaScript",
        description:
          "Build complete web applications using JavaScript on both frontend and backend with Node.js ecosystem.",
        focusAreas: [
          "Frontend JavaScript",
          "Node.js Backend",
          "Databases",
          "RESTful APIs",
          "Deployment",
        ],
        careerOutcomes: [
          "Full-Stack Developer",
          "JavaScript Engineer",
          "MERN/MEAN Stack Developer",
          "Web Application Developer",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 12,
        skillsGained: [
          "Full-Stack Architecture",
          "Database Integration",
          "Authentication & Security",
          "API Development",
        ],
      },
      {
        id: "interview-prep-js",
        type: "interview-prep-js",
        title: "Interview Preparation",
        description:
          "Master JavaScript algorithms, data structures, and problem-solving for technical interviews at top companies.",
        focusAreas: [
          "Data Structures",
          "Algorithms",
          "Problem Solving",
          "System Design Basics",
          "Coding Patterns",
        ],
        careerOutcomes: [
          "Software Engineer",
          "Frontend Engineer",
          "JavaScript Developer",
          "Technical Lead",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 11,
        skillsGained: [
          "Algorithm Design",
          "Code Optimization",
          "System Thinking",
          "Interview Strategies",
        ],
      },
    ],
    Python: [
      {
        id: "web-development-python",
        type: "web-development-python",
        title: "Web Development with Python",
        description:
          "Build robust web applications using Python frameworks like Django and Flask. Perfect for backend development.",
        focusAreas: [
          "Python Fundamentals",
          "Django/Flask",
          "REST APIs",
          "Database Management",
          "Deployment",
        ],
        careerOutcomes: [
          "Backend Developer",
          "Python Developer",
          "Full-Stack Developer",
          "Web Application Engineer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Python Web Frameworks",
          "API Development",
          "Database Design",
          "Authentication",
        ],
      },
      {
        id: "data-science",
        type: "data-science",
        title: "Data Science & Analytics",
        description:
          "Master data analysis, visualization, and machine learning with Python. Work with real-world datasets.",
        focusAreas: [
          "Data Analysis",
          "NumPy & Pandas",
          "Data Visualization",
          "Machine Learning Basics",
          "Statistical Analysis",
        ],
        careerOutcomes: [
          "Data Analyst",
          "Data Scientist",
          "ML Engineer",
          "Business Intelligence Analyst",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 12,
        skillsGained: [
          "Data Manipulation",
          "Statistical Analysis",
          "ML Algorithms",
          "Data Visualization",
        ],
      },
      {
        id: "automation-scripting",
        type: "automation-scripting",
        title: "Automation & Scripting",
        description:
          "Learn to automate tasks, build CLI tools, and create scripts to boost productivity and efficiency.",
        focusAreas: [
          "Python Scripting",
          "File Operations",
          "API Automation",
          "Web Scraping",
          "Task Scheduling",
        ],
        careerOutcomes: [
          "Automation Engineer",
          "DevOps Engineer",
          "QA Automation Engineer",
          "Systems Administrator",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Script Development",
          "Process Automation",
          "Web Scraping",
          "CLI Tools",
        ],
      },
    ],
    React: [
      {
        id: "react-fundamentals",
        type: "react-fundamentals",
        title: "React Fundamentals",
        description:
          "Master React from basics to advanced concepts. Build modern, interactive user interfaces with hooks and best practices.",
        focusAreas: [
          "React Components",
          "Hooks & State",
          "React Router",
          "API Integration",
          "Performance Optimization",
        ],
        careerOutcomes: [
          "React Developer",
          "Frontend Developer",
          "UI Engineer",
          "JavaScript Developer",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 9,
        skillsGained: [
          "React Ecosystem",
          "Component Design",
          "State Management",
          "Modern React Patterns",
        ],
      },
      {
        id: "react-advanced",
        type: "react-advanced",
        title: "Advanced React & Ecosystem",
        description:
          "Deep dive into advanced React patterns, state management, testing, and building production-ready applications.",
        focusAreas: [
          "Advanced Patterns",
          "Redux/Zustand",
          "Testing (Jest/RTL)",
          "TypeScript with React",
          "Performance & Optimization",
        ],
        careerOutcomes: [
          "Senior React Developer",
          "Frontend Architect",
          "Technical Lead",
          "Full-Stack Developer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Advanced",
        moduleCount: 11,
        skillsGained: [
          "State Management",
          "Testing Strategies",
          "TypeScript Integration",
          "Architecture Design",
        ],
      },
      {
        id: "react-native",
        type: "react-native",
        title: "React Native Mobile Development",
        description:
          "Build cross-platform mobile applications using React Native. Create iOS and Android apps with one codebase.",
        focusAreas: [
          "React Native Basics",
          "Mobile UI/UX",
          "Native Modules",
          "App Deployment",
          "Performance",
        ],
        careerOutcomes: [
          "Mobile Developer",
          "React Native Developer",
          "Cross-Platform Developer",
          "App Developer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 10,
        skillsGained: [
          "Mobile Development",
          "Native APIs",
          "App Store Deployment",
          "Mobile Optimization",
        ],
      },
    ],
    "Node.js": [
      {
        id: "backend-nodejs",
        type: "backend-nodejs",
        title: "Backend Development",
        description:
          "Build scalable server-side applications with Node.js. Master APIs, databases, and backend architecture.",
        focusAreas: [
          "Node.js Fundamentals",
          "Express.js",
          "REST APIs",
          "Database Integration",
          "Authentication",
        ],
        careerOutcomes: [
          "Backend Developer",
          "Node.js Developer",
          "API Developer",
          "Server-Side Engineer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate",
        moduleCount: 10,
        skillsGained: [
          "API Development",
          "Database Design",
          "Security Best Practices",
          "Server Architecture",
        ],
      },
      {
        id: "microservices",
        type: "microservices",
        title: "Microservices Architecture",
        description:
          "Design and build scalable microservices with Node.js. Learn distributed systems and cloud deployment.",
        focusAreas: [
          "Microservices Design",
          "Message Queues",
          "Docker & Kubernetes",
          "Cloud Services",
          "Service Communication",
        ],
        careerOutcomes: [
          "Microservices Architect",
          "Backend Engineer",
          "DevOps Engineer",
          "Cloud Engineer",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Advanced",
        moduleCount: 12,
        skillsGained: [
          "Distributed Systems",
          "Containerization",
          "Cloud Deployment",
          "Service Orchestration",
        ],
      },
      {
        id: "realtime-apps",
        type: "realtime-apps",
        title: "Real-time Applications",
        description:
          "Build real-time, event-driven applications using WebSockets and Node.js. Perfect for chat, gaming, and live apps.",
        focusAreas: [
          "WebSockets",
          "Socket.io",
          "Event-Driven Architecture",
          "Real-time Databases",
          "Scaling",
        ],
        careerOutcomes: [
          "Real-time Developer",
          "Full-Stack Developer",
          "Backend Engineer",
          "Application Architect",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 9,
        skillsGained: [
          "Real-time Communication",
          "Event Handling",
          "Scalability",
          "Performance Optimization",
        ],
      },
    ],
    History: [
      {
        id: "upsc-history",
        type: "upsc-history",
        title: "UPSC History Preparation",
        description:
          "Master Ancient, Medieval, and Modern Indian History for Civil Services and competitive examinations with a structured, exam-focused approach.",
        focusAreas: [
          "Ancient India",
          "Medieval India",
          "Modern Indian History",
          "Freedom Movement",
          "Art & Culture",
        ],
        careerOutcomes: [
          "Civil Services Officer",
          "History Teacher",
          "Research Scholar",
          "Heritage Consultant",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 12,
        skillsGained: [
          "Chronological Analysis",
          "Source Interpretation",
          "Answer Writing",
          "Critical Thinking",
        ],
      },
      {
        id: "academic-history",
        type: "academic-history",
        title: "Academic Research & Deep Study",
        description:
          "Deep-dive into Indian history with focus on historiography, primary source analysis, and scholarly perspectives.",
        focusAreas: [
          "Historiography",
          "Primary Sources",
          "Archaeological Evidence",
          "Cultural History",
          "Comparative Analysis",
        ],
        careerOutcomes: [
          "History Professor",
          "Museum Curator",
          "Documentary Researcher",
          "Archivist",
        ],
        estimatedDuration: "6-8 months",
        difficulty: "Advanced",
        moduleCount: 14,
        skillsGained: [
          "Research Methodology",
          "Source Criticism",
          "Academic Writing",
          "Analytical Thinking",
        ],
      },
      {
        id: "cultural-history",
        type: "cultural-history",
        title: "Cultural Understanding & Heritage",
        description:
          "Explore India's rich cultural tapestry — art, architecture, traditions, and their historical evolution across centuries.",
        focusAreas: [
          "Indian Art & Architecture",
          "Religious Movements",
          "Cultural Traditions",
          "Heritage Sites",
          "Social History",
        ],
        careerOutcomes: [
          "Heritage Manager",
          "Cultural Advisor",
          "Tourism Expert",
          "Content Creator",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Cultural Literacy",
          "Visual Analysis",
          "Heritage Appreciation",
          "Storytelling",
        ],
      },
    ],
    Economics: [
      {
        id: "upsc-economics",
        type: "upsc-economics",
        title: "UPSC Economics Preparation",
        description:
          "Master Indian Economy, economic planning, reforms, and policy frameworks for Civil Services with structured modules.",
        focusAreas: [
          "Indian Economic Planning",
          "Fiscal & Monetary Policy",
          "International Trade",
          "Banking & Finance",
          "Government Schemes",
        ],
        careerOutcomes: [
          "Civil Services Officer",
          "Economic Advisor",
          "Policy Analyst",
          "Banking Professional",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 11,
        skillsGained: [
          "Policy Analysis",
          "Data Interpretation",
          "Economic Reasoning",
          "Answer Writing",
        ],
      },
      {
        id: "banking-finance",
        type: "banking-finance",
        title: "Banking & Financial Literacy",
        description:
          "Understand the financial ecosystem — RBI functions, monetary policy, banking operations, and financial markets.",
        focusAreas: [
          "RBI & Monetary Policy",
          "Banking Operations",
          "Financial Markets",
          "Insurance & Pensions",
          "Digital Finance",
        ],
        careerOutcomes: [
          "Bank Officer",
          "Financial Analyst",
          "Insurance Professional",
          "Fintech Specialist",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 9,
        skillsGained: [
          "Financial Analysis",
          "Risk Assessment",
          "Market Understanding",
          "Regulatory Knowledge",
        ],
      },
      {
        id: "policy-analysis",
        type: "policy-analysis",
        title: "Public Policy & Governance",
        description:
          "Analyze major economic and social policies, budgeting processes, and governance efficiency in the Indian context.",
        focusAreas: [
          "Budget Analysis",
          "Social Sector Schemes",
          "Urban & Rural Policy",
          "Sustainable Development",
          "Governance Reforms",
        ],
        careerOutcomes: [
          "Policy Researcher",
          "Think Tank Analyst",
          "NGO Leader",
          "Government Consultant",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Policy Evaluation",
          "Impact Assessment",
          "Report Writing",
          "Systems Thinking",
        ],
      },
    ],
    Geography: [
      {
        id: "upsc-geography",
        type: "upsc-geography",
        title: "UPSC Geography Preparation",
        description:
          "Master Physical, Human, and Indian Geography for Civil Services with map-based learning and analytical approaches.",
        focusAreas: [
          "Physical Geography",
          "Indian Geography",
          "Human Geography",
          "Climatology",
          "Map-Based Questions",
        ],
        careerOutcomes: [
          "Civil Services Officer",
          "Geography Teacher",
          "GIS Specialist",
          "Urban Planner",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 12,
        skillsGained: [
          "Spatial Analysis",
          "Map Reading",
          "Data Interpretation",
          "Environmental Awareness",
        ],
      },
      {
        id: "environmental-studies",
        type: "environmental-studies",
        title: "Environmental Studies & Ecology",
        description:
          "Understand India's ecosystems, biodiversity, climate change, and environmental policy for a sustainable future.",
        focusAreas: [
          "Indian Ecosystems",
          "Biodiversity",
          "Climate Change",
          "Environmental Policy",
          "Conservation",
        ],
        careerOutcomes: [
          "Environmental Scientist",
          "Conservation Officer",
          "Climate Analyst",
          "Sustainability Consultant",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 9,
        skillsGained: [
          "Ecological Thinking",
          "Data Analysis",
          "Policy Understanding",
          "Conservation Planning",
        ],
      },
      {
        id: "map-spatial-skills",
        type: "map-spatial-skills",
        title: "Map Skills & Spatial Reasoning",
        description:
          "Develop advanced map reading, geospatial analysis, and spatial reasoning skills essential for geography mastery.",
        focusAreas: [
          "Map Reading",
          "Topographic Analysis",
          "GIS Basics",
          "Remote Sensing",
          "Cartography",
        ],
        careerOutcomes: [
          "GIS Analyst",
          "Cartographer",
          "Surveyor",
          "Geospatial Developer",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Map Interpretation",
          "Spatial Reasoning",
          "GIS Tools",
          "Visual Analysis",
        ],
      },
    ],
    Politics: [
      {
        id: "upsc-polity",
        type: "upsc-polity",
        title: "UPSC Indian Polity Preparation",
        description:
          "Master the Indian Constitution, governance structures, and political processes for UPSC and state exams.",
        focusAreas: [
          "Indian Constitution",
          "Fundamental Rights & Duties",
          "Parliament & Legislature",
          "Judiciary",
          "Constitutional Amendments",
        ],
        careerOutcomes: [
          "Civil Services Officer",
          "Law Professional",
          "Political Analyst",
          "Governance Consultant",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 11,
        skillsGained: [
          "Constitutional Interpretation",
          "Legal Reasoning",
          "Analytical Writing",
          "Critical Analysis",
        ],
      },
      {
        id: "governance-admin",
        type: "governance-admin",
        title: "Governance & Public Administration",
        description:
          "Understand Indian administrative systems, local governance (Panchayati Raj), and public policy implementation.",
        focusAreas: [
          "Public Administration",
          "Panchayati Raj",
          "E-Governance",
          "Administrative Reforms",
          "Welfare Programs",
        ],
        careerOutcomes: [
          "Administrative Officer",
          "Municipal Manager",
          "Policy Implementer",
          "Government Analyst",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 9,
        skillsGained: [
          "Administrative Understanding",
          "Policy Analysis",
          "Governance Frameworks",
          "Decision Making",
        ],
      },
      {
        id: "political-analysis",
        type: "political-analysis",
        title: "Political Analysis & Current Affairs",
        description:
          "Develop the ability to analyze political developments, election dynamics, and international relations affecting India.",
        focusAreas: [
          "Electoral Politics",
          "International Relations",
          "Political Parties",
          "Media & Democracy",
          "Current Affairs Analysis",
        ],
        careerOutcomes: [
          "Political Journalist",
          "Research Analyst",
          "Policy Advisor",
          "Diplomat",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Political Analysis",
          "Critical Reading",
          "Opinion Formation",
          "Research Skills",
        ],
      },
    ],
    Mahabharata: [
      {
        id: "mahabharata-philosophy",
        type: "mahabharata-philosophy",
        title: "Philosophy & Dharma Study",
        description:
          "Deep-dive into the philosophical core of the Mahabharata — Bhagavad Gita, dharma dilemmas, karma theory, and ethical frameworks.",
        focusAreas: [
          "Bhagavad Gita",
          "Dharma & Adharma",
          "Karma Theory",
          "Ethical Dilemmas",
          "Philosophical Schools",
        ],
        careerOutcomes: [
          "Philosophy Scholar",
          "Ethics Consultant",
          "Spiritual Teacher",
          "Author & Thinker",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 10,
        skillsGained: [
          "Philosophical Reasoning",
          "Ethical Analysis",
          "Textual Interpretation",
          "Critical Thinking",
        ],
      },
      {
        id: "mahabharata-leadership",
        type: "mahabharata-leadership",
        title: "Leadership & Strategic Thinking",
        description:
          "Extract timeless leadership lessons from the Mahabharata — Krishna's strategy, Yudhishthira's dilemma, and Bhishma's wisdom.",
        focusAreas: [
          "Strategic Thinking",
          "Leadership Styles",
          "Decision Making",
          "Conflict Resolution",
          "Team Dynamics",
        ],
        careerOutcomes: [
          "Business Leader",
          "Management Consultant",
          "Executive Coach",
          "Strategic Planner",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Strategic Analysis",
          "Leadership Models",
          "Negotiation Skills",
          "Wisdom Application",
        ],
      },
      {
        id: "mahabharata-narrative",
        type: "mahabharata-narrative",
        title: "Narrative & Cultural Heritage",
        description:
          "Explore the Mahabharata as literature — its characters, story arcs, regional retellings, and influence on Indian art and culture.",
        focusAreas: [
          "Character Analysis",
          "Story Structure",
          "Regional Variations",
          "Art & Performance",
          "Modern Adaptations",
        ],
        careerOutcomes: [
          "Literature Scholar",
          "Content Creator",
          "Cultural Curator",
          "Screenwriter",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Literary Analysis",
          "Cultural Literacy",
          "Narrative Skills",
          "Creative Thinking",
        ],
      },
    ],
    Ramayana: [
      {
        id: "ramayana-dharma",
        type: "ramayana-dharma",
        title: "Dharma & Ethical Living",
        description:
          "Study the Ramayana as a guide to righteous living — explore concepts of duty, sacrifice, honor, and ethical decision-making.",
        focusAreas: [
          "Concept of Dharma",
          "Ethical Decision Making",
          "Duty & Sacrifice",
          "Family Values",
          "Character Virtues",
        ],
        careerOutcomes: [
          "Ethics Scholar",
          "Spiritual Counselor",
          "Philosophy Teacher",
          "Life Coach",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 9,
        skillsGained: [
          "Ethical Reasoning",
          "Value Analysis",
          "Textual Study",
          "Self-Reflection",
        ],
      },
      {
        id: "ramayana-governance",
        type: "ramayana-governance",
        title: "Leadership & Rama Rajya",
        description:
          "Analyze Rama Rajya as a governance model — ideal kingship, justice, administrative principles, and people-centric leadership.",
        focusAreas: [
          "Ideal Governance",
          "Justice System",
          "Administrative Wisdom",
          "People-Centric Rule",
          "Diplomatic Relations",
        ],
        careerOutcomes: [
          "Governance Scholar",
          "Public Administrator",
          "Leadership Coach",
          "Political Thinker",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Governance Thinking",
          "Leadership Analysis",
          "Policy Design",
          "Administrative Insight",
        ],
      },
      {
        id: "ramayana-culture",
        type: "ramayana-culture",
        title: "Cultural Study & Global Influence",
        description:
          "Explore the Ramayana's impact across Asia — from Cambodia to Thailand, its artistic representations, and living oral traditions.",
        focusAreas: [
          "Pan-Asian Influence",
          "Art & Architecture",
          "Oral Traditions",
          "Modern Retellings",
          "Comparative Literature",
        ],
        careerOutcomes: [
          "Cultural Researcher",
          "Travel & Heritage Expert",
          "Documentary Filmmaker",
          "Academic Writer",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Cultural Analysis",
          "Comparative Study",
          "Visual Literacy",
          "Research Skills",
        ],
      },
    ],
    // ── B.Tech CSE Subjects ──
    "Mathematics-1": [
      {
        id: "math1-exam-prep",
        type: "math1-exam-prep",
        title: "Exam Preparation",
        description:
          "Structured preparation for university exams covering calculus, matrices, and differential equations with practice problems.",
        focusAreas: [
          "Calculus",
          "Linear Algebra",
          "Differential Equations",
          "Series & Sequences",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Strong Foundation",
          "Higher Studies Ready",
          "Competitive Exam Prep",
          "Academic Excellence",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Foundation to Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Problem Solving",
          "Mathematical Reasoning",
          "Analytical Thinking",
          "Exam Strategy",
        ],
      },
      {
        id: "math1-conceptual",
        type: "math1-conceptual",
        title: "Deep Conceptual Understanding",
        description:
          "Build intuition behind mathematical concepts — understand the 'why' behind formulas, with visual and applied approaches.",
        focusAreas: [
          "Intuitive Calculus",
          "Geometric Interpretation",
          "Applied Mathematics",
          "Proof Techniques",
          "Real-World Applications",
        ],
        careerOutcomes: [
          "Research Aptitude",
          "Data Science Foundation",
          "Teaching Capability",
          "Graduate Studies",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate",
        moduleCount: 12,
        skillsGained: [
          "Mathematical Intuition",
          "Abstract Thinking",
          "Proof Writing",
          "Application Design",
        ],
      },
    ],
    BEE: [
      {
        id: "bee-exam-prep",
        type: "bee-exam-prep",
        title: "Exam Preparation",
        description:
          "Master circuit analysis, network theorems, and electrical machines for university exams with solved examples.",
        focusAreas: [
          "DC & AC Circuits",
          "Network Theorems",
          "Transformers",
          "Electrical Machines",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Success",
          "Engineering Foundation",
          "IoT & Embedded Basics",
          "GATE Preparation",
        ],
        estimatedDuration: "2-3 months",
        difficulty: "Foundation",
        moduleCount: 8,
        skillsGained: [
          "Circuit Analysis",
          "Numerical Problem Solving",
          "Electrical Concepts",
          "Exam Strategy",
        ],
      },
      {
        id: "bee-practical",
        type: "bee-practical",
        title: "Practical & Lab Focus",
        description:
          "Hands-on understanding of electrical circuits, measurements, and safety — ideal for lab preparation and practical exams.",
        focusAreas: [
          "Circuit Building",
          "Measurement Instruments",
          "Safety Standards",
          "Lab Experiments",
          "Report Writing",
        ],
        careerOutcomes: [
          "Lab Excellence",
          "Hardware Understanding",
          "IoT Projects",
          "Embedded Systems Basics",
        ],
        estimatedDuration: "2-3 months",
        difficulty: "Foundation",
        moduleCount: 7,
        skillsGained: [
          "Practical Skills",
          "Instrument Handling",
          "Safety Awareness",
          "Lab Documentation",
        ],
      },
    ],
    Physics: [
      {
        id: "physics-exam-prep",
        type: "physics-exam-prep",
        title: "Exam Preparation",
        description:
          "Comprehensive exam prep covering optics, quantum mechanics, semiconductors, and electromagnetic theory with numericals.",
        focusAreas: [
          "Wave Optics",
          "Quantum Mechanics",
          "Semiconductor Physics",
          "Electromagnetic Theory",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Excellence",
          "Engineering Foundation",
          "GATE Physics",
          "Higher Studies",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Foundation to Intermediate",
        moduleCount: 9,
        skillsGained: [
          "Numerical Solving",
          "Conceptual Clarity",
          "Derivation Skills",
          "Exam Strategy",
        ],
      },
      {
        id: "physics-applied",
        type: "physics-applied",
        title: "Applied & Modern Physics",
        description:
          "Explore how physics concepts drive modern technology — lasers, fiber optics, semiconductors, and quantum computing basics.",
        focusAreas: [
          "Laser Technology",
          "Fiber Optics",
          "Semiconductor Devices",
          "Nanotechnology",
          "Quantum Applications",
        ],
        careerOutcomes: [
          "Tech Innovation",
          "Research & Development",
          "Semiconductor Industry",
          "Quantum Computing",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Applied Thinking",
          "Technology Awareness",
          "Research Mindset",
          "Innovation Skills",
        ],
      },
    ],
    English: [
      {
        id: "english-communication",
        type: "english-communication",
        title: "Professional Communication",
        description:
          "Build professional communication skills — technical writing, presentations, email etiquette, and interview preparation.",
        focusAreas: [
          "Technical Writing",
          "Presentations",
          "Email Etiquette",
          "Interview Skills",
          "Group Discussions",
        ],
        careerOutcomes: [
          "Interview Ready",
          "Professional Writer",
          "Effective Communicator",
          "Corporate Ready",
        ],
        estimatedDuration: "2-3 months",
        difficulty: "Essential Skill",
        moduleCount: 7,
        skillsGained: [
          "Writing Skills",
          "Presentation Skills",
          "Communication",
          "Confidence",
        ],
      },
      {
        id: "english-exam-prep",
        type: "english-exam-prep",
        title: "Exam Preparation",
        description:
          "Grammar, comprehension, essay writing, and report preparation for university English exams.",
        focusAreas: [
          "Grammar & Usage",
          "Reading Comprehension",
          "Essay Writing",
          "Report Writing",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Success",
          "Language Proficiency",
          "Academic Writing",
          "Competitive Exam Prep",
        ],
        estimatedDuration: "2-3 months",
        difficulty: "Foundation",
        moduleCount: 6,
        skillsGained: [
          "Grammar Mastery",
          "Comprehension",
          "Writing Skills",
          "Exam Strategy",
        ],
      },
    ],
    Chemistry: [
      {
        id: "chem-exam-prep",
        type: "chem-exam-prep",
        title: "Exam Preparation",
        description:
          "Master electrochemistry, polymers, corrosion, and water treatment for university exams with solved problems.",
        focusAreas: [
          "Electrochemistry",
          "Polymer Chemistry",
          "Corrosion Science",
          "Water Treatment",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Excellence",
          "Engineering Foundation",
          "Material Science Basics",
          "GATE Preparation",
        ],
        estimatedDuration: "2-3 months",
        difficulty: "Foundation",
        moduleCount: 8,
        skillsGained: [
          "Chemical Analysis",
          "Problem Solving",
          "Lab Understanding",
          "Exam Strategy",
        ],
      },
      {
        id: "chem-applied",
        type: "chem-applied",
        title: "Applied & Green Chemistry",
        description:
          "Understand engineering materials, battery technology, nanotechnology, and environmental chemistry for real-world applications.",
        focusAreas: [
          "Battery Technology",
          "Nanomaterials",
          "Green Chemistry",
          "Smart Materials",
          "Environmental Solutions",
        ],
        careerOutcomes: [
          "Material Scientist",
          "Battery Engineer",
          "Environmental Analyst",
          "R&D Professional",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 7,
        skillsGained: [
          "Applied Chemistry",
          "Technology Awareness",
          "Environmental Thinking",
          "Innovation",
        ],
      },
    ],
    PPS: [
      {
        id: "pps-exam-prep",
        type: "pps-exam-prep",
        title: "Exam Preparation",
        description:
          "Master C programming fundamentals — syntax, control structures, arrays, pointers, and functions for university exams.",
        focusAreas: [
          "C Syntax & Data Types",
          "Control Structures",
          "Arrays & Strings",
          "Pointers & Structures",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Excellence",
          "Programming Foundation",
          "Coding Interviews",
          "System Programming",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner Friendly",
        moduleCount: 10,
        skillsGained: [
          "C Programming",
          "Logic Building",
          "Debugging",
          "Exam Strategy",
        ],
      },
      {
        id: "pps-competitive",
        type: "pps-competitive",
        title: "Competitive Coding with C",
        description:
          "Build strong problem-solving skills using C — practice coding challenges, logic puzzles, and algorithmic thinking.",
        focusAreas: [
          "Problem Solving",
          "Pattern Programs",
          "Recursion",
          "Dynamic Thinking",
          "Coding Challenges",
        ],
        careerOutcomes: [
          "Competitive Programmer",
          "Software Developer",
          "Interview Ready",
          "Strong Logic Foundation",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Algorithmic Thinking",
          "Code Optimization",
          "Pattern Recognition",
          "Speed Coding",
        ],
      },
    ],
    "Mathematics-2": [
      {
        id: "math2-exam-prep",
        type: "math2-exam-prep",
        title: "Exam Preparation",
        description:
          "Structured preparation for Laplace transforms, Fourier series, complex analysis, and probability for university exams.",
        focusAreas: [
          "Laplace Transforms",
          "Fourier Series",
          "Complex Variables",
          "Probability & Statistics",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Success",
          "Signal Processing Basics",
          "ML Math Foundation",
          "Higher Studies",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Transform Methods",
          "Statistical Thinking",
          "Complex Analysis",
          "Exam Strategy",
        ],
      },
      {
        id: "math2-applied",
        type: "math2-applied",
        title: "Applied Mathematics for CS",
        description:
          "Understand how transforms, statistics, and complex analysis apply to signal processing, ML, and data science.",
        focusAreas: [
          "Signal Analysis",
          "Statistical Methods",
          "Data Science Math",
          "Computational Techniques",
          "Real-World Models",
        ],
        careerOutcomes: [
          "Data Scientist",
          "ML Engineer",
          "Signal Processing",
          "Research Analyst",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 11,
        skillsGained: [
          "Applied Mathematics",
          "Data Analysis",
          "Modeling Skills",
          "Computational Thinking",
        ],
      },
    ],
    "Mathematics-3": [
      {
        id: "math3-exam-prep",
        type: "math3-exam-prep",
        title: "Exam Preparation",
        description:
          "Master discrete mathematics — graph theory, combinatorics, number theory, and numerical methods for university exams.",
        focusAreas: [
          "Graph Theory",
          "Combinatorics",
          "Number Theory",
          "Numerical Methods",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Success",
          "Algorithm Foundation",
          "Cryptography Basics",
          "GATE Preparation",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Discrete Thinking",
          "Graph Analysis",
          "Proof Techniques",
          "Exam Strategy",
        ],
      },
      {
        id: "math3-cs-applications",
        type: "math3-cs-applications",
        title: "Discrete Math for CS",
        description:
          "Apply discrete mathematics to computer science — algorithms, cryptography, database theory, and network optimization.",
        focusAreas: [
          "Algorithm Analysis",
          "Cryptography",
          "Database Theory",
          "Network Optimization",
          "Logic & Proofs",
        ],
        careerOutcomes: [
          "Algorithm Designer",
          "Security Analyst",
          "Database Engineer",
          "Research Scholar",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 11,
        skillsGained: [
          "Algorithmic Design",
          "Logical Reasoning",
          "Applied Cryptography",
          "Optimization",
        ],
      },
    ],
    DSA: [
      {
        id: "dsa-exam-prep",
        type: "dsa-exam-prep",
        title: "Exam Preparation",
        description:
          "Master arrays, linked lists, trees, graphs, sorting, and searching for university exams with theory and implementation.",
        focusAreas: [
          "Arrays & Linked Lists",
          "Stacks & Queues",
          "Trees & Graphs",
          "Sorting & Searching",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Excellence",
          "Interview Foundation",
          "Programming Skills",
          "GATE Preparation",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Core Subject",
        moduleCount: 14,
        skillsGained: [
          "Data Structure Design",
          "Algorithm Analysis",
          "Code Implementation",
          "Exam Strategy",
        ],
      },
      {
        id: "dsa-placement",
        type: "dsa-placement",
        title: "Placement & Interview Prep",
        description:
          "Intensive DSA practice for placement interviews — solve 200+ problems across arrays, trees, graphs, DP, and greedy.",
        focusAreas: [
          "Problem Solving Patterns",
          "Dynamic Programming",
          "Graph Algorithms",
          "Greedy Methods",
          "Company-Specific Questions",
        ],
        careerOutcomes: [
          "Software Engineer",
          "Product Developer",
          "Backend Engineer",
          "Tech Lead",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 16,
        skillsGained: [
          "Problem Solving",
          "Code Optimization",
          "Interview Skills",
          "Time Management",
        ],
      },
      {
        id: "dsa-competitive",
        type: "dsa-competitive",
        title: "Competitive Programming",
        description:
          "Level up with advanced algorithms — segment trees, suffix arrays, network flow, and contest strategies.",
        focusAreas: [
          "Advanced Data Structures",
          "Advanced Graph Algorithms",
          "Number Theory",
          "Geometry",
          "Contest Strategy",
        ],
        careerOutcomes: [
          "Competitive Programmer",
          "Algorithm Researcher",
          "ICPC Participant",
          "Tech Innovator",
        ],
        estimatedDuration: "6-8 months",
        difficulty: "Advanced",
        moduleCount: 18,
        skillsGained: [
          "Advanced Algorithms",
          "Speed Coding",
          "Creative Problem Solving",
          "Mathematical Thinking",
        ],
      },
    ],
    OOPS: [
      {
        id: "oops-exam-prep",
        type: "oops-exam-prep",
        title: "Exam Preparation",
        description:
          "Master classes, inheritance, polymorphism, abstraction, and encapsulation for university exams with C++/Java examples.",
        focusAreas: [
          "Classes & Objects",
          "Inheritance",
          "Polymorphism",
          "Abstraction & Encapsulation",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Excellence",
          "Software Development Basics",
          "Interview Foundation",
          "GATE Preparation",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Core Subject",
        moduleCount: 10,
        skillsGained: [
          "OOP Concepts",
          "Code Design",
          "Implementation",
          "Exam Strategy",
        ],
      },
      {
        id: "oops-project",
        type: "oops-project",
        title: "Project-Based Learning",
        description:
          "Build real projects using OOP principles — design patterns, SOLID principles, and clean architecture with C++/Java.",
        focusAreas: [
          "Design Patterns",
          "SOLID Principles",
          "Clean Code",
          "UML Diagrams",
          "Project Building",
        ],
        careerOutcomes: [
          "Software Engineer",
          "Application Developer",
          "System Designer",
          "Open Source Contributor",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate",
        moduleCount: 11,
        skillsGained: [
          "Design Thinking",
          "Clean Architecture",
          "Project Development",
          "Code Quality",
        ],
      },
    ],
    "Digital Electronics": [
      {
        id: "de-exam-prep",
        type: "de-exam-prep",
        title: "Exam Preparation",
        description:
          "Master Boolean algebra, K-maps, combinational & sequential circuits, flip-flops, and counters for university exams.",
        focusAreas: [
          "Boolean Algebra",
          "K-Map Simplification",
          "Combinational Circuits",
          "Sequential Circuits",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Excellence",
          "Computer Architecture Basics",
          "GATE Digital Logic",
          "VLSI Foundation",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 9,
        skillsGained: [
          "Logic Design",
          "Circuit Analysis",
          "Problem Solving",
          "Exam Strategy",
        ],
      },
      {
        id: "de-practical",
        type: "de-practical",
        title: "Practical & Hardware Design",
        description:
          "Hands-on digital circuit design using simulators, FPGA basics, and hardware description languages.",
        focusAreas: [
          "Circuit Simulation",
          "FPGA Basics",
          "Verilog/VHDL Intro",
          "Prototyping",
          "Lab Experiments",
        ],
        careerOutcomes: [
          "Hardware Engineer",
          "VLSI Designer",
          "Embedded Developer",
          "IoT Engineer",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Hardware Simulation",
          "Digital Design",
          "HDL Basics",
          "Prototyping",
        ],
      },
    ],
    "Development of Society": [
      {
        id: "dos-exam-prep",
        type: "dos-exam-prep",
        title: "Exam Preparation",
        description:
          "Study social evolution, Indian heritage, constitutional basics, and environmental awareness for university exams.",
        focusAreas: [
          "Social Evolution",
          "Indian Heritage",
          "Constitution Basics",
          "Environmental Studies",
          "Previous Year Papers",
        ],
        careerOutcomes: [
          "Exam Success",
          "General Knowledge",
          "Social Awareness",
          "Competitive Exam Prep",
        ],
        estimatedDuration: "1-2 months",
        difficulty: "General",
        moduleCount: 6,
        skillsGained: [
          "Social Understanding",
          "Constitutional Awareness",
          "Environmental Thinking",
          "Exam Strategy",
        ],
      },
      {
        id: "dos-awareness",
        type: "dos-awareness",
        title: "Social Awareness & Ethics",
        description:
          "Develop a broader understanding of society, environmental sustainability, ethics, and your role as a responsible engineer.",
        focusAreas: [
          "Sustainability",
          "Professional Ethics",
          "Social Responsibility",
          "Diversity & Inclusion",
          "Environmental Policy",
        ],
        careerOutcomes: [
          "Socially Responsible Engineer",
          "ESG Analyst",
          "CSR Professional",
          "Policy Advocate",
        ],
        estimatedDuration: "2-3 months",
        difficulty: "General",
        moduleCount: 6,
        skillsGained: [
          "Ethical Thinking",
          "Sustainability Awareness",
          "Social Analysis",
          "Civic Responsibility",
        ],
      },
    ],
  };

  // Get goals for selected technology
  const technologyName = selectedSubject?.name || "JavaScript";
  const goals =
    goalsByTechnology[technologyName] || goalsByTechnology.JavaScript;

  // Load saved data on component mount
  useEffect(() => {
    // Read technology from the correct localStorage key
    const savedTechnology = localStorage.getItem(
      "Nayi Disha_selected_technology"
    );
    const savedGoal = localStorage.getItem("Nayi Disha_selected_goal");

    if (savedTechnology) {
      try {
        setSelectedSubject(JSON.parse(savedTechnology));
      } catch (e) {
        console.error("Error parsing saved technology:", e);
      }
    }

    if (savedGoal) {
      try {
        const goalData = JSON.parse(savedGoal);
        setSelectedGoal(goalData?.id);
      } catch (e) {
        console.error("Error parsing saved goal:", e);
      }
    }
  }, []);

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);

    // Save to localStorage
    const goalData = goals?.find((g) => g?.id === goalId);
    localStorage.setItem("Nayi Disha_selected_goal", JSON.stringify(goalData));

    // Save onboarding progress
    const onboardingData = JSON.parse(
      localStorage.getItem("Nayi Disha_onboarding") || "{}"
    );
    onboardingData.goal = goalData;
    onboardingData.currentStep = 3;
    onboardingData.completedSteps = ["subject", "goal"];
    localStorage.setItem(
      "Nayi Disha_onboarding",
      JSON.stringify(onboardingData)
    );
  };

  const handleContinue = async () => {
    if (!selectedGoal) return;

    setIsLoading(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    navigate("/skill-level-selection");
  };

  const handleBack = () => {
    navigate("/subject-selection");
  };

  const handleCompareGoals = () => {
    setShowComparison(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed  bg-[linear-gradient(180deg,rgba(74,26,125,1)_20%,rgba(0,0,0,1)_100%)]"></div>
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          {/* Step Indicator */}
          <OnboardingStepIndicator
            currentStep={2}
            totalSteps={4}
            onBack={handleBack}
            className="mb-12"
          />

          {/* Header */}
          <GoalSelectionHeader
            selectedSubject={selectedSubject?.name}
            onCompareGoals={handleCompareGoals}
            className="mb-12"
          />

          {/* Goal Cards */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goals?.map((goal) => (
                <GoalCard
                  key={goal?.id}
                  goal={goal}
                  isSelected={selectedGoal === goal?.id}
                  onSelect={() => handleGoalSelect(goal?.id)}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>

          {/* Selected Goal Summary */}
          {selectedGoal && (
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="glass-card border border-primary/30 rounded-lg p-6 bg-primary/5">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">✓</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {goals?.find((g) => g?.id === selectedGoal)?.title}{" "}
                      Selected
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your personalized roadmap will include{" "}
                      {goals?.find((g) => g?.id === selectedGoal)?.moduleCount}{" "}
                      modules designed to achieve your career goals in{" "}
                      {
                        goals?.find((g) => g?.id === selectedGoal)
                          ?.estimatedDuration
                      }
                      .
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {goals
                        ?.find((g) => g?.id === selectedGoal)
                        ?.skillsGained?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md border border-primary/30"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="hover:bg-white/5"
            >
              Back
            </Button>

            <Button
              variant="default"
              onClick={handleContinue}
              disabled={!selectedGoal}
              loading={isLoading}
              iconName="ArrowRight"
              iconPosition="right"
              className="floating-action"
            >
              Continue
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Don't worry - you can change your goal anytime from your dashboard
            </p>
          </div>
        </div>
      </div>
      {/* Comparison Modal */}
      <GoalComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        goals={goals}
      />
    </div>
  );
};

export default GoalSelection;
