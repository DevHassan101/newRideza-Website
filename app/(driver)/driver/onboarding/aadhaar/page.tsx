"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepProgress from "../../_components/shared/StepProgress";
import UploadBox    from "../../_components/shared/UploadBox";
import { saveStep2, loadStep2 } from "../../lib/FormStore";
import { useDriver } from "../../lib/DriverContext"; // ✅ NEW

export default function AadhaarPage() {
    const router = useRouter();
    const { driver, loading } = useDriver(); // ✅ NEW

    const [front, setFront] = useState("");
    const [back,  setBack]  = useState("");
    const bothUploaded = front && back;

    // ✅ allDone check
    const allDone = !!(driver?.driverProfile?.aadhaarFrontPic && driver?.driverProfile?.licensePic);

    // ── Pre-fill: FormStore pehle, phir DB ──
    useEffect(() => {
        const saved = loadStep2();

        // FormStore mein data hai toh woh use karo
        if (saved.aadhaarFrontPic || saved.aadhaarBackPic) {
            if (saved.aadhaarFrontPic) setFront(saved.aadhaarFrontPic);
            if (saved.aadhaarBackPic)  setBack(saved.aadhaarBackPic);
            return;
        }

        // DB se pre-fill karo
        if (driver) {
            if (driver.driverProfile?.aadhaarFrontPic) setFront(driver.driverProfile.aadhaarFrontPic);
            if (driver.driverProfile?.aadhaarBackPic)  setBack(driver.driverProfile.aadhaarBackPic);
        }
    }, [driver]);

    const handleNext = () => {
        saveStep2({ aadhaarFrontPic: front, aadhaarBackPic: back });
        router.push("/driver/onboarding/license");
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"/>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-zinc-200">
                <div className="flex items-center gap-3 px-4 py-4">
                    <button onClick={() => router.push("/driver/onboarding")}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-base font-bold text-gray-900">Aadhaar Card</h1>
                        <p className="text-[11px] text-gray-400">Front aur back dono upload karo</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <StepProgress current={2} completed={allDone} />

                <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

                    {/* Front */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-cyan-100 text-cyan-500 rounded-lg flex items-center justify-center">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2}/>
                                    <path strokeLinecap="round" strokeWidth={2} d="M7 9h4M7 13h8"/>
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-gray-800">Front Side</p>
                            {front && <span className="ml-auto text-[10px] font-bold text-cyan-500 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-full">Uploaded ✓</span>}
                        </div>
                        <UploadBox value={front} onChange={setFront}/>
                    </div>

                    {/* Back */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-violet-100 text-violet-500 rounded-lg flex items-center justify-center">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2}/>
                                    <path strokeLinecap="round" strokeWidth={2} d="M7 9h8M7 13h4"/>
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-gray-800">Back Side</p>
                            {back && <span className="ml-auto text-[10px] font-bold text-cyan-500 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-full">Uploaded ✓</span>}
                        </div>
                        <UploadBox value={back} onChange={setBack}/>
                    </div>

                    {/* Upload progress */}
                    <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3.5 flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                                style={{ width: `${(front ? 50 : 0) + (back ? 50 : 0)}%` }}/>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{(front ? 1 : 0) + (back ? 1 : 0)}/2 uploaded</span>
                    </div>

                    {/* Tip */}
                    <div className="flex items-start gap-3 px-4 py-3.5 bg-cyan-50 border border-cyan-100 rounded-2xl">
                        <div className="w-8 h-8 bg-cyan-100 text-cyan-500 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-cyan-700">Photo Guidelines</p>
                            <p className="text-[11px] text-cyan-500 mt-0.5">Clear aur well-lit photo lo. Sab text readable hona chahiye.</p>
                        </div>
                    </div>

                    <button onClick={handleNext} disabled={!bothUploaded}
                        className={"w-full font-bold py-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 " +
                            (bothUploaded
                                ? "bg-linear-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-200"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed")}>
                        Next: Driving License
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}