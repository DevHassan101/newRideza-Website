"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepProgress from "../../_components/shared/StepProgress";
import UploadBox from "../../_components/shared/UploadBox";
import { saveStep3, loadStep3, collectAll, clearAll } from "../../lib/FormStore";
import { useDriver } from "../../lib/DriverContext";

export default function LicensePage() {
    const router = useRouter();
    const { driver, loading, refreshDriver } = useDriver(); // ✅ driver add

    const [licensePic,    setLicensePic]    = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [licenseExpiry, setLicenseExpiry] = useState("");
    const [saving,        setSaving]        = useState(false);
    const [done,          setDone]          = useState(false);
    const [error,         setError]         = useState("");

    const isValid = licensePic && licenseNumber.trim() && licenseExpiry;

    const allDone = !!(driver?.driverProfile?.aadhaarFrontPic && driver?.driverProfile?.licensePic);

    // ── Pre-fill: FormStore pehle, phir DB ──
    useEffect(() => {
        const saved = loadStep3();

        // FormStore mein data hai toh woh use karo
        if (saved.licensePic || saved.licenseNumber || saved.licenseExpiry) {
            if (saved.licensePic)    setLicensePic(saved.licensePic);
            if (saved.licenseNumber) setLicenseNumber(saved.licenseNumber);
            if (saved.licenseExpiry) setLicenseExpiry(saved.licenseExpiry);
            return;
        }

        // DB se pre-fill karo
        if (driver) {
            if (driver.driverProfile?.licensePic)    setLicensePic(driver.driverProfile.licensePic);
            if (driver.driverProfile?.licenseNumber) setLicenseNumber(driver.driverProfile.licenseNumber);
            if (driver.driverProfile?.licenseExpiry) {
                // DateTime → YYYY-MM-DD
                setLicenseExpiry(new Date(driver.driverProfile.licenseExpiry).toISOString().split("T")[0]);
            }
        }
    }, [driver]);

    const handleSave = async () => {
        if (!isValid || saving) return;
        setSaving(true);
        setError("");

        saveStep3({ licensePic, licenseNumber, licenseExpiry });
        const all = collectAll();

        try {
            const res = await fetch("/api/driver/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(all),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Kuch ghalat ho gaya, dobara try karo");
                setSaving(false);
                return;
            }

            clearAll();
            await refreshDriver();
            setDone(true);

        } catch {
            setError("Network error — internet check karo");
            setSaving(false);
        }
    };

    if (done) return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-sm w-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <h2 className="text-xl font-black text-gray-900">All Saved!</h2>
                <p className="text-gray-400 text-sm mt-2">Your profile has been updated successfully.</p>
                <button onClick={() => router.push("/driver/home")}
                    className="mt-6 w-full bg-linear-to-r from-cyan-500 to-cyan-400 text-white font-bold py-4 rounded-2xl text-sm shadow-lg shadow-cyan-200">
                    Back to Dashboard
                </button>
            </div>
        </div>
    );

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"/>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="sticky top-0 z-10 bg-white border-b border-zinc-200">
                <div className="flex items-center gap-3 px-4 py-4">
                    <button onClick={() => router.push("/driver/onboarding/aadhaar")}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-base font-bold text-gray-900">Driving License</h1>
                        <p className="text-[11px] text-gray-400">Last step — almost done!</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">

                <StepProgress current={3} completed={allDone} />

                <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-cyan-100 text-cyan-500 rounded-lg flex items-center justify-center">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2}/>
                                    <circle cx="8" cy="11" r="2" strokeWidth={1.8}/>
                                    <path strokeLinecap="round" strokeWidth={1.8} d="M13 10h4M13 13h3"/>
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-gray-800">License Photo</p>
                            {licensePic && <span className="ml-auto text-[10px] font-bold text-cyan-500 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-full">Uploaded ✓</span>}
                        </div>
                        <UploadBox value={licensePic} onChange={setLicensePic} height="h-52"/>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">License Details</p>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
                            <div className="w-8 h-8 bg-cyan-50 text-cyan-400 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">License Number</label>
                                <input
                                    className="w-full text-sm text-gray-800 font-medium outline-none bg-transparent placeholder-gray-300 uppercase"
                                    placeholder="e.g. MH0120230012345"
                                    value={licenseNumber}
                                    onChange={e => setLicenseNumber(e.target.value.toUpperCase())}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3.5">
                            <div className="w-8 h-8 bg-cyan-100 text-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={1.8}/>
                                    <path strokeLinecap="round" strokeWidth={1.8} d="M16 2v4M8 2v4M3 10h18"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Expiry Date</label>
                                <input
                                    type="date"
                                    className="w-full text-sm text-gray-800 font-medium outline-none bg-transparent"
                                    value={licenseExpiry}
                                    onChange={e => setLicenseExpiry(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">License mein yeh hona chahiye</p>
                        </div>
                        {[
                            { text: "License number clearly visible", color: "bg-cyan-100 text-cyan-500"      },
                            { text: "Driver ka naam aur photo",        color: "bg-violet-100 text-violet-500"  },
                            { text: "Expiry date readable",            color: "bg-emerald-100 text-emerald-500"},
                        ].map((item, i) => (
                            <div key={i} className={"flex items-center gap-3 px-4 py-3" + (i > 0 ? " border-t border-gray-100" : "")}>
                                <div className={"w-6 h-6 rounded-lg flex items-center justify-center shrink-0 " + item.color}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-600 font-medium">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-start gap-3 px-4 py-3.5 bg-cyan-50 border border-cyan-100 rounded-2xl">
                        <div className="w-8 h-8 bg-cyan-100 text-cyan-500 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-cyan-700">Document Guidelines</p>
                            <p className="text-[11px] text-cyan-500 mt-0.5">Clear aur well-lit photo lo. Sab text readable hona chahiye.</p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-red-500 font-medium">
                            {error}
                        </div>
                    )}

                    <button onClick={handleSave} disabled={!isValid || saving}
                        className={"w-full font-bold py-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 " +
                            (isValid && !saving
                                ? "bg-linear-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-200"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed")}>
                        {saving ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                </svg>
                                Save All & Finish
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}