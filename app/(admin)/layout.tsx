"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 821) {
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
        <div className="flex bg-zinc-100/20">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {sidebarOpen && ( <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} /> )}
            <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "ml-0"}`}>
                <Header sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto pt-20 min-w-0">
                    <div className="p-7 min-w-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}