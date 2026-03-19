"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav  from "../_components/mobile/BottomNav";
import PageHeader from "../_components/shared/PageHeader";

const MOBILE_ROUTES: Record<string, string> = {
  home:            "/driver/live-rides",
  profile:         "/driver/profile",
  "personal-info": "/driver/onboarding",
};

export default function ProfilePage() {
  const router = useRouter();
  const [user,    setUser]    = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(data => { setUser(data.user); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const name       = user?.name                      ?? "";
  const email      = user?.email                     ?? "";
  const phone      = user?.phone                     ?? "";
  const city       = user?.driverProfile?.city       ?? "";
  const aadhaar    = user?.driverProfile?.aadhaar    ?? "";
  const profilePic = user?.driverProfile?.profilePic ?? "";

  const goTo = (s: string) => router.push(MOBILE_ROUTES[s] ?? "/driver/live-rides");

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-auto">

        <div className="bg-white border-b border-gray-100">
          <PageHeader title="Profile" onBack={() => goTo("home")} />
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

          {/* Avatar card */}
          <div className="bg-linear-to-br from-cyan-50 to-white border border-cyan-100 rounded-2xl p-6 flex flex-col items-center shadow-sm">
            <div className="relative">

              {/* Avatar skeleton */}
              {loading
                ? <div className="w-20 h-20 rounded-full bg-zinc-200 animate-pulse"/>
                : (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-cyan-100">
                    {profilePic
                      ? <img src={profilePic} alt="" className="w-full h-full object-cover"/>
                      : <div className="w-full h-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-black text-3xl text-white">
                          {name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                    }
                  </div>
                )
              }

              {!loading && (
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <circle cx="12" cy="13" r="3" strokeWidth={2}/>
                  </svg>
                </button>
              )}
            </div>

            {/* Name skeleton */}
            {loading
              ? <div className="h-5 w-36 rounded-md bg-zinc-200 animate-pulse mt-3"/>
              : <p className="mt-3 font-bold text-gray-900 text-lg leading-none">{name || "..."}</p>
            }

            {/* Email skeleton */}
            {loading
              ? <div className="h-3.5 w-48 rounded-md bg-zinc-200 animate-pulse mt-2"/>
              : <p className="text-gray-400 text-xs mt-1">{email}</p>
            }

            {/* Badges skeleton */}
            {loading
              ? (
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-8 w-16 rounded-xl bg-zinc-200 animate-pulse"/>
                  <div className="h-8 w-24 rounded-xl bg-zinc-200 animate-pulse"/>
                </div>
              )
              : (
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl px-3.5 py-2">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-bold text-sm">4.5</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-cyan-500 text-white rounded-xl px-3.5 py-2 shadow-sm shadow-cyan-200">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <span className="font-bold text-sm">1ABC234</span>
                  </div>
                </div>
              )
            }
          </div>

          {/* Info fields */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Account Details</p>
            </div>
            {[
              {
                label: "Phone", value: phone, iconBg: "bg-cyan-100", iconColor: "text-cyan-500",
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
              },
              {
                label: "City", value: city, iconBg: "bg-emerald-100", iconColor: "text-emerald-500",
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
              },
              {
                label: "Aadhaar", value: aadhaar, iconBg: "bg-violet-100", iconColor: "text-violet-500",
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>,
              },
            ].map((f, i) => (
              <div key={f.label}
                className={"flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors" + (i > 0 ? " border-t border-gray-100" : "")}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${f.iconBg} ${f.iconColor}`}>
                  {f.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">{f.label}</p>
                  {loading
                    ? <div className="h-3.5 w-28 rounded-md bg-zinc-200 animate-pulse mt-1"/>
                    : <p className="text-sm font-semibold text-gray-800 mt-0.5">{f.value || "—"}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <button onClick={() => goTo("personal-info")}
            className="w-full bg-linear-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-lg shadow-cyan-200 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit Profile
          </button>

          <button className="w-full bg-white border border-red-200 text-red-500 hover:bg-red-50 font-bold py-4 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete Account
          </button>
        </div>
      </div>

      <BottomNav active="profile" onNav={goTo}/>
    </div>
  );
}