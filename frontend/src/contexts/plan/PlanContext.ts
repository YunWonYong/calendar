import { createContext } from "react";

import { DEFAULT_PLANS } from "@/domains/plan/planType";

import type { PlanContextType } from "@/domains/plan/planType";


const PlanContext = createContext<PlanContextType>({
    orderedPlanTypes: [],
    orderedPlanBenfitProperties: [],
    plans: DEFAULT_PLANS
});

export default PlanContext;