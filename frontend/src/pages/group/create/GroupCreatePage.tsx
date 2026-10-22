import GroupCreateFlowProvider from "@/contexts/group/create/GroupCreateFlowProvider";

import GroupCreateForm from "./layout/GroupCreateForm";


const CreateGroupPage = () => {
    return (
        <GroupCreateFlowProvider>
            <GroupCreateForm />
        </GroupCreateFlowProvider>
    );
};

export default CreateGroupPage;