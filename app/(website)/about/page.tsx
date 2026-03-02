import HomeAbout from "../components/home/HomeAbout";
import AboutBenefits from "../components/about/AboutBenefits";
import AboutFaqs from "../components/about/AboutFaqs";

export default function AboutPage() {
    return (
        <>
            <section className="mt-30">
                <HomeAbout />
                <AboutBenefits />
                <AboutFaqs />
            </section>
        </>
    )
}