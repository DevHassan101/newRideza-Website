import SafetyHero from "../components/safety/SafetyHero";
import SafetyMeasures from "../components/safety/Safetymeasures";
import WayForward from "../components/safety/Wayforword";

export default function SafetyPage() {
    return (
        <>
            <section className="mt-30">
                <SafetyHero />
                <SafetyMeasures />
                <WayForward />
            </section>
        </>
    )
}