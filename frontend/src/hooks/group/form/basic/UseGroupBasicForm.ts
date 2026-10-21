import GroupBasicFormContext from "@/contexts/group/form/basic/GroupBasicFormContext";
import { GroupBasicFormContextType } from "@/domains/group/form";
import NotInitializedError from "@/lib/context/NotInitializedError";
import { useContext } from "react";

const useGroupBasicForm = () => {
    const ctx = useContext<GroupBasicFormContextType | null>(GroupBasicFormContext);
    if (ctx === null) {
        throw new NotInitializedError("GroupBasicFormContext");
    }
    return ctx;
};

export default useGroupBasicForm;