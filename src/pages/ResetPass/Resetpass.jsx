import { useState, useEffect } from 'react';
import { Lock, ArrowRight, Clock, Unlock } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ToastProvider from '../../components/Toaster';
import logo from '../../public/logo.png'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [id, setId] = useState('');
  const [searchParams] = useSearchParams();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const id = searchParams.get("id");
    id && setId(id);
  }, [searchParams]);

  const transitionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmpassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/user/update/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: forgotEmail, newPassword: password, id })
      });

      const data = await response.json();
      
      if (data.result) {
        toast.success('Password changed successfully!');
        // Redirect to login after successful password change
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        toast.error('Failed to change password. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordType = (field) => {
    if (field === 'password') {
      setPasswordType(prev => prev === "password" ? "text" : "password");
    } else {
      setConfirmPasswordType(prev => prev === "password" ? "text" : "password");
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | TimeFourthe</title>
      <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden hexagon-bg">
        <ToastProvider/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={transitionVariants}
          className="max-w-md w-full space-y-8 glass-effect p-8 rounded-2xl backdrop-blur-md border border-[#4D7CFF]/20 shadow-md relative z-10 hover-glow"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <img src={logo} className="w-12 h-12" />
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-2 tracking-wide drop-shadow-lg">
              Reset Quantum Key
            </h2>
            <p className="text-gray-400 mb-8">
              Enter your new quantum signature
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="relative">
                  <input
                    type={passwordType}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#4D7CFF]/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D7CFF] focus:border-transparent shadow-md transition-all duration-200"
                    placeholder="New Password"
                  />
                  {passwordType === "password" ? (
                    <Lock 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4D7CFF]/50 cursor-pointer hover:text-[#4D7CFF] transition-colors" 
                      onClick={() => togglePasswordType('password')} 
                    />
                  ) : (
                    <Unlock 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4D7CFF]/50 cursor-pointer hover:text-[#4D7CFF] transition-colors" 
                      onClick={() => togglePasswordType('password')} 
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={confirmPasswordType}
                    value={confirmpassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#4D7CFF]/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D7CFF] focus:border-transparent shadow-md transition-all duration-200"
                    placeholder="Confirm New Password"
                  />
                  {confirmPasswordType === "password" ? (
                    <Lock 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4D7CFF]/50 cursor-pointer hover:text-[#4D7CFF] transition-colors" 
                      onClick={() => togglePasswordType('confirm')} 
                    />
                  ) : (
                    <Unlock 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4D7CFF]/50 cursor-pointer hover:text-[#4D7CFF] transition-colors" 
                      onClick={() => togglePasswordType('confirm')} 
                    />
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                className={`w-full bg-[#4D7CFF] hover:bg-[#3D6AE8] text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center group cursor-pointer font-medium cyber-border hover-glow ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  <>
                    Update Quantum Key
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6">
              <Link
                to="/login"
                className="inline-flex items-center text-[#4D7CFF]/80 hover:text-[#4D7CFF] transition-colors group"
              >
                Return to quantum portal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResetPassword;