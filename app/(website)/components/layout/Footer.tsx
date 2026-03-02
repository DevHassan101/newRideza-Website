import Link from "next/link";
import Image from "next/image";

const usefulLinksLeft = [
  { label: "About", href: "#" },
  { label: "Our Vehicles", href: "#" },
  { label: "Services", href: "#" },
  { label: "Package", href: "#" },
  { label: "Login", href: "#" },
];

const usefulLinksRight = [
  { label: "Get a Cab", href: "#" },
  { label: "Reviews", href: "#" },
  { label: "Our News", href: "#" },
];

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-cyan-400 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-black/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-8 lg:px-28 pt-10 pb-8 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          <div className="flex justify-center lg:justify-start items-center gap-3">
            <Image src="/images/ridezalogo.webp" width={140} height={50} sizes="(max-width: 1024px) 100px, 120px" className="w-25 md:w-auto lg:w-auto" alt="rideza-logo" priority />
          </div>
          <p className="text-white text-sm lg:text-[15px] leading-relaxed text-center">
            Authoritatively simplify open-source resources via backend visualize business e-markets before parallel.
          </p>
          <div className="flex justify-center lg:justify-end">
            <div className="relative group bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 border-2 border-white hover:to-cyan-700 px-5 lg:px-6 py-3 md:py-4 lg:py-4 rounded-xl lg:rounded-2xl flex items-center gap-4 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              <div className="text-white">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-100">Call for Taxi</p>
                <p className="text-lg lg:text-xl font-black tracking-tight text-white">5267-214-392</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-8 lg:mx-28">
        <div className="h-px bg-white/80" />
      </div>

      <div className="relative z-10 px-8 lg:px-28 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="footer-column-1">
            <div className="mb-5">
              <h3 className="text-[17px] font-bold uppercase tracking-widest text-white inline-block pb-3 relative">
                Useful Links
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-cyan-400 to-cyan-600 rounded-full" />
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-5">
              <ul className="space-y-3">
                {usefulLinksLeft.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="flex items-center gap-2 text-white text-md font-medium hover:text-cyan-600 transition-colors duration-200 group/link">
                      <span className="w-5 h-5 rounded-lg bg-black/15 group-hover/link:bg-black/30 flex items-center justify-center transition-colors duration-200">
                        <svg className="w-3 h-3 text-white group-hover/link:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {usefulLinksRight.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="flex items-center gap-2 text-white text-md font-medium hover:text-cyan-600 transition-colors duration-200 group/link">
                      <span className="w-5 h-5 rounded-lg bg-black/15 group-hover/link:bg-black/30 flex items-center justify-center transition-colors duration-200">
                        <svg className="w-3 h-3 text-white group-hover/link:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-column-2">
            <div className="mb-5">
              <h3 className="text-[17px] font-bold uppercase tracking-widest text-white inline-block pb-3 relative">
                Contact Us
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-cyan-400 to-cyan-600 rounded-full" />
              </h3>
            </div>
            <ul className="mt-5 space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3 group/item">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-black/15 group-hover/item:bg-black/30 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-black/60 uppercase tracking-wide font-semibold mb-1">Our Location</p>
                  <p className="text-white/95 text-sm font-medium hover:text-cyan-600 leading-snug group-hover/item:text-gray-300 transition-colors duration-300">123 Ride Street, City Center,<br />Karachi, Pakistan</p>
                </div>
              </li>
              {/* Email */}
              <li className="flex items-start gap-3 group/item">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-black/15 group-hover/item:bg-black/30 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-black/60 uppercase tracking-wide font-semibold mb-1">Email Us</p>
                  <a href="mailto:support@citycab.com" className="text-white/95 text-sm font-medium hover:text-cyan-600 transition-colors duration-200">support@citycab.com</a>
                </div>
              </li>
              {/* Working Hours */}
              <li className="flex items-start gap-3 group/item">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-black/15 group-hover/item:bg-black/30 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-black/60 uppercase tracking-wide font-semibold mb-1">Working Hours</p>
                  <p className="text-white/95 text-sm font-medium hover:text-cyan-600 group-hover/item:text-gray-300 transition-colors duration-300">Mon – Sat: 8:00 AM – 10:00 PM</p>
                  <p className="text-white/85 text-xs font-medium mt-0.5">Sun: 10:00 AM – 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="footer-column-3">
            <div className="mb-5">
              <h3 className="text-[17px] font-bold uppercase tracking-widest text-white inline-block pb-3 relative">
                Newsletter
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-cyan-400 to-cyan-600 rounded-full" />
              </h3>
            </div>
            <p className="text-white text-[15px] font-medium leading-relaxed mt-5 mb-5">
              Signup for our weekly newsletter or updates.
            </p>
            <div className="space-y-3">
              <div className="relative group/input">
                <input
                  type="email"
                  placeholder="Enter Your email..."
                  className="w-full bg-white/80 border border-white/10 hover:border-cyan-400/30 focus:border-cyan-400/60 text-black text-sm px-4 py-4 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-gray-500 focus:bg-white focus:shadow-lg focus:shadow-cyan-500/10"
                />
              </div>
              <button className="relative w-full bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 overflow-hidden group/btn shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 flex items-center justify-center gap-3">
                <span className="text-[15px] font-bold uppercase tracking-widest relative z-10">Subscribe</span>
                <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-8 lg:mx-25">
        <div className="h-px bg-white/80" />
      </div>

      <div className="relative z-10">
        <div className="px-5 lg:px-25 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm">
            © Copyright
            <span className="text-white font-semibold pl-1">Rideza</span> Developed By
            <span className="text-black font-semibold pl-1">ByteCloude.</span>
          </p>
          <div className="flex items-center gap-2">
            {[
              {
                label: "Facebook",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                label: "Twitter",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-9 h-9 rounded-xl bg-black/5 hover:bg-linear-to-br hover:from-cyan-400 hover:to-cyan-600 border border-transparent hover:border-white flex items-center justify-center text-white hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-110"
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}