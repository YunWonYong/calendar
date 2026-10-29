import type { PlanTypeIds } from "../plan/planType";

export type PromotionTypes = "discount" | "event" | "upgrade" | "returns";
export type PromotionData = {
    type: PromotionTypes;
    percent: number;
};

export type PromotionMap = Partial<
    Record<PlanTypeIds, PromotionData>
>;