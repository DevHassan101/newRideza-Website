"use client";

import { useState, useEffect } from "react";

const HiLocationMarker = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 256 256"><path fill="#06b6d4" d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32" strokeWidth="3" stroke="#06b6d4" /></svg>
);

const FiMapPin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 256 256"><path fill="#99a1af" d="M128 64a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-112a88.1 88.1 0 0 0-88 88c0 31.4 14.51 64.68 42 96.25a254.2 254.2 0 0 0 41.45 38.3a8 8 0 0 0 9.18 0a254.2 254.2 0 0 0 41.37-38.3c27.45-31.57 42-64.85 42-96.25a88.1 88.1 0 0 0-88-88m0 206c-16.53-13-72-60.75-72-118a72 72 0 0 1 144 0c0 57.23-55.47 105-72 118" strokeWidth="3" stroke="#99a1af" /></svg>
);

export default function HeroBanner() {
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropLocation, setDropLocation] = useState("");
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const services = [
        {
            id: 1,
            category: "Economy Category",
            name: "Bike",
            image: "/images/serv3.webp",
            description: "Experience luxury and comfort with our premium Business Class service. Perfect for executives and professionals who value style, punctuality, and a smooth ride experience.",
            price: "₹29",
            eta: "2 min",
            available: true
        },
        {
            id: 2,
            category: "Local Transport",
            name: "Auto",
            image: "/images/serv6.png",
            description: "Experience luxury and comfort with our premium Business Class service. Perfect for executives and professionals who value style, punctuality, and a smooth ride experience.",
            price: "₹49",
            eta: "3 min",
            available: true
        },
        {
            id: 3,
            category: "Shared Ride",
            name: "Auto Share",
            image: "/images/serv5.webp",
            description: "Experience luxury and comfort with our premium Business Class service. Perfect for executives and professionals who value style, punctuality, and a smooth ride experience.",
            price: "₹25",
            eta: "4 min",
            available: true
        },
        {
            id: 4,
            category: "Delivery Service",
            name: "Parcel",
            image: "/images/serv4.webp",
            description: "Experience luxury and comfort with our premium Business Class service. Perfect for executives and professionals who value style, punctuality, and a smooth ride experience..",
            price: "₹39",
            eta: "15 min",
            available: true
        },
        {
            id: 5,
            category: "Standard Category",
            name: "Cab Economy",
            image: "/images/serv1.webp",
            description: "Experience luxury and comfort with our premium Business Class service. Perfect for executives and professionals who value style, punctuality, and a smooth ride experience.",
            price: "₹99",
            eta: "5 min",
            available: true
        },
        {
            id: 6,
            category: "Premium Category",
            name: "Cab Premium",
            image: "/images/serv2.png",
            description: "Experience luxury and comfort with our premium Business Class service. Perfect for executives and professionals who value style, punctuality, and a smooth ride experience.",
            price: "₹499",
            eta: "5 min",
            available: true
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentServiceIndex((prevIndex) =>
                    (prevIndex + 1) % services.length
                );
                setIsTransitioning(false);
            }, 300);

        }, 4000);

        return () => clearInterval(interval);
    }, [services.length]);

    const handleFindRide = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Finding ride from", pickupLocation, "to", dropLocation);
    };

    const currentService = services[currentServiceIndex];

    return (
        <>
            <section className="hero-banner">
                <div className="hero-image relative h-[200vh] md:h-[140vh] lg:h-auto">
                    <img src="/images/herobanner2.avif" className="h-full lg:h-auto" alt="hero-banner" />
                    <div className="hero-image-overlay w-full px-5 md:px-15 lg:px-30 absolute top-0 left-0 h-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 40%, rgba(6,182,212,0.5) 70%, rgba(34,211,238,0.4) 100%)' }}>
                        <div className="hero-overlay w-full flex flex-wrap justify-between items-center mt-24">
                            <div className="hero-box1 basis-full lg:basis-[37%] px-0 md:px-15 lg:px-0">
                                <div className={`relative bg-white rounded-[20px] py-7 px-7 shadow-2xl w-full h-auto lg:h-160 overflow-hidden transition-opacity duration-300 
                                    ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-cyan-400 to-cyan-500 opacity-10 rounded-br-full"></div>
                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-cyan-400 to-cyan-500 opacity-10 rounded-tl-full"></div>
                                    <div className="flex justify-between items-center mb-1 relative z-10">
                                        <div>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                {currentService.category}
                                            </span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className={`w-2 h-2 ${currentService.available ? 'bg-green-500' : 'bg-red-500'} rounded-full animate-pulse`}></div>
                                                <span className={`text-xs ${currentService.available ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                                    {currentService.available ? 'Available Now' : 'Not Available'}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="bg-linear-to-r from-cyan-400 to-cyan-500 text-white font-semibold py-2 px-5 rounded-full text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-cyan-500 hover:to-cyan-600">
                                            Book Now
                                        </button>
                                    </div>
                                    <div className="relative my-3 h-48">
                                        <div className="absolute inset-0 bg-linear-to-t from-cyan-50 to-transparent rounded-2xl"></div>
                                        <div className="flex justify-center items-center h-full relative z-10">
                                            <img src={currentService.image} className="max-w-full max-h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                                alt={currentService.name} />
                                        </div>
                                    </div>
                                    <div className="space-y-5 lg:space-y-2 relative z-10">
                                        <div>
                                            <h2 className="text-[28px] font-bold text-gray-900 mb-0.5">
                                                {currentService.name}
                                            </h2>
                                            <div className="w-14 h-1 bg-linear-to-r from-cyan-400 to-cyan-500 rounded-full"></div>
                                        </div>
                                        <div className="h-20">
                                            <p className="text-sm text-gray-600 line-clamp-3 lg:line-clamp-none leading-relaxed pt-1">
                                                {currentService.description}
                                            </p>
                                        </div>
                                        <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Starting from</div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-bold text-gray-900">
                                                            {currentService.price}
                                                        </span>
                                                        <span className="text-sm text-gray-500">/ride</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-500 mb-1">ETA</div>
                                                    <div className="text-lg font-bold text-cyan-500">
                                                        {currentService.eta}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <button className="w-full bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] flex items-center justify-center gap-2">
                                                    <span>Book Your Ride</span>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-linear-to-r from-transparent via-cyan-500 to-transparent"></div>
                                    <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
                                        {services.map((_, index) => (
                                            <div key={index} className={`h-1.5 rounded-full transition-all duration-300 
                                                ${index === currentServiceIndex ? 'w-6 bg-cyan-500' : 'w-1.5 bg-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hero-box2 basis-full lg:basis-[61%] mt-15 lg:mt-0 pl-0 lg:pl-5">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                        <span className="text-xs lg:text-[13px] font-medium text-gray-800">
                                            The Perfect Ride Awaits
                                        </span>
                                    </div>
                                    <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                                        Get Where You Need To
                                        <br />
                                        <span className="text-cyan-400">Go, Safely</span> and
                                        <span className="text-cyan-400 pl-2.5">Affordably</span>
                                    </h1>
                                    <div className="bg-white rounded-[18px] shadow-2xl p-6 space-y-5">
                                        <h2 className="text-[17px] lg:text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <HiLocationMarker />
                                            Add Your Location
                                        </h2>
                                        <form onSubmit={handleFindRide} className="space-y-4">
                                            <div className="relative">
                                                <FiMapPin/>
                                                <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}
                                                    placeholder="Enter Pickup Location" className="w-full pl-12 text-[17px] lg:text-lg pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" />
                                            </div>
                                            <div className="relative">
                                                <FiMapPin/>
                                                <input type="text" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)}
                                                    placeholder="Enter Drop Location" className="w-full pl-12 text-[17px] lg:text-lg pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" />
                                            </div>
                                            <button type="submit" className="w-full bg-linear-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-[17px] lg:text-lg py-4 rounded-xl
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
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-[14px] p-4 lg:p-5 text-center shadow-lg">
                                            <p className="text-xl lg:text-2xl font-bold text-cyan-600">1000+</p>
                                            <p className="text-xs text-gray-600 mt-1">Daily Rides</p>
                                        </div>
                                        <div className="bg-white/95 backdrop-blur-sm rounded-[14px] p-4 lg:p-5 text-center shadow-lg">
                                            <p className="text-xl lg:text-2xl font-bold text-cyan-600">500+</p>
                                            <p className="text-xs text-gray-600 mt-1">Drivers</p>
                                        </div>
                                        <div className="bg-white/95 backdrop-blur-sm rounded-[14px] p-4 lg:p-5 text-center shadow-lg">
                                            <p className="text-xl lg:text-2xl font-bold text-cyan-600">4.8 ★</p>
                                            <p className="text-xs text-gray-600 mt-1">Rating</p>
                                        </div>
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