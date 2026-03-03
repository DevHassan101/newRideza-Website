"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

const recentRides = [
    { id: "#RD-1042", driver: "Tariq Mehmood", from: "Gulshan", to: "DHA", fare: "Rs. 320", status: "Completed", date: "Today, 10:22 AM", rating: 5 },
    { id: "#RD-1038", driver: "Asif Iqbal", from: "Saddar", to: "Clifton", fare: "Rs. 180", status: "Completed", date: "Yesterday, 6:14 PM", rating: 4 },
    { id: "#RD-1031", driver: "Hassan Raza", from: "PECHS", to: "Nazimabad", fare: "Rs. 450", status: "Cancelled", date: "Dec 14, 3:00 PM", rating: null },
    { id: "#RD-1020", driver: "Usman Ali", from: "Johar", to: "Gulberg", fare: "Rs. 220", status: "Completed", date: "Dec 12, 11:45 AM", rating: 5 },
];

const statusStyle: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    Cancelled: "bg-red-50 text-red-500 border border-red-200",
    Ongoing: "bg-cyan-50 text-cyan-600 border border-cyan-200",
};

export default function UserDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                setUser(data.user);
            } catch {
                console.error("Failed to fetch user");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Welcome Banner */}
            <div className="bg-linear-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white -translate-x-1/3 translate-y-1/3" />
                </div>
                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-cyan-100 text-[13px] mb-1">Welcome back,</p>
                        <h2 className="text-[24px] font-bold">{user?.name ?? "User"} 👋</h2>
                        <p className="text-cyan-100 text-[13px] mt-1">{user?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white text-[12.5px] font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 disabled:opacity-60"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {loggingOut ? "..." : "Logout"}
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Rides", value: "24", icon: "🚗", color: "from-cyan-400 to-cyan-500", shadow: "shadow-cyan-100" },
                    { label: "Completed", value: "21", icon: "✅", color: "from-emerald-400 to-emerald-500", shadow: "shadow-emerald-100" },
                    { label: "Cancelled", value: "3", icon: "❌", color: "from-red-400 to-red-500", shadow: "shadow-red-100" },
                    { label: "Total Spent", value: "Rs. 4.2k", icon: "💳", color: "from-sky-400 to-sky-500", shadow: "shadow-sky-100" },
                ].map((s) => (
                    <div key={s.label} className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center shadow-md ${s.shadow} mb-3 text-lg`}>
                            {s.icon}
                        </div>
                        <p className="text-[22px] font-bold text-zinc-800">{s.value}</p>
                        <p className="text-[12px] text-zinc-400 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Book a Ride CTA */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[15px] font-bold text-zinc-800 mb-4">Book a Ride</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Pickup location" className="w-full border-2 border-zinc-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 rounded-xl pl-10 pr-4 py-3 text-[13.5px] text-zinc-700 placeholder-zinc-400 focus:outline-none bg-zinc-50 transition-all" />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Drop location" className="w-full border-2 border-zinc-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 rounded-xl pl-10 pr-4 py-3 text-[13.5px] text-zinc-700 placeholder-zinc-400 focus:outline-none bg-zinc-50 transition-all" />
                    </div>
                </div>
                <button className="mt-3 w-full sm:w-auto bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold px-8 py-3 rounded-xl text-[14px] transition-all duration-300 hover:shadow-lg hover:shadow-cyan-200">
                    Find a Driver →
                </button>
            </div>

            {/* Ride History */}
            <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <div>
                        <h3 className="text-[15px] font-bold text-zinc-800">Ride History</h3>
                        <p className="text-[12px] text-zinc-400 mt-0.5">Your recent trips</p>
                    </div>
                    <button className="text-[13px] font-semibold text-cyan-500 hover:text-cyan-600 transition-colors">
                        View All →
                    </button>
                </div>
                <div className="divide-y divide-zinc-50">
                    {recentRides.map((ride) => (
                        <div key={ride.id} className="px-6 py-4 hover:bg-cyan-50/30 transition-colors flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-500 shrink-0">
                                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold text-zinc-700">
                                        {ride.from} <span className="text-cyan-400 font-bold mx-1">→</span> {ride.to}
                                    </p>
                                    <p className="text-[11.5px] text-zinc-400 mt-0.5">{ride.driver} · {ride.date}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span className="text-[13px] font-bold text-zinc-700">{ride.fare}</span>
                                <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-lg ${statusStyle[ride.status]}`}>
                                    {ride.status}
                                </span>
                                {ride.rating && (
                                    <span className="text-[11px] text-amber-500">{"★".repeat(ride.rating)}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Account Info */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[15px] font-bold text-zinc-800 mb-4">Account Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Full Name", value: user?.name ?? "—" },
                        { label: "Email", value: user?.email ?? "—" },
                        { label: "Phone", value: user?.phone ?? "—" },
                    ].map((f) => (
                        <div key={f.label} className="bg-zinc-50 rounded-xl px-4 py-3">
                            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">{f.label}</p>
                            <p className="text-[13.5px] font-semibold text-zinc-700 truncate">{f.value}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}