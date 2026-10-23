import type { PlanBenefitPropertyNameTypes, PlanBenefitValueDataTypeMap, PlanBenefitValueTypeMap, PlanBenefitValueTypes, PlanTypes } from "./planType";

type PlanMetadata = {
    planId: number;
    planType: string;
};

type PlanBenefitMetadata = {
    benefitName: string;
    benefitPropertyName: string;
    valueType: PlanBenefitValueTypes;
};


type PlanMetadataResponseData = {
    plans: PlanMetadata[];
    benefits: PlanBenefitMetadata[];
};

type PlanBenefitResponseData = {
    [K in PlanBenefitPropertyNameTypes]?: {
        version: number;
        value: PlanBenefitValueDataTypeMap[PlanBenefitValueTypeMap[K]];
    };
};

export type PlanResponseData = {
    id: number;
    price: number;
    benefits: PlanBenefitResponseData;
};

type PlansResponseData = Record<PlanTypes, PlanResponseData>;

export type PlansResponseBody = {
    metadata: PlanMetadataResponseData;
    plans: Record<PlanTypes, PlanResponseData>;
};

export const DEFAULT_METADATA: PlanMetadataResponseData = {
    benefits: [],
    plans: [],
};

export const DEFAULT_PLANS: PlansResponseData = {
    FREE: {
        id: 0,
        price: 0,
        benefits: {}
    },
    BASIC: {
        id: 0,
        price: 0,
        benefits: {}
    },
    PRO: {
        id: 0,
        price: 0,
        benefits: {}
    },
    PREMIUM: {
        id: 0,
        price: 0,
        benefits: {}
    },
    ULTIMATE: {
        id: 0,
        price: 0,
        benefits: {}
    }
};

export const DEFAULT_PLAN_RESPONSE_BODY_DATA: PlansResponseBody = {
    metadata: DEFAULT_METADATA,
    plans: DEFAULT_PLANS,
};
