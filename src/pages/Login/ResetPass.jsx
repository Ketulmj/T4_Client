import { motion } from 'framer-motion'
import { Mail, X, Send } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner'

const ResetPass = ({ setShowForgotPassword }) => {
    const [forgotEmail, setForgotEmail] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault(); 
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgot/mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: forgotEmail })
        })
            .then(res => res.json())
            .then(({ result,status }) => {
                if (status==200) {
                    setShowForgotPassword(false)
                    toast.success(result);
                }
                else toast.error(result);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (

        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed bottom-4 right-4 w-96 bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden glow-border z-20 border border-[#4D7CFF]/20 hover-glow"
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Mail className="w-5 h-5 text-[#4D7CFF]" />
                        Reset Password
                    </h3>
                    <button
                        onClick={() => setShowForgotPassword(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            className="input-glow w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-md"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center group font-medium bg-[#4D7CFF] hover:bg-[#3D6AE8] text-white py-3 rounded-xl transition-all duration-200  group cursor-pointer "
                    >
                        Send Reset Link
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-400">
                    We'll send you an email with instructions to reset your password.
                </p>
            </div>
        </motion.div>
    )
}

export default ResetPass
