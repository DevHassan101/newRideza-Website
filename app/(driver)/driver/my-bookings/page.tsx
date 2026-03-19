"use client";
import { useRouter } from "next/navigation";
import MyBookingsPanel from "../_components/desktop/panels/MyBookingsPanel";
import BottomNav       from "../_components/mobile/BottomNav";

export default function MyBookingsPage() {
  const router = useRouter();

  const goTo = (s: string) => {
    const routes: Record<string, string> = {
      home:          "/driver/live-rides",
      "my-bookings": "/driver/my-bookings",
      profile:       "/driver/profile",
    };
    router.push(routes[s] ?? "/driver/live-rides");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-auto">
        <MyBookingsPanel />
      </div>
      {/* Mobile only */}
      <div className="md:hidden">
        <BottomNav active="my-bookings" onNav={goTo}/>
      </div>
    </div>
  );
}
