"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
    sidebarOpen: boolean;
    onToggle: () => void;
}

export default function Header({ sidebarOpen, onToggle }: HeaderProps) {
    const [searchValue, setSearchValue] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Outside click se close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <header className={`fixed top-0 right-0 h-20.25 bg-white border-b border-zinc-200 shadow-xs flex items-center px-6 gap-4 z-30 transition-all duration-300 
            ${sidebarOpen ? "md:left-72 left-0" : "left-0"}`}>

            {/* Hamburger */}
            <button onClick={onToggle} className="w-10 h-10 cursor-pointer rounded-[10px] border border-zinc-200 bg-zinc-50 hover:border-cyan-300 hover:bg-cyan-50 flex items-center justify-center text-zinc-500 hover:text-cyan-500 transition-all duration-200 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Title */}
            <div className="flex-1">
                <h1 className="text-[17px] font-bold text-zinc-800 tracking-tight leading-none">Dashboard</h1>
                <p className="text-xs text-zinc-400 tracking-wide mt-0.5">Welcome back, Admin 👋</p>
            </div>

            {/* Avatar Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-2 rounded-xl hover:bg-cyan-50 border border-transparent hover:border-cyan-200 cursor-pointer transition-all duration-200 group"
                >
                    <div className="w-8.5 h-8.5 rounded-lg bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-cyan-200">
                        A
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-bold text-zinc-800 leading-none">Admin</p>
                        <p className="text-xs text-zinc-400 mt-0.5">admin@gmail.com</p>
                    </div>
                    <svg className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-zinc-100 rounded-2xl shadow-xl shadow-zinc-100 py-2 z-50">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-zinc-100">
                            <p className="text-[13px] font-bold text-zinc-800">Admin</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">admin@rideza.com</p>
                        </div>

                        {/* Profile */}
                        <button
                            onClick={() => { router.push("/admin/settings"); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
                        >
                            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Profile
                        </button>

                        {/* Settings */}
                        <button
                            onClick={() => { router.push("/admin/settings"); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
                        >
                            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </button>

                        <div className="border-t border-zinc-100 mt-1 pt-1">
                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}