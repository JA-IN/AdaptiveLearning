import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Brain, Zap } from "lucide-react";

/**
 * SolutionSection Component
 * 3-phase journey: Before → During → After, each with an animated video.
 */

const phases = [
    {
        label: "Before Our Solution",
        title: "The Classroom Struggle",
        subtitle: "Falling behind every day",
        description:
            "The lectures race ahead. The syllabus piles up. You sit in a room full of students but feel completely alone in your confusion. The gap between what's taught and what you understand grows wider every single day.",
        video: "/videos/before.mp4",
        icon: <MessageSquare className="w-5 h-5" />,
        accent: "from-red-500/20 to-orange-500/10",
        accentBorder: "border-red-500/20",
        accentText: "text-red-400",
        accentBg: "bg-red-500/10",
        tagColor: "bg-red-500/20 text-red-300",
        glowColor: "shadow-[0_0_40px_rgba(239,68,68,0.08)]",
    },
    {
        label: "During Our Solution",
        title: "The Adaptive Pivot",
        subtitle: "Learning at YOUR frequency",
        description:
            "Nayi Disha analyzes your strengths and gaps, then builds a roadmap made just for you. No more one-size-fits-all. Every quiz, every reading, every module is calibrated to YOUR current level.",
        video: "/videos/during.mp4",
        icon: <Brain className="w-5 h-5" />,
        accent: "from-primary/20 to-purple-500/10",
        accentBorder: "border-primary/30",
        accentText: "text-primary",
        accentBg: "bg-primary/10",
        tagColor: "bg-primary/20 text-purple-300",
        glowColor: "shadow-[0_0_40px_rgba(124,53,199,0.12)]",
    },
    {
        label: "After Our Solution",
        title: "Limitless Mastery",
        subtitle: "Confidence, not just marks",
        description:
            "You don't just pass exams — you understand the subject. Generate infinite quizzes, access curated reading materials, and watch your knowledge compound. The struggle becomes a story you tell with pride.",
        video: "/videos/after.mp4",
        icon: <Zap className="w-5 h-5" />,
        accent: "from-emerald-500/20 to-teal-500/10",
        accentBorder: "border-emerald-500/20",
        accentText: "text-emerald-400",
        accentBg: "bg-emerald-500/10",
        tagColor: "bg-emerald-500/20 text-emerald-300",
        glowColor: "shadow-[0_0_40px_rgba(16,185,129,0.1)]",
    },
];

const PhaseBlock = ({ phase, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isReversed = index % 2 !== 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
        >
            {/* Phase connector line */}
            {index < phases.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-16 bg-gradient-to-b from-white/10 to-transparent hidden lg:block z-0" />
            )}

            <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}>
                {/* Video Side */}
                <div className="w-full lg:w-1/2">
                    <div className={`relative rounded-2xl overflow-hidden border ${phase.accentBorder} ${phase.glowColor} group`}>
                        {/* Phase Tag */}
                        <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${phase.tagColor} backdrop-blur-sm`}>
                            {phase.label}
                        </div>

                        {/* Video */}
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                        >
                            <source src={phase.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Bottom gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${phase.accent} opacity-40 pointer-events-none`} />
                    </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    {/* Step number */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl ${phase.accentBg} flex items-center justify-center ${phase.accentText}`}>
                            {phase.icon}
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                            Step {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>

                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${phase.accentText}`}>
                        {phase.title}
                    </h3>
                    <p className="text-sm font-medium text-white/40 mb-5">{phase.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {phase.description}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-6 flex items-center gap-2">
                        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${phase.accent}`} />
                        <div className="h-1 w-4 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SolutionSection = ({ id }) => {
    return (
        <section id={id} className="py-24 bg-black overflow-hidden scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wider uppercase text-sm"
                    >
                        Journey of a Student
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
                    >
                        From{" "}
                        <span className="text-red-400 line-through decoration-red-500/50">
                            Struggle
                        </span>{" "}
                        to{" "}
                        <span className="text-emerald-400">Mastery</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Watch how one student's journey transforms with Nayi Disha — from
                        confusion to confidence.
                    </motion.p>
                </div>

                {/* Journey Phases */}
                <div className="flex flex-col gap-24">
                    {phases.map((phase, index) => (
                        <PhaseBlock key={index} phase={phase} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
