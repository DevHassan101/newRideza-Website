"use client";

import { useState, useEffect } from "react";

interface Props {
  isOnline?: boolean;
  onNav:     (s: string) => void;
}

export default function ProfilePanel({ isOnline, onNav }: Props) {
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

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">

      {/* ── Sticky Header ── */}
      <div className="shrink-0 px-8 py-[13.5px] bg-white border-b border-zinc-200">
        <h1 className="font-bold text-gray-900 text-lg">My Profile</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage your account details</p>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-auto px-8 py-12">
        <div className="max-w-lg mx-auto space-y-4 pb-6">

          {/* Avatar card */}
          <div className="bg-linear-to-br from-cyan-50 to-white border border-cyan-100 rounded-2xl p-8 flex flex-col items-center">
            <div className="relative">
              {loading
                ? <div className="w-24 h-24 rounded-full bg-zinc-200 animate-pulse" />
                : (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-cyan-100">
                    {profilePic
                      ? <img src={profilePic} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-black text-white text-3xl">
                          {name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                    }
                  </div>
                )
              }
              {!loading && (
                <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white shadow ${isOnline ? "bg-cyan-400" : "bg-gray-300"}`} />
              )}
            </div>

            {loading
              ? <div className="h-5 w-36 rounded-md bg-zinc-200 animate-pulse mt-4" />
              : <p className="text-gray-900 font-bold text-xl mt-4 leading-none">{name || "..."}</p>
            }
            {loading
              ? <div className="h-3.5 w-48 rounded-md bg-zinc-200 animate-pulse mt-2" />
              : <p className="text-gray-400 text-xs mt-1.5">{email}</p>
            }

            {loading
              ? (
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-8 w-16 rounded-lg bg-zinc-200 animate-pulse" />
                  <div className="h-8 w-24 rounded-lg bg-zinc-200 animate-pulse" />
                </div>
              )
              : (
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-lg px-2.5 py-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-bold">4.5</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-cyan-500 text-white rounded-lg px-2.5 py-1.5 shadow-sm shadow-cyan-200">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs font-bold">1ABC234</span>
                  </div>
                </div>
              )
            }
          </div>

          {/* Info fields */}
          <div className="space-y-2">
            {[
              {
                label: "Phone",   value: phone,   iconBg: "bg-cyan-100",    iconColor: "text-cyan-500",
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
              },
              {
                label: "City",    value: city,    iconBg: "bg-emerald-100", iconColor: "text-emerald-500",
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              },
              {
                label: "Aadhaar", value: aadhaar, iconBg: "bg-violet-100",  iconColor: "text-violet-500",
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
              },
            ].map(f => (
              <div key={f.label}
                className="bg-white border border-gray-100 rounded-xl px-3.5 py-3 flex items-center gap-3 hover:shadow-sm transition-all">
                <div className={`w-8 h-8 ${f.iconBg} ${f.iconColor} rounded-lg flex items-center justify-center shrink-0`}>
                  {f.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">{f.label}</p>
                  {loading
                    ? <div className="h-3.5 w-28 rounded-md bg-zinc-200 animate-pulse mt-1" />
                    : <p className="text-sm text-gray-800 font-semibold mt-0.5">{f.value || "—"}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              onClick={() => onNav("personal-info")}
              className="w-full bg-linear-to-r from-cyan-500 to-cyan-400 cursor-pointer hover:from-cyan-600 hover:to-cyan-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-cyan-200 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
            <button className="w-full bg-white border border-gray-200 text-gray-500 cursor-pointer font-semibold py-3 rounded-xl text-sm hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}