"use client";

import { useState } from "react";

export default function BlogDetailPage() {
    const [search, setSearch] = useState("");

    return (
        <section className="mt-25">
            <div className="bg-white relative min-h-screen py-16 px-7 lg:px-20">
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
                        <article>
                            <div className="relative rounded-[20px] overflow-hidden mb-10 group shadow-xl">
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="bg-linear-to-r from-cyan-400 to-cyan-500 text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-wider shadow-lg">
                                        Industry News
                                    </span>
                                </div>
                                <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                    </svg>
                                    <span className="text-xs font-bold text-gray-900">5 min read</span>
                                </div>
                                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80" alt="Blog Featured" className="w-full h-112.5 md:h-137.5 object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-6 left-6 z-20 bg-linear-to-br from-cyan-400 to-cyan-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg">
                                    <span className="text-sm">February 11, 2024</span>
                                </div>
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
                            </div>
                            <div className="flex items-center justify-between gap-4 mb-10 pb-8 border-b-2 border-gray-100">
                                <div className="flex items-center gap-4">
                                    <img src="https://i.pravatar.cc/150?img=33" alt="Author" className="w-14 h-14 rounded-full ring-4 ring-cyan-100" />
                                    <div>
                                        <p className="text-gray-900 font-bold text-base">Martin Hank</p>
                                        <p className="text-gray-500 text-sm">Published 2 days ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-cyan-500 text-sm font-medium">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                                    </svg>
                                    <span>02 Comments</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold max-w-2xl text-gray-900 mb-8 leading-tight">
                                Delivering the best
                                <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent"> web design </span>
                                agency
                            </h1>
                            <div className="prose prose-lg max-w-none pr-12">
                                <p className="text-gray-600 text-[16px] leading-relaxed mb-6">
                                    Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus nulla, sollicitudin at euismod nec, feugiat at nisi. Quisque vitae odio nec lacus interdum tempus. Phasellus a rhoncus erat. Vivamus vel eros vitae est aliquet pellentesque vitae et nunc. Sed vitae leo vitae nisl pellentesque semper.
                                </p>
                                <p className="text-gray-600 text-[16px] leading-relaxed mb-6">
                                    Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus nulla, sollicitudin at euismod nec, feugiat at nisi. Quisque vitae odio nec lacus interdum tempus. Phasellus a rhoncus erat. Vivamus vel eros vitae est aliquet pellentesque vitae et nunc. Sed vitae leo vitae nisl pellentesque semper.
                                </p>
                                <p className="text-gray-600 text-[16px] leading-relaxed mb-6">
                                    Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus nulla, sollicitudin at euismod nec, feugiat at nisi. Quisque vitae odio nec lacus interdum tempus. Phasellus a rhoncus erat. Vivamus vel eros vitae est aliquet pellentesque vitae et nunc. Sed vitae leo vitae nisl pellentesque semper.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-6 mt-12 pt-8 border-t-2 border-gray-100">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-900 font-bold text-sm uppercase tracking-wider">Tags</span>
                                    <div className="flex gap-3">
                                        <button className="bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105">
                                            Business
                                        </button>
                                        <button className="bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105">
                                            Agency
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-sm font-medium">Share:</span>
                                    <a href="#" className="w-11 h-11 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5" strokeWidth="0.6" stroke="currentColor" /></svg>
                                    </a>
                                    <a href="#" className="w-11 h-11 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02" strokeWidth="0.5" stroke="currentColor" /></svg>
                                    </a>
                                    <a href="#" className="w-11 h-11 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 14 14"><g fill="currentColor"><g clipPath="url(#SVGG1Ot4cAD)"><path fill="currentColor" d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z" strokeWidth="0.1" stroke="currentColor" /></g><defs><clipPath id="SVGG1Ot4cAD"><path fill="currentColor" d="M0 0h14v14H0z" /></clipPath></defs></g></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="mt-12 pt-10 border-t-2 border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Blogs</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80", title: "Top crypto exchange influencers", author: "Jakki James" },
                                        { img: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400&q=80", title: "You should know about business plan", author: "Robert Hank" },
                                    ].map((article, i) => (
                                        <div key={i} className="group relative bg-white border-2 border-cyan-200 rounded-[18px] overflow-hidden transition-all duration-500 hover:border-cyan-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                                            <div className="relative h-48 overflow-hidden">
                                                <img src={article.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cyan-500 transition-colors duration-300">
                                                    {article.title}
                                                </h4>
                                                <p className="text-sm text-black/85 text-justify pr-6 mb-6">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt excepturi soluta eveniet mollitia aspernatur, ex repellat? Accusamus voluptatibus in porro.
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <img src={`https://i.pravatar.cc/150?img=${30 + i}`} alt="" className="w-8 h-8 rounded-full" />
                                                        <span className="text-sm text-gray-600 font-medium">{article.author}</span>
                                                    </div>
                                                    <button className="flex items-center gap-2 text-cyan-500 font-bold text-sm group-hover:gap-3 transition-all duration-300">
                                                        <span>READ MORE</span>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                        <aside className="space-y-8">
                            <div className="relative group">
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search here"
                                    className="w-full bg-white border-2 border-cyan-200 text-black/80 placeholder:text-black/60 font-medium text-sm px-6 py-4.75 rounded-xl outline-none focus:ring-1 focus:ring-cyan-300 transition-all duration-300 shadow-md shadow-black/5" />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-linear-to-r from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#fff" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" strokeWidth="0.3" stroke="currentColor" /></g></svg>
                                </button>
                            </div>
                            <div className="bg-white border-2 border-cyan-200 rounded-[18px] p-6 md:p-8 transition-all duration-500 hover:border-cyan-300 hover:shadow-lg">
                                <h3 className="text-gray-900 font-bold text-2xl mb-6 pb-4 border-b-2 border-gray-100">
                                    Latest Posts
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=150&q=80", title: "Top crypto exchange influencers" },
                                        { img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=150&q=80", title: "Necessity may give us best virtual court" },
                                        { img: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=150&q=80", title: "You should know about business plan" },
                                    ].map((post, i) => (
                                        <div key={i} className="flex items-start gap-4 group cursor-pointer">
                                            <div className="relative shrink-0 rounded-2xl overflow-hidden">
                                                <img src={post.img} alt="" className="w-24 h-24 object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                    </svg>
                                                    <span className="text-gray-400 text-xs font-medium">Admin</span>
                                                </div>
                                                <h4 className="text-gray-900 font-bold text-[14px] leading-tight group-hover:text-cyan-500 transition-colors duration-300">
                                                    {post.title}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white border-2 border-cyan-200 rounded-[18px] p-6 md:p-8 transition-all duration-500 hover:border-cyan-300 hover:shadow-lg">
                                <h3 className="text-gray-900 font-bold text-2xl mb-6 pb-4 border-b-2 border-gray-100">
                                    Categories
                                </h3>
                                <ul className="space-y-6">
                                    {["Business", "Digital Agency", "Introductions", "New Technologies", "Parallax Effects", "Web Development"].map((cat) => (
                                        <li key={cat}>
                                            <a href="#" className="group flex items-center justify-between text-gray-600 text-[15px] font-medium hover:text-cyan-500 transition-all duration-300">
                                                <span className="group-hover:translate-x-2 transition-transform duration-300">{cat}</span>
                                                <svg className="w-4 h-4 text-gray-300 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
}