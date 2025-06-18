import React, { useState, useEffect } from 'react';
import { School, Users, Building2, Share2 } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { toast } from 'sonner';
import { encode } from 'js-base64';
import logo from '../../public/logo.png';
import Navbar from '../../components/Navbar';
import OrganizationView from './OrganizationView';
import ScheduleStudentView from './ScheduleStudentView';
import ScheduleTeacherView from './ScheduleTeacherView';
import WeeklyTimetableModal from './WeeklyTimetableModel';
import ToastProvider from '../../components/Toaster';
import { useUser } from '../../contexts/user.context';
import { userFetcher } from '../../lib/userFetcher';

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
      const encodedURL = `${import.meta.env.VITE_BACKEND_URL}/signup/${encode(JSON.stringify(data))}`;
      navigator.clipboard.writeText(encodedURL);
      toast.success("Link Copied 🎉");
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
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${selectedDay === day
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
  }, []);

  const handleCloseModal = () => setIsModalOpen(false);

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
              {user && user.role === "organization" ? (
                <Building2 className="h-5 w-5 text-[#4D7CFF] transition-all duration-300 hover:text-[#6B8FFF]" />
              ) : user.role === "teacher" ? (
                <Users className="h-5 w-5 text-[#4D7CFF] transition-all duration-300 hover:text-[#6B8FFF]" />
              ) : (
                <School className="h-5 w-5 text-[#4D7CFF] transition-all duration-300 hover:text-[#6B8FFF]" />
              )}
            </div>
            <div className="slide-in">
              <div className='flex text-white text-lg font-semibold tracking-tight'>
                <p>{user.name}</p>
                {user.role == "student" &&
                  <>
                    <pre> | </pre>
                    <p>{user.className}</p>
                  </>
                }
              </div>
              <p className="text-white/70 text-xs font-medium">ID: {user.userId}</p>
            </div>
          </div>
          {user && user.role === 'organization' && (
            <div className="flex gap-x-2">
              <ShareButton title="Share for Students" forX="student" user={user} />
              <ShareButton title="Share for Teachers" forX="teacher" user={user} />
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar role={user?.role} />
      <div className="h-[calc(100vh-64px)] bg-[#0A0A0A] hexagon-bg p-3 overflow-auto">
        <div className="max-w-[80vw] mx-auto space-y-4">
          <UserInfo />
          {user && user.role === 'teacher' && (
            <div className="space-y-4">
              <WeekNavigator selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
              <div className="animate-on-mount">
                <ScheduleTeacherView
                  teacherId={user.userId}
                  teacherName={user.name}
                  orgId={user.orgId}
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
          {user && user.role === 'student' && (
            <div className="space-y-4">
              <div className="animate-on-mount">
                <ScheduleStudentView
                  orgId={user.orgId}
                  className={user.className}
                />
              </div>
            </div>
          )}
          {user && user.role === "organization" && (
            <div className="animate-on-mount">
              <OrganizationView
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                setIsModalOpen={setIsModalOpen}
                setSelectedTimetable={setSelectedTimetable}
                orgId={user.userId}
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;

