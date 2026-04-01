"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Role = "ADMIN" | "USER" | "DRIVER";
type BanReason = "FAKE_BOOKING" | "REPEATED_CANCELS" | "HARASSMENT" | "FRAUD" | "FAKE_ACCOUNT" | "OTHER";

interface DriverProfile { id: string; city: string; status: string; }

interface User {
    id: string; name: string; email: string; phone: string; role: Role;
    isActive: boolean; createdAt: string; bannedAt: string | null;
    bannedBy: string | null; banReason: BanReason | null; banNote: string | null;
    driverProfile?: DriverProfile | null;
}

interface Pagination { total: number; page: number; limit: number; totalPages: number; hasNext: boolean; hasPrev: boolean; }

const BAN_REASON_LABELS: Record<BanReason, string> = {
    FAKE_BOOKING: "Fake Booking", REPEATED_CANCELS: "Repeated Cancels",
    HARASSMENT: "Harassment", FRAUD: "Payment Fraud",
    FAKE_ACCOUNT: "Fake Account", OTHER: "Other",
};

const ROLE_STYLE: Record<Role, string> = {
    ADMIN: "bg-purple-50 text-purple-600 border border-purple-200",
    USER: "bg-sky-50 text-sky-600 border border-sky-200",
    DRIVER: "bg-teal-50 text-teal-600 border border-teal-200",
};

const avatar = (name: string) => name.charAt(0).toUpperCase();

// ✅ Fix 1: Invalid Date guard
const fmtDate = (d?: string | null) => {
    if (!d) return "—";
    const date = new Date(d);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [page, setPage] = useState(1);
    const [banModal, setBanModal] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
    const [banReason, setBanReason] = useState<BanReason>("FAKE_BOOKING");
    const [banNote, setBanNote] = useState("");
    const [banLoading, setBanLoading] = useState(false);
    const [detailModal, setDetailModal] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
    const [deleteLoading, setDeleteLoading] = useState(false);

    // ✅ Fix 2: debounce ref — no double fetch
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchUsers = useCallback(async (overrides?: { page?: number; search?: string; status?: string }) => {
        setLoading(true);
        try {
            const p = new URLSearchParams();
            p.set("role", "USER");
            p.set("page", String(overrides?.page ?? page));
            p.set("limit", "5");
            const s = overrides?.status  !== undefined ? overrides.status  : statusFilter;
            const q = overrides?.search  !== undefined ? overrides.search  : search;
            if (s) p.set("isActive", s);
            if (q) p.set("search", q);
            const res  = await fetch(`/api/user?${p.toString()}`);
            const data = await res.json();
            setUsers(data.users ?? []);
            setPagination(data.pagination ?? null);
        } catch { console.error("fetch failed"); }
        finally { setLoading(false); }
    }, [page, statusFilter, search]);

    useEffect(() => { fetchUsers(); }, [page, statusFilter]);

    const handleSearch = (val: string) => {
        setSearch(val); setPage(1);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchUsers({ search: val, page: 1 }), 400);
    };

    const handleBan = async () => {
        if (!banModal.user) return;
        setBanLoading(true);
        try {
            await fetch(`/api/admin/user/${banModal.user.id}/status`, {
                method: "PATCH", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: false, banReason, banNote: banNote || null }),
            });
            setBanModal({ open: false, user: null }); setBanNote(""); fetchUsers();
        } finally { setBanLoading(false); }
    };

    const handleUnban = async (userId: string) => {
        await fetch(`/api/admin/user/${userId}/status`, {
            method: "PATCH", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: true }),
        });
        fetchUsers();
    };

    const handleDelete = async () => {
        if (!deleteModal.user) return;
        setDeleteLoading(true);
        try {
            await fetch(`/api/admin/user/${deleteModal.user.id}`, { method: "DELETE" });
            setDeleteModal({ open: false, user: null }); fetchUsers();
        } finally { setDeleteLoading(false); }
    };

    return (
        <section className="space-y-5">
            <div>
                <h2 className="text-2xl font-bold text-zinc-800">Users Management</h2>
                <p className="text-sm text-zinc-400 mt-0.5">Manage all registered users — ban, unban, and view details</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-zinc-800">All Users</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Manage all users ban, unban and delete</p>
                    </div>
                    <div className="relative w-full sm:w-56">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </span>
                        <input type="text" placeholder="Search name, email, phone..." value={search}
                            onChange={e => handleSearch(e.target.value)}
                            className="w-full border border-zinc-200 bg-zinc-50 rounded-[10px] pl-8 pr-3 py-2.5 text-[12.5px] text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all"/>
                    </div>
                    <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                        className="border border-zinc-200 cursor-pointer bg-zinc-50 rounded-[10px] px-3 py-2.5 text-[12.5px] text-zinc-600 focus:outline-none focus:border-cyan-400">
                        <option value="">All Status</option>
                        <option value="true">Active</option>
                        <option value="false">Banned</option>
                    </select>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"/>
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-16"><p className="text-[14px] text-zinc-400">No users found.</p></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-zinc-50/80">
                                    {/* ✅ # column added */}
                                    {["#", "Name", "Contact", "Status", "Joined", "Actions"].map(h => (
                                        <th key={h} className="text-left px-6 py-3 text-[13px] font-medium text-zinc-700 tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {users.map((u, i) => (
                                    <tr key={u.id} className="hover:bg-cyan-50/30 transition-colors duration-150 group">
                                        {/* # */}
                                        <td className="px-6 py-4">
                                            <span className="text-[12px] font-semibold text-zinc-400">
                                                {((pagination?.page ?? 1) - 1) * 5 + i + 1}
                                            </span>
                                        </td>
                                        {/* User */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0 ${u.isActive ? "bg-linear-to-br from-cyan-400 to-cyan-500" : "bg-zinc-300"}`}>
                                                    {avatar(u.name)}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-semibold text-zinc-700">{u.name}</p>
                                                    {!u.isActive && u.banReason && (
                                                        <p className="text-[10.5px] text-red-400 mt-0.5">{BAN_REASON_LABELS[u.banReason]}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        {/* Contact */}
                                        <td className="px-5 py-4">
                                            <p className="text-[13px] text-zinc-600">{u.email}</p>
                                            <p className="text-[12.5px] text-zinc-400 mt-0.5">{u.phone}</p>
                                        </td>
                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            {u.isActive ? (
                                                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"/> Banned
                                                </span>
                                            )}
                                        </td>
                                        {/* Joined */}
                                        <td className="px-5 py-4">
                                            <span className="text-[12.5px] text-zinc-400">{fmtDate(u.createdAt)}</span>
                                        </td>
                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setDetailModal({ open: true, user: u })}
                                                    className="text-[11.5px] cursor-pointer font-semibold text-cyan-500 hover:text-cyan-600 border border-cyan-300 bg-cyan-50 hover:bg-cyan-100 px-2.5 py-1.5 rounded-lg transition-all">View</button>
                                                {u.isActive ? (
                                                    <button onClick={() => setBanModal({ open: true, user: u })}
                                                        className="text-[11.5px] cursor-pointer font-semibold text-red-500 hover:text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-all">Ban</button>
                                                ) : (
                                                    <button onClick={() => handleUnban(u.id)}
                                                        className="text-[11.5px] cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all">Unban</button>
                                                )}
                                                <button onClick={() => setDeleteModal({ open: true, user: u })} title="Delete user"
                                                    className="text-red-500 hover:text-white border border-red-200 hover:border-red-500 bg-red-50 hover:bg-red-500 p-1.5 rounded-lg cursor-pointer transition-all">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-5 border-t border-zinc-100">
                        <p className="text-[11.5px] text-zinc-400">Showing {users.length} of {pagination.total} users</p>
                        <div className="flex items-center gap-1.5">
                            <button disabled={!pagination.hasPrev} onClick={() => setPage(p => p - 1)}
                                className="w-7 h-7 rounded-lg cursor-pointer border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                            </button>
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                                .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
                                .map((p, idx, arr) => (
                                    <div key={p} className="flex items-center gap-1.5">
                                        {idx > 0 && arr[idx-1] !== p-1 && <span className="text-zinc-400 text-[12px]">…</span>}
                                        <button onClick={() => setPage(p)}
                                            className={`w-7 h-7 rounded-lg cursor-pointer text-[12.5px] font-semibold border transition-all ${p === page ? "bg-cyan-500 text-white border-cyan-500" : "border-zinc-200 text-zinc-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50"}`}>
                                            {p}
                                        </button>
                                    </div>
                                ))
                            }
                            <button disabled={!pagination.hasNext} onClick={() => setPage(p => p + 1)}
                                className="w-7 h-7 rounded-lg cursor-pointer border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* BAN MODAL */}
            {banModal.open && banModal.user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-zinc-100">
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h4 className="text-[15px] font-bold text-zinc-800">Ban User</h4>
                                <p className="text-[12.5px] text-zinc-400 mt-0.5">{banModal.user.name} — {banModal.user.email}</p>
                            </div>
                            <button onClick={() => setBanModal({ open: false, user: null })} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 flex items-start gap-2.5">
                            <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <p className="text-[12px] text-red-600">User ka access turant block ho jaye ga. Woh login nahi kar sake ga jab tak unban na ho.</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[12.5px] font-semibold text-zinc-500 mb-2">Ban Reason <span className="text-red-400">*</span></label>
                            <div className="grid grid-cols-2 gap-2">
                                {(Object.entries(BAN_REASON_LABELS) as [BanReason, string][]).map(([val, label]) => (
                                    <button key={val} onClick={() => setBanReason(val)}
                                        className={`py-2 px-3 rounded-xl text-[12px] font-medium border text-left transition-all ${banReason === val ? "bg-red-500 text-white border-red-500" : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-red-300"}`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="block text-[12.5px] font-semibold text-zinc-500 mb-2">Additional Note <span className="text-zinc-400 font-normal">(optional)</span></label>
                            <textarea value={banNote} onChange={e => setBanNote(e.target.value)} placeholder="Extra detail likho..." rows={3}
                                className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-[12.5px] text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50 resize-none bg-zinc-50"/>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setBanModal({ open: false, user: null })} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-[13px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">Cancel</button>
                            <button onClick={handleBan} disabled={banLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold transition-all disabled:opacity-60">
                                {banLoading ? "Banning..." : "Ban User"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DETAIL MODAL */}
            {detailModal.open && detailModal.user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-zinc-100">
                        <div className="flex items-start justify-between mb-5">
                            <h4 className="text-[15px] font-bold text-zinc-800">User Details</h4>
                            <button onClick={() => setDetailModal({ open: false, user: null })} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-[18px] font-bold shrink-0 ${detailModal.user.isActive ? "bg-linear-to-br from-cyan-400 to-cyan-500" : "bg-zinc-300"}`}>
                                {avatar(detailModal.user.name)}
                            </div>
                            <div>
                                <p className="text-[15px] font-bold text-zinc-800">{detailModal.user.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`inline-flex text-[10.5px] font-semibold px-2 py-0.5 rounded-md ${ROLE_STYLE[detailModal.user.role]}`}>{detailModal.user.role}</span>
                                    {detailModal.user.isActive
                                        ? <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Active</span>
                                        : <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-md border border-red-200"><span className="w-1.5 h-1.5 rounded-full bg-red-500"/> Banned</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {[
                                { label: "Email", value: detailModal.user.email },
                                { label: "Phone", value: detailModal.user.phone },
                                { label: "Joined", value: fmtDate(detailModal.user.createdAt) },
                                { label: "City", value: detailModal.user.driverProfile?.city ?? "—" },
                            ].map(f => (
                                <div key={f.label} className="bg-zinc-50 rounded-xl px-3 py-2.5">
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{f.label}</p>
                                    <p className="text-[12.5px] font-semibold text-zinc-700 mt-0.5 truncate">{f.value}</p>
                                </div>
                            ))}
                        </div>
                        {detailModal.user.driverProfile && (
                            <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-4">
                                <p className="text-[11px] text-teal-600 font-semibold uppercase tracking-wider mb-1">Driver Profile</p>
                                <p className="text-[12.5px] text-teal-700">Status: <span className="font-bold">{detailModal.user.driverProfile.status}</span></p>
                            </div>
                        )}
                        {!detailModal.user.isActive && detailModal.user.banReason && (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                                <p className="text-[11px] text-red-500 font-semibold uppercase tracking-wider mb-1.5">Ban Information</p>
                                <div className="space-y-1">
                                    <p className="text-[12.5px] text-red-700">Reason: <span className="font-bold">{BAN_REASON_LABELS[detailModal.user.banReason]}</span></p>
                                    {detailModal.user.bannedAt && <p className="text-[12px] text-red-600">Banned on: {fmtDate(detailModal.user.bannedAt)}</p>}
                                    {detailModal.user.banNote && <p className="text-[12px] text-red-600 italic">"{detailModal.user.banNote}"</p>}
                                </div>
                            </div>
                        )}
                        <div className="flex gap-3">
                            <button onClick={() => setDetailModal({ open: false, user: null })} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-[13px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">Close</button>
                            {detailModal.user.isActive
                                ? <button onClick={() => { setDetailModal({ open: false, user: null }); setBanModal({ open: true, user: detailModal.user }); }} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold transition-all">Ban User</button>
                                : <button onClick={() => { handleUnban(detailModal.user!.id); setDetailModal({ open: false, user: null }); }} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-semibold transition-all">Unban User</button>
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE MODAL */}
            {deleteModal.open && deleteModal.user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-zinc-100">
                        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </div>
                        <div className="text-center mb-6">
                            <h4 className="text-[15px] font-bold text-zinc-800 mb-1">Delete User?</h4>
                            <p className="text-[12.5px] text-zinc-500"><span className="font-semibold text-zinc-700">{deleteModal.user.name}</span> ko permanently delete karna chahte ho? Yeh action undo nahi ho sakta.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteModal({ open: false, user: null })} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-[13px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">Cancel</button>
                            <button onClick={handleDelete} disabled={deleteLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold transition-all disabled:opacity-60">
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}