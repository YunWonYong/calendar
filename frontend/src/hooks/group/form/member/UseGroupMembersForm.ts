import { useContext } from "react";

import GroupMembersFormContext from "@/contexts/group/form/members/GroupMembersFormContext";
import NotInitializedError from "@/lib/context/NotInitializedError";

const useGroupMembersForm = () => {
    const ctx = useContext(GroupMembersFormContext);

    if (ctx === null) {
        throw new NotInitializedError("GroupEmblemFormContext");
    }

    return ctx;
};

export default useGroupMembersForm;