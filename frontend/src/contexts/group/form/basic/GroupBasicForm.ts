import { DEFAULT_GROUP_BASIC_FORM_STATE, GROUP_BASIC_FORM_ACTIONS } from "@/domains/group/form";

import type { GroupBasicFormData, GroupBasicFormState, GroupFormReducerType } from "@/domains/group/form";

export const getDefaultState = (formData?: GroupBasicFormData) => {
    const state: GroupBasicFormState = { 
        ...DEFAULT_GROUP_BASIC_FORM_STATE, 
        formData: { ...DEFAULT_GROUP_BASIC_FORM_STATE.formData },
        errorCodes: { ...DEFAULT_GROUP_BASIC_FORM_STATE.errorCodes }
    };

    if (formData) {
        state.oldFormData = formData;
        state.formData = formData;
    }

    return state;
};

export const reducer: GroupFormReducerType<GroupBasicFormState> = (state, action) => {
    switch (action.type) {
        case GROUP_BASIC_FORM_ACTIONS.CHANGE_FULL_NAME:
            return {
                ...state,
                isDirty: state.oldFormData
                    ?   state.oldFormData.fullName !== action.value
                    :   true,
                formData: {
                    ...state.formData,
                    fullName: action.value,
                }
            };
        case GROUP_BASIC_FORM_ACTIONS.CHANGE_SHORT_NAME:
            return {
                ...state,
                isDirty: state.oldFormData
                    ?   state.oldFormData.shortName !== action.value
                    :   true,
                formData: {
                    ...state.formData,
                    shortName: action.value,
                }
            };
        case GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_OWNED_GROUP_MEMBER_PLAN_ID:
            return {
                ...state,
                isDirty: state.oldFormData
                    ?   state.oldFormData.maxOwnedGroupMemberPlanId !== action.selectedPlanId
                    :   true,
                formData: {
                    ...state.formData,
                    maxOwnedGroupMemberPlanId: action.selectedPlanId,
                }
            };
        case GROUP_BASIC_FORM_ACTIONS.SELECT_MAX_SUB_LEADER_PLAN_ID:
            return {
                ...state,
                isDirty: state.oldFormData
                    ?   state.oldFormData.maxSubLeaderPlanId !== action.selectedPlanId
                    :   true,
                formData: {
                    ...state.formData,
                    maxSubLeaderPlanId: action.selectedPlanId,
                }
            };
    }
};