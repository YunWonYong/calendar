import GroupCreateFormContext from "@/contexts/group/create/GroupCreateFormContext";
import NotInitializedError from "@/lib/context/NotInitializedError";
import { useContext } from "react";

const useGroupCreateForm = () => {
    const ctx = useContext(GroupCreateFormContext);
    if (ctx === null) {
        throw new NotInitializedError("GroupCreateFormContext");
    }

    return ctx;
};

export default useGroupCreateForm;