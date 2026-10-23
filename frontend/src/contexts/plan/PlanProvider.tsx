import type { FC, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { DEFAULT_PLAN_DATA } from "@/domains/plan/planContextType";
import { DEFAULT_PLAN_RESPONSE_BODY_DATA } from "@/domains/plan/planResponseBodyType";
import { PLAN_BENEFITS, PLANS } from "@/domains/plan/planType";
import { isEmpty } from "@/lib/validation/validation";
import { fetchPlans } from "@/server/api";

import PlanContext from "./PlanContext";

import type { PlanBenefitType, PlanMetadata, PlansType } from "@/domains/plan/planContextType";
import type { PlansResponseBody } from "@/domains/plan/planResponseBodyType";
import type { PlanBenefitPropertyNameTypes, PlanBenefitTypes, PlanTypeIds, PlanTypes } from "@/domains/plan/planType";


const setBenefitData = <K extends PlanBenefitPropertyNameTypes>(target: PlanBenefitType, key: K, value: PlanBenefitType[K]) => { 
    target[key] = value;
};

const isValidPlanId = (planId: number, planType: string) => {
    if (isEmpty(planId) || isEmpty(planType)) {
        return false;
    }

    const expectedPlanId = PLANS[planType as PlanTypes];
    return expectedPlanId === planId;
};

const isValidPlanBenefitType = (planBenefitType: string, planBenefitPropertyName: string) => {
    if (isEmpty(planBenefitType) || isEmpty(planBenefitPropertyName)) {
        return false;
    }

    const expectedPlanBenefitPropertyName = PLAN_BENEFITS[planBenefitType as PlanBenefitTypes];
    return expectedPlanBenefitPropertyName === planBenefitPropertyName;
};

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
        const planMetadataList: PlanMetadata[] = metadata.plans
            .filter(({ planId, planType }) => isValidPlanId(planId, planType))
            .map(({ planId, planType }) => {
                return {
                    planId: planId as PlanTypeIds,
                    planType: planType as PlanTypes,
                };
            });
        
        const planBenefitMetadataList = metadata.benefits
            .filter(({ benefitName, benefitPropertyName }) => isValidPlanBenefitType(benefitName, benefitPropertyName))
            .map(({ benefitName, benefitPropertyName, valueType }) => {
                return {
                    benefitName: benefitName as PlanBenefitTypes,
                    benefitPropertyName: benefitPropertyName as PlanBenefitPropertyNameTypes,
                    valueType
                };
            });

        const planDatas: PlansType = {
            ...DEFAULT_PLAN_DATA,
        };

        planMetadataList.forEach(({ planType, planId }) => {
            const planData = plans[planType];

            if (isEmpty(planData)) {
                return;
            }

            planDatas[planType] = {
                ...planDatas[planType],
                planId,
            };

            const { benefits } = planData;
            planBenefitMetadataList.forEach(benefitMetadata => {
                const { benefitPropertyName } = benefitMetadata;
                const benefitData = benefits[benefitPropertyName];

                if (!benefitData) {
                    return;
                }

                setBenefitData(
                    planDatas[planType].benefits,
                    benefitPropertyName,
                    benefitData
                );
            });
        });
        return {
            planMetadataList,
            planBenefitMetadataList,
            plans: planDatas,
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