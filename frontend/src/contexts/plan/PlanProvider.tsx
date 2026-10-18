import type { FC, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { DEFAULT_PLAN_RESPONSE_BODY_DATA } from "@/domains/plan/planType";
import { fetchPlans } from "@/server/api";

import PlanContext from "./PlanContext";

import type { PlansResponseBody } from "@/domains/plan/planType";

const PlanProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PlansResponseBody>(DEFAULT_PLAN_RESPONSE_BODY_DATA);
    useEffect(() => {
        const init = async () => {
            const response = await fetchPlans();
            const { ok } = response;

            if (!ok) {
                throw new Error("[TODO] " + response.errorMessage);
            }

            const { data } = response;
            setData(data);
        }
   
        init();
    }, []);

    const value = useMemo(() => {
        const { metadata, plans } = data;
        return {
            orderedPlanTypes: metadata.plans.map(({ planType }) => planType), 
            orderedPlanBenfitProperties: metadata.benefits.map(({ benefitPropertyName }) => benefitPropertyName), 
            plans
        };
    }, [data]);
    return (
        <PlanContext.Provider 
            value={ value }
        >
            {
                children
            }
        </PlanContext.Provider>
    );
};


export default PlanProvider;