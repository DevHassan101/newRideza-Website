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
    driverProfile?: {
        id: string;
        city: string;
        status: string;
        profilePic?: string | null;
    } | null;
}

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
    PENDING: { bg: "bg-amber-50 border border-amber-200", text: "text-amber-600", label: "Pending Approval" },
    APPROVED: { bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-600", label: "Active & Approved" },
    REJECTED: { bg: "bg-red-50 border border-red-200", text: "text-red-500", label: "Application Rejected" },
    SUSPENDED: { bg: "bg-zinc-100 border border-zinc-200", text: "text-zinc-500", label: "Account Suspended" },
};

const recentRides = [
    { id: "#RD-1041", user: "Sara Khan", from: "Clifton", to: "Saddar", fare: "Rs. 180", status: "Completed", date: "Today, 8:14 AM" },
    { id: "#RD-1035", user: "Bilal Ahmed", from: "PECHS", to: "Korangi", fare: "Rs. 450", status: "Completed", date: "Yesterday, 5:30 PM" },
    { id: "#RD-1028", user: "Ali Hassan", from: "Gulshan", to: "DHA", fare: "Rs. 320", status: "Cancelled", date: "Dec 13, 2:00 PM" },
    { id: "#RD-1019", user: "Nida Farooq", from: "Johar", to: "North Nazimabad", fare: "Rs. 260", status: "Completed", date: "Dec 12, 9:45 AM" },
];

const statusStyle2: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    Cancelled: "bg-red-50 text-red-500 border border-red-200",
};

export default function DriverDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);
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

    const driverStatus = user?.driverProfile?.status ?? "PENDING";
    const statusInfo = statusStyle[driverStatus];
    const isApproved = driverStatus === "APPROVED";

    return (
        <div className="space-y-6">

            {/* Welcome + Status Banner */}
            <div className="bg-linear-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white -translate-x-1/3 translate-y-1/3" />
                </div>
                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-cyan-100 text-[13px] mb-1">Driver Dashboard</p>
                        <h2 className="text-[24px] font-bold">{user?.name ?? "Driver"} 🚗</h2>
                        <p className="text-cyan-100 text-[13px] mt-1">{user?.driverProfile?.city ?? "—"}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        {/* Logout button */}
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
                        {/* Online toggle — sirf approved driver ko milega */}
                        {isApproved && (
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => setIsOnline(!isOnline)}
                                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${isOnline ? "bg-emerald-400" : "bg-white/30"}`}
                                >
                                    <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all duration-300 ${isOnline ? "left-7" : "left-0.5"}`} />
                                </button>
                                <span className="text-[11px] text-cyan-100">{isOnline ? "Online" : "Offline"}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Notice — agar PENDING/REJECTED/SUSPENDED hai */}
            {!isApproved && (
                <div className={`${statusInfo.bg} rounded-2xl p-5 flex items-start gap-3`}>
                    <svg className={`w-5 h-5 ${statusInfo.text} shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className={`text-[14px] font-bold ${statusInfo.text}`}>{statusInfo.label}</p>
                        <p className="text-[12.5px] text-zinc-500 mt-0.5">
                            {driverStatus === "PENDING" && "Your account is under review. Admin will approve shortly."}
                            {driverStatus === "REJECTED" && "Your application was rejected. Please contact support for more info."}
                            {driverStatus === "SUSPENDED" && "Your account has been suspended. Please contact admin."}
                        </p>
                    </div>
                </div>
            )}

            {/* Stats — sirf approved ko */}
            {isApproved && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Total Rides", value: "86", icon: "🚗", color: "from-cyan-400 to-cyan-500", shadow: "shadow-cyan-100" },
                        { label: "Completed", value: "79", icon: "✅", color: "from-emerald-400 to-emerald-500", shadow: "shadow-emerald-100" },
                        { label: "Cancelled", value: "7", icon: "❌", color: "from-red-400 to-red-500", shadow: "shadow-red-100" },
                        { label: "Total Earned", value: "Rs. 28k", icon: "💰", color: "from-amber-400 to-amber-500", shadow: "shadow-amber-100" },
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
            )}

            {/* Earnings Summary — sirf approved */}
            {isApproved && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Today's Earnings", value: "Rs. 1,240", sub: "6 rides today" },
                        { label: "This Week", value: "Rs. 7,850", sub: "38 rides this week" },
                        { label: "This Month", value: "Rs. 28,400", sub: "86 rides this month" },
                    ].map((e) => (
                        <div key={e.label} className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
                            <p className="text-[12px] text-zinc-400 mb-1">{e.label}</p>
                            <p className="text-[22px] font-bold text-zinc-800">{e.value}</p>
                            <p className="text-[11.5px] text-zinc-400 mt-0.5">{e.sub}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Recent Rides — sirf approved */}
            {isApproved && (
                <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                        <div>
                            <h3 className="text-[15px] font-bold text-zinc-800">Recent Rides</h3>
                            <p className="text-[12px] text-zinc-400 mt-0.5">Your latest completed trips</p>
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
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-zinc-700">
                                            {ride.from} <span className="text-cyan-400 font-bold mx-1">→</span> {ride.to}
                                        </p>
                                        <p className="text-[11.5px] text-zinc-400 mt-0.5">{ride.user} · {ride.date}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    <span className="text-[13px] font-bold text-zinc-700">{ride.fare}</span>
                                    <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-lg ${statusStyle2[ride.status]}`}>
                                        {ride.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Profile Info */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[15px] font-bold text-zinc-800 mb-4">Profile Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Full Name", value: user?.name ?? "—" },
                        { label: "Email", value: user?.email ?? "—" },
                        { label: "Phone", value: user?.phone ?? "—" },
                        { label: "City", value: user?.driverProfile?.city ?? "—" },
                        { label: "Account Status", value: statusInfo.label },
                        { label: "Member Since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" }) : "—" },
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