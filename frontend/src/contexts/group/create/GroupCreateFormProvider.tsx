import type { ComponentType, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getGroupEmblemId } from "@/components/group/GroupEmblem";
import { DEFAULT_GROUP_CREATE_FORM_DATA, GroupCreateFlowStepByFormType } from "@/domains/group/create";
import { CHANGE_NAME_TYPE, GROUP_EMBLEM_TYPE, GROUP_FORM_TYPE, SELECT_PLAN_ID_TYPE } from "@/domains/group/form";
import { GROUP_MEMBER_MANIPULATION_TYPES } from "@/domains/group/member";
import { ERROR_MOTION_TYPE } from "@/domains/server/useServerAPIType";
import useGroupCreateFlow from "@/hooks/group/create/UseGroupCreateFlow";
import useGroupBasicForm from "@/hooks/group/form/basic/UseGroupBasicForm";
import useGroupEmblemForm from "@/hooks/group/form/emblem/UseGroupEmblemForm";
import useGroupMembersForm from "@/hooks/group/form/member/UseGroupMembersForm";
import useServerApi from "@/hooks/server/UseServerAPI";
import GroupCreateErrorModalContent from "@/pages/group/create/components/GroupCreateErrorModalContent";
import GroupPreviewForm from "@/pages/group/create/components/GroupPreviewForm";
import GroupBasicForm from "@/pages/group/form/basic/GroupBasicForm";
import GroupEmblemForm from "@/pages/group/form/emblem/GroupEmblemForm";
import GroupMembersForm from "@/pages/group/form/members/GroupMembersForm";
import { createGroup } from "@/server/api";

import GroupCreateFormContext from "./GroupCreateFormContext";

import type { GroupCreateBasicFormData, GroupCreateEmblemFormData, GroupCreateFlowStepTypes, GroupCreateFormData, GroupCreateMembersFormData } from "@/domains/group/create";
import type { GroupBasicFormContextType, GroupEmblemFormContextType, GroupMembersContextType } from "@/domains/group/form";

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

const createMembersFormData = (ctx: GroupMembersContextType): GroupCreateMembersFormData => {
    const { formData } = ctx;
    return formData.members
        .filter(member => member.manipulationType === GROUP_MEMBER_MANIPULATION_TYPES.NEW);
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

const setMembersBodyData = (body: FormData, formData: GroupCreateMembersFormData) => {
    body.append(
        "members",
        getBlobBodyData(formData.map((member) => ({ userId: member.id, type: member.type }))),
    );
};

const GroupCreateFormProvider = ({ children }: { children: ReactNode; }) => {
    const basicFormCtx = useGroupBasicForm();
    const emblemFormCtx = useGroupEmblemForm();
    const membersFormCtx = useGroupMembersForm();
    const [formData, setFormData] = useState<GroupCreateFormData>(DEFAULT_GROUP_CREATE_FORM_DATA);
    const { steps: { current } } = useGroupCreateFlow();
    useEffect(() => {
        if (current !== GroupCreateFlowStepByFormType.REVIEW)  {
            return;
        }

        setFormData({
            [GROUP_FORM_TYPE.BASIC]: createBasicFormData(basicFormCtx),
            [GROUP_FORM_TYPE.EMBLEM]: createEmblemFormData(emblemFormCtx),
            [GROUP_FORM_TYPE.MEMBERS]: createMembersFormData(membersFormCtx)
        });
    }, [current, basicFormCtx, emblemFormCtx, membersFormCtx]);
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
                return membersFormCtx.isValidFormData();
            case GroupCreateFlowStepByFormType.REVIEW:
                return basicFormCtx.isValidFormData() 
                    && emblemFormCtx.isValidFormData() 
                    && membersFormCtx.isValidFormData();
            default:
                throw new Error("NOT SUPPORTED STEP.");
        }
    }, [current, basicFormCtx, emblemFormCtx, membersFormCtx]);

    const submitFormData = useMemo(() => {
        const body = new FormData();
        setBasicBodyData(body, formData.BASIC);
        setEmblemBodyData(body, formData.EMBLEM);
        setMembersBodyData(body, formData.MEMBERS);
        return body;
    }, [formData]);

    
    const { isFetch, call } = useServerApi({
        api: async () => {
            return await createGroup(submitFormData);
        },
        errorMotionType: ERROR_MOTION_TYPE.MODAL,
        Content: GroupCreateErrorModalContent,
        options: {
            useCloseButton: true,
        },
    });
    
    const submit = useCallback(async () => {
        if (isFetch) {
            return;
        }
        
        if (current !== GroupCreateFlowStepByFormType.REVIEW || !isValidFormData) {
            return;
        }

        await call();

    }, [current, isValidFormData, isFetch, call]);

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