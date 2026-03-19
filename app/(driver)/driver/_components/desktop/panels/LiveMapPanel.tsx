"use client";

import { useState, useEffect } from "react";

const MOCK_REQUEST = {
  passenger:   { name: "Arjun Mehta", initials: "AM", rating: 4.8, trips: 124 },
  pickup:      "Banjara Hills, Road No. 12, Hyderabad",
  drop:        "Hitech City Metro Station, Madhapur",
  fare:        280,
  distance:    "6.4 km",
  eta:         "14 min",
  paymentMode: "Cash",
};

const TODAY_STATS = [
  { label: "Rides",    value: "0",  color: "text-cyan-600",    bg: "bg-cyan-50",    border: "border-cyan-100"    },
  { label: "Earnings", value: "₹0", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { label: "Rating",   value: "—",  color: "text-amber-500",   bg: "bg-amber-50",   border: "border-amber-100"   },
  { label: "Hours",    value: "0h", color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100"  },
];

const TIMER_MAX = 18;

interface Props {
  isOnline:   boolean;
  fullWidth?: boolean;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function RequestSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse ${compact ? "" : "shadow-lg"}`}>
      <div className="h-1 bg-gray-200"/>
      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-zinc-200"/>
            <div className="space-y-2">
              <div className="h-3.5 w-28 bg-zinc-200 rounded-md"/>
              <div className="h-3 w-20 bg-zinc-200 rounded-md"/>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-zinc-200"/>
        </div>
        <div className="bg-gray-100 rounded-xl p-3 mb-3 space-y-3">
          <div className="flex gap-2.5">
            <div className="w-5 h-5 rounded-full bg-zinc-200 shrink-0"/>
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-12 bg-zinc-200 rounded"/>
              <div className="h-3 w-40 bg-zinc-200 rounded"/>
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="w-5 h-5 rounded-full bg-zinc-200 shrink-0"/>
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-12 bg-zinc-200 rounded"/>
              <div className="h-3 w-36 bg-zinc-200 rounded"/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[1,2,3].map(i => <div key={i} className="h-14 bg-zinc-200 rounded-xl"/>)}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="h-11 bg-zinc-200 rounded-xl"/>
          <div className="h-11 bg-zinc-200 rounded-xl"/>
        </div>
      </div>
    </div>
  );
}

// ── Request Card ──────────────────────────────────────────────────────────────
function RequestCard({ compact = false, onAccept, onDecline, visible }: {
  compact?:  boolean;
  onAccept:  () => void;
  onDecline: () => void;
  visible:   boolean;
}) {
  const [timer,      setTimer]      = useState(TIMER_MAX);
  const [offerMode,  setOfferMode]  = useState(false);
  const [customFare, setCustomFare] = useState(MOCK_REQUEST.fare.toString());

  useEffect(() => {
    if (timer <= 0) { onDecline(); return; }
    const t = setTimeout(() => setTimer(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const pct       = (timer / TIMER_MAX) * 100;
  const ringColor = timer > 10 ? "#22d3ee" : timer > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden transition-all duration-500
      ${compact ? "" : "shadow-lg"}
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

      <div className="h-1 bg-gray-100">
        <div className="h-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: ringColor }}/>
      </div>

      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-black text-white text-base shrink-0">
              {MOCK_REQUEST.passenger.initials}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{MOCK_REQUEST.passenger.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-[11px] text-gray-500 font-semibold">
                  {MOCK_REQUEST.passenger.rating} · {MOCK_REQUEST.passenger.trips} trips
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-11 h-11 shrink-0">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="#f3f4f6" strokeWidth="3.5"/>
              <circle cx="22" cy="22" r="18" fill="none" stroke={ringColor} strokeWidth="3.5"
                strokeDasharray={`${2 * Math.PI * 18}`}
                strokeDashoffset={`${2 * Math.PI * 18 * (1 - pct / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-700">{timer}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-white"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Pickup</p>
              <p className="text-xs text-gray-800 font-semibold mt-0.5 leading-tight">{MOCK_REQUEST.pickup}</p>
            </div>
          </div>
          <div className="ml-2.5 w-px h-3 bg-dashed border-l-2 border-dashed border-gray-300"/>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Drop</p>
              <p className="text-xs text-gray-800 font-semibold mt-0.5 leading-tight">{MOCK_REQUEST.drop}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-2.5 text-center">
            <p className="text-base font-black text-cyan-600">₹{MOCK_REQUEST.fare}</p>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{MOCK_REQUEST.paymentMode}</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center">
            <p className="text-base font-black text-gray-700">{MOCK_REQUEST.distance}</p>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Distance</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center">
            <p className="text-base font-black text-gray-700">{MOCK_REQUEST.eta}</p>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">ETA</p>
          </div>
        </div>

        {offerMode ? (
          <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-[11px] text-amber-700 font-bold mb-2">Your Counter Fare (₹)</p>
            <div className="flex items-center gap-2">
              <input type="number" value={customFare} onChange={e => setCustomFare(e.target.value)}
                className="flex-1 bg-white border border-amber-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-amber-300"/>
              <button onClick={onAccept} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">Send</button>
              <button onClick={() => setOfferMode(false)} className="text-gray-400 hover:text-gray-600 text-xs font-semibold px-2 py-2 transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setOfferMode(true)}
            className="w-full text-[11px] text-amber-600 font-bold py-1.5 mb-2 hover:bg-amber-50 rounded-lg transition-colors flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Negotiate Fare
          </button>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={onDecline} className="py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">Decline</button>
          <button onClick={onAccept} className="py-3 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-200 transition-all">Accept</button>
        </div>
      </div>
    </div>
  );
}

// ── Waiting state ─────────────────────────────────────────────────────────────
function WaitingState({ isOnline, compact = false }: { isOnline: boolean; compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "py-6 px-4" : "py-10 px-6"}`}>
      <div className={`rounded-2xl flex items-center justify-center mb-4 ${compact ? "w-14 h-14" : "w-20 h-20"} ${isOnline ? "bg-cyan-50" : "bg-gray-100"}`}>
        {isOnline ? (
          <svg className={`${compact ? "w-7 h-7" : "w-10 h-10"} text-cyan-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M8.464 15.536a5 5 0 010-7.072m7.072 0a5 5 0 010 7.072M13 12a1 1 0 11-2 0 1 1 0 012 0z"/>
          </svg>
        ) : (
          <svg className={`${compact ? "w-7 h-7" : "w-10 h-10"} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        )}
      </div>
      <p className={`font-bold text-gray-800 ${compact ? "text-sm" : "text-base"}`}>
        {isOnline ? "Waiting for ride requests..." : "You're Offline"}
      </p>
      <p className={`text-gray-400 mt-1 ${compact ? "text-[11px]" : "text-sm"}`}>
        {isOnline ? "Stay near high-demand areas for faster requests" : "Toggle online from the left panel to start earning"}
      </p>
      {isOnline && (
        <div className="flex items-center gap-1.5 mt-3 bg-cyan-50 border border-cyan-100 text-cyan-600 text-[11px] font-bold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"/>
          Live — Scanning for rides
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LiveMapPanel({ isOnline, fullWidth = false }: Props) {
  const [hasRequest,  setHasRequest]  = useState(true);
  const [cardVisible, setCardVisible] = useState(false);
  const [isLoading,   setIsLoading]   = useState(true);

  // Skeleton — 1.2s
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setCardVisible(true), 50);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const handleAccept  = () => { setCardVisible(false); setTimeout(() => setHasRequest(false), 400); };
  const handleDecline = () => { setCardVisible(false); setTimeout(() => setHasRequest(false), 400); };

  // ── Narrow ────────────────────────────────────────────────────────────────
  if (!fullWidth) {
    return (
      <div className="w-full bg-white flex flex-col rounded-t-xl shadow-[0_-5px_24px_rgba(0,0,0,0.15)] max-h-80">
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-sm">Incoming Request</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {isOnline ? "Reviewing ride request" : "Go online to receive rides"}
          </p>
        </div>
        <div className="p-4 flex-1 overflow-auto">
          {isLoading
            ? <RequestSkeleton compact/>
            : hasRequest && isOnline
              ? <RequestCard compact onAccept={handleAccept} onDecline={handleDecline} visible={cardVisible}/>
              : <WaitingState isOnline={isOnline} compact/>
          }
        </div>
      </div>
    );
  }

  // ── Full-width ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-auto">
      <div className="shrink-0 px-8 py-[13.5px] bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-gray-900 text-lg">Live Requests</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {isOnline ? "Accepting ride requests" : "Go online to receive rides"}
            </p>
          </div>
          {isOnline && (
            <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-200 text-cyan-600 text-xs font-bold px-3.5 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
              Live — Scanning
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="h-3 w-32 bg-zinc-200 rounded animate-pulse mb-3"/>
              <RequestSkeleton/>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse">
                <div className="h-3 w-28 bg-zinc-200 rounded mb-4"/>
                <div className="grid grid-cols-2 gap-3">
                  {[1,2,3,4].map(i => <div key={i} className="h-16 bg-zinc-200 rounded-xl"/>)}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 animate-pulse space-y-2">
                <div className="h-3 w-20 bg-amber-200 rounded"/>
                {[1,2,3].map(i => <div key={i} className="h-2.5 bg-amber-200 rounded w-full"/>)}
              </div>
            </div>
          </div>
        ) : hasRequest && isOnline ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-3">New Ride Request</p>
              <RequestCard onAccept={handleAccept} onDecline={handleDecline} visible={cardVisible}/>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Today's Activity</p>
                <div className="grid grid-cols-2 gap-3">
                  {TODAY_STATS.map(s => (
                    <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3`}>
                      <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                      <p className="text-[11px] text-gray-500 font-semibold mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-xs font-bold text-amber-700">Quick Tips</p>
                </div>
                <ul className="space-y-1.5">
                  {["You have 18 sec to accept or decline","Negotiate fare before accepting","Accepting more rides improves your score"].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-amber-700">
                      <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0"/>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <WaitingState isOnline={isOnline}/>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Today's Activity</p>
              <div className="grid grid-cols-2 gap-3">
                {TODAY_STATS.map(s => (
                  <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3`}>
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[11px] text-gray-500 font-semibold mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}