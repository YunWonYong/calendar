
import { LOCALE } from "../locale/locale";
import { PLANS } from "../plan/planType";

import basicIcon from "@/assets/group/form/basic.webp";
import emblemIcon from "@/assets/group/form/emblem.webp";
import membersIcon from "@/assets/group/form/members.webp";
import resultIcon from "@/assets/group/form/result.webp";
import reviewIcon from "@/assets/group/form/review.webp";

import type { LocaleType } from "../locale/locale";
import type { PlanTypeIds } from "../plan/planType";

import type { BGId } from "./emblemBg";
import type { IconId } from "./emblemIcon";
import type { GroupMemberType } from "./member";

export const GROUP_FORM_TYPE = {
    BASIC: "BASIC",
    EMBLEM: "EMBLEM",
    MEMBERS: "MEMBERS",
    REVIEW: "REVIEW",
    RESULT: "RESULT"
} as const;

export type GroupFormTypes = typeof GROUP_FORM_TYPE[keyof typeof GROUP_FORM_TYPE];

export type GroupFormContextType<T> = {
    formData: T;
    isValidFormData: () => boolean;
};

export type GroupFormState<T> = {
    formData: T;
    isValid: boolean;
};

export type GroupBasicFormData = {
    fullName: string;
    shortName: string;
    maxSubLeaderPlanId: PlanTypeIds;
    maxOwnedGroupMemberPlanId: PlanTypeIds;
};

export const CHANGE_NAME_TYPE = {
    FULL_NAME: "fullName",
    SHORT_NAME: "shortName",
} as const;
export type GroupBasicFormChangeNameTypes = typeof CHANGE_NAME_TYPE[keyof typeof CHANGE_NAME_TYPE];

export const SELECT_PLAN_ID_TYPE = {
    MAX_SUB_LEADER: "maxSubLeaderPlan",
    MAX_OWNED_GROUP_MEMBER: "maxOwnedGroupMember",
} as const;
export type GroupBasicFormSelectPlanIdTypes = typeof SELECT_PLAN_ID_TYPE[keyof typeof SELECT_PLAN_ID_TYPE];

export type GroupBasicFormChangeNameHandleType = (type: GroupBasicFormChangeNameTypes, value: string) => void;
export type GroupBasicFormSelectPlanIdHandleType = (type: GroupBasicFormSelectPlanIdTypes, selectedPlanId: PlanTypeIds) => void;

export type GroupBasicFormContextType = {
    errorMessages: Record<GroupBasicFormChangeNameTypes, string>;
    onChangeName: GroupBasicFormChangeNameHandleType;
    onSelectPlanId: GroupBasicFormSelectPlanIdHandleType;
} & GroupFormContextType<GroupBasicFormData>;

export type GroupBasicFormState = {
    errorMessages: Record<GroupBasicFormChangeNameTypes, string>;
} & GroupFormState<GroupBasicFormData>;

export const DEFAULT_GROUP_BASIC_FORM_STATE: GroupBasicFormState = {
    formData: {
        fullName: "",
        shortName: "",
        maxOwnedGroupMemberPlanId: PLANS.FREE,
        maxSubLeaderPlanId: PLANS.FREE,
    },
    errorMessages: {
        fullName: "",
        shortName: ""
    },
    isValid: false,
}

export const GROUP_EMBLEM_TYPE = {
    CUSTOM: "custom",
    NORMAL: "normal"
} as const;

export type GroupEmblemTypes = typeof GROUP_EMBLEM_TYPE[keyof typeof GROUP_EMBLEM_TYPE];

export type GroupEmblemFormCustomData = {
    byte: number;
    extension: string;
    base64: string;
};

export type GroupEmblemFormNormalData = {
    bgId: BGId;
    iconId: IconId;
};

export type GroupEmblemFormData = {
    [GROUP_EMBLEM_TYPE.CUSTOM]: GroupEmblemFormCustomData;
    [GROUP_EMBLEM_TYPE.NORMAL]: GroupEmblemFormNormalData;
};

export type GroupEmblemFormState = {
    currentEmblemType: GroupEmblemTypes;
} & GroupFormState<GroupEmblemFormData>;

export type GroupMemberFormData = {
    members: GroupMemberType[];
};

export type GroupMemberSearchOptions = {
    input: string;
    errorMessage?: string;
};

export type GroupMembersFormState = {
    changeMembers: GroupMemberType[];
    searchOptions: GroupMemberSearchOptions;
    isFetch: boolean;
} & GroupFormState<GroupMemberFormData>;

export type GroupFormDataTypes = GroupBasicFormData | GroupEmblemFormData | GroupMemberFormData;
export type GroupReducerState = GroupBasicFormState | GroupEmblemFormState | GroupMembersFormState;

export const GROUP_BASIC_FORM_ACTIONS = {
    CHANGE_FULL_NAME: "CHANGE_FULL_NAME",
    CHANGE_SHORT_NAME: "CHANGE_SHORT_NAME",
    SELECT_MAX_OWNED_GROUP_MEMBER_PLAN_ID: "SELECT_MAX_OWNED_GROUP_MEMBER_PLAN_ID",
    SELECT_MAX_SUB_LEADER_PLAN_ID: "SELECT_MAX_SUB_LEADER_PLAN_ID",
} as const;

export const GROUP_BASIC_ACTION_TYPES = {
    [CHANGE_NAME_TYPE.FULL_NAME]: GROUP_BASIC_FORM_ACTIONS.CHANGE_FULL_NAME,
    [CHANGE_NAME_TYPE.SHORT_NAME]: GROUP_BASIC_FORM_ACTIONS.CHANGE_SHORT_NAME,
    [SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER]: GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_SUB_LEADER_PLAN_ID,
    [SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER]: GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_OWNED_GROUP_MEMBER_PLAN_ID,
} as const;

export type GroupBasicFormActionType = typeof GROUP_BASIC_FORM_ACTIONS[keyof typeof GROUP_BASIC_FORM_ACTIONS];

export const GROUP_EMBLEM_FORM_ACTIONS = {
    SELECT_EMBLEM_TAB: "SELECT_EMBLEM_TAB",
    CHANGE_NOMAL_EMBLEM: "CHANGE_NOMAL_EMBLEM",
    CHANGE_CUSTOM_EMBLEM: "CHANGE_CUSTOM_EMBLEM",
} as const;
export type GroupEmblemFormActionType = typeof GROUP_EMBLEM_FORM_ACTIONS[keyof typeof GROUP_EMBLEM_FORM_ACTIONS];

export const GROUP_MEMBERS_FORM_ACTIONS = {
    CHANGE_SEARCH_INPUT: "CHANGE_SEARCH_INPUT",
    ADD_MEMBER: "ADD_MEMBER",
    REMOVE_MEMBER: "REMOVE_MEMBER"
} as const;
export type GroupMembersFormActionType = typeof GROUP_MEMBERS_FORM_ACTIONS[keyof typeof GROUP_MEMBERS_FORM_ACTIONS];

export type GroupBasicFormNameAction = 
    typeof GROUP_BASIC_FORM_ACTIONS.CHANGE_FULL_NAME
    | typeof GROUP_BASIC_FORM_ACTIONS.CHANGE_SHORT_NAME;
export type GroupBasicFormPlanIdAction = 
    typeof GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_SUB_LEADER_PLAN_ID 
    | typeof GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_OWNED_GROUP_MEMBER_PLAN_ID;

export type GroupBasicFormAction = 
    {
        type: GroupBasicFormNameAction;
        value: string;  
    } |
    {
        type: GroupBasicFormPlanIdAction;
        selectedPlanId: PlanTypeIds;
    };

export type GroupEmblemFormAction = 
    {
        type: typeof GROUP_EMBLEM_FORM_ACTIONS.SELECT_EMBLEM_TAB;
        selectedEmblemType: GroupEmblemTypes;
    } |
    {
        type: typeof GROUP_EMBLEM_FORM_ACTIONS.CHANGE_CUSTOM_EMBLEM;
        data: GroupEmblemFormCustomData;
    } |
    {
        type: typeof GROUP_EMBLEM_FORM_ACTIONS.CHANGE_NOMAL_EMBLEM;
        data: GroupEmblemFormNormalData;
    };

export type GroupMembersFormAction = 
    {
        type: typeof GROUP_MEMBERS_FORM_ACTIONS.CHANGE_SEARCH_INPUT;
        changeSearchInput: string;
    } |
    {
        type: typeof GROUP_MEMBERS_FORM_ACTIONS.ADD_MEMBER;
        data: GroupMemberType;
    } |
    {
        type: typeof GROUP_MEMBERS_FORM_ACTIONS.REMOVE_MEMBER;
        userId: number;
    };

export type GroupActionForState<T extends GroupReducerState> =
    T extends GroupBasicFormState 
        ? GroupBasicFormAction 
        : T extends GroupEmblemFormState 
            ? GroupEmblemFormAction 
            : GroupMembersFormAction;

export type GroupFormReducerType<T extends GroupReducerState> = (state: T, action: GroupActionForState<T>) => T;

export type GroupFormTitleTypes = Record<GroupFormTypes, string>;
export const GROUP_FORM_TITLE: Record<LocaleType, GroupFormTitleTypes> = {
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

export const GROUP_FORM_ICON: Record<GroupFormTypes, string> = {
    [GROUP_FORM_TYPE.BASIC]: basicIcon,
    [GROUP_FORM_TYPE.EMBLEM]: emblemIcon,
    [GROUP_FORM_TYPE.MEMBERS]: membersIcon,
    [GROUP_FORM_TYPE.REVIEW]: reviewIcon,
    [GROUP_FORM_TYPE.RESULT]: resultIcon,
};