"use client";

import { useState } from "react";
import Link from "next/link";

const articles = [
    {
        id: 1,
        date: "January 10, 2024",
        category: "Booking Tips",
        slug: "booking-tips",
        title: "Advantages of Online Taxi Booking Services",
        excerpt:
            "Lorem ipsum dolor sit amet, cons auctor a liquet. Aenean sollicitudi.bibendu.",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
        author: { name: "Jakki James", avatar: "https://i.pravatar.cc/150?img=1" },
        readTime: "4 min read",
    },
    {
        id: 2,
        date: "February 11, 2024",
        category: "Industry News",
        slug: "industry-news",
        title: "Utilizing Online Taxi service Reservation Services",
        excerpt:
            "Lorem ipsum dolor sit amet, cons auctor a liquet. Aenean sollicitudi.bibendu.",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80",
        author: { name: "Martin Hunk", avatar: "https://i.pravatar.cc/150?img=12" },
        readTime: "6 min read",
    },
    {
        id: 3,
        date: "November 16, 2024",
        category: "Travel Guide",
        slug: "travel-guide",
        title: "Convenience of Online Taxi Reservation Services",
        excerpt:
            "Lorem ipsum dolor sit amet, cons auctor a liquet. Aenean sollicitudi.bibendu.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
        author: { name: "Robert Hank", avatar: "https://i.pravatar.cc/150?img=33" },
        readTime: "5 min read",
    },
    {
        id: 4,
        date: "November 16, 2024",
        category: "Travel Guide",
        slug: "travel-guide",
        title: "Convenience of Online Taxi Reservation Services",
        excerpt:
            "Lorem ipsum dolor sit amet, cons auctor a liquet. Aenean sollicitudi.bibendu.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
        author: { name: "Robert Hank", avatar: "https://i.pravatar.cc/150?img=33" },
        readTime: "5 min read",
    },
    {
        id: 5,
        date: "November 16, 2024",
        category: "Travel Guide",
        slug: "travel-guide",
        title: "Convenience of Online Taxi Reservation Services",
        excerpt:
            "Lorem ipsum dolor sit amet, cons auctor a liquet. Aenean sollicitudi.bibendu.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
        author: { name: "Robert Hank", avatar: "https://i.pravatar.cc/150?img=33" },
        readTime: "5 min read",
    },
    {
        id: 6,
        date: "November 16, 2024",
        category: "Travel Guide",
        slug: "travel-guide",
        title: "Convenience of Online Taxi Reservation Services",
        excerpt:
            "Lorem ipsum dolor sit amet, cons auctor a liquet. Aenean sollicitudi.bibendu.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
        author: { name: "Robert Hank", avatar: "https://i.pravatar.cc/150?img=33" },
        readTime: "5 min read",
    }
];

function BlogCard({ article }: { article: (typeof articles)[0] }) {
    const [hovered, setHovered] = useState(false);
    return (
        <article className={`relative bg-white flex flex-col overflow-hidden cursor-pointer rounded-2xl transition-all duration-300 ease-in-out
            ${hovered ? "-translate-y-1.5 shadow-[0_20px_60px_rgba(0,200,220,0.22),0_4px_16px_rgba(0,0,0,0.10)]" : "translate-y-0 shadow-[0_2px_16px_rgba(0,0,0,0.07)]"}`}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {/* <div className={` h-1 bg-linear-to-r from-cyan-500 via-cyan-400 to-cyan-300 rounded-2xl origin-left transition-transform duration-500 ${hovered ? "scale-x-100" : "scale-x-[0.35]"}`} /> */}
            <div className="relative h-64 overflow-hidden">
                <img src={article.image} alt={article.title} className={` w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-[1.08]" : "scale-100"}`} />
                <div className={`absolute inset-0 bg-linear-to-br from-cyan-500/50 to-black/20 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
                <span className="absolute top-3.5 left-3.5 bg-linear-to-r from-cyan-500 to-cyan-400 text-white text-[11px] font-bold uppercase 
                tracking-widest px-3.5 py-1 rounded-sm shadow-[0_2px_8px_rgba(6,182,212,0.4)]">
                    {article.category}
                </span>
                <div className="absolute bottom-0 left-0 bg-cyan-400 text-white text-[12px] font-extrabold tracking-wide px-5 pl-4 py-1.5"
                    style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}>
                    {article.date}
                </div>
                <div className=" absolute bottom-2.5 right-3.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold 
                 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span>⏱</span> {article.readTime}
                </div>
            </div>
            <div className="flex flex-col flex-1 px-6 pt-5 pb-5">
                <h3 className={`text-lg font-extrabold leading-snug mb-2.5 transition-colors duration-300 ${hovered ? "text-cyan-500" : "text-[#111]"}`}>
                    {article.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                </p>
                <div className={`h-px mb-6 transition-all duration-300 ${hovered ? "bg-linear-to-r from-cyan-400 to-slate-200" : "bg-slate-200"}`} />
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                            <img src={article.author.avatar} alt={article.author.name} className={`w-10 h-10 rounded-full object-coverring-2 transition-all duration-300 ${hovered ? "ring-cyan-400" : "ring-gray-200"}`} />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-white" />
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-400 leading-none mb-0.5">Author</div>
                            <div className="text-[13px] font-bold text-[#111]">{article.author.name}</div>
                        </div>
                    </div>
                    <Link href={`/blogs/${article.slug}`} className={`flex items-center gap-1.5 text-cyan-500 text-[12.5px] font-bold uppercase tracking-widest px-4 py-2.5 border-2 rounded-xl 
                        transition-all duration-300 ${hovered ? "border-cyan-400 bg-cyan-50" : "border-gray-200 bg-transparent"}`}>
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function BlogCards() {
    return (
        <section className="bg-white relative py-12 lg:py-20 px-7 lg:px-30 overflow-hidden">
            <div className="w-full">
                {/* blogs-section-start */}
                <div className="blog-header-section text-center relative">
                    <div className="inline-flex items-center gap-3 text-xs md:text-sm text-white uppercase tracking-widest">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,187,252,0.8)] animate-pulse" />
                        <span className="font-semibold text-cyan-400">News & Updates</span>
                        <div className="w-8 h-px bg-linear-to-r from-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-5 md:mt-6 px-1 md:px-0 text-[30px] md:text-3xl lg:text-[42px] font-bold tracking-tight leading-[1.1] relative">
                        <span className="text-black/95 inline-block hover:text-black transition-colors duration-300 mr-3">Our Recent</span>
                        <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                           Blogs
                        </span>
                        <div className="absolute -bottom-4 left-0 right-0 w-60 md:w-95 mx-auto h-[1.5px] bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-10 lg:mt-8 w-full px-3 md:px-0 md:max-w-xl mx-auto">
                        <p className="text-sm md:text-[16px] text-black/80">Stay updated with the latest Rideza news and find quick answers to your most common questions.</p>
                    </div>
                </div>
                {/* blogs-section-end */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10 lg:mt-14">
                    {articles.map((article) => (
                        <BlogCard key={article.id} article={article} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button className="inline-flex items-center gap-2.5 bg-linear-to-r from-cyan-500 to-cyan-400 text-white text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-lg border-none cursor-pointer 
                    shadow-[0_6px_24px_rgba(6,182,212,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(6,182,212,0.45)]">
                        View All Articles
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}