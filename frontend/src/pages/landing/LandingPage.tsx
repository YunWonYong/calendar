import useLandingPageSectionScroll from "@/hooks/landing/UseLandingPageSectionScroll";

import LandingPageHeader from "./layout/LandingPageHeader";
import LandingPageSection from "./layout/LandingPageSection";

import styles from "./LandingPage.module.css";

const SECTION_MIN_HIGHT = 765;

const LandingPage = () => {
    const { step, previousStep } = useLandingPageSectionScroll(SECTION_MIN_HIGHT);
    return (
        <section className={ styles.wrap }>
            <LandingPageHeader />
            <LandingPageSection 
                step={ step }
                previousStep={ previousStep }
            />
        </section>
    );
};

export default LandingPage;