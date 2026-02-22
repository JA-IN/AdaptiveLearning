import React from "react";
import { motion } from "framer-motion";
import Navbar from "../landing-page/components/NavBar";
import SolutionSection from "./components/SolutionSection";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SolutionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero Section for Solution Page */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(124,53,199,0.15)_0%,_transparent_70%)] pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                    >
                        A Smarter Way to <br />
                        <span className="text-primary">Master Your Syllabus</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
                    >
                        We've reimagined learning for the modern student. No more falling behind,
                        no more generic paths. Just a personal guide to your academic success.
                    </motion.p>
                </div>
            </section>

            {/* Main Solution Story */}
            <SolutionSection />

            {/* Bottom CTA */}
            <section className="py-24 px-6 border-t border-white/5 bg-[radial-gradient(circle_at_bottom,_rgba(124,53,199,0.05)_0%,_transparent_50%)]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to transform your learning?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/subject-selection")}
                            className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-[0_0_30px_rgba(124,53,199,0.3)] flex items-center justify-center gap-2"
                        >
                            Start Your Roadmap <ArrowRight className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                        >
                            Back to Home
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer (Simplified) */}
            <footer className="py-12 border-t border-white/5 text-center text-muted-foreground text-sm">
                <p>© {new Date().getFullYear()} Nayi Disha. Empowering students everywhere.</p>
            </footer>
        </div>
    );
};

export default SolutionPage;
