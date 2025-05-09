import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import FirstPhase from "./FirstPhase";
import SecondPhase from "./SecondPhase";
import TeacherPanel from "./TeacherPanel";
import { Helmet } from "react-helmet-async";
import { userFetcher } from '../../lib/userFetcher';
import { useUser } from "../../contexts/user.context";
import { decode, encode } from "js-base64";
import { useNavigate } from "react-router-dom";
import logo from '../../public/logo.png'
import ToastProvider from '../../components/Toaster';
import TimetableDialog from './components/TimetableDialog'

const TimeTableForm = () => {
	const [user, setUser] = useUser()
	const [step, setStep] = useState(1);
	const [organizationTeachers, setOrganizationTeachers] = useState({});
	const [periodDuration, setPeriodDuration] = useState(30);
	const [specialHours, setSpecialHours] = useState(1);
	const [hoursPerDay, setHoursPerDay] = useState(6);
	const [breakDuration, setBreakDuration] = useState(30);
	const [classname, setClassname] = useState("");
	const [subjects, setSubjects] = useState(new Set());
	const [grades, setGrades] = useState([]);
	const [startTime, setStartTime] = useState("")
	const [breakStartTime, setBreakStartTime] = useState("")
	const [newSubject, setNewSubject] = useState("");
	const [selectedTeacher, setSelectedTeacher] = useState("");
	const [isLab, setIsLab] = useState(false)
	const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
	const [selectingSecondTeacher, setSelectingSecondTeacher] = useState(false);
	const [timeTableShowDialog, setTimeTableShowDialog] = useState(false)
	const [timeTableData, setTimeTableData] = useState()
	const [scheduledTeachers, setScheduledTeachers] = useState()
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate()

	useEffect(() => {
		if (user.role != 'organization') {
			navigate('/dashboard')
		}
		userFetcher(user, setUser)
	}, [])

	useEffect(() => {
		if (user.userId) {
			// classes fetching
			fetch(`http://localhost:3000/api/get/org/classes?OrgId=${user.userId}`)
				.then(res => res.json())
				.then(data => {
					if (data) {
						setGrades(data.orgClasses);
						setClassname(data.orgClasses[0])
					}
				})
			// Teachers fetching
			fetch(`http://localhost:3000/api/get/teachers?OrgId=${user.userId}`)
				.then(res => res.json())
				.then(data => {
					if (data) {
						setOrganizationTeachers(data);
						localStorage.setItem('teachers', encode(JSON.stringify(data)))
					}
				});
		}
	}, [user])

	const timeTableConfirm = () => {
		setIsLoading(true)
		fetch('http://localhost:3000/api/upload/timetable', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: "include",
			body: JSON.stringify({ TimeTable: timeTableData, ScheduledTeachers: scheduledTeachers })
		})
			.then(res => res.json())
			.then(({ status, result }) => {
				if (status) {
					toast.success(result);
					setTimeTableShowDialog(false);
					navigate('/dashboard');
					setIsLoading(false)
				}
			})
			.catch(err => console.log(err))
	}
	
	const TimeTableGenerate = () => {
		let subsData = [];
		Array.from(subjects).map(item => {
			subsData.push(JSON.parse(item))
		})

		const data = {
			orgId: user.userId,
			year: new Date().getFullYear(),
			class: classname,
			startTime,
			hoursPerDay,
			periodDuration,
			labDuration: specialHours * 60,
			breakDuration,
			breakStartTime,
			subjects: subsData
		};
		fetch('http://localhost:3000/api/generate/timetable', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: "include",
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(({ status, message, generatedTT, scheduledTeachers }) => {
				if (status == 400) toast.error(message || "Server Error - Bad Request")
				else {
					setTimeTableData(generatedTT)
					setScheduledTeachers(scheduledTeachers)
					setTimeTableShowDialog(true)
				}
			})
			.catch(err => console.log(err))
	}
	const timeTableClose = () => {
		setTimeTableShowDialog(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subjects.length === 0) {
			toast.error('Please add at least one subject', {
				position: 'bottom-right',
				className: 'bg-red-500'
			});
			return;
		}
		TimeTableGenerate()
	};

	return (
		<>
			<Helmet>
				<title>TimeTable | Time Fourthe</title>
				<link rel="icon" type="image/png" href={logo} />
			</Helmet>
			<ToastProvider />
			<Navbar role={user.role} />
			<div className="bg-black flex items-start justify-center py-4 px-4 sm:px-20 relative pt-20">

				<TimetableDialog
					onConfirm={timeTableConfirm}
					onRegenerate={TimeTableGenerate}
					onClose={timeTableClose}
					isOpen={timeTableShowDialog}
					timetableData={timeTableData}
					footer={true}
					cross={false}
					setIsLoading={setIsLoading}
					isLoading={isLoading}
				/>

				<div className="w-full bg-zinc-900 rounded-xl shadow-2xl shadow-white/5 p-4 sm:p-6 md:p-8 border border-white/10">
					<div className="relative">
						{/* Step 1: Basic Form */}
						<FirstPhase
							step={step} setStep={setStep}
							grades={grades} setGrades={setGrades}
							classname={classname} setClassname={setClassname}
							startTime={startTime} setStartTime={setStartTime}
							hoursPerDay={hoursPerDay} setHoursPerDay={setHoursPerDay}
							periodDuration={periodDuration} setPeriodDuration={setPeriodDuration}
							specialHours={specialHours} setSpecialHours={setSpecialHours}
							breakDuration={breakDuration} setBreakDuration={setBreakDuration}
							breakStartTime={breakStartTime} setBreakStartTime={setBreakStartTime}
							orgId={user.userId}
						/>
						{/* Step 2: Subject Creation and Display */}
						<AnimatePresence>
							{step === 2 && (
								<SecondPhase
									newSubject={newSubject} setNewSubject={setNewSubject}
									selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher}
									subjects={subjects} setSubjects={setSubjects}
									isLab={isLab} setIsLab={setIsLab}
									setIsTeacherPanelOpen={setIsTeacherPanelOpen}
									organizationTeachers={organizationTeachers}
									handleSubmit={handleSubmit}
									setStep={setStep}
								/>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Teacher Selection Panel */}
				<AnimatePresence>
					{isTeacherPanelOpen && (
						<TeacherPanel
							selectingSecondTeacher={selectingSecondTeacher}
							organizationTeachers={organizationTeachers}
							setIsTeacherPanelOpen={setIsTeacherPanelOpen}
							selectedTeacher={selectedTeacher}
							setSelectedTeacher={setSelectedTeacher}
							setSelectingSecondTeacher={setSelectingSecondTeacher}
						/>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export default TimeTableForm;
