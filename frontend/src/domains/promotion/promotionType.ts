import type { UserPlanLevelType } from "../user/userPlan";

export type PromotionTypes = "discount" | "event" | "upgrade" | "returns";
export type PromotionData = {
    type: PromotionTypes;
    percent: number;
};

export type PromotionMap = Partial<
    Record<UserPlanLevelType, PromotionData>
>;