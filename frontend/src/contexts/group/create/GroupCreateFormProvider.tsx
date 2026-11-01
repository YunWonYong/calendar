import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { DEFAULT_GROUP_CREATE_FORM_DATA, GroupCreateFlowStepByFormType } from "@/domains/group/create";
import { CHANGE_NAME_TYPE, GROUP_FORM_TYPE, SELECT_PLAN_ID_TYPE } from "@/domains/group/form";
import useGroupCreateFlow from "@/hooks/group/create/UseGroupCreateFlow";
import useGroupBasicForm from "@/hooks/group/form/basic/UseGroupBasicForm";
import GroupPreviewForm from "@/pages/group/create/components/GroupPreviewForm";
import GroupBasicForm from "@/pages/group/form/basic/GroupBasicForm";
import GroupEmblemForm from "@/pages/group/form/emblem/GroupEmblemForm";
import GroupMembersForm from "@/pages/group/form/members/GroupMembersForm";

import GroupCreateFormContext from "./GroupCreateFormContext";

import type { GroupCreateFlowStepTypes, GroupCreateFormData } from "@/domains/group/create";
import type { GroupBasicFormContextType} from "@/domains/group/form";

const GROUP_CREATE_FORM_COMPONENTS = {
    [GroupCreateFlowStepByFormType.BASIC]: GroupBasicForm,
    [GroupCreateFlowStepByFormType.EMBLEM]: GroupEmblemForm,
    [GroupCreateFlowStepByFormType.MEMBERS]: GroupMembersForm,
    [GroupCreateFlowStepByFormType.REVIEW]: GroupPreviewForm

} satisfies Partial<Record<GroupCreateFlowStepTypes, ComponentType>>;

const createBasicFormData = (ctx: GroupBasicFormContextType) => {
    const { formData, groupVisibilityTypeList, maxOwnedMemberPlanBenefits, maxSubLeaderPlanBenefits } = ctx; 
    return {
        fullName: {
            changeNameType: CHANGE_NAME_TYPE.FULL_NAME,
            value: formData.fullName
        },
        shortName: {
            changeNameType: CHANGE_NAME_TYPE.SHORT_NAME,
            value: formData.shortName
        },
        maxOwnedGroupMemberPlanId: {
            selectType: SELECT_PLAN_ID_TYPE.MAX_OWNED_GROUP_MEMBER,
            value: formData.maxOwnedGroupMemberPlanId,
            planBenefits: maxOwnedMemberPlanBenefits
        },
        maxSubLeaderPlanId: {
            selectType: SELECT_PLAN_ID_TYPE.MAX_SUB_LEADER,
            value: formData.maxSubLeaderPlanId,
            planBenefits: maxSubLeaderPlanBenefits,
        },
        visibilityType: {
            value: formData.visibilityType,
            visibilityTypeList: groupVisibilityTypeList,
        },
    }
};

const GroupCreateFormProvider = ({ children }: { children: ReactNode; }) => {
    const basicFormCtx = useGroupBasicForm();
    const [formData, setFormData] = useState<GroupCreateFormData>(DEFAULT_GROUP_CREATE_FORM_DATA);
    const { steps: { current } } = useGroupCreateFlow();
    useEffect(() => {
        if (current !== GroupCreateFlowStepByFormType.REVIEW)  {
            return;
        }

        setFormData({
            [GROUP_FORM_TYPE.BASIC]: createBasicFormData(basicFormCtx)
        });
    }, [current, basicFormCtx]);
    const FormComponent = useMemo<ComponentType | null>(() => {
        return GROUP_CREATE_FORM_COMPONENTS[current] || null;
    }, [current]);

    const value = useMemo(() => {
        return { FormComponent, formData };
    }, [FormComponent, formData]);
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