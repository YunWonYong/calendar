import { FC } from "react";
import { LANDING_PAGE_SECTION_IDS, landingPageSectionIdByStep } from "@/domains/landing/landingPageType";
    
import LandingHeroArticle from "../components/LandingHeroArticle";
import LandingProblemArticle from "../components/LandingProblemArticle";
import LandingFeatureArticle from "../components/LandingFeatureArticle";

import styles from "./LandingPageSection.module.css";

import type { LandingPageSectionIdType, LandingPageSectionProps } from "@/domains/landing/landingPageType";

type LandingPageArticleCompoentType = {
    id: LandingPageSectionIdType;
    sectionStep: number;
    component: FC<LandingPageSectionProps>; 
};

const landingPageArticleCompoents: LandingPageArticleCompoentType[] = [
    {
        id: LANDING_PAGE_SECTION_IDS.HERO,
        sectionStep: landingPageSectionIdByStep[LANDING_PAGE_SECTION_IDS.HERO],
        component: LandingHeroArticle
    },
    {
        id: LANDING_PAGE_SECTION_IDS.PROBLEM,
        sectionStep: landingPageSectionIdByStep[LANDING_PAGE_SECTION_IDS.PROBLEM],
        component: LandingProblemArticle
    },
    {
        id: LANDING_PAGE_SECTION_IDS.FEATURE,
        sectionStep: landingPageSectionIdByStep[LANDING_PAGE_SECTION_IDS.FEATURE],
        component: LandingFeatureArticle
    },
];

const LandingPageSection: FC<{ step: number; previousStep: number }> = ({ step, previousStep }) => {
    return (
        <>
            {
                landingPageArticleCompoents.map((info) => {
                    const { id, sectionStep, component: Article } = info;
                    return (
                        <section
                            key={ id }
                            id={ id }
                            className={ styles.section }
                        >
                            <Article 
                                isAnimationPlay={ sectionStep === step || sectionStep === previousStep }
                            />
                        </section>
                    );
                })
            }
        </>
    );
};

export default LandingPageSection;