import GroupCreateFlowProvider from "@/contexts/group/create/GroupCreateFlowProvider";
import GroupCreateFormProvider from "@/contexts/group/create/GroupCreateFormProvider";

import GroupCreateForm from "./layout/GroupCreateForm";


const CreateGroupPage = () => {
    return (
        <GroupCreateFormProvider>
            <GroupCreateFlowProvider>
                <GroupCreateForm />
            </GroupCreateFlowProvider>
        </GroupCreateFormProvider>
    );
};

export default CreateGroupPage;