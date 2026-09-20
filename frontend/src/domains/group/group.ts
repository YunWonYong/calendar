import { USER_PLANS, type UserPlanLevelType } from "../user/userPlan";

import type { PromotionMap } from "../promotion/promotionType";

export type GroupLimitLevelData = {
    limitLevel: UserPlanLevelType;
    count: number;
};

export type GroupLimitLevelInfo = {
    member: GroupLimitLevelData[];
    subManager: GroupLimitLevelData[];
    promotions?: PromotionMap;
};

const GROUP_MEMBER_LIMIT_LEVEL_LIST_DUMMY_DATA: GroupLimitLevelData[] = [
    { limitLevel: USER_PLANS.FREE, count: 15 },
    { limitLevel: USER_PLANS.BASIC, count: 30 },
    { limitLevel: USER_PLANS.PRO, count: 50 },
    { limitLevel: USER_PLANS.PREMIUM, count: 75 },
];

const GROUP_SUB_MANAGER_LIMIT_LEVEL_LIST_DUMMY_DATA: GroupLimitLevelData[] = [
    { limitLevel: USER_PLANS.FREE, count: 3 },
    { limitLevel: USER_PLANS.BASIC, count: 5 },
    { limitLevel: USER_PLANS.PRO, count: 7 },
    { limitLevel: USER_PLANS.PREMIUM, count: 10 },
];

export const GROUP_LIMIT_LEVEL_LIST_DUMMY_INFO: GroupLimitLevelInfo = {
    member: GROUP_MEMBER_LIMIT_LEVEL_LIST_DUMMY_DATA,
    subManager: GROUP_SUB_MANAGER_LIMIT_LEVEL_LIST_DUMMY_DATA,
    promotions: {
        [USER_PLANS.BASIC]: {
            type: "discount",
            percent: 10,
        },
        [USER_PLANS.PRO]: {
            type: "event",
            percent: 15,
        },
        [USER_PLANS.PREMIUM]: {
            type: "returns",
            percent: 30,
        }
    }
};