# Rideza — Driver Dashboard

## Folder Structure

```
app/
└── (driver)/
    │
    ├── layout.tsx                       ← ROOT — read this first
    │                                      Mobile/Desktop detection
    │                                      Desktop: renders LeftPanel + Map + RightPanel
    │                                      Mobile: simple wrapper
    │
    ├── page.tsx                         ← /driver → redirect to /driver/home
    │
    ├── home/page.tsx                    ← /driver/home      → Dashboard stats
    ├── live-map/page.tsx                ← /driver/live-map  → Live Map screen
    ├── profile/page.tsx                 ← /driver/profile
    ├── trip/page.tsx                    ← /driver/trip (mobile only)
    │
    ├── onboarding/page.tsx              ← Step 1: Personal Info
    ├── onboarding/passport/page.tsx     ← Step 2: Passport Photo
    ├── onboarding/vehicle/page.tsx      ← Step 3: Vehicle Doc
    │
    ├── _components/
    │   ├── desktop/
    │   │   ├── LeftPanel.tsx            ← Sidebar nav
    │   │   ├── RightPanel.tsx           ← Thin switcher only (3 lines)
    │   │   └── panels/
    │   │       ├── DashboardPanel.tsx   ← Stats, charts, recent rides
    │   │       ├── LiveMapPanel.tsx     ← Online status, today summary
    │   │       └── ProfilePanel.tsx     ← Avatar, info, edit button
    │   ├── mobile/
    │   │   └── BottomNav.tsx
    │   └── shared/
    │       ├── MapPage.tsx
    │       ├── StepProgress.tsx
    │       ├── UploadBox.tsx
    │       └── PageHeader.tsx
    │
    └── lib/
        ├── DriverContext.tsx            ← Global driver state
        └── FormStore.ts                ← API stubs
```

---

## URL → activeNav → RightPanel

| URL                     | activeNav   | RightPanel shows  |
|------------------------|-------------|-------------------|
| `/driver/home`        | `home`      | DashboardPanel    |
| `/driver/live-map`    | `live-map`  | LiveMapPanel      |
| `/driver/profile`     | `profile`   | ProfilePanel      |
| `/driver/onboarding`  | `profile`   | overlay slides in |

## Want to edit a panel? Go directly to:
- Stats/charts → `_components/desktop/panels/DashboardPanel.tsx`
- Live map info → `_components/desktop/panels/LiveMapPanel.tsx`
- Profile info  → `_components/desktop/panels/ProfilePanel.tsx`
