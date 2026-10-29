import { useContext } from "react";

import GroupBasicFormContext from "@/contexts/group/form/basic/GroupBasicFormContext";
import NotInitializedError from "@/lib/context/NotInitializedError";

import type { GroupBasicFormContextType } from "@/domains/group/form";

const useGroupBasicForm = () => {
    const ctx = useContext<GroupBasicFormContextType | null>(GroupBasicFormContext);

    if (ctx === null) {
        throw new NotInitializedError("GroupBasicFormContext");
    }

    return ctx;
};

export default useGroupBasicForm;