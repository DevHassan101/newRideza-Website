"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPending = searchParams.get("status") === "pending";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // --- validation-rules ---
    const errors: Record<string, string> = {};

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setApiError(null);
        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setApiError(data.error || "Login failed");
                return;
            }

            // Role ke basis par redirect
            const role = data.user.role;
            if (role === "ADMIN") {
                router.push("/admin");
            } else if (role === "DRIVER") {
                router.push("/driver");
            } else {
                router.push("/user");
            }

        } catch {
            setApiError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white min-h-screen flex items-center justify-center py-10">
            <div className="relative w-full max-w-[95%] md:max-w-[60%] lg:max-w-[34%]">
                <div className="relative w-full bg-white border border-cyan-300 rounded-3xl p-9 shadow-sm shadow-cyan-100">
                    {/* top-accent-strip */}
                    <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-linear-to-r from-cyan-300 via-cyan-500 to-cyan-300" />

                    {/* pending-notice — driver register ke baad aata hai */}
                    {isPending && (
                        <div className="mb-6 mt-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                            <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="text-sm font-semibold text-amber-700">Registration Successful!</p>
                                <p className="text-xs text-amber-600 mt-0.5">Your driver account is pending admin approval. You will be able to login once approved.</p>
                            </div>
                        </div>
                    )}

                    {/* header */}
                    <div className="mb-8 mt-2">
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-sm shadow-cyan-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 24 24"><path fill="#fff" d="M12 3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5m-4 9.5A3.75 3.75 0 0 0 4.25 17v1.188c0 .754.546 1.396 1.29 1.517c4.278.699 8.642.699 12.92 0a1.54 1.54 0 0 0 1.29-1.517V17A3.75 3.75 0 0 0 16 13.25h-.34q-.28.001-.544.086l-.866.283a7.25 7.25 0 0 1-4.5 0l-.866-.283a1.8 1.8 0 0 0-.543-.086z" strokeWidth="0.1" stroke="#fff" /></svg>
                            </div>
                            <h1 className="text-[26px] font-bold text-cyan-500 tracking-wide leading-none">Login Here</h1>
                        </div>
                        <p className="text-zinc-400 text-sm tracking-wider pl-0.5">Fill the details below to get started.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5" noValidate>
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
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); handleBlur("password"); }} onBlur={() => handleBlur("password")} placeholder="Enter Your Password" className={`${inputClass("password")} pr-12`} />
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
                                    {loading ? "Signing in..." : "Sign In"}
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
                        Hey you have an account ?
                        <Link href="/register" className="pl-2 font-semibold text-cyan-500 underline underline-offset-2 hover:text-cyan-600 transition-colors">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}