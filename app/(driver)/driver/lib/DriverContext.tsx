"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─────────────────────────────────────────
//  Types
// ─────────────────────────────────────────
type DriverProfile = {
    id:              string;
    city:            string;
    aadhaar:         string;
    dateOfBirth:     string | null;
    profilePic:      string | null;
    aadhaarFrontPic: string | null;
    aadhaarBackPic:  string | null;
    licensePic:      string | null;
    licenseNumber:   string | null;
    licenseExpiry:   string | null;
    status:          string;
};

type Driver = {
    id:            string;
    name:          string;
    email:         string;
    phone:         string;
    role:          string;
    driverProfile: DriverProfile | null;
};

type DriverCtx = {
    driver:        Driver | null;
    loading:       boolean;
    setDriver:     (d: Driver) => void;
    refreshDriver: () => Promise<void>;
};

// ─────────────────────────────────────────
//  Context
// ─────────────────────────────────────────
const Ctx = createContext<DriverCtx>({
    driver:        null,
    loading:       true,
    setDriver:     () => {},
    refreshDriver: async () => {},
});

export function DriverProvider({ children }: { children: ReactNode }) {
    const [driver, setDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDriver = async () => {
        try {
            const res  = await fetch("/api/auth/me");
            const data = await res.json();
            setDriver(data.user ?? null);
        } catch {
            setDriver(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDriver(); }, []);

    return (
        <Ctx.Provider value={{ driver, loading, setDriver, refreshDriver: fetchDriver }}>
            {children}
        </Ctx.Provider>
    );
}

export const useDriver = () => useContext(Ctx);