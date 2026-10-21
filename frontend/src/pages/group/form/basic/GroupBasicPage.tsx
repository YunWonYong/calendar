import type { FC } from "react";

import GroupBasicFormProvider from "@/contexts/group/form/basic/GroupBasicFormProvider";
import type { GroupBasicFormData } from "@/domains/group/form";
import GroupBasicForm from "./GroupBasicForm";

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