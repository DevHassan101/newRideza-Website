"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const FiMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" d="M4.5 6.5h15M4.5 12h15m-15 5.5h15" /></svg>
);

const IoMdClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6.6 h-6.5" viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd" strokeWidth="0.9" stroke="currentColor"><path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" /><path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" /></g></svg>
);

const bookRideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512"><path fill="currentColor" d="M294.396 52.127c-17.944.066-35.777 1.834-52.886 4.746c-86.727 14.76-135.612 53.467-161.99 107.824c31.215-2.434 62.002-5.024 91.966-4.838c24.114.15 47.696 2.097 70.54 7.37c15.15 3.5 24.652 16.647 27.607 31.735s.858 32.92-5.055 51.553l-.287.904l-.468.826c-7.762 13.64-24.263 24.498-45.295 35.994c-21.032 11.497-46.695 22.693-72.27 32.428s-51.012 17.98-71.575 23.437c-7.254 1.925-13.85 3.48-19.735 4.657c2.275 31.13 6.562 63.38 12.008 95.98c140.118-38.25 273.5-79.888 403.51-123.254c25.935-44.457 29.927-86.448 16.967-126.734c-22.393-69.605-60.9-107.048-105.215-126.168c-27.696-11.95-57.913-16.57-87.82-16.46zM130.184 179.205c-9.06.51-18.265 1.156-27.532 1.836L59.31 329.386c3.384-.79 6.936-1.663 10.754-2.676a531 531 0 0 0 12.66-3.554c10.022-31.07 43.3-131.415 47.46-143.95zm-46.7 3.262c-10.868.826-21.824 1.654-32.908 2.37c-.32.445-.714.947-1.318 2.267c-1.58 3.45-3.375 9.418-4.912 16.724c-3.075 14.612-5.37 34.727-6.705 54.877c-1.333 20.15-1.73 40.438-1.193 55.582c.268 7.572.79 13.905 1.442 17.96c.048.306.078.312.13.59c.46-.01 1.033-.044 1.546-.064zM224 183c-15.596 0-28.66 12.582-28.66 28.152s13.064 28.155 28.66 28.155s28.66-12.584 28.66-28.155c0-15.57-13.064-28.152-28.66-28.152m0 18c6.12 0 10.66 4.567 10.66 10.152c0 5.586-4.54 10.155-10.66 10.155s-10.66-4.57-10.66-10.155S217.88 201 224 201m230.19 144.865C330.383 386.852 203.285 426.23 70.054 462.56c.413 2.317.81 4.63 1.232 6.948c147.607-26.65 255.974-68.965 371.36-109.164a309 309 0 0 0 11.546-14.48z" strokeWidth="1" stroke="currentColor" /></svg>
);

const loginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5m-4 9.5A3.75 3.75 0 0 0 4.25 17v1.188c0 .754.546 1.396 1.29 1.517c4.278.699 8.642.699 12.92 0a1.54 1.54 0 0 0 1.29-1.517V17A3.75 3.75 0 0 0 16 13.25h-.34q-.28.001-.544.086l-.866.283a7.25 7.25 0 0 1-4.5 0l-.866-.283a1.8 1.8 0 0 0-.543-.086z" strokeWidth="0.1" stroke="currentColor"/></svg>
);

import Link from "next/link";

const menu = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Fair Services", path: "/services" },
  { name: "Safety", path: "/safety" },
  { name: "Blog", path: "/blogs" },
  { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkBaseLight = "relative px-3 py-2 transition-colors duration-30 text-black hover:text-cyan-400 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0 after:w-0 after:h-1 after:bg-cyan-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-6";

  const linkBaseDark = `relative px-3 py-2 transition-colors duration-300 ${scrolled ? "text-black" : "text-white"} hover:text-white after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0 after:w-0 after:h-1 after:bg-cyan-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-6`;

  const isActive = (path: string, isDark: boolean) => {
    const linkBase = isDark ? linkBaseDark : linkBaseLight;
    return pathname === path ? `${linkBase} after:w-6` : linkBase;
  };

  return (
    <>
      <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? "bg-white/90 backdrop-blur-sm border-b-2 border-cyan-400 px-2" : isHome ? "bg-white/20 lg:bg-white/5 border-b-2 border-transparent backdrop-blur-sm" : "bg-white/90 backdrop-blur-sm border-b-2 border-cyan-400"}`}>
        <nav className="flex justify-between items-center px-5 py-4 md:px-15">
          <div className="rideza-logo">
            <img src="/images/ridezalogo.webp" width="140" height="50" className="w-10 sm:w-12 md:16 lg:w-24" alt="rideza-logo" />
          </div>
          <ul className="hidden text-black text-[17px] font-medium lg:flex items-center gap-5 pb-1">
            {menu.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className={isActive(item.path, scrolled || isHome)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center">
              <Link href="/contact" className="hidden md:flex items-center bg-white text-lg font-semibold text-cyan-700 pl-6 pr-4 py-2 rounded-full border border-cyan-700 hover:bg-cyan-700 hover:text-white transition-all duration-300 group">
                Book Ride's
                <span className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-cyan-700 text-white group-hover:bg-white group-hover:text-cyan-700 transition-all duration-300">
                  {bookRideIcon()}
                </span>
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}
                className={`lg:hidden text-3xl transition-all duration-300 ${scrolled ? "text-cyan-400" : isHome ? "text-white" : "text-cyan-400"}`}>
                {isOpen ? <IoMdClose /> : <FiMenu />}
              </button>
            </div>
            <div className="flex items-center">
              <Link href="/login" className="hidden md:flex items-center bg-white text-lg font-semibold text-cyan-700 pl-6 pr-4 py-2 rounded-full border border-cyan-700 hover:bg-cyan-700 hover:text-white transition-all duration-300 group">
                Login
                <span className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-cyan-700 text-white group-hover:bg-white group-hover:text-cyan-700 transition-all duration-300">
                  {loginIcon()}
                </span>
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}
                className={`lg:hidden text-3xl transition-all duration-300 ${scrolled ? "text-cyan-400" : isHome ? "text-white" : "text-cyan-400"}`}>
                {isOpen ? <IoMdClose /> : <FiMenu />}
              </button>
            </div>
          </div>
        </nav>
        {/* mobile-menu */}
        {isOpen && (
          <div className={`lg:hidden p-5 border-t border-cyan-400 transition-all duration-300 
            ${scrolled || isHome ? "" : "bg-white/90"}`}>
            <ul className="flex flex-col items-center gap-3">
              {menu.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} onClick={() => setIsOpen(false)} className={`font-medium transition-colors duration-300 
                    ${scrolled ? "text-black" : "text-cyan-300 hover:text-cyan-400"}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}