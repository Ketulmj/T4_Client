import { useState, useEffect, useRef } from 'react';
import { LogIn, ArrowRight, Lock, Unlock, ChevronDown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from 'react-router-dom';
import { decode } from 'js-base64';
import { toast } from 'sonner';
import ToastProvider from '../../components/Toaster';
import { useUser } from '../../contexts/user.context';
import logo from '../../public/logo.png'

const Signup = () => {
    const { url } = useParams();
    const [, setUser] = useUser();
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [currentClass, setCurrentClass] = useState("");
    const [grades, setGrades] = useState([]);
    const [orgId, setOrgId] = useState("");
    const [isClassSelectOpen, setIsClassSelectOpen] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [orgType, setOrgType] = useState([]);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const passwordRef = useRef();
    const selectRef = useRef();
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const classesType = ["Kindergarten", "Junior High", "Higher Secondary", "College"];

    useEffect(() => {
        if (url) {
            const decodedUrl = JSON.parse(decode(url));
            const { role, orgId } = decodedUrl;
            setRole(role);
            setOrgId(orgId);

            if (role === 'student') {
                fetch(`http://localhost:3000/api/get/org/classes?orgId=${orgId}`)
                    .then(res => res.json())
                    .then(({ orgClasses }) => {
                        setGrades(orgClasses);
                        setCurrentClass(orgClasses[0]);
                    });
            }
        } else {
            setRole('organization');
        }
    }, [url]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = `rgba(77, 124, 255, ${Math.random() * 0.5 + 0.2})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.01;

                const dx = this.x - mousePosition.x;
                const dy = this.y - mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * 2;
                    this.y += Math.sin(angle) * 2;
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                if (particle.size <= 0.2) {
                    particles.splice(index, 1);
                }
            });

            while (particles.length < 100) {
                particles.push(new Particle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                ));
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePosition]);

    const showPassword = (e) => {
        e.preventDefault();
        passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
        setPasswordType(passwordRef.current.type);
    };

    const validateForm = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!name) {
            toast.error("Name is required");
            return false;
        }

        if (!password) {
            toast.error("Password is required");
            return false;
        }

        if (password.length < 6) {
            toast.warning("Password should be at least 6 characters long");
            return false;
        }

        if (role === 'organization' && orgType.length === 0) {
            toast.error("Please select at least one organization type");
            return false;
        }

        return true;
    };

    const handleDetailsSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        const data = {
            email,
            name,
            password,
            role: role,
        };

        data.role !== 'organization' ? data.orgId = orgId : data.orgType = orgType;
        if (data.role === 'student') data.class = currentClass;

        try {
            const response = await fetch('http://localhost:3000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(data)
            });

            const { error, message, userData } = await response.json();

            if (error) {
                toast.error(message);
            } else {
                setUser(userData);
                toast.success(message);
                setTimeout(() => {
                    navigate(role === 'organization' ? '/waiting-approval' : '/dashboard');
                }, 500);
            }
        } catch (error) {
            toast.error("Connection error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const capitalization = () => {
        if (role)
            return role.charAt(0).toUpperCase() + role.slice(1);
    };

    const transitionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    return (
        <>
            <Helmet>
                <title>Signup | TimeFourthe</title>
                <link rel="icon" type="image/png" href={logo} />
            </Helmet>
            <ToastProvider />
            <div className="min-h-screen bg-[#0A0A0A] flex relative overflow-hidden hexagon-bg">
                <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none"></div>
                <div className="hidden lg:block w-1/2 relative">
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 xl:px-24 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={transitionVariants}
                        className="max-w-xl w-full mx-auto glass-effect p-8 rounded-2xl backdrop-blur-md shadow-md border border-[#4D7CFF]/20 hover-glow"
                    >
                        <div className="flex items-center mb-6">
                            <img src={logo} className="w-8 h-8" />
                            <span className="ml-2 text-xl font-bold text-white neon-glow">TimeFourthe</span>
                        </div>

                        <h1 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">
                            Join the TimeFourthe
                        </h1>
                        <p className="text-gray-400 mb-3">
                            Create your {capitalization()} account
                        </p>

                        <form onSubmit={handleDetailsSubmit} className="space-y-4">
                            <div>
                                <input
                                    name='email'
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#4D7CFF]/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D7CFF] focus:border-transparent shadow-md transition-all duration-200"
                                />
                            </div>
                            <div>
                                <input
                                    name='name'
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#4D7CFF]/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D7CFF] focus:border-transparent shadow-md transition-all duration-200"
                                />
                            </div>

                            {role === 'student' && (
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Classes</label>
                                    <div className="relative mt-2" ref={selectRef}>
                                        <div
                                            onClick={() => setIsClassSelectOpen(!isClassSelectOpen)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#4D7CFF]/20 text-white cursor-pointer flex items-center justify-between hover:bg-white/10 transition-all duration-200"
                                        >
                                            {currentClass}
                                            <ChevronDown className={`h-4 w-4 transition-transform ${isClassSelectOpen ? 'rotate-180' : ''}`} />
                                        </div>

                                        {isClassSelectOpen && (
                                            <div className="absolute w-full max-h-72 overflow-scroll mt-2 py-2 bg-[#0A0A0A] rounded-xl border border-[#4D7CFF]/20 shadow-xl z-10">
                                                {grades.map((className) => (
                                                    <div
                                                        key={className}
                                                        onClick={() => {
                                                            setCurrentClass(className);
                                                            setIsClassSelectOpen(false);
                                                        }}
                                                        className="px-4 py-2 text-gray-400 hover:bg-[#4D7CFF]/10 hover:text-white transition-colors cursor-pointer"
                                                    >
                                                        <span className="text-sm">{className}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {role !== 'organization' ? (
                                <div>
                                    <input
                                        name='orgid'
                                        type="text"
                                        value={orgId}
                                        disabled
                                        placeholder="Organization Id"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#4D7CFF]/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D7CFF] focus:border-transparent shadow-md transition-all duration-200"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-gray-400">Organization Contains</label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        {classesType.map((type) => (
                                            <div
                                                key={type}
                                                onClick={() => setOrgType(orgType => {
                                                    const index = classesType.indexOf(type);
                                                    return !orgType.includes(index) ? [...orgType, index] : orgType.filter(ot => ot !== index);
                                                })}
                                                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-center space-x-2
                                                    ${orgType.includes(classesType.indexOf(type))
                                                        ? 'border-[#4D7CFF]/40 bg-[#4D7CFF]/10 text-white'
                                                        : 'border-[#4D7CFF]/20 bg-white/5 text-gray-400 hover:bg-[#4D7CFF]/5'
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                                                    ${orgType.includes(classesType.indexOf(type))
                                                        ? 'border-[#4D7CFF] bg-[#4D7CFF]'
                                                        : 'border-gray-500'
                                                    }`}
                                                >
                                                    {orgType.includes(classesType.indexOf(type)) && (
                                                        <div className="w-2 h-2 bg-white rounded-sm" />
                                                    )}
                                                </div>
                                                <span className="text-sm">{type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className="relative">
                                    <input
                                        name='password'
                                        ref={passwordRef}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#4D7CFF]/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D7CFF] focus:border-transparent shadow-md transition-all duration-200"
                                    />
                                    {passwordType === "password" ? (
                                        <Lock
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4D7CFF]/50 cursor-pointer hover:text-[#4D7CFF] transition-colors"
                                            onClick={showPassword}
                                        />
                                    ) : (
                                        <Unlock
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4D7CFF]/50 cursor-pointer hover:text-[#4D7CFF] transition-colors"
                                            onClick={showPassword}
                                        />
                                    )}
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                className={`w-full bg-[#4D7CFF] hover:bg-[#3D6AE8] text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center group cursor-pointer font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating...
                                    </div>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>

                            <div className="text-center mt-6">
                                <p className="text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-[#4D7CFF] hover:text-[#3D6AE8] transition-colors cursor-pointer font-medium"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>

            </div>
        </>
    );
};

export default Signup;