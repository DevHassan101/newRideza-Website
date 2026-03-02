"use client";

import { useState } from "react";

const faqs = [
    { id: 1, question: "Did You Lost Something?", answer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." },
    { id: 2, question: "How To Contact Us?", answer: "You can reach us via email, phone, or through the contact form on our website. Our support team is available 24/7 to assist you." },
    { id: 3, question: "How To Download Taxi App?", answer: "Simply search for 'CityCab' on the App Store or Google Play Store and download the app for free. Sign up and start booking rides instantly." },
    { id: 4, question: "How To Select A Cab?", answer: "Open the app, enter your pickup and drop-off location, choose your preferred cab type, and confirm your booking in seconds." },
    { id: 5, question: "How To Select A Driver?", answer: "Our smart algorithm matches you with the nearest available driver. You can also view driver ratings and reviews before confirming your ride." },
];

const news = [
    {
        id: 1,
        date: "Aug 06, 2024",
        category: "App Update",
        title: "Introducing CityCab mobile application for iOS and Android",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue sagittis ligula, ut porta felis facilisis.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80",
    },
    {
        id: 2,
        date: "Aug 07, 2024",
        category: "News",
        title: "Hollywood movie stars talking about CityCab premium services",
        excerpt: "Pellentesque dui orci, scelerisque nec eros at, cursus iaculis metus. Fusce et convallis mauris.",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
    },
];

function AccordionItem({ faq, isOpen, onToggle }: { faq: (typeof faqs)[0]; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className={`group relative overflow-hidden rounded-2xl md:rounded-xl cursor-pointer border transition-all duration-500 ease-in-out
            ${isOpen ? "border-cyan-300 shadow-[0_8px_30px_rgba(6,182,212,0.15)] bg-white"
                : "border-cyan-200 bg-white/70 hover:border-cyan-200 hover:bg-white hover:shadow-md"}`}>
            {/* Corner accent */}
            <div className={`absolute top-0 left-0 w-16 h-16 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-br-full transition-opacity duration-500 ${isOpen ? "opacity-10" : "opacity-5 group-hover:opacity-10"}`} />
            {/* Toggle button */}
            <button onClick={onToggle} className="relative z-10 w-full flex items-center gap-0 text-left">
                {/* Icon box */}
                <div className={`shrink-0 w-14 h-14 flex items-center justify-center transition-all duration-400
                    ${isOpen ? "bg-linear-to-br from-cyan-400 to-cyan-600 shadow-lg rounded-br-4xl shadow-cyan-500/30" : "bg-cyan-50 group-hover:bg-cyan-100"}`}>
                    <svg className={`w-5 h-5 transition-all duration-400 ${isOpen ? "text-white rotate-180" : "text-cyan-500"}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div className="flex-1 px-5 py-4">
                    <span className={`text-sm md:text-[15px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${isOpen ? "text-cyan-600" : "text-gray-800 group-hover:text-cyan-600"}`}>
                        {faq.question}
                    </span>
                </div>
            </button>
            {/* Smooth grid-rows animation */}
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <div className="relative z-10 flex items-start gap-4 px-6 pt-5 pb-5">
                        <div className="shrink-0 w-0.5 self-stretch bg-linear-to-b from-cyan-400 to-cyan-200 rounded-full ml-3.5" />
                        <p className="text-gray-500 text-[13px] md:text-[14px] leading-relaxed">{faq.answer}</p>
                    </div>
                </div>
            </div>
            {/* Bottom glow line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent transition-all duration-500 ${isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} />
        </div>
    );
}

function NewsCard({ article }: { article: (typeof news)[0] }) {
    return (
        <div className="service-card group relative border border-cyan-200 rounded-2xl md:rounded-[15px] shadow-lg shadow-cyan-400/10 overflow-hidden transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] hover:-translate-y-2 cursor-pointer bg-white">
            <div className="absolute top-0 left-0 w-16 h-16 bg-linear-to-br from-cyan-400 to-cyan-500 opacity-5 rounded-br-full group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-cyan-400 to-cyan-500 opacity-5 rounded-tl-full group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3 bg-linear-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-cyan-500/40">
                    {article.category}
                </div>
            </div>
            {/* Content */}
            <div className="relative z-10 px-5 py-6 flex flex-col gap-2">
                <span className="text-cyan-500 text-sm font-semibold tracking-wide">{article.date}</span>
                <h3 className="text-gray-900 font-bold text-md leading-snug group-hover:text-cyan-600 transition-colors duration-300">{article.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center gap-2 mt-1 text-cyan-500 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Read More</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
    );
}

export default function NewsFaqSection() {
    const [openId, setOpenId] = useState<number | null>(1);

    return (
        <section className="bg-white relative py-10 md:py-20 px-7 lg:px-30 overflow-hidden">
            <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-full relative z-10">
                {/* benefits-header-start */}
                <div className="benefits-header text-center relative">
                    <div className="inline-flex items-center gap-3 text-xs md:text-sm text-white uppercase tracking-widest">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
                        <span className="font-semibold text-cyan-400">Rideza Good Ride</span>
                        <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-5 md:mt-6 px-3 md:px-0 text-[30px] md:text-3xl lg:text-[40px] font-bold tracking-tight leading-[1.1] relative">
                        <span className="text-black/95 inline-block hover:text-black transition-colors duration-300 mr-2">Our Latest</span>
                        <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                            Newses & FAQ's
                        </span>
                        <div className="absolute -bottom-4 left-0 right-0 w-40 md:w-95 mx-auto h-[1.5px] bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-10 lg:mt-8 w-full px-2 md:px-0 md:max-w-xl mx-auto">
                        <p className="text-sm md:text-[16px] text-black/80">Stay updated with the latest CityCab news and find quick answers to your most common questions.</p>
                    </div>
                </div>
                {/* benefits-header-end */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start mt-10 md:mt-16">
                    <div className="flex flex-col gap-3">
                        {faqs.map((faq) => (
                            <AccordionItem key={faq.id} faq={faq} isOpen={openId === faq.id} 
                            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {news.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}