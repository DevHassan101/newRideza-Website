"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

const testimonials = [
    {
        id: 1,
        text: "CityCab is my favorite taxi company ever! Cool drivers, amazing cars, top notch services! You won't believe it, but they actually didn't took any tip 🙂",
        name: "Diego Furlan",
        location: "Lives in: Barcelona",
        avatar: "/images/testi1.webp",
        rating: 5,
    },
    {
        id: 2,
        text: "CityCab is my favorite taxi company ever! Cool drivers, amazing cars, top notch services! You won't believe it, but they actually didn't took any tip 🙂",
        name: "Samantha Jones",
        location: "Lives in: Vienna",
        avatar: "/images/testi2.webp",
        rating: 5,
    },
    {
        id: 3,
        text: "Absolutely amazing experience from start to finish. The driver was punctual, the car was spotless, and the ride was smooth. CityCab never disappoints! 🚕",
        name: "Marcus Webb",
        location: "Lives in: London",
        avatar: "/images/testi3.webp",
        rating: 5,
    },
    {
        id: 4,
        text: "I've tried every taxi service in the city, but nothing comes close to CityCab. Professional, reliable, and the drivers are always so friendly and helpful.",
        name: "Lena Kovač",
        location: "Lives in: Zagreb",
        avatar: "/images/testi4.webp",
        rating: 5,
    },
    {
        id: 5,
        text: "Five stars isn't enough! CityCab went above and beyond during my airport trip. On time, professional, and even helped with my luggage. Will use forever! ⭐",
        name: "Takeshi Mori",
        location: "Lives in: Tokyo",
        avatar: "/images/testi2.webp",
        rating: 5,
    },
    {
        id: 6,
        text: "Best taxi service hands down. The app is seamless, the cars are clean, and the drivers know the city like the back of their hand. CityCab for life! 🙌",
        name: "Amara Diallo",
        location: "Lives in: Paris",
        avatar: "/images/testi1.webp",
        rating: 5,
    },
];

const QuoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" viewBox="0 0 25 24"><path fill="#fff" d="m7.449 18.177l-.322-.677za.75.75 0 0 1-1.072-.677v-2.557a4.628 4.628 0 0 1 .75-9.193a4.627 4.627 0 0 1 4.626 4.627c0 2.845-1.049 4.796-2.12 6.034a8 8 0 0 1-1.47 1.333a6 6 0 0 1-.647.4l-.045.023l-.014.006l-.006.003zM4 10.377c0 1.726 1.4 3.126 3.127 3.126a.75.75 0 0 1 .75.75v1.807c.198-.176.41-.386.62-.63c.867-1.001 1.756-2.612 1.756-5.053a3.127 3.127 0 0 0-6.253 0m14.199 7.8l-.322-.677za.75.75 0 0 1-1.072-.677v-2.557a4.628 4.628 0 0 1 .75-9.193a4.627 4.627 0 0 1 4.626 4.627c0 2.845-1.049 4.796-2.12 6.034a8 8 0 0 1-1.47 1.333a6 6 0 0 1-.692.422l-.014.008l-.006.002zm-3.449-7.8c0 1.726 1.4 3.126 3.127 3.126a.75.75 0 0 1 .75.75v1.807c.198-.176.41-.386.62-.63c.867-1.001 1.756-2.612 1.756-5.053a3.127 3.127 0 0 0-6.253 0" /></svg>
);

const StarIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
    <div className="service-card group relative bg-white/80 backdrop-blur-sm border border-cyan-300 rounded-[28px] cursor-pointer overflow-hidden transition-all duration-700 hover:bg-white hover:border-cyan-400 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] hover:-translate-y-3 h-full flex flex-col">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-cyan-300/20 via-cyan-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-100 opacity-70 transition-all duration-700"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-linear-to-tr from-cyan-400/15 via-cyan-300/10 to-transparent rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-100 opacity-70 transition-all duration-700"></div>
        <div className="relative z-10 px-9 py-11 flex flex-col flex-1">
            <div className="absolute top-4 right-4 w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-sm shadow-cyan-500/40 group-hover:rotate-360 group-hover:scale-110 transition-all duration-700">
                <QuoteIcon />
            </div>
            <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                        <StarIcon />
                    </span>
                ))}
            </div>
            <p className="text-black/80 text-[13px] md:text-[15px] font-medium leading-relaxed flex-1 mb-6">
                "{testimonial.text}"
            </p>
            <div className="w-full h-px bg-linear-to-r from-transparent via-cyan-200 to-transparent mb-5 group-hover:via-cyan-400 transition-colors duration-500"></div>
            <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-cyan-400/40 ring-offset-2 group-hover:ring-cyan-400 transition-all duration-300">
                        <Image src={testimonial.avatar} alt={testimonial.name} width={56} height={56} sizes="56px" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-linear-to-br from-green-400 to-green-500 rounded-full border-2 border-white shadow-sm shadow-cyan-400/50"></span>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-[15px] group-hover:text-cyan-600 transition-colors duration-300">
                        {testimonial.name}
                    </h4>
                    <p className="text-cyan-700 text-xs font-medium mt-0.5">
                        {testimonial.location}
                    </p>
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
    </div>
);

export default function TestimonialsSlider() {
    return (
        <section className="relative overflow-hidden py-15 md:py-20 px-7 lg:px-26">
            <div className="w-full relative z-10">
                <div className="testimonials-header text-center relative">
                    <div className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest">
                        <span className="w-2 h-2 bg-cyan-700 rounded-full shadow-[0_0_10px_rgba(14,116,144,0.8)] animate-pulse" />
                        <span className="font-semibold text-cyan-700">Happy Clients</span>
                        <div className="w-8 h-px bg-linear-to-r from-cyan-700 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="mt-5 md:mt-6 px-3 md:px-0 text-[30px] md:text-3xl lg:text-[40px] font-bold tracking-tight leading-[1.1] relative">
                        <span className="text-black/95 inline-block hover:text-black transition-colors duration-300 mr-2">
                            What Our
                        </span>
                        <span className="bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                            Client Say's
                        </span>
                        <div className="absolute -bottom-4 left-0 right-0 w-40 md:w-95 mx-auto h-[1.5px] bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                    </div>
                    <div className="mt-10 lg:mt-8.5 w-full px-4 md:px-0 md:max-w-xl mx-auto">
                        <p className="text-[13px] md:text-[16px] text-black/80">We combine technical expertise with bold design to build products that matter crafting seamless interactions that connect brands with people.</p>
                    </div>
                </div>
                <div className="relative testimonials-swiper-container mt-7 lg:mt-10">
                    <Swiper modules={[Navigation, Pagination, A11y]}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation={{
                            prevEl: ".swiper-prev-btn",
                            nextEl: ".swiper-next-btn",
                        }}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        className="pt-5! pb-5">
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="pb-6 h-auto">
                                <TestimonialCard testimonial={testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="flex items-center justify-center gap-5 mt-4 lg:mt-6">
                        <button className="swiper-prev-btn cursor-pointer w-12 h-12 rounded-2xl bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-110 active:scale-95">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <button className="swiper-next-btn cursor-pointer w-12 h-12 rounded-2xl bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-110 active:scale-95">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .testimonials-swiper-container .swiper-slide {
                    height: auto;
                }
                .testimonials-swiper-container .swiper-button-disabled {
                    opacity: 0.4 !important;
                }
            `}</style>
        </section>
    );
}