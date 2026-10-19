
import { LOCALE } from "../locale/locale";

import basicIcon from "@/assets/group/form/basic.webp";
import emblemIcon from "@/assets/group/form/emblem.webp";
import membersIcon from "@/assets/group/form/members.webp";
import resultIcon from "@/assets/group/form/result.webp";
import reviewIcon from "@/assets/group/form/review.webp";

import type { LocaleType } from "../locale/locale";
import type { PlanTypeIds } from "../plan/planType";

import type { BGId } from "./emblemBg";
import type { IconId } from "./emblemIcon";

export type GroupNameField = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string;
};

export type GroupLevelField = {
    selectedPlanId: PlanTypeIds;
    onSelect: (selectedPlanId: PlanTypeIds) => void;
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


export const GROUP_FORM_TYPE = {
    BASIC: "basic",
    EMBLEM: "emblem",
    MEMBERS: "members",
    REVIEW: "review",
    RESULT: "result"
} as const;

export type GroupCreateStepTypes = typeof GROUP_FORM_TYPE[keyof typeof GROUP_FORM_TYPE];
export type GroupCreateStepTitleTypes = Record<GroupCreateStepTypes, string>;

export const GROUP_CREATE_STEP_TITLE: Record<LocaleType, GroupCreateStepTitleTypes> = {
    [LOCALE.KR]: {
        [GROUP_FORM_TYPE.BASIC]: "기본 정보",
        [GROUP_FORM_TYPE.EMBLEM]: "앰블럼",
        [GROUP_FORM_TYPE.MEMBERS]: "그룹원 설정",
        [GROUP_FORM_TYPE.REVIEW]: "입력 정보 확인",
        [GROUP_FORM_TYPE.RESULT]: "결과",
    },
    [LOCALE.EN]: {
        [GROUP_FORM_TYPE.BASIC]: "Basic",
        [GROUP_FORM_TYPE.EMBLEM]: "Emblem",
        [GROUP_FORM_TYPE.MEMBERS]: "Members",
        [GROUP_FORM_TYPE.REVIEW]: "Review",
        [GROUP_FORM_TYPE.RESULT]: "Result",
    },
    [LOCALE.JP]: {
        [GROUP_FORM_TYPE.BASIC]: "基本",
        [GROUP_FORM_TYPE.EMBLEM]: "エンブレム",
        [GROUP_FORM_TYPE.MEMBERS]: "メンバー",
        [GROUP_FORM_TYPE.REVIEW]: "確認",
        [GROUP_FORM_TYPE.RESULT]: "結果",
    },
    [LOCALE.ZH]: {
        [GROUP_FORM_TYPE.BASIC]: "基本",
        [GROUP_FORM_TYPE.EMBLEM]: "徽章",
        [GROUP_FORM_TYPE.MEMBERS]: "成员",
        [GROUP_FORM_TYPE.REVIEW]: "确认",
        [GROUP_FORM_TYPE.RESULT]: "结果",
    },
};

export const GROUP_CREATE_STEP_ICON: Record<GroupCreateStepTypes, string> = {
    [GROUP_FORM_TYPE.BASIC]: basicIcon,
    [GROUP_FORM_TYPE.EMBLEM]: emblemIcon,
    [GROUP_FORM_TYPE.MEMBERS]: membersIcon,
    [GROUP_FORM_TYPE.REVIEW]: reviewIcon,
    [GROUP_FORM_TYPE.RESULT]: resultIcon,
};