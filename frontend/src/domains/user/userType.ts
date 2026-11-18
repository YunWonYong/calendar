import type { PlanTypeIds, PlanTypes } from "../plan/planType";

export const NICKNAME_MIN_LEN = 2;
export const NICKNAME_MAX_LEN = 12;

export const TAG_MIN_LEN = 2;
export const TAG_MAX_LEN = 8;

export type UserInfo = {
    email: string;
    id: number;
    tag: string;
    nickname: string;
    planId: PlanTypeIds;
    planType: PlanTypes;
    profileImage: string;
    profileImageType: "URL" | "ID";
    tel: string;
};

export type UserProfileType = {
    userId: number;
    tag: string;
    nickname: string;
    profileImage: string;
    profileImageType: "URL" | "ID";
};

export type UsersResponseBody = {
    empty: boolean;
    hasNext: boolean;
    list: UserProfileType[];
};