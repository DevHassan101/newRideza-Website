"use client";

export default function WayForward() {
    return (
        <section className="relative py-10 md:py-15 px-7 lg:px-30 overflow-hidden bg-linear-to-b from-white to-gray-50">
            <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-full relative z-10">
                {/* way-forward--section-start */}
                <div className="way-forward-section text-center">
                    <div className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
                        <span className="font-semibold text-cyan-500">Future Ready</span>
                        <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                        <span className="text-black/95">Way forward on </span>
                        <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">Safety</span>
                    </h2>
                    <p className="text-gray-600 text-[15px] md:text-[17px] leading-relaxed mb-10 max-w-2xl mx-auto">
                        To further substantiate our commitment to Safety First towards customers & captains, we will be incorporating new features on our platform very soon.
                    </p>
                    <button className="relative inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 overflow-hidden group shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                        <span className="relative z-10">Know More</span>
                        <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
                {/* way-forward-section-end */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5 mt-15">
                    <div className="group relative cursor-pointer">
                        {/* Card container with unique design */}
                        <div className="relative bg-linear-to-br from-white to-gray-50 border-2 border-cyan-100 rounded-[20px] p-8 transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_25px_70px_-15px_rgba(6,182,212,0.3)] hover:-translate-y-3">
                            {/* Top-right gradient blob */}
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-linear-to-br from-cyan-400/20 to-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                            {/* Diagonal accent line */}
                            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-1 bg-linear-to-l from-cyan-400 to-transparent transform rotate-45 origin-top-right" />
                            </div>
                            {/* Icon badge - larger and different style */}
                            <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-cyan-500/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                            </div>
                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                                SOS Alerts
                            </h3>
                            <p className="text-gray-600 text-[13.5px] leading-relaxed">
                                Emergency button to instantly alert authorities and family members during your ride.
                            </p>
                            {/* Bottom left corner accent */}
                            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-3xl group-hover:border-cyan-400 transition-colors duration-500" />
                        </div>
                    </div>
                    <div className="group relative cursor-pointer">
                        <div className="relative bg-linear-to-br from-white to-gray-50 border-2 border-cyan-100 rounded-[20px] p-8 transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_25px_70px_-15px_rgba(6,182,212,0.3)] hover:-translate-y-3">
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-linear-to-br from-cyan-400/20 to-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-1 bg-linear-to-l from-cyan-400 to-transparent transform rotate-45 origin-top-right" />
                            </div>
                            <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-cyan-500/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                                Live Tracking
                            </h3>
                            <p className="text-gray-600 text-[13.5px] leading-relaxed">
                                Share your real-time location with family for added peace of mind throughout the journey.
                            </p>
                            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-3xl group-hover:border-cyan-400 transition-colors duration-500" />
                        </div>
                    </div>
                    <div className="group relative cursor-pointer">
                        <div className="relative bg-linear-to-br from-white to-gray-50 border-2 border-cyan-100 rounded-[20px] p-8 transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_25px_70px_-15px_rgba(6,182,212,0.3)] hover:-translate-y-3">
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-linear-to-br from-cyan-400/20 to-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />

                            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-1 bg-linear-to-l from-cyan-400 to-transparent transform rotate-45 origin-top-right" />
                            </div>

                            <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-cyan-500/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                                AI Monitoring
                            </h3>
                            <p className="text-gray-600 text-[13.5px] leading-relaxed">
                                Advanced AI system monitors rides in real-time to detect and prevent safety incidents.
                            </p>

                            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-3xl group-hover:border-cyan-400 transition-colors duration-500" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}