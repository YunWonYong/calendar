import type { FC } from "react";

import GroupBasicFormProvider from "@/contexts/group/form/basic/GroupBasicFormProvider";

import GroupBasicForm from "./GroupBasicForm";

import type { GroupBasicFormData } from "@/domains/group/form";

const GroupBasicPage: FC<{ formData?: GroupBasicFormData; }> = ({ formData }) => {
    return (
        <GroupBasicFormProvider
            formData={ formData }
        >
            <GroupBasicForm />
        </GroupBasicFormProvider>
    );
};

export default GroupBasicPage;