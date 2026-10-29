import { useContext } from "react";

import PlanContext from "@/contexts/plan/PlanContext";
import NotInitializedError from "@/lib/context/NotInitializedError";

const usePlan = () => {
    const ctx = useContext(PlanContext);

    if (ctx === null) {
        throw new NotInitializedError("PlanContext");
    }
    
    return ctx;
};

export default usePlan;