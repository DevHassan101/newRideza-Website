"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DriverProvider, useDriver } from "./lib/DriverContext";
import LeftPanel      from "./_components/desktop/LeftPanel";
import DashboardPanel from "./_components/desktop/panels/DashboardPanel";
import LiveMapPanel   from "./_components/desktop/panels/LiveMapPanel";
import ProfilePanel      from "./_components/desktop/panels/ProfilePanel";
import MyBookingsPanel   from "./_components/desktop/panels/MyBookingsPanel";

function getActiveNav(pathname: string): string {
  if (pathname.startsWith("/driver/profile"))    return "profile";
  if (pathname.startsWith("/driver/live-map"))   return "live-map";
  if (pathname.startsWith("/driver/home"))       return "home";
  if (pathname.startsWith("/driver/onboarding")) return "profile";
  if (pathname.startsWith("/driver/my-bookings")) return "my-bookings";
  return "home";
}

const NAV_ROUTES: Record<string, string> = {
  home:            "/driver/home",
  "live-map":      "/driver/live-map",
  profile:         "/driver/profile",
  "personal-info": "/driver/onboarding",
  "aadhaar-card":  "/driver/onboarding/aadhaar",
  "license-info":  "/driver/onboarding/license",
  "my-bookings":   "/driver/my-bookings",
};

function DesktopLayout({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(false);
  const { driver } = useDriver();
  const pathname   = usePathname();
  const router     = useRouter();

  const activeNav = getActiveNav(pathname);
  const isOnboard = pathname.startsWith("/driver/onboarding");
  const goTo      = (s: string) => router.push(NAV_ROUTES[s] ?? "/driver/home");

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <LeftPanel
        driver={driver}
        isOnline={isOnline}
        onToggleOnline={() => setIsOnline(v => !v)}
        activeNav={activeNav}
        onNav={goTo}
      />

      <div className="flex flex-1 overflow-hidden relative">

        {/* Full-width panels — no map anywhere */}
        <div className="flex-1 overflow-hidden">
          {activeNav === "home"     && <DashboardPanel />}
          {activeNav === "live-map" && <LiveMapPanel fullWidth isOnline={isOnline} />}
          {activeNav === "profile"      && <ProfilePanel isOnline={isOnline} onNav={goTo} />}
          {activeNav === "my-bookings"  && <MyBookingsPanel />}
        </div>

        {/* Onboarding slide-in overlay */}
        <div
          className="absolute inset-0 bg-gray-50 flex flex-col overflow-hidden"
          style={{
            transform:     isOnboard ? "translateX(0)" : "translateX(100%)",
            transition:    "transform 520ms cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: isOnboard ? "auto" : "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function MobileLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-full bg-white flex flex-col overflow-hidden">{children}</div>;
}

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) return null;

  return (
    <DriverProvider>
      {isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>}
    </DriverProvider>
  );
}