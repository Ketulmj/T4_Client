import React from 'react'
import logo from '../public/logo.png'

const Loader = () => {
    return (
        <div>
            <div className="flex-col gap-4 w-full h-[100vh] glass-effect flex items-center justify-center">
                <div
                    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#4D7CFF] rounded-full"
                >
                    <div
                        className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-white rounded-full"
                    >

                    </div>
                </div>
                <img src={logo} className="w-10 h-10 absolute bottom-5 left-1/2" />
            </div>
        </div>
    )
}

export default Loader