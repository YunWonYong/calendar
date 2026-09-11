export const LANDING_PAGE_SECTION_IDS = {
    HERO: "landingHero",
    PROBLEM: "landingProblem",
    FEATURE: "landingFeature", 
} as const;

export const landingPageSectionIds = Object.values(LANDING_PAGE_SECTION_IDS);
export const landingPageSectionIdByStep: Record<LandingPageSectionIdType, number> = {
    [LANDING_PAGE_SECTION_IDS.HERO]: 0,
    [LANDING_PAGE_SECTION_IDS.PROBLEM]: 1,
    [LANDING_PAGE_SECTION_IDS.FEATURE]: 2,
};

export type LandingPageSectionIdType = typeof LANDING_PAGE_SECTION_IDS[keyof typeof LANDING_PAGE_SECTION_IDS];
export type LandingPageSectionProps = {
    id: LandingPageSectionIdType;
    isAnimationPlay: boolean;
};