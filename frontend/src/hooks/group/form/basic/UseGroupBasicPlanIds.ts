import { useMemo } from "react";

import { SELECT_PLAN_ID_TYPE } from "@/domains/group/form";
import usePlan from "@/hooks/plan/UsePlan";

import useGroupBasicForm from "./UseGroupBasicForm";

import type { GroupFormBasicPlanIdType } from "@/domains/group/form";
import type { PlanTypeIds } from "@/domains/plan/planType";

const useGroupBasicPlanIds = () => {
    const { plans, planMetadataList } = usePlan();
    const ctx = useGroupBasicForm();
    const { formData, onSelectPlanId } = ctx;
    const maxOwnedGroupMemberPlanId = useMemo<GroupFormBasicPlanIdType>(() => {
        return {
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
            selectedPlanId: formData.maxSubLeaderPlanId,
            planBenefits: planMetadataList.map(({ planId, planType }) => {
                const { maxOwnedGroupMembers } = plans[planType].benefits;
                return {
                    planId,
                    value: maxOwnedGroupMembers.value,
                };
            }),
            onSelect: (value) => 
                onSelectPlanId(
                    SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER,
                    parseInt(value) as PlanTypeIds
                )
        };
    }, [plans, planMetadataList, formData.maxSubLeaderPlanId, onSelectPlanId]);
    return {
        maxOwnedGroupMemberPlanId,
        maxSubLeaderPlanId
    };
};

export default useGroupBasicPlanIds;