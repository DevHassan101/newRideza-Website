"use client";

import { useState } from "react";
import "./HomeBanner.css";

const HiLocationMarker = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 lg:w-5.5 lg:h-5.5" viewBox="0 0 256 256"><path fill="#06b6d4" d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32" strokeWidth="3" stroke="#06b6d4" /></svg>
);

const FiMapPin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 256 256"><path fill="#99a1af" d="M128 64a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-112a88.1 88.1 0 0 0-88 88c0 31.4 14.51 64.68 42 96.25a254.2 254.2 0 0 0 41.45 38.3a8 8 0 0 0 9.18 0a254.2 254.2 0 0 0 41.37-38.3c27.45-31.57 42-64.85 42-96.25a88.1 88.1 0 0 0-88-88m0 206c-16.53-13-72-60.75-72-118a72 72 0 0 1 144 0c0 57.23-55.47 105-72 118" strokeWidth="3" stroke="#99a1af" /></svg>
);

export default function HeroBanner() {
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropLocation, setDropLocation] = useState("");

    const handleFindRide = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Finding ride from", pickupLocation, "to", dropLocation);
    };

    return (
        <>
            <section className="hero-banner-section">
                <div className="hero-banner-image">
                    <div className="w-full hero-banner-content py-20 sm:py-30 md:py-40 lg:py-50">
                        <div className="hero-banner-box mt-25 lg:mt-10 max-w-[90%] lg:max-w-[55%] mx-auto">
                            <div className="space-y-6 flex lg:block flex-wrap justify-center items-center">
                                <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-5 py-2 lg:py-2.5 rounded-full shadow-lg">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                    <span className="text-xs lg:text-[13px] font-medium text-gray-800">
                                        The Perfect Ride Awaits
                                    </span>
                                </div>
                                <h1 className="text-[28px] lg:text-5xl text-center lg:text-left max-w-full lg:max-w-xl font-bold text-white leading-tight drop-shadow-lg">
                                    Get Where You Need To
                                    <span className="text-cyan-400"> Go, Safely</span> and
                                    <span className="text-cyan-400 pl-2.5">Affordably</span>
                                </h1>
                                <div className="bg-white rounded-[18px] shadow-2xl py-6 px-6 lg:py-6 lg:px-6 space-y-5">
                                    <h2 className="text-md lg:text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <HiLocationMarker />
                                        Add Your Location
                                    </h2>
                                    <form onSubmit={handleFindRide} className="space-y-4">
                                        <div className="relative">
                                            <FiMapPin />
                                            <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}
                                                placeholder="Enter Pickup Location" className="w-full pl-12 text-[15px] lg:text-lg pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" />
                                        </div>
                                        <div className="relative">
                                            <FiMapPin />
                                            <input type="text" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)}
                                                placeholder="Enter Drop Location" className="w-full pl-12 text-[15px] lg:text-lg pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" />
                                        </div>
                                        <button type="submit" className="w-full bg-linear-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-[15px] lg:text-lg py-4 rounded-xl
                                            hover:from-cyan-600 hover:to-cyan-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group">
                                            <span className="flex items-center justify-center gap-2">
                                                Find Ride
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </span>
                                        </button>
                                    </form>
                                </div>
                                <div className="hidden w-full lg:grid grid-cols-3 gap-4">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-[14px] px-4 py-3.5 lg:p-5 text-center shadow-lg">
                                        <p className="text-[18px] lg:text-2xl font-bold text-cyan-600">1000+</p>
                                        <p className="text-xs text-gray-600 mt-1">Daily Rides</p>
                                    </div>
                                    <div className="bg-white/95 backdrop-blur-sm rounded-[14px] px-4 py-3.5 lg:p-5 text-center shadow-lg">
                                        <p className="text-[18px] lg:text-2xl font-bold text-cyan-600">500+</p>
                                        <p className="text-xs text-gray-600 mt-1">Drivers</p>
                                    </div>
                                    <div className="bg-white/95 backdrop-blur-sm rounded-[14px] px-4 py-3.5 lg:p-5 text-center shadow-lg">
                                        <p className="text-[18px] lg:text-2xl font-bold text-cyan-600">4.8 ★</p>
                                        <p className="text-xs text-gray-600 mt-1">Rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}