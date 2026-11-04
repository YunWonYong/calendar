import type { ComponentType, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getGroupEmblemId } from "@/components/group/GroupEmblem";
import { DEFAULT_GROUP_CREATE_FORM_DATA, GroupCreateFlowStepByFormType } from "@/domains/group/create";
import { CHANGE_NAME_TYPE, GROUP_EMBLEM_TYPE, GROUP_FORM_TYPE, SELECT_PLAN_ID_TYPE } from "@/domains/group/form";
import useGroupCreateFlow from "@/hooks/group/create/UseGroupCreateFlow";
import useGroupBasicForm from "@/hooks/group/form/basic/UseGroupBasicForm";
import useGroupEmblemForm from "@/hooks/group/form/emblem/UseGroupEmblemForm";
import GroupPreviewForm from "@/pages/group/create/components/GroupPreviewForm";
import GroupBasicForm from "@/pages/group/form/basic/GroupBasicForm";
import GroupEmblemForm from "@/pages/group/form/emblem/GroupEmblemForm";
import GroupMembersForm from "@/pages/group/form/members/GroupMembersForm";
import { createGroup } from "@/server/api";

import GroupCreateFormContext from "./GroupCreateFormContext";

import type { GroupCreateBasicFormData, GroupCreateEmblemFormData, GroupCreateFlowStepTypes, GroupCreateFormData } from "@/domains/group/create";
import type { GroupBasicFormContextType, GroupEmblemFormContextType } from "@/domains/group/form";

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

const createEmblemFormData = (ctx: GroupEmblemFormContextType) => {
    const { currentEmblemType, formData: { custom, normal } } = ctx;

    if (currentEmblemType === GROUP_EMBLEM_TYPE.CUSTOM) {
        return {
            type: GROUP_EMBLEM_TYPE.CUSTOM,
            file: custom.file
        };
    }

    return {
        type: GROUP_EMBLEM_TYPE.NORMAL,
        id: getGroupEmblemId({ bgId: normal.bgId, iconId: normal.iconId }),
    };
};

const getBlobBodyData = (obj: object) => {
    return new Blob(
        [
            JSON.stringify(obj)
        ],
        {
            type: "application/json"
        }
    );
};

const setBasicBodyData = (body: FormData, formData: GroupCreateBasicFormData) => {
    body.append(
        "basic",
        getBlobBodyData(
            {
                fullName: formData.fullName.value,
                shortName: formData.shortName.value,
                maxOwnedGroupMemberPlanId: formData.maxOwnedGroupMemberPlanId.value,
                maxSubLeaderPlanId: formData.maxSubLeaderPlanId.value,
                visibilityType: formData.visibilityType.value,
            }
        )
    );
};

const setEmblemBodyData = (body: FormData, formData: GroupCreateEmblemFormData) => {
    if (formData.type === "custom") {
        body.append(
            "emblem",
            getBlobBodyData(
                {
                    type: formData.type,
                }
            )
        );

        body.append(
            "emblemFile",
            formData.file,
        );
        return;
    }

    body.append(
        "emblem",
        getBlobBodyData(
            {
                type: formData.type,
                id: formData.id,
            }
        )
    );
};

const GroupCreateFormProvider = ({ children }: { children: ReactNode; }) => {
    const basicFormCtx = useGroupBasicForm();
    const emblemFormCtx = useGroupEmblemForm();
    const [formData, setFormData] = useState<GroupCreateFormData>(DEFAULT_GROUP_CREATE_FORM_DATA);
    const { steps: { current } } = useGroupCreateFlow();
    useEffect(() => {
        if (current !== GroupCreateFlowStepByFormType.REVIEW)  {
            return;
        }

        setFormData({
            [GROUP_FORM_TYPE.BASIC]: createBasicFormData(basicFormCtx),
            [GROUP_FORM_TYPE.EMBLEM]: createEmblemFormData(emblemFormCtx),
        });
    }, [current, basicFormCtx, emblemFormCtx]);
    const FormComponent = useMemo<ComponentType | null>(() => {
        return GROUP_CREATE_FORM_COMPONENTS[current] || null;
    }, [current]);

    const isValidFormData = useMemo(() => {
        switch (current) {
            case GroupCreateFlowStepByFormType.BASIC:
                return basicFormCtx.isValidFormData();
            case GroupCreateFlowStepByFormType.EMBLEM:
                return emblemFormCtx.isValidFormData();
            case GroupCreateFlowStepByFormType.MEMBERS:
                return true;
            case GroupCreateFlowStepByFormType.REVIEW:
                return basicFormCtx.isValidFormData() && emblemFormCtx.isValidFormData();
            default:
                throw new Error("NOT SUPPORTED STEP.");
        }
    }, [current, basicFormCtx, emblemFormCtx]);

    const submit = useCallback(async () => {
        if (current !== GroupCreateFlowStepByFormType.REVIEW || !isValidFormData) {
            return;
        }

        const body = new FormData();
        setBasicBodyData(body, formData.BASIC);
        setEmblemBodyData(body, formData.EMBLEM);
        await createGroup(body);

        // [TODO] 성공 시 success step으로 이동하고 실패하면 modal로 실패 여부를 출력.
    }, [current, isValidFormData, formData]);

    const value = useMemo(() => {
        return { FormComponent, formData, submit, isValidFormData };
    }, [FormComponent, formData, submit, isValidFormData]);
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