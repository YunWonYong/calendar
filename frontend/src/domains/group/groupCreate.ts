import type { PromotionTypes } from "../promotion/promotionType";
import type { UserPlanLevelType } from "../user/userPlan";

export type GroupNameEditType = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string;
};

export type GroupLimitType = {
    limitPlanLevel: UserPlanLevelType;
    participantUserLimit: number;
    deputyGroupManagerLimit: number;
    isDisabled: boolean;
    // 서버에서 userPlanLevel에 따라 프로모션의 데이터가 사용자마다 다를 수 있음.
    promotion?: {
        // 프로모션이 있으면 type에 따라 뱃지 같은걸 보여줄 예정.
        type: PromotionTypes;
        percent: number;
    }
};

export type GroupLimitInfoType = {
    userPlanLevel: UserPlanLevelType;
    limits: GroupLimitType[];
};

export type GroupBasicInfoStepProps = {
    // react state.
    fullNameEditInfo: GroupNameEditType;
    shortNameEditInfo: GroupNameEditType;
    // 서버에서 읽을 데이터가 포함돼 있음.
    limitInfo: GroupLimitInfoType;
    selectedLimitLevel: UserPlanLevelType;
};

export const DEFAULT_GROUP_BASIC_INFO_STEP_LIMITS: GroupLimitType[] = [
    {
        limitPlanLevel: 0,
        isDisabled: false,
        participantUserLimit: 15,
        deputyGroupManagerLimit: 5
    },
    {
        limitPlanLevel: 1,
        isDisabled: true,
        participantUserLimit: 30,
        deputyGroupManagerLimit: 7,
        promotion: {
            type: "returns",
            percent: 60,
        },
    },
    {
        limitPlanLevel: 2,
        isDisabled: true,
        participantUserLimit: 50,
        deputyGroupManagerLimit: 9,
        promotion: {
            type: "upgrade",
            percent: 45,
        },
    },
    {
        limitPlanLevel: 3,
        isDisabled: true,
        participantUserLimit: 100,
        deputyGroupManagerLimit: 12,
        promotion: {
            type: "discount",
            percent: 30,
        },
    },
];