
import type { ChangeEvent } from "react";

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
    oldFormData?: T;
    formData: T;
    isValid: boolean;
    isDirty: boolean;
};

export type GroupBasicFormData = {
    fullName: string;
    shortName: string;
    maxSubLeaderPlanId: PlanTypeIds;
    maxOwnedGroupMemberPlanId: PlanTypeIds;
    visibilityType: GroupVisibilityTypes;
};

export const GROUP_VISIBILITY_TYPE = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    FRIENDS: "FRIENDS",
} as const;
export type GroupVisibilityTypes = keyof typeof GROUP_VISIBILITY_TYPE;

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
export type GroupBasicFormChangeVisibilityHandleType = (visibilityType: GroupVisibilityTypes) => void;
export type GroupBasicFormContextType = {
    errorCodes: Record<GroupBasicFormChangeNameTypes, string>;
    onChangeName: GroupBasicFormChangeNameHandleType;
    onSelectPlanId: GroupBasicFormSelectPlanIdHandleType;
    onSelectVisibilityType: GroupBasicFormChangeVisibilityHandleType;
} & GroupFormContextType<GroupBasicFormData>;

export type GroupBasicFormState = {
    errorCodes: Record<GroupBasicFormChangeNameTypes, string>;
} & GroupFormState<GroupBasicFormData>;

export const DEFAULT_GROUP_BASIC_FORM_STATE: GroupBasicFormState = {
    formData: {
        fullName: "",
        shortName: "",
        maxOwnedGroupMemberPlanId: PLANS.FREE,
        maxSubLeaderPlanId: PLANS.FREE,
        visibilityType: GROUP_VISIBILITY_TYPE.PUBLIC
    },
    errorCodes: {
        fullName: "",
        shortName: ""
    },
    isValid: false,
    isDirty: false,
}

export const GROUP_EMBLEM_TYPE = {
    CUSTOM: "custom",
    NORMAL: "normal"
} as const;

export type GroupEmblemTypes = typeof GROUP_EMBLEM_TYPE[keyof typeof GROUP_EMBLEM_TYPE];

export type GroupEmblemFormCustomData = {
    url?: string;
    file?: File;
};

export type GroupEmblemFormNormalData = {
    bgId: BGId;
    iconId: IconId;
};

export type GroupEmblemFormData = {
    type: GroupEmblemTypes;
    [GROUP_EMBLEM_TYPE.CUSTOM]: GroupEmblemFormCustomData;
    [GROUP_EMBLEM_TYPE.NORMAL]: GroupEmblemFormNormalData;
};

export type GroupEmblemErrorCodeType = {
    [GROUP_EMBLEM_TYPE.CUSTOM]?: EmblemCustomFileErrorCodeType;
    [GROUP_EMBLEM_TYPE.NORMAL]?: string;
};

export type GroupEmblemFormState = {
    errorCodes: GroupEmblemErrorCodeType;
    currentEmblemType: GroupEmblemTypes;
} & GroupFormState<GroupEmblemFormData>;

type SaveEmblemParams = 
    { type: typeof GROUP_EMBLEM_TYPE.CUSTOM; data: GroupEmblemFormCustomData; } |
    { type: typeof GROUP_EMBLEM_TYPE.NORMAL; data: GroupEmblemFormNormalData; };
    
export type GroupEmblemFormContextType = {
    errorCodes: GroupEmblemErrorCodeType;
    currentEmblemType: GroupEmblemTypes;
    onChangeEmblemType: (changeType: GroupEmblemTypes) => void;
    saveEmblem: (param: SaveEmblemParams) => void;
} & GroupFormContextType<GroupEmblemFormData>;

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
    CHANGE_VISIBILITY_TYPE: "CHANGE_VISIBILITY_TYPE"
} as const;

export const GROUP_BASIC_ACTION_TYPES = {
    [CHANGE_NAME_TYPE.FULL_NAME]: GROUP_BASIC_FORM_ACTIONS.CHANGE_FULL_NAME,
    [CHANGE_NAME_TYPE.SHORT_NAME]: GROUP_BASIC_FORM_ACTIONS.CHANGE_SHORT_NAME,
    [SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER]: GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_SUB_LEADER_PLAN_ID,
    [SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER]: GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_OWNED_GROUP_MEMBER_PLAN_ID,
    [typeof GROUP_BASIC_FORM_ACTIONS.CHANGE_VISIBILITY_TYPE]: GROUP_BASIC_FORM_ACTIONS.CHANGE_VISIBILITY_TYPE
} as const;

export type GroupBasicFormActionType = typeof GROUP_BASIC_FORM_ACTIONS[keyof typeof GROUP_BASIC_FORM_ACTIONS];

export const GROUP_EMBLEM_FORM_ACTIONS = {
    SELECT_EMBLEM_TAB: "SELECT_EMBLEM_TAB",
    CHANGE_NORMAL_EMBLEM: "CHANGE_NORMAL_EMBLEM",
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
    } |
    {
        type: typeof GROUP_BASIC_FORM_ACTIONS.CHANGE_VISIBILITY_TYPE,
        visibilityType: GroupVisibilityTypes;
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
        type: typeof GROUP_EMBLEM_FORM_ACTIONS.CHANGE_NORMAL_EMBLEM;
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

export type GroupFormBasicNameType = {
    changeNameType: GroupBasicFormChangeNameTypes;
    value: string;
    errorMessage: string;
    isError: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
};

export type GroupFormBasicPlanBenefitType = {
    planId: PlanTypeIds;
    value: number;
};

export type GroupFormBasicPlanIdType = {
    selectType: GroupBasicFormSelectPlanIdTypes;
    selectedPlanId: PlanTypeIds;
    planBenefits: GroupFormBasicPlanBenefitType[];
    onSelect: (value: string) => void;
};

export type GroupFormBasicVisibilityType = {
    visibilityTypeList: GroupVisibilityTypes[];
    selectedVisibilityType: GroupVisibilityTypes;
    onSelect: (value: string) => void;
};

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

export type GroupFormNameInputTextType = {
    LABEL: string;
    PLACEHOLDER: string;
    DESCRIPTION: string;
};

export const GROUP_FORM_NAME_INPUT: Record<LocaleType, Record<GroupBasicFormChangeNameTypes, GroupFormNameInputTextType>> = {
    [LOCALE.KR]: {
        [CHANGE_NAME_TYPE.FULL_NAME]: {
            LABEL: "그룹 이름",
            PLACEHOLDER: "예: 러닝을 사랑하는 모임",
            DESCRIPTION: "최소 2글자 최대 18글자 입력해주세요."
        },
        [CHANGE_NAME_TYPE.SHORT_NAME]: {
            LABEL: "그룹 닉네임",
            PLACEHOLDER: "예: 러너스",
            DESCRIPTION: "최소 2글자 최대 6글자 입력해주세요."
        },
    },
    [LOCALE.EN]: {
        [CHANGE_NAME_TYPE.FULL_NAME]: {
            LABEL: "Group Name",
            PLACEHOLDER: "e.g. Running Enthusiasts",
            DESCRIPTION: "Enter 2–18 characters."
        },
        [CHANGE_NAME_TYPE.SHORT_NAME]: {
            LABEL: "Group Nickname",
            PLACEHOLDER: "e.g. Runners",
            DESCRIPTION: "Enter 2–6 characters."
        }
    },
    [LOCALE.ZH]: {
        [CHANGE_NAME_TYPE.FULL_NAME]: {
            LABEL: "群组名称",
            PLACEHOLDER: "例如：热爱跑步的伙伴",
            DESCRIPTION: "请输入 2～18 个字符。"
        },
        [CHANGE_NAME_TYPE.SHORT_NAME]: {
            LABEL: "群组昵称",
            PLACEHOLDER: "例如：跑者联盟",
            DESCRIPTION: "请输入 2～6 个字符。"
        }
    },
    [LOCALE.JP]: {
        [CHANGE_NAME_TYPE.FULL_NAME]: {
            LABEL: "グループ名",
            PLACEHOLDER: "例：ランニング好きの集まり",
            DESCRIPTION: "2〜18文字で入力してください。"
        },
        [CHANGE_NAME_TYPE.SHORT_NAME]: {
            LABEL: "グループのニックネーム",
            PLACEHOLDER: "例：ランナーズ",
            DESCRIPTION: "2〜6文字で入力してください。"
        }
    },
} as const;


export type GroupFormPlanIdRadioBoxTextType = {
    LABEL: string;
    UNIT: string;
};

export const GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT: Record<LocaleType, Record<GroupBasicFormSelectPlanIdTypes, GroupFormPlanIdRadioBoxTextType>> = {
    [LOCALE.KR]: {
        [SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER]: {
            LABEL: "그룹 참가 인원 선택",
            UNIT: "명",
        },
        [SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER]: {
            LABEL: "부그룹장 인원 선택",
            UNIT: "명",
        },
    },
    [LOCALE.EN]: {
        [SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER]: {
            LABEL: "Select group member capacity",
            UNIT: "p",
        },
        [SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER]: {
            LABEL: "Select sub-leader capacity",
            UNIT: "p",
        },
    },
    [LOCALE.ZH]: {
        [SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER]: {
            LABEL: "选择群组成员人数",
            UNIT: "人",
        },
        [SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER]: {
            LABEL: "选择副群主人数",
            UNIT: "人",
        },
    },
    [LOCALE.JP]: {
        [SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER]: {
            LABEL: "グループ参加メンバー数を選択",
            UNIT: "名",
        },
        [SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER]: {
            LABEL: "サブリーダー数を選択",
            UNIT: "名",
        },
    },
};

export const GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TITLE: Record<LocaleType, string> = {
    [LOCALE.KR]: "그룹 공개 범위 선택",
    [LOCALE.EN]: "Select group visibility",
    [LOCALE.ZH]: "选择群组公开范围",
    [LOCALE.JP]: "グループの公開範囲を選択",
};

export const GROUP_FORM_VISIBILITY_TYPE_RADIO_INFO_TEXT: Record<LocaleType, string> = {
    [LOCALE.KR]: "그룹의 검색 가능 범위입니다. 친구 공개는 그룹장과 친구인 사용자에게만 검색됩니다.",
    [LOCALE.EN]: "This sets the group's search visibility. 'Friends only' means it is searchable only by users who are friends with the group owner.",
    [LOCALE.ZH]: "此为群组的可搜索范围。“仅好友可见”表示仅对与群主互为好友的用户显示。",
    [LOCALE.JP]: "グループの検索可能範囲です。「友達のみ」はグループのオーナーと友達であるユーザーにのみ検索されます。",
};

export const GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TEXT: Record<LocaleType, Record<GroupVisibilityTypes, string>> = {
    [LOCALE.KR]: {
        [GROUP_VISIBILITY_TYPE.PUBLIC]: "공개",
        [GROUP_VISIBILITY_TYPE.PRIVATE]: "비공개",
        [GROUP_VISIBILITY_TYPE.FRIENDS]: "친구 공개",
    },
    [LOCALE.EN]: {
        [GROUP_VISIBILITY_TYPE.PUBLIC]: "Public",
        [GROUP_VISIBILITY_TYPE.PRIVATE]: "Private",
        [GROUP_VISIBILITY_TYPE.FRIENDS]: "Friends only",
    },
    [LOCALE.ZH]: {
        [GROUP_VISIBILITY_TYPE.PUBLIC]: "公开",
        [GROUP_VISIBILITY_TYPE.PRIVATE]: "不公开",
        [GROUP_VISIBILITY_TYPE.FRIENDS]: "仅好友可见",
    },
    [LOCALE.JP]: {
        [GROUP_VISIBILITY_TYPE.PUBLIC]: "公開",
        [GROUP_VISIBILITY_TYPE.PRIVATE]: "非公開",
        [GROUP_VISIBILITY_TYPE.FRIENDS]: "友達のみ",
    },
};

export const GROUP_FORM_EMBLEM_HEADER_TEXT: Record<LocaleType, Record<GroupEmblemTypes, string>> = {
    [LOCALE.KR]: {
        [GROUP_EMBLEM_TYPE.NORMAL]: "기본 엠블럼",
        [GROUP_EMBLEM_TYPE.CUSTOM]: "개인 엠블럼",
    },
    [LOCALE.EN]: {
        [GROUP_EMBLEM_TYPE.NORMAL]: "Basic Emblem",
        [GROUP_EMBLEM_TYPE.CUSTOM]: "Personal Emblem",
    },
    [LOCALE.ZH]: {
        [GROUP_EMBLEM_TYPE.NORMAL]: "預設徽章",
        [GROUP_EMBLEM_TYPE.CUSTOM]: "自訂徽章",
    },
    [LOCALE.JP]: {
        [GROUP_EMBLEM_TYPE.NORMAL]: "基本エンブレム",
        [GROUP_EMBLEM_TYPE.CUSTOM]: "個人エンブレム",
    }
};

export const EMBLEM_CUSTOM_FILE_ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const EMBLEM_CUSTOM_FILE_MAX_SIZE =  1 * 1024 * 1024;

export const EMBLEM_CUSTOM_FILE_ERROR_CODES = {
    EMPTY_FILE: "EMPTY_FILE",
    MISMATCH_FILE_MEDIA_TYPE: "MISMATCH_FILE_MEDIA_TYPE",
    OVERFLOW_FILE_SIZE: "OVERFLOW_FILE_SIZE"
} as const;

export type EmblemCustomFileErrorCodeType = keyof typeof EMBLEM_CUSTOM_FILE_ERROR_CODES;

const MAX_FILE_SIZE_MB = EMBLEM_CUSTOM_FILE_MAX_SIZE / (1024 * 1024);
const ACCEPTED_FILE_TYPES_MESSAGE = EMBLEM_CUSTOM_FILE_ACCEPTED_TYPES
    .map((type) => type.split("/")[1].toUpperCase())
    .join(", ");

export const EMBLEM_CUSTOM_FILE_ERROR_MESSAGES: Record<LocaleType, Record<EmblemCustomFileErrorCodeType, string>> = {
    [LOCALE.KR]: {
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.EMPTY_FILE]: "이미지 파일을 선택해주세요.",
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.MISMATCH_FILE_MEDIA_TYPE]: `${ACCEPTED_FILE_TYPES_MESSAGE} 형식의 이미지만 업로드할 수 있습니다.`,
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.OVERFLOW_FILE_SIZE]: `이미지 파일은 최대 ${MAX_FILE_SIZE_MB}MB까지 업로드할 수 있습니다.`,
    },
    [LOCALE.EN]: {
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.EMPTY_FILE]: "Please select an image file.",
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.MISMATCH_FILE_MEDIA_TYPE]: `Only ${ACCEPTED_FILE_TYPES_MESSAGE} image formats are supported.`,
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.OVERFLOW_FILE_SIZE]: `The image file size must not exceed ${MAX_FILE_SIZE_MB} MB.`,
    },
    [LOCALE.ZH]: {
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.EMPTY_FILE]: "请选择图片文件。",
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.MISMATCH_FILE_MEDIA_TYPE]: `仅支持 ${ACCEPTED_FILE_TYPES_MESSAGE} 格式的图片。`,
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.OVERFLOW_FILE_SIZE]: `图片文件大小不能超过 ${MAX_FILE_SIZE_MB} MB。`,
    },
    [LOCALE.JP]: {
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.EMPTY_FILE]: "画像ファイルを選択してください。",
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.MISMATCH_FILE_MEDIA_TYPE]: `${ACCEPTED_FILE_TYPES_MESSAGE}形式の画像のみアップロードできます。`,
        [EMBLEM_CUSTOM_FILE_ERROR_CODES.OVERFLOW_FILE_SIZE]: `画像ファイルのサイズは${MAX_FILE_SIZE_MB}MB以下にしてください。`,
    },
};

type EmblemCustomFileDropZoneTextType = {
    TITLE: string;
    SEPARATOR: string;
};

export const EMBLEM_CUSTOM_FILE_DROP_ZONE_TEXT: Record<LocaleType, EmblemCustomFileDropZoneTextType> = {
    [LOCALE.KR]: {
        TITLE: "이미지 파일을 여기에 끌어 놓으세요.",
        SEPARATOR: "또는",
    },
    [LOCALE.EN]: {
        TITLE: "Drag and drop an image file here.",
        SEPARATOR: "or",
    },
    [LOCALE.ZH]: {
        TITLE: "将图片文件拖放到此处。",
        SEPARATOR: "或",
    },
    [LOCALE.JP]: {
        TITLE: "画像ファイルをここにドラッグ＆ドロップしてください。",
        SEPARATOR: "または",
    },
};

type EmblemCustomFileUploadButtonTextType = {
    LABEL: string;
    LABEL_MODIFY: string;
    DESCRIPTION: string;
};

export const EMBLEM_CUSTOM_FILE_UPLOAD_BUTTON_TEXT: Record<LocaleType, EmblemCustomFileUploadButtonTextType> = {
    [LOCALE.KR]: {
        LABEL: "이미지 선택",
        LABEL_MODIFY: "이미지 수정",
        DESCRIPTION: `${ACCEPTED_FILE_TYPES_MESSAGE} 형식의 이미지 파일을 선택해주세요. (최대 ${MAX_FILE_SIZE_MB}MB)`,
    },
    [LOCALE.EN]: {
        LABEL: "Choose Image",
        LABEL_MODIFY: "Change Image",
        DESCRIPTION: `Please select an image file in ${ACCEPTED_FILE_TYPES_MESSAGE} format. (Max ${MAX_FILE_SIZE_MB}MB)`,
    },
    [LOCALE.ZH]: {
        LABEL: "选择图片",
        LABEL_MODIFY: "更换图片",
        DESCRIPTION: `请选择 ${ACCEPTED_FILE_TYPES_MESSAGE} 格式的图片文件。（最大 ${MAX_FILE_SIZE_MB}MB）`,
    },
    [LOCALE.JP]: {
        LABEL: "画像を選択",
        LABEL_MODIFY: "画像を変更",
        DESCRIPTION: `${ACCEPTED_FILE_TYPES_MESSAGE} 形式の画像ファイルを選択してください。（最大 ${MAX_FILE_SIZE_MB}MB）`,
    },
};

type EmblemCustomFilePreviewTextType = {
    TITLE: string;
    DESCRIPTION: string;
    DESCRIPTION_MODIFY: string;
    PREVIEW_IMAGE_ALT: string;
    EMPTY_PREVIEW_ICON: string;
};

export const EMBLEM_CUSTOM_FILE_PREVIEW_TEXT: Record<LocaleType, EmblemCustomFilePreviewTextType> = {
    [LOCALE.KR]: {
        TITLE: "파일 이미지 미리보기",
        DESCRIPTION: "이미지 파일을 선택해주세요.",
        DESCRIPTION_MODIFY: "이미지 수정 버튼으로 수정할 수 있습니다.",
        PREVIEW_IMAGE_ALT: "그룹 커스텀 엠블럼 미리보기",
        EMPTY_PREVIEW_ICON: "이미지를 선택해주세요",
    },
    [LOCALE.EN]: {
        TITLE: "Image Preview",
        DESCRIPTION: "Please select an image file.",
        DESCRIPTION_MODIFY: "You can change the image using the Change Image button.",
        PREVIEW_IMAGE_ALT: "Group custom emblem preview",
        EMPTY_PREVIEW_ICON: "Select an image",
    },
    [LOCALE.ZH]: {
        TITLE: "图片预览",
        DESCRIPTION: "请选择图片文件。",
        DESCRIPTION_MODIFY: "您可以点击“更换图片”按钮来更换图片。",
        PREVIEW_IMAGE_ALT: "群组自定义徽章预览",
        EMPTY_PREVIEW_ICON: "请选择图片",
    },
    [LOCALE.JP]: {
        TITLE: "画像プレビュー",
        DESCRIPTION: "画像ファイルを選択してください。",
        DESCRIPTION_MODIFY: "「画像を変更」ボタンから画像を変更できます。",
        PREVIEW_IMAGE_ALT: "グループのカスタムエンブレムのプレビュー",
        EMPTY_PREVIEW_ICON: "画像を選択してください",
    },
};

type EmblemNormalPreviewTextType = {
    TITLE: string;
    DESCRIPTION: string;
};

export const EMBLEM_NORMAL_PREVIEW_TEXT: Record<LocaleType, EmblemNormalPreviewTextType> = {
    [LOCALE.KR]: {
        TITLE: "엠블럼 미리보기",
        DESCRIPTION: "선택한 디자인이 이렇게 표시됩니다.",
    },
    [LOCALE.EN]: {
        TITLE: "Emblem Preview",
        DESCRIPTION: "This is how your selected design will look.",
    },
    [LOCALE.ZH]: {
        TITLE: "徽章预览",
        DESCRIPTION: "您选择的设计将显示为以下效果。",
    },
    [LOCALE.JP]: {
        TITLE: "エンブレムのプレビュー",
        DESCRIPTION: "選択したデザインはこのように表示されます。",
    },
};
