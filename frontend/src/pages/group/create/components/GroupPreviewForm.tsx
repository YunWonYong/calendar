import type { FC } from "react";

import Container from "@/components/Container";
import useGroupCreateForm from "@/hooks/group/create/UseGroupCreateForm";

import { GroupBasicInputBox } from "../../form/basic/GroupBasicInputForm";
import { GroupBasicPlanIdRadioButtonForm, GroupBasicVisibilityRadioButtonForm } from "../../form/basic/GroupBasicRadioForm";

import type { GroupCreateBasicFormData } from "@/domains/group/create";
import { GROUP_FORM_MODE } from "@/domains/group/form";

const GroupPreviewForm = () => {
    const { formData } = useGroupCreateForm();
    return (
        <Container>
            <GroupBasicPreviewForm 
                formData={ formData.BASIC }
            />
        </Container>
    );
};

const GroupBasicPreviewForm: FC<{ formData: GroupCreateBasicFormData; }> = ({ formData }) => {
    return (
        <section>
            <header>
                <h2>
                    기본 정보
                </h2>
            </header>
            <article>
                <GroupBasicInputBox
                    mode={ GROUP_FORM_MODE.PREVIEW }
                    data={ formData.fullName }
                />
                <GroupBasicInputBox
                    mode={ GROUP_FORM_MODE.PREVIEW }
                    data={ formData.shortName }
                />
            </article>
            <article>
                <GroupBasicPlanIdRadioButtonForm
                    mode={ GROUP_FORM_MODE.PREVIEW }
                    data={ formData.maxOwnedGroupMemberPlanId }
                />
                <GroupBasicPlanIdRadioButtonForm
                    mode={ GROUP_FORM_MODE.PREVIEW }
                    data={ formData.maxSubLeaderPlanId }
                />
                <GroupBasicVisibilityRadioButtonForm
                    mode={ GROUP_FORM_MODE.PREVIEW }
                    data={ formData.visibilityType }
                />
            </article>
        </section>
    );
};

export default GroupPreviewForm;