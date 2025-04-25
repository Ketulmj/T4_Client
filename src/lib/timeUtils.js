/**
 * Utility functions for time-related operations in the timetable
 */

/**
 * Converts minutes since midnight to formatted time string
 * @param {number} minutes - Minutes since midnight (e.g., 500 = 8:20 AM)
 * @returns {string} Formatted time string (e.g., "8:20 AM")
 */
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
  
  /**
   * Calculates the end time given a start time and duration
   * @param {number} startMinutes - Start time in minutes
   * @param {number} durationMinutes - Duration in minutes
   * @returns {string} Formatted end time
   */
  export const calculateEndTime = (startMinutes, durationMinutes = 45) => {
    return minutesToTimeString(startMinutes + durationMinutes);
  };
  
  /**
   * Creates a formatted time slot string (e.g., "8:20 AM - 9:05 AM")
   * @param {number} startMinutes - Start time in minutes
   * @param {number} durationMinutes - Duration in minutes
   * @returns {string} Formatted time slot
   */
  export const formatTimeSlot = (startMinutes, durationMinutes = 45) => {
    const startTime = minutesToTimeString(startMinutes);
    const endTime = calculateEndTime(startMinutes, durationMinutes);
    return `${startTime} - ${endTime}`;
  };
  
  /**
   * Maps day indices from array to day names
   * @param {number} index - Day index (0-6)
   * @returns {string} Day name
   */
  export const getDayName = (index) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[index] || "Unknown";
  };