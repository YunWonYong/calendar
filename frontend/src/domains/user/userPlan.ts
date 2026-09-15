export const USER_PLANS = {
    FREE: 0,
    BASIC: 1,
    PRO: 2,
    PREMIUM: 3,
} as const;

export type UserPlanType = typeof USER_PLANS;
export type UserPlanLevelType = typeof USER_PLANS[keyof typeof USER_PLANS];