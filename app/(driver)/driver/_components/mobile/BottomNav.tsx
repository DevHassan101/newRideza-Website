const ITEMS = [
  {
    id: "home", label: "Rides",
    icon: (active: boolean) => (
      <svg className={`w-5.5 h-5.5 ${active ? "text-cyan-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.8}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
      </svg>
    ),
  },
  {
    id: "my-bookings", label: "Bookings",
    icon: (active: boolean) => (
      <svg className={`w-5.5 h-5.5 ${active ? "text-cyan-500" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2m0 15l-5-2.18L7 18V5h10z"/>
      </svg>
    ),
  },
  {
    id: "profile", label: "Profile",
    icon: (active: boolean) => (
      <svg className={`w-5.5 h-5.5 ${active ? "text-cyan-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    ),
  },
];

export default function BottomNav({ active, onNav }: any) {
  return (
    <div className="border-t border-gray-100 bg-white safe-area-bottom">
      <div className="flex">
        {ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              className="flex-1 flex flex-col items-center pt-3 pb-2 gap-1 relative">
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-500 rounded-full"/>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive ? "bg-cyan-50" : ""}`}>
                {item.icon(isActive)}
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? "text-cyan-500" : "text-gray-400"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
