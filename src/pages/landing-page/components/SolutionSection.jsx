import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Zap, Brain, Target, MessageSquare } from "lucide-react";

/**
 * SolutionSection Component
 * Tells the story of a student transitioning from struggling in a fast-paced 
 * classroom to mastering subjects at their own pace with Nayi Disha.
 */
const SolutionSection = ({ id }) => {
    const journeys = [
        {
            title: "The Classroom Struggle",
            subtitle: "Feeling left behind?",
            description: "Class moves at 1GB/s, while you're still processing the first 10MB. Teachers have a schedule to keep, and questions often go unasked. The gap grows every day.",
            icon: <MessageSquare className="w-6 h-6" />,
            color: "text-muted-foreground",
            bg: "bg-muted/10",
            borderColor: "border-muted/20",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800", // Grayscale study
            isStruggle: true,
        },
        {
            title: "The Personal Pivot",
            subtitle: "Your own neural path.",
            description: "Nayi Disha bridges the gap. We don't just give you content; we build an Adaptive Roadmap that understands where YOU are starting from.",
            icon: <Brain className="w-6 h-6" />,
            color: "text-primary",
            bg: "bg-primary/10",
            borderColor: "border-primary/30",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", // Digital path
            isStruggle: false,
        },
        {
            title: "Limitless Mastery",
            subtitle: "Practice makes proof.",
            description: "Generate infinite quizzes, access personalized reading materials, and track your growth. No judgment, no rush—just pure, unadulterated learning.",
            icon: <Zap className="w-6 h-6" />,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            borderColor: "border-purple-500/30",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", // Success/Collaboration
            isStruggle: false,
        }
    ];

    return (
        <section id={id} className="py-24 bg-black overflow-hidden scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wider uppercase text-sm"
                    >
                        The Solution
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
                    >
                        From <span className="text-muted-foreground line-through decoration-red-500/50">Struggle</span> to <span className="text-primary">Mastery</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Stop trying to keep up with the crowd. Start learning at the pace that matters most: **Yours.**
                    </motion.p>
                </div>

                {/* Story Journey Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 hidden lg:block z-0" />

                    {journeys.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10"
                        >
                            <div className={`h-full border ${step.borderColor} rounded-2xl bg-card/40 backdrop-blur-sm p-8 flex flex-col transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,53,199,0.1)] group`}>
                                {/* Visual Image */}
                                <div className="mb-8 overflow-hidden rounded-xl h-48 relative">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${step.isStruggle ? 'grayscale opacity-60' : 'brightness-110'}`}
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent`} />
                                    <div className={`absolute bottom-4 left-4 p-2 rounded-lg ${step.bg}`}>
                                        <div className={step.color}>
                                            {step.icon}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className={`text-xl font-bold mb-2 ${step.color === 'text-muted-foreground' ? 'text-white' : step.color}`}>
                                    {step.title}
                                </h3>
                                <p className="text-sm font-medium text-white/50 mb-4">{step.subtitle}</p>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {step.description}
                                </p>

                                {/* Step Indicator */}
                                <div className="mt-8 flex items-center gap-2">
                                    <div className={`w-8 h-1 rounded-full ${index === 0 ? 'bg-muted/30' : index === 1 ? 'bg-primary' : 'bg-purple-500'}`} />
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Step 0{index + 1}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing Call to Action for the story */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border border-primary/20 text-center relative overflow-hidden"
                >
                    {/* Blurry background accents */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[100px]" />

                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to break the cycle?</h3>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10">
                        Join thousands of students who have stopped "studying for the test" and started learning for themselves.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(124,53,199,0.4)] hover:shadow-[0_0_30px_rgba(124,53,199,0.6)] transition-all relative z-10"
                        onClick={() => window.location.href = '#technology-showcase'}
                    >
                        Explore B.Tech Roadmaps
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default SolutionSection;
