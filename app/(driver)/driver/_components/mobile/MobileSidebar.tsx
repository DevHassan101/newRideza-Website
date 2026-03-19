"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDriver } from "../../lib/DriverContext";

export default function MobileSidebar({ isOpen, onClose, isOnline, onToggleOnline, onNav }: {
    isOpen: boolean;
    onClose: () => void;
    isOnline: boolean;
    onToggleOnline: () => void;
    onNav: (s: string) => void;
}) {
    const { driver } = useDriver();
    const router = useRouter();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // ✅ Correct field references
    const name       = driver?.name                      ?? "";
    const city       = driver?.driverProfile?.city       ?? "";
    const profilePic = driver?.driverProfile?.profilePic ?? "";

    // ✅ Mobile routes — same as live-rides page
    const NAV = [
        {
            id: "home", label: "Rides",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M10.995 4.68v3.88A2.44 2.44 0 0 1 8.545 11h-3.86a2.38 2.38 0 0 1-1.72-.72a2.4 2.4 0 0 1-.71-1.72V4.69a2.44 2.44 0 0 1 2.43-2.44h3.87a2.42 2.42 0 0 1 1.72.72a2.4 2.4 0 0 1 .72 1.71m10.75.01v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.73-.71a2.44 2.44 0 0 1-.71-1.73V4.69a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44m0 10.75v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.75-.69a2.42 2.42 0 0 1-.71-1.73v-3.87a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44zm-10.75.01v3.87a2.46 2.46 0 0 1-2.45 2.43h-3.86a2.42 2.42 0 0 1-2.43-2.43v-3.87A2.46 2.46 0 0 1 4.685 13h3.87a2.5 2.5 0 0 1 1.73.72a2.45 2.45 0 0 1 .71 1.73" strokeWidth="0.1" stroke="currentColor" /></svg>,
        },
        {
            id: "my-bookings", label: "My Bookings",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2m0 15l-5-2.18L7 18V5h10z"/></svg>,
        },
        {
            id: "profile", label: "Profile",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5m-4 9.5A3.75 3.75 0 0 0 4.25 17v1.188c0 .754.546 1.396 1.29 1.517c4.278.699 8.642.699 12.92 0a1.54 1.54 0 0 0 1.29-1.517V17A3.75 3.75 0 0 0 16 13.25h-.34q-.28.001-.544.086l-.866.283a7.25 7.25 0 0 1-4.5 0l-.866-.283a1.8 1.8 0 0 0-.543-.086z" /></svg>,
        },
    ];

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Logo */}
                <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-linear-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 32 32"><path fill="currentColor" fillRule="evenodd" d="M23.015 4.134a2.9 2.9 0 0 0-1.184-.118a2.97 2.97 0 0 0-1.898.974h-2.786c-5.469 0-9.902 4.48-9.902 10.005v.84L1.347 19.24c-1.175.63-1.415 1.834-1.333 2.64c.078.768.425 1.459.801 1.981C1.56 24.896 2.961 26 4.77 26c1.918 0 3.392-1.001 4.3-1.618l.112-.075q.26-.176.464-.31q.255.167.552.366l.114.076C11.84 25.46 14.143 27 17.147 27c3.528 0 5.943-2.189 7.751-4.002h4.131c1.641 0 2.971-1.344 2.971-3.001v-3.002c0-4.487-2.437-8.396-6.04-10.456a2.99 2.99 0 0 0-1.999-2.11zM9.689 21.708c-2.42-1.209-5.551-1.176-7.395-.71l6.918-3.995c1.508.026 3.006.117 4.496.333c3.355.486 6.673 1.607 9.992 4.043c-1.858 1.866-3.771 3.62-6.553 3.62c-2.403 0-4.276-1.25-5.857-2.305a59 59 0 0 0-.605-.4q-.24-.156-.47-.296a7 7 0 0 0-.526-.29m-.464-6.706c1.857.031 3.728.158 5.609.489c3.84.676 7.72 2.204 11.59 5.506h2.605c.547 0 .99-.448.99-1v-3.002a10.01 10.01 0 0 0-6.045-9.217a9.8 9.8 0 0 0-3.856-.787h-2.971c-4.375 0-7.922 3.583-7.922 8.004z" clipRule="evenodd" /></svg>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-zinc-800 leading-none">Rideza</h2>
                            <p className="text-[10px] text-zinc-400 tracking-widest uppercase mt-0.5">Driver Captain</p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Driver card */}
                <div className="mx-4 mt-4 p-3.5 rounded-2xl bg-gray-50 border border-cyan-500/30">
                    <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-500/40">
                                {profilePic
                                    ? <img src={profilePic} alt="" className="w-full h-full object-cover"/>
                                    : <div className="w-full h-full bg-cyan-500 flex items-center justify-center font-black text-lg text-white">
                                        {name?.charAt(0)?.toUpperCase() || "A"}
                                      </div>
                                }
                            </div>
                            <span className={`absolute bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${isOnline ? "bg-green-400" : "bg-gray-400"}`}/>
                        </div>
                        <div className="min-w-0">
                            <p className="text-black font-semibold text-sm truncate">{name || "Driver"}</p>
                            <p className="text-gray-500 text-xs truncate">{city || "—"}</p>
                        </div>
                    </div>

                    <button onClick={onToggleOnline}
                        className={`mt-3 w-full flex items-center justify-between px-3 py-2.5 rounded-[10px] border transition-all duration-300 ${isOnline ? "bg-cyan-500/10 border-cyan-500/30" : "bg-white border-zinc-200"}`}>
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full transition-colors ${isOnline ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]" : "bg-gray-400"}`}/>
                            <span className={`text-xs font-semibold ${isOnline ? "text-cyan-500" : "text-gray-500"}`}>
                                {isOnline ? "You're Online" : "You're Offline"}
                            </span>
                        </div>
                        <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${isOnline ? "bg-cyan-500" : "bg-gray-300"}`}>
                            <div className={`absolute top-[2.25px] w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isOnline ? "left-4.5" : "left-0.5"}`}/>
                        </div>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-5 px-4 flex-1">
                    {NAV.map((item) => (
                        <button key={item.id}
                            onClick={() => { onNav(item.id); onClose(); }}
                            className="w-full flex items-center gap-3.5 px-2.5 py-2.5 rounded-xl mb-2 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 transition-all duration-200 text-left">
                            <div className="w-9 h-9 rounded-[10px] bg-linear-to-r from-cyan-500 to-cyan-400 text-white flex items-center justify-center shrink-0">
                                {item.icon}
                            </div>
                            <span className="text-[15px] font-semibold">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-4 py-4 border-t border-zinc-100">
                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200">
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                        </div>
                        <span className="text-[14px] font-semibold">Logout</span>
                    </button>
                </div>

            </aside>
        </>
    );
}