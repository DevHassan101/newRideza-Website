"use client";
import { useState } from "react";

type Tab = "completed" | "cancelled";

const COMPLETED = [
  { id: "1", from: "Sector 5, Hyderabad",  to: "Banjara Hills",   pay: "₹180", date: "Today, 10:12 AM",      vehicle: "Honda City",  km: "8.2 km"  },
  { id: "2", from: "Madhapur",             to: "Hitech City",     pay: "₹95",  date: "Today, 8:45 AM",       vehicle: "Activa 6G",   km: "4.1 km"  },
  { id: "3", from: "Gachibowli",           to: "Jubilee Hills",   pay: "₹240", date: "Yesterday, 7:30 PM",   vehicle: "Swift Dzire", km: "11.5 km" },
  { id: "4", from: "Ameerpet",             to: "Secunderabad",    pay: "₹130", date: "Yesterday, 3:10 PM",   vehicle: "Honda City",  km: "6.8 km"  },
  { id: "5", from: "Kukatpally",           to: "Dilsukhnagar",    pay: "₹310", date: "2 days ago, 9:00 AM",  vehicle: "Swift Dzire", km: "14.2 km" },
];

const CANCELLED = [
  { id: "6", from: "Begumpet",             to: "Airport",         date: "Today, 11:00 AM",     reason: "Rider cancelled", vehicle: "Honda City"  },
  { id: "7", from: "KPHB Colony",          to: "Miyapur",         date: "Yesterday, 1:20 PM",  reason: "No response",     vehicle: "Activa 6G"  },
  { id: "8", from: "LB Nagar",             to: "Uppal",           date: "3 days ago, 6:45 PM", reason: "Rider cancelled", vehicle: "Swift Dzire" },
];

export default function MyBookingsPanel() {
  const [tab, setTab] = useState<Tab>("completed");

  return (
    <div className="w-full h-full bg-gray-50 overflow-auto">

      {/* Header */}
      <div className="sticky top-0 z-10 px-8 py-[13.5px] bg-white border-b border-zinc-200">
        <h2 className="font-bold text-gray-900 text-lg">My Bookings</h2>
        <p className="text-xs text-gray-400 mt-0.5">Your ride history here.</p>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-5 space-y-4">

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl border border-gray-100 p-1.5 shadow-sm gap-1.5">
          {([
            { key: "completed", label: "Completed", count: COMPLETED.length, color: "text-cyan-600",  bg: "bg-cyan-50",  dot: "bg-cyan-500"  },
            { key: "cancelled", label: "Cancelled", count: CANCELLED.length, color: "text-red-500",   bg: "bg-red-50",   dot: "bg-red-400"   },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={"flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all " +
                (tab === t.key ? `${t.bg} ${t.color} shadow-sm` : "text-gray-400 hover:text-gray-600")}>
              <span className={"w-2 h-2 rounded-full " + (tab === t.key ? t.dot : "bg-gray-300")}/>
              {t.label}
              <span className={"text-[10px] font-black px-1.5 py-0.5 rounded-full " +
                (tab === t.key ? `${t.bg} ${t.color}` : "bg-gray-100 text-gray-400")}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Completed */}
        {tab === "completed" && (
          <div className="space-y-3">
            {COMPLETED.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"/>
                        <div className="w-0.5 h-3 bg-gray-200"/>
                        <div className="w-2 h-2 rounded-full bg-gray-400"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{r.from}</p>
                        <p className="text-xs text-gray-400 truncate mt-1.5">{r.to}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-black text-cyan-600">{r.pay}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{r.km}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{r.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                      <span className="text-[10px] text-gray-400">{r.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancelled */}
        {tab === "cancelled" && (
          <div className="space-y-3">
            {CANCELLED.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-400"/>
                        <div className="w-0.5 h-3 bg-gray-200"/>
                        <div className="w-2 h-2 rounded-full bg-gray-400"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{r.from}</p>
                        <p className="text-xs text-gray-400 truncate mt-1.5">{r.to}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-red-400 bg-red-50 border border-red-100 px-2 py-1 rounded-lg shrink-0">Cancelled</span>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-50 rounded-lg flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">{r.reason}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
