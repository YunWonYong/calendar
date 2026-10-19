import type { FC, ReactNode } from "react";
import { useCallback, useState } from "react";

import { GroupCreateFlowStepByFormType, type GroupCreateFlowStepTypes } from "@/domains/group/create";

import GroupCreateFlowContext from "./GroupCreateFlowContext";

import type { GroupCreateFlowStepState} from "@/domains/group/create";

const NEXT_STEP: Record<GroupCreateFlowStepTypes, GroupCreateFlowStepTypes | undefined> = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: undefined,
};

const PREVIOUS_STEP: Record<GroupCreateFlowStepTypes, GroupCreateFlowStepTypes | undefined> = {
    0: undefined,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
};

const getSteps = (step: GroupCreateFlowStepTypes) => {
    return {
        previous: PREVIOUS_STEP[step],
        current: step,
        next: NEXT_STEP[step],
    };
};

const GroupCreateFlowProvider: FC<{ children: ReactNode;}> = ({ children }) => {
    const [steps, setSteps] = useState<GroupCreateFlowStepState>(getSteps(GroupCreateFlowStepByFormType.BASIC));

    const nextStep = useCallback(() => {
        setSteps((oldStepState) => {
            if (oldStepState.next !== undefined) {
                return getSteps(oldStepState.next);
            }

            return oldStepState;
        });
    }, []);

    const previousStep = useCallback(() => {
        setSteps((oldStepState) => {
            if (oldStepState.previous !== undefined) {
                return getSteps(oldStepState.previous);
            }

            return oldStepState;
        });
    }, []);
    
    return (
        <GroupCreateFlowContext.Provider
            value={{
                steps,
                nextStep,
                previousStep
            }}
        >
            {
                children
            }
        </GroupCreateFlowContext.Provider>
    );
};

export default GroupCreateFlowProvider;