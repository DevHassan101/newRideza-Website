"use client";

import Image from "next/image";

export default function HomeAbout() {
    return (
        <section className=" py-10 md:py-24 px-7 lg:px-28">
            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="relative order-2 lg:order-1">
                        {/* Enhanced decorative elements */}
                        <div className="absolute -top-6 lg:-top-10 -left-10 w-50 h-50 lg:w-56 lg:h-56 bg-linear-to-br from-cyan-400 to-cyan-500 opacity-15 rounded-3xl transform"></div>
                        <div className="absolute top-5 lg:top-20 -right-3 lg:-right-8 w-18 h-18 lg:w-20 lg:h-20 bg-cyan-400 opacity-20 rounded-full"></div>
                        <div className="absolute -bottom-5 lg:-bottom-8 right-7 lg:right-10 w-15 h-15 lg:w-16 lg:h-16 border-4 border-cyan-400/30 rounded-full"></div>

                        <div className="relative grid grid-cols-2 gap-2 lg:gap-4">
                            {/* Large image - spans 2 rows with enhanced styling */}
                            <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-xl border-3 border-white relative group">
                                <Image src="/images/about1.jpg" alt="Auto Ride" width={300} height={600}
                                    className="object-cover w-full h-full" />
                                {/* Gradient overlay on bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/60 to-transparent"></div>
                                {/* Service label */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                                        <p className="text-xs text-gray-600 font-medium mb-0.5">Auto Rickshaw</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold text-gray-900">₹29 <span className="text-xs font-normal text-gray-500">/ ride</span></p>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xs font-semibold text-gray-700">4.8</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Top right image with icon badge */}
                            <div className="rounded-2xl overflow-hidden shadow-xl border-3 border-white relative">
                                <div className="relative h-36 lg:h-58">
                                    <Image src="/images/about2.avif" alt="Delivery Service" width={300} height={400}
                                        className="object-cover w-full h-full" />
                                    {/* Icon badge */}
                                    <div className="absolute top-3 left-3 bg-cyan-400 rounded-lg p-2 shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    {/* Service name */}
                                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                                        <p className="text-xs font-bold text-gray-900">Parcel Delivery</p>
                                    </div>
                                </div>
                            </div>
                            {/* Middle right image with icon badge */}
                            <div className="rounded-2xl overflow-hidden shadow-xl border-3 border-white relative">
                                <div className="relative h-36 lg:h-52">
                                    <Image src="/images/about3.webp" alt="Bike Ride" width={300} height={200}
                                        className="object-cover w-full h-full" />
                                    {/* Icon badge */}
                                    <div className="absolute top-3 left-3 bg-cyan-400 rounded-lg p-2 shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    {/* Service name */}
                                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                                        <p className="text-xs font-bold text-gray-900">Bike Taxi</p>
                                    </div>
                                </div>
                            </div>
                            {/* Bottom full width image with premium styling */}
                            <div className="col-span-2 rounded-2xl overflow-hidden shadow-xl border-3 border-white relative">
                                <div className="relative h-54 lg:h-60">
                                    <Image src="/images/about4.avif" alt="Car Ride" width={600} height={200}
                                        className="object-cover w-full h-full" />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-cyan-400/10"></div>
                                    {/* Premium badge with star */}
                                    <div className="absolute top-4 right-4 bg-linear-to-r from-cyan-400 to-cyan-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Most Popular
                                    </div>
                                    {/* Bottom info bar */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-600 font-medium mb-0.5">Premium Car</p>
                                            <p className="text-sm font-bold text-gray-900">₹99 <span className="text-xs font-normal text-gray-500">/ ride</span></p>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <span className="font-medium">4 Seats</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                <span className="font-medium">Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Enhanced stats card with multiple metrics */}
                        <div className="absolute -top-7.5 -left-7.5 bg-white rounded-2xl shadow-2xl py-2 px-5 hidden lg:block border-2 border-cyan-50">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12.5 h-12.5 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    {/* Active indicator dot */}
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <p className="text-[22px] font-bold text-gray-900">1000+</p>
                                    <p className="text-xs text-gray-600 font-medium">Happy Customers</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-xs font-semibold text-gray-700">4.9 Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative z-10">
                        {/* Premium tag with icon */}
                        <div className="inline-flex items-center gap-2 bg-cyan-100 px-4 py-2 rounded-full mb-5 border border-cyan-200">
                            <div className="w-2 h-2 bg-cyan-700 rounded-full animate-pulse"></div>
                            <p className="text-[13px] font-bold text-cyan-800 uppercase tracking-widest">
                                Welcome to Rideza
                            </p>
                        </div>
                        {/* Creative heading with gradient */}
                        <h2 className="text-4xl md:text-5xl lg:text-[51px] font-bold leading-tight mb-4">
                            <span className="text-gray-900">Get Quick Rides,</span>
                            <br />
                            <span className="bg-linear-to-r from-cyan-500 via-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                                Low Fares
                            </span>
                        </h2>
                        {/* Decorative line */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-15 h-1.5 bg-linear-to-r from-cyan-400 to-cyan-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                        </div>
                        {/* Description with better spacing */}
                        <p className="text-gray-600 text-base md:text-[16.5px] leading-relaxed pr-10 mb-7">
                            In Rideza we ensure our customers get rides quickly at the most
                            affordable prices. We successfully cope with tasks of varying complexity,
                            provide long-term guarantees and regularly master new technologies.
                        </p>
                        {/* Enhanced feature cards */}
                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="shrink-0 w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">24/7 Support</h3>
                                    <p className="text-sm text-gray-600">Always here to help you anytime, anywhere</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="shrink-0 w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Online Booking</h3>
                                    <p className="text-sm text-gray-600">Quick and easy reservations in seconds</p>
                                </div>
                            </div>
                        </div>
                        {/* Premium CTA button */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <button className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-400 to-cyan-500 text-white cursor-pointer px-8 py-4 rounded-full font-bold text-base shadow-lg">
                                Book Your Ride
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            {/* Secondary info */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 flex justify-center items-center rounded-full bg-cyan-600 border-2 border-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20"><path fill="#fff" fillRule="evenodd" d="M10 4.543c-1.25-.98-2.965-1.245-4.432-.895C3.678 4.1 2 5.621 2 8.163c0 3.326 2.88 6.016 7.571 8.24a1 1 0 0 0 .857 0C15.12 14.18 18 11.49 18 8.164c0-2.542-1.678-4.064-3.568-4.515c-1.467-.35-3.183-.084-4.432.895" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="w-8 h-8 flex justify-center items-center rounded-full bg-cyan-600 border-2 border-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512"><path fill="#fff" d="M294.396 52.127c-17.944.066-35.777 1.834-52.886 4.746c-86.727 14.76-135.612 53.467-161.99 107.824c31.215-2.434 62.002-5.024 91.966-4.838c24.114.15 47.696 2.097 70.54 7.37c15.15 3.5 24.652 16.647 27.607 31.735s.858 32.92-5.055 51.553l-.287.904l-.468.826c-7.762 13.64-24.263 24.498-45.295 35.994c-21.032 11.497-46.695 22.693-72.27 32.428s-51.012 17.98-71.575 23.437c-7.254 1.925-13.85 3.48-19.735 4.657c2.275 31.13 6.562 63.38 12.008 95.98c140.118-38.25 273.5-79.888 403.51-123.254c25.935-44.457 29.927-86.448 16.967-126.734c-22.393-69.605-60.9-107.048-105.215-126.168c-27.696-11.95-57.913-16.57-87.82-16.46zM130.184 179.205c-9.06.51-18.265 1.156-27.532 1.836L59.31 329.386c3.384-.79 6.936-1.663 10.754-2.676a531 531 0 0 0 12.66-3.554c10.022-31.07 43.3-131.415 47.46-143.95zm-46.7 3.262c-10.868.826-21.824 1.654-32.908 2.37c-.32.445-.714.947-1.318 2.267c-1.58 3.45-3.375 9.418-4.912 16.724c-3.075 14.612-5.37 34.727-6.705 54.877c-1.333 20.15-1.73 40.438-1.193 55.582c.268 7.572.79 13.905 1.442 17.96c.048.306.078.312.13.59c.46-.01 1.033-.044 1.546-.064zM224 183c-15.596 0-28.66 12.582-28.66 28.152s13.064 28.155 28.66 28.155s28.66-12.584 28.66-28.155c0-15.57-13.064-28.152-28.66-28.152m0 18c6.12 0 10.66 4.567 10.66 10.152c0 5.586-4.54 10.155-10.66 10.155s-10.66-4.57-10.66-10.155S217.88 201 224 201m230.19 144.865C330.383 386.852 203.285 426.23 70.054 462.56c.413 2.317.81 4.63 1.232 6.948c147.607-26.65 255.974-68.965 371.36-109.164a309 309 0 0 0 11.546-14.48z" strokeWidth="13" stroke="#fff" /></svg>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-cyan-700 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                        +500
                                    </div>
                                </div>
                                <p className="font-medium">Daily riders trust us</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}