import { useMemo } from "react";

import { SELECT_PLAN_ID_TYPE } from "@/domains/group/form";

import useGroupBasicForm from "./UseGroupBasicForm";

import type { GroupFormBasicPlanIdType, GroupFormBasicVisibilityType, GroupVisibilityTypes } from "@/domains/group/form";
import type { PlanTypeIds } from "@/domains/plan/planType";

const useGroupBasicRadioForm = () => {
    const ctx = useGroupBasicForm();
    const { formData: { maxOwnedGroupMemberPlanId, maxSubLeaderPlanId }, onSelectPlanId, maxOwnedMemberPlanBenefits, maxSubLeaderPlanBenefits } = ctx;
    const { formData: { visibilityType }, onSelectVisibilityType, groupVisibilityTypeList } = ctx;
    const maxOwnedGroupMemberPlanIdData = useMemo<GroupFormBasicPlanIdType>(() => {
        return {
            selectType: SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER,
            selectedPlanId: maxOwnedGroupMemberPlanId,
            planBenefits: maxOwnedMemberPlanBenefits,
            onSelect: (value) => 
                onSelectPlanId(
                    SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER,
                    parseInt(value) as PlanTypeIds
                )
        };
    }, [maxOwnedMemberPlanBenefits, maxOwnedGroupMemberPlanId, onSelectPlanId]);
    const maxSubLeaderPlanIdData = useMemo<GroupFormBasicPlanIdType>(() => {
        return {
            selectType: SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER,
            selectedPlanId: maxSubLeaderPlanId,
            planBenefits: maxSubLeaderPlanBenefits,
            onSelect: (value) => 
                onSelectPlanId(
                    SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER,
                    parseInt(value) as PlanTypeIds
                )
        };
    }, [maxSubLeaderPlanBenefits, maxSubLeaderPlanId, onSelectPlanId]);
    
    const visibilityTypeData = useMemo<GroupFormBasicVisibilityType>(() => {
        return {
            visibilityTypeList: groupVisibilityTypeList,
            selectedVisibilityType: visibilityType,
            onSelect: (value) => onSelectVisibilityType(value as GroupVisibilityTypes),
        };
    }, [visibilityType, onSelectVisibilityType, groupVisibilityTypeList]);

    return {
        maxOwnedGroupMemberPlanId: maxOwnedGroupMemberPlanIdData,
        maxSubLeaderPlanId: maxSubLeaderPlanIdData,
        visibilityType: visibilityTypeData
    };
};

export default useGroupBasicRadioForm;