import { createContext } from "react";

import type { PlanContextType } from "@/domains/plan/planContextType";


const PlanContext = createContext<PlanContextType | null>(null);

export default PlanContext;