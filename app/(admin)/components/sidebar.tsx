"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    {
        id: 1,
        label: "Dashboard",
        href: "/admin",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M10.995 4.68v3.88A2.44 2.44 0 0 1 8.545 11h-3.86a2.38 2.38 0 0 1-1.72-.72a2.4 2.4 0 0 1-.71-1.72V4.69a2.44 2.44 0 0 1 2.43-2.44h3.87a2.42 2.42 0 0 1 1.72.72a2.4 2.4 0 0 1 .72 1.71m10.75.01v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.73-.71a2.44 2.44 0 0 1-.71-1.73V4.69a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44m0 10.75v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.75-.69a2.42 2.42 0 0 1-.71-1.73v-3.87a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44zm-10.75.01v3.87a2.46 2.46 0 0 1-2.45 2.43h-3.86a2.42 2.42 0 0 1-2.43-2.43v-3.87A2.46 2.46 0 0 1 4.685 13h3.87a2.5 2.5 0 0 1 1.73.72a2.45 2.45 0 0 1 .71 1.73" strokeWidth="0.1" stroke="currentColor" /></svg>
        ),
    },
    {
        label: "Users Manage",
        href: "/users",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 32 32"><path fill="currentColor" d="M11.5 7.5a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0M6 6a4 4 0 1 0 0 8a4 4 0 0 0 0-8m20 0a4 4 0 1 0 0 8a4 4 0 0 0 0-8M8.5 16.5q0-.334.053-.651l-4.7 1.259a2.5 2.5 0 0 0-1.767 3.062l.906 3.38a6 6 0 0 0 7.996 4.03A7.48 7.48 0 0 1 8.5 22zm15 5.5a7.48 7.48 0 0 1-2.49 5.58q.315.124.647.213a6 6 0 0 0 7.348-4.243l.906-3.38a2.5 2.5 0 0 0-1.768-3.062l-4.696-1.259q.053.319.053.651zm-11-8a2.5 2.5 0 0 0-2.5 2.5V22a6 6 0 0 0 12 0v-5.5a2.5 2.5 0 0 0-2.5-2.5z" /></svg>
        ),
    },
    {
        label: "Rides Manage",
        href: "/admin/rides",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512"><path fill="currentColor" d="M256 21A235 235 0 0 0 21 256a235 235 0 0 0 235 235a235 235 0 0 0 235-235A235 235 0 0 0 256 21m0 82c84.393 0 153 68.607 153 153s-68.607 153-153 153s-153-68.607-153-153s68.607-153 153-153m0 18c-20.417 0-39.757 4.52-57.09 12.602C210.457 166.482 230.218 208 256 208c25.823 0 44.926-41.65 56.752-74.555C295.505 125.462 276.284 121 256 121m98.752 42.88c-27.714 21.143-61.142 52.79-53.17 77.327c7.981 24.564 53.508 29.858 88.459 30.936c.628-5.294.959-10.678.959-16.143c0-35.642-13.755-68.012-36.248-92.12m-197.729.243C134.663 188.204 121 220.477 121 256c0 5.55.34 11.018.988 16.39c34.833-.825 80.381-6.793 88.344-31.3c7.974-24.542-25.68-55.553-53.309-76.967m70.188 43.643a9 9 0 0 0-5.035 1.714a9 9 0 0 0-1.99 12.57a9 9 0 0 0 12.57 1.993a9 9 0 0 0 1.992-12.572a9 9 0 0 0-7.537-3.705m57.578 0a9 9 0 0 0-.637.004a9 9 0 0 0-6.9 3.7a9 9 0 0 0 1.992 12.573a9 9 0 0 0 12.57-1.992a9 9 0 0 0-1.99-12.57a9 9 0 0 0-5.035-1.715M256 224a32 32 0 0 0-32 32a32 32 0 0 0 32 32a32 32 0 0 0 32-32a32 32 0 0 0-32-32m-46.297 38.037a9 9 0 0 0-2.652.44a9 9 0 0 0-5.78 11.341a9 9 0 0 0 11.34 5.778a9 9 0 0 0 5.78-11.34a9 9 0 0 0-8.688-6.219m92.856.008a9 9 0 0 0-8.95 6.21a9 9 0 0 0 5.78 11.34a9 9 0 0 0 11.34-5.777a9 9 0 0 0-5.78-11.341a9 9 0 0 0-2.39-.432m-92.143 27.713c-21.59.104-50.24 16.832-72.424 31.928c19.029 34.168 52.46 59.164 92.143 66.837c9.99-33.39 18.42-78.618-2.446-93.777c-4.854-3.527-10.737-5.02-17.273-4.988m91.016.02c-6.58 0-12.492 1.516-17.346 5.042c-20.895 15.181-11.863 60.106-2.088 93.678c39.687-7.715 73.108-32.76 92.1-66.973c-22.006-15.224-50.935-31.747-72.666-31.748zM256 295.58a9 9 0 0 0-9 9a9 9 0 0 0 9 9a9 9 0 0 0 9-9a9 9 0 0 0-9-9" /></svg>
        ),
    },
    {
        label: "Drivers Manage",
        href: "/admin/drivers",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M16 14.5c0 1.1-.3 3.5-2.2 6.3L13 16l.9-1.9c-.6 0-1.2-.1-1.9-.1s-1.3.1-1.9.1L11 16l-.8 4.8C8.3 18.1 8 15.6 8 14.5c-2.4.7-4 2-4 3.5v4h16v-4c0-1.5-1.6-2.8-4-3.5M6 4.5C6 3.1 8.7 2 12 2s6 1.1 6 2.5c0 .4-.2.7-.5 1c-.9-.9-3-1.5-5.5-1.5s-4.6.6-5.5 1.5c-.3-.3-.5-.6-.5-1m9.9 2.9c.1.2.1.4.1.6c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-.2 0-.4.1-.6c1 .4 2.4.6 3.9.6s2.9-.2 3.9-.6m.7-1.3c-1.1.5-2.7.9-4.6.9s-3.5-.4-4.6-.9C8.1 5.5 9.8 5 12 5s3.9.5 4.6 1.1" strokeWidth="0.1" stroke="currentColor" /></svg>
        ),
    },
    {
        label: "Pricing Controls",
        href: "/admin/payments",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24.039 6c-4.517 0-8.632 1.492-11.067 2.711q-.33.165-.616.322c-.378.206-.7.398-.956.567l2.77 4.078l1.304.519c5.096 2.571 11.93 2.571 17.027 0l1.48-.768L36.6 9.6a16 16 0 0 0-1.689-.957C32.488 7.437 28.471 6 24.04 6m-6.442 4.616a25 25 0 0 1-2.901-.728C16.978 8.875 20.377 7.8 24.04 7.8c2.537 0 4.936.516 6.92 1.17c-2.325.327-4.806.882-7.17 1.565c-1.86.538-4.034.48-6.192.081m15.96 5.064l-.246.124c-5.606 2.828-13.042 2.828-18.648 0l-.233-.118C6.008 24.927-.422 41.997 24.039 41.997S41.913 24.61 33.557 15.68M23 24a2 2 0 1 0 0 4zm2-2v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4 4 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666A4 4 0 0 0 25 22m0 8v4a2 2 0 1 0 0-4" clipRule="evenodd" /></svg>
        ),
    },
    {
        label: "Analytics",
        href: "/admin/analytics",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11.25.023C4.972.41 0 5.624 0 12c0 3.059 1.145 5.85 3.029 7.97l8.221-8.28zm1.062 12.727l-8.219 8.277A11.95 11.95 0 0 0 12 24c6.376 0 11.59-4.972 11.977-11.25zM12.75.023C18.78.395 23.605 5.22 23.977 11.25H12.75z" clipRule="evenodd" /></svg>
        ),
    },
    {
        label: "Settings",
        href: "/admin/settings",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 256 256"><path fill="currentColor" d="M216 130.16q.06-2.16 0-4.32l14.92-18.64a8 8 0 0 0 1.48-7.06a107.6 107.6 0 0 0-10.88-26.25a8 8 0 0 0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186 40.54a8 8 0 0 0-3.94-6a107.3 107.3 0 0 0-26.25-10.86a8 8 0 0 0-7.06 1.48L130.16 40h-4.32L107.2 25.11a8 8 0 0 0-7.06-1.48a107.6 107.6 0 0 0-26.25 10.88a8 8 0 0 0-3.93 6l-2.64 23.76q-1.56 1.49-3 3L40.54 70a8 8 0 0 0-6 3.94a107.7 107.7 0 0 0-10.87 26.25a8 8 0 0 0 1.49 7.06L40 125.84v4.32L25.11 148.8a8 8 0 0 0-1.48 7.06a107.6 107.6 0 0 0 10.88 26.25a8 8 0 0 0 6 3.93l23.72 2.64q1.49 1.56 3 3L70 215.46a8 8 0 0 0 3.94 6a107.7 107.7 0 0 0 26.25 10.87a8 8 0 0 0 7.06-1.49L125.84 216q2.16.06 4.32 0l18.64 14.92a8 8 0 0 0 7.06 1.48a107.2 107.2 0 0 0 26.25-10.88a8 8 0 0 0 3.93-6l2.64-23.72q1.56-1.48 3-3l23.78-2.8a8 8 0 0 0 6-3.94a107.7 107.7 0 0 0 10.87-26.25a8 8 0 0 0-1.49-7.06ZM128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40" strokeWidth="0" stroke="currentColor" /></svg>
        ),
    },
];

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`fixed left-0 top-0 h-full w-72 bg-white border-r border-zinc-200 shadow-sm flex flex-col z-40 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
            {/* Logo */}
            <div className="px-6 py-5 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-zinc-800 leading-none tracking-tight">Rideza</h2>
                        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-0.5 font-medium">Admin Panel</p>
                    </div>
                </div>
            </div>
            {/* Nav */}
            <nav className="flex-1 px-5 py-5 space-y-3 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className={`flex items-center gap-3.5 px-2.5 py-2.5 rounded-xl transition-all duration-200 group relative 
                         ${isActive ? "bg-linear-to-r bg-cyan-500 to-cyan-400 text-white shadow-md shadow-cyan-200" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"}`}>
                            {isActive && (<span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/40 rounded-l-full" />)}
                            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-200 
                               ${isActive ? "bg-white/20 text-white" : "bg-linear-to-r from-cyan-500 to-cyan-400 text-white"}`}>
                                {item.icon}
                            </div>
                            <span className="text-[15px] font-semibold">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}