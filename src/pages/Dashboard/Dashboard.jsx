import React, { useState, useEffect } from 'react';
import { School, Users, Building2, Share2 } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { toast } from 'sonner';
import { encode, decode } from 'js-base64';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/logo.png';
import Navbar from '../../components/Navbar';
import OrganizationView from './OrganizationView';
import ConfirmationDialog from './ConfirmationDialog';
import ScheduleStudentView from './ScheduleStudentView';
import ScheduleTeacherView from './ScheduleTeacherView';
import WeeklyTimetableModal from './WeeklyTimetableModel';
import ToastProvider from '../../components/Toaster';
import ttdata from '../../tmpdata/timetable-data.json'
import { useUser } from '../../contexts/user.context';
import { userFetcher } from '../../lib/userFetcher';

const mockTimetables=ttdata;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const convertToSimpleTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
};

const ShareButton = ({ title, forX, user }) => (
  <button
    onClick={() => {
      const data = { orgId: user.userId, role: forX };
      const encodedURL = `http://localhost:5173/signup/${encode(JSON.stringify(data))}`;
      navigator.clipboard.writeText(encodedURL);
      toast.success(`Link Copied 🎉`, {
        duration: 5000,
        style: { backgroundColor: "#16a34a", color: "white", fontSize: "1rem" },
      });
    }}
    className="flex items-center space-x-2 text-[#4D7CFF] hover:text-[#6B8FFF] px-3 py-2 rounded-lg hover:bg-[#4D7CFF]/10 transition-colors cursor-pointer"
  >
    <Share2 className="w-4 h-4" />
    <span>{title}</span>
  </button>
);

const WeekNavigator = ({ selectedDay, setSelectedDay }) => (
  <div className="animate-on-mount glass-effect rounded-xl p-4">
    <div className="flex flex-col w-max mx-auto sm:flex-row items-center justify-between gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {days.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
              selectedDay === day
                ? 'bg-[#4D7CFF] text-white shadow-lg'
                : 'glass-effect text-white hover:bg-[#4D7CFF]/15'
            }`}
            style={{
              animation: `fadeIn 0.3s ease-out forwards ${index * 0.1}s`,
            }}
          >
            {window.innerWidth < 640 ? day.slice(0, 3) : day}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    return days[today.getDay() === 0 ? 6 : today.getDay() - 1];
  });
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [absentClasses, setAbsentClasses] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    scheduleKey: null,
    isUnmarking: false,
    subject: null,
    className: null,
    date: null
  });

  useEffect(() => {
    userFetcher(user, setUser);
    const isAbsentClassesExist = localStorage.getItem('absentClasses');
    if (isAbsentClassesExist) {
      const storedAbsentClasses = JSON.parse(decode(isAbsentClassesExist));
      if (storedAbsentClasses) setAbsentClasses(storedAbsentClasses);
    }    
  }, []);

  useEffect(() => {
    localStorage.setItem('absentClasses', encode(JSON.stringify(absentClasses)));
  }, [absentClasses]);

  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleConfirmAbsent = () => {
    setConfirmDialog({
      isOpen: false,
      scheduleKey: null,
      isUnmarking: false,
      subject: null,
      className: null,
      date: confirmDialog.date,
      deleteTableId: null
    });
    
    if (user.role === 'organization') {
      console.log("TimeTable Delete : ", confirmDialog.deleteTableId);
    } else {
      setAbsentClasses((prev) => [...prev, confirmDialog.scheduleKey]);
    }
  };

  const UserInfo = () => (
    <>
      <Helmet>
        <title>Dashboard | Time Fourthe</title>
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>

        <ToastProvider />
      <div className="animate-on-mount glass-effect rounded-xl p-4 transition-all duration-300">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-x-1">
            <div className="p-3 glass-effect rounded-lg hover-scale">
              {user.role === "organization" ? (
                <Building2 className="h-5 w-5 text-[#4D7CFF] transition-all duration-300 hover:text-[#6B8FFF]" />
              ) : user.role === "teacher" ? (
                <Users className="h-5 w-5 text-[#4D7CFF] transition-all duration-300 hover:text-[#6B8FFF]" />
              ) : (
                <School className="h-5 w-5 text-[#4D7CFF] transition-all duration-300 hover:text-[#6B8FFF]" />
              )}
            </div>
            <div className="slide-in">
              <h2 className="text-white text-lg font-semibold tracking-tight">{user.name}</h2>
              <p className="text-white/70 text-xs font-medium">ID: {user.userId}</p>
            </div>
          </div>
          {user.role === 'organization' && (
            <div className="flex gap-x-2">
              <ShareButton title="Share for Students" forX="student" user={user} />
              <ShareButton title="Share for Teachers" forX="teacher" user={user} />
            </div>
          )}
        </div>
      </div>
    </>
  );

  const getDaySchedule = (dayIndex) => {
    const schedule = mockTimetables.generatedTimeTable[dayIndex] || [];
    return schedule.map(slot => ({
      time: slot.startTime,
      subject: slot.subject.name,
      teacher: slot.subject.teacher.name,
      isLab: slot.subject.isLab
    }));
  };

  return (
    <>
      <Navbar role={user.role} />
      <div className="h-[calc(100vh-64px)] bg-[#0A0A0A] hexagon-bg p-3 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-4">
          <UserInfo />
          {user.role === 'Teacher' && (
            <div className="space-y-4">
              <WeekNavigator selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
              <div className="animate-on-mount">
                <ScheduleTeacherView
                  selectedDay={selectedDay}
                  convertToSimpleTime={convertToSimpleTime}
                  days={days}
                  absentClasses={absentClasses}
                  setAbsentClasses={setAbsentClasses}
                  setConfirmDialog={setConfirmDialog}
                />
              </div>
            </div>
          )}
          {user.role === 'student' && (
            <div className="space-y-4">
              <div className="animate-on-mount">
                <ScheduleStudentView
                  convertToSimpleTime={convertToSimpleTime}
                  mockWeekSchedule={mockTimetables}
                  selectedDay={selectedDay}
                />
              </div>
            </div>
          )}
          {user.role === "organization" && (
            <div className="animate-on-mount">
              <OrganizationView
                confirmDialog={confirmDialog}
                mockTimetables={mockTimetables}
                setConfirmDialog={setConfirmDialog}
                setIsModalOpen={setIsModalOpen}
                setSelectedTimetable={setSelectedTimetable}
              />
            </div>
          )}
          {selectedTimetable && (
            <WeeklyTimetableModal
              timetable={selectedTimetable}
              onClose={handleCloseModal}
              isOpen={isModalOpen}
              days={days}
              schedule={mockTimetables.generatedTimeTable}
            />
          )}
          <ConfirmationDialog
            isOpen={confirmDialog.isOpen}
            onClose={() => setConfirmDialog({ isOpen: false, scheduleKey: null, isUnmarking: false })}
            onConfirm={handleConfirmAbsent}
            message={
              user.role === 'organization'
                ? 'Are you sure you want to delete this timetable?'
                : confirmDialog.isUnmarking
                ? "Are you sure you want to unmark this class as absent?"
                : "Are you sure you want to mark this class as absent?"
            }
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;