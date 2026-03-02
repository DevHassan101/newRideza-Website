"use client";

import { useState } from "react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="bg-white relative py-15 md:py-20 px-7 lg:px-28 mt-25 overflow-hidden">
            <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* left-contact-form */}
                    <div>
                        <div className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
                            <span className="font-semibold text-cyan-500">Send Us Email</span>
                            <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            <span className="text-black/95">Feel free to </span>
                            <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">write</span>
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* name-email-row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange}
                                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors duration-300 text-gray-900 placeholder:text-gray-400" />
                                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange}
                                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors duration-300 text-gray-900 placeholder:text-gray-400" />
                            </div>
                            {/* subject-phone-row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" name="subject" placeholder="Enter Subject" value={formData.subject} onChange={handleChange}
                                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors duration-300 text-gray-900 placeholder:text-gray-400" />
                                <input type="tel" name="phone" placeholder="Enter Phone" value={formData.phone} onChange={handleChange}
                                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors duration-300 text-gray-900 placeholder:text-gray-400" />
                            </div>
                            {/* message */}
                            <textarea name="message" placeholder="Enter Message" value={formData.message} onChange={handleChange} rows={6}
                            className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors duration-300 text-gray-900 placeholder:text-gray-400 resize-none"/>
                            {/* submit-button */}
                            <button type="submit" className="relative inline-flex items-center gap-3 cursor-pointer bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 overflow-hidden group shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105">
                                <span className="relative z-10 text-sm uppercase tracking-wider">Send Message</span>
                                <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    {/* right-contact-form */}
                    <div>
                        <div className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
                            <span className="font-semibold text-cyan-500">Need Any Help?</span>
                            <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-black/95">Get in touch </span>
                            <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">with us</span>
                        </h2>
                        <p className="text-gray-600 text-[15px] leading-relaxed mb-10 max-w-lg">
                            Lorem ipsum is simply free text available dolor sit amet consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply dolore magna.
                        </p>
                        {/* contact-cards */}
                        <div className="space-y-5">
                            {/* phone-card */}
                            <div className="group relative cursor-pointer bg-white border-2 border-cyan-100 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 flex items-start gap-5">
                                <div className="shrink-0 w-16 h-16 rounded-[14px] bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors duration-300">
                                        Have any question?
                                    </h3>
                                    <p className="text-gray-600 text-[14px]">Free +92 (020)-9850</p>
                                </div>
                            </div>
                            {/* email-card */}
                            <div className="group relative cursor-pointer bg-white border-2 border-cyan-100 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 flex items-start gap-5">
                                <div className="shrink-0 w-16 h-16 rounded-[14px] bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors duration-300">
                                        Write email
                                    </h3>
                                    <p className="text-gray-600 text-[14px]">needhelp@company.com</p>
                                </div>
                            </div>
                            {/* location-card */}
                            <div className="group relative cursor-pointer bg-white border-2 border-cyan-100 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 flex items-start gap-5">
                                <div className="shrink-0 w-16 h-16 rounded-[14px] bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors duration-300">
                                        Visit anytime
                                    </h3>
                                    <p className="text-gray-600 text-[14px]">66 broklyn golden street, New York</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* map-section */}
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-3 lg:border-4 border-cyan-100">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8190503078226!2d36.82194631475398!3d-1.2920659990637745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6d3e3e3e3%3A0x0!2zMcKwMTcnMzEuNCJTIDM2wrA0OSczMy4wIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske" 
                     width="100%" height="500" style={{ border: 0 }} allowFullScreen loading="lazy" className="grayscale-20 hover:grayscale-0 transition-all duration-500" />
                </div>
            </div>
        </section>
    );
}