"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * /driver/live-map
 * Desktop : layout.tsx renders Map + LiveMapPanel — yeh page sirf null return karta hai
 * Mobile  : /driver/live-rides par redirect
 */
export default function LiveMapPage() {
  const router = useRouter();
  useEffect(() => {
    if (window.innerWidth < 768) router.replace("/driver/live-rides");
  }, []);
  return null;
}
