"use client";

import Image from "next/image";

export default function HomeServices() {
    const BikeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13.256V12H2v-2h6.365L11.2 8h3.492L13.6 5H11V3h4l1.092 3H20v3h-2.816l1.456 4.002a4.5 4.5 0 1 1-1.985.392L15.419 10h-.947l-1.582 5.87l-.002-.001l.002.005l-2.925 1.065q.035.276.035.561a4.5 4.5 0 1 1-6-4.244m2-.229a4.5 4.5 0 0 1 3.281 2.033l1.957-.713L12.403 10h-.547L9 12H6zM5.5 20a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m13 0a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5" /></svg>
    );

    const RickshawIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><path fill="currentColor" d="M20 14.05v-1.32c0-.47-.16-.93-.46-1.29L15.6 6.72c-.38-.46-.94-.72-1.54-.72H4c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h.05a2.5 2.5 0 0 0 4.9 0h8.1A2.5 2.5 0 1 0 20 14.05M3.5 8c0-.27.23-.5.5-.5h3V12H3.5zm3 9.5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m6.5-2H9V14h2v-2H9V7.5h4zm2-7.16L18.05 12H15zm4.5 9.16c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1" /></svg>
    );

    const StarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><path fill="currentColor" d="M20 12.05v-1.32c0-.47-.16-.93-.46-1.29L15.6 4.72c-.38-.46-.94-.72-1.54-.72H4c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h.05a2.5 2.5 0 0 0 4.9 0h8.1A2.5 2.5 0 1 0 20 12.05M3.5 6c0-.27.23-.5.5-.5h3V10H3.5zm3 9.5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m6.5-2H9V12h2v-2H9V5.5h4zm2-7.16L18.05 10H15zm4.5 9.16c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1M11 20H7l6 3v-2h4l-6-3z" /></svg>
    );

    const PackageIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><path fill="currentColor" d="M19 5c0-1.1-.9-2-2-2h-3v2h3v2.65L13.5 12H10V7H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.5L19 8.35zM4 12v-1c0-1.1.9-2 2-2h2v3zm3 3c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1M5 4h5v2H5zm14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m0 4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1M7 20h4v-2l6 3h-4v2z" /></svg>
    );

    const CarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M21.75 18.5a1.5 1.5 0 0 0 1.5-1.5v-4.5c0-.48-.19-.94-.53-1.279l-2.47-2.47H3.75l-2.47 2.47c-.34.34-.53.8-.53 1.279V17a1.5 1.5 0 0 0 1.5 1.5zm-18-9.749l1.723-4.6a2.165 2.165 0 0 1 2.027-1.4h9a2.17 2.17 0 0 1 2.027 1.4l1.723 4.6zm0 0l-1.5-1.5H.75m19.5 1.5l1.5-1.5h1.5M2.25 18.5V20a1.5 1.5 0 0 0 3 0v-1.5zm19.5 0V20a1.5 1.5 0 1 1-3 0v-1.5z" /><path d="M8.35 15.5a1.5 1.5 0 0 1-1.288-.729l-1.375-2.293A1.5 1.5 0 0 0 4.4 11.75H.913m22.174 0H19.6a1.5 1.5 0 0 0-1.286.728l-1.376 2.294a1.5 1.5 0 0 1-1.286.728M.75 14.75h3m16.5 0h3m-13.125-1.125a1.875 1.875 0 1 0 3.751 0a1.875 1.875 0 0 0-3.751 0" /></g></svg>
    );

    const SUVIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"><path strokeLinecap="round" d="m2.5 13l2 1m17-.5l-2 .5M8 18.5l.246-.614c.365-.913.548-1.37.929-1.628c.38-.258.872-.258 1.856-.258h1.938c.984 0 1.476 0 1.856.258s.564.715.93 1.628L16 18.5M2 18v2.882c0 .379.24.725.622.894c.247.11.483.224.769.224h1.718c.286 0 .522-.114.77-.224c.38-.169.621-.515.621-.894V19m11 0v1.882c0 .379.24.725.622.894c.247.11.483.224.769.224h1.718c.286 0 .522-.114.77-.224c.38-.169.621-.515.621-.894V18m-2-8.5l1-.5M4 9.5L3 9" /><path d="m4.5 10.5l1.088-2.993c.44-1.21.66-1.815 1.184-2.16C7.296 5 7.992 5 9.383 5h5.234c1.391 0 2.087 0 2.61.346c.525.346.745.951 1.185 2.161L19.5 10.5m-15 0h15c.957.957 2.5 2.29 2.5 3.777v3.278c0 .539-.38.992-.883 1.055L18 19H6l-3.117-.39C2.38 18.547 2 18.094 2 17.555v-3.278c0-1.487 1.543-2.82 2.5-3.777ZM10 3.8c0-.994.537-1.8 1.2-1.8h1.6c.663 0 1.2.806 1.2 1.8c0 .663-.358 1.2-.8 1.2h-2.4c-.442 0-.8-.537-.8-1.2Z" /></g></svg>
    );

    const services = [
        {
            id: 1,
            title: "Bike Rides",
            description: "Fast and affordable bike rides for your daily commute. Experience the freedom of two wheels with our reliable bike rental service.",
            image: "/images/serv3.webp",
            icon: <BikeIcon />,
        },
        {
            id: 2,
            title: "Auto Rickshaw",
            description: "Comfortable auto rickshaw rides for short distances. Perfect for navigating through city traffic with ease and convenience.",
            image: "/images/serv2.webp",
            icon: <RickshawIcon />,
        },
        {
            id: 3,
            title: "Premium Rickshaw",
            description: "Upgraded rickshaw experience with modern amenities. Travel in style with our premium auto rickshaw fleet.",
            image: "/images/serv5.webp",
            icon: <StarIcon />,
        },
        {
            id: 4,
            title: "Parcel Delivery",
            description: "Quick and secure parcel delivery service. Send packages across the city with real-time tracking and guaranteed safety.",
            image: "/images/serv4.webp",
            icon: <PackageIcon />,
        },
        {
            id: 5,
            title: "Car Rides",
            description: "Comfortable sedan rides for longer journeys. Enjoy air-conditioned comfort with professional drivers.",
            image: "/images/serv1.webp",
            icon: <CarIcon />,
        },
        {
            id: 6,
            title: "SUV Premium",
            description: "Spacious SUV rides for family trips and group travel. Experience luxury and comfort on every journey.",
            image: "/images/serv6.webp",
            icon: <SUVIcon />,
        }
    ];

    return (
        <>
            <section className="services-section-main py-10 md:py-18 relative overflow-hidden">
                <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>

                {/* services-header-start */}
                <div className="services-header text-center relative">
                    <div className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest">
                        <span className="w-2 h-2 bg-cyan-700 rounded-full shadow-[0_0_10px_rgba(14,116,144,0.8)] animate-pulse" />
                        <span className="font-semibold text-cyan-700">What we do</span>
                        <div className="w-8 h-px bg-linear-to-r from-cyan-700 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="mt-5 md:mt-6 px-3 md:px-0 text-[28px] md:text-3xl lg:text-[40px] font-bold tracking-tight leading-[1.1] relative">
                        <span className="text-black/95 inline-block hover:text-black transition-colors duration-300 mr-2">
                            Smart Services For
                        </span>
                        <br />
                        <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                            Digital & Economical Rides
                        </span>
                        <div className="absolute -bottom-4 left-0 right-0 w-50 md:w-95 mx-auto h-[1.5px] bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-8 md:mt-8.5 w-full px-6 md:px-0 md:max-w-xl mx-auto">
                        <p className="text-[13px] md:text-[16px] text-black/80">We combine technical expertise with bold design to build products that matter crafting seamless interactions that connect brands with people.</p>
                    </div>
                </div>
                {/* services-header-end */}

                {/* services-main-start */}
                <div className="services-card-grid mt-15 px-5 md:px-8 lg:px-20">
                    <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={service.id} className="service-card group relative bg-white/80 backdrop-blur-sm border-2 border-cyan-200 rounded-[28px] cursor-pointer overflow-hidden transition-all duration-700 hover:bg-white hover:border-cyan-400 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] hover:-translate-y-3" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-cyan-400 to-cyan-500 opacity-10 rounded-br-full"></div>
                                <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-cyan-400 to-cyan-500 opacity-10 rounded-tl-full"></div>
                                <div className="card-box p-8 relative z-10">
                                    <div className="relative mb-6">
                                        <div className="card-img w-full h-50 lg:h-52 bg-linear-to-br from-cyan-50/80 via-cyan-100/40 to-transparent border border-cyan-400/40 rounded-2xl flex justify-center items-center p-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                            <div className="absolute inset-0 bg-linear-to-tr from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <Image src={service.image} alt={service.title} width={300} height={200} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                            className="mix-blend-multiply w-40 h-40 md:w-full md:h-full lg:w-full lg:h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-14 h-14 text-white bg-linear-to-br from-cyan-400 to-cyan-600 rounded-[14px] flex items-center justify-center text-2xl shadow-sm shadow-cyan-500/40 group-hover:rotate-10 group-hover:scale-110 transition-all duration-700">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <div className="card-content text-center">
                                        <h3 className="text-[22px] md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <p className="text-[13px] md:text-[14px] text-gray-600/90 leading-relaxed mb-7 min-h-18.75">
                                            {service.description}
                                        </p>
                                        <button className="w-full relative bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 cursor-pointer text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 overflow-hidden group/btn shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50">
                                            <span className="relative flex items-center justify-center gap-3">
                                                <span className="text-[15px]">Book Your Ride</span>
                                                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-linear-to-r from-transparent via-cyan-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* services-main-end */}
            </section>
        </>
    );
}