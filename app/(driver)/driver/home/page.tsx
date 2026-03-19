"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * /driver/home  →  Desktop: layout handles everything (DashboardPanel via activeNav="home")
 *               →  Mobile:  redirect to /driver/live-rides (canonical mobile home)
 */
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // On mobile, dashboard doesn't exist — redirect to live-rides (mobile map home)
    if (window.innerWidth < 768) router.replace("/driver/live-rides");
  }, []);

  return null; // desktop: layout renders DashboardPanel directly
}
