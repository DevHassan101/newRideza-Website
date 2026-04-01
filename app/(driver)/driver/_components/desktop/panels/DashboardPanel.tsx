// "use client";

// import { useState, useEffect } from "react";

// const WEEK_DATA = [
//   { day: "Mon", rides: 3 }, { day: "Tue", rides: 5 }, { day: "Wed", rides: 2 },
//   { day: "Thu", rides: 6 }, { day: "Fri", rides: 4 }, { day: "Sat", rides: 7 },
//   { day: "Sun", rides: 1 },
// ];

// const RECENT_RIDES = [
//   { cab: "Honda City", pay: "₹180", date: "Today, 10:12 AM" },
//   { cab: "Swift Dzire", pay: "₹240", date: "Today, 8:45 AM" },
//   { cab: "Activa 6G", pay: "₹95", date: "Yesterday, 7:30 PM" },
// ];

// const STAT_CARDS = [
//   {
//     badge: "Active", badgeColor: "text-cyan-500",
//     iconBg: "bg-cyan-100", iconColor: "text-cyan-500",
//     label: "Total Rides", sub: "all time", value: "0",
//     icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 80 80"><g fill="none"><path fill="currentColor" d="M18.7 41.07a9.91 9.91 0 1 1 8.6 17.86a9.91 9.91 0 0 1-8.6-17.86m34 0a9.91 9.91 0 1 1 8.6 17.86a9.91 9.91 0 0 1-8.6-17.86" /><path fill="currentColor" fillRule="evenodd" d="M8 31h52c6.627 0 12 5.373 12 12v2a7.99 7.99 0 0 1-3.17 6.377A11.91 11.91 0 1 0 45.474 53H34.527a11.91 11.91 0 0 0-6.36-13.731a11.91 11.91 0 0 0-17.042 9.808A11.96 11.96 0 0 1 8 41zm56.322 21.994A8 8 0 0 1 64 53H49.68a7.91 7.91 0 1 1 14.642-.006m-33.61-4.754A7.9 7.9 0 0 1 30.32 53H20c-1.643 0-3.209-.33-4.634-.928a7.91 7.91 0 1 1 15.346-3.832" clipRule="evenodd" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M48.424 19H34.167v12H58l-6.163-10.086A4 4 0 0 0 48.424 19m-14.257 0L14 31h20.167z" /></g></svg>,
//   },
//   {
//     badge: "Lifetime", badgeColor: "text-emerald-500",
//     iconBg: "bg-emerald-100", iconColor: "text-emerald-500",
//     label: "Total Earnings", sub: "all time", value: "₹0",
//     icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24.039 6c-4.517 0-8.632 1.492-11.067 2.711q-.33.165-.616.322c-.378.206-.7.398-.956.567l2.77 4.078l1.304.519c5.096 2.571 11.93 2.571 17.027 0l1.48-.768L36.6 9.6a16 16 0 0 0-1.689-.957C32.488 7.437 28.471 6 24.04 6m-6.442 4.616a25 25 0 0 1-2.901-.728C16.978 8.875 20.377 7.8 24.04 7.8c2.537 0 4.936.516 6.92 1.17c-2.325.327-4.806.882-7.17 1.565c-1.86.538-4.034.48-6.192.081m15.96 5.064l-.246.124c-5.606 2.828-13.042 2.828-18.648 0l-.233-.118C6.008 24.927-.422 41.997 24.039 41.997S41.913 24.61 33.557 15.68M23 24a2 2 0 1 0 0 4zm2-2v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4 4 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666A4 4 0 0 0 25 22m0 8v4a2 2 0 1 0 0-4" clipRule="evenodd" /></svg>,
//   },
//   {
//     badge: "Score", badgeColor: "text-amber-500",
//     iconBg: "bg-amber-100", iconColor: "text-amber-500",
//     label: "Avg Rating", sub: "out of 5", value: "—",
//     icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 24 24"><path fill="currentColor" d="M10.277 16.515c.005-.11.187-.154.24-.058c.254.45.686 1.111 1.177 1.412c.49.3 1.275.386 1.791.408c.11.005.154.186.058.24c-.45.254-1.111.686-1.412 1.176s-.386 1.276-.408 1.792c-.005.11-.187.153-.24.057c-.254-.45-.686-1.11-1.176-1.411s-1.276-.386-1.792-.408c-.11-.005-.153-.187-.057-.24c.45-.254 1.11-.686 1.411-1.177c.301-.49.386-1.276.408-1.791m8.215-1c-.008-.11-.2-.156-.257-.062c-.172.283-.421.623-.697.793s-.693.236-1.023.262c-.11.008-.155.2-.062.257c.283.172.624.42.793.697s.237.693.262 1.023c.009.11.2.155.258.061c.172-.282.42-.623.697-.792s.692-.237 1.022-.262c.11-.009.156-.2.062-.258c-.283-.172-.624-.42-.793-.697s-.236-.692-.262-1.022M14.704 4.002l-.242-.306c-.937-1.183-1.405-1.775-1.95-1.688c-.545.088-.806.796-1.327 2.213l-.134.366c-.149.403-.223.604-.364.752c-.143.148-.336.225-.724.38l-.353.141l-.248.1c-1.2.48-1.804.753-1.881 1.283c-.082.565.49 1.049 1.634 2.016l.296.25c.325.275.488.413.58.6c.094.187.107.403.134.835l.024.393c.093 1.52.14 2.28.634 2.542s1.108-.147 2.336-.966l.318-.212c.35-.233.524-.35.723-.381c.2-.032.402.024.806.136l.368.102c1.422.394 2.133.591 2.52.188c.388-.403.196-1.14-.19-2.613l-.099-.381c-.11-.419-.164-.628-.134-.835s.142-.389.365-.752l.203-.33c.786-1.276 1.179-1.914.924-2.426c-.254-.51-.987-.557-2.454-.648l-.379-.024c-.417-.026-.625-.039-.806-.135c-.18-.096-.314-.264-.58-.6m-5.869 9.324C6.698 14.37 4.919 16.024 4.248 18c-.752-4.707.292-7.747 1.965-9.637c.144.295.332.539.5.73c.35.396.852.82 1.362 1.251l.367.31l.17.145c.005.064.01.14.015.237l.03.485c.04.655.08 1.294.178 1.805" /></svg>,
//   },
//   {
//     badge: "Today", badgeColor: "text-violet-500",
//     iconBg: "bg-violet-100", iconColor: "text-violet-500",
//     label: "Today's Rides", sub: "today so far", value: "0",
//     icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512"><path fill="currentColor" d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4ZM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3Zm344-208a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24" /></svg>,
//   },
// ];

// const PEAK_HOURS = [
//   { hour: "6am", level: 2 }, { hour: "8am", level: 5 }, { hour: "10am", level: 3 },
//   { hour: "12pm", level: 4 }, { hour: "2pm", level: 2 }, { hour: "4pm", level: 3 },
//   { hour: "6pm", level: 6 }, { hour: "8pm", level: 5 }, { hour: "10pm", level: 2 },
// ];


// // ── Enhanced Weekly Chart ─────────────────────────────────────────────────────
// function WeeklyChart() {
//   const [hovered, setHovered] = useState<number | null>(null);
//   const maxRides = Math.max(...WEEK_DATA.map(d => d.rides));
//   const total = WEEK_DATA.reduce((s, d) => s + d.rides, 0);
//   const todayIdx = 5; // Sat = highest, for demo

//   return (
//     <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-1">
//         <div>
//           <p className="text-sm font-bold text-gray-800">Rides This Week</p>
//           <p className="text-[11px] text-gray-400 mt-0.5">Your activity overview</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-lg font-black text-gray-900">{total}</span>
//           <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
//             +12%
//           </span>
//         </div>
//       </div>

//       {/* Horizontal guide lines */}
//       <div className="relative mt-4">
//         <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
//           {[maxRides, Math.round(maxRides / 2), 0].map((v, i) => (
//             <div key={i} className="flex items-center gap-2">
//               <span className="text-[9px] text-gray-300 w-3 text-right shrink-0">{v}</span>
//               <div className="flex-1 border-t border-dashed border-gray-100" />
//             </div>
//           ))}
//         </div>

//         {/* Bars */}
//         <div className="flex items-end gap-2 h-28 pl-6">
//           {WEEK_DATA.map((d, i) => {
//             const isHov = hovered === i;
//             const isToday = i === todayIdx;
//             const heightPct = (d.rides / maxRides) * 100;
//             return (
//               <div key={d.day}
//                 className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer relative"
//                 onMouseEnter={() => setHovered(i)}
//                 onMouseLeave={() => setHovered(null)}>

//                 {/* Tooltip */}
//                 {isHov && (
//                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg">
//                     {d.rides} rides
//                     <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
//                   </div>
//                 )}

//                 {/* Bar */}
//                 <div className="w-full relative rounded-t-lg overflow-hidden"
//                   style={{ height: `${heightPct}%`, minHeight: "6px" }}>
//                   <div className={`absolute inset-0 rounded-t-lg transition-all duration-200 ${isToday
//                       ? "bg-linear-to-t from-cyan-600 to-cyan-400 shadow-md shadow-cyan-200"
//                       : isHov
//                         ? "bg-linear-to-t from-cyan-400 to-cyan-300"
//                         : "bg-linear-to-t from-cyan-200 to-cyan-100"
//                     }`} />
//                   {/* Shine effect on hover */}
//                   {isHov && (
//                     <div className="absolute inset-0 bg-linear-to-b from-white/30 to-transparent rounded-t-lg" />
//                   )}
//                 </div>

//                 <span className={`text-[10px] font-semibold transition-colors ${isToday ? "text-cyan-500" : isHov ? "text-gray-700" : "text-gray-400"
//                   }`}>{d.day}</span>

//                 {isToday && (
//                   <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500" />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Footer summary */}
//       <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
//         <div className="flex items-center gap-1.5">
//           <div className="w-2.5 h-2.5 rounded-sm bg-linear-to-t from-cyan-600 to-cyan-400" />
//           <span className="text-[10px] text-gray-400 font-medium">Today (best day)</span>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <div className="w-2.5 h-2.5 rounded-sm bg-linear-to-t from-cyan-200 to-cyan-100" />
//           <span className="text-[10px] text-gray-400 font-medium">Other days</span>
//         </div>
//         <span className="text-[10px] text-gray-400 font-medium">Avg: {(total / 7).toFixed(1)} rides/day</span>
//       </div>
//     </div>
//   );
// }


// // ─────────────────────────────────────────────────────────────────────────────

// export default function DashboardPanel() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/auth/me")
//       .then(r => r.json())
//       .then(data => { setUser(data.user); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, []);

//   const name = user?.name ?? "";
//   const profilePic = user?.driverProfile?.profilePic ?? "";

//   // Demo values
//   const acceptanceRate = 87;
//   const cancellationRate = 5;
//   const weeklyGoal = 2400;
//   const weeklyEarned = 1560;
//   const weeklyPct = Math.round((weeklyEarned / weeklyGoal) * 100);
//   const perfScore = 92;

//   return (
//     <div className="flex flex-col h-full bg-gray-50 overflow-hidden">

//       {/* Sticky Header */}
//       <div className="shrink-0 px-8 py-[13.5px] bg-white border-b border-zinc-200">
//         <div className="flex items-center justify-between max-w-7xl mx-auto">
//           <div>
//             <h1 className="font-bold text-gray-900 text-lg">My Dashboard</h1>
//             {loading
//               ? <div className="h-3.5 w-44 rounded-md bg-zinc-200 animate-pulse mt-1.5" />
//               : <p className="text-xs text-gray-400 mt-0.5">Welcome back, {name.split(" ")[0] || "..."}! 👋</p>
//             }
//           </div>
//           {loading
//             ? <div className="w-11 h-11 rounded-full bg-zinc-200 animate-pulse shrink-0" />
//             : (
//               <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-200 shrink-0">
//                 {profilePic
//                   ? <img src={profilePic} alt="" className="w-full h-full object-cover" />
//                   : <div className="w-full h-full bg-cyan-500 flex items-center justify-center font-black text-white text-xl">
//                     {name?.charAt(0)?.toUpperCase() || "A"}
//                   </div>
//                 }
//               </div>
//             )
//           }
//         </div>
//       </div>

//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="px-8 py-6 max-w-7xl mx-auto w-full space-y-5 pb-8">

//           {/* ── Row 1: 4 stat cards ── */}
//           <div className="grid grid-cols-4 gap-4">
//             {STAT_CARDS.map((c) => (
//               <div key={c.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className={`w-10 h-10 ${c.iconBg} ${c.iconColor} rounded-xl flex items-center justify-center`}>
//                     {c.icon}
//                   </div>
//                   <span className={`text-[10px] font-bold ${c.badgeColor}`}>{c.badge}</span>
//                 </div>
//                 <p className="text-2xl font-black text-gray-900 leading-none">{c.value}</p>
//                 <p className="text-sm font-semibold text-gray-700 mt-1.5">{c.label}</p>
//                 <p className="text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
//               </div>
//             ))}
//           </div>

//           {/* ── Row 2: Performance Score + Trip Rates + Weekly Goal ── */}
//           <div className="grid grid-cols-3 gap-4">

//             {/* Performance Score — horizontal */}
//             <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <p className="text-sm font-bold text-gray-800">Performance Score</p>
//                   <p className="text-[11px] text-gray-400 mt-0.5">Based on your trip history</p>
//                 </div>
//                 <span className="text-[11px] font-bold text-cyan-500 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full">
//                   {perfScore >= 90 ? "🏆 Elite" : perfScore >= 75 ? "⭐ Good" : "📈 Improving"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-5">
//                 {/* Gauge — left */}
//                 <div className="relative w-24 h-24 shrink-0">
//                   <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
//                     <circle cx="48" cy="48" r="38" fill="none" stroke="#f3f4f6" strokeWidth="8" />
//                     <circle cx="48" cy="48" r="38" fill="none" stroke="#22d3ee" strokeWidth="8"
//                       strokeDasharray={`${2 * Math.PI * 38}`}
//                       strokeDashoffset={`${2 * Math.PI * 38 * (1 - perfScore / 100)}`}
//                       strokeLinecap="round" />
//                   </svg>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <span className="text-xl font-black text-gray-800 leading-none">{perfScore}</span>
//                     <span className="text-[10px] text-gray-400 font-semibold">/100</span>
//                   </div>
//                 </div>
//                 {/* Bars — right */}
//                 <div className="flex-1 space-y-3">
//                   {[
//                     { label: "Acceptance", val: `${acceptanceRate}%`, color: "bg-cyan-400" },
//                     { label: "On-time", val: "94%", color: "bg-emerald-400" },
//                     { label: "Completion", val: "98%", color: "bg-violet-400" },
//                   ].map(m => (
//                     <div key={m.label}>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-[11px] text-gray-600 font-semibold">{m.label}</span>
//                         <span className="text-[11px] text-gray-700 font-black">{m.val}</span>
//                       </div>
//                       <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                         <div className={`h-full ${m.color} rounded-full`} style={{ width: m.val }} />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Trip Rates — horizontal */}
//             <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//               <p className="text-sm font-bold text-gray-800 mb-4">Trip Rates</p>
//               <div className="space-y-4">
//                 {[
//                   { label: "Acceptance Rate", val: acceptanceRate, max: 100, color: "bg-gradient-to-r from-cyan-400 to-cyan-500", text: "text-cyan-600", good: true },
//                   { label: "Cancellation Rate", val: cancellationRate, max: 20, color: "bg-gradient-to-r from-red-300 to-red-400", text: "text-red-500", good: false },
//                 ].map(r => (
//                   <div key={r.label}>
//                     <div className="flex items-center justify-between mb-1.5">
//                       <span className="text-xs text-gray-700 font-semibold">{r.label}</span>
//                       <span className={`text-sm font-black ${r.text}`}>{r.val}%</span>
//                     </div>
//                     <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                       <div className={`h-full ${r.color} rounded-full transition-all`}
//                         style={{ width: `${(r.val / r.max) * 100}%` }} />
//                     </div>
//                     <p className="text-[10px] text-gray-400 mt-1">
//                       {r.good ? (r.val >= 80 ? "✓ Great job!" : "Try to accept more rides") : (r.val <= 5 ? "✓ Excellent" : "Keep it low for better score")}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Weekly Earnings Goal */}
//             <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//               <div className="flex items-center justify-between mb-1">
//                 <p className="text-sm font-bold text-gray-800">Weekly Goal</p>
//                 <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{weeklyPct}%</span>
//               </div>
//               <p className="text-[11px] text-gray-400 mb-4">₹{weeklyEarned.toLocaleString()} of ₹{weeklyGoal.toLocaleString()} earned</p>

//               {/* Arc progress */}
//               <div className="flex justify-center mb-6">
//                 <div className="relative w-24 h-12">
//                   <svg className="w-24 h-24 -mt-12" viewBox="0 0 96 96">
//                     <path d="M 12 84 A 36 36 0 0 1 84 84" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
//                     <path d="M 12 84 A 36 36 0 0 1 84 84" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round"
//                       strokeDasharray="113"
//                       strokeDashoffset={`${113 * (1 - weeklyPct / 100)}`}
//                       style={{ transition: "stroke-dashoffset 1s ease" }}
//                     />
//                   </svg>
//                   <div className="absolute bottom-0 left-0 right-0 text-center">
//                     <span className="text-lg font-black text-gray-800">₹{weeklyEarned}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="h-2.25 bg-gray-100 rounded-full overflow-hidden">
//                 <div className="h-full bg-linear-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: `${weeklyPct}%` }} />
//               </div>
//               <p className="text-[11px] text-gray-400 mt-2 text-center">
//                 ₹{(weeklyGoal - weeklyEarned).toLocaleString()} more to reach your goal!
//               </p>
//             </div>
//           </div>
//           {/* ── Row 3: Recent rides (left) + Weekly chart (right) ── */}
//           <div className="grid grid-cols-2 gap-4">

//             {/* Recent rides — LEFT */}
//             <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
//               <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//                 <p className="text-sm font-bold text-gray-800">Recent Rides</p>
//                 <button className="text-[11px] text-cyan-500 font-semibold hover:text-cyan-600 transition-colors">View all →</button>
//               </div>
//               <div className="grid grid-cols-3 px-5 py-2.5 bg-gray-50 border-b border-gray-100">
//                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Vehicle</span>
//                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide text-center">Pay</span>
//                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide text-right">Date</span>
//               </div>
//               {RECENT_RIDES.map((r, i) => (
//                 <div key={i} className={`grid grid-cols-3 px-5 py-3.5 items-center hover:bg-cyan-50/50 transition-colors cursor-default ${i > 0 ? "border-t border-gray-100" : ""}`}>
//                   <div className="flex items-center gap-2.5">
//                     <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
//                       <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       </svg>
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800 truncate">{r.cab}</p>
//                   </div>
//                   <p className="text-sm font-black text-cyan-600 text-center">{r.pay}</p>
//                   <p className="text-[11px] text-gray-400 text-right leading-tight">{r.date}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Weekly chart — RIGHT (enhanced) */}
//             <WeeklyChart />
//           </div>

//           {/* ── Row 4: Peak Hours ── */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <p className="text-sm font-bold text-gray-800">Peak Hours</p>
//                 <p className="text-[11px] text-gray-400 mt-0.5">Best time to drive today</p>
//               </div>
//               <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
//             </div>
//             <div className="flex items-end gap-1.5 h-16">
//               {PEAK_HOURS.map((h) => {
//                 const isNow = h.hour === "6pm";
//                 return (
//                   <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
//                     <div
//                       className={`w-full rounded-md transition-all ${isNow ? "bg-cyan-500 shadow-sm shadow-cyan-200" : h.level >= 5 ? "bg-cyan-200" : h.level >= 3 ? "bg-gray-200" : "bg-gray-100"}`}
//                       style={{ height: `${(h.level / 6) * 100}%`, minHeight: "4px" }}
//                     />
//                     <span className={`text-[9px] font-semibold ${isNow ? "text-cyan-500" : "text-gray-400"}`}>{h.hour}</span>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="mt-3 flex items-center gap-2 bg-cyan-50 border border-cyan-100 rounded-xl px-3 py-2 w-fit">
//               <span className="text-cyan-500 text-sm">🔥</span>
//               <p className="text-[11px] text-cyan-700 font-semibold">Evening peak (6–9pm) — High demand right now!</p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

const WEEK_DATA = [
  { day: "Mon", rides: 3 }, { day: "Tue", rides: 5 }, { day: "Wed", rides: 2 },
  { day: "Thu", rides: 6 }, { day: "Fri", rides: 4 }, { day: "Sat", rides: 7 },
  { day: "Sun", rides: 1 },
];

const RECENT_RIDES = [
  { cab: "Honda City", pay: "₹180", date: "Today, 10:12 AM" },
  { cab: "Swift Dzire", pay: "₹240", date: "Today, 8:45 AM" },
  { cab: "Activa 6G", pay: "₹95", date: "Yesterday, 7:30 PM" },
];

const STAT_CARDS = [
  {
    badge: "Active", badgeColor: "text-cyan-500",
    iconBg: "bg-cyan-100", iconColor: "text-cyan-500",
    label: "Total Rides", sub: "all time", value: "0",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 80 80"><g fill="none"><path fill="currentColor" d="M18.7 41.07a9.91 9.91 0 1 1 8.6 17.86a9.91 9.91 0 0 1-8.6-17.86m34 0a9.91 9.91 0 1 1 8.6 17.86a9.91 9.91 0 0 1-8.6-17.86" /><path fill="currentColor" fillRule="evenodd" d="M8 31h52c6.627 0 12 5.373 12 12v2a7.99 7.99 0 0 1-3.17 6.377A11.91 11.91 0 1 0 45.474 53H34.527a11.91 11.91 0 0 0-6.36-13.731a11.91 11.91 0 0 0-17.042 9.808A11.96 11.96 0 0 1 8 41zm56.322 21.994A8 8 0 0 1 64 53H49.68a7.91 7.91 0 1 1 14.642-.006m-33.61-4.754A7.9 7.9 0 0 1 30.32 53H20c-1.643 0-3.209-.33-4.634-.928a7.91 7.91 0 1 1 15.346-3.832" clipRule="evenodd" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M48.424 19H34.167v12H58l-6.163-10.086A4 4 0 0 0 48.424 19m-14.257 0L14 31h20.167z" /></g></svg>,
  },
  {
    badge: "Lifetime", badgeColor: "text-emerald-500",
    iconBg: "bg-emerald-100", iconColor: "text-emerald-500",
    label: "Total Earnings", sub: "all time", value: "₹0",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24.039 6c-4.517 0-8.632 1.492-11.067 2.711q-.33.165-.616.322c-.378.206-.7.398-.956.567l2.77 4.078l1.304.519c5.096 2.571 11.93 2.571 17.027 0l1.48-.768L36.6 9.6a16 16 0 0 0-1.689-.957C32.488 7.437 28.471 6 24.04 6m-6.442 4.616a25 25 0 0 1-2.901-.728C16.978 8.875 20.377 7.8 24.04 7.8c2.537 0 4.936.516 6.92 1.17c-2.325.327-4.806.882-7.17 1.565c-1.86.538-4.034.48-6.192.081m15.96 5.064l-.246.124c-5.606 2.828-13.042 2.828-18.648 0l-.233-.118C6.008 24.927-.422 41.997 24.039 41.997S41.913 24.61 33.557 15.68M23 24a2 2 0 1 0 0 4zm2-2v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4 4 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666A4 4 0 0 0 25 22m0 8v4a2 2 0 1 0 0-4" clipRule="evenodd" /></svg>,
  },
  {
    badge: "Score", badgeColor: "text-amber-500",
    iconBg: "bg-amber-100", iconColor: "text-amber-500",
    label: "Avg Rating", sub: "out of 5", value: "—",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5" viewBox="0 0 24 24"><path fill="currentColor" d="M10.277 16.515c.005-.11.187-.154.24-.058c.254.45.686 1.111 1.177 1.412c.49.3 1.275.386 1.791.408c.11.005.154.186.058.24c-.45.254-1.111.686-1.412 1.176s-.386 1.276-.408 1.792c-.005.11-.187.153-.24.057c-.254-.45-.686-1.11-1.176-1.411s-1.276-.386-1.792-.408c-.11-.005-.153-.187-.057-.24c.45-.254 1.11-.686 1.411-1.177c.301-.49.386-1.276.408-1.791m8.215-1c-.008-.11-.2-.156-.257-.062c-.172.283-.421.623-.697.793s-.693.236-1.023.262c-.11.008-.155.2-.062.257c.283.172.624.42.793.697s.237.693.262 1.023c.009.11.2.155.258.061c.172-.282.42-.623.697-.792s.692-.237 1.022-.262c.11-.009.156-.2.062-.258c-.283-.172-.624-.42-.793-.697s-.236-.692-.262-1.022M14.704 4.002l-.242-.306c-.937-1.183-1.405-1.775-1.95-1.688c-.545.088-.806.796-1.327 2.213l-.134.366c-.149.403-.223.604-.364.752c-.143.148-.336.225-.724.38l-.353.141l-.248.1c-1.2.48-1.804.753-1.881 1.283c-.082.565.49 1.049 1.634 2.016l.296.25c.325.275.488.413.58.6c.094.187.107.403.134.835l.024.393c.093 1.52.14 2.28.634 2.542s1.108-.147 2.336-.966l.318-.212c.35-.233.524-.35.723-.381c.2-.032.402.024.806.136l.368.102c1.422.394 2.133.591 2.52.188c.388-.403.196-1.14-.19-2.613l-.099-.381c-.11-.419-.164-.628-.134-.835s.142-.389.365-.752l.203-.33c.786-1.276 1.179-1.914.924-2.426c-.254-.51-.987-.557-2.454-.648l-.379-.024c-.417-.026-.625-.039-.806-.135c-.18-.096-.314-.264-.58-.6m-5.869 9.324C6.698 14.37 4.919 16.024 4.248 18c-.752-4.707.292-7.747 1.965-9.637c.144.295.332.539.5.73c.35.396.852.82 1.362 1.251l.367.31l.17.145c.005.064.01.14.015.237l.03.485c.04.655.08 1.294.178 1.805" /></svg>,
  },
  {
    badge: "Today", badgeColor: "text-violet-500",
    iconBg: "bg-violet-100", iconColor: "text-violet-500",
    label: "Today's Rides", sub: "today so far", value: "0",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512"><path fill="currentColor" d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4ZM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3Zm344-208a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24" /></svg>,
  },
];

const PEAK_HOURS = [
  { hour: "6am", level: 2 }, { hour: "8am", level: 5 }, { hour: "10am", level: 3 },
  { hour: "12pm", level: 4 }, { hour: "2pm", level: 2 }, { hour: "4pm", level: 3 },
  { hour: "6pm", level: 6 }, { hour: "8pm", level: 5 }, { hour: "10pm", level: 2 },
];

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, {
  bg: string; border: string; iconColor: string; titleColor: string;
  icon: string; title: string; message: string;
}> = {
  PENDING: {
    bg: "bg-amber-50", border: "border-amber-200", iconColor: "text-amber-500",
    titleColor: "text-amber-700", icon: "⏳",
    title: "Pending Approval",
    message: "Complete your profile so admin can review and approve your account. Once approved, you'll have full access.",
  },
  REJECTED: {
    bg: "bg-red-50", border: "border-red-200", iconColor: "text-red-500",
    titleColor: "text-red-700", icon: "❌",
    title: "Application Rejected",
    message: "Your application was rejected. Please contact support for more information or reapply.",
  },
  SUSPENDED: {
    bg: "bg-zinc-100", border: "border-zinc-300", iconColor: "text-zinc-500",
    titleColor: "text-zinc-700", icon: "🚫",
    title: "Account Suspended",
    message: "Your account has been suspended. Please contact admin to resolve this issue.",
  },
};

// ── Weekly Chart ──────────────────────────────────────────────────────────────
function WeeklyChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxRides = Math.max(...WEEK_DATA.map(d => d.rides));
  const total = WEEK_DATA.reduce((s, d) => s + d.rides, 0);
  const todayIdx = 5;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-sm font-bold text-gray-800">Rides This Week</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Your activity overview</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-gray-900">{total}</span>
          <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">+12%</span>
        </div>
      </div>
      <div className="relative mt-4">
        <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
          {[maxRides, Math.round(maxRides / 2), 0].map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[9px] text-gray-300 w-3 text-right shrink-0">{v}</span>
              <div className="flex-1 border-t border-dashed border-gray-100" />
            </div>
          ))}
        </div>
        <div className="flex items-end gap-2 h-28 pl-6">
          {WEEK_DATA.map((d, i) => {
            const isHov = hovered === i;
            const isToday = i === todayIdx;
            const heightPct = (d.rides / maxRides) * 100;
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer relative"
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                {isHov && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg">
                    {d.rides} rides
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                  </div>
                )}
                <div className="w-full relative rounded-t-lg overflow-hidden" style={{ height: `${heightPct}%`, minHeight: "6px" }}>
                  <div className={`absolute inset-0 rounded-t-lg transition-all duration-200 ${
                    isToday ? "bg-linear-to-t from-cyan-600 to-cyan-400 shadow-md shadow-cyan-200"
                    : isHov ? "bg-linear-to-t from-cyan-400 to-cyan-300"
                    : "bg-linear-to-t from-cyan-200 to-cyan-100"}`} />
                  {isHov && <div className="absolute inset-0 bg-linear-to-b from-white/30 to-transparent rounded-t-lg" />}
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${isToday ? "text-cyan-500" : isHov ? "text-gray-700" : "text-gray-400"}`}>{d.day}</span>
                {isToday && <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500" />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-linear-to-t from-cyan-600 to-cyan-400" />
          <span className="text-[10px] text-gray-400 font-medium">Today (best day)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-linear-to-t from-cyan-200 to-cyan-100" />
          <span className="text-[10px] text-gray-400 font-medium">Other days</span>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">Avg: {(total / 7).toFixed(1)} rides/day</span>
      </div>
    </div>
  );
}

// ── Status Banner (non-approved) ──────────────────────────────────────────────
function StatusBanner({ status, name, profilePic, reviewNote }: { status: string; name: string; profilePic: string; reviewNote?: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["PENDING"];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">

      {/* Header */}
      <div className="shrink-0 px-8 py-[13.5px] bg-white border-b border-zinc-200">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="font-bold text-gray-900 text-lg">My Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">Welcome back, {name.split(" ")[0] || "..."}! 👋</p>
          </div>
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-200 shrink-0">
            {profilePic
              ? <img src={profilePic} alt="" className="w-full h-full object-cover"/>
              : <div className="w-full h-full bg-cyan-500 flex items-center justify-center font-black text-white text-xl">
                  {name?.charAt(0)?.toUpperCase() || "A"}
                </div>
            }
          </div>
        </div>
      </div>

      {/* Status card — centered */}
      <div className="flex-1 overflow-auto flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full">
          <div className={`${cfg.bg} border ${cfg.border} rounded-2xl p-8 flex flex-col items-center text-center`}>
            <div className="text-5xl mb-4">{cfg.icon}</div>
            <h2 className={`text-xl font-bold ${cfg.titleColor} mb-2`}>{cfg.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{cfg.message}</p>

            {/* Profile info */}
            <div className="mt-6 w-full bg-white rounded-xl p-4 border border-gray-100 space-y-2 text-left">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-3">Your Info</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Name</span>
                <span className="text-xs font-semibold text-gray-700">{name || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-xs text-gray-400">Account Status</span>
                <span className={`text-xs font-bold ${cfg.iconColor}`}>{cfg.title}</span>
              </div>
              {reviewNote && (
                <div className="border-t border-gray-100 pt-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-1">Admin Note</p>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    "{reviewNote}"
                  </p>
                </div>
              )}
            </div>

            {status === "REJECTED" && (
              <a href="mailto:support@rideza.com"
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm transition-colors text-center block">
                Contact Support
              </a>
            )}
            {status === "PENDING" && (
              <div className="mt-4 w-full space-y-3">
                <a href="/driver/onboarding"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-sm transition-colors text-center flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Complete Your Profile →
                </a>
                <div className="flex items-center justify-center gap-2 text-amber-600 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"/>
                  Waiting for admin review...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function DashboardPanel({ fullWidth = false }: { fullWidth?: boolean }) {
  const [user,    setUser]    = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(data => { setUser(data.user); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const name       = user?.name ?? "";
  const profilePic = user?.driverProfile?.profilePic ?? "";
  const status     = user?.driverProfile?.status ?? "PENDING";
  const reviewNote = user?.driverProfile?.reviewNote ?? "";
  const isApproved = status === "APPROVED";

  const acceptanceRate = 87;
  const cancellationRate = 5;
  const weeklyGoal = 2400;
  const weeklyEarned = 1560;
  const weeklyPct = Math.round((weeklyEarned / weeklyGoal) * 100);
  const perfScore = 92;

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
        <div className="shrink-0 px-8 py-[13.5px] bg-white border-b border-zinc-200">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <div className="h-5 w-32 bg-zinc-200 rounded animate-pulse"/>
              <div className="h-3.5 w-44 bg-zinc-200 rounded animate-pulse mt-1.5"/>
            </div>
            <div className="w-11 h-11 rounded-full bg-zinc-200 animate-pulse"/>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"/>
        </div>
      </div>
    );
  }

  // ── Non-approved → status banner only ──
  if (!isApproved) {
    return <StatusBanner status={status} name={name} profilePic={profilePic} reviewNote={reviewNote}/>;
  }

  // ── Approved → full dashboard ──
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">

      {/* Sticky Header */}
      <div className="shrink-0 px-8 py-[13.5px] bg-white border-b border-zinc-200">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="font-bold text-gray-900 text-lg">My Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">Welcome back, {name.split(" ")[0] || "..."}! 👋</p>
          </div>
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-200 shrink-0">
            {profilePic
              ? <img src={profilePic} alt="" className="w-full h-full object-cover"/>
              : <div className="w-full h-full bg-cyan-500 flex items-center justify-center font-black text-white text-xl">
                  {name?.charAt(0)?.toUpperCase() || "A"}
                </div>
            }
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 py-6 max-w-7xl mx-auto w-full space-y-5 pb-8">

          {/* Row 1: 4 stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {STAT_CARDS.map((c) => (
              <div key={c.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${c.iconBg} ${c.iconColor} rounded-xl flex items-center justify-center`}>{c.icon}</div>
                  <span className={`text-[10px] font-bold ${c.badgeColor}`}>{c.badge}</span>
                </div>
                <p className="text-2xl font-black text-gray-900 leading-none">{c.value}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1.5">{c.label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Row 2: Performance + Trip Rates + Weekly Goal */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-800">Performance Score</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Based on your trip history</p>
                </div>
                <span className="text-[11px] font-bold text-cyan-500 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full">
                  {perfScore >= 90 ? "🏆 Elite" : perfScore >= 75 ? "⭐ Good" : "📈 Improving"}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="38" fill="none" stroke="#f3f4f6" strokeWidth="8"/>
                    <circle cx="48" cy="48" r="38" fill="none" stroke="#22d3ee" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 38}`}
                      strokeDashoffset={`${2 * Math.PI * 38 * (1 - perfScore / 100)}`}
                      strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-gray-800 leading-none">{perfScore}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">/100</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  {[
                    { label: "Acceptance", val: `${acceptanceRate}%`, color: "bg-cyan-400" },
                    { label: "On-time", val: "94%", color: "bg-emerald-400" },
                    { label: "Completion", val: "98%", color: "bg-violet-400" },
                  ].map(m => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-gray-600 font-semibold">{m.label}</span>
                        <span className="text-[11px] text-gray-700 font-black">{m.val}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${m.color} rounded-full`} style={{ width: m.val }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-800 mb-4">Trip Rates</p>
              <div className="space-y-4">
                {[
                  { label: "Acceptance Rate", val: acceptanceRate, max: 100, color: "bg-gradient-to-r from-cyan-400 to-cyan-500", text: "text-cyan-600", good: true },
                  { label: "Cancellation Rate", val: cancellationRate, max: 20, color: "bg-gradient-to-r from-red-300 to-red-400", text: "text-red-500", good: false },
                ].map(r => (
                  <div key={r.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-700 font-semibold">{r.label}</span>
                      <span className={`text-sm font-black ${r.text}`}>{r.val}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${r.color} rounded-full transition-all`} style={{ width: `${(r.val / r.max) * 100}%` }}/>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {r.good ? (r.val >= 80 ? "✓ Great job!" : "Try to accept more rides") : (r.val <= 5 ? "✓ Excellent" : "Keep it low for better score")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-gray-800">Weekly Goal</p>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{weeklyPct}%</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-4">₹{weeklyEarned.toLocaleString()} of ₹{weeklyGoal.toLocaleString()} earned</p>
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-12">
                  <svg className="w-24 h-24 -mt-12" viewBox="0 0 96 96">
                    <path d="M 12 84 A 36 36 0 0 1 84 84" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round"/>
                    <path d="M 12 84 A 36 36 0 0 1 84 84" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray="113" strokeDashoffset={`${113 * (1 - weeklyPct / 100)}`}
                      style={{ transition: "stroke-dashoffset 1s ease" }}/>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 text-center">
                    <span className="text-lg font-black text-gray-800">₹{weeklyEarned}</span>
                  </div>
                </div>
              </div>
              <div className="h-2.25 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: `${weeklyPct}%` }}/>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 text-center">₹{(weeklyGoal - weeklyEarned).toLocaleString()} more to reach your goal!</p>
            </div>
          </div>

          {/* Row 3: Recent Rides + Weekly Chart */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-800">Recent Rides</p>
                <button className="text-[11px] text-cyan-500 font-semibold hover:text-cyan-600 transition-colors">View all →</button>
              </div>
              <div className="grid grid-cols-3 px-5 py-2.5 bg-gray-50 border-b border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Vehicle</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide text-center">Pay</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide text-right">Date</span>
              </div>
              {RECENT_RIDES.map((r, i) => (
                <div key={i} className={`grid grid-cols-3 px-5 py-3.5 items-center hover:bg-cyan-50/50 transition-colors cursor-default ${i > 0 ? "border-t border-gray-100" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 truncate">{r.cab}</p>
                  </div>
                  <p className="text-sm font-black text-cyan-600 text-center">{r.pay}</p>
                  <p className="text-[11px] text-gray-400 text-right leading-tight">{r.date}</p>
                </div>
              ))}
            </div>
            <WeeklyChart/>
          </div>

          {/* Row 4: Peak Hours */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-gray-800">Peak Hours</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Best time to drive today</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {PEAK_HOURS.map((h) => {
                const isNow = h.hour === "6pm";
                return (
                  <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full rounded-md transition-all ${isNow ? "bg-cyan-500 shadow-sm shadow-cyan-200" : h.level >= 5 ? "bg-cyan-200" : h.level >= 3 ? "bg-gray-200" : "bg-gray-100"}`}
                      style={{ height: `${(h.level / 6) * 100}%`, minHeight: "4px" }}/>
                    <span className={`text-[9px] font-semibold ${isNow ? "text-cyan-500" : "text-gray-400"}`}>{h.hour}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-2 bg-cyan-50 border border-cyan-100 rounded-xl px-3 py-2 w-fit">
              <span className="text-cyan-500 text-sm">🔥</span>
              <p className="text-[11px] text-cyan-700 font-semibold">Evening peak (6–9pm) — High demand right now!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}