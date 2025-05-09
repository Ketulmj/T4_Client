import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, BookOpen, X, Delete, Check, Users, ArrowLeft } from "lucide-react";
import { toast } from 'sonner';
import ToastProvider from '../../components/Toaster';

const SecondPhase = ({
    newSubject,
    setNewSubject,
    selectedTeacher,
    setSelectedTeacher,
    subjects,
    setSubjects,
    setIsTeacherPanelOpen,
    organizationTeachers,
    handleSubmit,
    isLab,
    setIsLab,
    setStep
}) => {
    const getSelectedTeacherName = () => {
        if (!selectedTeacher) return "Select Teacher*";
        const teacher = organizationTeachers.find(t => t.userId === selectedTeacher);
        return teacher ? teacher.name : "Select Teacher*";
    };

    const addSubject = (e) => {
        e.preventDefault();
        if (!newSubject.trim()) {
            toast.error('Please enter a subject name', {
                position: 'bottom-right',
                className: 'bg-red-500'
            });
            return;
        }
        if (!selectedTeacher) {
            toast.error('Teacher is required', {
                position: 'bottom-right',
                className: 'bg-red-500'
            });
            return;
        }

        const teacher = organizationTeachers.find(t => t.userId === selectedTeacher) || '';

        if (subjects.has(JSON.stringify({ name: newSubject, teacher: { name: teacher.name, teacherId: teacher.userId }, isLab }))) {
            toast.error("Already Included")
        }
        else {
            setSubjects(prev => {
                const newSet = new Set(prev);
                newSet.add(JSON.stringify({ name: newSubject, teacher: { name: teacher.name, teacherId: teacher.userId }, isLab }))
                return newSet
            })
        }
        setNewSubject("");
        setSelectedTeacher("");
        setIsLab(false)
    };

    const handleRemoveSubject = (name, teacher, isLab) => {
        // console.log(name, teacher, isLab);
        setSubjects(prev => {
            const newSet = new Set(prev);
            newSet.delete(JSON.stringify({ name, teacher, isLab }));
            return newSet;
        });
    };

    return (
        <>
        <ToastProvider />
        <motion.div
            className="w-full absolute top-0 left-0"
            initial={{ x: 800, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 800, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-semibold">Add Subjects</h2>
                <button
                    onClick={() => setStep(1)}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Previous Step
                </button>
            </div>

            <div className="flex gap-4 items-center">
                <div className="flex-1">
                    <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="w-full bg-zinc-800 text-white rounded-lg border border-white/10 px-4 py-2.5 focus:outline-none focus:border-white/30"
                        placeholder="Enter subject name"
                    />
                </div>
                <div className='bg-zinc-800 text-white px-3 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors flex items-center gap-4 whitespace-nowrap'>
                    <p className='text-white'>Is Lab?</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isLab} className="sr-only peer" onChange={(e) => setIsLab(!isLab)} />
                        <div className="group peer ring-0 bg-white rounded-full outline-none duration-300 after:duration-300 w-17 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95">
                        </div>
                    </label>
                </div>
                <button
                    onClick={() => setIsTeacherPanelOpen(true)}
                    className="bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <Users className="h-5 w-5" />
                    {getSelectedTeacherName()}
                </button>
                <button
                    onClick={addSubject}
                    className="bg-white text-black px-4 py-2.5 rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                    <PlusCircle className="h-5 w-5" />
                    Add
                </button>
            </div>

            {Array.from(subjects).length > 0 && (
                <div className="bg-zinc-800 rounded-lg border border-white/10 overflow-hidden mt-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-white/70 text-sm font-medium text-left py-3 px-4">Subject</th>
                                <th className="text-white/70 text-sm font-medium text-left py-3 px-4">Teacher*</th>
                                <th className="text-white/70 text-sm font-medium text-left py-3 px-4">Is Lab?</th>
                                <th className="text-white/70 text-sm font-medium text-right py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(subjects).map((subject, index) => (
                                <tr key={index} className="border-b border-white/10 last:border-none ">
                                    <td className="text-white py-3 px-4">{JSON.parse(subject).name}</td>
                                    <td className="text-white py-3 px-4">{JSON.parse(subject).teacher.name}</td>
                                    <td className="text-white py-3 px-4">{JSON.parse(subject).isLab ? <Check className='h-5 w-5' /> : <X className='h-5 w-5' />}</td>
                                    <td className="text-white py-3 px-4 text-right">
                                        <button
                                            onClick={() => handleRemoveSubject(JSON.parse(subject).name, JSON.parse(subject).teacher, JSON.parse(subject).isLab)}
                                            className="text-red-500 hover:text-red-400 transition-colors"
                                        >
                                            <Delete className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-3 mt-6"
                onClick={handleSubmit}
            >
                <BookOpen className="h-5 w-5" />
                Submit
            </button>
        </motion.div>
        </>
    );
};

export default SecondPhase;