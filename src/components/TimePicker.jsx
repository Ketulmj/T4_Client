import { useState } from 'react';
import { Clock } from 'lucide-react';
// import { cn } from '@/lib/utils';

const TimePicker = ({ value, onChange, className }) => {
  // Parse initial value or set defaults
  const parseTime = () => {
    if (!value) return { hours: '08', minutes: '00', period: 'AM' };
    const [time, period] = value.split(' ');
    const [hours, minutes] = time.split(':');
    return { hours, minutes, period };
  };

  const [hours, setHours] = useState(parseTime().hours);
  const [minutes, setMinutes] = useState(parseTime().minutes);
  const [period, setPeriod] = useState(parseTime().period);

  const handleHoursScroll = (e) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1; // Scroll up increases, scroll down decreases
    const newHours = ((parseInt(hours) + direction - 1 + 12) % 12 + 1).toString().padStart(2, '0');
    setHours(newHours);
    updateTime(newHours, minutes);
  };

  const handleMinutesScroll = (e) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 15 : -15;
    let newMinutes = (parseInt(minutes) + direction + 60) % 60;
    if (newMinutes < 0) newMinutes += 60;
    const formattedMinutes = newMinutes.toString().padStart(2, '0');
    setMinutes(formattedMinutes);
    updateTime(hours, formattedMinutes);
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  const updateTime = (h, m, p = period) => {
    onChange(`${h}:${m} ${p}`);
  };

  return (
    <div className={`"flex items-center gap-3 w-full", ${className}`}>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-white/70" />
        
        <div className="flex items-center gap-1">
          <div 
            onWheel={handleHoursScroll}
            className="w-12 text-center py-1 rounded-lg bg-white/5 border border-white/10 cursor-ns-resize"
          >
            {hours}
          </div>

          <span className="text-white/70 text-xl">:</span>

          <div 
            onWheel={handleMinutesScroll}
            className="w-12 text-center py-1 rounded-lg bg-white/5 border border-white/10 cursor-ns-resize"
          >
            {minutes}
          </div>

          <button 
            onClick={togglePeriod}
            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            {period}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
