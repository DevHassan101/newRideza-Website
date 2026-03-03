"use client";

import { useState, useEffect } from "react";
import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ============ TYPES ============
type DriverStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

interface Driver {
    id: string;
    city: string;
    status: DriverStatus;
    reviewNote?: string | null;
    createdAt: string;
    user: { id: string; name: string; email: string; phone: string; isActive: boolean };
}

// ============ STATIC DATA (charts mock — replace with real API later) ============
const revenueData = [
    { day: "Mon", revenue: 12400, rides: 84 },
    { day: "Tue", revenue: 18200, rides: 121 },
    { day: "Wed", revenue: 15800, rides: 98 },
    { day: "Thu", revenue: 22100, rides: 143 },
    { day: "Fri", revenue: 28900, rides: 187 },
    { day: "Sat", revenue: 31200, rides: 203 },
    { day: "Sun", revenue: 19800, rides: 132 },
];

const hourlyRides = [
    { hour: "6am", rides: 12 }, { hour: "8am", rides: 45 },
    { hour: "10am", rides: 28 }, { hour: "12pm", rides: 52 },
    { hour: "2pm", rides: 35 }, { hour: "4pm", rides: 48 },
    { hour: "6pm", rides: 71 }, { hour: "8pm", rides: 63 }, { hour: "10pm", rides: 29 },
];

// ============ STYLES ============
const statusStyle: Record<DriverStatus, string> = {
    PENDING: "bg-amber-50 text-amber-600 border border-amber-200",
    APPROVED: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    REJECTED: "bg-red-50 text-red-500 border border-red-200",
    SUSPENDED: "bg-zinc-100 text-zinc-500 border border-zinc-200",
};

const statusOptions: { value: DriverStatus; label: string }[] = [
    { value: "APPROVED", label: "Approve" },
    { value: "REJECTED", label: "Reject" },
    { value: "SUSPENDED", label: "Suspend" },
    { value: "PENDING", label: "Set Pending" },
];

const colorMap: Record<string, { text: string; light: string }> = {
    cyan: { text: "text-cyan-500", light: "bg-cyan-50" },
    emerald: { text: "text-emerald-500", light: "bg-emerald-50" },
    violet: { text: "text-violet-500", light: "bg-violet-50" },
    amber: { text: "text-amber-500", light: "bg-amber-50" },
    rose: { text: "text-rose-500", light: "bg-rose-50" },
};

// ============ TOOLTIP ============
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
        return (
            <div className="bg-white border border-zinc-100 rounded-xl px-3 py-2 shadow-lg text-[12px]">
                <p className="font-semibold text-zinc-700 mb-1">{label}</p>
                {payload.map((p: any, i: number) => (
                    <p key={i} style={{ color: p.color }} className="font-medium">
                        {p.name === "revenue" ? `Rs ${p.value.toLocaleString()}` : `${p.value} rides`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// ============ MAIN PAGE ============
export default function AdminDashboardPage() {
    const [revenueView, setRevenueView] = useState<"revenue" | "rides">("revenue");

    // Driver states
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [summary, setSummary] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, suspended: 0 });
    const [loading, setLoading] = useState(true);        // sirf pehli baar — stat cards ke liye
    const [tableLoading, setTableLoading] = useState(true); // sirf table ke liye
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [modal, setModal] = useState<{ open: boolean; driver: Driver | null }>({ open: false, driver: null });
    const [newStatus, setNewStatus] = useState<DriverStatus>("APPROVED");
    const [reviewNote, setReviewNote] = useState("");
    const [driverSearch, setDriverSearch] = useState("");
    const [deleteDriverModal, setDeleteDriverModal] = useState<{ open: boolean; driver: Driver | null }>({ open: false, driver: null });
    const [deleteDriverLoading, setDeleteDriverLoading] = useState(false);

    // State mein add karo (top mein):
    const [currentPage, setCurrentPage] = useState(1);
    const driversPerPage = 3;

    // Filter change hone par page reset:
    useEffect(() => {
        fetchDrivers(filterStatus || undefined);
        setCurrentPage(1); // ← add karo
    }, [filterStatus]);

    // Table ke upar paginated data:
    const filteredDrivers = drivers.filter((d) => {
        if (!driverSearch.trim()) return true;
        const q = driverSearch.toLowerCase();
        return (
            d.user.name.toLowerCase().includes(q) ||
            d.user.email.toLowerCase().includes(q) ||
            d.city.toLowerCase().includes(q)
        );
    });

    const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
    const paginatedDrivers = filteredDrivers.slice(
        (currentPage - 1) * driversPerPage,
        currentPage * driversPerPage
    );

    const fetchDrivers = async (status?: string, showFullLoader = false) => {
        if (showFullLoader) setLoading(true);
        setTableLoading(true);  // ← sirf table spinner
        try {
            const url = status ? `/api/admin/drivers?status=${status}` : "/api/admin/drivers";
            const res = await fetch(url);
            const data = await res.json();
            setDrivers(data.drivers || []);
            setSummary({
                total: 0, pending: 0, approved: 0, rejected: 0, suspended: 0,
                ...(data.summary || {}),
            });
        } catch {
            console.error("Failed to fetch drivers");
        } finally {
            setLoading(false);
            setTableLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers(filterStatus || undefined, true); // ← true pass karo
        setCurrentPage(1);
    }, [filterStatus]);

    const openModal = (driver: Driver) => {
        setModal({ open: true, driver });
        setNewStatus(driver.status);
        setReviewNote(driver.reviewNote || "");
        setTimeout(() => setModalVisible(true), 10); // smooth open
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => {
            setModal({ open: false, driver: null });
            setReviewNote("");
        }, 200); // animation complete hone do
    };

    const handleStatusChange = async () => {
        if (!modal.driver) return;
        setActionLoading(modal.driver.id);
        try {
            const res = await fetch(`/api/admin/driver/${modal.driver.id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus, reviewNote: reviewNote || null }),
            });
            if (res.ok) {
                closeModal();
                fetchDrivers(filterStatus || undefined);
            }
        } catch {
            console.error("Status update failed");
        } finally {
            setActionLoading(null);
        }
    };

    const handleDeleteDriver = async () => {
        if (!deleteDriverModal.driver) return;
        setDeleteDriverLoading(true);
        try {
            await fetch(`/api/admin/user/${deleteDriverModal.driver.user.id}`, { method: "DELETE" });
            setDeleteDriverModal({ open: false, driver: null });
            fetchDrivers(filterStatus || undefined);
        } finally {
            setDeleteDriverLoading(false);
        }
    };

    // Dynamic stat cards using real summary data
    const statCards = [
        {
            label: "Total Drivers",
            value: summary.total.toString(),
            change: "Registered",
            up: true,
            sub: "all time",
            color: "cyan",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512"><path fill="currentColor" d="M256 21A235 235 0 0 0 21 256a235 235 0 0 0 235 235a235 235 0 0 0 235-235A235 235 0 0 0 256 21m0 82c84.393 0 153 68.607 153 153s-68.607 153-153 153s-153-68.607-153-153s68.607-153 153-153m0 18c-20.417 0-39.757 4.52-57.09 12.602C210.457 166.482 230.218 208 256 208c25.823 0 44.926-41.65 56.752-74.555C295.505 125.462 276.284 121 256 121m98.752 42.88c-27.714 21.143-61.142 52.79-53.17 77.327c7.981 24.564 53.508 29.858 88.459 30.936c.628-5.294.959-10.678.959-16.143c0-35.642-13.755-68.012-36.248-92.12m-197.729.243C134.663 188.204 121 220.477 121 256c0 5.55.34 11.018.988 16.39c34.833-.825 80.381-6.793 88.344-31.3c7.974-24.542-25.68-55.553-53.309-76.967M256 224a32 32 0 0 0-32 32a32 32 0 0 0 32 32a32 32 0 0 0 32-32a32 32 0 0 0-32-32m-46.297 38.037a9 9 0 0 0-2.652.44a9 9 0 0 0-5.78 11.341a9 9 0 0 0 11.34 5.778a9 9 0 0 0 5.78-11.34a9 9 0 0 0-8.688-6.219m92.856.008a9 9 0 0 0-8.95 6.21a9 9 0 0 0 5.78 11.34a9 9 0 0 0 11.34-5.777a9 9 0 0 0-5.78-11.341a9 9 0 0 0-2.39-.432m-92.143 27.713c-21.59.104-50.24 16.832-72.424 31.928c19.029 34.168 52.46 59.164 92.143 66.837c9.99-33.39 18.42-78.618-2.446-93.777c-4.854-3.527-10.737-5.02-17.273-4.988m91.016.02c-6.58 0-12.492 1.516-17.346 5.042c-20.895 15.181-11.863 60.106-2.088 93.678c39.687-7.715 73.108-32.76 92.1-66.973c-22.006-15.224-50.935-31.747-72.666-31.748zM256 295.58a9 9 0 0 0-9 9a9 9 0 0 0 9 9a9 9 0 0 0 9-9a9 9 0 0 0-9-9" /></svg>,
        },
        {
            label: "Pending Review",
            value: summary.pending.toString(),
            change: summary.pending > 0 ? "Needs action" : "All clear",
            up: summary.pending === 0,
            sub: "awaiting approval",
            color: "amber",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        },
        {
            label: "Approved",
            value: summary.approved.toString(),
            change: summary.total > 0 ? `${Math.round((summary.approved / summary.total) * 100)}%` : "0%",
            up: true,
            sub: "of total drivers",
            color: "emerald",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        },
        {
            label: "Rejected",
            value: summary.rejected.toString(),
            change: summary.total > 0 ? `${Math.round((summary.rejected / summary.total) * 100)}%` : "0%",
            up: false,
            sub: "of total drivers",
            color: "rose",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        },
        // {
        //     label: "Suspended",
        //     value: summary.suspended.toString(),
        //     change: summary.suspended > 0 ? "Under review" : "None",
        //     up: summary.suspended === 0,
        //     sub: "access restricted",
        //     color: "violet",
        //     icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
        // },
    ];

    // Dynamic donut chart from real summary
    const driverStatusData = [
        { name: "Approved", value: summary.approved, color: "#10b981" },
        { name: "Pending", value: summary.pending, color: "#f59e0b" },
        { name: "Suspended", value: summary.suspended, color: "#8b5cf6" },
        { name: "Rejected", value: summary.rejected, color: "#ef4444" },
    ].filter(d => d.value > 0);

    // Today's date
    const today = new Date().toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    const [modalVisible, setModalVisible] = useState(false);



    return (
        <div className="space-y-5">

            {/* Greeting */}
            <div>
                <h2 className="text-[20px] font-black text-zinc-800 tracking-tight">Overview</h2>
                <p className="text-[13px] text-zinc-400 mt-0.5">{today} — Here's what's happening today</p>
            </div>

            {/* Stat Cards — DYNAMIC */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {statCards.map((card) => {
                    const c = colorMap[card.color];
                    return (
                        <div key={card.label} className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl ${c.light} ${c.text} flex items-center justify-center`}>
                                    {card.icon}
                                </div>
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${card.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"}`}>
                                    {card.change}
                                </span>
                            </div>
                            {loading ? (
                                <div className="w-12 h-7 bg-zinc-100 rounded-lg animate-pulse mb-1" />
                            ) : (
                                <p className="text-[22px] font-black text-zinc-800 leading-none">{card.value}</p>
                            )}
                            <p className="text-[11.5px] text-zinc-400 mt-1">{card.label}</p>
                            <p className="text-[10.5px] text-zinc-300 mt-0.5">{card.sub}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Drivers Table — DYNAMIC */}
                {/* Drivers Table */}
                <div className="xl:col-span-2 bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-zinc-100 gap-3">
                        <div>
                            <h3 className="text-[14px] font-bold text-zinc-800">Drivers Management</h3>
                            <p className="text-[11.5px] text-zinc-400 mt-0.5">Manage approvals and status</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Search */}
                            <div className="relative">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search driver..."
                                    value={driverSearch}
                                    onChange={(e) => { setDriverSearch(e.target.value); setCurrentPage(1); }}
                                    className="border border-zinc-200 bg-zinc-50 rounded-xl pl-8 pr-3 py-1.5 text-[12px] text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-cyan-400 w-44"
                                />
                            </div>
                            {/* Status Filter */}
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                                className="text-[12px] border border-zinc-200 rounded-xl px-3 py-1.5 text-zinc-600 focus:outline-none focus:border-cyan-400 bg-zinc-50">
                                <option value="">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                                <option value="SUSPENDED">Suspended</option>
                            </select>
                        </div>
                    </div>
                    {tableLoading ? (
                        <div className="flex items-center justify-center py-14">
                            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : drivers.length === 0 ? (
                        <div className="text-center py-14">
                            <p className="text-zinc-400 text-[13px]">No drivers found.</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-zinc-50/80">
                                            {["Name", "Email", "City", "Status", "Joined", "Action"].map((h) => (
                                                <th key={h} className="text-left px-4 py-3 text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wider">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-50">
                                        {paginatedDrivers.map((driver) => (
                                            <tr key={driver.id} className="hover:bg-cyan-50/40 transition-colors duration-150">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-cyan-400 to-cyan-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                                                            {driver.user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-[12.5px] font-medium text-zinc-700">{driver.user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3"><span className="text-[12px] text-zinc-500">{driver.user.email}</span></td>
                                                <td className="px-4 py-3"><span className="text-[12px] text-zinc-600">{driver.city}</span></td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-lg ${statusStyle[driver.status]}`}>
                                                        {driver.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-[11px] text-zinc-400">
                                                        {new Date(driver.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => openModal(driver)}
                                                            className="text-[11.5px] font-semibold text-cyan-500 hover:text-cyan-600 border border-cyan-200 hover:border-cyan-400 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-lg transition-all">
                                                            Manage
                                                        </button>
                                                        {/* Delete button */}
                                                        <button
                                                            onClick={() => setDeleteDriverModal({ open: true, driver })}
                                                            className="text-zinc-400 hover:text-red-500 border border-zinc-200 hover:border-red-200 bg-zinc-50 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                                                            title="Delete driver"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-100 cursor-pointer">
                                    <p className="text-[11.5px] text-zinc-400">
                                        Showing {((currentPage - 1) * driversPerPage) + 1}–{Math.min(currentPage * driversPerPage, drivers.length)} of {drivers.length} drivers
                                    </p>
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-7 h-7 cursor-pointer rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-7 h-7 cursor-pointer rounded-lg text-[12px] font-semibold transition-all ${currentPage === page
                                                    ? "bg-cyan-500 text-white border border-cyan-500"
                                                    : "border border-zinc-200 text-zinc-500 hover:border-cyan-400 hover:text-cyan-500"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="w-7 h-7 cursor-pointer rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {/* Driver Status Donut — DYNAMIC */}
                <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-5">
                    <div className="mb-4">
                        <h3 className="text-[14px] font-bold text-zinc-800">Driver Status</h3>
                        <p className="text-[11.5px] text-zinc-400 mt-0.5">Total {summary.total} registered</p>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center h-37.5">
                            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : driverStatusData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={150}>
                                <PieChart>
                                    <Pie data={driverStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={3} dataKey="value">
                                        {driverStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip formatter={(v, n) => [`${v} drivers`, n]} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-2 mt-2">
                                {driverStatusData.map((d) => (
                                    <div key={d.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                            <span className="text-[12px] text-zinc-500">{d.name}</span>
                                        </div>
                                        <span className="text-[12px] font-semibold text-zinc-700">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-37.5">
                            <p className="text-zinc-400 text-[13px]">No driver data</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Peak Hours + Drivers Table */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

                {/* Weekly Area Chart */}
                <div className="xl:col-span-2 bg-white border border-zinc-100 rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-[14px] font-bold text-zinc-800">Weekly Performance</h3>
                            <p className="text-[11.5px] text-zinc-400 mt-0.5">Last 7 days overview</p>
                        </div>
                        <div className="flex gap-1 bg-zinc-100 p-1 rounded-xl">
                            {(["revenue", "rides"] as const).map((v) => (
                                <button key={v} onClick={() => setRevenueView(v)}
                                    className={`text-[11.5px] font-semibold px-3 py-1.5 rounded-lg transition-all capitalize ${revenueView === v ? "bg-white text-zinc-800 shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}>
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey={revenueView} stroke="#06b6d4" strokeWidth={2.5}
                                fill="url(#colorGrad)" dot={{ fill: "#06b6d4", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Peak Hours */}
                <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-[14px] font-bold text-zinc-800">Today's Peak Hours</h3>
                            <p className="text-[11.5px] text-zinc-400 mt-0.5">Rides per hour</p>
                        </div>
                        <span className="text-[11px] font-semibold bg-cyan-50 text-cyan-600 border border-cyan-100 px-2.5 py-1 rounded-lg">🔥 Peak: 6pm</span>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={hourlyRides} margin={{ top: 4, right: 0, left: -25, bottom: 0 }} barCategoryGap="30%">
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#67e8f9" stopOpacity={0.6} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: "#f0fdfe", radius: 6 }}
                                content={({ active, payload, label }) => active && payload?.length ? (
                                    <div className="bg-white border border-zinc-100 shadow-lg rounded-xl px-3 py-2">
                                        <p className="text-[11px] text-zinc-400">{label}</p>
                                        <p className="text-[14px] font-bold text-cyan-600">{payload[0].value} rides</p>
                                    </div>
                                ) : null}
                            />
                            <Bar dataKey="rides" fill="url(#barGradient)" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {modal.open && modal.driver && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${modalVisible ? "bg-black/30 backdrop-blur-sm" : "bg-black/0"
                        }`}
                >
                    <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-zinc-100 transition-all duration-200 ${modalVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                        }`}>
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h4 className="text-[16px] font-bold text-zinc-800">Update Driver Status</h4>
                                <p className="text-[13px] text-zinc-400 mt-0.5">{modal.driver.user.name} — {modal.driver.user.email}</p>
                            </div>
                            <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4 flex items-center gap-2">
                            <span className="text-[13px] text-zinc-500">Current:</span>
                            <span className={`inline-flex text-[11.5px] font-semibold px-2.5 py-1 rounded-lg ${statusStyle[modal.driver.status]}`}>
                                {modal.driver.status}
                            </span>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[13px] font-semibold text-zinc-500 mb-2">New Status</label>
                            <div className="grid grid-cols-2 gap-2">
                                {statusOptions.map((opt) => (
                                    <button key={opt.value} onClick={() => setNewStatus(opt.value)}
                                        className={`py-2 rounded-xl text-[13px] font-semibold border transition-all ${newStatus === opt.value
                                            ? "bg-cyan-500 text-white border-cyan-500 shadow-sm shadow-cyan-200"
                                            : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-cyan-300"
                                            }`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-[13px] font-semibold text-zinc-500 mb-2">
                                Note <span className="text-zinc-400 font-normal">(optional)</span>
                            </label>
                            <textarea value={reviewNote} onChange={(e) => setReviewNote(e.target.value)}
                                placeholder="Reason for status change..." rows={3}
                                className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-[13.5px] text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 resize-none bg-zinc-50" />
                        </div>

                        <div className="flex gap-3">
                            <button onClick={closeModal}
                                className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-[13.5px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleStatusChange} disabled={actionLoading === modal.driver.id}
                                className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-cyan-400 to-cyan-500 text-white text-[13.5px] font-semibold hover:from-cyan-500 hover:to-cyan-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                                {actionLoading === modal.driver.id ? "Updating..." : "Update Status"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteDriverModal.open && deleteDriverModal.driver && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-zinc-100">
                        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div className="text-center mb-6">
                            <h4 className="text-[15px] font-bold text-zinc-800 mb-1">Delete Driver?</h4>
                            <p className="text-[12.5px] text-zinc-500">
                                <span className="font-semibold text-zinc-700">{deleteDriverModal.driver.user.name}</span> ko permanently delete karna chahte ho? Yeh action undo nahi ho sakta.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteDriverModal({ open: false, driver: null })}
                                className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-[13px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteDriver}
                                disabled={deleteDriverLoading}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold transition-all disabled:opacity-60"
                            >
                                {deleteDriverLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}