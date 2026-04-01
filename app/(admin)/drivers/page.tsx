"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type DriverStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

interface Driver {
    id: string;
    city: string;
    status: DriverStatus;
    reviewNote?: string | null;
    licenseNumber?: string | null;
    aadhaar?: string | null;
    createdAt: string;
    user: { id: string; name: string; email: string; phone: string; isActive: boolean };
}

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

const DRIVERS_PER_PAGE = 5;

// name → url slug
function toSlug(name: string, id: string) {
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return `${slug}-${id.slice(0, 8)}`;
}

export default function DriversManagePage() {
    const router = useRouter();
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [modal, setModal] = useState<{ open: boolean; driver: Driver | null }>({ open: false, driver: null });
    const [modalVisible, setModalVisible] = useState(false);
    const [newStatus, setNewStatus] = useState<DriverStatus>("APPROVED");
    const [reviewNote, setReviewNote] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; driver: Driver | null }>({ open: false, driver: null });
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const url = filterStatus ? `/api/admin/drivers?status=${filterStatus}` : "/api/admin/drivers";
            const res = await fetch(url);
            const data = await res.json();
            setDrivers(data.drivers || []);
        } catch { console.error("Failed to fetch drivers"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchDrivers(); setCurrentPage(1); }, [filterStatus]);

    const filtered = drivers.filter(d => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
            d.user.name.toLowerCase().includes(q) ||
            d.user.email.toLowerCase().includes(q) ||
            d.city.toLowerCase().includes(q) ||
            (d.user.phone || "").includes(q)
        );
    });

    const totalPages = Math.ceil(filtered.length / DRIVERS_PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * DRIVERS_PER_PAGE, currentPage * DRIVERS_PER_PAGE);

    const openModal = (driver: Driver) => {
        setModal({ open: true, driver });
        setNewStatus(driver.status);
        setReviewNote(driver.reviewNote || "");
        setTimeout(() => setModalVisible(true), 10);
    };
    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => { setModal({ open: false, driver: null }); setReviewNote(""); }, 200);
    };

    const handleStatusChange = async () => {
        if (!modal.driver) return;
        setActionLoading(true);
        try {
            const res = await fetch(`/api/admin/driver/${modal.driver.id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus, reviewNote: reviewNote || null }),
            });
            if (res.ok) { closeModal(); fetchDrivers(); }
        } catch { console.error("Status update failed"); }
        finally { setActionLoading(false); }
    };

    const handleDelete = async () => {
        if (!deleteModal.driver) return;
        setDeleteLoading(true);
        try {
            await fetch(`/api/admin/user/${deleteModal.driver.user.id}`, { method: "DELETE" });
            setDeleteModal({ open: false, driver: null });
            fetchDrivers();
        } finally { setDeleteLoading(false); }
    };

    const today = new Date().toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    return (
        <section className="space-y-5">
            <div>
                <h2 className="text-2xl font-bold text-zinc-800">Drivers Management</h2>
                <p className="text-sm text-zinc-400 mt-0.5">{today} — Manage all registered drivers</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-5 border-b border-zinc-200 gap-3">
                    <div>
                        <h3 className="text-base font-bold text-zinc-800">All Drivers</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Manage approvals, status and driver details</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input type="text" placeholder="Search name, email, phone..."
                                value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                                className="bg-zinc-50 border border-zinc-200 rounded-[10px] w-56 pl-8 pr-3 py-2.5 text-[12.5px] text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-cyan-400" />
                        </div>
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                            className="text-[12.5px] bg-zinc-50 border border-zinc-200 cursor-pointer rounded-[10px] px-3 py-2.5 text-zinc-600 focus:outline-none focus:border-cyan-400">
                            <option value="">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="SUSPENDED">Suspended</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-zinc-400 text-[13px]">No drivers found.</p>
                    </div>
                ) : (
                    <div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-zinc-50/80">
                                        {["#", "Name", "Email", "City", "Phone", "Aadhaar", "Status", "Joined", "Action"].map(h => (
                                            <th key={h} className="text-left px-4 py-3 text-[12px] font-semibold text-zinc-500 tracking-wide whitespace-nowrap">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {paginated.map((driver, i) => (
                                        <tr key={driver.id} className="hover:bg-cyan-50/30 transition-colors duration-150">
                                            <td className="px-4 py-4">
                                                <span className="text-[12px] font-semibold text-zinc-400">{(currentPage - 1) * DRIVERS_PER_PAGE + i + 1}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white text-[12px] shrink-0">
                                                        {driver.user.name?.charAt(0)?.toUpperCase() || "D"}
                                                    </div>
                                                    <span className="text-[13px] font-semibold text-zinc-700 whitespace-nowrap">{driver.user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4"><span className="text-[12.5px] text-zinc-500">{driver.user.email}</span></td>
                                            <td className="px-4 py-4"><span className="text-[12.5px] text-zinc-600">{driver.city || "—"}</span></td>
                                            <td className="px-4 py-4"><span className="text-[12.5px] text-zinc-600">{driver.user.phone || "—"}</span></td>
                                            <td className="px-4 py-4">
                                                <span className="text-[12.5px] text-zinc-600 font-mono">{driver.aadhaar || "—"}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap ${statusStyle[driver.status]}`}>
                                                    {driver.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="text-[12px] text-zinc-500 whitespace-nowrap">
                                                    {(() => {
                                                        const d = new Date(driver.createdAt);
                                                        return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
                                                    })()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openModal(driver)}
                                                        className="text-xs font-medium text-cyan-500 hover:text-cyan-600 cursor-pointer border border-cyan-200 hover:border-cyan-400 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap">
                                                        Manage
                                                    </button>
                                                    {/* ✅ Name slug + id query param */}
                                                    <button onClick={() => router.push(`/drivers/${toSlug(driver.user.name, driver.id)}`)}
                                                        className="text-green-500 hover:text-white border border-green-200 hover:border-green-500 bg-green-50 hover:bg-green-500 p-1.5 rounded-lg cursor-pointer transition-all" title="View driver">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 5c-6.307 0-9.367 5.683-9.91 6.808a.44.44 0 0 0 0 .384C2.632 13.317 5.692 19 12 19s9.367-5.683 9.91-6.808a.44.44 0 0 0 0-.384C21.368 10.683 18.308 5 12 5" /><circle cx="12" cy="12" r="3" /></g></svg>
                                                    </button>
                                                    <button onClick={() => setDeleteModal({ open: true, driver })}
                                                        className="text-red-500 hover:text-white border border-red-200 hover:border-red-500 bg-red-50 hover:bg-red-500 p-1.5 rounded-lg cursor-pointer transition-all" title="Delete driver">
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

                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-100">
                                <p className="text-[11.5px] text-zinc-400">
                                    Showing {(currentPage - 1) * DRIVERS_PER_PAGE + 1}–{Math.min(currentPage * DRIVERS_PER_PAGE, filtered.length)} of {filtered.length} drivers
                                </p>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                                        className="w-7 h-7 cursor-pointer rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button key={page} onClick={() => setCurrentPage(page)}
                                            className={`w-7 h-7 cursor-pointer rounded-lg text-[12px] font-semibold transition-all ${currentPage === page ? "bg-cyan-500 text-white border border-cyan-500" : "border border-zinc-200 text-zinc-500 hover:border-cyan-400 hover:text-cyan-500"}`}>
                                            {page}
                                        </button>
                                    ))}
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                                        className="w-7 h-7 cursor-pointer rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Status Modal */}
            {modal.open && modal.driver && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${modalVisible ? "bg-black/30 backdrop-blur-sm" : "bg-black/0"}`}>
                    <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-zinc-100 transition-all duration-200 ${modalVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h4 className="text-[16px] font-bold text-zinc-800">Update Driver Status</h4>
                                <p className="text-[13px] text-zinc-400 mt-0.5">{modal.driver.user.name} — {modal.driver.user.email}</p>
                            </div>
                            <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="mb-4 flex items-center gap-2">
                            <span className="text-[13px] text-zinc-500">Current:</span>
                            <span className={`inline-flex text-[11.5px] font-semibold px-2.5 py-1 rounded-lg ${statusStyle[modal.driver.status]}`}>{modal.driver.status}</span>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[13px] font-semibold text-zinc-500 mb-2">New Status</label>
                            <div className="grid grid-cols-2 gap-2">
                                {statusOptions.map(opt => (
                                    <button key={opt.value} onClick={() => setNewStatus(opt.value)}
                                        className={`py-2.5 rounded-[10px] text-sm font-medium border transition-all cursor-pointer ${newStatus === opt.value ? "bg-cyan-500 text-white border-cyan-500 shadow-sm" : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-cyan-300"}`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Note <span className="text-zinc-400 font-normal">(optional)</span></label>
                            <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)}
                                placeholder="Reason for status change..." rows={3}
                                className="w-full border border-zinc-200 rounded-[10px] px-4 py-2.5 text-[13px] text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 resize-none bg-zinc-50" />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={closeModal} className="flex-1 py-2.5 cursor-pointer rounded-[10px] border border-zinc-200 text-[13.5px] font-semibold text-zinc-600 hover:bg-zinc-50">Cancel</button>
                            <button onClick={handleStatusChange} disabled={actionLoading}
                                className="flex-1 py-2.5 cursor-pointer rounded-[10px] bg-linear-to-r from-cyan-400 to-cyan-500 text-white text-[13.5px] font-semibold disabled:opacity-60">
                                {actionLoading ? "Updating..." : "Update Status"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal.open && deleteModal.driver && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-zinc-100">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div className="text-center mb-6">
                            <h4 className="text-base font-bold text-zinc-800 mb-2">Delete Driver?</h4>
                            <p className="text-[13px] text-zinc-500">Permanently delete <span className="font-semibold text-zinc-700">{deleteModal.driver.user.name}</span>? This cannot be undone.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteModal({ open: false, driver: null })}
                                className="flex-1 py-2.5 cursor-pointer rounded-[10px] border border-zinc-200 text-[13px] font-semibold text-zinc-600 hover:bg-zinc-50">Cancel</button>
                            <button onClick={handleDelete} disabled={deleteLoading}
                                className="flex-1 py-2.5 cursor-pointer rounded-[10px] bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold disabled:opacity-60">
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}