// import React from "react";

// const SettingsIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
//         <circle cx="12" cy="12" r="3" />
//         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
//     </svg>
// );

// const ZapIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
//         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//     </svg>
// );

// const SearchIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
//         <circle cx="11" cy="11" r="8" />
//         <line x1="21" y1="21" x2="16.65" y2="16.65" />
//     </svg>
// );

// const DollarIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
//         <line x1="12" y1="1" x2="12" y2="23" />
//         <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//     </svg>
// );

// const MapPinIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
//         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//         <circle cx="12" cy="10" r="3" />
//     </svg>
// );

// const HeadphonesIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
//         <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
//         <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
//         <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
//     </svg>
// );

// interface FeatureItem {
//     icon: React.ReactNode;
//     title: string;
//     description: string;
// }

// const featuresLeft: FeatureItem[] = [
//     {
//         icon: <SettingsIcon />,
//         title: "Ride Customize",
//         description: "Tailor your ride experience to your exact preferences with our smart customization options.",
//     },
//     {
//         icon: <SearchIcon />,
//         title: "Easy to Search",
//         description: "Find your nearest available ride in seconds with our real-time smart search system.",
//     },
//     {
//         icon: <DollarIcon />,
//         title: "Fixable Rate",
//         description: "Transparent pricing with no hidden charges. Know your fare before you even book.",
//     },
// ];

// const featuresRight: FeatureItem[] = [
//     {
//         icon: <ZapIcon />,
//         title: "Quick Pickup",
//         description: "Our drivers reach your location in minutes. No long waits, just instant pickups.",
//     },
//     {
//         icon: <MapPinIcon />,
//         title: "GPS Tracking",
//         description: "Track your ride in real-time. Share your trip with family for extra peace of mind.",
//     },
//     {
//         icon: <HeadphonesIcon />,
//         title: "Quick Support",
//         description: "24/7 dedicated support team ready to assist you anytime, anywhere, instantly.",
//     },
// ];

// function FeatureCard({ item, align }: { item: FeatureItem; align: "left" | "right" }) {
//     const isRight = align === "right";

//     return (
//         <div className={`flex items-start gap-4 group ${isRight ? "flex-row-reverse" : "flex-row"}`}>
//             <div className="relative shrink-0">
//                 <div className="w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-[6deg] group-hover:shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-500">
//                     {item.icon}
//                 </div>
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm shadow-cyan-400" />
//             </div>
//             <div className={`${isRight ? "text-right" : "text-left"} flex-1`}>
//                 <h4 className="text-gray-900 font-bold text-[16px] mb-1.5 group-hover:text-cyan-600 transition-colors duration-300">
//                     {item.title}
//                 </h4>
//                 <p className="text-gray-500 text-[13.5px] leading-relaxed">
//                     {item.description}
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default function LatestFeatures() {
//     return (
//         <section className="relative py-16 md:py-20 px-4 md:px-8 lg:px-20 overflow-hidden bg-linear-to-b from-white to-gray-50">
//             <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
//             <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

//             <div className="max-w-6xl mx-auto relative z-10">
//                 <div className="services-header text-center relative">
//                     <div className="inline-flex items-center gap-3 text-xs md:text-sm text-white uppercase tracking-widest">
//                         <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
//                         <span className="font-semibold text-cyan-400">Latest Features</span>
//                         <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
//                     </div>
//                     <div className="mt-5 md:mt-6 px-3 md:px-0 text-[28px] md:text-3xl lg:text-[40px] font-bold leading-[1.1] relative">
//                         <span className="text-black/95 inline-block hover:text-black transition-colors duration-300 mr-3">
//                             Check Out Our
//                         </span>
//                         <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
//                             Best Features
//                         </span>
//                         <div className="absolute -bottom-4 left-0 right-0 w-40 md:w-95 mx-auto h-[1.5px] bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
//                     </div>
//                     <div className="mt-8 md:mt-8.5 w-full px-4 md:px-0 md:max-w-xl mx-auto">
//                         <p className="text-[13px] md:text-[16px] text-black/80">We combine technical expertise with bold design to build products that matter crafting seamless interactions that connect brands with people.</p>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-[1fr_320px_1fr] gap-10 md:gap-6 items-center mt-15">

//                     {/* left-features */}
//                     <div className="flex flex-col gap-8">
//                         {featuresLeft.map((item) => (
//                             <FeatureCard key={item.title} item={item} align="left" />
//                         ))}
//                     </div>

//                     {/* CENTER - Car Image with glowing ring */}
//                     <div className="flex items-center justify-center order-first md:order-0">
//                         <div className="relative w-full max-w-100">
//                             {/* Outer glow ring */}
//                             <div className="absolute inset-0 rounded-full bg-linear-to-br from-cyan-400/20 to-cyan-600/10 blur-2xl scale-110" />
//                             {/* Inner ring */}
//                             <div className="absolute inset-4 rounded-full border border-cyan-400/50 animate-pulse" />
//                             <div className="absolute inset-0 rounded-full opacity-20"
//                                 style={{ backgroundImage: "radial-gradient(circle, #22d3ee 1px, transparent 1px)", backgroundSize: "16px 16px"}}/>
//                             <img src="/images/benefitscars.png" alt="CityCab Feature Car"
//                                 className="relative z-10 w-full drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
//                             {/* Floating badge - bottom */}
//                             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg shadow-cyan-500/40 whitespace-nowrap z-20">
//                                 ⚡ Smart Ride Tech
//                             </div>
//                         </div>
//                     </div>

//                     {/* right-features */}
//                     <div className="flex flex-col gap-8">
//                         {featuresRight.map((item) => (
//                             <FeatureCard key={item.title} item={item} align="right" />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";
import React, { useState, useEffect } from "react";

const SettingsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);
const ZapIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const DollarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);
const MapPinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const HeadphonesIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const featuresLeft: FeatureItem[] = [
    { icon: <SettingsIcon />, title: "Ride Customize", description: "Tailor your ride experience to your exact preferences with our smart customization options." },
    { icon: <SearchIcon />, title: "Easy to Search", description: "Find your nearest available ride in seconds with our real-time smart search system." },
    { icon: <DollarIcon />, title: "Fixable Rate", description: "Transparent pricing with no hidden charges. Know your fare before you even book." },
];
const featuresRight: FeatureItem[] = [
    { icon: <ZapIcon />, title: "Quick Pickup", description: "Our drivers reach your location in minutes. No long waits, just instant pickups." },
    { icon: <MapPinIcon />, title: "GPS Tracking", description: "Track your ride in real-time. Share your trip with family for extra peace of mind." },
    { icon: <HeadphonesIcon />, title: "Quick Support", description: "24/7 dedicated support team ready to assist you anytime, anywhere, instantly." },
];

const vehicles = [
    { image: "/images/serv3.webp", label: "Bike Ride", tag: "🏍️ Fast & Affordable", tagline: "Zip through the city in no time" },
    { image: "/images/serv6.png", label: "Auto Rickshaw", tag: "🛺 City Commute", tagline: "Perfect for short city trips" },
    { image: "/images/serv5.webp", label: "Premium Rickshaw", tag: "✨ Upgraded Comfort", tagline: "Travel in premium style" },
    { image: "/images/serv1.webp", label: "Car Ride", tag: "🚗 Comfortable Sedan", tagline: "Smooth rides for every occasion" },
    { image: "/images/serv2.png", label: "SUV Premium", tag: "🚙 Luxury SUV", tagline: "Spacious, powerful & luxurious" },
];

function VehicleStage() {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            triggerChange((active + 1) % vehicles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [active]);

    function triggerChange(idx: number) {
        if (idx === active) return;
        setVisible(false);
        setTimeout(() => {
            setActive(idx);
            setVisible(true);
        }, 350);
    }

    const v = vehicles[active];

    return (
        <div className="flex items-center justify-center order-first md:order-0">
            <div className="relative w-full max-w-85 lg:max-w-100 mb-10">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-cyan-300/30 to-cyan-600/10 blur-3xl scale-125 pointer-events-none" />
                <div className="relative rounded-full border-2 border-cyan-400/30 bg-linear-to-br from-cyan-50 to-white shadow-[0_0_20px_rgba(6,182,212,0.18)] overflow-hidden"
                    style={{ aspectRatio: "1/1" }}>
                    {/* Dot grid */}
                    <div className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(circle, #22d3ee 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                    {/* Slow spinning dashed ring */}
                    <div className="absolute inset-3 rounded-full border border-dashed border-cyan-300/50 pointer-events-none"
                        style={{ animation: "spin 22s linear infinite" }} />
                    {/* Middle ring pulse */}
                    <div className="absolute inset-8 rounded-full border border-cyan-400/20 animate-pulse pointer-events-none" />
                    {/* Corner glow accents */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
                    {/* ── Vehicle image with fade ── */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-10"
                        style={{
                            opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.88)",
                            transition: "opacity 0.35s ease, transform 0.35s ease"
                        }}>
                        <img src={v.image} alt={v.label} className="w-full object-contain drop-shadow-2xl" />
                    </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
                    style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>
                    <div className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold px-5 py-2 rounded-full shadow-sm shadow-cyan-500/40 whitespace-nowrap">
                        {v.tag}
                    </div>
                    <p className="text-[11px] text-cyan-500 font-semibold tracking-wide whitespace-nowrap mt-0.5">
                        {v.tagline}
                    </p>
                </div>
                {/* <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {vehicles.map((_, i) => (
                        <button key={i} onClick={() => triggerChange(i)} className={`rounded-full transition-all duration-400 
                        ${ i === active ? "w-6 h-2.5 bg-linear-to-r from-cyan-400 to-cyan-600 shadow-sm shadow-cyan-400/60"
                        : "w-2.5 h-2.5 bg-cyan-200 hover:bg-cyan-300" }`} />
                    ))}
                </div> */}
            </div>
        </div>
    );
}

function FeatureCard({ item, align }: { item: FeatureItem; align: "left" | "right" }) {
    const isRight = align === "right";
    return (
        <div className={`flex items-start gap-4 group ${isRight ? "flex-row-reverse" : "flex-row"}`}>
            <div className="relative shrink-0">
                <div className="w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-500">
                    {item.icon}
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm shadow-cyan-400" />
            </div>
            <div className={`${isRight ? "text-right" : "text-left"} flex-1`}>
                <h4 className="text-gray-900 font-bold text-[16px] mb-1.5 group-hover:text-cyan-600 transition-colors duration-300">
                    {item.title}
                </h4>
                <p className="text-gray-500 text-[13.5px] leading-relaxed">
                    {item.description}
                </p>
            </div>
        </div>
    );
}

export default function LatestFeatures() {
    return (
        <section className="bg-white relative py-10 md:py-15 px-8 lg:px-28 overflow-hidden">
            <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full relative z-10">
                {/* benefits-header-start */}
                <div className="benefits-header text-center relative">
                    <div className="inline-flex items-center gap-3 text-xs md:text-sm text-white uppercase tracking-widest">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
                        <span className="font-semibold text-cyan-400">Latest Features</span>
                        <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-5 md:mt-6 px-2 md:px-0 text-[30px] md:text-3xl lg:text-[40px] font-bold tracking-tight leading-[1.1] relative">
                        <span className="text-black/95 inline-block hover:text-black transition-colors duration-300 mr-2">Check Out Our</span>
                        <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                            Best Features
                        </span>
                        <div className="absolute -bottom-4 left-0 right-0 w-50 md:w-95 mx-auto h-[1.5px] bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-10 lg:mt-8 w-full px-1 md:px-0 md:max-w-xl mx-auto">
                        <p className="text-sm md:text-[16px] text-black/80">We combine technical expertise with bold design build products that matter interactions that connect brands with people.</p>
                    </div>
                </div>
                {/* benefits-header-end */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_340px_1fr] gap-10 md:gap-6 items-center mt-10 md:mt-20">
                    <div className="flex flex-col gap-8">
                        {featuresLeft.map((item) => (
                            <FeatureCard key={item.title} item={item} align="left" />
                        ))}
                    </div>
                    <VehicleStage />
                    <div className="flex flex-col gap-8">
                        {featuresRight.map((item) => (
                            <FeatureCard key={item.title} item={item} align="right" />
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}