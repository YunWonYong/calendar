export const PLANS = {
    FREE: 0,
    BASIC: 1,
    PRO: 2,
    PREMIUM: 3,
    ULTIMATE: 4,
} as const;

export type PlanTypes = typeof PLANS;
export type PlanTypeIds = typeof PLANS[keyof typeof PLANS];