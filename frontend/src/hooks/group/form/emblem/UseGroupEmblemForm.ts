import { useContext } from "react";

import GroupEmblemFormContext from "@/contexts/group/form/emblem/GroupEmblemFormContext";
import NotInitializedError from "@/lib/context/NotInitializedError";

const useGroupEmblemForm = () => {
    const ctx = useContext(GroupEmblemFormContext);

    if (ctx === null) {
        throw new NotInitializedError("GroupEmblemFormContext");
    }

    return ctx;
};

export default useGroupEmblemForm;