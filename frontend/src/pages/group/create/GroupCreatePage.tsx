import GroupCreateFlowProvider from "@/contexts/group/create/GroupCreateFlowProvider";
import GroupCreateFormProvider from "@/contexts/group/create/GroupCreateFormProvider";
import GroupBasicFormProvider from "@/contexts/group/form/basic/GroupBasicFormProvider";
import GroupEmblemFormProvider from "@/contexts/group/form/emblem/GroupEmblemFormProvider";
import GroupMembersFormProvider from "@/contexts/group/form/members/GroupMembersFormProvider";

import GroupCreateForm from "./layout/GroupCreateForm";


const CreateGroupPage = () => {
    return (
        <GroupCreateFlowProvider>
            <GroupBasicFormProvider>
                <GroupEmblemFormProvider>
                    <GroupMembersFormProvider>
                        <GroupCreateFormProvider>
                            <GroupCreateForm />
                        </GroupCreateFormProvider>
                    </GroupMembersFormProvider>
                </GroupEmblemFormProvider>
            </GroupBasicFormProvider>
        </GroupCreateFlowProvider>
    );
};

export default CreateGroupPage;