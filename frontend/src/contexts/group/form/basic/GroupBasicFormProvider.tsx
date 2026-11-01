
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";

import { GROUP_BASIC_ACTION_TYPES, GROUP_BASIC_FORM_ACTIONS, GROUP_VISIBILITY_TYPE } from "@/domains/group/form";
import useGroupFormReducer from "@/hooks/group/form/UseGroupFormReducer";
import usePlan from "@/hooks/plan/UsePlan";

import { getDefaultState, reducer } from "./GroupBasicForm";
import GroupBasicFormContext from "./GroupBasicFormContext";

import type { GroupBasicFormChangeNameHandleType, GroupBasicFormChangeVisibilityHandleType, GroupBasicFormData, GroupBasicFormRadioButtonPlanBenefitData, GroupBasicFormSelectPlanIdHandleType, GroupBasicFormState, GroupVisibilityTypes } from "@/domains/group/form";

const GROUP_VISIBILITY_TYPE_LIST: GroupVisibilityTypes[] = [
    GROUP_VISIBILITY_TYPE.PUBLIC,
    GROUP_VISIBILITY_TYPE.PRIVATE,
    GROUP_VISIBILITY_TYPE.FRIENDS,
] as const;

const GroupBasicFormProvider = ({ children, formData }: { children: ReactNode; formData?: GroupBasicFormData; }) => {
    const { plans, planMetadataList } = usePlan();
    const [state, dispatch] = useGroupFormReducer<GroupBasicFormState>(
        getDefaultState(formData),
        reducer
    );

    const maxOwnedMemberPlanBenefits = useMemo<GroupBasicFormRadioButtonPlanBenefitData[]>(() => {
        return planMetadataList.map(({ planId, planType }) => {
            const { maxOwnedGroupMembers } = plans[planType].benefits;
            return {
                planId,
                value: maxOwnedGroupMembers.value,
            };
        });
    }, [plans, planMetadataList]);

    const maxSubLeaderPlanBenefits = useMemo<GroupBasicFormRadioButtonPlanBenefitData[]>(() => {
        return planMetadataList.map(({ planId, planType }) => {
            const { maxSubLeaders } = plans[planType].benefits;
            return {
                planId,
                value: maxSubLeaders.value,
            };
        });
    }, [plans, planMetadataList]);
    const onChangeName = useCallback<GroupBasicFormChangeNameHandleType>((type, value) => {
        dispatch({ type: GROUP_BASIC_ACTION_TYPES[type], value });
    }, []);

    const onSelectPlanId = useCallback<GroupBasicFormSelectPlanIdHandleType>((type, selectedPlanId) => {
        dispatch({ type: GROUP_BASIC_ACTION_TYPES[type], selectedPlanId });
    }, []);

    const onSelectVisibilityType = useCallback<GroupBasicFormChangeVisibilityHandleType>((visibilityType) => {
        dispatch({ type: GROUP_BASIC_FORM_ACTIONS.CHANGE_VISIBILITY_TYPE, visibilityType });
    }, []);

    const isValidFormData = useCallback(() => state.isValid, [state.isValid]);
    
    const contextValue = useMemo(() => ({
        ...state,
        isValidFormData,
        onChangeName,
        onSelectPlanId,
        onSelectVisibilityType,
        maxOwnedMemberPlanBenefits,
        maxSubLeaderPlanBenefits,
        groupVisibilityTypeList: GROUP_VISIBILITY_TYPE_LIST,
    }), [state, maxOwnedMemberPlanBenefits, maxSubLeaderPlanBenefits, isValidFormData, onChangeName, onSelectPlanId, onSelectVisibilityType]);

    return (
        <GroupBasicFormContext.Provider
            value={ contextValue }
        >
            {
                children
            }
        </GroupBasicFormContext.Provider>
    );

};

export default GroupBasicFormProvider;