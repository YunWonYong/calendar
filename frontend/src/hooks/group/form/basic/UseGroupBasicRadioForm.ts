import { useMemo } from "react";

import { GROUP_VISIBILITY_TYPE, SELECT_PLAN_ID_TYPE } from "@/domains/group/form";
import usePlan from "@/hooks/plan/UsePlan";

import useGroupBasicForm from "./UseGroupBasicForm";

import type { GroupFormBasicPlanIdType, GroupFormBasicVisibilityType, GroupVisibilityTypes } from "@/domains/group/form";
import type { PlanTypeIds } from "@/domains/plan/planType";

const useGroupBasicRadioForm = () => {
    const { plans, planMetadataList } = usePlan();
    const ctx = useGroupBasicForm();
    const { formData, onSelectPlanId, onSelectVisibilityType } = ctx;
    const maxOwnedGroupMemberPlanId = useMemo<GroupFormBasicPlanIdType>(() => {
        return {
            selectType: SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER,
            selectedPlanId: formData.maxOwnedGroupMemberPlanId,
            planBenefits: planMetadataList.map(({ planId, planType }) => {
                const { maxOwnedGroupMembers } = plans[planType].benefits;
                return {
                    planId,
                    value: maxOwnedGroupMembers.value,
                };
            }),
            onSelect: (value) => 
                onSelectPlanId(
                    SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER,
                    parseInt(value) as PlanTypeIds
                )
        };
    }, [plans, planMetadataList, formData.maxOwnedGroupMemberPlanId, onSelectPlanId]);
    const maxSubLeaderPlanId = useMemo<GroupFormBasicPlanIdType>(() => {
        return {
            selectType: SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER,
            selectedPlanId: formData.maxSubLeaderPlanId,
            planBenefits: planMetadataList.map(({ planId, planType }) => {
                const { maxSubLeaders } = plans[planType].benefits;
                return {
                    planId,
                    value: maxSubLeaders.value,
                };
            }),
            onSelect: (value) => 
                onSelectPlanId(
                    SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER,
                    parseInt(value) as PlanTypeIds
                )
        };
    }, [plans, planMetadataList, formData.maxSubLeaderPlanId, onSelectPlanId]);
    
    const visibilityTypeList = useMemo(() => {
        return [
            GROUP_VISIBILITY_TYPE.PUBLIC,
            GROUP_VISIBILITY_TYPE.PRIVATE,
            GROUP_VISIBILITY_TYPE.FRIENDS
        ];
    }, []);
    
    const visibilityType = useMemo<GroupFormBasicVisibilityType>(() => {
        return {
            visibilityTypeList,
            selectedVisibilityType: formData.visibilityType,
            onSelect: (value) => onSelectVisibilityType(value as GroupVisibilityTypes),
        };
    }, [formData.visibilityType, onSelectVisibilityType, visibilityTypeList]);

    return {
        maxOwnedGroupMemberPlanId,
        maxSubLeaderPlanId,
        visibilityType
    };
};

export default useGroupBasicRadioForm;