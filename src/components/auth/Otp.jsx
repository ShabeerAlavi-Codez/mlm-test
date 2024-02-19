//import React from 'react'

function Otp() {
  return (
    <div>
    <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
        <div className="grid grid-cols-6 gap-2">
        <input type="text" className="w-10 h-10 text-lg border border-gray-300 rounded-md text-center outline-none" maxLength="1" pattern="[0-9]" inputMode="numeric"/>
        <input type="text" className="w-10 h-10 text-lg border border-gray-300 rounded-md text-center outline-none" maxLength="1" pattern="[0-9]" inputMode="numeric"/>
        <input type="text" className="w-10 h-10 text-lg border border-gray-300 rounded-md text-center outline-none" maxLength="1" pattern="[0-9]" inputMode="numeric"/>
        <input type="text" className="w-10 h-10 text-lg border border-gray-300 rounded-md text-center outline-none" maxLength="1" pattern="[0-9]" inputMode="numeric"/>
        <input type="text" className="w-10 h-10 text-lg border border-gray-300 rounded-md text-center outline-none" maxLength="1" pattern="[0-9]" inputMode="numeric"/>
        <input type="text" className="w-10 h-10 text-lg border border-gray-300 rounded-md text-center outline-none" maxLength="1" pattern="[0-9]" inputMode="numeric"/>
    </div>
    <p className="text-sm text-gray-500 mt-2">Enter the 6-digit code sent to your phone.</p>
  </form>
    </div>
  )
}

export default Otp