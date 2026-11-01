import type { FC } from "react";
import { useEffect, useState } from "react";

import Container from "@/components/Container";
import GroupEmblem from "@/components/group/GroupEmblem";
import { GROUP_EMBLEM_TYPE, GROUP_FORM_MODE } from "@/domains/group/form";
import useGroupCreateForm from "@/hooks/group/create/UseGroupCreateForm";

import { GroupBasicInputBox } from "../../form/basic/GroupBasicInputForm";
import { GroupBasicPlanIdRadioButtonForm, GroupBasicVisibilityRadioButtonForm } from "../../form/basic/GroupBasicRadioForm";

import type { GroupCreateBasicFormData, GroupCreateEmblemFormData } from "@/domains/group/create";

const GroupPreviewForm = () => {
    const { formData } = useGroupCreateForm();
    return (
        <Container>
            <GroupBasicPreviewForm 
                formData={ formData.BASIC }
            />
            <GroupEmblemPreviewForm 
                formData={ formData.EMBLEM }
                groupName={ formData.BASIC.fullName.value }
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

const GroupEmblemPreviewForm: FC<{ formData: GroupCreateEmblemFormData; groupName: string; }> = ({ groupName, formData }) => {
    return (
        <section>
            <header>
                <h2>
                    엠블럼 정보
                </h2>
            </header>
            <article>
                {
                    formData.type === GROUP_EMBLEM_TYPE.NORMAL
                        ?   <GroupEmblem 
                                type={ GROUP_EMBLEM_TYPE.NORMAL }
                                id={ formData.id }
                            />
                        :   <GroupCustomEmblemPreviewForm 
                                file={ formData.file }
                                groupName={ groupName }
                            />
                }
            </article>
        </section>
    );
};

const GroupCustomEmblemPreviewForm = ({ file, groupName }: { file: File; groupName: string; }) => {
    const [url, setUrl] = useState<string>(() => URL.createObjectURL(file));
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(url);
            setUrl("");
        };
    }, [url]);
    return (
        <GroupEmblem 
            type={ "custom" }
            url={ url }
            alt={ `${groupName} preview emblem image` }
        />
    );
};

export default GroupPreviewForm;