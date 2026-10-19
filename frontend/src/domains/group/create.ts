import { LOCALE } from "../locale/locale";

import { GROUP_FORM_TYPE } from "./form";

import type { LocaleType } from "../locale/locale";

import type { GroupBasicForm, GroupCreateStepTypes, GroupEmblemCustomForm, GroupEmblemForm, GroupEmblemNormalForm, GroupInviteForm } from "./form";
import type { GroupLimitLevelInfo } from "./group";

export type GroupCreateBasicProps = {
    editForm: GroupBasicForm;
    limitLevelInfo: GroupLimitLevelInfo;
};

export type GroupCreateEmblemCustomProps = {
    editForm: GroupEmblemCustomForm;
};

export type GroupCreateEmblemNormalProps = {
    editForm: GroupEmblemNormalForm;
};

export type GroupCreateEmblemProps = {
    editForm: GroupEmblemForm;
};

export type GroupCreateInviteProps = {
    editForm: GroupInviteForm;
};

export const GROUP_CREATE_HEADER_TITLES: Record<LocaleType, string> = {
    [LOCALE.KR]: "그룹 생성",
    [LOCALE.EN]: "Create Group",
    [LOCALE.JP]: "グループ作成",
    [LOCALE.ZH]: "创建群组",
};

export type GroupCreateFlowStepTypes = 0 | 1 | 2 | 3 | 4;

export const GroupCreateFlowStepByFormType: Record<GroupCreateStepTypes, GroupCreateFlowStepTypes> = {
    [GROUP_FORM_TYPE.BASIC]: 0,
    [GROUP_FORM_TYPE.EMBLEM]: 1,
    [GROUP_FORM_TYPE.MEMBERS]: 2,
    [GROUP_FORM_TYPE.REVIEW]: 3,
    [GROUP_FORM_TYPE.RESULT]: 4,
};

export const GroupFormTypeByCreateFlowStep: Record<GroupCreateFlowStepTypes, GroupCreateStepTypes> = {
    0: GROUP_FORM_TYPE.BASIC,
    1: GROUP_FORM_TYPE.EMBLEM,
    2: GROUP_FORM_TYPE.MEMBERS,
    3: GROUP_FORM_TYPE.REVIEW,
    4: GROUP_FORM_TYPE.RESULT,
};

export type GroupCreateFlowStepState = {
    previous?: GroupCreateFlowStepTypes;
    current: GroupCreateFlowStepTypes;
    next?: GroupCreateFlowStepTypes;
};

export type GroupCreateFlowContextType = {
    steps: GroupCreateFlowStepState;
    nextStep: () => void;
    previousStep: () => void;
};

export const GROUP_CREATE_STEP_BUTTON_TYPE = {
    NEXT: "NEXT",
    PREVIOUS: "PREVIOUS",
    LOBBY: "LOBBY",
    SUBMIT: "SUBMIT"
} as const;

export type GroupCreateStepButtonTypes = keyof typeof GROUP_CREATE_STEP_BUTTON_TYPE;

export const GROUP_CREATE_STEP_BUTTON_TITLE = {
    [LOCALE.KR]: {
        [GROUP_CREATE_STEP_BUTTON_TYPE.NEXT]: {
            [GROUP_FORM_TYPE.BASIC]: "엠블럼 설정",
            [GROUP_FORM_TYPE.EMBLEM]: "그룹원 설정",
            [GROUP_FORM_TYPE.MEMBERS]: "설정 확인",
            [GROUP_FORM_TYPE.REVIEW]: "그룹 생성",
            [GROUP_FORM_TYPE.RESULT]: "로비 이동"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.PREVIOUS]: {
            [GROUP_FORM_TYPE.BASIC]: "로비 이동",
            [GROUP_FORM_TYPE.EMBLEM]: "기본 설정",
            [GROUP_FORM_TYPE.MEMBERS]: "엠블럼 설정",
            [GROUP_FORM_TYPE.REVIEW]: "그룹원 설정",
            [GROUP_FORM_TYPE.RESULT]: "설정 확인"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY]: "로비 이동",
        [GROUP_CREATE_STEP_BUTTON_TYPE.SUBMIT]: "그룹 생성",
    },
    [LOCALE.EN]: {
        [GROUP_CREATE_STEP_BUTTON_TYPE.NEXT]: {
            [GROUP_FORM_TYPE.BASIC]: "Emblem",
            [GROUP_FORM_TYPE.EMBLEM]: "Members",
            [GROUP_FORM_TYPE.MEMBERS]: "Review",
            [GROUP_FORM_TYPE.REVIEW]: "Create Group",
            [GROUP_FORM_TYPE.RESULT]: "Lobby"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.PREVIOUS]: {
            [GROUP_FORM_TYPE.BASIC]: "Lobby",
            [GROUP_FORM_TYPE.EMBLEM]: "Basic",
            [GROUP_FORM_TYPE.MEMBERS]: "Emblem",
            [GROUP_FORM_TYPE.REVIEW]: "Members",
            [GROUP_FORM_TYPE.RESULT]: "Review"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY]: "Lobby",
        [GROUP_CREATE_STEP_BUTTON_TYPE.SUBMIT]: "Create Group",
    },
    [LOCALE.ZH]: {
        [GROUP_CREATE_STEP_BUTTON_TYPE.NEXT]: {
            [GROUP_FORM_TYPE.BASIC]: "徽章",
            [GROUP_FORM_TYPE.EMBLEM]: "成员",
            [GROUP_FORM_TYPE.MEMBERS]: "确认",
            [GROUP_FORM_TYPE.REVIEW]: "创建群组",
            [GROUP_FORM_TYPE.RESULT]: "大厅"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.PREVIOUS]: {
            [GROUP_FORM_TYPE.BASIC]: "大厅",
            [GROUP_FORM_TYPE.EMBLEM]: "基本设置",
            [GROUP_FORM_TYPE.MEMBERS]: "徽章",
            [GROUP_FORM_TYPE.REVIEW]: "成员",
            [GROUP_FORM_TYPE.RESULT]: "确认"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY]: "大厅",
        [GROUP_CREATE_STEP_BUTTON_TYPE.SUBMIT]: "创建群组",
    },
    [LOCALE.JP]: {
        [GROUP_CREATE_STEP_BUTTON_TYPE.NEXT]: {
            [GROUP_FORM_TYPE.BASIC]: "エンブレム",
            [GROUP_FORM_TYPE.EMBLEM]: "メンバー",
            [GROUP_FORM_TYPE.MEMBERS]: "確認",
            [GROUP_FORM_TYPE.REVIEW]: "グループ作成",
            [GROUP_FORM_TYPE.RESULT]: "ロビー"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.PREVIOUS]: {
            [GROUP_FORM_TYPE.BASIC]: "ロビー",
            [GROUP_FORM_TYPE.EMBLEM]: "基本設定",
            [GROUP_FORM_TYPE.MEMBERS]: "エンブレム",
            [GROUP_FORM_TYPE.REVIEW]: "メンバー",
            [GROUP_FORM_TYPE.RESULT]: "確認"
        },
        [GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY]: "ロビー",
        [GROUP_CREATE_STEP_BUTTON_TYPE.SUBMIT]: "グループ作成",
    },
} as const;