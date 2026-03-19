"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDriver }    from "../lib/DriverContext";
import BottomNav        from "../_components/mobile/BottomNav";
import MapPage          from "../_components/shared/MapPage";
import MobileSidebar    from "../_components/mobile/MobileSidebar";
import LiveMapPanel     from "../_components/desktop/panels/LiveMapPanel";

const MOBILE_ROUTES: Record<string, string> = {
  home:          "/driver/live-rides",
  "my-bookings": "/driver/my-bookings",
  profile:       "/driver/profile",
};

export default function LiveRidesPage() {
  const { driver }                    = useDriver();
  const router                        = useRouter();
  const [isOnline,    setIsOnline]    = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const goTo = (s: string) => router.push(MOBILE_ROUTES[s] ?? "/driver/live-rides");

  return (
    <div className="flex flex-col h-full bg-white">

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isOnline={isOnline}
        onToggleOnline={() => setIsOnline(v => !v)}
        onNav={goTo}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-200 shadow-sm shrink-0">
          {driver?.driverProfile?.profilePic
            ? <img src={driver.driverProfile.profilePic} alt="" className="w-full h-full object-cover"/>
            : <div className="w-full h-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-black text-lg text-white">
                {driver?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
          }
        </button>

        <button onClick={() => setIsOnline(v => !v)}
          className={"flex items-center gap-2.5 rounded-full px-4 py-2 border transition-all shadow-sm " +
            (isOnline ? "bg-cyan-500 border-cyan-400 shadow-cyan-200" : "bg-white border-gray-200")}>
          <div className={"w-9 h-5 rounded-full relative transition-colors duration-300 " + (isOnline ? "bg-white/30" : "bg-gray-200")}>
            <div className={"absolute top-0.5 w-4 h-4 rounded-full shadow transition-all duration-300 " +
              (isOnline ? "bg-white left-4" : "bg-white left-0.5")}/>
          </div>
          <span className={"text-sm font-bold " + (isOnline ? "text-white" : "text-gray-600")}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </button>

        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth={2}/>
            <path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
      </div>

      {/* Map — flex-1 takes remaining space */}
      <div className="relative flex-1 overflow-hidden">
        <MapPage/>

        {/* LiveMapPanel — bottom sheet overlay on map */}
        <div className="absolute bottom-0 left-0 right-0">
          <LiveMapPanel isOnline={isOnline}/>
        </div>
      </div>

      <BottomNav active="home" onNav={goTo}/>
    </div>
  );
}