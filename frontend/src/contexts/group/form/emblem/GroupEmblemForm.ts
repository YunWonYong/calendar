import { getRandomBGId } from "@/domains/group/emblemBg";
import { getRandomIconId } from "@/domains/group/emblemIcon";
import { EMBLEM_CUSTOM_FILE_ACCEPTED_TYPES, EMBLEM_CUSTOM_FILE_ERROR_CODES, EMBLEM_CUSTOM_FILE_MAX_SIZE, GROUP_EMBLEM_FORM_ACTIONS, GROUP_EMBLEM_TYPE } from "@/domains/group/form";
import { isNull, isNullOrUndefined } from "@/lib/validation/validation";

import type { EmblemCustomFileErrorCodeType, GroupEmblemFormData, GroupEmblemFormNormalData, GroupEmblemFormState, GroupFormReducerType } from "@/domains/group/form";

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
            
        },
        normal: getDefaultNormalEmblemData()
    };
    const state: GroupEmblemFormState = {
        currentEmblemType: GROUP_EMBLEM_TYPE.NORMAL,
        errorCodes: {},
        oldFormData: defaultFormData,
        formData: defaultFormData,
        isDirty: false,
        isValid: false,
    };

    if (formData) {
        const { type, normal, custom } = formData;

        if (type === GROUP_EMBLEM_TYPE.CUSTOM) {
            state.formData[GROUP_EMBLEM_TYPE.CUSTOM] = custom;
        } else {
            state.formData[GROUP_EMBLEM_TYPE.NORMAL] = normal;
        }

        state.oldFormData = formData;
        state.currentEmblemType = type;
    }

    return state;
}

const validationCustomEmblemFileType = (file?: File): file is File => {
    return !isNullOrUndefined(file) && file instanceof File;
}

const validationCustomEmblemFile = (file: File): EmblemCustomFileErrorCodeType | null => {
    if (!EMBLEM_CUSTOM_FILE_ACCEPTED_TYPES.includes(file.type)) {
        return EMBLEM_CUSTOM_FILE_ERROR_CODES.MISMATCH_FILE_MEDIA_TYPE;
    }

    if (file.size > EMBLEM_CUSTOM_FILE_MAX_SIZE) {
        return EMBLEM_CUSTOM_FILE_ERROR_CODES.OVERFLOW_FILE_SIZE;
    }

    return null;
};

export const reducer: GroupFormReducerType<GroupEmblemFormState> = (state, action) => {
    switch (action.type) {
        case GROUP_EMBLEM_FORM_ACTIONS.CHANGE_CUSTOM_EMBLEM:
            const file = action.data.file;

            if (!validationCustomEmblemFileType(file)) {
                return {
                    ...state,
                    errorCodes: {
                        ...state.errorCodes,
                        [GROUP_EMBLEM_TYPE.CUSTOM]: EMBLEM_CUSTOM_FILE_ERROR_CODES.EMPTY_FILE
                    },
                    [GROUP_EMBLEM_TYPE.CUSTOM]: {
                        url: "",
                        file: undefined
                    }
                };
            }

            const errorCode = validationCustomEmblemFile(file);

            if (!isNull(errorCode)) {
                return {
                    ...state,
                    errorCodes: {
                        ...state.errorCodes,
                        [GROUP_EMBLEM_TYPE.CUSTOM]: errorCode
                    },
                    formData: {
                        ...state.formData,
                        [GROUP_EMBLEM_TYPE.CUSTOM]: {
                            url: "",
                            file: undefined
                        }
                    }
                };
            }

            ;
            return {
                ...state,
                isDirty: true,
                errorCodes: {
                    ...state.errorCodes,
                    [GROUP_EMBLEM_TYPE.CUSTOM]: undefined,
                },
                formData: {
                    ...state.formData,
                    [GROUP_EMBLEM_TYPE.CUSTOM]: {
                        url: "",
                        file
                    }
                }
            };
        case GROUP_EMBLEM_FORM_ACTIONS.CHANGE_NORMAL_EMBLEM:
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
