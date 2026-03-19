"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const NAV = [
  {
    id: "home", label: "Dashboard", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M10.995 4.68v3.88A2.44 2.44 0 0 1 8.545 11h-3.86a2.38 2.38 0 0 1-1.72-.72a2.4 2.4 0 0 1-.71-1.72V4.69a2.44 2.44 0 0 1 2.43-2.44h3.87a2.42 2.42 0 0 1 1.72.72a2.4 2.4 0 0 1 .72 1.71m10.75.01v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.73-.71a2.44 2.44 0 0 1-.71-1.73V4.69a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44m0 10.75v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.75-.69a2.42 2.42 0 0 1-.71-1.73v-3.87a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44zm-10.75.01v3.87a2.46 2.46 0 0 1-2.45 2.43h-3.86a2.42 2.42 0 0 1-2.43-2.43v-3.87A2.46 2.46 0 0 1 4.685 13h3.87a2.5 2.5 0 0 1 1.73.72a2.45 2.45 0 0 1 .71 1.73" strokeWidth="0.1" stroke="currentColor" /></svg>
    )
  },
  {
    id: "live-map", label: "Live Rides", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.218 4.092C4 4.52 4 5.08 4 6.2v.614l17.99-1.636c-.019-.488-.07-.814-.208-1.086a2 2 0 0 0-.874-.874C20.48 3 19.92 3 18.8 3H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874M22 7.186l-4.865.442l2.506 13.367c.592-.013.963-.058 1.267-.213a2 2 0 0 0 .874-.874C22 19.48 22 18.92 22 17.8zM17.608 21L15.134 7.81L4 8.822V17.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C5.52 21 6.08 21 7.2 21zM13.5 15.03c0 2.158-2.14 3.674-3.073 4.233a.83.83 0 0 1-.854 0C8.64 18.704 6.5 17.188 6.5 15.029c0-2.117 1.696-3.529 3.5-3.529c1.867 0 3.5 1.412 3.5 3.53" clipRule="evenodd" /><circle cx="10" cy="15" r="1" fill="currentColor" /></svg>
    )
  },
  {
    id: "my-bookings", label: "My Bookings", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 512 512"><path fill="currentColor" d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4ZM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3Zm344-208a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24" /></svg>
    )
  },
  {
    id: "profile", label: "Profile", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5m-4 9.5A3.75 3.75 0 0 0 4.25 17v1.188c0 .754.546 1.396 1.29 1.517c4.278.699 8.642.699 12.92 0a1.54 1.54 0 0 0 1.29-1.517V17A3.75 3.75 0 0 0 16 13.25h-.34q-.28.001-.544.086l-.866.283a7.25 7.25 0 0 1-4.5 0l-.866-.283a1.8 1.8 0 0 0-.543-.086z" /></svg>
    )
  },
];

export default function LeftPanel({ isOnline, onToggleOnline, activeNav, onNav }: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(data => { setUser(data.user); setLoading(false); })  // ← setLoading
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const name = user?.name ?? "";
  const city = user?.driverProfile?.city ?? "";
  const profilePic = user?.driverProfile?.profilePic ?? "";

  return (
    <aside className="w-75! bg-white flex flex-col h-full shrink-0 border-r border-zinc-200">

      {/* Logo */}
      <div className="px-6 py-[16.25px] border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-linear-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 32 32"><path fill="currentColor" fillRule="evenodd" d="M23.015 4.134a2.9 2.9 0 0 0-1.184-.118a2.97 2.97 0 0 0-1.898.974h-2.786c-5.469 0-9.902 4.48-9.902 10.005v.84L1.347 19.24c-1.175.63-1.415 1.834-1.333 2.64c.078.768.425 1.459.801 1.981C1.56 24.896 2.961 26 4.77 26c1.918 0 3.392-1.001 4.3-1.618l.112-.075q.26-.176.464-.31q.255.167.552.366l.114.076C11.84 25.46 14.143 27 17.147 27c3.528 0 5.943-2.189 7.751-4.002h4.131c1.641 0 2.971-1.344 2.971-3.001v-3.002c0-4.487-2.437-8.396-6.04-10.456a2.99 2.99 0 0 0-1.999-2.11zM9.689 21.708c-2.42-1.209-5.551-1.176-7.395-.71l6.918-3.995c1.508.026 3.006.117 4.496.333c3.355.486 6.673 1.607 9.992 4.043c-1.858 1.866-3.771 3.62-6.553 3.62c-2.403 0-4.276-1.25-5.857-2.305a59 59 0 0 0-.605-.4q-.24-.156-.47-.296a7 7 0 0 0-.526-.29m-.464-6.706c1.857.031 3.728.158 5.609.489c3.84.676 7.72 2.204 11.59 5.506h2.605c.547 0 .99-.448.99-1v-3.002a10.01 10.01 0 0 0-6.045-9.217a9.8 9.8 0 0 0-3.856-.787h-2.971c-4.375 0-7.922 3.583-7.922 8.004z" clipRule="evenodd" /></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-800 leading-none tracking-tight">Rideza</h2>
            <p className="text-xs text-zinc-400 tracking-widest uppercase mt-0.5 font-medium">Driver (Rideza-Captian)</p>
          </div>
        </div>
      </div>

      {/* Driver card */}
      <div className="mx-4 mt-4 p-3.5 rounded-2xl bg-gray-50/90 border border-cyan-500/50">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">

            {/* ── Avatar / Skeleton ── */}
            {loading ? (
              <div className="w-11 h-11 rounded-full bg-zinc-200 animate-pulse" />
            ) : (
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-500/40">
                {profilePic
                  ? <img src={profilePic} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-cyan-500 flex items-center justify-center font-black text-lg text-white">
                    {name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                }
              </div>
            )}

            {/* Online dot — sirf loaded hone pe dikhao */}
            {!loading && (
              <span className={`absolute bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${isOnline ? "bg-green-400" : "bg-gray-400"
                }`} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            {/* ── Name Skeleton ── */}
            {loading ? (
              <div className="h-4 w-28 rounded-md bg-zinc-200 animate-pulse mb-1.5" />
            ) : (
              <p className="text-black font-semibold text-sm truncate">{name}</p>
            )}

            {/* ── City Skeleton ── */}
            {loading ? (
              <div className="h-3 w-16 rounded-md bg-zinc-200 animate-pulse" />
            ) : (
              <p className="text-gray-500 text-xs truncate">{city}</p>
            )}
          </div>
        </div>

        {/* Online toggle — loading mein bhi dikhta rahe, bas disabled */}
        <button
          onClick={onToggleOnline}
          disabled={loading}
          className={`mt-3 w-full flex items-center justify-between px-3 py-2.5 rounded-[10px] border transition-all duration-300 ${loading
            ? "bg-white/40 border-zinc-200 opacity-60"
            : isOnline
              ? "bg-cyan-500/10 border-cyan-500/30"
              : "bg-white/40 border-zinc-200"
            }`}
        >
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="h-3 w-24 rounded-md bg-zinc-200 animate-pulse" />
            ) : (
              <>
                <span className={`w-2 h-2 rounded-full transition-colors ${isOnline ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]" : "bg-gray-400"
                  }`} />
                <span className={`text-xs font-semibold ${isOnline ? "text-cyan-500" : "text-gray-500"}`}>
                  {isOnline ? "You're Online" : "You're Offline"}
                </span>
              </>
            )}
          </div>
          <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${loading ? "bg-gray-200" : isOnline ? "bg-cyan-500" : "bg-gray-300"
            }`}>
            <div className={`absolute top-[2.25px] w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isOnline && !loading ? "left-4.5" : "left-0.5"
              }`} />
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-5 flex-1">
        {NAV.map((item) => (
          <button key={item.id} onClick={() => onNav(item.id)}
            className={`w-full cursor-pointer flex items-center gap-3.5 px-2.5 py-2.5 rounded-xl mb-3 transition-all duration-200 text-left relative ${activeNav === item.id
              ? "bg-linear-to-r bg-cyan-500 to-cyan-400 text-white shadow-md shadow-cyan-200"
              : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
              }`}>
            {activeNav === item.id && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/40 rounded-l-full" />
            )}
            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-200 ${activeNav === item.id ? "bg-white/20 text-white" : "bg-linear-to-r from-cyan-500 to-cyan-400 text-white"
              }`}>
              {item.icon}
            </div>
            <span className="text-[15px] font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Notifications */}
      {/* <div className="px-5 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2 px-3 py-3.5 rounded-xl bg-linear-to-br from-cyan-400 to-cyan-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M14.235 19c.865 0 1.322 1.024.745 1.668A4 4 0 0 1 12 22a4 4 0 0 1-2.98-1.332c-.552-.616-.158-1.579.634-1.661l.11-.006zM12 2c1.358 0 2.506.903 2.875 2.141l.046.171l.008.043a8.01 8.01 0 0 1 4.024 6.069l.028.287L19 11v2.931l.021.136a3 3 0 0 0 1.143 1.847l.167.117l.162.099c.86.487.56 1.766-.377 1.864L20 18H4c-1.028 0-1.387-1.364-.493-1.87a3 3 0 0 0 1.472-2.063L5 13.924l.001-2.97A8 8 0 0 1 8.822 4.5l.248-.146l.01-.043a3 3 0 0 1 2.562-2.29l.182-.017z"/></svg>
          <span className="text-white text-sm font-medium">Notifications</span>
          <span className="ml-auto bg-cyan-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </div>
      </div> */}

      {/* Logout */}
      <div className="px-5 py-4">
        <button onClick={handleLogout} disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer border border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200 disabled:opacity-50">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="text-[14px] font-semibold">{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>

    </aside>
  );
}
