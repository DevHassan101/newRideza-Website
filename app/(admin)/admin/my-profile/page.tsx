"use client";

import { useState, useEffect } from "react";

interface AdminUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-zinc-500 uppercase tracking-wide">{label}</label>
            {children}
        </div>
    );
}

const inputCls = "w-full border border-zinc-200 bg-zinc-50 rounded-xl px-4 py-2.5 text-[13.5px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all";

export default function MyProfilePage() {
    const [user,    setUser]    = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving,  setSaving]  = useState(false);
    const [success, setSuccess] = useState("");
    const [error,   setError]   = useState("");

    // form fields
    const [name,     setName]     = useState("");
    const [email,    setEmail]    = useState("");
    const [phone,    setPhone]    = useState("");
    const [currPass, setCurrPass] = useState("");
    const [newPass,  setNewPass]  = useState("");
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(r => r.json())
            .then(data => {
                const u = data.user;
                setUser(u);
                setName(u?.name  ?? "");
                setEmail(u?.email ?? "");
                setPhone(u?.phone ?? "");
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setError(""); setSuccess(""); setSaving(true);
        try {
            const body: Record<string, string> = { name, email, phone };
            if (newPass) { body.currentPassword = currPass; body.newPassword = newPass; }

            const res  = await fetch("/api/auth/me", {
                method:  "PATCH",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(body),
            });
            const data = await res.json();

            if (!res.ok) { setError(data.error || "Update failed"); return; }

            setSuccess("Profile updated successfully!");
            setUser(data.user);
            setCurrPass(""); setNewPass("");
            setTimeout(() => setSuccess(""), 3000);
        } catch {
            setError("Something went wrong");
        } finally { setSaving(false); }
    };

    const fmtDate = (d?: string) => {
        if (!d) return "—";
        const date = new Date(d);
        if (isNaN(date.getTime())) return "—";
        return date.toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" });
    };

    return (
        <section className="space-y-5 max-w-2xl mx-auto">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-800">My Profile</h2>
                <p className="text-sm text-zinc-400 mt-0.5">Update your admin account details</p>
            </div>

            {/* Avatar card */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
                {loading ? (
                    <>
                        <div className="w-16 h-16 rounded-2xl bg-zinc-200 animate-pulse shrink-0"/>
                        <div className="space-y-2">
                            <div className="h-5 w-36 bg-zinc-200 rounded animate-pulse"/>
                            <div className="h-3.5 w-48 bg-zinc-200 rounded animate-pulse"/>
                            <div className="h-3 w-24 bg-zinc-200 rounded animate-pulse"/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-black text-white text-2xl shrink-0 shadow-md shadow-cyan-200">
                            {user?.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                        <div>
                            <p className="text-lg font-bold text-zinc-800">{user?.name}</p>
                            <p className="text-sm text-zinc-400">{user?.email}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[11px] font-bold text-purple-600 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-lg">{user?.role}</span>
                                <span className="text-[11px] text-zinc-400">Since {fmtDate(user?.createdAt)}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Edit form */}
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-100">
                    <p className="text-[13px] font-bold text-zinc-800">Account Information</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Update your personal details</p>
                </div>
                <div className="p-6 space-y-4">
                    {loading ? (
                        <div className="space-y-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="space-y-1.5">
                                    <div className="h-3 w-16 bg-zinc-200 rounded animate-pulse"/>
                                    <div className="h-10 bg-zinc-100 rounded-xl animate-pulse"/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Full Name">
                                    <input value={name} onChange={e => setName(e.target.value)}
                                        placeholder="Your name" className={inputCls}/>
                                </Field>
                                <Field label="Phone">
                                    <input value={phone} onChange={e => setPhone(e.target.value)}
                                        placeholder="Phone number" className={inputCls}/>
                                </Field>
                            </div>
                            <Field label="Email Address">
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="admin@rideza.com" className={inputCls}/>
                            </Field>
                        </>
                    )}
                </div>
            </div>

            {/* Password form */}
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-100">
                    <p className="text-[13px] font-bold text-zinc-800">Change Password</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Leave blank to keep current password</p>
                </div>
                <div className="p-6 space-y-4">
                    <Field label="Current Password">
                        <div className="relative">
                            <input type={showPass ? "text" : "password"} value={currPass}
                                onChange={e => setCurrPass(e.target.value)}
                                placeholder="Enter current password" className={inputCls + " pr-10"}/>
                            <button type="button" onClick={() => setShowPass(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                                {showPass
                                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                }
                            </button>
                        </div>
                    </Field>
                    <Field label="New Password">
                        <input type={showPass ? "text" : "password"} value={newPass}
                            onChange={e => setNewPass(e.target.value)}
                            placeholder="Min 6 characters" className={inputCls}/>
                    </Field>
                </div>
            </div>

            {/* Feedback */}
            {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-[12.5px] text-red-600 font-medium">{error}</p>
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-[12.5px] text-emerald-600 font-medium">{success}</p>
                </div>
            )}

            {/* Save button */}
            <button onClick={handleSave} disabled={saving || loading}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-[13.5px] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-cyan-200 flex items-center justify-center gap-2">
                {saving ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                        Saving...
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                        </svg>
                        Save Changes
                    </>
                )}
            </button>
        </section>
    );
}