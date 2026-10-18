import type { UserPlanLevelType } from "../user/userPlan";

import type { BGId } from "./emblemBg";
import type { IconId } from "./emblemIcon";

export type GroupNameField = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string;
};

export type GroupLevelField = {
    selectedLevel: UserPlanLevelType;
    onSelect: (selectedLevel: UserPlanLevelType) => void;
};

export type GroupBasicForm = {
    fullName: GroupNameField;
    shortName: GroupNameField;
    participantLimitLevel: GroupLevelField;
    subGroupManagerLimitLevel: GroupLevelField;
};

export type GroupEmblemType = "custom" | "normal";

export type GroupEmblemCustomData = {
    byte: number;
    extension: string;
    base64: string;
};

export type GroupEmblemNormalData = {
    bgId: BGId;
    iconId: IconId;
};

export type GroupEmblemCustomForm = {
    type: "custom";
    emblem: GroupEmblemCustomData;
    onChange: (emblem: GroupEmblemCustomData) => void;
    errorMessage: string;
};

export type GroupEmblemNormalForm = {
    type: "normal";
    emblem: GroupEmblemNormalData;
    onChange: (emblem: GroupEmblemNormalData) => void;
    errorMessage: string;
};

export type GroupEmblemForm = GroupEmblemCustomForm | GroupEmblemNormalForm;

export type GroupInviteData = {
    userId: number;
    profile: string;
    nickname: string;
};

export type GroupInviteSearchForm = {
    input: string;
    onChange: (value: string) => void;
    errorMessage: string;
    list: GroupInviteData[];
};

export type GroupInviteForm = {
    inviteList: GroupInviteData[];
    search: GroupInviteSearchForm;
};