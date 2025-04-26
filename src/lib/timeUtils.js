export const minutesToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    // Format with 12-hour clock and AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    
    // Ensure minutes are padded with leading zero if needed
    const displayMinutes = mins.toString().padStart(2, '0');
    
    return `${displayHours}:${displayMinutes} ${period}`;
  };
  
  export const calculateEndTime = (startMinutes, durationMinutes) => {
    return startMinutes + durationMinutes;
  };
  
  export const formatTimeSlot = (startMinutes, durationMinutes) => {
    const startTime = minutesToTimeString(startMinutes);
    const endTime = calculateEndTime(startMinutes, durationMinutes);
    return `${startTime} - ${endTime}`;
  };
  

  export const getDayName = (index) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[index] || "Unknown";
  };

  export function formatTimeRange(startTime, endTime) {
    return `${minutesToTimeString(startTime)} - ${minutesToTimeString(endTime)}`;
  }