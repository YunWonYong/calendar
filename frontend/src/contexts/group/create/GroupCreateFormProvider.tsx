import type { ComponentType, ReactNode } from "react";
import { useMemo } from "react";

import { GroupCreateFlowStepByFormType, GroupCreateFlowStepTypes } from "@/domains/group/create";
import useGroupCreateFlow from "@/hooks/group/create/UseGroupCreateFlow";
import GroupBasicForm from "@/pages/group/form/basic/GroupBasicForm";
import GroupEmblemForm from "@/pages/group/form/emblem/GroupEmblemForm";
import GroupCreateFormContext from "./GroupCreateFormContext";

const GROUP_CREATE_FORM_COMPONENTS = {
    [GroupCreateFlowStepByFormType.BASIC]: GroupBasicForm,
    [GroupCreateFlowStepByFormType.EMBLEM]: GroupEmblemForm,

} satisfies Partial<Record<GroupCreateFlowStepTypes, ComponentType>>;

const GroupCreateFormProvider = ({ children }: { children: ReactNode; }) => {
    const { steps: { current } } = useGroupCreateFlow();
    const FormComponent = useMemo<ComponentType | null>(() => {
        return GROUP_CREATE_FORM_COMPONENTS[current] || null;
    }, [current]);

    const value = useMemo(() => {
        return { FormComponent };
    }, [FormComponent]);
    return (
        <GroupCreateFormContext.Provider
            value={ value }
        >
            {
                children
            }
        </GroupCreateFormContext.Provider>
    );
};

export default GroupCreateFormProvider;