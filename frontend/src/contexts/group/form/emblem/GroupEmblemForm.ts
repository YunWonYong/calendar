import { getRandomBGId } from "@/domains/group/emblemBg";
import { getRandomIconId } from "@/domains/group/emblemIcon";
import type { GroupEmblemFormData, GroupEmblemFormNormalData, GroupEmblemFormState, GroupFormReducerType } from "@/domains/group/form";
import { GROUP_EMBLEM_FORM_ACTIONS, GROUP_EMBLEM_TYPE } from "@/domains/group/form";

const getDefaultNormalEmblemData = () => {
    const data: GroupEmblemFormNormalData = {
        bgId: getRandomBGId(),
        iconId: getRandomIconId(),
    };

    return data;
}

export const getDefaultState = (formData?: GroupEmblemFormData) => {
    const defaultFormData = {
        type: GROUP_EMBLEM_TYPE.NORMAL,
        custom: {
            base64: "",
            byte: 0,
            extension: ""
        },
        normal: getDefaultNormalEmblemData()
    };
    const state: GroupEmblemFormState = {
        currentEmblemType: GROUP_EMBLEM_TYPE.NORMAL,
        errorMessages: {
            [GROUP_EMBLEM_TYPE.CUSTOM]: "",
            [GROUP_EMBLEM_TYPE.NORMAL]: "",
        },
        oldFormData: defaultFormData,
        formData: defaultFormData,
        isDirty: false,
        isValid: false,
    };

    if (formData) {
        const { type, normal, custom } = formData;
        if (type === GROUP_EMBLEM_TYPE.CUSTOM) {
            state.formData.type = GROUP_EMBLEM_TYPE.CUSTOM;
            state.formData[GROUP_EMBLEM_TYPE.CUSTOM] = custom;
        } else {
            state.formData[GROUP_EMBLEM_TYPE.NORMAL] = normal;
        }

        state.oldFormData = formData;
    }
    return state;
}

export const reducer: GroupFormReducerType<GroupEmblemFormState> = (state, action) => {
    switch(action.type) {
        case GROUP_EMBLEM_FORM_ACTIONS.CHANGE_CUSTOM_EMBLEM:
            return {
                ...state,
                isDirty: true,
                formData: {
                    ...state.formData,
                    [GROUP_EMBLEM_TYPE.CUSTOM]: action.data
                }
            };
        case GROUP_EMBLEM_FORM_ACTIONS.CHANGE_NOMAL_EMBLEM:
            return {
                ...state,
                isDirty: true,
                formData: {
                    ...state.formData,
                    [GROUP_EMBLEM_TYPE.NORMAL]: action.data
                }
            };
        case GROUP_EMBLEM_FORM_ACTIONS.SELECT_EMBLEM_TAB:
            if (state.currentEmblemType === action.selectedEmblemType) {
                return state;
            }
            return {
                ...state,
                currentEmblemType: action.selectedEmblemType,
                formData: {
                    ...state.formData,
                    type: action.selectedEmblemType,
                },
                isDirty: true,
            };
    }
};
