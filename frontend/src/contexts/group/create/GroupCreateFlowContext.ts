import { createContext } from "react";

import NotInitializedError from "@/lib/context/NotInitializedError";

import type { GroupCreateFlowContextType } from "@/domains/group/create";

const errFn = () => { throw new NotInitializedError("GroupCreateFlowContext"); };

const GroupCreateFlowContext = createContext<GroupCreateFlowContextType>({
    steps: { current: 0 },
    nextStep: errFn,
    previousStep: errFn,
});

export default GroupCreateFlowContext;