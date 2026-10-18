import { useContext, useMemo } from "react";

import PlanContext from "@/contexts/plan/PlanContext";
import { PLAN_BENEFITS } from "@/domains/plan/planType";

const usePlan = () => {
    const ctx = useContext(PlanContext);

    const groupMemberLimitCounts = useMemo(() => {
        const subLeaderLimitCounts: number[] = [];
        const ownedGroupMemberLimitCounts: number[] = [];
        ctx.orderedPlanTypes.forEach(( planType ) => {
            const { benefits } = ctx.plans[planType];
            const maxSubLeaders = benefits[PLAN_BENEFITS.MAX_SUB_LEADERS];
            const maxOwnedGroupMembers = benefits[PLAN_BENEFITS.MAX_OWNED_GROUP_MEMBERS];
            subLeaderLimitCounts.push(maxSubLeaders? maxSubLeaders.value as number: 0);
            ownedGroupMemberLimitCounts.push(maxOwnedGroupMembers? maxOwnedGroupMembers.value as number: 0);
        });
        
        return {
            subLeaderLimitCounts,
            ownedGroupMemberLimitCounts
        } as const;
    }, [ctx.plans, ctx.orderedPlanTypes]);

    return {
        ...ctx,
        getGroupMemberLimitCounts: groupMemberLimitCounts
    };
};

export default usePlan;