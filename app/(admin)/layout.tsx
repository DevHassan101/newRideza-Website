"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 856) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="h-screen overflow-hidden flex bg-zinc-100/10">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {/* mobile overlay */}
            {sidebarOpen && ( <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} /> )}
            {/* right-side-wrapper */}
            <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-72" : "ml-0"}`}>
                <Header sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto pt-20">
                    <div className="p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}