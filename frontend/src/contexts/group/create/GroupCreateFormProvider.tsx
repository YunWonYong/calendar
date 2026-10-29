import type { ComponentType, ReactNode } from "react";
import { useMemo } from "react";

import { GroupCreateFlowStepByFormType } from "@/domains/group/create";
import useGroupCreateFlow from "@/hooks/group/create/UseGroupCreateFlow";
import GroupBasicForm from "@/pages/group/form/basic/GroupBasicForm";
import GroupEmblemForm from "@/pages/group/form/emblem/GroupEmblemForm";
import GroupMembersForm from "@/pages/group/form/members/GroupMembersForm";

import GroupCreateFormContext from "./GroupCreateFormContext";

import type { GroupCreateFlowStepTypes } from "@/domains/group/create";

const GROUP_CREATE_FORM_COMPONENTS = {
    [GroupCreateFlowStepByFormType.BASIC]: GroupBasicForm,
    [GroupCreateFlowStepByFormType.EMBLEM]: GroupEmblemForm,
    [GroupCreateFlowStepByFormType.MEMBERS]: GroupMembersForm,

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