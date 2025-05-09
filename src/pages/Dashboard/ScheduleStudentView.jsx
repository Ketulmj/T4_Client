import { useState } from 'react';
import { useEffect } from 'react';
import TimetableDialog from '../TimeTable/components/TimetableDialog'

const ScheduleStudentView = ({ orgId, className }) => {
  const [timeTable, setTimeTable] = useState()
  useEffect(() => {
    fetch(`http://localhost:3000/api/get/timetable?class=${className}&orgId=${orgId}`)
      .then(res => res.json())
      .then(({ timetable }) => { setTimeTable(timetable) })
  }, [])

  return <>
    {
      timeTable ?
        <TimetableDialog
          isOpen={true}
          timetableData={timeTable}
          footer={false}
          cross={false}
        />
        :
        <div className='flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm w-full glass-effect text-white text-lg font-semibold tracking-tight'>
          There is no timetable for your class yet
        </div>
    }
  </>
}

export default ScheduleStudentView;