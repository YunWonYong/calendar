import GroupCreateFlowProvider from "@/contexts/group/create/GroupCreateFlowProvider";
import GroupCreateFormProvider from "@/contexts/group/create/GroupCreateFormProvider";

import GroupBasicFormProvider from "@/contexts/group/form/basic/GroupBasicFormProvider";
import GroupEmblemFormProvider from "@/contexts/group/form/emblem/GroupEmblemFormProvider";
import GroupCreateForm from "./layout/GroupCreateForm";


const CreateGroupPage = () => {
    return (
        <GroupCreateFlowProvider>
            <GroupBasicFormProvider>
                <GroupEmblemFormProvider>
                    <GroupCreateFormProvider>
                        <GroupCreateForm />
                    </GroupCreateFormProvider>
                </GroupEmblemFormProvider>
            </GroupBasicFormProvider>
        </GroupCreateFlowProvider>
    );
};

export default CreateGroupPage;