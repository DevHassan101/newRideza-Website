"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // --- validation-rules ---
    const errors: Record<string, string> = {};

    if (!name.trim()) {
        errors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters.";
    }

    if (!phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s\-()]{11}$/.test(phone.trim())) {
        errors.phone = "Enter a valid phone number.";
    }

    if (!email.trim()) {
        errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
        errors.password = "Password must contain at least one number.";
    }

    const showError = (field: string) => (touched[field] || submitted) && errors[field];
    const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

    // --- helpers ---
    const ErrorMsg = ({ field }: { field: string }) =>
        showError(field) ? (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors[field]}
            </p>
        ) : null;

    const inputClass = (field: string) =>
        `w-full border-2 bg-zinc-50/80 text-black placeholder-zinc-400 rounded-[10px] pl-10 pr-4 py-3.5 text-[14.5px] focus:outline-none focus:bg-white focus:ring-2 transition-all duration-200 ${
            showError(field)
                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                : "border-zinc-200 focus:border-cyan-400 focus:ring-cyan-100"
        }`;

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setApiError(null);
        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setApiError(data.error || "Registration failed");
                return;
            }

            router.push("/login");

        } catch {
            setApiError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white min-h-screen flex items-center justify-center py-10">
            <div className="relative w-full max-w-[95%] md:max-w-[60%] lg:max-w-[38%]">
                <div className="relative w-full bg-white border border-cyan-300 rounded-3xl p-9 shadow-sm shadow-cyan-100">
                    {/* top-accent-strip */}
                    <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-linear-to-r from-cyan-300 via-cyan-500 to-cyan-300" />
                    {/* header */}
                    <div className="mb-8 mt-2">
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-sm shadow-cyan-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 24 24"><path fill="#fff" d="M12 3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5m-4 9.5A3.75 3.75 0 0 0 4.25 17v1.188c0 .754.546 1.396 1.29 1.517c4.278.699 8.642.699 12.92 0a1.54 1.54 0 0 0 1.29-1.517V17A3.75 3.75 0 0 0 16 13.25h-.34q-.28.001-.544.086l-.866.283a7.25 7.25 0 0 1-4.5 0l-.866-.283a1.8 1.8 0 0 0-.543-.086z" strokeWidth="0.1" stroke="#fff" /></svg>
                            </div>
                            <h1 className="text-[26px] font-bold text-cyan-500 tracking-wide leading-none">Register Here</h1>
                        </div>
                        <p className="text-zinc-400 text-sm tracking-wider pl-0.5">Fill the details below to get started.</p>
                    </div>
                    <form onSubmit={handleRegister} className="space-y-5" noValidate>
                        {/* full-name */}
                        <div className="group">
                            <label className="block text-[15px] font-semibold text-zinc-500 mb-2 tracking-wide">Full Name</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 group-focus-within:text-cyan-500 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" d="M7.75 7.5a4.25 4.25 0 1 1 8.5 0a4.25 4.25 0 0 1-8.5 0M12 4.75a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5m-4 10A2.25 2.25 0 0 0 5.75 17v1.188c0 .018.013.034.031.037c4.119.672 8.32.672 12.438 0a.04.04 0 0 0 .031-.037V17A2.25 2.25 0 0 0 16 14.75h-.34a.3.3 0 0 0-.079.012l-.865.283a8.75 8.75 0 0 1-5.432 0l-.866-.283a.3.3 0 0 0-.077-.012zM4.25 17A3.75 3.75 0 0 1 8 13.25h.34q.28.001.544.086l.866.283a7.25 7.25 0 0 0 4.5 0l.866-.283c.175-.057.359-.086.543-.086H16A3.75 3.75 0 0 1 19.75 17v1.188c0 .754-.546 1.396-1.29 1.517a40.1 40.1 0 0 1-12.92 0a1.54 1.54 0 0 1-1.29-1.517z" clipRule="evenodd" strokeWidth="0.1" stroke="currentColor" />
                                    </svg>
                                </span>
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value); handleBlur("name"); }} onBlur={() => handleBlur("name")} placeholder="Enter Your Name" className={inputClass("name")} />
                            </div>
                            <ErrorMsg field="name" />
                        </div>
                        {/* phone-number */}
                        <div className="group">
                            <label className="block text-[15px] font-semibold text-zinc-500 mb-2 tracking-wide">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24"><path fill="currentColor" d="m16.1 13.359l-.528-.532zm.456-.453l.529.532zm2.417-.317l-.358.66zm1.91 1.039l-.358.659zm.539 3.255l.529.532zm-1.42 1.412l-.53-.531zm-1.326.67l.07.747zm-9.86-4.238l.528-.532zM4.002 5.746l-.749.042zm6.474 1.451l.53.532zm.157-2.654l.6-.449zM9.374 2.86l-.601.45zM6.26 2.575l.53.532zm-1.57 1.56l-.528-.531zm7.372 7.362l.529-.532zm4.567 2.394l.455-.453l-1.058-1.064l-.455.453zm1.985-.643l1.91 1.039l.716-1.318l-1.91-1.038zm2.278 3.103l-1.42 1.413l1.057 1.063l1.42-1.412zm-2.286 1.867c-1.45.136-5.201.015-9.263-4.023l-1.057 1.063c4.432 4.407 8.65 4.623 10.459 4.454zm-9.263-4.023c-3.871-3.85-4.512-7.087-4.592-8.492l-1.498.085c.1 1.768.895 5.356 5.033 9.47zm1.376-6.18l.286-.286L9.95 6.666l-.287.285zm.515-3.921L9.974 2.41l-1.201.899l1.26 1.684zM5.733 2.043l-1.57 1.56l1.058 1.064l1.57-1.56zm4.458 5.44c-.53-.532-.53-.532-.53-.53h-.002l-.003.004a1 1 0 0 0-.127.157c-.054.08-.113.185-.163.318a2.1 2.1 0 0 0-.088 1.071c.134.865.73 2.008 2.256 3.526l1.058-1.064c-1.429-1.42-1.769-2.284-1.832-2.692c-.03-.194.001-.29.01-.312q.009-.02 0-.006a.3.3 0 0 1-.03.039l-.01.01l-.01.009zm1.343 4.546c1.527 1.518 2.676 2.11 3.542 2.242c.443.068.8.014 1.071-.087a1.5 1.5 0 0 0 .42-.236l.05-.045l.007-.006l.003-.003l.001-.002s.002-.001-.527-.533c-.53-.532-.528-.533-.528-.533l.002-.002l.002-.002l.006-.005l.01-.01l.038-.03q.014-.009-.007.002c-.025.009-.123.04-.32.01c-.414-.064-1.284-.404-2.712-1.824zm-1.56-9.62C8.954 1.049 6.95.834 5.733 2.044L6.79 3.107c.532-.529 1.476-.475 1.983.202zM4.752 5.704c-.02-.346.139-.708.469-1.036L4.163 3.604c-.537.534-.96 1.29-.909 2.184zm14.72 12.06c-.274.274-.57.428-.865.455l.139 1.494c.735-.069 1.336-.44 1.784-.885zM11.006 7.73c.985-.979 1.058-2.527.229-3.635l-1.201.899c.403.539.343 1.246-.085 1.673zm9.52 6.558c.817.444.944 1.49.367 2.064l1.058 1.064c1.34-1.333.927-3.557-.71-4.446zm-3.441-.849c.384-.382 1.002-.476 1.53-.19l.716-1.317c-1.084-.59-2.428-.427-3.304.443z" /></svg>
                                </span>
                                <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); handleBlur("phone"); }} onBlur={() => handleBlur("phone")} placeholder="Enter Your Number" className={inputClass("phone")} />
                            </div>
                            <ErrorMsg field="phone" />
                        </div>
                        {/* user-email */}
                        <div className="group">
                            <label className="block text-[15px] font-semibold text-zinc-500 mb-2 tracking-wide">Email</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" d="M2.804 8.353c-.28 2.603-.268 5.605.122 8.198a3.14 3.14 0 0 0 2.831 2.66l1.51.13c3.15.274 6.316.274 9.466 0l1.51-.13a3.14 3.14 0 0 0 2.831-2.66c.39-2.593.402-5.595.122-8.198a30 30 0 0 0-.122-.904a3.14 3.14 0 0 0-2.831-2.66l-1.51-.13a54.7 54.7 0 0 0-9.465 0l-1.51.13a3.14 3.14 0 0 0-2.832 2.66q-.068.452-.122.904m4.593-2.2a53 53 0 0 1 9.205 0l1.51.131a1.64 1.64 0 0 1 1.479 1.389l.034.233l-5.561 3.09a4.25 4.25 0 0 1-4.128 0l-5.561-3.09l.034-.233a1.64 1.64 0 0 1 1.478-1.389zM19.808 9.52a29 29 0 0 1-.217 6.807a1.64 1.64 0 0 1-1.478 1.389l-1.51.131a53 53 0 0 1-9.206 0l-1.51-.131a1.64 1.64 0 0 1-1.478-1.389a29 29 0 0 1-.218-6.807l5.016 2.787a5.75 5.75 0 0 0 5.585 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); handleBlur("email"); }} onBlur={() => handleBlur("email")} placeholder="Enter Your Email" className={inputClass("email")} />
                            </div>
                            <ErrorMsg field="email" />
                        </div>
                        {/* user-password */}
                        <div className="group">
                            <label className="block text-[15px] font-semibold text-zinc-500 mb-2 tracking-wide">Password</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                                        <g fill="none"><path stroke="currentColor" strokeWidth="2" d="M4 13c0-1.886 0-2.828.586-3.414S6.114 9 8 9h8c1.886 0 2.828 0 3.414.586S20 11.114 20 13v2c0 2.828 0 4.243-.879 5.121C18.243 21 16.828 21 14 21h-4c-2.828 0-4.243 0-5.121-.879C4 19.243 4 17.828 4 15z" /><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 8V7a4 4 0 0 0-8 0v1" /><circle cx="12" cy="15" r="2" fill="currentColor" /></g>
                                    </svg>
                                </span>
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); handleBlur("password"); }} onBlur={() => handleBlur("password")} placeholder="Enter Your Password"
                                    className={`${inputClass("password")} pr-12`} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-500 transition-colors">
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <ErrorMsg field="password" />
                        </div>

                        {/* api-error */}
                        {apiError && (
                            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
                                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {apiError}
                            </p>
                        )}

                        {/* submit-button */}
                        <div className="pt-1">
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full cursor-pointer overflow-hidden bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold py-3.75 rounded-[10px] text-[15px] tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-cyan-300/50 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed group"
                            >
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {loading ? "Creating account..." : "Sign Up"}
                                    {!loading && (
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                    {/* divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-zinc-200" />
                        <span className="text-xs text-zinc-400 tracking-wider">OR</span>
                        <div className="flex-1 h-px bg-zinc-200" />
                    </div>
                    {/* footer */}
                    <p className="text-center text-zinc-500 text-[14px]">
                        Already have an account ?
                        <Link href="/login" className="pl-2 font-semibold text-cyan-500 underline underline-offset-2 hover:text-cyan-600 transition-colors">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}