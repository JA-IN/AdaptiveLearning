import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Brain,
    Target,
    TrendingUp,
    Lightbulb,
    BookOpen,
    Infinity,
    GraduationCap,
    ArrowRight,
    Check,
    Sparkles,
} from "lucide-react";
import Navbar from "../landing-page/components/NavBar";
import { useOutsideClick } from "../../hooks/use-outside-click";
import SpotlightCard from "../../components/SpotlightCard";

/* ─────────────────────────────────────────────
   Expandable Card Component (Aceternity UI)
   ───────────────────────────────────────────── */

const CloseIcon = () => (
    <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-black"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
    </motion.svg>
);

function ExpandableCards({ cards }) {
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            {/* Backdrop overlay */}
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-10"
                    />
                )}
            </AnimatePresence>

            {/* Expanded card modal */}
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 sm:rounded-3xl overflow-hidden border border-white/10"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img
                                    width={600}
                                    height={300}
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-60 lg:h-72 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                                />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-6">
                                    <div>
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-xl text-white"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-white/50 mt-1"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.button
                                        layoutId={`cta-${active.title}-${id}`}
                                        onClick={() => setActive(null)}
                                        className="px-5 py-2.5 text-sm rounded-full font-bold bg-primary text-white shrink-0"
                                    >
                                        {active.ctaText}
                                    </motion.button>
                                </div>
                                <div className="pt-2 relative px-6">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-white/60 text-sm lg:text-base h-48 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>

            {/* Card list */}
            <ul className="max-w-3xl mx-auto w-full space-y-2">
                {cards.map((card) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] rounded-2xl cursor-pointer transition-colors duration-300 group"
                    >
                        <div className="flex gap-4 flex-col md:flex-row items-center">
                            <motion.div layoutId={`image-${card.title}-${id}`}>
                                <img
                                    width={100}
                                    height={100}
                                    src={card.src}
                                    alt={card.title}
                                    className="h-40 w-full md:h-16 md:w-16 rounded-xl object-cover object-center"
                                />
                            </motion.div>
                            <div>
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="font-semibold text-white text-center md:text-left"
                                >
                                    {card.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-white/40 text-sm text-center md:text-left"
                                >
                                    {card.description}
                                </motion.p>
                            </div>
                        </div>
                        <motion.button
                            layoutId={`cta-${card.title}-${id}`}
                            className="px-4 py-2 text-sm rounded-full font-bold bg-white/5 border border-white/10 text-white/70 group-hover:bg-primary group-hover:text-white group-hover:border-primary mt-4 md:mt-0 transition-colors duration-300"
                        >
                            {card.ctaText}
                        </motion.button>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

/* ─────────────────────────────────────────────
   Feature Cards Data
   ───────────────────────────────────────────── */

const featureCards = [
    {
        title: "AI-Generated Roadmaps",
        description: "Your personal learning architect",
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        ctaText: "Learn More",
        content: () => (
            <div className="space-y-4">
                <p>
                    Our AI doesn't just throw content at you. It analyzes your selected
                    subject, your goal (exam prep, deep understanding, or placement), and
                    your current skill level — then constructs a module-by-module roadmap
                    unique to you.
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Personalized to your exact starting point</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Adapts as you progress through modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Covers university syllabus topics in order</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>No two roadmaps are the same</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Adaptive Quiz Engine",
        description: "Quizzes that learn about YOU",
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
        ctaText: "Learn More",
        content: () => (
            <div className="space-y-4">
                <p>
                    Every quiz is generated fresh by AI, calibrated to your current
                    understanding. Get a question wrong? The system drills deeper. Ace a
                    section? It pushes you ahead. Real-time difficulty adjustment keeps
                    you in the optimal learning zone.
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>AI-generated questions — never repeated</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>Difficulty scales with your performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>Covers every module and sub-topic</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>Instant explanations for every answer</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Structured Syllabus Data",
        description: "Your university syllabus, digitized",
        src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
        ctaText: "Learn More",
        content: () => (
            <div className="space-y-4">
                <p>
                    We've meticulously structured the B.Tech CSE syllabus — module by
                    module, topic by topic. This isn't scraped content; it's curated data
                    that ensures every quiz question aligns with exactly what your
                    professor will ask.
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>All 3 semesters covered (11+ subjects)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Module-wise topic breakdown</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Aligned with university exam patterns</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>New subjects added regularly</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Progress Analytics",
        description: "See your growth, not just your grade",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        ctaText: "Learn More",
        content: () => (
            <div className="space-y-4">
                <p>
                    Track your learning journey with visual analytics. See which modules
                    you've mastered, how your quiz scores trend over time, and where your
                    knowledge gaps are. Data-driven learning at its finest.
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Module completion tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Score trends over time</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Weak area identification</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Visual progress dashboards</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Infinite Practice Mode",
        description: "Never run out of questions",
        src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800",
        ctaText: "Learn More",
        content: () => (
            <div className="space-y-4">
                <p>
                    Traditional platforms give you a fixed question bank. We give you
                    infinity. Generate as many quizzes as you want on any topic, any
                    module, any difficulty. Practice until mastery — there's no cap, no
                    paywall on questions.
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Unlimited AI-generated quizzes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Topic-specific or mixed practice</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Timed or untimed modes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Zero question repetition</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Smart Recommendations",
        description: "Always know what to study next",
        src: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=800",
        ctaText: "Learn More",
        content: () => (
            <div className="space-y-4">
                <p>
                    After every quiz, our AI analyzes your performance and recommends
                    exactly what to study next. It identifies weak topics, suggests
                    reading materials, and recalibrates your roadmap — so you always have
                    a clear next step.
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink-400 shrink-0" />
                        <span>Post-quiz personalized advice</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink-400 shrink-0" />
                        <span>Curated reading materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink-400 shrink-0" />
                        <span>Next-module suggestions</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink-400 shrink-0" />
                        <span>Weakness-targeted practice</span>
                    </div>
                </div>
            </div>
        ),
    },
];

/* ─────────────────────────────────────────────
   Feature Deep-Dive Block (Alternating Layout)
   ───────────────────────────────────────────── */

const deepDiveFeatures = [
    {
        icon: <Brain className="w-7 h-7" />,
        title: "AI-Generated Roadmaps",
        subtitle: "Your personal learning architect",
        description:
            "Our AI analyzes your subject, goal, and skill level — then constructs a module-by-module roadmap unique to you. No one-size-fits-all. Every step is calibrated to YOUR current level.",
        highlights: [
            "Personalized to your starting point",
            "Adapts as you progress",
            "University syllabus aligned",
            "No two roadmaps are the same",
        ],
        accent: "#a855f7",
        gradient: "from-purple-500/10 to-violet-500/5",
    },
    {
        icon: <Target className="w-7 h-7" />,
        title: "Adaptive Quiz Engine",
        subtitle: "Quizzes that learn about YOU",
        description:
            "Every quiz is generated fresh by AI. Get a question wrong? The system drills deeper. Ace a section? It pushes you ahead. Real-time difficulty adjustment keeps you in the optimal learning zone.",
        highlights: [
            "AI-generated, never repeated",
            "Scales with your performance",
            "Covers every sub-topic",
            "Instant explanations",
        ],
        accent: "#6366f1",
        gradient: "from-indigo-500/10 to-blue-500/5",
    },
    {
        icon: <BookOpen className="w-7 h-7" />,
        title: "Structured Syllabus Data",
        subtitle: "Your university syllabus, digitized",
        description:
            "We've structured the B.Tech CSE syllabus module by module, topic by topic. This ensures every quiz question aligns with exactly what your professor will ask.",
        highlights: [
            "11+ subjects across 3 semesters",
            "Module-wise topic breakdown",
            "Aligned with exam patterns",
            "New subjects regularly",
        ],
        accent: "#f59e0b",
        gradient: "from-amber-500/10 to-yellow-500/5",
    },
    {
        icon: <TrendingUp className="w-7 h-7" />,
        title: "Progress Analytics",
        subtitle: "See your growth, not just your grade",
        description:
            "Track your journey with visual analytics. See which modules you've mastered, how your scores trend, and where your gaps are. Data-driven learning at its finest.",
        highlights: [
            "Module completion tracking",
            "Score trends over time",
            "Weak area identification",
            "Visual dashboards",
        ],
        accent: "#06b6d4",
        gradient: "from-cyan-500/10 to-teal-500/5",
    },
    {
        icon: <Infinity className="w-7 h-7" />,
        title: "Infinite Practice Mode",
        subtitle: "Never run out of questions",
        description:
            "Traditional platforms give you a fixed question bank. We give you infinity. Generate as many quizzes as you want on any topic, any difficulty. No cap, no paywall.",
        highlights: [
            "Unlimited AI quizzes",
            "Topic-specific or mixed",
            "Timed or untimed modes",
            "Zero repetition",
        ],
        accent: "#10b981",
        gradient: "from-emerald-500/10 to-green-500/5",
    },
    {
        icon: <Lightbulb className="w-7 h-7" />,
        title: "Smart Recommendations",
        subtitle: "Always know what to study next",
        description:
            "After every quiz, our AI recommends exactly what to study next. It identifies weak topics, suggests reading materials, and recalibrates your roadmap.",
        highlights: [
            "Post-quiz personalized advice",
            "Curated reading materials",
            "Next-module suggestions",
            "Weakness-targeted practice",
        ],
        accent: "#ec4899",
        gradient: "from-pink-500/10 to-rose-500/5",
    },
];

const FeatureBlock = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isReversed = index % 2 !== 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <div
                className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                    } gap-10 lg:gap-16 items-center`}
            >
                {/* Visual Card */}
                <div className="w-full lg:w-1/2">
                    <SpotlightCard
                        className={`relative rounded-2xl border border-white/[0.06] bg-gradient-to-br ${feature.gradient} p-8 md:p-10 overflow-hidden group !rounded-2xl`}
                        spotlightColor={`${feature.accent}30`}
                        style={{ boxShadow: `0 0 60px ${feature.accent}08` }}
                    >
                        <div
                            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                            style={{ backgroundColor: feature.accent }}
                        />
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                            style={{
                                backgroundColor: `${feature.accent}15`,
                                color: feature.accent,
                            }}
                        >
                            {feature.icon}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {feature.highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-start gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
                                >
                                    <Check
                                        className="w-4 h-4 mt-0.5 shrink-0"
                                        style={{ color: feature.accent }}
                                    />
                                    <span className="text-sm text-white/70">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </SpotlightCard>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                    <span
                        className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full inline-block mb-4"
                        style={{
                            backgroundColor: `${feature.accent}15`,
                            color: feature.accent,
                        }}
                    >
                        Feature {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                        className="text-3xl md:text-4xl font-bold mb-2"
                        style={{ color: feature.accent }}
                    >
                        {feature.title}
                    </h3>
                    <p className="text-white/40 font-medium mb-5">{feature.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {feature.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                        <div
                            className="h-1 w-14 rounded-full"
                            style={{
                                background: `linear-gradient(to right, ${feature.accent}, transparent)`,
                            }}
                        />
                        <div className="h-1 w-4 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   Main Features Page
   ───────────────────────────────────────────── */

const FeaturesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* ── Hero ── */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12)_0%,_transparent_60%)] pointer-events-none" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
                    >
                        <Sparkles className="w-4 h-4" /> Built for B.Tech Students
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                    >
                        Features That{" "}
                        <span className="text-primary">Actually Matter</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        Every feature is designed with one goal: help you understand your
                        syllabus deeply, practice endlessly, and ace your exams confidently.
                    </motion.p>
                </div>
            </section>

            {/* ── Feature Deep-Dives ── */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col gap-28">
                    {deepDiveFeatures.map((feature, index) => (
                        <FeatureBlock key={index} feature={feature} index={index} />
                    ))}
                </div>
            </section>

            {/* ── Expandable Cards ── */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Explore Each <span className="text-primary">Feature</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Click on any card below to dive deeper into what makes each
                            feature special.
                        </p>
                    </motion.div>

                    <ExpandableCards cards={featureCards} />
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="py-24 px-6 border-t border-white/5 bg-[radial-gradient(circle_at_bottom,_rgba(124,53,199,0.06)_0%,_transparent_50%)]">
                <div className="max-w-4xl mx-auto text-center">
                    <GraduationCap className="w-12 h-12 text-primary mx-auto mb-6 opacity-60" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to experience all this?
                    </h2>
                    <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                        Stop studying harder. Start studying smarter. Your personalized
                        learning journey begins with one click.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/auth")}
                            className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-[0_0_30px_rgba(124,53,199,0.3)] flex items-center justify-center gap-2"
                        >
                            Start Learning Free <ArrowRight className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/solution")}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                        >
                            See Our Solution
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center text-muted-foreground text-sm">
                <p>
                    © {new Date().getFullYear()} Nayi Disha. Empowering students
                    everywhere.
                </p>
            </footer>
        </div>
    );
};

export default FeaturesPage;
