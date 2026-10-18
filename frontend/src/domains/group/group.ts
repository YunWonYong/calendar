import { PLANS } from "../plan/planType";

import type { PlanTypeIds } from "../plan/planType";
import type { PromotionMap } from "../promotion/promotionType";

export type GroupLimitLevelData = {
    limitLevel: PlanTypeIds;
    count: number;
};

export type GroupLimitLevelInfo = {
    member: GroupLimitLevelData[];
    subManager: GroupLimitLevelData[];
    promotions?: PromotionMap;
};

const GROUP_MEMBER_LIMIT_LEVEL_LIST_DUMMY_DATA: GroupLimitLevelData[] = [
    { limitLevel: PLANS.FREE, count: 15 },
    { limitLevel: PLANS.BASIC, count: 30 },
    { limitLevel: PLANS.PRO, count: 50 },
    { limitLevel: PLANS.PREMIUM, count: 75 },
];

const GROUP_SUB_MANAGER_LIMIT_LEVEL_LIST_DUMMY_DATA: GroupLimitLevelData[] = [
    { limitLevel: PLANS.FREE, count: 3 },
    { limitLevel: PLANS.BASIC, count: 5 },
    { limitLevel: PLANS.PRO, count: 7 },
    { limitLevel: PLANS.PREMIUM, count: 10 },
];

export const GROUP_LIMIT_LEVEL_LIST_DUMMY_INFO: GroupLimitLevelInfo = {
    member: GROUP_MEMBER_LIMIT_LEVEL_LIST_DUMMY_DATA,
    subManager: GROUP_SUB_MANAGER_LIMIT_LEVEL_LIST_DUMMY_DATA,
    promotions: {
        [PLANS.BASIC]: {
            type: "discount",
            percent: 10,
        },
        [PLANS.PRO]: {
            type: "event",
            percent: 15,
        },
        [PLANS.PREMIUM]: {
            type: "returns",
            percent: 30,
        }
    }
};