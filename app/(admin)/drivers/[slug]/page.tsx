"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type DriverStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

interface DriverDetail {
    id: string;
    city: string;
    status: DriverStatus;
    reviewNote?: string | null;
    aadhaar?: string | null;
    profilePic?: string | null;
    dateOfBirth?: string | null;
    aadhaarFrontPic?: string | null;
    aadhaarBackPic?: string | null;
    licensePic?: string | null;
    licenseNumber?: string | null;
    licenseExpiry?: string | null;
    createdAt: string;
    user: { id: string; name: string; email: string; phone: string; isActive: boolean; createdAt: string; role: string; };
}

const STATUS_CFG: Record<DriverStatus, { bg: string; ring: string; text: string; dot: string; badge: string; label: string }> = {
    PENDING:   { bg: "bg-amber-50",   ring: "ring-amber-200",   text: "text-amber-700",   dot: "bg-amber-400",   badge: "bg-amber-100 text-amber-700",   label: "Pending Approval" },
    APPROVED:  { bg: "bg-emerald-50", ring: "ring-emerald-200", text: "text-emerald-700", dot: "bg-emerald-400", badge: "bg-emerald-100 text-emerald-700", label: "Approved"         },
    REJECTED:  { bg: "bg-red-50",     ring: "ring-red-200",     text: "text-red-700",     dot: "bg-red-400",     badge: "bg-red-100 text-red-700",         label: "Rejected"         },
    SUSPENDED: { bg: "bg-zinc-100",   ring: "ring-zinc-200",    text: "text-zinc-600",    dot: "bg-zinc-400",    badge: "bg-zinc-200 text-zinc-600",        label: "Suspended"        },
};

const statusOptions: { value: DriverStatus; label: string; color: string }[] = [
    { value: "APPROVED",  label: "Approve",     color: "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700" },
    { value: "REJECTED",  label: "Reject",      color: "hover:bg-red-50 hover:border-red-300 hover:text-red-600"            },
    { value: "SUSPENDED", label: "Suspend",     color: "hover:bg-zinc-100 hover:border-zinc-300 hover:text-zinc-700"        },
    { value: "PENDING",   label: "Set Pending", color: "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"      },
];

function fmt(date?: string | null) {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null; // ✅ Invalid Date guard
    return d.toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" });
}

function Field({ label, value, mono = false, highlight = false }: {
    label: string; value?: string | null; mono?: boolean; highlight?: boolean;
}) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-zinc-100/80 last:border-0 group">
            <span className="text-[11.5px] text-zinc-400 font-medium uppercase tracking-wide shrink-0 w-32">{label}</span>
            <span className={`text-[13px] font-semibold text-right ${mono ? "font-mono tracking-wider" : ""} ${highlight ? "text-cyan-600" : "text-zinc-800"} ${!value ? "text-zinc-300 font-normal" : ""}`}>
                {value || "—"}
            </span>
        </div>
    );
}

function DocCard({ label, src, onView }: { label: string; src?: string | null; onView?: () => void }) {
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${src ? "bg-emerald-400" : "bg-zinc-300"}`}/>
                <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">{label}</p>
            </div>
            {src ? (
                <button onClick={onView}
                    className="block group relative rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-50 aspect-video w-full cursor-pointer">
                    <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"/>
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                        <span className="text-white text-[11px] font-bold bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                            View Full
                        </span>
                    </div>
                </button>
            ) : (
                <div className="aspect-video rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-medium">Not Uploaded</p>
                </div>
            )}
        </div>
    );
}

function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3 bg-zinc-50 rounded-xl px-4 py-3 border border-zinc-100">
            <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 shrink-0 shadow-sm">
                {icon}
            </div>
            <div>
                <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-[13px] font-bold text-zinc-800 mt-0.5">{value}</p>
            </div>
        </div>
    );
}

export default function DriverDetailPage() {
    const { slug }  = useParams<{ slug: string }>();
    const router    = useRouter();
    const [driver,  setDriver]  = useState<DriverDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // modal
    const [modal,        setModal]        = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newStatus,    setNewStatus]    = useState<DriverStatus>("APPROVED");
    const [reviewNote,   setReviewNote]   = useState("");
    const [updating,     setUpdating]     = useState(false);
    // image modal
    const [imgModal, setImgModal] = useState<{ open: boolean; src: string; label: string }>({ open: false, src: "", label: "" });

    useEffect(() => {
        if (!slug) return;
        // Extract short ID suffix (last segment after final dash)
        const parts   = (slug as string).split("-");
        const shortId = parts[parts.length - 1];

        // ✅ Fix: single driver fetch — pura list nahi, sirf ek DB query
        fetch(`/api/admin/drivers?driverId=${shortId}`)
            .then(r => r.json())
            .then(data => {
                setDriver(data.driver || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [slug]);

    const openModal = () => {
        if (!driver) return;
        setNewStatus(driver.status);
        setReviewNote(driver.reviewNote || "");
        setModal(true);
        setTimeout(() => setModalVisible(true), 10);
    };
    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => { setModal(false); setReviewNote(""); }, 200);
    };
    const handleStatusChange = async () => {
        if (!driver) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/admin/driver/${driver.id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus, reviewNote: reviewNote || null }),
            });
            if (res.ok) {
                setDriver(prev => prev ? { ...prev, status: newStatus, reviewNote } : prev);
                closeModal();
            }
        } catch { console.error("Update failed"); }
        finally { setUpdating(false); }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-9 h-9 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"/>
                <p className="text-sm text-zinc-400 font-medium">Loading driver profile...</p>
            </div>
        </div>
    );

    if (!driver) return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
            <div className="w-20 h-20 rounded-2xl bg-zinc-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
            </div>
            <div className="text-center">
                <p className="text-zinc-700 font-bold text-lg">Driver not found</p>
                <p className="text-zinc-400 text-sm mt-1">This driver may have been deleted or the link is invalid.</p>
            </div>
            <button onClick={() => router.back()}
                className="flex items-center gap-2 text-cyan-500 text-sm font-semibold hover:text-cyan-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                Back to Drivers
            </button>
        </div>
    );

    const cfg     = STATUS_CFG[driver.status];
    const dob     = fmt(driver.dateOfBirth);
    const expiry  = fmt(driver.licenseExpiry);
    const joined  = fmt(driver.user.createdAt);
    const profSince = fmt(driver.createdAt);

    return (
        <section className="space-y-5 px-2 w-full">

            {/* Back + Header */}
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()}
                    className="w-9 h-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:border-cyan-400 hover:text-cyan-500 transition-all cursor-pointer shadow-sm shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-zinc-800">Driver Profile</h2>
                    <p className="text-sm text-zinc-400 mt-0.5">Complete details for {driver.user.name}</p>
                </div>
            </div>

            {/* ── HERO CARD ── */}
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                {/* Gradient bar */}
                <div className="h-1 bg-linear-to-r from-cyan-400 via-cyan-500 to-teal-400"/>

                <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start gap-6">

                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className={`w-24 h-24 rounded-2xl overflow-hidden ring-4 ${cfg.ring} shadow-lg`}>
                                {driver.profilePic
                                    ? <img src={driver.profilePic} alt={driver.user.name} className="w-full h-full object-cover"/>
                                    : <div className="w-full h-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-black text-white text-4xl">
                                        {driver.user.name?.charAt(0)?.toUpperCase() || "D"}
                                      </div>
                                }
                            </div>
                            <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full border-[3px] border-white shadow-sm ${cfg.dot}`}/>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h2 className="text-2xl font-bold text-zinc-900">{driver.user.name}</h2>
                                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${cfg.badge}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>
                                            {cfg.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-400 mt-1">{driver.user.email}</p>
                                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                                        <span className="flex items-center gap-1.5 text-[12.5px] text-zinc-600 font-medium">
                                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                            {driver.user.phone || "—"}
                                        </span>
                                        <span className="text-zinc-300">|</span>
                                        <span className="flex items-center gap-1.5 text-[12.5px] text-zinc-600 font-medium">
                                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                            {driver.city || "—"}
                                        </span>
                                        <span className="text-zinc-300">|</span>
                                        <span className="flex items-center gap-1.5 text-[12.5px] text-zinc-500">
                                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            Joined {joined}
                                        </span>
                                    </div>
                                </div>

                                <button onClick={openModal}
                                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm shadow-cyan-200 shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    Update Status
                                </button>
                            </div>

                            {/* Admin note */}
                            {driver.reviewNote && (
                                <div className="mt-4 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                    </svg>
                                    <div>
                                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">Admin Note</p>
                                        <p className="text-[12.5px] text-amber-800 font-medium mt-0.5">{driver.reviewNote}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-100">
                        <StatPill
                            label="Account"
                            value={driver.user.isActive ? "Active" : "Banned"}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                        />
                        <StatPill
                            label="Driver Since"
                            value={profSince || "—"}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
                        />
                        <StatPill
                            label="License Expiry"
                            value={expiry || "—"}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                        />
                        <StatPill
                            label="Date of Birth"
                            value={dob || "—"}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
                        />
                    </div>
                </div>
            </div>

            {/* ── INFO CARDS ── */}
            <div className="grid grid-cols-2 gap-4">

                {/* Personal */}
                <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-zinc-100">
                        <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                            <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        </div>
                        <p className="text-[13px] font-bold text-zinc-800">Personal Information</p>
                    </div>
                    <div className="px-5 py-1">
                        <Field label="Full Name"    value={driver.user.name}/>
                        <Field label="Email"        value={driver.user.email}/>
                        <Field label="Phone"        value={driver.user.phone}/>
                        <Field label="City"         value={driver.city}/>
                        <Field label="Date of Birth" value={dob}/>
                        <Field label="Aadhaar No."  value={driver.aadhaar} mono highlight/>
                        <Field label="Account"      value={driver.user.isActive ? "✓ Active" : "✕ Banned"}/>
                    </div>
                </div>

                {/* License */}
                <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-zinc-100">
                        <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <p className="text-[13px] font-bold text-zinc-800">License & Verification</p>
                    </div>
                    <div className="px-5 py-1">
                        <Field label="License No."   value={driver.licenseNumber} mono highlight/>
                        <Field label="Expiry Date"   value={expiry}/>
                        <Field label="Driver Status" value={cfg.label}/>
                        <Field label="Joined"        value={joined}/>
                        <Field label="Role"          value={driver.user.role}/>
                    </div>
                </div>
            </div>

            {/* ── DOCUMENTS ── */}
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <p className="text-[13px] font-bold text-zinc-800">Verification Documents</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {[driver.profilePic, driver.aadhaarFrontPic, driver.aadhaarBackPic, driver.licensePic].filter(Boolean).length === 4
                            ? <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">All uploaded ✓</span>
                            : <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                                {[driver.profilePic, driver.aadhaarFrontPic, driver.aadhaarBackPic, driver.licensePic].filter(Boolean).length}/4 uploaded
                              </span>
                        }
                    </div>
                </div>
                <div className="p-5 grid grid-cols-4 gap-4">
                    <DocCard label="Profile Photo"  src={driver.profilePic}  onView={() => driver.profilePic      && setImgModal({ open: true, src: driver.profilePic,      label: "Profile Photo"  })}/>
                    <DocCard label="Aadhaar Front"  src={driver.aadhaarFrontPic} onView={() => driver.aadhaarFrontPic && setImgModal({ open: true, src: driver.aadhaarFrontPic, label: "Aadhaar Front"  })}/>
                    <DocCard label="Aadhaar Back"   src={driver.aadhaarBackPic}  onView={() => driver.aadhaarBackPic  && setImgModal({ open: true, src: driver.aadhaarBackPic,  label: "Aadhaar Back"   })}/>
                    <DocCard label="License Photo"  src={driver.licensePic}      onView={() => driver.licensePic      && setImgModal({ open: true, src: driver.licensePic,      label: "License Photo"  })}/>
                </div>
            </div>

            {/* ── STATUS MODAL ── */}
            {modal && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${modalVisible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"}`}>
                    <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md border border-zinc-100 transition-all duration-200 overflow-hidden ${modalVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>

                        {/* Modal header */}
                        <div className="px-6 pt-6 pb-4 border-b border-zinc-100">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="text-[16px] font-bold text-zinc-800">Update Driver Status</h4>
                                    <p className="text-[12.5px] text-zinc-400 mt-0.5">{driver.user.name} · {driver.user.email}</p>
                                </div>
                                <button onClick={closeModal} className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 cursor-pointer transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-[12px] text-zinc-400">Current status:</span>
                                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${cfg.badge}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>
                                    {cfg.label}
                                </span>
                            </div>
                        </div>

                        <div className="px-6 py-5 space-y-4">
                            <div>
                                <label className="block text-[12px] font-semibold text-zinc-500 uppercase tracking-wide mb-2.5">Select New Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {statusOptions.map(opt => (
                                        <button key={opt.value} onClick={() => setNewStatus(opt.value)}
                                            className={`py-2.5 rounded-xl text-[13px] font-semibold border transition-all cursor-pointer ${
                                                newStatus === opt.value
                                                    ? "bg-cyan-500 text-white border-cyan-500 shadow-sm shadow-cyan-100"
                                                    : `bg-white text-zinc-600 border-zinc-200 ${opt.color}`
                                            }`}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[12px] font-semibold text-zinc-500 uppercase tracking-wide mb-2">
                                    Admin Note <span className="text-zinc-300 font-normal normal-case">(optional)</span>
                                </label>
                                <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)}
                                    placeholder="Add a reason or note for the driver..." rows={3}
                                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-[13px] text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 resize-none bg-zinc-50/50"/>
                            </div>
                        </div>

                        <div className="px-6 pb-6 flex gap-3">
                            <button onClick={closeModal}
                                className="flex-1 py-2.5 cursor-pointer rounded-xl border border-zinc-200 text-[13px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleStatusChange} disabled={updating}
                                className="flex-1 py-2.5 cursor-pointer rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-[13px] font-semibold transition-all disabled:opacity-60 shadow-sm shadow-cyan-100">
                                {updating ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ── IMAGE MODAL ── */}
            {imgModal.open && (
                <div onClick={() => setImgModal({ open: false, src: "", label: "" })}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 cursor-zoom-out">
                    <div onClick={e => e.stopPropagation()} className="relative max-w-3xl w-full cursor-default">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-white text-sm font-semibold">{imgModal.label}</p>
                            <div className="flex items-center gap-2">
                                <a href={imgModal.src} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[12px] font-semibold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                                    Open Original
                                </a>
                                <button onClick={() => setImgModal({ open: false, src: "", label: "" })}
                                    className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                            </div>
                        </div>
                        {/* Image */}
                        <img src={imgModal.src} alt={imgModal.label}
                            className="w-full max-h-[80vh] object-contain rounded-2xl border border-white/10 shadow-2xl"/>
                    </div>
                </div>
            )}

        </section>
    );
}