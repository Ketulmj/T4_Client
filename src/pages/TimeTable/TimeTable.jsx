import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';
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
	const [division, setDivision] = useState("");
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
		console.log('Confirm TimeTable')
		fetch('http://localhost:3000/api/upload/timetable', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: "include",
			body: JSON.stringify({ timeTable: timeTableData, scheduledTeachers: scheduledTeachers })
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err))
	}
	const TimeTableGenerate = () => {
		const data = {
			orgId: user.userId,
			year: new Date().getFullYear(),
			class: classname,
			division,
			startTime,
			hoursPerDay,
			periodDuration,
			labDuration: specialHours,
			breakDuration,
			breakStartTime,
			subjects
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
				if (status == 400) toast.error(message)
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
			<Toaster
				position="bottom-right"
				toastOptions={{
					style: {
						fontSize: '1rem',
						background: 'rgb(239 68 68)',
						color: 'white',
						border: 'none'
					},
					className: 'bg-red-500'
				}}
			/>
			<Navbar role={user.role} />
			<div className="min-h-screen bg-black flex items-center justify-center py-4 px-4 sm:px-20 relative">


				{/* ------------------------------------------------------------- */}
				<TimetableDialog
					onConfirm={timeTableConfirm}
					onRegenerate={TimeTableGenerate}
					onClose={timeTableClose}
					isOpen={timeTableShowDialog}
					timetableData={timeTableData}
				/>



				<div className="w-full bg-zinc-900 rounded-xl shadow-2xl shadow-white/5 p-4 sm:p-6 md:p-8 border border-white/10">
					<div className="relative">
						{/* Step 1: Basic Form */}
						<FirstPhase
							step={step} setStep={setStep}
							grades={grades} setGrades={setGrades}
							classname={classname} setClassname={setClassname}
							division={division} setDivision={setDivision}
							startTime={startTime} setStartTime={setStartTime}
							hoursPerDay={hoursPerDay} setHoursPerDay={setHoursPerDay}
							periodDuration={periodDuration} setPeriodDuration={setPeriodDuration}
							specialHours={specialHours} setSpecialHours={setSpecialHours}
							breakDuration={breakDuration} setBreakDuration={setBreakDuration}
							breakStartTime={breakStartTime} setBreakStartTime={setBreakStartTime}
						/>
						{/* Step 2: Subject Creation and Display */}
						<AnimatePresence>
							{step === 2 && (
								<SecondPhase
									newSubject={newSubject} setNewSubject={setNewSubject}
									selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher}
									subjects={subjects} setSubjects={setSubjects}
									isLab={isLab} setIsLab={setIsLab}
									setSelectingSecondTeacher={setSelectingSecondTeacher}
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



const dataTT = {
	"id": null,
	"orgId": "ORG163705377487057",
	"class": "Class X",
	"division": "A",
	"year": 2024,
	"breakStartTime": 670,
	"breakDuration": 0,
	"periodDuration": 60,
	"labDuration": 60,
	"timetable": [
		[
			{
				"startTime": 500,
				"subject": {
					"name": "Gujrati",
					"isLab": false,
					"teacher": {
						"name": "Mike Johnson",
						"teacherId": "TCH1003"
					}
				}
			},
			{
				"startTime": 560,
				"subject": {
					"name": "Math",
					"isLab": true,
					"teacher": {
						"name": "John Doe",
						"teacherId": "TCH1001"
					}
				}
			},
			{
				"startTime": 620,
				"subject": {
					"name": "Biology",
					"isLab": true,
					"teacher": {
						"name": "Sarah Lee",
						"teacherId": "TCH1004"
					}
				}
			},
			{
				"startTime": 680,
				"subject": {
					"name": "Physics",
					"isLab": false,
					"teacher": {
						"name": "Jane Smith",
						"teacherId": "TCH1002"
					}
				}
			}
		],
		[
			{
				"startTime": 500,
				"subject": {
					"name": "Gujrati",
					"isLab": false,
					"teacher": {
						"name": "Mike Johnson",
						"teacherId": "TCH1003"
					}
				}
			},
			{
				"startTime": 560,
				"subject": {
					"name": "Sport",
					"isLab": true,
					"teacher": {
						"name": "Sarah Lee",
						"teacherId": "TCH1004"
					}
				}
			},
			{
				"startTime": 620,
				"subject": {
					"name": "Math",
					"isLab": true,
					"teacher": {
						"name": "John Doe",
						"teacherId": "TCH1001"
					}
				}
			},
			{
				"startTime": 680,
				"subject": {
					"name": "Physics",
					"isLab": false,
					"teacher": {
						"name": "Jane Smith",
						"teacherId": "TCH1002"
					}
				}
			}
		],
		[
			{
				"startTime": 500,
				"subject": {
					"name": "Physics",
					"isLab": false,
					"teacher": {
						"name": "Jane Smith",
						"teacherId": "TCH1002"
					}
				}
			},
			{
				"startTime": 560,
				"subject": {
					"name": "Sport",
					"isLab": true,
					"teacher": {
						"name": "Sarah Lee",
						"teacherId": "TCH1004"
					}
				}
			},
			{
				"startTime": 620,
				"subject": {
					"name": "Chemistry",
					"isLab": false,
					"teacher": {
						"name": "Mike Johnson",
						"teacherId": "TCH1003"
					}
				}
			},
			{
				"startTime": 680,
				"subject": {
					"name": "Math",
					"isLab": true,
					"teacher": {
						"name": "John Doe",
						"teacherId": "TCH1001"
					}
				}
			}
		],
		[
			{
				"startTime": 500,
				"subject": {
					"name": "Sport",
					"isLab": true,
					"teacher": {
						"name": "Sarah Lee",
						"teacherId": "TCH1004"
					}
				}
			},
			{
				"startTime": 560,
				"subject": {
					"name": "Gujrati",
					"isLab": false,
					"teacher": {
						"name": "Mike Johnson",
						"teacherId": "TCH1003"
					}
				}
			},
			{
				"startTime": 620,
				"subject": {
					"name": "Physics",
					"isLab": false,
					"teacher": {
						"name": "Jane Smith",
						"teacherId": "TCH1002"
					}
				}
			},
			{
				"startTime": 680,
				"subject": {
					"name": "Math",
					"isLab": true,
					"teacher": {
						"name": "John Doe",
						"teacherId": "TCH1001"
					}
				}
			}
		],
		[
			{
				"startTime": 500,
				"subject": {
					"name": "Chemistry",
					"isLab": false,
					"teacher": {
						"name": "Mike Johnson",
						"teacherId": "TCH1003"
					}
				}
			},
			{
				"startTime": 560,
				"subject": {
					"name": "Biology",
					"isLab": true,
					"teacher": {
						"name": "Sarah Lee",
						"teacherId": "TCH1004"
					}
				}
			},
			{
				"startTime": 620,
				"subject": {
					"name": "Math",
					"isLab": true,
					"teacher": {
						"name": "John Doe",
						"teacherId": "TCH1001"
					}
				}
			},
			{
				"startTime": 680,
				"subject": {
					"name": "Physics",
					"isLab": false,
					"teacher": {
						"name": "Jane Smith",
						"teacherId": "TCH1002"
					}
				}
			}
		],
		[
			{
				"startTime": 500,
				"subject": {
					"name": "Math",
					"isLab": true,
					"teacher": {
						"name": "John Doe",
						"teacherId": "TCH1001"
					}
				}
			},
			{
				"startTime": 560,
				"subject": {
					"name": "Physics",
					"isLab": false,
					"teacher": {
						"name": "Jane Smith",
						"teacherId": "TCH1002"
					}
				}
			},
			{
				"startTime": 620,
				"subject": {
					"name": "Chemistry",
					"isLab": false,
					"teacher": {
						"name": "Mike Johnson",
						"teacherId": "TCH1003"
					}
				}
			},
			{
				"startTime": 680,
				"subject": {
					"name": "Sport",
					"isLab": true,
					"teacher": {
						"name": "Sarah Lee",
						"teacherId": "TCH1004"
					}
				}
			}
		]
	]
}