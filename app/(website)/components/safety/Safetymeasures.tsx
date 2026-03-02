"use client";

const InsuranceIcon = () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const SupportIcon = () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

const RatingIcon = () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);

const VerificationIcon = () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export default function SafetyMeasures() {
    const measures = [
        {
            title: "Insurance",
            description: "Insurance can be claimed for any accident that occurs during the ride covering OPD treatment, hospitaliza- tion, and accidental benefit with a maximum sum insured of ₹5 Lakh. It can be claimed as soon as the ride is completed.",
            icon: <InsuranceIcon />,
        },
        {
            title: "24 x 7 Customer Support",
            description: "Both, our captains and customers can report any kind of issues to CityCab through the 24*7 support feature on the app post & during the ride for immediate assistance.",
            icon: <SupportIcon />,
        },
        {
            title: "Two-way Rating System",
            description: "Post the ride, both parties can give a rating to each other and any rating below 3 is flagged from CityCab's end. CityCab reaches out to them in 10 minutes to address their concern.",
            icon: <RatingIcon />,
        },
        {
            title: "Driver Verification",
            description: "All our drivers undergo thorough background verification including police record check, driving license validation, and professional training before onboarding.",
            icon: <VerificationIcon />,
        },
    ];

    return (
        <section className="bg-white relative py-14 md:py-15 px-7 lg:px-30 overflow-hidden">
            <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-full relative z-10">
                {/* safety-measures-section-start */}
                <div className="safety-measures-section mb-10">
                    <div className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
                        <span className="font-semibold text-cyan-500">Our Commitment</span>
                        <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                        <span className="text-black/95">Measures to ensure the well-being of both, our</span>
                        <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent"> Captains and Customers.</span>
                    </h2>
                </div>
                {/* safety-measures-section-end */}
                <div className="safety-measures-cards grid grid-cols-1 md:grid-cols-2 gap-8">
                    {measures.map((measure, index) => (
                        <div key={index} className="group relative bg-white border border-cyan-200 rounded-3xl p-8 transition-all duration-500 overflow-hidden 
                         hover:border-cyan-300 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.25)] hover:-translate-y-2">
                            {/* corner-accents */}
                            <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-cyan-400/10 to-transparent rounded-br-full group-hover:scale-150 transition-transform duration-500" />
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-cyan-500/10 to-transparent rounded-tl-full group-hover:scale-150 transition-transform duration-500" />
                            {/* top-glow-line */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {/* icon */}
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                {measure.icon}
                            </div>
                            {/* title */}
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                                {measure.title}
                            </h3>
                            {/* description */}
                            <p className="text-gray-600 text-[14px] leading-relaxed">
                                {measure.description}
                            </p>
                            {/* bottom-glow-line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}