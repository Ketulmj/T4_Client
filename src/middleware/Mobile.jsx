import { useEffect, useState } from 'react'
import MobileWarning from '../components/MobileWarning'

const Mobile = ({ children }) => {
  const [isMobile, SetIsMobile] = useState()
  useEffect(() => {
    window.addEventListener('resize', () => { SetIsMobile(window.innerWidth <= 768) })
    return () => { window.removeEventListener('resize'); }
  }, [])

  return isMobile ? <MobileWarning /> : children
}

export default Mobile

