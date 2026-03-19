"use client";
import { useRouter } from "next/navigation";
import BottomNav from "../_components/mobile/BottomNav";

// Canonical mobile routes
const MOBILE_ROUTES: Record<string, string> = {
  home:    "/driver/live-rides",  // ← was /driver/live-map
  trip:    "/driver/trip",
  profile: "/driver/profile",
};

export default function TripPage() {
  const router = useRouter();
  const goTo   = (s: string) => router.push(MOBILE_ROUTES[s] ?? "/driver/live-rides");

  return (
    <div className="flex flex-col h-full bg-gray-50">

      <div className="px-5 pt-5 pb-4 bg-white border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">Current Trip</h2>
        <p className="text-[11px] text-gray-400 mt-0.5">Your active ride details</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
        <div className="w-24 h-24 rounded-3xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-700">No Active Trip</h3>
          <p className="text-sm text-gray-400 mt-1">Go online to receive ride requests</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            <span className="text-xs font-semibold text-gray-500">Offline</span>
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Today's Activity</p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {[
            { label: "Rides",    value: "0",  color: "text-cyan-500"    },
            { label: "Earnings", value: "₹0", color: "text-emerald-500" },
            { label: "Rating",   value: "—",  color: "text-amber-500"   },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center py-3.5 gap-1">
              <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="trip" onNav={goTo} />
    </div>
  );
}
