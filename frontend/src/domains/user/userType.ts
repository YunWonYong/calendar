import type { PlanTypeIds, PlanTypes } from "../plan/planType";

export type UserInfo = {
    email: string;
    id: number;
    nickname: string;
    planId: PlanTypeIds;
    planType: PlanTypes;
    profileImage: string;
    profileImageType: "URL" | "ID";
    tel: string;
};