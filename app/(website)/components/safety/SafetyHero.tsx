"use client";

export default function SafetyHero() {
    return (
        <section className="bg-white relative py-10 md:py-15 px-7 lg:px-30 overflow-hidden">
            <div className="w-full relative z-10">
                <div className="bg-white rounded-3xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-center">
                        <div className="space-y-8.5 lg:space-y-10">
                            <div className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.2em]">
                                <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)] animate-pulse" />
                                <span className="font-bold text-cyan-500">Safety First</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-[62px] font-bold leading-[1.05]">
                                <span className="text-gray-900">Safety for </span>
                                <span className="relative inline-block">
                                    <span className="relative z-10 bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">all.</span>
                                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-cyan-400/30 rounded-full" />
                                </span>
                            </h1>
                            <p className="text-gray-700 text-[16px] md:text-[17px] leading-relaxed text-justify pr-10">
                                The Rideza, the well-being of our customers is above everything else. We are constantly in pursuit of enhancing our safety measures to ensure every Rideza ride is a pleasant and comfortable experience.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-4 group">
                                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold text-gray-900 mb-1">Verified Drivers</p>
                                        <p className="text-[13px] text-gray-600">100% Background Checked</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold text-gray-900 mb-1">24/7 Support</p>
                                        <p className="text-[13px] text-gray-600">Always Here for You</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-auto md:h-140">
                            <div className="relative lg:absolute bottom-0 left-0 w-full md:w-75 h-65 md:h-105 rounded-3xl border-4 border-cyan-400 bg-white shadow-[0_20px_60px_rgba(6,182,212,0.25)] overflow-hidden transform transition-all duration-700 hover:scale-105 z-20">
                                <img src="https://i0.wp.com/wetalkstartups.com/wp-content/uploads/2022/01/bykea.jpeg?fit=1168%2C608&ssl=1" alt="Customer Safety"
                                className="w-full h-full object-cover" />
                                <div className="absolute bottom-4 left-4 w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-xl opacity-90" />
                            </div>
                            <div className="relative lg:absolute top-0 right-0 w-full md:w-77 h-auto md:h-105 mt-5 rounded-3xl border-4 border-cyan-400 bg-white shadow-[0_20px_60px_rgba(6,182,212,0.25)] overflow-hidden transform transition-all duration-700 hover:scale-105 z-20">
                                <img src="https://bykea.com/wp-content/uploads/2020/02/Updated-2.jpg" alt="Driver Safety"
                                className="w-full h-full object-cover" />
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-xl opacity-90" />
                            </div>
                            <div className="hidden lg:absolute top-1/4 left-1/4 w-24 h-24 border-[3px] border-cyan-400/40 rounded-full animate-pulse z-10" />
                            <div className="hidden lg:absolute bottom-1/3 right-1/4 w-20 h-20 bg-cyan-400/20 rounded-[20px] rotate-45 z-10" />
                            <div className="hidden lg:absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-400/30 rounded-2xl -rotate-12 z-10" />
                            {/* Small floating circles */}
                            <div className="absolute top-10 left-1/3 w-8 h-8 bg-cyan-400/20 rounded-full animate-bounce z-10" style={{ animationDuration: "3s" }} />
                            <div className="absolute bottom-20 right-10 w-6 h-6 bg-cyan-400/40 rounded-full animate-bounce z-10" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}