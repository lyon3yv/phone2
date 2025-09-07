import { useState, useEffect } from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="phone-container w-[375px] h-[812px] bg-black rounded-[40px] p-2 shadow-2xl">
      <div className="phone-screen w-full h-full bg-black rounded-[32px] overflow-hidden relative">
        {/* Status Bar */}
        <div className="status-bar h-11 bg-black flex justify-between items-center px-5 text-white text-sm font-semibold">
          <div>
            {currentTime.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="flex gap-1">
            <i className="fas fa-signal text-xs"></i>
            <i className="fas fa-wifi text-xs"></i>
            <i className="fas fa-battery-three-quarters text-xs"></i>
          </div>
        </div>

        {/* App Content */}
        <div className="app-content h-[calc(100%-44px)] bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
