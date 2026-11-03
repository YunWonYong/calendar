import { isNumberTextStrict } from "@/lib/validation/validation";

import { PLANS } from "./planType";

import type { PlanTypeIds, PlanTypes } from "./planType";

const PLAN_TYPES = Object.keys(PLANS);
const PLAN_TYPE_IDS = Object.values(PLANS);

export const isPlanType = (value: string | PlanTypes): value is PlanTypes =>
    PLAN_TYPES.includes(value);

export const isPlanTypeId = (value: string | number | PlanTypeIds): value is PlanTypeIds => {
    if (typeof value === "string") {
        if (!isNumberTextStrict(value)) {
            return false;
        }

        value = Number(value);
    }

    return PLAN_TYPE_IDS.includes(value as PlanTypeIds);
};