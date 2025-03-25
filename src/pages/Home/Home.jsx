import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarDays, Smartphone, Zap, CheckCircle, Calendar } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimatedTimetable from '../../components/AnimatedTimetable';

function Home() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white hexagon-bg">
            <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none"></div>
            <Header />
            <main className="relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold"
                    >
                        Create perfect
                        <br />
                        <span className="text-[#4D7CFF] animate-float inline-block">timetables</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex justify-center gap-4"
                    >
                    </motion.div>
                </div>

                <div className="relative h-[600px]">
                    <AnimatedTimetable />
                </div>
            </main>

            <section className="pb-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-glow">
                            Quantum-powered features
                        </h2>
                        <p className="text-xl text-gray-400">
                            Experience scheduling capabilities that were once thought impossible.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

const features = [
    {
        icon: <Clock />,
        title: "Quantum Scheduling",
        description: "Self-generated algorithms calculate infinite scheduling possibilities in seconds"
    },
    {
        icon: <CalendarDays />,
        title: "Holographic Views",
        description: "Experience your schedule in stunning 3D with interactive holographic projections"
    },
    {
        icon: <Smartphone />,
        title: "Neural Sync",
        description: "Seamlessly sync across all your devices with quantum entanglement technology"
    },
    {
        icon: <Zap />,
        title: "Time Optimization",
        description: "Advanced temporal analytics ensure perfect time allocation for maximum productivity"
    },
    {
        icon: <CheckCircle />,
        title: "Conflict Prevention",
        description: "Predictive AI prevents scheduling conflicts before they occur in any timeline"
    },
    {
        icon: <Calendar />,
        title: "Universal Integration",
        description: "Connect with any scheduling system across the multiverse"
    }
];

function FeatureCard({ icon, title, description, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6 transition-all duration-200 hover:bg-[#252525]/50 hover-glow"
        >
            <div className="bg-[#4D7CFF]/10 rounded-lg p-3 w-fit mb-4">
                <div className="text-[#4D7CFF]">
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    );
}

export default Home;