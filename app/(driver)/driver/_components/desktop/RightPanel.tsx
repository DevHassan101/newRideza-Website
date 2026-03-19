"use client";
import LiveMapPanel from "./panels/LiveMapPanel";

// RightPanel ab sirf live-map view mein use hota hai (layout.tsx se directly call).
// Dashboard aur Profile layout mein full-width render hote hain.
export default function RightPanel({ isOnline }: { isOnline: boolean }) {
  return <LiveMapPanel isOnline={isOnline} />;
}
