import { useEffect, useState } from 'react'
import MobileWarning from '../components/MobileWarning'

const Mobile = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile ? <MobileWarning /> : children
}

export default Mobile