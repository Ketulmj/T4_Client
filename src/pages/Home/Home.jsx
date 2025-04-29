import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarDays, Smartphone, Zap, CheckCircle, Calendar } from 'lucide-react';
import Header from '../../components/Header';
import { Helmet } from "react-helmet-async";
import Footer from '../../components/Footer';
import AnimatedTimetable from '../../components/AnimatedTimetable';
import logo from '../../public/logo.png';

function Home() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white hexagon-bg">
            {/* SEO Optimization */}
            <Helmet>
                <title>Best Timetable Scheduling Software | TimeFourthe</title>
                <link rel="icon" type="image/png" href={logo} />
            </Helmet>
            <div>
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
                            Create Perfect <br />
                            <span className="text-[#4D7CFF] animate-float inline-block">Timetables</span>
                        </motion.h1>
                    </div>

                    {/* Timetable Animation */}
                    <div className="relative h-[600px]">
                        <AnimatedTimetable />
                    </div>
                </main>

                {/* Features Section */}
                <section className="pb-20 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-glow">
                                Advanced Scheduling Features
                            </h2>
                            <p className="text-xl text-gray-400">
                                Optimize your scheduling with our advanced custom-built algorithm.
                                No more conflicts, just seamless planning.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <div className="bg-[#161618] py-5 text-center text-gray-400 absolute w-full">
                    <p>&copy; {new Date().getFullYear()} TimeFourthe. All rights reserved.</p>
                </div>
            </div>

        </div>
    );
}

const features = [
    {
        icon: <Clock />,
        title: "Intelligent Scheduling",
        description: "Custom-built algorithms generate optimized schedules efficiently."
    },
    {
        icon: <CalendarDays />,
        title: "Enhanced Visualization",
        description: "View and manage schedules with an intuitive interface."
    },
    {
        icon: <Smartphone />,
        title: "Seamless Sync",
        description: "Effortlessly synchronize schedules across all your devices."
    },
    {
        icon: <Zap />,
        title: "Time Efficiency",
        description: "Optimize time allocation for maximum productivity."
    },
    {
        icon: <CheckCircle />,
        title: "Conflict Prevention",
        description: "Proactively prevent scheduling conflicts with smart logic."
    },
    {
        icon: <Calendar />,
        title: "System Integration",
        description: "Easily connect with various scheduling platforms."
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
