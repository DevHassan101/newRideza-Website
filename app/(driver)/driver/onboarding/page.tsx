"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepProgress from "../_components/shared/StepProgress";
import UploadBox    from "../_components/shared/UploadBox";
import { saveStep1, loadStep1 } from "../lib/FormStore";
import { useDriver } from "../lib/DriverContext";

export default function OnboardingPage() {
    const router = useRouter();
    const { driver, loading } = useDriver();

    const [photo, setPhoto] = useState("");
    const [form, setForm] = useState({
        name:  "",
        dob:   "",
        email: "",
        phone: "",
        city:  "",
    });

    const isValid = form.dob;

    // ✅ allDone check — DB mein sab data hai?
    const allDone = !!(driver?.driverProfile?.aadhaarFrontPic && driver?.driverProfile?.licensePic);

    // ── Pre-fill: FormStore check karo, phir DB data ──
    useEffect(() => {
        const saved = loadStep1();

        if (saved.name) {
            setPhoto(saved.profilePic ?? "");
            setForm({
                name:  saved.name  ?? "",
                dob:   saved.dob   ?? "",
                email: saved.email ?? "",
                phone: saved.phone ?? "",
                city:  saved.city  ?? "",
            });
            return;
        }

        if (driver) {
            setPhoto(driver.driverProfile?.profilePic ?? "");
            setForm({
                name:  driver.name ?? "",
                dob:   driver.driverProfile?.dateOfBirth
                           ? new Date(driver.driverProfile.dateOfBirth).getFullYear().toString()
                           : "",
                email: driver.email ?? "",
                phone: driver.phone ?? "",
                city:  driver.driverProfile?.city ?? "",
            });
        }
    }, [driver]);

    const handleNext = () => {
        saveStep1({
            profilePic: photo,
            name:       form.name,
            dob:        form.dob,
            email:      form.email,
            phone:      form.phone,
            city:       form.city,
        });
        router.push("/driver/onboarding/aadhaar");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-zinc-200">
                <div className="flex items-center gap-3 px-4 py-4">
                    <button onClick={() => router.push("/driver/home")}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-base font-bold text-gray-900">Edit Profile</h1>
                        <p className="text-[11px] text-gray-400">Complete all 3 steps to save</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                {/* ✅ completed prop pass karo */}
                <StepProgress current={1} completed={allDone}/>

                <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

                    {/* Profile Photo */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-cyan-100 text-cyan-500 rounded-lg flex items-center justify-center">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                    <circle cx="12" cy="13" r="3" strokeWidth={2}/>
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-gray-800">Profile Photo</p>
                            {photo && <span className="ml-auto text-[10px] font-bold text-cyan-500 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-full">Uploaded ✓</span>}
                        </div>
                        <UploadBox value={photo} onChange={setPhoto}/>
                    </div>

                    {/* Full Name */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Full Name</p>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3.5">
                            <div className="w-8 h-8 bg-cyan-50 text-cyan-400 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Full Name</label>
                                <input
                                    className="w-full text-sm text-gray-800 font-medium outline-none bg-transparent placeholder-gray-300"
                                    placeholder="e.g. Arjun Sharma"
                                    value={form.name}
                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* DOB */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Date of Birth</p>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3.5">
                            <div className="w-8 h-8 bg-cyan-100 text-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={1.8}/>
                                    <path strokeLinecap="round" strokeWidth={1.8} d="M16 2v4M8 2v4M3 10h18"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Birth Year</label>
                                <select className="w-full text-sm text-gray-800 font-medium outline-none bg-transparent appearance-none"
                                    value={form.dob} onChange={e => setForm(p => ({ ...p, dob: e.target.value }))}>
                                    <option value="">Select year</option>
                                    {Array.from({ length: 50 }, (_, i) => 2006 - i).map(y => <option key={y}>{y}</option>)}
                                </select>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Contact Info</p>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
                            <div className="w-8 h-8 bg-cyan-50 text-cyan-400 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Email</label>
                                <input
                                    type="email"
                                    className="w-full text-sm text-gray-800 font-medium outline-none bg-transparent placeholder-gray-300"
                                    placeholder="e.g. arjun@gmail.com"
                                    value={form.email}
                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
                            <div className="w-8 h-8 bg-cyan-50 text-cyan-400 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Phone</label>
                                <input
                                    type="tel"
                                    className="w-full text-sm text-gray-800 font-medium outline-none bg-transparent placeholder-gray-300"
                                    placeholder="e.g. +91 98765 43210"
                                    value={form.phone}
                                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div className="flex items-center gap-3 px-4 py-3.5">
                            <div className="w-8 h-8 bg-cyan-50 text-cyan-400 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">City</label>
                                <input
                                    className="w-full text-sm text-gray-800 font-medium outline-none bg-transparent placeholder-gray-300"
                                    placeholder="e.g. Mumbai"
                                    value={form.city}
                                    onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    <button onClick={handleNext} disabled={!isValid}
                        className={"w-full font-bold py-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 " +
                            (isValid
                                ? "bg-linear-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-200"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed")}>
                        Next: Aadhaar Card
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}